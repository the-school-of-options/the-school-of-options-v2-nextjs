'use client'
import { useEffect, useState } from 'react';

const messages = new Array(10).fill('Few Seats Left – Secure Your Spot Today');

export const TopTickerBar = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  return (
    <div className="w-full bg-gradient-orange text-white text-sm font-semibold">
      <div className="relative overflow-hidden">
        <div className={`flex gap-2 whitespace-nowrap py-1.5 ${isMounted ? 'animate-marquee' : ''}`}>
          {messages.map((m, i) => (
            <span key={i} className="inline-block">★ {m}</span>
          ))}
        </div>
      </div>
    </div>
  );
};


