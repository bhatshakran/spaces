"use client";

import { useBookings } from "../hooks/useBookings";
import { BookingStatus, SortField } from "../types";
import Link from "next/link";

const STATUSES: BookingStatus[] = ["Pending", "Confirmed", "Cancelled"];

const STATUS_STYLES: Record<BookingStatus, string> = {
  Confirmed: "bg-green-50 text-green-700 border-green-100",
  Pending: "bg-amber-50 text-amber-700 border-amber-100",
  Cancelled: "bg-stone-100 text-stone-400 border-stone-200",
};

// !TODO: Refactor this file
const SortIcon = ({
  active,
  direction,
}: {
  active: boolean;
  direction: "asc" | "desc";
}) => (
  <span
    className="inline-flex flex-col gap-[2px] ml-1.5 opacity-40"
    style={{ opacity: active ? 1 : 0.3 }}
  >
    <svg
      width="8"
      height="5"
      viewBox="0 0 8 5"
      fill={active && direction === "asc" ? "#C05A32" : "#8B7B6E"}
    >
      <path d="M4 0L8 5H0L4 0Z" />
    </svg>
    <svg
      width="8"
      height="5"
      viewBox="0 0 8 5"
      fill={active && direction === "desc" ? "#C05A32" : "#8B7B6E"}
    >
      <path d="M4 5L0 0H8L4 5Z" />
    </svg>
  </span>
);

