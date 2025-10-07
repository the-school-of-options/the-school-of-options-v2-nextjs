'use client'
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowRight } from "lucide-react";
import { useRegistration } from "@/hooks/use-registration";
import { AuthModal } from "./AuthModal";
import { useRouter } from "next/navigation";
import { useZoomWebinars } from "@/hooks/use-zoom-webinars";
import axios from "axios";

const API_BASE = "https://api.theschoolofoptions.com/api/v1";

export const StickyCtaBar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  // Use registration hook
  const { handleRegister, loading: registrationLoading, user } = useRegistration();
  const router = useRouter();
  const { webinars } = useZoomWebinars();

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky CTA after scrolling 2% of the page
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      setIsVisible(scrollPercent > 2);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleRegisterClick = async () => {
    const result = await handleRegister();
    if (result?.needsAuth) {
      setShowAuthModal(true);
    }
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
  };

  const handleAutoRegister = async () => {
    // Get the latest webinar
    if (webinars.length === 0) {
      throw new Error("No upcoming webinar sessions are available at the moment.");
    }

    // Use the latest webinar (first in the array)
    const latestWebinar = webinars[0];
    
    // Get user data - try multiple sources
    const storedUser = localStorage.getItem('auth_user');
    let userEmail = user?.email;
    let fullName = user?.fullName;
    let mobileNumber = user?.mobileNumber;
    
    // If user data is not available from context, try localStorage
    if (!userEmail || !fullName || !mobileNumber) {
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          userEmail = userEmail || parsedUser.email;
          fullName = fullName || parsedUser.fullName;
          mobileNumber = mobileNumber || parsedUser.mobileNumber;
        } catch (error) {
          // Error parsing stored user
        }
      }
    }

    // Validate required fields
    if (!userEmail) {
      throw new Error("User email is required for registration");
    }

    if (!fullName) {
      fullName = userEmail.split('@')[0]; // Fallback to email prefix
    }

    // Create abort controller for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    const payload = {
      email: userEmail,
      fullName: fullName,
      phoneNumber: mobileNumber, // Use user's phone number or fallback
      source: "mobile", // Default source as per your example
      webinarName: latestWebinar.topic || 'Options Trading Masterclass'
    };

    const response = await axios.post(`${API_BASE}/webinar/register`, payload, {
      signal: controller.signal,
      timeout: 30000
    });

    clearTimeout(timeoutId);
    
    // Redirect to success page
    router.push('/esummit/success');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-in-bottom">
      {/* Main CTA Bar */}
      <div className="bg-white/95 backdrop-blur-lg shadow-elevated border-t border-gray-200">
        <div className="container mx-auto px-4 py-2.5">
          <div className="flex items-center justify-between gap-3 max-w-screen-lg mx-auto">
            {/* FOMO Message - Compact */}
            <div className="flex items-center gap-2 text-sm">
              <div className="relative flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-destructive/10 border border-destructive/30">
                <div className="relative">
                  <AlertCircle className="w-3.5 h-3.5 text-destructive" />
                  <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive"></span>
                  </span>
                </div>
                <span className="font-bold text-destructive text-xs uppercase tracking-wide">
                  <span className="hidden sm:inline">Almost Full • </span>Only 7 Seats Left!
                </span>
              </div>
            </div>

            {/* CTA Button - Compact */}
            <Button 
              variant="cta" 
              size="default"
              onClick={handleRegisterClick}
              disabled={registrationLoading}
              className="text-sm font-semibold group h-9 bg-[rgb(255,103,25)] text-black hover:bg-[rgb(255,103,25)]/90"
            >
              {registrationLoading ? "Registering..." : "Reserve Your Seat"}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>

      {/* Authentication Modal */}
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
        useSignupWithoutVerification={true}
        onAutoRegister={handleAutoRegister}
      />
    </div>
  );
};