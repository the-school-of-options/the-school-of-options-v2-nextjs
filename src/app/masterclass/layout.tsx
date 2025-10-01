import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Masterclass - The School of Options",
  description: "Join our exclusive masterclass and learn advanced options trading strategies from industry experts.",
  keywords: "options trading masterclass, advanced trading strategies, options education, trading mentorship",
};

export default function MasterclassLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
}
