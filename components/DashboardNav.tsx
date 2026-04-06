"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSpacesData } from "@/features/spaces/context/SpacesContext";
import { useAuth } from "@/features/auth/context/AuthContext";
import { useState } from "react";

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
  const router = useRouter();
  const { user, logout } = useAuth();
  const { savedIds } = useSpacesData();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  const initials = user
    ? `${user.firstName[0]}${user.lastName?.[0] ?? ""}`.toUpperCase()
    : "?";

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

        {/* Nav links */}
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
                  className={`transition-colors duration-200 ${active ? "text-[#C05A32]" : "text-stone-400 group-hover:text-stone-600"}`}
                >
                  {icon}
                </span>
                {label}
                {href === "/collection" && savedIds.size > 0 && (
                  <span
                    className="ml-0.5 bg-[#C05A32] text-white text-[10px] font-semibold
                      w-4 h-4 rounded-full flex items-center justify-center leading-none"
                  >
                    {savedIds.size > 9 ? "9+" : savedIds.size}
                  </span>
                )}
                {active && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#C05A32] rounded-full" />
                )}
              </Link>
            );
          })}
        </div>

        {/* User menu */}
        <div className="relative shrink-0">
          <button
            onClick={() => setMenuOpen((p) => !p)}
            className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl
                hover:bg-stone-100 transition-colors group"
          >
            {/* Avatar */}
            <div
              className="w-8 h-8 rounded-full bg-stone-900 flex items-center justify-center
                text-[#F6F2EC] text-[11px] font-semibold shrink-0"
            >
              {initials}
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-xs font-medium text-stone-700 leading-tight">
                {user?.firstName} {user?.lastName}
              </p>
              {user?.isGuest && (
                <p className="text-[10px] text-stone-400">Guest</p>
              )}
            </div>
            <svg
              className={`w-3.5 h-3.5 text-stone-400 transition-transform ${menuOpen ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* Dropdown */}
          {menuOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setMenuOpen(false)}
              />
              <div
                className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl border
                  border-stone-100 shadow-lg overflow-hidden z-20 animate-in fade-in slide-in-from-top-2 duration-150"
              >
                <div className="px-4 py-3 border-b border-stone-50">
                  <p className="text-sm font-medium text-stone-800 truncate">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs text-stone-400 truncate">
                    {user?.email}
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-4 py-3 text-sm text-red-500
                      hover:bg-red-50 transition-colors text-left"
                >
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
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                    />
                  </svg>
                  Sign out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
