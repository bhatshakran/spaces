export const DashboardSkeleton = () => (
  <div className="max-w-[1400px] mx-auto px-6 py-7 animate-pulse">
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-[18px] border border-stone-100 p-6 h-36"
        >
          <div className="h-3 bg-stone-100 rounded w-24 mb-4" />
          <div className="h-8 bg-stone-100 rounded w-20 mb-3" />
          <div className="h-3 bg-stone-100 rounded w-32" />
        </div>
      ))}
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
      <div className="bg-white rounded-[18px] border border-stone-100 p-6 h-80" />
      <div className="bg-white rounded-[18px] border border-stone-100 p-6 h-80" />
    </div>
  </div>
);
