"use client";

import { useMemo } from "react";
import { useSpacesData } from "@/features/spaces/context/SpacesContext";

export const useSavedSpaces = () => {
  const { allSpaces, savedIds, toggleSave, isLoading } = useSpacesData();

  // Derive the saved spaces list
  // This will automatically re-calculate whenever savedIds or allSpaces changes
  const savedSpaces = useMemo(() => {
    return allSpaces.filter((space) => savedIds.has(space.id));
  }, [allSpaces, savedIds]);

  /**
   * Helper to check if a specific ID is in the saved set.
   * Useful for the heart icon state in the UI.
   */
  const isSaved = (id: number) => savedIds.has(id);

  return {
    savedSpaces,
    isSaved,
    toggle: toggleSave,
    remove: toggleSave,
    isLoading,
  };
};
