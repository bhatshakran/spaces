"use client";

import { FilterPanel } from "./FilterPanel";

export const FilterModal = ({
  isOpen,
  onClose,
  filters,
  setFilter,
  clearFilters,
}: any) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#1A110A]/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal — max-h keeps it within viewport */}
      <div className="relative bg-white w-full max-w-2xl rounded-[24px] shadow-2xl flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
        {/* Header — fixed, never scrolls */}
        <div className="flex items-center justify-between px-7 py-5 border-b border-stone-100 shrink-0">
          <h2 className="font-cormorant text-[22px] font-semibold text-stone-800">
            Filters
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full
              hover:bg-stone-100 transition-colors text-stone-400 hover:text-stone-600"
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
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Body — only this part scrolls */}
        <div className="px-7 py-6 overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-stone-200 scrollbar-track-transparent">
          <FilterPanel filters={filters} setFilter={setFilter} />
        </div>

        {/* Footer — fixed, never scrolls */}
        <div className="px-7 py-5 bg-stone-50 border-t border-stone-100 flex items-center justify-between shrink-0">
          <button
            onClick={() => {
              clearFilters();
              onClose();
            }}
            className="text-sm font-medium text-stone-400 hover:text-stone-700
              underline underline-offset-4 transition-colors"
          >
            Clear all
          </button>
          <button
            onClick={onClose}
            className="px-8 py-2.5 bg-stone-900 text-[#F6F2EC] rounded-xl text-sm
              font-medium hover:bg-[#C05A32] transition-colors duration-300"
          >
            Show Results
          </button>
        </div>
      </div>
    </div>
  );
};
