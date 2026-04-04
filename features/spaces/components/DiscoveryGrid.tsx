"use client";

import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { SpaceCard } from "./SpaceCard";

interface DiscoveryGridProps {
  spaces: any[];
  isLoading: boolean;
}

export const DiscoveryGrid = ({ spaces, isLoading }: DiscoveryGridProps) => {
  const parentRef = useRef<HTMLDivElement>(null);

  // Responsive Grid Logic: 1 col (mobile), 2 (tablet), 3 (laptop), 4 (desktop)
  // In a real app, you'd use a useWindowSize hook. Here we assume 3 for desktop.
  const columns = 3;
  const rowCount = Math.ceil(spaces.length / columns);

  const rowVirtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 450, // Estimated height of a card + gap
    overscan: 5,
  });

  if (isLoading)
    return <div className="grid grid-cols-3 gap-6">Loading...</div>;

  return (
    <div
      ref={parentRef}
      className="h-[800px] overflow-auto pr-2 custom-scrollbar"
    >
      <div
        className="relative w-full"
        style={{ height: `${rowVirtualizer.getTotalSize()}px` }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const startIndex = virtualRow.index * columns;
          const rowSpaces = spaces.slice(startIndex, startIndex + columns);

          return (
            <div
              key={virtualRow.key}
              className="absolute top-0 left-0 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              style={{
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              {rowSpaces.map((space) => (
                <SpaceCard key={space.id} space={space} />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};
