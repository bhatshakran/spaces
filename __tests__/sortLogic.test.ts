// @vitest-environment node
import { describe, it, expect } from "vitest";

interface Booking {
  id: number;
  spaceName: string;
  date: string;
  type: string;
  status: string;
  amount: number;
}

const applySort = (
  bookings: Booking[],
  field: keyof Booking,
  direction: "asc" | "desc",
) => {
  return [...bookings].sort((a, b) => {
    const dir = direction === "asc" ? 1 : -1;
    if (field === "amount") return (a.amount - b.amount) * dir;
    return String(a[field]).localeCompare(String(b[field])) * dir;
  });
};

const BOOKINGS: Booking[] = [
  {
    id: 1,
    spaceName: "Marble Loft",
    date: "2025-03-15",
    type: "Full Day",
    status: "Confirmed",
    amount: 420,
  },
  {
    id: 2,
    spaceName: "Oleander House",
    date: "2025-01-10",
    type: "Half Day",
    status: "Pending",
    amount: 155,
  },
  {
    id: 3,
    spaceName: "Blanc Hall",
    date: "2025-06-01",
    type: "Evening",
    status: "Cancelled",
    amount: 890,
  },
];

describe("sort logic", () => {
  it("sorts by amount ascending", () => {
    const result = applySort(BOOKINGS, "amount", "asc");
    expect(result.map((b) => b.amount)).toEqual([155, 420, 890]);
  });

  it("sorts by amount descending", () => {
    const result = applySort(BOOKINGS, "amount", "desc");
    expect(result.map((b) => b.amount)).toEqual([890, 420, 155]);
  });

  it("sorts by date ascending", () => {
    const result = applySort(BOOKINGS, "date", "asc");
    expect(result[0].date).toBe("2025-01-10");
    expect(result[2].date).toBe("2025-06-01");
  });

  it("sorts by date descending", () => {
    const result = applySort(BOOKINGS, "date", "desc");
    expect(result[0].date).toBe("2025-06-01");
  });

  it("sorts by spaceName ascending alphabetically", () => {
    const result = applySort(BOOKINGS, "spaceName", "asc");
    expect(result[0].spaceName).toBe("Blanc Hall");
    expect(result[2].spaceName).toBe("Oleander House");
  });

  it("sorts by status alphabetically descending", () => {
    const result = applySort(BOOKINGS, "status", "desc");
    expect(result[0].status).toBe("Pending");
  });

  it("does not mutate the original array", () => {
    const original = [...BOOKINGS];
    applySort(BOOKINGS, "amount", "asc");
    expect(BOOKINGS).toEqual(original);
  });
});
