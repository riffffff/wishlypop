import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://wishlypop.com";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "WishlyPop | Personalized Birthday Cards",
    template: "%s | WishlyPop",
  },
  description: "Create beautiful personalized birthday cards online in minutes. Add a heartfelt message, photo, and interactive envelope reveal with WishlyPop.",
  keywords: [
    "personalized birthday card",
    "online birthday card",
    "digital birthday card",
    "birthday ecard",
    "birthday card maker",
    "send birthday card online",
    "interactive birthday card",
    "birthday card with photo",
    "last minute birthday gift",
  ],
  authors: [{ name: "WishlyPop" }],
  creator: "WishlyPop",
  publisher: "WishlyPop",
  applicationName: "WishlyPop",
  generator: "WishlyPop",
  category: "gifts",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "WishlyPop",
    title: "WishlyPop | Personalized Birthday Cards",
    description: "Create a beautiful personalized birthday card online and share it with someone special.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "WishlyPop | Personalized Birthday Cards",
    description: "Create and share a personalized interactive birthday card in minutes.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
