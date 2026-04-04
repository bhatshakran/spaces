"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

export const useUrlFilters = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Create a clean object from the URL search params
  const filters = useMemo(() => {
    const params = Object.fromEntries(searchParams.entries());
    return {
      ...params,
      search: params.search || "",
      sort: params.sort || "newest",
      // Convert comma-separated strings back into arrays for multi-selects
      categories: params.categories ? params.categories.split(",") : [],
      amenities: params.amenities ? params.amenities.split(",") : [],
      minPrice: params.minPrice ? Number(params.minPrice) : undefined,
      maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
      minCapacity: params.minCapacity ? Number(params.minCapacity) : undefined,
      rating: params.rating ? Number(params.rating) : undefined,
    };
  }, [searchParams]);

  const setFilter = useCallback(
    (name: string, value: string | number | string[] | undefined | null) => {
      const params = new URLSearchParams(searchParams.toString());

      if (!value || (Array.isArray(value) && value.length === 0)) {
        params.delete(name);
      } else if (Array.isArray(value)) {
        params.set(name, value.join(","));
      } else {
        params.set(name, String(value));
      }

      // Use 'replace' to avoid cluttering browser history during rapid filtering
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  const clearFilters = useCallback(() => {
    router.replace(pathname, { scroll: false });
  }, [pathname, router]);

  return { filters, setFilter, clearFilters };
};
