"use client";

interface StatsCardProps {
  label: string;
  value: string | number;
  trend?: number | null;
  icon: React.ReactNode;
  prefix?: string;
}

export const StatsCard = ({
  label,
  value,
  trend,
  icon,
  prefix = "",
}: StatsCardProps) => {
  const isPositive = trend !== null && trend !== undefined && trend >= 0;
  const trendAbs =
    trend !== null && trend !== undefined ? Math.abs(trend) : null;

  return (
    <div
      className="bg-white rounded-[18px] border border-stone-100 p-6 flex flex-col gap-4
      hover:shadow-[0_4px_24px_rgba(26,17,10,0.06)] transition-shadow duration-300"
    >
      {/* Top row */}
      <div className="flex items-start justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-stone-400">
          {label}
        </p>
        <div className="w-9 h-9 rounded-xl bg-[#FBF0EB] flex items-center justify-center text-[#C05A32]">
          {icon}
        </div>
      </div>

      {/* Value */}
      <div className="flex items-baseline gap-1">
        {prefix && (
          <span className="font-cormorant text-[18px] font-semibold text-stone-400">
            {prefix}
          </span>
        )}
        <span className="font-cormorant text-[36px] font-semibold text-stone-800 leading-none">
          {typeof value === "number" ? value.toLocaleString() : value}
        </span>
      </div>

      {/* Trend */}
      {trendAbs !== null && (
        <div className="flex items-center gap-1.5">
          <span
            className={`flex items-center gap-0.5 text-[11px] font-semibold px-2 py-0.5 rounded-full ${
              isPositive
                ? "bg-green-50 text-green-600"
                : "bg-red-50 text-red-500"
            }`}
          >
            <svg
              className="w-2.5 h-2.5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d={isPositive ? "M12 4l8 8H4l8-8z" : "M12 20l-8-8h16l-8 8z"}
              />
            </svg>
            {trendAbs}%
          </span>
          <span className="text-[11px] text-stone-300">from last month</span>
        </div>
      )}
    </div>
  );
};
