"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSavedSpaces } from "../../spaces/hooks/useSavedSpaces";
import { CATEGORIES } from "@/features/spaces/constants/FIlterOptions";
import { SpaceCard } from "@/features/spaces/components/SpaceCard";

// !TODO: Refactor this file
export const CollectionView = () => {
  const { savedSpaces, remove } = useSavedSpaces();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [city, setCity] = useState("All");

  const cities = useMemo(() => {
    const unique = Array.from(new Set(savedSpaces.map((s) => s.city)));
    return ["All", ...unique];
  }, [savedSpaces]);

  const filtered = useMemo(() => {
    return savedSpaces.filter((s) => {
      const matchSearch =
        search === "" ||
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.city.toLowerCase().includes(search.toLowerCase());
      const matchCat = category === "All" || s.category === category;
      const matchCity = city === "All" || s.city === city;
      return matchSearch && matchCat && matchCity;
    });
  }, [savedSpaces, search, category, city]);

  return (
    <div className="flex flex-col min-h-screen bg-[#F6F2EC]">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#F6F2EC]/90 backdrop-blur-md border-b border-stone-200/70">
        <div className="max-w-[1400px] mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            {/* Back */}
            <Link
              href="/discover"
              className="flex items-center gap-1.5 text-sm text-stone-400 hover:text-[#C05A32] transition-colors shrink-0"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Discover
            </Link>

            <span className="text-stone-200">|</span>

            <span className="font-cormorant text-[22px] font-semibold text-stone-800 tracking-tight">
              My Collection
            </span>

            {savedSpaces.length > 0 && (
              <span className="text-sm text-stone-300 font-normal">
                {savedSpaces.length} saved
              </span>
            )}

            {/* Search */}
            <div className="relative ml-auto max-w-xs w-full">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search your collection…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-[10px] bg-white border border-stone-200 rounded-xl text-sm
                  placeholder:text-stone-300 text-stone-700 focus:outline-none focus:border-[#C05A32]
                  focus:ring-2 focus:ring-[#C05A32]/10 transition-all"
              />
            </div>
          </div>

          {/* Filters row */}
          {savedSpaces.length > 0 && (
            <div className="mt-3 pt-3 border-t border-stone-200/60 flex items-center gap-3 overflow-x-auto">
              {/* Category pills */}
              <div className="flex gap-2 shrink-0">
                {CATEGORIES.filter(
                  (c) =>
                    c === "All" || savedSpaces.some((s) => s.category === c),
                ).map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all whitespace-nowrap ${
                      category === c
                        ? "bg-[#C05A32] border-[#C05A32] text-white"
                        : "bg-transparent border-stone-200 text-stone-500 hover:border-[#C05A32]/40 hover:text-[#C05A32]"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>

              {/* Divider */}
              {cities.length > 2 && (
                <>
                  <span className="text-stone-200 shrink-0">|</span>
                  {/* City select */}
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="bg-white border border-stone-200 text-stone-600 py-1.5 pl-3 pr-7 rounded-xl
                      text-xs font-medium focus:outline-none focus:border-[#C05A32]
                      focus:ring-2 focus:ring-[#C05A32]/10 transition-all appearance-none cursor-pointer shrink-0"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='%238B7B6E' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 8px center",
                    }}
                  >
                    {cities.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </>
              )}

              {/* Clear filters */}
              {(category !== "All" || city !== "All" || search !== "") && (
                <button
                  onClick={() => {
                    setCategory("All");
                    setCity("All");
                    setSearch("");
                  }}
                  className="ml-auto text-xs text-stone-400 hover:text-[#C05A32] underline underline-offset-4 transition-colors shrink-0"
                >
                  Clear
                </button>
              )}
            </div>
          )}
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto w-full px-6 py-7 flex-1">
        {/* Empty state — nothing saved */}
        {savedSpaces.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-16 h-16 rounded-full bg-[#FBF0EB] flex items-center justify-center mb-5">
              <svg
                className="w-7 h-7 text-[#C05A32]/50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            </div>
            <h2 className="font-cormorant text-[26px] font-semibold text-stone-700 mb-2">
              Nothing saved yet
            </h2>
            <p className="text-sm text-stone-400 mb-7 max-w-xs">
              Heart spaces you love while browsing and they&apos;ll appear here.
            </p>
            <Link
              href="/discover"
              className="px-7 py-3 bg-stone-900 text-[#F6F2EC] rounded-xl text-sm font-medium
                hover:bg-[#C05A32] transition-colors duration-300"
            >
              Explore Spaces
            </Link>
          </div>
        )}

        {/* Empty state — filters match nothing */}
        {savedSpaces.length > 0 && filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mb-4">
              <svg
                className="w-5 h-5 text-stone-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </div>
            <p className="text-sm font-medium text-stone-500">
              No matches in your collection
            </p>
            <button
              onClick={() => {
                setCategory("All");
                setCity("All");
                setSearch("");
              }}
              className="mt-3 text-xs text-[#C05A32] underline underline-offset-4"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Grid */}
        {filtered.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((space) => (
              <SpaceCard
                key={space.id}
                space={space}
                onRemove={() => remove(space.id)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
