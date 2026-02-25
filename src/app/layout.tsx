import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jetseen — Residency Day Tracking for Digital Nomads",
  description:
    "Track your days across borders so you never accidentally trigger tax residency, overstay a visa, or fail an audit.",
  openGraph: {
    title: "Jetseen — Residency Day Tracking for Digital Nomads",
    description:
      "Track your days across borders so you never accidentally trigger tax residency, overstay a visa, or fail an audit.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={plusJakarta.variable}>
      <body className="bg-white text-text antialiased">{children}</body>
    </html>
  );
}
