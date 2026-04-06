"use client";

import { Space } from "@/features/spaces/types/spaces";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";

interface SavedEntry {
  id: number;
  spaceId: number;
}

interface SpacesContextType {
  allSpaces: Space[];
  savedIds: Set<number>;
  toggleSave: (spaceId: number) => Promise<void>;
  isLoading: boolean;
  isError: boolean;
}

const SpacesContext = createContext<SpacesContextType | undefined>(undefined);

export const SpacesProvider = ({ children }: { children: React.ReactNode }) => {
  const [allSpaces, setAllSpaces] = useState<Space[]>([]);
  const [savedEntries, setSavedEntries] = useState<SavedEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // Fetch spaces + saved entries on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const [spacesRes, savedRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/spaces`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/saved`),
        ]);
        if (!spacesRes.ok || !savedRes.ok) throw new Error();
        const [spaces, saved] = await Promise.all([
          spacesRes.json(),
          savedRes.json(),
        ]);
        setAllSpaces(spaces);
        setSavedEntries(saved);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // Derive a Set<spaceId> from entries for O(1) lookup
  const savedIds = useMemo(
    () => new Set(savedEntries.map((e) => e.spaceId)),
    [savedEntries],
  );

  const toggleSave = useCallback(
    async (spaceId: number) => {
      const existing = savedEntries.find((e) => e.spaceId === spaceId);

      if (existing) {
        // Optimistic remove
        setSavedEntries((prev) => prev.filter((e) => e.spaceId !== spaceId));
        try {
          await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/saved/${existing.id}`,
            {
              method: "DELETE",
            },
          );
        } catch {
          // Revert on failure
          setSavedEntries((prev) => [...prev, existing]);
        }
      } else {
        // Optimistic add
        const optimistic: SavedEntry = { id: Date.now(), spaceId };
        setSavedEntries((prev) => [...prev, optimistic]);
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/saved`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ spaceId }),
          });
          const real: SavedEntry = await res.json();
          // Replace optimistic entry with real server entry
          setSavedEntries((prev) =>
            prev.map((e) => (e.id === optimistic.id ? real : e)),
          );
        } catch {
          // Revert on failure
          setSavedEntries((prev) => prev.filter((e) => e.id !== optimistic.id));
        }
      }
    },
    [savedEntries],
  );

  const value = useMemo(
    () => ({ allSpaces, savedIds, toggleSave, isLoading, isError }),
    [allSpaces, savedIds, toggleSave, isLoading, isError],
  );

  return (
    <SpacesContext.Provider value={value}>{children}</SpacesContext.Provider>
  );
};

export const useSpacesData = () => {
  const context = useContext(SpacesContext);
  if (!context)
    throw new Error("useSpacesData must be used within SpacesProvider");
  return context;
};
