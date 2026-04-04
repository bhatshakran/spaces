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

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(localValue);
    }, 400); // 400ms debounce
    return () => clearTimeout(timer);
  }, [localValue, onChange]);

  return (
    <div className="relative group">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
        🔍
      </span>
      <input
        type="text"
        placeholder="Search by name, location, or vibe..."
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        className="w-full pl-12 pr-4 py-3 bg-gray-100 border-none rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all outline-none"
      />
    </div>
  );
};
