import { DashboardView } from "@/features/dashboard/components/DashboardView";

// Fetches initial bookings on the server, zero client JS for the data fetch
export default async function DashboardPage() {
  let initialBookings = [];
  let isError = false;

  try {
    const res = await fetch("http://localhost:3001/bookings", {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch"); // Trigger the catch block

    initialBookings = await res.json();
  } catch (err) {
    console.error("Dashboard Fetch Error:", err);
    isError = true; // Tell the client it failed
  }

  return (
    <DashboardView initialBookings={initialBookings} serverError={isError} />
  );
}
