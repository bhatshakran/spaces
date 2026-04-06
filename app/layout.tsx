import type { Metadata, Viewport } from "next"; // Added Viewport and Metadata types
import { AuthProvider } from "@/features/auth/context/AuthContext";
import "./globals.css";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";

// 1. Metadata Configuration
export const metadata: Metadata = {
  title: {
    default: "Spaces | Premium Event Spaces & Lofts",
    template: "%s | Spaces",
  },
  description:
    "Discover and book unique architectural spaces, from industrial lofts to rooftop lounges. Experience seamless booking for your next creative event.",
  keywords: [
    "event spaces",
    "loft rentals",
    "rooftop venues",
    "creative studios",
    "Spaces spaces",
  ],
  authors: [{ name: "Spaces Team" }],
  creator: "Spaces",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://spaces.com",
    title: "Spaces | Discover Unique Event Spaces",
    description:
      "The most beautiful architectural spaces for your next project or event.",
    siteName: "Spaces",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Spaces Spaces Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Spaces | Unique Spaces",
    description: "Premium event spaces at your fingertips.",
    images: ["/og-image.jpg"],
  },
};

// 2. Viewport Configuration (Better for mobile performance)
export const viewport: Viewport = {
  themeColor: "#4f46e5",
  width: "device-width",
  initialScale: 1,
};
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
