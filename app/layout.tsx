import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BidZippy™ | Quickly Find the Best Auctions on eBay",
  description: "BidZippy™ | Quickly Find the Best Auctions on eBay",
  applicationName: 'biz-zippy',
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
        <meta property="canonical" content="https://bidzippy.com" />

        <meta property="og:title" content="BidZippy™ | Quickly Find the Best Auctions on eBay." />
        <meta property="og:description" content="BidZippy™ | Quickly Find the Best Auctions on eBay." />
        <meta property="og:image" content="/me.webp" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bidzippy.com" />

        <meta property="twitter:card" content="https://bidzippy.com/screenshot.webp" />
        <meta property="twitter:title" content="BidZippy™" />
        <meta property="twitter:site" content="https://bidzippy.com" />
        <meta property="twitter:creator" content="@justbenfyi" />
        <meta property="twitter:description" content="BidZippy™ | Quickly Find the Best Auctions on eBay." />
        <meta property="twitter:image" content="https://bidzippy.com/screenshot.webp" />

      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
