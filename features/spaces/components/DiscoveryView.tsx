"use client";

import { useState } from "react";
import { useSpaces } from "../hooks/useSpaces";
import { useUrlFilters } from "../hooks/useUrlFilters";
import { SearchInput } from "./SearchInput";
import { ActiveFilters } from "./ActiveFilters";
import { FilterPanel } from "./FilterPanel";
import { DiscoveryGrid } from "./DiscoveryGrid";

export const DiscoveryView = () => {
  const { filters, setFilter, clearFilters } = useUrlFilters();
  const { filteredSpaces, isLoading, totalCount, isError } = useSpaces(filters);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Top Header / Search Area */}
      <header className="sticky top-0 z-30 w-full bg-white border-b border-gray-200 px-4 py-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1 max-w-2xl">
            <SearchInput
              value={filters.search || ""}
              onChange={(val) => setFilter("search", val)}
            />
            <p className="text-sm text-gray-500 mt-2">
              {isLoading
                ? "Loading spaces..."
                : `Showing ${filteredSpaces.length} of ${totalCount} spaces`}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none"
              value={filters.sort || "newest"}
              onChange={(e) => setFilter("sort", e.target.value)}
            >
              <option value="newest">Newest</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="capacity">Capacity</option>
            </select>

            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="md:hidden px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium"
            >
              Filters{" "}
              {Object.keys(filters).length > 0 &&
                `(${Object.keys(filters).length})`}
            </button>
          </div>
        </div>

        {/* Active Filter Chips */}
        <div className="max-w-7xl mx-auto mt-4">
          <ActiveFilters
            filters={filters}
            onRemove={setFilter}
            onClear={clearFilters}
          />
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full flex gap-8 p-4 md:p-8">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-64 flex-shrink-0">
          <div className="sticky top-32">
            <h2 className="text-lg font-bold mb-4 text-gray-800">Filters</h2>
            <FilterPanel filters={filters} setFilter={setFilter} />
          </div>
        </aside>

        {/* Results Area */}
        <section className="flex-1 min-w-0">
          {isError && (
            <div className="p-8 text-center bg-red-50 border border-red-100 rounded-xl">
              <p className="text-red-600">
                Failed to load spaces. Please try again.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="mt-2 text-blue-600 underline"
              >
                Retry
              </button>
            </div>
          )}

          {!isLoading && filteredSpaces.length === 0 && (
            <div className="py-20 text-center">
              <h3 className="text-xl font-semibold text-gray-900">
                No spaces match your criteria
              </h3>
              <p className="text-gray-500 mt-2">
                Try adjusting your filters or search term.
              </p>
              <button
                onClick={clearFilters}
                className="mt-4 text-blue-600 font-medium hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* This component handles the @tanstack/react-virtual logic */}
          <DiscoveryGrid spaces={filteredSpaces} isLoading={isLoading} />
        </section>
      </main>

      {/* Mobile Filter Overlay (UI Only for now) */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-white p-6 md:hidden">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Filters</h2>
            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="text-2xl"
            >
              &times;
            </button>
          </div>
          <FilterPanel filters={filters} setFilter={setFilter} />
          <button
            onClick={() => setIsMobileFilterOpen(false)}
            className="w-full mt-8 py-3 bg-blue-600 text-white rounded-xl font-bold"
          >
            Show {filteredSpaces.length} Results
          </button>
        </div>
      )}
    </div>
  );
};
