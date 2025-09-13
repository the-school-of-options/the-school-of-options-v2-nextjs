'use client';

import { useState, useEffect } from 'react';
import { content } from '../content';

// Helper function to parse session date and find the earliest one
const getEarliestSessionDate = () => {
  const sessionOptions = content.sessions.options;
  let earliestDate = null;
  
  for (const option of sessionOptions) {
    // Parse date from label like "English - Sep 13, Sat 8:00–10:00 PM IST"
    const dateMatch = option.label.match(/(\w{3})\s+(\d{1,2})/);
    if (dateMatch) {
      const month = dateMatch[1];
      const day = parseInt(dateMatch[2]);
      
      // Convert month name to number
      const monthMap: { [key: string]: number } = {
        'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
        'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
      };
      
      // Try current year first, then next year if the date has passed
      const currentYear = new Date().getFullYear();
      
      // Create date directly in IST timezone
      let sessionDate = new Date(`${currentYear}-${String(monthMap[month] + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}T20:00:00+05:30`);
      
      // If the date has already passed this year, try next year
      const now = new Date();
      if (sessionDate < now) {
        sessionDate = new Date(`${currentYear + 1}-${String(monthMap[month] + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}T20:00:00+05:30`);
      }
      
      if (!earliestDate || sessionDate < earliestDate) {
        earliestDate = sessionDate;
      }
    }
  }
  
  return earliestDate || new Date('2024-09-13T20:00:00+05:30'); // fallback to Sep 13, 2024
};

interface CountdownProps {
  variant?: 'long' | 'mini';
  className?: string;
  'aria-live'?: 'polite' | 'assertive' | 'off';
}

export default function Countdown({ 
  variant = 'long', 
  className = '',
  'aria-live': ariaLive = 'polite'
}: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

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
    const calculateTimeLeft = () => {
      const now = new Date();
      
      // Get the earliest session date from content
      const sessionDate = getEarliestSessionDate();
      
      // If the session date has passed, calculate next occurrence
      let targetDate = new Date(sessionDate);
      if (now >= targetDate) {
        // If current time is past the session, get next week's session
        targetDate.setDate(targetDate.getDate() + 7);
      }
      
      const timeDiff = targetDate.getTime() - now.getTime();
      
      if (timeDiff <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
      
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
      
      return { days, hours, minutes, seconds };
    };

    const updateCountdown = () => {
      setTimeLeft(calculateTimeLeft());
    };

    // Initial calculation
    updateCountdown();

    // Only set interval if not reduced motion
    if (!isReducedMotion) {
      const interval = setInterval(updateCountdown, 1000);
      return () => clearInterval(interval);
    }
  }, [isReducedMotion]);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  if (variant === 'mini') {
    return (
      <div 
        className={`text-sm font-medium ${className}`}
        aria-live={ariaLive}
        aria-label={`Time remaining: ${timeLeft.days} days, ${timeLeft.hours} hours, ${timeLeft.minutes} minutes, ${timeLeft.seconds} seconds`}
      >
        {timeLeft.days > 0 && (
          <>
            {timeLeft.days}d{' '}
          </>
        )}
        {formatNumber(timeLeft.hours)}:{formatNumber(timeLeft.minutes)}:{formatNumber(timeLeft.seconds)}
      </div>
    );
  }

  return (
    <div 
      className={`flex items-center gap-1 ${className}`}
      aria-live={ariaLive}
      aria-label={`Time remaining: ${timeLeft.days} days, ${timeLeft.hours} hours, ${timeLeft.minutes} minutes, ${timeLeft.seconds} seconds`}
    >
      <span className="font-bold text-lg">{formatNumber(timeLeft.days)}</span>
      <span className="text-sm opacity-70">d</span>
      <span className="mx-1 opacity-50">:</span>
      <span className="font-bold text-lg">{formatNumber(timeLeft.hours)}</span>
      <span className="text-sm opacity-70">h</span>
      <span className="mx-1 opacity-50">:</span>
      <span className="font-bold text-lg">{formatNumber(timeLeft.minutes)}</span>
      <span className="text-sm opacity-70">m</span>
      <span className="mx-1 opacity-50">:</span>
      <span className="font-bold text-lg">{formatNumber(timeLeft.seconds)}</span>
      <span className="text-sm opacity-70">s</span>
    </div>
  );
}

