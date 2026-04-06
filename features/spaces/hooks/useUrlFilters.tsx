"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { SpaceFilters } from "../types/spaces";

export const useUrlFilters = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 1. Get the raw string. This is our "Source of Truth"
  const searchString = searchParams.toString();

  const filters = useMemo(() => {
    // 2. Parse the string inside the memo
    const params = Object.fromEntries(new URLSearchParams(searchString));

    return {
      search: params.search || "",
      sort: params.sort || "newest",
      categories: params.categories
        ? params.categories.split(",").filter(Boolean)
        : [],
      amenities: params.amenities
        ? params.amenities.split(",").filter(Boolean)
        : [],
      minPrice: params.minPrice ? Number(params.minPrice) : undefined,
      maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
      minCapacity: params.minCapacity ? Number(params.minCapacity) : undefined,
      rating: params.rating ? Number(params.rating) : undefined,
    };
    // 3. This object reference will NOW only change if the URL string actually changes
  }, [searchString]);

  const setFilter = useCallback(
    <K extends keyof SpaceFilters>(name: K, value: SpaceFilters[K]) => {
      const params = new URLSearchParams(searchString);

      if (
        value === undefined ||
        value === null ||
        value === "" ||
        (Array.isArray(value) && value.length === 0)
      ) {
        params.delete(name);
      } else if (Array.isArray(value)) {
        params.set(name, value.join(","));
      } else {
        params.set(name, String(value));
      }

      const newSearch = params.toString();
      const currentSearch = searchParams.toString();

      // 4. Critical: Only push to router if the URL actually changed
      if (newSearch !== currentSearch) {
        router.replace(`${pathname}?${newSearch}`, { scroll: false });
      }
    },
    [pathname, router, searchString, searchParams],
  );

  const clearFilters = useCallback(() => {
    if (searchParams.toString() !== "") {
      router.replace(pathname, { scroll: false });
    }
  }, [pathname, router, searchParams]);

  return { filters, setFilter, clearFilters };
};
