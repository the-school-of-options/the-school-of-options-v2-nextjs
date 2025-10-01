'use client'
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowRight } from "lucide-react";

export const StickyCtaBar = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky CTA after scrolling 2% of the page
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      setIsVisible(scrollPercent > 2);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToRegistration = () => {
    document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-in-bottom">
      {/* Main CTA Bar */}
      <div className="bg-white/95 backdrop-blur-lg shadow-elevated border-t border-gray-200">
        <div className="container mx-auto px-4 py-2.5">
          <div className="flex items-center justify-between gap-3 max-w-screen-lg mx-auto">
            {/* FOMO Message - Compact */}
            <div className="flex items-center gap-2 text-sm">
              <div className="relative flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-destructive/10 border border-destructive/30">
                <div className="relative">
                  <AlertCircle className="w-3.5 h-3.5 text-destructive" />
                  <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive"></span>
                  </span>
                </div>
                <span className="font-bold text-destructive text-xs uppercase tracking-wide">
                  <span className="hidden sm:inline">Almost Full • </span>Only 7 Seats Left!
                </span>
              </div>
            </div>

            {/* CTA Button - Compact */}
            <Button 
              variant="cta" 
              size="default"
              onClick={scrollToRegistration}
              className="text-sm font-semibold group h-9 bg-gradient-orange text-black shadow-orange"
            >
              Reserve Your Seat
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};