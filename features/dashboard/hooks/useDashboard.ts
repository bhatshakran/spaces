import { useMemo } from "react";
import { useSpacesData } from "@/features/spaces/context/SpacesContext";
import { Booking } from "@/features/bookings/types";

interface MonthlyData {
  month: string;
  spend: number;
  bookings: number;
}

export const useDashboard = (initialBookings: Booking[] = []) => {
  const { savedIds, isLoading: spacesLoading } = useSpacesData();
  const bookings = initialBookings;

  const stats = useMemo(() => {
    const now = new Date();
    const thisMonth = now.getMonth();
    const lastMonth = thisMonth === 0 ? 11 : thisMonth - 1;
    const thisYear = now.getFullYear();
    const lastMonthYear = thisMonth === 0 ? thisYear - 1 : thisYear;

    const activeBookings = bookings.filter(
      (b) => b.status === "Confirmed" || b.status === "Pending",
    );

    const thisMonthBookings = bookings.filter((b) => {
      const d = new Date(b.date);
      return d.getMonth() === thisMonth && d.getFullYear() === thisYear;
    });

    const lastMonthBookings = bookings.filter((b) => {
      const d = new Date(b.date);
      return d.getMonth() === lastMonth && d.getFullYear() === lastMonthYear;
    });

    const totalSpent = bookings
      .filter((b) => b.status === "Confirmed")
      .reduce((sum, b) => sum + b.amount, 0);

    const lastMonthSpent = lastMonthBookings
      .filter((b) => b.status === "Confirmed")
      .reduce((sum, b) => sum + b.amount, 0);

    const thisMonthSpent = thisMonthBookings
      .filter((b) => b.status === "Confirmed")
      .reduce((sum, b) => sum + b.amount, 0);

    const bookingTrend =
      lastMonthBookings.length === 0
        ? null
        : Math.round(
            ((thisMonthBookings.length - lastMonthBookings.length) /
              lastMonthBookings.length) *
              100,
          );

    const spendTrend =
      lastMonthSpent === 0
        ? null
        : Math.round(
            ((thisMonthSpent - lastMonthSpent) / lastMonthSpent) * 100,
          );

    return {
      savedCount: savedIds.size,
      activeBookings: activeBookings.length,
      totalSpent,
      totalBookings: bookings.length,
      bookingTrend,
      spendTrend,
    };
  }, [bookings, savedIds]);

  const monthlyData: MonthlyData[] = useMemo(() => {
    const map = new Map<string, { spend: number; bookings: number }>();

    bookings.forEach((b) => {
      const d = new Date(b.date);
      const key = d.toLocaleDateString("en-US", {
        month: "short",
        year: "2-digit",
      });
      const existing = map.get(key) ?? { spend: 0, bookings: 0 };
      map.set(key, {
        spend: existing.spend + (b.status === "Confirmed" ? b.amount : 0),
        bookings: existing.bookings + 1,
      });
    });

    // Sort chronologically and take last 6 months
    return Array.from(map.entries())
      .map(([month, data]) => ({ month, ...data }))
      .slice(-6);
  }, [bookings]);

  const upcomingBookings = useMemo(() => {
    const today = new Date().toISOString().split("T")[0];
    return bookings
      .filter((b) => b.date >= today && b.status !== "Cancelled")
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(0, 5);
  }, [bookings]);

  return {
    stats,
    monthlyData,
    upcomingBookings,
    isLoading: spacesLoading,
  };
};
