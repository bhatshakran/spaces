"use client";

import { CATEGORIES } from "../constants/FIlterOptions";

interface CategoryBarProps {
  selected?: string;
  // onSelect accepts the category string or null if "All Spaces" is clicked
  onSelect: (category: string | null) => void;
}
export const CategoryBar = ({ selected, onSelect }: CategoryBarProps) => {
  return (
    <div className="flex items-center gap-8 overflow-x-auto no-scrollbar pb-2">
      <button
        onClick={() => onSelect(null)}
        className={`flex flex-col items-center gap-2 min-w-fit transition-all ${
          !selected
            ? "text-indigo-600 border-b-2 border-indigo-600 pb-2"
            : "text-slate-500 hover:text-slate-800 pb-2 border-b-2 border-transparent"
        }`}
      >
        <span className="text-xs font-bold uppercase tracking-widest">
          All Spaces
        </span>
      </button>

      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`flex flex-col items-center gap-2 min-w-fit transition-all ${
            selected === cat
              ? "text-indigo-600 border-b-2 border-indigo-600 pb-2"
              : "text-slate-500 hover:text-slate-800 pb-2 border-b-2 border-transparent"
          }`}
        >
          <span className="text-xs font-bold uppercase tracking-widest">
            {cat}
          </span>
        </button>
      ))}
    </div>
  );
};
