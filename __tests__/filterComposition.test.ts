// @vitest-environment node
import { SpaceFilters } from "@/features/spaces/types/spaces";
import { describe, it, expect } from "vitest";

interface Space {
  id: number;
  name: string;
  city: string;
  category: string;
  price: number;
  capacity: number;
  rating: number;
  amenities: string[];
  description: string;
}

// Mirrors the filter logic in useSpaces exactly
const applyFilters = (spaces: Space[], filters: SpaceFilters) => {
  return spaces.filter((space) => {
    if (filters.search) {
      const q = filters.search.toLowerCase();
      const match =
        space.name.toLowerCase().includes(q) ||
        space.city.toLowerCase().includes(q) ||
        space.description.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (filters.categories && filters.categories.length > 0) {
      if (!filters.categories.includes(space.category)) return false;
    }
    if (filters.minPrice !== undefined && space.price < filters.minPrice)
      return false;
    if (filters.maxPrice !== undefined && space.price > filters.maxPrice)
      return false;
    if (
      filters.minCapacity !== undefined &&
      space.capacity < filters.minCapacity
    )
      return false;
    if (filters.rating !== undefined && space.rating < filters.rating)
      return false;
    if (filters.amenities && filters.amenities.length > 0) {
      const hasAll = filters.amenities.every((a) =>
        space.amenities.includes(a),
      );
      if (!hasAll) return false;
    }
    return true;
  });
};

const SPACES: Space[] = [
  {
    id: 1,
    name: "The Marble Loft",
    city: "New York",
    category: "Studio",
    price: 420,
    capacity: 12,
    rating: 4.9,
    amenities: ["WiFi", "Projector", "Kitchenette"],
    description: "A beautiful studio loft",
  },
  {
    id: 2,
    name: "Oleander House",
    city: "Charleston",
    category: "Garden",
    price: 310,
    capacity: 40,
    rating: 4.8,
    amenities: ["WiFi", "PA System", "Catering"],
    description: "A garden venue",
  },
  {
    id: 3,
    name: "Meridian Boardroom",
    city: "Chicago",
    category: "Conference",
    price: 180,
    capacity: 18,
    rating: 4.7,
    amenities: ["WiFi", "Whiteboard", "Video Conf"],
    description: "A professional boardroom",
  },
];

describe("filter composition", () => {
  it("returns all spaces with empty filters", () => {
    expect(applyFilters(SPACES, {})).toHaveLength(3);
  });

  it("filters by search — matches name", () => {
    const result = applyFilters(SPACES, { search: "marble" });
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("The Marble Loft");
  });

  it("filters by search — matches city", () => {
    const result = applyFilters(SPACES, { search: "chicago" });
    expect(result).toHaveLength(1);
    expect(result[0].city).toBe("Chicago");
  });

  it("filters by search — matches description", () => {
    const result = applyFilters(SPACES, { search: "garden venue" });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(2);
  });

  it("filters by single category", () => {
    const result = applyFilters(SPACES, { categories: ["Studio"] });
    expect(result).toHaveLength(1);
    expect(result[0].category).toBe("Studio");
  });

  it("filters by multiple categories", () => {
    const result = applyFilters(SPACES, { categories: ["Studio", "Garden"] });
    expect(result).toHaveLength(2);
  });

  it("filters by minPrice", () => {
    const result = applyFilters(SPACES, { minPrice: 300 });
    expect(result).toHaveLength(2);
    result.forEach((s) => expect(s.price).toBeGreaterThanOrEqual(300));
  });

  it("filters by maxPrice", () => {
    const result = applyFilters(SPACES, { maxPrice: 300 });
    expect(result).toHaveLength(1);
    expect(result[0].price).toBeLessThanOrEqual(300);
  });

  it("filters by price range", () => {
    const result = applyFilters(SPACES, { minPrice: 200, maxPrice: 400 });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(2);
  });

  it("filters by minCapacity", () => {
    const result = applyFilters(SPACES, { minCapacity: 20 });
    expect(result).toHaveLength(1);
    expect(result[0].capacity).toBeGreaterThanOrEqual(20);
  });

  it("filters by minimum rating", () => {
    const result = applyFilters(SPACES, { rating: 4.8 });
    expect(result).toHaveLength(2);
    result.forEach((s) => expect(s.rating).toBeGreaterThanOrEqual(4.8));
  });

  it("filters by amenities — must have ALL selected", () => {
    const result = applyFilters(SPACES, { amenities: ["WiFi", "Projector"] });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(1);
  });

  it("returns empty array when no spaces match", () => {
    const result = applyFilters(SPACES, { search: "nonexistent xyz" });
    expect(result).toHaveLength(0);
  });

  it("applies multiple filters together (AND logic)", () => {
    const result = applyFilters(SPACES, {
      categories: ["Studio", "Conference"],
      minPrice: 200,
      rating: 4.8,
    });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(1);
  });
});
