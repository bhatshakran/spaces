export type BookingStatus = "Pending" | "Confirmed" | "Cancelled";
export type BookingType = "Full Day" | "Half Day" | "Evening";
export type SortDirection = "asc" | "desc";
export type SortField = "spaceName" | "date" | "type" | "status" | "amount";

export interface Booking {
  id: number;
  spaceId: number;
  spaceName: string;
  date: string;
  type: BookingType;
  status: BookingStatus;
  amount: number;
}

export interface BookingFilters {
  search: string;
  statuses: BookingStatus[];
  dateFrom: string;
  dateTo: string;
}

export interface SortConfig {
  field: SortField;
  direction: SortDirection;
}
