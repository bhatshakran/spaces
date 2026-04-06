"use client";

import { VirtuosoGrid } from "react-virtuoso";
import { SpaceCard } from "./SpaceCard";
import { Space } from "../types/spaces";

interface DiscoveryGridProps {
  spaces: Space[];
  isLoading: boolean;
}

export const DiscoveryGrid = ({ spaces, isLoading }: DiscoveryGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-pulse">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div
            key={n}
            className="flex flex-col bg-white rounded-[18px] border border-stone-100 overflow-hidden h-[390px]"
          >
            <div className="h-48 bg-stone-100 w-full" />
            <div className="p-5 flex-1 flex flex-col gap-3">
              <div className="h-5 bg-stone-100 rounded-lg w-3/4" />
              <div className="h-3.5 bg-stone-100 rounded-lg w-1/3" />
              <div className="flex gap-2 mt-1">
                <div className="h-5 bg-stone-100 rounded-md w-16" />
                <div className="h-5 bg-stone-100 rounded-md w-20" />
              </div>
              <div className="mt-auto h-10 bg-stone-100 rounded-xl w-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (spaces.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-14 h-14 rounded-full bg-stone-100 flex items-center justify-center mb-4">
          <svg
            className="w-6 h-6 text-stone-300"
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
        <p className="text-stone-500 font-medium text-sm">No spaces found</p>
        <p className="text-stone-300 text-xs mt-1">
          Try adjusting your filters
        </p>
      </div>
    );
  }

  return (
    <VirtuosoGrid
      style={{ height: "calc(100vh - 230px)" }}
      totalCount={spaces.length}
      listClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
      itemClassName="pb-5"
      itemContent={(index) => <SpaceCard space={spaces[index]} />}
    />
  );
};
