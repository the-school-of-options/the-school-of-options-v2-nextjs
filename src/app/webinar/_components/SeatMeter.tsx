'use client';

import { useState, useEffect } from 'react';

interface SeatMeterProps {
  className?: string;
  totalSeats?: number;
  filledSeats?: number;
}

export default function SeatMeter({ 
  className = '',
  totalSeats = 100,
  filledSeats = 73
}: SeatMeterProps) {
  const [animatedFilled, setAnimatedFilled] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (isReducedMotion) {
      setAnimatedFilled(filledSeats);
      return;
    }

    // Animate the fill
    const duration = 2000; // 2 seconds
    const startTime = Date.now();
    const startValue = 0;
    const endValue = filledSeats;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const currentValue = startValue + (endValue - startValue) * easeOutCubic;
      
      setAnimatedFilled(Math.round(currentValue));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [filledSeats, isReducedMotion]);

  const percentage = (animatedFilled / totalSeats) * 100;
  const remainingSeats = totalSeats - animatedFilled;

  return (
    <div className={`${className}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 bg-[var(--danger-500)] text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
          <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
          ⚠️ LIMITED SEATS
        </div>
        <span className="text-sm font-bold text-[var(--danger-500)] bg-[var(--danger-500)]/10 px-2 py-1 rounded-full">
          {remainingSeats} LEFT!
        </span>
      </div>
      
      <div className="relative">
        <div className="w-full h-2 bg-[var(--ink-700)] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[var(--acc-500)] to-[var(--acc-400)] rounded-full transition-all duration-300 ease-out shimmer"
            style={{ width: `${percentage}%` }}
          />
        </div>
        
        {/* Animated pulse effect */}
        {!isReducedMotion && (
          <div
            className="absolute top-0 h-2 bg-[var(--acc-400)] rounded-full opacity-60 animate-pulse"
            style={{ 
              width: `${percentage}%`,
              animationDuration: '2s'
            }}
          />
        )}
      </div>
      
      <div className="mt-2 text-xs text-[var(--text-70)] text-center">
        {animatedFilled} of {totalSeats} seats filled
      </div>
    </div>
  );
}
