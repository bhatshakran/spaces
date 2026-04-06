"use client";

import { useState } from "react";
import { useSpaces } from "../hooks/useSpaces";
import { useUrlFilters } from "../hooks/useUrlFilters";
import { SearchInput } from "./SearchInput";
import { ActiveFilters } from "./ActiveFilters";
import { CategoryBar } from "./CategoryBar";
import { DiscoveryGrid } from "./DiscoveryGrid";
import { FilterModal } from "./FilterModal";

export const DiscoveryView = () => {
  const { filters, setFilter, clearFilters } = useUrlFilters();
  const { filteredSpaces, isLoading } = useSpaces(filters);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const activeFilterCount = Object.keys(filters).filter(
    (k) => k !== "sort",
  ).length;

  return (
    <div className="flex flex-col min-h-screen bg-[#F6F2EC]">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full bg-[#F6F2EC]/90 backdrop-blur-md border-b border-stone-200/70">
        <div className="max-w-[1400px] mx-auto px-6 py-4">
          {/* Top row: logo + search + actions */}
          <div className="flex items-center gap-4">
            <span className="font-cormorant text-[#C05A32] text-[22px] font-semibold tracking-tight shrink-0">
              Spaces
            </span>

            <div className="flex-1 max-w-2xl">
              <SearchInput
                value={filters.search || ""}
                onChange={(val) => setFilter("search", val)}
              />
            </div>

            <div className="flex items-center gap-2 ml-auto">
              {/* Filter button */}
              <button
                onClick={() => setIsFilterModalOpen(true)}
                className="flex items-center gap-2 px-4 py-[10px] bg-white border border-stone-200
                  rounded-xl text-sm font-medium text-stone-700
                  hover:bg-[#FBF0EB] hover:border-[#F0D4C8] hover:text-[#C05A32]
                  transition-all duration-200"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 4h18M7 12h10M11 20h2"
                  />
                </svg>
                Filters
                {activeFilterCount > 0 && (
                  <span className="bg-[#C05A32] text-white text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              {/* Sort */}
              <select
                value={filters.sort || "newest"}
                onChange={(e) => setFilter("sort", e.target.value)}
                className="bg-white border border-stone-200 text-stone-700 py-[10px] pl-3 pr-8 rounded-xl
                  text-sm font-medium focus:outline-none focus:border-[#C05A32]
                  focus:ring-2 focus:ring-[#C05A32]/10 transition-all duration-200
                  appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%238B7B6E' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 10px center",
                }}
              >
                <option value="newest">Newest first</option>
                <option value="price_asc">Price: low → high</option>
                <option value="price_desc">Price: high → low</option>
                <option value="top_rated">Top rated</option>
              </select>
            </div>
          </div>

          {/* Category bar */}
          <div className="mt-3 pt-3 border-t border-stone-200/60">
            <CategoryBar
              selected={filters.categories?.[0]}
              onSelect={(val) => setFilter("categories", val ? [val] : [])}
            />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-[1400px] mx-auto w-full px-6 py-7">
        {/* Section heading + active filters */}
        <div className="flex items-baseline justify-between mb-6">
          <h1 className="font-cormorant text-[28px] font-semibold text-stone-800 tracking-tight">
            Explore Spaces
            <span className="ml-2 font-['DM_Sans'] text-base font-normal text-stone-300">
              ({filteredSpaces.length})
            </span>
          </h1>

          <ActiveFilters
            filters={filters}
            onRemove={setFilter}
            onClear={clearFilters}
          />
        </div>

        <DiscoveryGrid spaces={filteredSpaces} isLoading={isLoading} />
      </main>

      {/* Filter modal */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        filters={filters}
        setFilter={setFilter}
      />
    </div>
  );
};
