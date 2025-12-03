import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Git Receipts",
  description: "Github wrapped for the this year served as a receipt",
  openGraph: {
    title: "Git Receipts",
    description: "Github wrapped for the this year served as a receipt",
    url: "https://gitreceipts.vercel.app",
    images: "https://gitreceipts.vercel.app/receipts-meta.jpeg",
    siteName: "Git Receipts",
  },
  twitter: {
    card: "summary_large_image",
    title: "Git Receipts",
    description: "Github wrapped for the this year served as a receipt",
    images: "https://gitreceipts.vercel.app/receipts-meta.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
