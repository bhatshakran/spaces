"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { Booking, BookingFilters, SortConfig } from "../types";

export const useBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [filters, setFilters] = useState<BookingFilters>({
    search: "",
    statuses: [],
    dateFrom: "",
    dateTo: "",
  });

  const [sort, setSort] = useState<SortConfig>({
    field: "date",
    direction: "desc",
  });

  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  // Fetch
  const fetchBookings = useCallback(async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      const res = await fetch("http://localhost:3001/bookings");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setBookings(data);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);
  const cancelOne = async (id: number) => {
    await fetch(`http://localhost:3001/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "Cancelled" }),
    });
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "Cancelled" } : b)),
    );
  };

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  // Filtered + sorted
  const filteredBookings = useMemo(() => {
    return bookings
      .filter((b) => {
        if (
          filters.search &&
          !b.spaceName.toLowerCase().includes(filters.search.toLowerCase())
        )
          return false;
        if (filters.statuses.length > 0 && !filters.statuses.includes(b.status))
          return false;
        if (filters.dateFrom && b.date < filters.dateFrom) return false;
        if (filters.dateTo && b.date > filters.dateTo) return false;
        return true;
      })
      .sort((a, b) => {
        const dir = sort.direction === "asc" ? 1 : -1;
        if (sort.field === "amount") return (a.amount - b.amount) * dir;
        return a[sort.field].localeCompare(b[sort.field]) * dir;
      });
  }, [bookings, filters, sort]);

  // Selection
  const toggleSelect = (id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    const filteredIds = new Set(filteredBookings.map((b) => b.id));
    const allSelected = filteredBookings.every((b) => selectedIds.has(b.id));
    if (allSelected) {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        filteredIds.forEach((id) => next.delete(id));
        return next;
      });
    } else {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        filteredIds.forEach((id) => next.add(id));
        return next;
      });
    }
  };

  // Bulk cancel
  const cancelSelected = async () => {
    const ids = Array.from(selectedIds);
    await Promise.all(
      ids.map((id) =>
        fetch(`http://localhost:3001/bookings/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "Cancelled" }),
        }),
      ),
    );
    setBookings((prev) =>
      prev.map((b) =>
        selectedIds.has(b.id) ? { ...b, status: "Cancelled" } : b,
      ),
    );
    setSelectedIds(new Set());
  };

  // Export CSV
  const exportCsv = () => {
    const rows = filteredBookings.filter((b) => selectedIds.has(b.id));
    const target = rows.length > 0 ? rows : filteredBookings;
    const headers = ["ID", "Space", "Date", "Type", "Status", "Amount"];
    const lines = [
      headers.join(","),
      ...target.map((b) =>
        [b.id, `"${b.spaceName}"`, b.date, b.type, b.status, b.amount].join(
          ",",
        ),
      ),
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "bookings.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const cycleSort = (field: SortConfig["field"]) => {
    setSort((prev) =>
      prev.field === field
        ? { field, direction: prev.direction === "asc" ? "desc" : "asc" }
        : { field, direction: "asc" },
    );
  };

  const setFilter = <K extends keyof BookingFilters>(
    key: K,
    value: BookingFilters[K],
  ) => setFilters((prev) => ({ ...prev, [key]: value }));

  const clearFilters = () =>
    setFilters({ search: "", statuses: [], dateFrom: "", dateTo: "" });

  const selectedInFiltered = filteredBookings.filter((b) =>
    selectedIds.has(b.id),
  ).length;
  const allFilteredSelected =
    filteredBookings.length > 0 &&
    filteredBookings.every((b) => selectedIds.has(b.id));

  return {
    bookings,
    filteredBookings,
    isLoading,
    isError,
    retry: fetchBookings,
    filters,
    setFilter,
    clearFilters,
    sort,
    cycleSort,
    selectedIds,
    toggleSelect,
    toggleSelectAll,
    allFilteredSelected,
    selectedInFiltered,
    totalCount: bookings.length,
    cancelSelected,
    exportCsv,
    cancelOne,
  };
};
