'use client';

import Countdown from './Countdown';

interface ZoomMeeting {
  id: string;
  topic: string;
  start_time: string;
  timezone: string;
  duration: number;
  join_url?: string;
}

interface StickyBarProps {
  className?: string;
  meetings?: ZoomMeeting[];
}

export default function StickyBar({ className = '', meetings = [] }: StickyBarProps) {
  const handleRegisterClick = () => {
    const registerSection = document.getElementById('register');
    if (registerSection) {
      registerSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          .countdown-glow {
            text-shadow: 0 0 10px rgba(16, 185, 129, 0.6), 0 0 20px rgba(16, 185, 129, 0.4), 0 0 30px rgba(16, 185, 129, 0.2);
            animation: countdownGlow 2s ease-in-out infinite alternate;
          }

          @keyframes countdownGlow {
            0% {
              text-shadow: 0 0 10px rgba(16, 185, 129, 0.6), 0 0 20px rgba(16, 185, 129, 0.4), 0 0 30px rgba(16, 185, 129, 0.2);
            }
            100% {
              text-shadow: 0 0 15px rgba(16, 185, 129, 0.8), 0 0 25px rgba(16, 185, 129, 0.6), 0 0 35px rgba(16, 185, 129, 0.4);
            }
          }

          .sticky-button-glow {
            animation: stickyButtonGlow 2s ease-in-out infinite alternate;
            transition: all 0.3s ease;
          }

          @keyframes stickyButtonGlow {
            0% {
              box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4), 0 0 15px rgba(16, 185, 129, 0.3), 0 0 25px rgba(16, 185, 129, 0.2);
              transform: translateY(-1px);
            }
            100% {
              box-shadow: 0 12px 35px rgba(16, 185, 129, 0.6), 0 0 25px rgba(16, 185, 129, 0.5), 0 0 40px rgba(16, 185, 129, 0.3);
              transform: translateY(-2px);
            }
          }
        `
      }} />
      <div 
        className={`fixed bottom-0 left-0 right-0 z-40 bg-[var(--ink-800)]/95 backdrop-blur-md border-t border-[var(--border-30)] ${className}`}
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Left side - Countdown */}
          <div className="flex items-center gap-3">
            <div className="text-sm text-[var(--text-100)] font-medium">
              Next live session starts in
            </div>
            <Countdown 
              variant="long" 
              className="text-[var(--acc-500)] countdown-pulse countdown-glow"
              aria-live="polite"
              meetings={meetings}
            />
          </div>

          {/* Right side - CTA */}
          <button
            onClick={handleRegisterClick}
            className="btn-primary sticky-button-glow text-[var(--ink-900)] font-bold px-8 py-3 rounded-xl text-base shadow-2xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[var(--acc-400)] focus:ring-offset-2 focus:ring-offset-[var(--ink-800)] whitespace-nowrap"
            style={{
              background: 'linear-gradient(135deg, #10B981 0%, #34D399 50%, #10B981 100%)',
              backgroundSize: '200% 200%',
              animation: 'shimmer 3s ease-in-out infinite'
            }}
          >
            🚀 REGISTER FREE NOW
          </button>
        </div>

        {/* Mobile layout */}
        <div className="flex items-center justify-between gap-2 mt-2 md:hidden">
          <div className="flex items-center gap-2 bg-[var(--danger-500)] text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
            ⚠️ LIMITED SEATS
          </div>
          <div className="text-xs text-[var(--text-70)]">
            Live on Zoom/Google Meet
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
