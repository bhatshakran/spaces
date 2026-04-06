"use client";

import { Space } from "@/features/types/spaces";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";

interface SpacesContextType {
  allSpaces: Space[];
  savedIds: Set<number>;
  toggleSave: (id: number) => void;
  isLoading: boolean;
  isError: boolean;
}

const SpacesContext = createContext<SpacesContextType | undefined>(undefined);

export const SpacesProvider = ({ children }: { children: React.ReactNode }) => {
  const [allSpaces, setAllSpaces] = useState<Space[]>([]);
  const [savedIds, setSavedIds] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // 1. Master Fetch (Happens once for the whole app)
  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch("http://localhost:3001/spaces");
        if (!res.ok) throw new Error();
        const data = await res.json();
        setAllSpaces(data);

        // Load saved items from localStorage
        const saved = localStorage.getItem("saved_spaces");
        if (saved) setSavedIds(new Set(JSON.parse(saved)));
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // 2. Optimized Toggle Logic
  const toggleSave = (id: number) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);

      // Persist to disk
      localStorage.setItem("saved_spaces", JSON.stringify(Array.from(next)));
      return next;
    });
  };

  const value = useMemo(
    () => ({
      allSpaces,
      savedIds,
      toggleSave,
      isLoading,
      isError,
    }),
    [allSpaces, savedIds, isLoading, isError],
  );

  return (
    <SpacesContext.Provider value={value}>{children}</SpacesContext.Provider>
  );
};

// Custom hook to consume the "Store"
export const useSpacesData = () => {
  const context = useContext(SpacesContext);
  if (!context)
    throw new Error("useSpacesData must be used within SpacesProvider");
  return context;
};
