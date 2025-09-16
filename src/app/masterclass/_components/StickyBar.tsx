"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface ZoomMeeting {
  id: string;
  topic: string;
  start_time: string;
  timezone: string;
  duration: number;
  join_url?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface StickyBarProps {
  meetings?: ZoomMeeting[];
}

// Helper function to get the earliest meeting from Zoom data
const getEarliestMeetingDate = (meetings: ZoomMeeting[]): Date | null => {
  if (!meetings || meetings.length === 0) {
    return null;
  }
  
  // Sort meetings by start_time and get the earliest one
  const sortedMeetings = [...meetings].sort((a, b) => 
    new Date(a.start_time).getTime() - new Date(b.start_time).getTime()
  );
  
  return new Date(sortedMeetings[0].start_time);
};

// Fallback function to get a default countdown time
const getDefaultCountdownTime = (): TimeLeft => {
  return {
    days: 0,
    hours: 4,
    minutes: 51,
    seconds: 4
  };
};

export const StickyBar = ({ meetings = [] }: StickyBarProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getDefaultCountdownTime());

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      
      // Try to get the earliest meeting from Zoom data first
      let targetDate = getEarliestMeetingDate(meetings);
      
      // If no Zoom meetings available, use default countdown
      if (!targetDate) {
        return getDefaultCountdownTime();
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

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    return () => clearInterval(timer);
  }, [meetings]);

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
