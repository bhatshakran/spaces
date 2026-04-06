"use client";

import { useMemo } from "react";
import { useSpacesData } from "@/features/spaces/context/SpacesContext";
import { SpaceFilters, Space } from "../types/spaces"; // Ensure these are exported from your types file

export const useSpaces = (filters: SpaceFilters) => {
  // 1. Grab global data from Context
  // Assuming useSpacesData returns an array of type Space[]
  const { allSpaces, isLoading, isError } = useSpacesData();
  // Deconstruct everything used inside the useMemo
  const {
    search,
    categories,
    minPrice,
    maxPrice,
    minCapacity,
    rating,
    amenities,
    sort,
  } = filters;
  // 2. The Filtering Logic
  const filteredSpaces = useMemo(() => {
    if (!allSpaces || allSpaces.length === 0) return [];

    return allSpaces
      .filter((space: Space) => {
        // Search filter
        if (search) {
          const searchLower = search.toLowerCase();
          const matchesSearch =
            space.name.toLowerCase().includes(searchLower) ||
            space.city.toLowerCase().includes(searchLower) ||
            space.description.toLowerCase().includes(searchLower);
          if (!matchesSearch) return false;
        }

        // Category filter
        if (categories && categories.length > 0) {
          if (!categories.includes(space.category)) return false;
        }

        // Price Range filter (Ensuring we compare numbers to numbers)
        if (minPrice && space.price < Number(minPrice)) return false;
        if (maxPrice && space.price > Number(maxPrice)) return false;

        // Capacity filter
        if (minCapacity && space.capacity < Number(minCapacity)) return false;

        // Rating filter
        if (rating && space.rating < Number(rating)) return false;

        // Amenities filter
        if (amenities && amenities.length > 0) {
          // Space amenities are likely strings, so we check if every filter is present
          const hasAllAmenities = amenities.every((amt: string) =>
            space.amenities.includes(amt),
          );
          if (!hasAllAmenities) return false;
        }

        return true;
      })
      .sort((a, b) => {
        // Sorting Logic
        switch (sort) {
          case "price_asc":
            return a.price - b.price;
          case "price_desc":
            return b.price - a.price;
          case "top_rated": // Fixed to match your DiscoveryView option
            return (b.rating || 0) - (a.rating || 0);
          case "newest":
          default:
            // Assuming IDs are numeric for the sort, or use a date field if available
            return Number(b.id) - Number(a.id);
        }
      });

    // We use JSON.stringify(filters) as the dependency because 'filters'
    // is often a new object reference on every render from the URL hook.
  }, [
    allSpaces,
    search,
    categories,
    minPrice,
    maxPrice,
    minCapacity,
    rating,
    amenities,
    sort,
  ]);

  return {
    filteredSpaces,
    totalCount: allSpaces.length,
    isLoading,
    isError,
  };
};
