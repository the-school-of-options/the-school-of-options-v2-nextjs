import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ScrollToTop from "@/components/ScrollToTop";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Providers } from "./providers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
  preload: true,
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "The School of Options - Learn Options Trading the Right Way",
  description: "The School of Options teaches Options Trading the right way: structured, clear, and logic-driven. Join 2 lakh+ learners with 20+ years of market lessons from Kundan Kishore.",
  keywords: "options trading, derivatives, trading education, Kundan Kishore, mentorship, trading strategies, risk management",
  authors: [{ name: "Kundan Kishore" }],
  creator: "Kundan Kishore",
  publisher: "The School of Options",
  robots: "index, follow",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" }
    ],
    apple: { url: "/favicon.svg", type: "image/svg+xml" }
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://theschoolofoptions.com",
    title: "The School of Options - Learn Options Trading the Right Way",
    description: "The School of Options teaches Options Trading the right way: structured, clear, and logic-driven. Join 2 lakh+ learners with 20+ years of market lessons.",
    siteName: "The School of Options",
  },
  twitter: {
    card: "summary_large_image",
    title: "The School of Options - Learn Options Trading the Right Way",
    description: "The School of Options teaches Options Trading the right way: structured, clear, and logic-driven. Join 2 lakh+ learners with 20+ years of market lessons.",
    creator: "@kundankishore",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A2540",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-TGK8FSM2');
            `,
          }}
        />
        
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TGK8FSM2"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        
        <Providers>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <ScrollToTop />
            {children}
          </TooltipProvider>
        </Providers>
      </body>
    </html>
  );
}
