# 🌌 Spaces | Space Discovery

A premium, high-performance dashboard and discovery platform for curated spaces. Built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**, Spaces focuses on a seamless user experience where the URL is the source of truth.

---

### Production: [Click here](https://spaces-json-server.netlify.app/)

## 🚀 Getting Started

### 1\. Prerequisites

Ensure you have **Node.js 18+** installed.

### 2\. Run the Mock Backend

Spaces uses `json-server` to simulate a real database. In your first terminal window:

```bash
pnpm run server
```

### 3\. Run the Application

In a second terminal window, install dependencies and start the development server:

```bash
pnpm install
pnpm run dev
```

Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) to see the result.

---

## 🧪 Running Tests

We use **Vitest** to ensure filter logic and component rendering remain stable.

```bash
# Run all tests
pnpm run test

# Run tests and display details in UI
pnpm run test:ui

```

---

## 🏗️ Architecture Overview

The project follows a **Feature-Based Architecture**. Instead of grouping by "type" (putting all hooks in one folder), we group by "domain."

- **`features/spaces`**: Contains all logic related to space discovery, including `useSpaces` (filtering logic) and `useUrlFilters` (navigation logic).
- **`components/ui`**: Shared, low-level atoms (Buttons, Inputs, Chips) that don't have business logic.
- **Separation of Concerns**: Components handle **UI/Layout**, while Hooks handle **State/Logic**. This made it easy to fix those `any` types across the entire filter flow without touching the JSX.

---

## ⚡ Server vs. Client Components

| Component Type | Where                                                               | Why                                                                                                                                                  |
| :------------- | :------------------------------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Server**     | `page.tsx` (Dashboard/Auth)                                         | Data fetching happens close to the source. This reduces the "waterfall" effect and improves SEO and initial load times.                              |
| **Client**     | `FilterPanel`, `ActivityChart`, `DiscoveryView` `DiscoveryGrid` etc | Any component requiring interactivity (`useState`), browser APIs (URL params), or third-party UI libraries (Recharts) is marked with `"use client"`. |

---

## 🛠️ Filter State Design

We chose **URL-First State Management**.
Instead of keeping filter values in a local `useState`, we sync them directly to the URL search parameters using the `useUrlFilters` hook.

- **Benefits**: Users can refresh the page, go back/forward, or share a specific filtered view (e.g., "All Creative Studios with WiFi") simply by copying the link.
- **Sync Logic**: The `useSpaces` hook listens to the stringified URL params. When the URL changes, `useMemo` re-calculates the filtered list instantly.

---

## 🪟 Virtualization

For the **DiscoveryGrid**, we implemented **List Virtualization** (using `react-virtuoso`).

- **The Choice**: Rather than rendering 500+ space cards at once (which would kill DOM performance), we only render what is visible in the viewport.
- **Why**: This keeps the "Spaces" experience feeling "buttery smooth" even as the dataset grows, maintaining a constant 60fps during scrolling.

---

## ⚖️ Trade-offs

### 1\. Client-Side vs. Server-Side Filtering

- **Decision**: Client-side filtering.
- **Reasoning**: Since our dataset is relatively small (\<1000 items), filtering locally provides an "instant" feel. If we grew to 100k+ items, we would move this logic to API query parameters.

### 2\. `JSON.stringify` in Dependency Arrays

- **Decision**: Used `JSON.stringify(filters)` in `useMemo`.
- **Reasoning**: It prevents infinite re-render loops caused by object reference changes. While there is a micro-performance cost to stringifying, it is safer and more maintainable than listing 10 individual primitive dependencies.

---

## 📈 Future Improvements (Prioritized)

1.  **Persistent Favorites**: Add a `localStorage` or DB-backed "Wishlist" feature for spaces.
2.  **Responsive Refinement**: A mobile-specific bottom-sheet for filters, as the current grid layout is optimized for desktop.
3.  **Refactoring**: Lots of room for refactoring and making things modular.
4.  **Skeleton States**: Replace the basic "Spinner" with shimmering skeleton cards to improve perceived performance.

---

## ⏱️ Time Spent

- **Architecture & Setup**: 2 hours
- **Feature Development (Filters/Charts)**: 6 hours
- **TypeScript Refactoring, UI styling & Hardening**: 3 hours
- **Testing, Polishing & Documentation**: 2 hours
- **Total**: \~13 hours

---

> **Note**: No `any` types were harmed (or left behind) in the making of this dashboard. 🧘‍♂️
