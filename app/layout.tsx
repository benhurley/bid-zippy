import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BidZippy™ | Uncover Top Listings on eBay",
  description: "BidZippy™ | Uncover Top Listings on eBay",
  applicationName: 'biz-zippy',
  authors: [{ name: "justbenfyi", url: 'https://justben.fyi' }],
  creator: "@justbenfyi",
  keywords: ['ebay', 'watch', 'saved', 'watched', 'watchcount', 'search', 'browse', 'bid', 'bids', 'bidcount', 'bidzippy', 'auction', 'snipe', 'zippy', 'fast', 'quick', 'instant'],
  twitter: { card: "summary_large_image", creator: "@justbenfyi", "images": "/screenshot.webp" },
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

        <meta property="og:title" content="BidZippy™ | Uncover Top Listings on eBay" />
        <meta property="og:description" content="BidZippy™ | Uncover Top Listings on eBay" />
        <meta property="og:image" content="/me.webp" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bidzippy.com" />

        <meta property="twitter:card" content="https://bidzippy.com/screenshot.webp" />
        <meta property="twitter:title" content="BidZippy™" />
        <meta property="twitter:site" content="https://bidzippy.com" />
        <meta property="twitter:creator" content="@justbenfyi" />
        <meta property="twitter:description" content="BidZippy™ | Uncover Top Listings on eBay" />
        <meta property="twitter:image" content="https://bidzippy.com/screenshot.webp" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1423946275603152"
        crossOrigin="anonymous"></script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
