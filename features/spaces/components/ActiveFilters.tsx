import { FilterKey, SpaceFilters } from "../types/spaces";

interface ActiveFiltersProps {
  filters: SpaceFilters;
  onRemove: (key: FilterKey, value: string | string[]) => void;
  onClear: () => void;
}
export const ActiveFilters = ({
  filters,
  onRemove,
  onClear,
}: ActiveFiltersProps) => {
  // Check if any filter (excluding sort) has a value
  const hasFilters = Object.entries(filters).some(([key, val]) => {
    if (key === "sort") return false; // We don't count sorting as an "active filter" chip
    return Array.isArray(val) ? val.length > 0 : !!val;
  });
  if (!hasFilters) return null;

  return (
    <div className="flex flex-wrap items-center gap-2.5 pt-2">
      {filters.categories?.map((cat: string) => (
        <Chip
          key={cat}
          label={cat}
          onRemove={() =>
            onRemove(
              "categories",
              filters.categories!.filter((c: string) => c !== cat),
            )
          }
        />
      ))}
      {filters.amenities?.map((amt: string) => (
        <Chip
          key={amt}
          label={amt}
          onRemove={() =>
            onRemove(
              "amenities",
              filters.amenities!.filter((a: string) => a !== amt),
            )
          }
        />
      ))}
      {filters.search && (
        <Chip
          label={`Search: ${filters.search}`}
          onRemove={() => onRemove("search", "")}
        />
      )}

      <button
        onClick={onClear}
        className="text-sm text-slate-500 font-semibold hover:text-slate-800 transition-colors px-2 py-1 rounded-md hover:bg-slate-100 ml-1"
      >
        Clear All
      </button>
    </div>
  );
};

const Chip = ({ label, onRemove }: { label: string; onRemove: () => void }) => (
  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white shadow-sm border border-slate-200 text-slate-700 rounded-full text-sm font-medium hover:border-slate-300 hover:bg-slate-50 transition-all duration-200 group">
    {label}
    <button
      onClick={onRemove}
      className="text-slate-400 group-hover:text-slate-700 transition-colors focus:outline-none"
      aria-label={`Remove ${label}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-4 h-4"
      >
        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
      </svg>
    </button>
  </span>
);
