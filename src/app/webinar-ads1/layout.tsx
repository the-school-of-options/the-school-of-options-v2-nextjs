import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free 2-Hour Options Trading Masterclass | The School of Options",
  description: "Learn the Logic and Discipline most option traders never get. A free, 2-hour masterclass with Kundan Kishore to replace guesswork with systematic, probability-first approach.",
  keywords: "options trading masterclass, free trading course, Kundan Kishore, options education, trading strategies, risk management",
  authors: [{ name: "Kundan Kishore" }],
  creator: "Kundan Kishore",
  publisher: "The School of Options",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://theschoolofoptions.com/webinar-ads1",
    title: "Free 2-Hour Options Trading Masterclass | The School of Options",
    description: "Learn the Logic and Discipline most option traders never get. A free, 2-hour masterclass with Kundan Kishore to replace guesswork with systematic, probability-first approach.",
    siteName: "The School of Options",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free 2-Hour Options Trading Masterclass | The School of Options",
    description: "Learn the Logic and Discipline most option traders never get. A free, 2-hour masterclass with Kundan Kishore to replace guesswork with systematic, probability-first approach.",
    creator: "@kundankishore",
  },
};

export default function WebinarAds1Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

