"use client";

import { useMemo } from "react";
import { useSpacesData } from "@/features/spaces/context/SpacesContext";

export const useSpaces = (filters: any) => {
  // 1. Grab global data from Context
  const { allSpaces, isLoading, isError } = useSpacesData();

  // 2. The Filtering Logic (Calculated locally from the global array)
  const filteredSpaces = useMemo(() => {
    // If data hasn't arrived yet, return empty
    if (!allSpaces.length) return [];

    return allSpaces
      .filter((space) => {
        // Search filter
        if (filters.search) {
          const searchLower = filters.search.toLowerCase();
          const matchesSearch =
            space.name.toLowerCase().includes(searchLower) ||
            space.city.toLowerCase().includes(searchLower) ||
            space.description.toLowerCase().includes(searchLower);
          if (!matchesSearch) return false;
        }

        // Category filter
        if (filters.categories?.length > 0) {
          if (!filters.categories.includes(space.category)) return false;
        }

        // Price Range filter
        if (filters.minPrice && space.price < filters.minPrice) return false;
        if (filters.maxPrice && space.price > filters.maxPrice) return false;

        // Capacity filter
        if (filters.minCapacity && space.capacity < filters.minCapacity)
          return false;

        // Rating filter
        if (filters.rating && space.rating < filters.rating) return false;

        // Amenities filter
        if (filters.amenities?.length > 0) {
          const hasAllAmenities = filters.amenities.every((amt: string) =>
            space.amenities.includes(amt),
          );
          if (!hasAllAmenities) return false;
        }

        return true;
      })
      .sort((a, b) => {
        // Sorting Logic
        switch (filters.sort) {
          case "price_asc":
            return a.price - b.price;
          case "price_desc":
            return b.price - a.price;
          case "capacity":
            return b.capacity - a.capacity;
          case "newest":
          default:
            return b.id - a.id;
        }
      });

    // IMPORTANT: We stringify filters so that the reference change
    // of the object doesn't cause an infinite re-render loop.
  }, [allSpaces, JSON.stringify(filters)]);

  return {
    filteredSpaces,
    totalCount: allSpaces.length,
    isLoading,
    isError,
  };
};