export const BookingsView = () => {
  const {
    filteredBookings,
    isLoading,
    isError,
    retry,
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
    totalCount,
    cancelSelected,
    exportCsv,
    cancelOne,
  } = useBookings();

  const hasActiveFilters =
    filters.search ||
    filters.statuses.length > 0 ||
    filters.dateFrom ||
    filters.dateTo;

  return (
    <div className="flex flex-col min-h-screen bg-[#F6F2EC]">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#F6F2EC]/90 backdrop-blur-md ">
        <div className="max-w-[1400px] mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <span className="font-cormorant text-[22px] font-semibold text-stone-800 tracking-tight">
              Bookings
            </span>

            {!isLoading && (
              <span className="text-sm text-stone-300">{totalCount} total</span>
            )}

            {/* Search */}
            <div className="relative ml-auto max-w-xs w-full">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search by space name…"
                value={filters.search}
                onChange={(e) => setFilter("search", e.target.value)}
                className="w-full pl-9 pr-4 py-[10px] bg-white border border-stone-200 rounded-xl text-sm
                  placeholder:text-stone-300 text-stone-700 focus:outline-none focus:border-[#C05A32]
                  focus:ring-2 focus:ring-[#C05A32]/10 transition-all"
              />
            </div>
          </div>

          {/* Filter row */}
          <div className="mt-3 pt-3 flex items-center gap-3 flex-wrap">
            {/* Status pills */}
            <div className="flex gap-2">
              {STATUSES.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    const next = filters.statuses.includes(s)
                      ? filters.statuses.filter((x) => x !== s)
                      : [...filters.statuses, s];
                    setFilter("statuses", next);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all ${
                    filters.statuses.includes(s)
                      ? "bg-[#C05A32] border-[#C05A32] text-white"
                      : "bg-transparent border-stone-200 text-stone-500 hover:border-[#C05A32]/40"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            <span className="text-stone-200">|</span>

            {/* Date range */}
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={filters.dateFrom}
                onChange={(e) => setFilter("dateFrom", e.target.value)}
                className="bg-white border border-stone-200 text-stone-600 py-1.5 px-3 rounded-xl
                  text-xs focus:outline-none focus:border-[#C05A32] focus:ring-2 focus:ring-[#C05A32]/10
                  transition-all cursor-pointer"
              />
              <span className="text-stone-300 text-xs">—</span>
              <input
                type="date"
                value={filters.dateTo}
                onChange={(e) => setFilter("dateTo", e.target.value)}
                className="bg-white border border-stone-200 text-stone-600 py-1.5 px-3 rounded-xl
                  text-xs focus:outline-none focus:border-[#C05A32] focus:ring-2 focus:ring-[#C05A32]/10
                  transition-all cursor-pointer"
              />
            </div>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="ml-auto text-xs text-stone-400 hover:text-[#C05A32] underline underline-offset-4 transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto w-full px-6 py-7 flex-1">
        {/* Bulk action bar */}
        {selectedInFiltered > 0 && (
          <div
            className="mb-4 flex items-center justify-between bg-white border border-stone-100
            rounded-xl px-5 py-3 shadow-sm"
          >
            <span className="text-sm font-medium text-stone-700">
              <span className="text-[#C05A32] font-semibold">
                {selectedInFiltered}
              </span>{" "}
              of {filteredBookings.length} selected
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={exportCsv}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-stone-200
                  text-xs font-medium text-stone-600 hover:border-stone-300 hover:bg-stone-50 transition-all"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Export CSV
              </button>
              <button
                onClick={cancelSelected}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-50 border border-red-100
                  text-xs font-medium text-red-600 hover:bg-red-100 transition-all"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Cancel selected
              </button>
            </div>
          </div>
        )}

        {/* Error state */}
        {isError && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4">
              <svg
                className="w-5 h-5 text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
              </svg>
            </div>
            <p className="text-sm font-medium text-stone-600 mb-1">
              Failed to load bookings
            </p>
            <p className="text-xs text-stone-400 mb-5">
              Check your connection and try again
            </p>
            <button
              onClick={retry}
              className="px-6 py-2.5 bg-stone-900 text-[#F6F2EC] rounded-xl text-sm font-medium
                hover:bg-[#C05A32] transition-colors duration-300"
            >
              Retry
            </button>
          </div>
        )}

        {/* Loading state */}
        {isLoading && (
          <div className="bg-white rounded-[18px] border border-stone-100 overflow-hidden animate-pulse">
            <div className="h-12 bg-stone-50 border-b border-stone-100" />
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-4 px-5 py-4 border-b border-stone-50"
              >
                <div className="w-4 h-4 rounded bg-stone-100" />
                <div className="h-3.5 bg-stone-100 rounded w-48" />
                <div className="h-3.5 bg-stone-100 rounded w-24 ml-auto" />
                <div className="h-3.5 bg-stone-100 rounded w-20" />
                <div className="h-5 bg-stone-100 rounded-full w-20" />
                <div className="h-3.5 bg-stone-100 rounded w-16" />
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !isError && filteredBookings.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mb-4">
              <svg
                className="w-5 h-5 text-stone-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5"
                />
              </svg>
            </div>
            <p className="text-sm font-medium text-stone-500">
              No bookings found
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="mt-3 text-xs text-[#C05A32] underline underline-offset-4"
              >
                Clear filters
              </button>
            )}
          </div>
        )}

        {/* Table */}
        {!isLoading && !isError && filteredBookings.length > 0 && (
          <div className="bg-white rounded-[18px] border border-stone-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                {/* Sticky header */}
                <thead className="sticky top-0 z-10 bg-stone-50 border-b border-stone-100">
                  <tr>
                    <th className="w-10 px-5 py-3.5 text-left">
                      <input
                        type="checkbox"
                        checked={allFilteredSelected}
                        onChange={toggleSelectAll}
                        className="w-4 h-4 rounded border-stone-300 accent-[#C05A32] cursor-pointer"
                      />
                    </th>
                    {(
                      [
                        { label: "Space", field: "spaceName" },
                        { label: "Date", field: "date" },
                        { label: "Type", field: "type" },
                        { label: "Status", field: "status" },
                        { label: "Amount", field: "amount" },
                      ] as { label: string; field: SortField }[]
                    ).map(({ label, field }) => (
                      <th
                        key={field}
                        onClick={() => cycleSort(field)}
                        className="px-4 py-3.5 text-left text-[11px] font-semibold uppercase
                          tracking-[0.07em] text-stone-400 cursor-pointer hover:text-stone-600
                          transition-colors select-none whitespace-nowrap"
                      >
                        {label}
                        <SortIcon
                          active={sort.field === field}
                          direction={sort.direction}
                        />
                      </th>
                    ))}
                    <th
                      className="px-4 py-3.5 text-left text-[11px] font-semibold uppercase
                      tracking-[0.07em] text-stone-400"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-50">
                  {filteredBookings.map((booking) => {
                    const isSelected = selectedIds.has(booking.id);
                    return (
                      <tr
                        key={booking.id}
                        className={`transition-colors ${
                          isSelected ? "bg-[#FBF0EB]" : "hover:bg-stone-50/60"
                        }`}
                      >
                        <td className="px-5 py-4">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleSelect(booking.id)}
                            className="w-4 h-4 rounded border-stone-300 accent-[#C05A32] cursor-pointer"
                          />
                        </td>
                        <td className="px-4 py-4">
                          <span className="font-cormorant text-[16px] font-semibold text-stone-800">
                            {booking.spaceName}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm text-stone-500 whitespace-nowrap">
                          {new Date(booking.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </td>
                        <td className="px-4 py-4">
                          <span
                            className="text-xs font-medium text-stone-500 bg-stone-50
                            border border-stone-100 px-2.5 py-1 rounded-md whitespace-nowrap"
                          >
                            {booking.type}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <span
                            className={`text-[11px] font-semibold px-2.5 py-1 rounded-full
                            border whitespace-nowrap ${STATUS_STYLES[booking.status]}`}
                          >
                            {booking.status}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <span className="font-cormorant text-[17px] font-semibold text-stone-800">
                            ${booking.amount.toLocaleString()}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          {booking.status !== "Cancelled" ? (
                            <button
                              onClick={() => cancelOne(booking.id)}
                              className="text-xs font-medium text-stone-400 hover:text-red-500
                                transition-colors underline underline-offset-4"
                            >
                              Cancel
                            </button>
                          ) : (
                            <span className="text-xs text-stone-300">—</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Table footer */}
            <div className="px-5 py-3.5 border-t border-stone-50 flex items-center justify-between">
              <span className="text-xs text-stone-400">
                Showing{" "}
                <span className="font-medium text-stone-600">
                  {filteredBookings.length}
                </span>{" "}
                bookings
              </span>
              <button
                onClick={exportCsv}
                className="flex items-center gap-1.5 text-xs font-medium text-stone-400
                  hover:text-[#C05A32] transition-colors"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Export all
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
