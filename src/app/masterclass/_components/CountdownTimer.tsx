"use client";

import { useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 4,
    minutes: 51,
    seconds: 4
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center justify-center gap-2 md:gap-4">
      <div className="text-center">
        <div className="bg-gradient-orange rounded-lg px-3 py-2 md:px-4 md:py-3 shadow-orange">
          <div className="text-2xl md:text-3xl font-bold text-white">{timeLeft.days}</div>
          <div className="text-xs md:text-sm text-white/80 font-medium">Days</div>
        </div>
      </div>
      <div className="text-2xl md:text-3xl font-bold text-white/60">•</div>
      <div className="text-center">
        <div className="bg-gradient-orange rounded-lg px-3 py-2 md:px-4 md:py-3 shadow-orange">
          <div className="text-2xl md:text-3xl font-bold text-white">{timeLeft.hours}</div>
          <div className="text-xs md:text-sm text-white/80 font-medium">Hours</div>
        </div>
      </div>
      <div className="text-2xl md:text-3xl font-bold text-white/60">•</div>
      <div className="text-center">
        <div className="bg-gradient-orange rounded-lg px-3 py-2 md:px-4 md:py-3 shadow-orange">
          <div className="text-2xl md:text-3xl font-bold text-white">{timeLeft.minutes}</div>
          <div className="text-xs md:text-sm text-white/80 font-medium">Minutes</div>
        </div>
      </div>
      <div className="text-2xl md:text-3xl font-bold text-white/60">•</div>
      <div className="text-center">
        <div className="bg-gradient-orange rounded-lg px-3 py-2 md:px-4 md:py-3 shadow-orange">
          <div className="text-2xl md:text-3xl font-bold text-white">{timeLeft.seconds}</div>
          <div className="text-xs md:text-sm text-white/80 font-medium">Seconds</div>
        </div>
      </div>
    </div>
  );
};
