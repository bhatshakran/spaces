"use client";

import { AMENITIES, CATEGORIES } from "../constants/FIlterOptions";
import { SpaceFilters } from "../types/spaces";

export const FilterPanel = ({
  filters,
  setFilter,
}: {
  filters: SpaceFilters;
  setFilter: <K extends keyof SpaceFilters>(
    key: K,
    value: SpaceFilters[K],
  ) => void;
}) => {
  const handleCheckboxChange = (
    list: string[],
    item: string,
    name: keyof SpaceFilters,
  ) => {
    const newList = list.includes(item)
      ? list.filter((i) => i !== item)
      : [...list, item];
    setFilter(name, newList);
  };

  return (
    <div className="space-y-6">
      {/* Top row: Category + Capacity side by side */}
      <div className="grid grid-cols-2 gap-6">
        {/* Category */}
        <div>
          <h3 className="text-[10px] font-semibold uppercase tracking-[0.1em] text-stone-400 mb-3">
            Category
          </h3>
          <div className="space-y-2">
            {CATEGORIES.map((cat) => (
              <label
                key={cat}
                className="flex items-center gap-2.5 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={filters.categories?.includes(cat)}
                  onChange={() =>
                    handleCheckboxChange(
                      filters.categories ?? [],
                      cat,
                      "categories",
                    )
                  }
                  className="w-4 h-4 rounded border-stone-300 text-[#C05A32] accent-[#C05A32] focus:ring-[#C05A32]/20"
                />
                <span className="text-sm text-stone-600 group-hover:text-[#C05A32] transition-colors">
                  {cat}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Capacity + Price */}
        <div className="space-y-5">
          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.1em] text-stone-400 mb-3">
              Min Capacity
            </h3>
            <input
              type="number"
              placeholder="e.g. 50"
              value={filters.minCapacity || ""}
              onChange={(e) => setFilter("minCapacity", Number(e.target.value))}
              className="w-full px-3 py-2.5 text-sm border border-stone-200 rounded-xl
                focus:outline-none focus:border-[#C05A32] focus:ring-2 focus:ring-[#C05A32]/10
                text-stone-700 placeholder:text-stone-300 transition-all"
            />
          </div>

          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.1em] text-stone-400 mb-3">
              Price Range
            </h3>
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Min"
                value={filters.minPrice || ""}
                onChange={(e) => setFilter("minPrice", Number(e.target.value))}
                className="w-full px-3 py-2.5 text-sm border border-stone-200 rounded-xl
                  focus:outline-none focus:border-[#C05A32] focus:ring-2 focus:ring-[#C05A32]/10
                  text-stone-700 placeholder:text-stone-300 transition-all"
              />
              <span className="text-stone-300 text-sm shrink-0">—</span>
              <input
                type="number"
                placeholder="Max"
                value={filters.maxPrice || ""}
                onChange={(e) => setFilter("maxPrice", Number(e.target.value))}
                className="w-full px-3 py-2.5 text-sm border border-stone-200 rounded-xl
                  focus:outline-none focus:border-[#C05A32] focus:ring-2 focus:ring-[#C05A32]/10
                  text-stone-700 placeholder:text-stone-300 transition-all"
              />
            </div>
          </div>

          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.1em] text-stone-400 mb-3">
              Min Rating
            </h3>
            <div className="flex gap-2">
              {[3, 3.5, 4, 4.5].map((r) => (
                <button
                  key={r}
                  onClick={() =>
                    setFilter("rating", filters.rating === r ? undefined : r)
                  }
                  className={`flex-1 py-2 rounded-xl text-xs font-medium border transition-all ${
                    filters.rating === r
                      ? "bg-[#C05A32] border-[#C05A32] text-white"
                      : "bg-white border-stone-200 text-stone-500 hover:border-[#C05A32]/40"
                  }`}
                >
                  {r}★
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Amenities — full width */}
      <div>
        <h3 className="text-[10px] font-semibold uppercase tracking-[0.1em] text-stone-400 mb-3">
          Amenities
        </h3>
        <div className="flex flex-wrap gap-2">
          {AMENITIES.map((amt) => (
            <button
              key={amt}
              onClick={() =>
                handleCheckboxChange(filters.amenities ?? [], amt, "amenities")
              }
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                filters.amenities?.includes(amt)
                  ? "bg-[#C05A32] border-[#C05A32] text-white"
                  : "bg-white border-stone-200 text-stone-500 hover:border-[#C05A32]/40 hover:text-[#C05A32]"
              }`}
            >
              {amt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
