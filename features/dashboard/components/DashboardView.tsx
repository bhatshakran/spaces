"use client";

import Link from "next/link";
import { useDashboard } from "../hooks/useDashboard";
import { StatsCard } from "./StatsCard";
import { ActivityChart } from "./ActivityChart";
import { UpcomingBookings } from "./UpcomingBookings";

const IconSpaces = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
    />
  </svg>
);

const IconHeart = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
    />
  </svg>
);

const IconCalendar = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5"
    />
  </svg>
);

const IconWallet = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3"
    />
  </svg>
);

export const DashboardView = () => {
  const { stats, monthlyData, upcomingBookings, isLoading } = useDashboard();

  return (
    <div className="flex flex-col min-h-screen bg-[#F6F2EC]">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#F6F2EC]/90 backdrop-blur-md border-b border-stone-200/70">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center gap-4">
          <span className="font-cormorant text-[22px] font-semibold text-stone-800 tracking-tight">
            Overview
          </span>

          <div className="ml-auto flex items-center gap-3">
            <Link
              href="/discover"
              className="px-5 py-2 bg-stone-900 text-[#F6F2EC] rounded-xl text-sm font-medium
                hover:bg-[#C05A32] transition-colors duration-300"
            >
              Explore Spaces
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto w-full px-6 py-7 flex flex-col gap-6">
        {/* Stats grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
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
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard
              label="Total Bookings"
              value={stats.totalBookings}
              trend={stats.bookingTrend}
              icon={<IconSpaces />}
            />
            <StatsCard
              label="Saved Spaces"
              value={stats.savedCount}
              icon={<IconHeart />}
            />
            <StatsCard
              label="Active Bookings"
              value={stats.activeBookings}
              icon={<IconCalendar />}
            />
            <StatsCard
              label="Total Spent"
              value={stats.totalSpent}
              trend={stats.spendTrend}
              icon={<IconWallet />}
              prefix="$"
            />
          </div>
        )}

        {/* Chart + Upcoming */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
          {/* Activity chart */}
          <div className="bg-white rounded-[18px] border border-stone-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-cormorant text-[20px] font-semibold text-stone-800">
                  Monthly Activity
                </h2>
                <p className="text-xs text-stone-400 mt-0.5">
                  Spend and bookings over time
                </p>
              </div>
              <div className="flex items-center gap-4 text-[11px] text-stone-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#C05A32] inline-block" />
                  Spend
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#E8D5CC] inline-block" />
                  Bookings
                </span>
              </div>
            </div>
            {isLoading ? (
              <div className="h-[220px] bg-stone-50 rounded-xl animate-pulse" />
            ) : (
              <ActivityChart data={monthlyData} />
            )}
          </div>

          {/* Upcoming bookings */}
          <div className="bg-white rounded-[18px] border border-stone-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-cormorant text-[20px] font-semibold text-stone-800">
                  Upcoming
                </h2>
                <p className="text-xs text-stone-400 mt-0.5">
                  Your next bookings
                </p>
              </div>
              <Link
                href="/bookings"
                className="text-xs text-stone-400 hover:text-[#C05A32] underline underline-offset-4 transition-colors"
              >
                View all
              </Link>
            </div>
            {isLoading ? (
              <div className="space-y-4 animate-pulse">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center gap-4 py-3">
                    <div className="w-11 h-14 bg-stone-100 rounded-lg shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="h-3.5 bg-stone-100 rounded w-3/4" />
                      <div className="h-3 bg-stone-100 rounded w-1/3" />
                    </div>
                    <div className="w-16 h-5 bg-stone-100 rounded-full" />
                  </div>
                ))}
              </div>
            ) : (
              <UpcomingBookings bookings={upcomingBookings} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
