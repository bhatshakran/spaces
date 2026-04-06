"use client";

import { SpaceCardProps } from "@/features/spaces/types/spaces";
import { useState } from "react";
import { useSavedSpaces } from "@/features/spaces/hooks/useSavedSpaces";
import Image from "next/image";
import { shimmer, toBase64 } from "../lib/shimmer";

export const SpaceCard = ({ space, onRemove }: SpaceCardProps) => {
  const [, forceUpdate] = useState(0);
  const { isSaved, toggle } = useSavedSpaces();

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onRemove) {
      onRemove(); // in collection, removing is the only action
    } else {
      toggle(space.id);
      forceUpdate((n) => n + 1);
    }
  };

  return (
    <div
      className="group bg-white rounded-[18px] border border-stone-100 overflow-hidden
      hover:shadow-[0_8px_40px_rgba(26,17,10,0.10)] hover:-translate-y-1
      transition-all duration-500 flex flex-col h-full"
    >
      {/* Image */}
      <div className="relative aspect-4/3 overflow-hidden">
        <Image
          fill
          src={space.imageUrl}
          alt={space.name}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
        />
        <div
          className="absolute inset-0 bg-linear-to-t from-[#1A110A]/35 via-transparent to-transparent
          opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span
            className="px-3 py-1 rounded-full bg-[#1A110A]/70 backdrop-blur-sm
            text-[#F6F2EC]/90 text-[10px] font-semibold uppercase tracking-[0.08em]"
          >
            {space.category}
          </span>
        </div>

        {/* Save button */}
        <button
          onClick={handleSave}
          className="absolute top-3 right-3 w-[34px] h-[34px] rounded-full bg-[#F6F2EC]/90 backdrop-blur-sm
            border-none flex items-center justify-center hover:bg-white transition-all active:scale-90 shadow-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={isSaved(space.id) ? "#C05A32" : "none"}
            stroke={isSaved(space.id) ? "#C05A32" : "#8B7B6E"}
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            className="w-4 h-4 transition-colors duration-200"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </button>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3 mb-1.5">
          <h3
            className="font-cormorant font-semibold text-[19px] leading-snug text-stone-800
            group-hover:text-[#C05A32] transition-colors line-clamp-1 flex-1"
          >
            {space.name}
          </h3>
          <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg shrink-0">
            <span className="text-amber-500 text-[11px]">★</span>
            <span className="text-[12px] font-semibold text-stone-700">
              {space.rating}
            </span>
          </div>
        </div>

        <p className="flex items-center gap-1.5 text-[12px] text-stone-400 mb-4">
          <span className="w-[5px] h-[5px] rounded-full bg-[#C05A32] shrink-0" />
          {space.city}
        </p>

        {/* Amenities */}
        <div className="flex flex-wrap gap-1.5 mb-auto">
          {space.amenities.slice(0, 3).map((a: string) => (
            <span
              key={a}
              className="text-[10px] font-medium bg-stone-50 text-stone-400
              border border-stone-100 px-2.5 py-1 rounded-md"
            >
              {a}
            </span>
          ))}
          {space.amenities.length > 3 && (
            <span className="text-[10px] font-semibold text-stone-300 self-center ml-0.5">
              +{space.amenities.length - 3}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-stone-50 flex items-end justify-between">
          <div>
            <p className="text-[10px] font-medium text-stone-300 uppercase tracking-[0.07em] mb-0.5">
              From
            </p>
            <div className="flex items-baseline gap-1">
              <span className="font-cormorant text-[24px] font-semibold text-stone-800">
                ${space.price}
              </span>
              <span className="text-[11px] text-stone-400">/ day</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-medium text-stone-300 uppercase tracking-[0.07em] mb-0.5">
              Capacity
            </p>
            <p className="text-[13px] font-medium text-stone-600">
              {space.capacity} guests
            </p>
          </div>
        </div>

        <button
          className="w-full mt-4 py-[11px] rounded-xl bg-stone-900 text-[#F6F2EC] text-[13px]
          font-medium tracking-wide hover:bg-[#C05A32] transition-colors duration-300"
        >
          Explore Space
        </button>
      </div>
    </div>
  );
};
