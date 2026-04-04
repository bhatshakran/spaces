"use client";

import React, { useState } from "react";

interface Space {
  id: number;
  name: string;
  city: string;
  category: string;
  price: number;
  capacity: number;
  rating: number;
  reviewCount: number;
  amenities: string[];
  imageUrl: string;
}

interface SpaceCardProps {
  space: Space;
  isSavedInitial?: boolean;
}

export const SpaceCard = ({
  space,
  isSavedInitial = false,
}: SpaceCardProps) => {
  const [isSaved, setIsSaved] = useState(isSavedInitial);

  const toggleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSaved(!isSaved);
    // TODO: Implement API call to PATCH /saved or POST /saved
  };

  return (
    <div className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={space.imageUrl}
          alt={space.name}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Wishlist Toggle */}
        <button
          onClick={toggleSave}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors shadow-sm"
          aria-label={isSaved ? "Remove from saved" : "Save space"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={isSaved ? "#ef4444" : "none"}
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke={isSaved ? "#ef4444" : "currentColor"}
            className="w-5 h-5 transition-colors"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </button>

        {/* Category Badge */}
        <div className="absolute bottom-3 left-3">
          <span className="px-2 py-1 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider rounded">
            {space.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-bold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
            {space.name}
          </h3>
          <div className="flex items-center gap-1 shrink-0">
            <span className="text-yellow-500 text-sm">★</span>
            <span className="text-sm font-semibold">{space.rating}</span>
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-3 flex items-center gap-1">
          <span className="opacity-70">📍</span> {space.city}
        </p>

        {/* Amenities Preview */}
        <div className="flex flex-wrap gap-1 mb-4">
          {space.amenities.slice(0, 3).map((amt) => (
            <span
              key={amt}
              className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded"
            >
              {amt}
            </span>
          ))}
          {space.amenities.length > 3 && (
            <span className="text-[10px] text-gray-400">
              +{space.amenities.length - 3}
            </span>
          )}
        </div>

        {/* Footer / Price */}
        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-gray-900">
              ${space.price}
            </span>
            <span className="text-xs text-gray-500 ml-1">/ day</span>
          </div>
          <div className="text-xs text-gray-400 font-medium">
            Up to {space.capacity} guests
          </div>
        </div>

        <button className="w-full mt-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors">
          View Details
        </button>
      </div>
    </div>
  );
};
