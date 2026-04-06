import { Suspense } from "react";
import { BookingsView } from "@/features/bookings/components/BookingsView";

export default function BookingsPage() {
  return (
    <Suspense fallback={null}>
      <BookingsView />
    </Suspense>
  );
}
