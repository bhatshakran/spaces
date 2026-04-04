export const ActiveFilters = ({ filters, onRemove, onClear }: any) => {
  const hasFilters = Object.keys(filters).some((key) => {
    const val = filters[key];
    return Array.isArray(val) ? val.length > 0 : !!val;
  });

  if (!hasFilters) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {filters.categories?.map((cat: string) => (
        <Chip
          key={cat}
          label={cat}
          onRemove={() => {
            onRemove(
              "categories",
              filters.categories.filter((c: string) => c !== cat),
            );
          }}
        />
      ))}
      {filters.amenities?.map((amt: string) => (
        <Chip
          key={amt}
          label={amt}
          onRemove={() => {
            onRemove(
              "amenities",
              filters.amenities.filter((a: string) => a !== amt),
            );
          }}
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
        className="text-sm text-red-600 font-medium hover:underline ml-2"
      >
        Clear All
      </button>
    </div>
  );
};

const Chip = ({ label, onRemove }: { label: string; onRemove: () => void }) => (
  <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm border border-blue-100">
    {label}
    <button onClick={onRemove} className="hover:text-blue-900 font-bold ml-1">
      &times;
    </button>
  </span>
);
