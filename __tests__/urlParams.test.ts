// @vitest-environment node
import { SpaceFilters } from "@/features/spaces/types/spaces";
import { describe, it, expect } from "vitest";

// Mirrors the serialization logic in useUrlFilters
const serializeFilters = (filters: SpaceFilters): string => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (!value || (Array.isArray(value) && value.length === 0)) return;
    if (Array.isArray(value)) params.set(key, value.join(","));
    else params.set(key, String(value));
  });
  return params.toString();
};

const deserializeFilters = (search: string) => {
  const params = Object.fromEntries(new URLSearchParams(search));
  return {
    search: params.search || "",
    sort: params.sort || "newest",
    categories: params.categories ? params.categories.split(",") : [],
    amenities: params.amenities ? params.amenities.split(",") : [],
    minPrice: params.minPrice ? Number(params.minPrice) : undefined,
    maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
    minCapacity: params.minCapacity ? Number(params.minCapacity) : undefined,
    rating: params.rating ? Number(params.rating) : undefined,
  };
};

describe("URL param serialization", () => {
  it("serializes a search string", () => {
    expect(serializeFilters({ search: "loft" })).toBe("search=loft");
  });

  it("serializes an array as comma-separated", () => {
    expect(serializeFilters({ categories: ["Studio", "Garden"] })).toBe(
      "categories=Studio%2CGarden",
    );
  });

  it("omits empty arrays", () => {
    expect(serializeFilters({ categories: [] })).toBe("");
  });

  it("omits falsy values", () => {
    expect(serializeFilters({ search: "", minPrice: 0 })).toBe("");
  });

  it("serializes numeric values as strings", () => {
    expect(serializeFilters({ minPrice: 100 })).toBe("minPrice=100");
  });
});

describe("URL param deserialization", () => {
  it("returns defaults for empty string", () => {
    const result = deserializeFilters("");
    expect(result.search).toBe("");
    expect(result.sort).toBe("newest");
    expect(result.categories).toEqual([]);
    expect(result.amenities).toEqual([]);
    expect(result.minPrice).toBeUndefined();
  });

  it("parses search string", () => {
    expect(deserializeFilters("search=loft").search).toBe("loft");
  });

  it("parses comma-separated categories into array", () => {
    const result = deserializeFilters("categories=Studio,Garden");
    expect(result.categories).toEqual(["Studio", "Garden"]);
  });

  it("parses minPrice as number", () => {
    expect(deserializeFilters("minPrice=200").minPrice).toBe(200);
  });

  it("parses rating as number", () => {
    expect(deserializeFilters("rating=4.5").rating).toBe(4.5);
  });

  it("roundtrips correctly — serialize then deserialize", () => {
    const original = {
      search: "loft",
      categories: ["Studio", "Garden"],
      minPrice: 100,
      maxPrice: 500,
      rating: 4.5,
    };
    const serialized = serializeFilters(original);
    const result = deserializeFilters(serialized);
    expect(result.search).toBe("loft");
    expect(result.categories).toEqual(["Studio", "Garden"]);
    expect(result.minPrice).toBe(100);
    expect(result.maxPrice).toBe(500);
    expect(result.rating).toBe(4.5);
  });
});
