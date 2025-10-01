"use client";

import { useState, useEffect } from 'react';

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

interface CountdownTimerProps {
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

export const CountdownTimer = ({ meetings = [] }: CountdownTimerProps) => {
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
