import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Most Watched | Discover eBay's most-wanted items",
  description: "Discover eBay's most-wanted items",
  applicationName: 'most-watched',
  authors: [{ name: "justbenfyi", url: 'https://justben.fyi' }],
  creator: "@justbenfyi",
  keywords: ['ebay', 'watch', 'saved', 'watched', 'watchcount', 'search', 'browse', 'bid', 'bids', 'bidcount'],
  twitter: { card: "summary_large_image", creator: "@justbenfyi", "images": "/me.webp" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta property="canonical" content="https://mostwatched.justben.fyi" />

        <meta property="og:title" content="Most Watched | Discover eBay's most-wanted items" />
        <meta property="og:description" content="Discover eBay's most-wanted items" />
        <meta property="og:image" content="/me.webp" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mostwatched.justben.fyi" />

        <meta property="twitter:card" content="https://mostwatched.justben.fyi/me.webp" />
        <meta property="twitter:title" content="Most Watched" />
        <meta property="twitter:site" content="https://mostwatched.justben.fyi" />
        <meta property="twitter:creator" content="@justbenfyi" />
        <meta property="twitter:description" content="Most Watched | Discover eBay's most-wanted items." />
        <meta property="twitter:image" content="https://mostwatched.justben.fyi/me.webp" />

      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
