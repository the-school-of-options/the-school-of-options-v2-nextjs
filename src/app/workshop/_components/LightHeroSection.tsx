'use client'
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Globe, Award } from "lucide-react";
import { useState, useEffect } from "react";
export const LightHeroSection = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const currentDay = now.getDay();
      const daysUntilSaturday = (6 - currentDay + 7) % 7 || 7;
      const nextSaturday = new Date(now);
      nextSaturday.setDate(now.getDate() + daysUntilSaturday);
      nextSaturday.setHours(20, 0, 0, 0);
      const difference = nextSaturday.getTime() - now.getTime();
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(difference / (1000 * 60 * 60) % 24);
        const minutes = Math.floor(difference / 1000 / 60 % 60);
        const seconds = Math.floor(difference / 1000 % 60);
        setTimeLeft({
          days,
          hours,
          minutes,
          seconds
        });
      }
    };
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);
  const scrollToRegistration = () => {
    const formElement = document.getElementById('registration-form');
    if (formElement) {
      formElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    } else {
      // Fallback to section if form not found
      document.getElementById('registration')?.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  return <section className="relative min-h-screen flex items-center justify-center py-14 md:py-16 px-4 overflow-hidden bg-white">
      {/* Clean light background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50" />
      
      {/* Advanced Stock Market Animation Background */}
      <div className="absolute inset-0 opacity-8">
        {/* Large Chart Background - Left */}
        <div className="absolute top-1/4 -left-20 w-80 h-48 opacity-15 animate-float">
          <svg className="w-full h-full" viewBox="0 0 320 192">
            {/* Grid Lines */}
            <defs>
              <pattern id="chart-grid" width="40" height="24" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 24" fill="none" stroke="hsl(29 100% 50%)" strokeWidth="0.5" opacity="0.3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#chart-grid)" />
            
            {/* Candlestick Chart */}
            <g className="animate-[draw-candlesticks_6s_ease-in-out_infinite]">
              {/* Candlestick 1 */}
              <line x1="40" y1="120" x2="40" y2="80" stroke="hsl(29 100% 50%)" strokeWidth="1" />
              <rect x="35" y="100" width="10" height="15" fill="hsl(29 100% 50%)" />
              
              {/* Candlestick 2 */}
              <line x1="80" y1="100" x2="80" y2="70" stroke="hsl(29 100% 50%)" strokeWidth="1" />
              <rect x="75" y="85" width="10" height="10" fill="hsl(32 100% 54%)" />
              
              {/* Candlestick 3 */}
              <line x1="120" y1="110" x2="120" y2="60" stroke="hsl(29 100% 50%)" strokeWidth="1" />
              <rect x="115" y="80" width="10" height="20" fill="hsl(29 100% 50%)" />
              
              {/* Moving Average Line */}
              <path d="M 20 140 Q 60 120 100 100 T 180 80 T 260 70 T 320 65" stroke="hsl(29 100% 50%)" strokeWidth="2" fill="none" className="animate-[draw-line_4s_ease-in-out_infinite]" />
            </g>
          </svg>
        </div>

        {/* Large Chart Background - Right */}
        <div className="absolute bottom-1/4 -right-20 w-80 h-48 opacity-15 animate-float-reverse">
          <svg className="w-full h-full" viewBox="0 0 320 192">
            {/* Area Chart */}
            <defs>
              <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="hsl(29 100% 50%)" stopOpacity="0.3" />
                <stop offset="100%" stopColor="hsl(29 100% 50%)" stopOpacity="0" />
              </linearGradient>
            </defs>
            
            <path d="M 0 150 Q 80 120 160 100 T 320 80 L 320 192 L 0 192 Z" fill="url(#areaGradient)" className="animate-[draw-area_5s_ease-in-out_infinite]" />
            
            <path d="M 0 150 Q 80 120 160 100 T 320 80" stroke="hsl(29 100% 50%)" strokeWidth="2" fill="none" className="animate-[draw-line_5s_ease-in-out_infinite]" />
            
            {/* Data Points */}
            <circle cx="80" cy="120" r="3" fill="hsl(29 100% 50%)" className="animate-pulse">
              <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="160" cy="100" r="3" fill="hsl(29 100% 50%)" className="animate-pulse">
              <animate attributeName="r" values="3;5;3" dur="2.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="240" cy="85" r="3" fill="hsl(29 100% 50%)" className="animate-pulse">
              <animate attributeName="r" values="3;5;3" dur="3s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>

        {/* Mini Charts Scattered */}
        <div className="absolute top-1/3 right-1/4 w-24 h-16 opacity-20 animate-float">
          <svg className="w-full h-full" viewBox="0 0 96 64">
            <path d="M 0 50 L 20 45 L 40 35 L 60 40 L 80 25 L 96 20" stroke="hsl(29 100% 50%)" strokeWidth="2" fill="none" className="animate-[draw-line_3s_ease-in-out_infinite]" />
          </svg>
        </div>

        <div className="absolute bottom-1/3 left-1/5 w-28 h-18 opacity-20 animate-float-reverse">
          <svg className="w-full h-full" viewBox="0 0 112 72">
            {/* Bar Chart */}
            <rect x="10" y="40" width="8" height="25" fill="hsl(29 100% 50%)" className="animate-[grow-bar_2s_ease-in-out_infinite]" />
            <rect x="25" y="35" width="8" height="30" fill="hsl(32 100% 54%)" className="animate-[grow-bar_2.5s_ease-in-out_infinite]" />
            <rect x="40" y="45" width="8" height="20" fill="hsl(29 100% 50%)" className="animate-[grow-bar_3s_ease-in-out_infinite]" />
            <rect x="55" y="30" width="8" height="35" fill="hsl(29 100% 50%)" className="animate-[grow-bar_2.2s_ease-in-out_infinite]" />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="container relative z-10 max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="mb-8">
          <div className="bg-gradient-orange px-6 py-3 rounded-full text-sm font-bold text-black shadow-orange inline-block">
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <span className="whitespace-nowrap">🟢 FREE 3-Hour Masterclass</span>
              <span className="whitespace-nowrap bg-background/20 px-3 py-1 rounded-full border border-primary-foreground/30">
                by <span className="text-white font-extrabold">kundan kishore</span>
              </span>
            </div>
          </div>
        </div>


      {/* Main Content - Centered Layout */}
      <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            <span className="text-black">Why </span>
            <span className="text-gradient-orange">90% Traders</span>
            <br />
            <span className="text-black">Lose Money in Options</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Learn the real reasons behind trading failures and discover the probability-based approach that works.
          </p>
        </div>

        {/* CTA Button */}
        <div className="mb-6">
          <Button size="lg" onClick={scrollToRegistration} className="bg-gradient-purple text-black px-8 py-6 text-lg font-semibold rounded-xl shadow-orange hover:scale-105 transition-all duration-300">
            Join FREE Masterclass
          </Button>
          
          {/* Event Details and Limited Seats - Side by side */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3 mt-3">
            <div className="bg-card px-4 py-2.5 rounded-full shadow-lg border border-border">
              <div className="flex items-center gap-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-primary rounded-lg flex items-center justify-center">
                    <div className="w-3 h-3 bg-primary-foreground rounded-sm"></div>
                  </div>
                  <span className="text-sm font-semibold text-black">QnA</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span className="text-sm font-semibold text-black">OCT11th</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span className="text-sm font-semibold text-black">3 Hours</span>
                </div>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mx-0 whitespace-nowrap">
              ⚡ Limited Seats • This Saturday
            </p>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="mb-6">
          <p className="text-sm font-semibold text-primary mb-4 uppercase tracking-wide">
            Session Starts In
          </p>
          <div className="flex justify-center gap-3 md:gap-4 max-w-lg mx-auto mb-8">
            <div className="bg-card px-4 py-4 md:px-6 md:py-4 rounded-xl shadow-lg border border-border min-w-[80px] md:min-w-[100px]">
              <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{String(timeLeft.days).padStart(2, '0')}</p>
              <p className="text-xs text-muted-foreground mt-1">Days</p>
            </div>
            <div className="bg-card px-4 py-4 md:px-6 md:py-4 rounded-xl shadow-lg border border-border min-w-[80px] md:min-w-[100px]">
              <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{String(timeLeft.hours).padStart(2, '0')}</p>
              <p className="text-xs text-muted-foreground mt-1">Hours</p>
            </div>
            <div className="bg-card px-4 py-4 md:px-6 md:py-4 rounded-xl shadow-lg border border-border min-w-[80px] md:min-w-[100px]">
              <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{String(timeLeft.minutes).padStart(2, '0')}</p>
              <p className="text-xs text-muted-foreground mt-1">Min</p>
            </div>
            <div className="bg-card px-4 py-4 md:px-6 md:py-4 rounded-xl shadow-lg border border-border min-w-[80px] md:min-w-[100px]">
              <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{String(timeLeft.seconds).padStart(2, '0')}</p>
              <p className="text-xs text-muted-foreground mt-1">Sec</p>
            </div>
          </div>
        </div>
      </div>
    </section>;
};