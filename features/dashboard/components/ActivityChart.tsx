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

interface PayloadItem {
  value: number;
  name: string;
  dataKey: string;
  payload: {
    month: string;
    spend: number;
    bookings: number;
  };
}
interface CustomTooltipProps {
  active?: boolean;
  payload?: PayloadItem[];
  label?: string;
}
const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  // Check if the tooltip is active and has data
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  // Use optional chaining and type casting to ensure toLocaleString works
  const spend = payload[0]?.value as number;
  const bookings = payload[1]?.value as number;

  return (
    <div className="bg-white border border-stone-100 rounded-xl px-4 py-3 shadow-lg">
      <p className="text-xs font-semibold text-stone-500 mb-2">{label}</p>
      <div className="space-y-1">
        <p className="text-sm font-semibold text-stone-800">
          ${spend?.toLocaleString() ?? 0}{" "}
          <span className="text-xs font-normal text-stone-400">spent</span>
        </p>
        <p className="text-sm font-semibold text-stone-800">
          {bookings ?? 0}{" "}
          <span className="text-xs font-normal text-stone-400">bookings</span>
        </p>
      </div>
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
    <div className="w-full h-[220px]">
      <ResponsiveContainer width="100%" height="100%">
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
            }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{
              fontSize: 11,
              fill: "#A8A29E",
            }}
            tickFormatter={(v) => `$${v}`}
            width={48}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "#FBF0EB", radius: 4 }}
          />
          <Bar dataKey="spend" fill="#C05A32" radius={[4, 4, 0, 0]} />
          <Bar dataKey="bookings" fill="#E8D5CC" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
