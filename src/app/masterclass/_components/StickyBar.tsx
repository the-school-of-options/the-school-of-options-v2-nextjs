"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const StickyBar = () => {
  const [isVisible, setIsVisible] = useState(true);
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

  const scrollToRegistration = () => {
    const element = document.querySelector('[data-registration-form]');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-orange shadow-orange">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          {/* Timer - Compact format like screenshot */}
          <div className="flex items-center gap-1">
            <div className="bg-black/20 rounded px-2 py-1 text-center min-w-[36px]">
              <div className="text-sm font-bold text-white">{timeLeft.days}</div>
              <div className="text-[10px] text-white/80">Days</div>
            </div>
            <div className="bg-black/20 rounded px-2 py-1 text-center min-w-[36px]">
              <div className="text-sm font-bold text-white">{timeLeft.hours}</div>
              <div className="text-[10px] text-white/80">Hours</div>
            </div>
            <div className="bg-black/20 rounded px-2 py-1 text-center min-w-[44px]">
              <div className="text-sm font-bold text-white">{timeLeft.minutes}</div>
              <div className="text-[10px] text-white/80">Minutes</div>
            </div>
            <div className="bg-black/20 rounded px-2 py-1 text-center min-w-[48px]">
              <div className="text-sm font-bold text-white">{timeLeft.seconds}</div>
              <div className="text-[10px] text-white/80">Seconds</div>
            </div>
          </div>

          {/* CTA and Close */}
          <div className="flex items-center gap-2">
            <Button 
              onClick={scrollToRegistration}
              className="bg-white text-black hover:bg-white/90 font-bold px-4 py-1.5 rounded-full text-sm shadow-lg hover:shadow-xl transition-all duration-300"
            >
              🔥 Register FREE
            </Button>
            
            <button
              onClick={() => setIsVisible(false)}
              className="text-white/80 hover:text-white transition-colors p-0.5"
              aria-label="Close notification"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
