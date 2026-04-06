"use client";
import { useState, useEffect } from "react";

export const SearchInput = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) => {
  const [localValue, setLocalValue] = useState(value);

  // 1. Sync local state with the prop (URL)
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // 2. Debounce local changes back to the parent
  useEffect(() => {
    // Only trigger onChange if the value is actually different
    // to prevent unnecessary URL updates/loops
    const timer = setTimeout(() => {
      if (localValue !== value) {
        onChange(localValue);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [localValue, onChange, value]);

  return (
    <div className="relative group w-full">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-4 h-4 text-stone-400 group-focus-within:text-[#C05A32] transition-colors duration-200"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </div>
      <input
        type="text"
        placeholder="Search by name, location, or vibe…"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        className="w-full pl-10 pr-4 py-[11px] bg-white border border-stone-200 rounded-xl
          focus:outline-none focus:border-[#C05A32] focus:ring-2 focus:ring-[#C05A32]/10
          transition-all duration-200 placeholder:text-stone-300 text-stone-800
          font-[350] text-sm tracking-wide"
      />
    </div>
  );
};
