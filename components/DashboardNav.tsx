"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSpacesData } from "@/features/spaces/context/SpacesContext";

const NAV_ITEMS = [
  {
    href: "/",
    label: "Overview",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
        />
      </svg>
    ),
  },
  {
    href: "/discover",
    label: "Discover",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>
    ),
  },
  {
    href: "/collection",
    label: "Collection",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
    ),
  },
  {
    href: "/bookings",
    label: "Bookings",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5"
        />
      </svg>
    ),
  },
];

export const DashboardNav = () => {
  const pathname = usePathname();
  const { savedIds } = useSpacesData();

  // Active check — exact match for root, startsWith for others
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#F6F2EC]/90 backdrop-blur-md border-b border-stone-200/70">
      <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-cormorant text-[22px] font-semibold text-stone-800 tracking-tight shrink-0"
        >
          Spa<span className="text-[#C05A32]">ce</span>s
        </Link>

        {/* Nav links — centered */}
        <div className="flex items-center gap-1">
          {NAV_ITEMS.map(({ href, label, icon }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm
                  font-medium transition-all duration-200 group
                  ${
                    active
                      ? "text-[#C05A32] bg-[#FBF0EB]"
                      : "text-stone-500 hover:text-stone-800 hover:bg-stone-100/80"
                  }`}
              >
                <span
                  className={`transition-colors duration-200 ${
                    active
                      ? "text-[#C05A32]"
                      : "text-stone-400 group-hover:text-stone-600"
                  }`}
                >
                  {icon}
                </span>
                {label}

                {/* Badge for collection count */}
                {href === "/collection" && savedIds.size > 0 && (
                  <span
                    className="ml-0.5 bg-[#C05A32] text-white text-[10px] font-semibold
                    w-4 h-4 rounded-full flex items-center justify-center leading-none"
                  >
                    {savedIds.size > 9 ? "9+" : savedIds.size}
                  </span>
                )}

                {/* Active underline */}
                {active && (
                  <span
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5
                    bg-[#C05A32] rounded-full"
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right side — CTA */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/discover"
            className="px-5 py-2 bg-stone-900 text-[#F6F2EC] rounded-xl text-sm font-medium
              hover:bg-[#C05A32] transition-colors duration-300"
          >
            + New Booking
          </Link>
        </div>
      </div>
    </nav>
  );
};
