"use client";

const CATEGORIES = [
  "Banquet Hall",
  "Meeting Room",
  "Coworking",
  "Rooftop",
  "Studio",
];
const AMENITIES = [
  "Parking",
  "Catering",
  "AV Equipment",
  "WiFi",
  "Outdoor",
  "Bar",
];

export const FilterPanel = ({ filters, setFilter }: any) => {
  const handleCheckboxChange = (list: string[], item: string, name: string) => {
    const newList = list.includes(item)
      ? list.filter((i) => i !== item)
      : [...list, item];
    setFilter(name, newList);
  };

  return (
    <div className="space-y-8">
      {/* Category Section */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">
          Category
        </h3>
        <div className="space-y-2">
          {CATEGORIES.map((cat) => (
            <label
              key={cat}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={filters.categories?.includes(cat)}
                onChange={() =>
                  handleCheckboxChange(filters.categories, cat, "categories")
                }
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 group-hover:text-blue-600 transition-colors">
                {cat}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Capacity Section */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">
          Min Capacity
        </h3>
        <input
          type="number"
          placeholder="e.g. 50"
          value={filters.minCapacity || ""}
          onChange={(e) => setFilter("minCapacity", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* Amenities Section */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">
          Amenities
        </h3>
        <div className="flex flex-wrap gap-2">
          {AMENITIES.map((amt) => (
            <button
              key={amt}
              onClick={() =>
                handleCheckboxChange(filters.amenities, amt, "amenities")
              }
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                filters.amenities?.includes(amt)
                  ? "bg-blue-600 border-blue-600 text-white"
                  : "bg-white border-gray-300 text-gray-600 hover:border-blue-400"
              }`}
            >
              {amt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
