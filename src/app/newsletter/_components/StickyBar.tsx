"use client";

import { useState } from "react";
import Link from "next/link";

interface StickyBarProps {
  className?: string;
}

export default function StickyBar({ className = '' }: StickyBarProps) {
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribeClick = () => {
    const subscribeSection = document.getElementById('subscribe');
    if (subscribeSection) {
      subscribeSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div 
      className={`fixed top-0 left-0 right-0 z-40 bg-gray-900/95 backdrop-blur-md border-b border-gray-700 shadow-lg ${className}`}
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Left side - TSO Logo and Branding */}
          <Link 
            href="/" 
            className="flex items-center gap-3 hover:opacity-80 transition-opacity duration-200"
          >
            {/* TSO Logo */}
            <div className="w-10 h-10 bg-[#2dcf95] rounded-lg flex items-center justify-center">
              <span className="text-gray-900 font-bold text-sm">TSO</span>
            </div>
            
            {/* Text Content - Hide on mobile */}
            <div className="hidden md:flex flex-col">
              <h1 className="text-white font-bold text-lg">The School of Options</h1>
              <p className="text-gray-400 text-xs">Free Weekly Newsletter</p>
            </div>
            
            {/* Mobile: Just show "TSO" text */}
            <div className="md:hidden">
              <h1 className="text-white font-bold text-sm">The School of Options</h1>
            </div>
          </Link>

          {/* Right side - CTA */}
          <button
            onClick={handleSubscribeClick}
            className="bg-[#2dcf95] hover:bg-[#2dcf99] text-gray-900 font-bold px-4 md:px-6 py-2 md:py-3 rounded-lg text-sm shadow-md transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-300 focus:ring-offset-2 focus:ring-offset-gray-900 whitespace-nowrap"
          >
            <span className="hidden md:inline">Subscribe</span>
            <span className="md:hidden">Subscribe</span>
          </button>
        </div>
      </div>
    </div>
  );
}
