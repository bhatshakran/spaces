export default function Loading() {
  return (
    <div className="max-w-[1400px] mx-auto w-full px-6 py-7 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex items-baseline justify-between mb-8">
        <div className="h-9 w-48 bg-stone-200 rounded-lg" /> {/* Title */}
        <div className="h-6 w-24 bg-stone-100 rounded-md" /> {/* Count */}
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}

const SkeletonCard = () => (
  <div className="flex flex-col gap-3">
    {/* Image Placeholder */}
    <div className="aspect-4/3 w-full bg-stone-200 rounded-2xl overflow-hidden relative">
      {/* Gradient Shimmer Overlay */}
      <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite]" />
    </div>

    {/* Content Placeholders */}
    <div className="space-y-2 px-1">
      <div className="flex justify-between items-start">
        <div className="h-5 w-2/3 bg-stone-200 rounded" />
        <div className="h-4 w-10 bg-stone-100 rounded" />
      </div>
      <div className="h-4 w-1/2 bg-stone-100 rounded" />
      <div className="h-5 w-1/3 bg-stone-200 rounded mt-2" />
    </div>
  </div>
);
