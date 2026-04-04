"use client";

import { useState, useEffect, useMemo } from "react";

interface Space {
  id: number;
  name: string;
  city: string;
  category: string;
  price: number;
  capacity: number;
  rating: number;
  amenities: string[];
  description: string;
  imageUrl: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useSpaces = (filters: any) => {
  const [allSpaces, setAllSpaces] = useState<Space[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // 1. Initial Fetch
  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:3001/spaces");
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setAllSpaces(data);
      } catch (err) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSpaces();
  }, []);

  // 2. The Filtering Logic (The "AND" Engine)
  const filteredSpaces = useMemo(() => {
    return (
      allSpaces
        .filter((space) => {
          // Search filter (name, city, or description)
          if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            const matchesSearch =
              space.name.toLowerCase().includes(searchLower) ||
              space.city.toLowerCase().includes(searchLower) ||
              space.description.toLowerCase().includes(searchLower);
            if (!matchesSearch) return false;
          }

          // Category filter (Multi-select AND logic)
          if (filters.categories?.length > 0) {
            if (!filters.categories.includes(space.category)) return false;
          }

          // Price Range filter
          if (filters.minPrice && space.price < filters.minPrice) return false;
          if (filters.maxPrice && space.price > filters.maxPrice) return false;

          // Capacity filter
          if (filters.minCapacity && space.capacity < filters.minCapacity)
            return false;

          // Rating filter (Minimum stars)
          if (filters.rating && space.rating < filters.rating) return false;

          // Amenities filter (Must have ALL selected amenities)
          if (filters.amenities?.length > 0) {
            const hasAllAmenities = filters.amenities.every((amt: string) =>
              space.amenities.includes(amt),
            );
            if (!hasAllAmenities) return false;
          }

          return true;
        })
        // 3. Sorting Logic
        .sort((a, b) => {
          switch (filters.sort) {
            case "price_asc":
              return a.price - b.price;
            case "price_desc":
              return b.price - a.price;
            case "capacity":
              return b.capacity - a.capacity;
            case "newest":
            default:
              return b.id - a.id; // Assuming higher ID is newer
          }
        })
    );
  }, [allSpaces, filters]);

  return {
    filteredSpaces,
    totalCount: allSpaces.length,
    isLoading,
    isError,
  };
};
