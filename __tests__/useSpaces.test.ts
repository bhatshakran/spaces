// @vitest-environment node
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

const filterSpaces = (spaces: Space[], filters: Record<string, unknown>) => {
  return spaces
    .filter((space) => {
      if (filters.search) {
        const q = (filters.search as string).toLowerCase();
        const match =
          space.name.toLowerCase().includes(q) ||
          space.city.toLowerCase().includes(q) ||
          space.description.toLowerCase().includes(q);
        if (!match) return false;
      }
      if ((filters.categories as string[])?.length > 0) {
        if (!(filters.categories as string[]).includes(space.category))
          return false;
      }
      if (filters.minPrice && space.price < (filters.minPrice as number))
        return false;
      if (filters.maxPrice && space.price > (filters.maxPrice as number))
        return false;
      if (
        filters.minCapacity &&
        space.capacity < (filters.minCapacity as number)
      )
        return false;
      if (filters.rating && space.rating < (filters.rating as number))
        return false;
      if ((filters.amenities as string[])?.length > 0) {
        const hasAll = (filters.amenities as string[]).every((a) =>
          space.amenities.includes(a),
        );
        if (!hasAll) return false;
      }
      return true;
    })
    .sort((a, b) => {
      switch (filters.sort) {
        case "price_asc":
          return a.price - b.price;
        case "price_desc":
          return b.price - a.price;
        default:
          return b.id - a.id;
      }
    });
};

const SPACES: Space[] = [
  {
    id: 1,
    name: "Marble Loft",
    city: "New York",
    category: "Studio",
    price: 420,
    capacity: 12,
    rating: 4.9,
    amenities: ["WiFi", "Projector"],
    description: "A beautiful loft",
  },
  {
    id: 2,
    name: "Oleander House",
    city: "Charleston",
    category: "Garden",
    price: 310,
    capacity: 40,
    rating: 4.8,
    amenities: ["WiFi", "PA System"],
    description: "A garden venue",
  },
  {
    id: 3,
    name: "Meridian Board",
    city: "Chicago",
    category: "Conference",
    price: 180,
    capacity: 18,
    rating: 4.7,
    amenities: ["WiFi", "Whiteboard"],
    description: "A professional boardroom",
  },
];

describe("useSpaces filter logic", () => {
  it("returns all spaces with empty filters", () => {
    expect(filterSpaces(SPACES, {})).toHaveLength(3);
  });

  it("filters by search matching name", () => {
    const result = filterSpaces(SPACES, { search: "marble" });
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Marble Loft");
  });

  it("filters by search matching city", () => {
    const result = filterSpaces(SPACES, { search: "chicago" });
    expect(result).toHaveLength(1);
    expect(result[0].city).toBe("Chicago");
  });

  it("filters by search matching description", () => {
    const result = filterSpaces(SPACES, { search: "garden venue" });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(2);
  });

  it("filters by category", () => {
    const result = filterSpaces(SPACES, { categories: ["Studio"] });
    expect(result).toHaveLength(1);
    expect(result[0].category).toBe("Studio");
  });

  it("filters by multiple categories", () => {
    const result = filterSpaces(SPACES, {
      categories: ["Studio", "Garden"],
    });
    expect(result).toHaveLength(2);
  });

  it("filters by minPrice", () => {
    const result = filterSpaces(SPACES, { minPrice: 300 });
    expect(result).toHaveLength(2);
    result.forEach((s) => expect(s.price).toBeGreaterThanOrEqual(300));
  });

  it("filters by maxPrice", () => {
    const result = filterSpaces(SPACES, { maxPrice: 300 });
    expect(result).toHaveLength(1);
    expect(result[0].price).toBeLessThanOrEqual(300);
  });

  it("filters by minCapacity", () => {
    const result = filterSpaces(SPACES, { minCapacity: 20 });
    expect(result).toHaveLength(1);
    expect(result[0].capacity).toBeGreaterThanOrEqual(20);
  });

  it("filters by minimum rating", () => {
    const result = filterSpaces(SPACES, { rating: 4.8 });
    expect(result).toHaveLength(2);
    result.forEach((s) => expect(s.rating).toBeGreaterThanOrEqual(4.8));
  });

  it("filters by amenities — requires ALL selected", () => {
    const result = filterSpaces(SPACES, {
      amenities: ["WiFi", "Projector"],
    });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(1);
  });

  it("returns empty array when nothing matches", () => {
    expect(filterSpaces(SPACES, { search: "xyz nonexistent" })).toHaveLength(0);
  });

  it("sorts by price ascending", () => {
    const result = filterSpaces(SPACES, { sort: "price_asc" });
    const prices = result.map((s) => s.price);
    expect(prices).toEqual([180, 310, 420]);
  });

  it("sorts by price descending", () => {
    const result = filterSpaces(SPACES, { sort: "price_desc" });
    const prices = result.map((s) => s.price);
    expect(prices).toEqual([420, 310, 180]);
  });

  it("defaults to sorting by id descending (newest)", () => {
    const result = filterSpaces(SPACES, {});
    expect(result[0].id).toBe(3);
    expect(result[2].id).toBe(1);
  });

  it("applies multiple filters together", () => {
    const result = filterSpaces(SPACES, {
      categories: ["Studio", "Conference"],
      minPrice: 200,
      rating: 4.8,
    });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(1);
  });
});
