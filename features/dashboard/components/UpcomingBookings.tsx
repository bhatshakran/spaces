"use client";

import Link from "next/link";
import { Booking, BookingStatus } from "@/features/bookings/types";

const STATUS_STYLES: Record<BookingStatus, string> = {
  Confirmed: "bg-green-50 text-green-700 border-green-100",
  Pending: "bg-amber-50 text-amber-700 border-amber-100",
  Cancelled: "bg-stone-100 text-stone-400 border-stone-200",
};

interface UpcomingBookingsProps {
  bookings: Booking[];
}

export const UpcomingBookings = ({ bookings }: UpcomingBookingsProps) => {
  if (bookings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <p className="text-sm text-stone-400">No upcoming bookings</p>
        <Link
          href="/discover"
          className="mt-3 text-xs text-[#C05A32] underline underline-offset-4"
        >
          Browse spaces
        </Link>
      </div>
    );
  }

  return (
    <div className="divide-y divide-stone-50">
      {bookings.map((booking) => {
        const date = new Date(booking.date);
        const day = date.toLocaleDateString("en-US", { day: "numeric" });
        const month = date.toLocaleDateString("en-US", { month: "short" });
        const weekday = date.toLocaleDateString("en-US", { weekday: "short" });

        return (
          <div key={booking.id} className="flex items-center gap-4 py-4 group">
            {/* Date block */}
            <div className="w-11 shrink-0 text-center">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[#C05A32]">
                {month}
              </p>
              <p className="font-cormorant text-[24px] font-semibold text-stone-800 leading-tight">
                {day}
              </p>
              <p className="text-[10px] text-stone-300 uppercase tracking-wider">
                {weekday}
              </p>
            </div>

            {/* Divider */}
            <div className="w-px h-10 bg-stone-100 shrink-0" />

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p
                className="font-cormorant text-[16px] font-semibold text-stone-800
                truncate group-hover:text-[#C05A32] transition-colors"
              >
                {booking.spaceName}
              </p>
              <p className="text-[11px] text-stone-400 mt-0.5">
                {booking.type}
              </p>
            </div>

            {/* Right side */}
            <div className="flex flex-col items-end gap-1.5 shrink-0">
              <span
                className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                  STATUS_STYLES[booking.status]
                }`}
              >
                {booking.status}
              </span>
              <span className="font-cormorant text-[15px] font-semibold text-stone-600">
                ${booking.amount.toLocaleString()}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
