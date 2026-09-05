import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Oswald } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Fantasy League Almanac",
    template: "%s · Fantasy League Almanac",
  },
  description:
    "The permanent record of a fantasy football league running since 2009 — standings, playoffs, awards, and the all-time race.",
};

const NAV = [
  { href: "/", label: "Home" },
  { href: "/seasons", label: "Seasons" },
  { href: "/managers", label: "Managers" },
  { href: "/records", label: "Records" },
  { href: "/legends", label: "All-Time" },
  { href: "/scoring", label: "Scoring" },
];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${oswald.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <header className="border-b border-border bg-paper-elevated">
          <div className="mx-auto flex max-w-5xl flex-wrap items-baseline gap-x-6 gap-y-1 px-4 py-3">
            <Link href="/" className="display text-lg text-turf">
              The Almanac
            </Link>
            <nav className="flex gap-4 text-sm text-ink-muted">
              {NAV.slice(1).map((n) => (
                <Link key={n.href} href={n.href} className="hover:text-ink">
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>
        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">{children}</main>
        <footer className="border-t border-border px-4 py-6 text-center text-xs text-ink-muted">
          Fantasy League Almanac · seasons 2009–2021 imported · 2022+ pending Yahoo API
        </footer>
      </body>
    </html>
  );
}
