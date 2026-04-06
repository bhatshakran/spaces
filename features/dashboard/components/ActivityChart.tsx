"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface MonthlyData {
  month: string;
  spend: number;
  bookings: number;
}

interface ActivityChartProps {
  data: MonthlyData[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-stone-100 rounded-xl px-4 py-3 shadow-lg">
      <p className="text-xs font-semibold text-stone-500 mb-2">{label}</p>
      <p className="text-sm font-semibold text-stone-800">
        ${payload[0]?.value?.toLocaleString()}{" "}
        <span className="text-xs font-normal text-stone-400">spent</span>
      </p>
      <p className="text-sm font-semibold text-stone-800">
        {payload[1]?.value}{" "}
        <span className="text-xs font-normal text-stone-400">bookings</span>
      </p>
    </div>
  );
};

export const ActivityChart = ({ data }: ActivityChartProps) => {
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-sm text-stone-300">
        No activity data yet
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} barGap={4} barCategoryGap="30%">
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke="#F1EDE8"
        />
        <XAxis
          dataKey="month"
          axisLine={false}
          tickLine={false}
          tick={{
            fontSize: 11,
            fill: "#A8A29E",
            fontFamily: "var(--font-dm-sans)",
          }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{
            fontSize: 11,
            fill: "#A8A29E",
            fontFamily: "var(--font-dm-sans)",
          }}
          tickFormatter={(v) => `$${v}`}
          width={48}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "#FBF0EB" }} />
        <Bar dataKey="spend" fill="#C05A32" radius={[6, 6, 0, 0]} />
        <Bar dataKey="bookings" fill="#E8D5CC" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};
