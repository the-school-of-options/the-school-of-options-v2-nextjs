'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, Sparkles, Users, Gift, Loader, User } from "lucide-react";
import { useZoomWebinars } from "@/hooks/use-zoom-webinars";
import { useAuth } from "@/contexts/AuthContext";
import { AuthModal } from "./AuthModal";
import axios from "axios";
const API_BASE = "https://api.theschoolofoptions.com/api/v1";

export const RegistrationSection = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useAuth();
  const { webinars, loading: webinarsLoading, error: webinarsError } = useZoomWebinars();
  const [loading, setLoading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleRegister = async () => {
    // Check if user is authenticated
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    // If user is authenticated, proceed with registration

    // Get the latest webinar
    if (webinars.length === 0) {
      toast({
        title: "No sessions available",
        description: "No upcoming webinar sessions are available at the moment.",
        variant: "destructive"
      });
      return;
    }

    // Use the latest webinar (first in the array)
    const latestWebinar = webinars[0];
    
    setLoading(true);

    try {
      // Get fullName from user object (it's fullName, not name)
      const storedUser = localStorage.getItem('auth_user');
      let fullName = user.fullName;
      
      if (!fullName && storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          fullName = parsedUser.fullName;
        } catch (error) {
          // Error parsing stored user
        }
      }

      // Create abort controller for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      const payload = {
        email: user.email,
        fullName: fullName,
        phoneNumber: user.mobileNumber || "999999999", // Use user's phone number or fallback
        source: "mobile", // Default source as per your example
        webinarName: latestWebinar.topic || 'Options Trading Workshop'
      };

      const response = await axios.post(`${API_BASE}/webinar/register`, payload, {
        signal: controller.signal,
        timeout: 30000
      });

      clearTimeout(timeoutId);

      // toast({
      //   title: "Registration Successful",
      //   description: "You have been successfully registered for the workshop!",
      // });

      // Redirect to success page
      router.push('/workshop/success');
    } catch (error: any) {
      let errorMessage = "Registration failed. Please try again.";
      
      if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
        errorMessage = "Request timed out. Please check your connection and try again.";
      } else if (error.code === 'NETWORK_ERROR' || error.message?.includes('network')) {
        errorMessage = "Network error. Please check your internet connection and try again.";
      } else if (error?.response?.status === 429) {
        errorMessage = "Too many requests. Please wait a moment and try again.";
      } else if (error?.response?.status >= 500) {
        errorMessage = "Server error. Please try again in a few minutes.";
      } else if (error?.response?.data) {
        const errorData = error.response.data;
        if (typeof errorData === 'string') {
          errorMessage = errorData;
        } else if (errorData.message) {
          errorMessage = typeof errorData.message === 'string' ? errorData.message : errorMessage;
        } else if (errorData.error) {
          errorMessage = typeof errorData.error === 'string' ? errorData.error : errorMessage;
        }
      } else if (error?.message) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Registration Failed",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    // No need to automatically register here anymore since it's handled in AuthModal
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
      webinarName: latestWebinar.topic || 'Options Trading Workshop'
    };

    const response = await axios.post(`${API_BASE}/webinar/register`, payload, {
      signal: controller.signal,
      timeout: 30000
    });

    clearTimeout(timeoutId);
    
    // Redirect to success page
    router.push('/workshop/success');
  };

  // Format date for display
  const formatWebinarDate = (startTime: string) => {
    const date = new Date(startTime);
    return date.toLocaleString('en-IN', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };
  const features = ["FREE 3-Hour Live Masterclass", "Call/Put Options Complete Guide", "Delta & Probability Explained", "10 Interactive Exercises", "Win Exciting Prizes", "Certificate of Participation"];
  return <section id="registration" className="py-20 px-4 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-12">
          <div className="inline-block bg-gradient-orange px-4 py-2 rounded-full text-sm font-bold mb-6 animate-pulse text-black shadow-orange">
            <Sparkles className="w-4 h-4 inline mr-2" />
            Limited Seats Available
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-black">
            Secure Your <span className="text-gradient-orange">FREE Seat Now!</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Har Saturday ko sirf limited seats hain. Apna spot book karein aur options trading master banein!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Features List */}
          <div className="space-y-6">
            <div className="bg-card p-6 rounded-xl shadow-lg border border-border">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-black">
                <Gift className="w-6 h-6 text-primary" />
                What You Get:
              </h3>
              <ul className="space-y-4">
                {features.map((feature, index) => <li key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 text-green-500" />
                    <span className="text-foreground">{feature}</span>
                  </li>)}
              </ul>
            </div>

            <div className="bg-gradient-orange p-6 rounded-xl shadow-orange">
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-6 h-6 text-black" />
                <p className="text-black font-bold">
                  Already 500+ Registrations!
                </p>
              </div>
              <p className="text-black/90 text-sm">
                Join hundreds of traders learning the right way
              </p>
            </div>
          </div>

          {/* Registration Card */}
          <div id="registration-form" className="bg-card p-8 rounded-2xl shadow-orange border border-border">
            <h3 className="text-2xl font-bold mb-6 text-center text-black">Register for FREE</h3>
            
            <div className="space-y-6">
              {/* User Status Display */}
              {/* {user ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-xs font-medium text-green-800">Signed in as {user.fullName}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-blue-800">Sign in required</p>
                      <p className="text-sm text-blue-600">You need to sign in to register for the workshop</p>
                    </div>
                  </div>
                </div>
              )}  */}

              {/* Webinar Info Display */}
              {webinarsLoading ? (
                <div className="flex items-center justify-center py-4 bg-secondary rounded-md">
                  <Loader className="w-5 h-5 animate-spin text-muted-foreground" />
                  <span className="ml-2 text-sm text-muted-foreground">Loading sessions...</span>
                </div>
              ) : webinarsError ? (
                <div className="py-3 px-4 bg-destructive/10 text-destructive rounded-md text-sm">
                  {typeof webinarsError === 'string' ? webinarsError : 'Failed to load webinar sessions. Please try again.'}
                </div>
              ) : webinars.length === 0 ? (
                <div className="py-3 px-4 bg-muted rounded-md text-sm text-muted-foreground text-black">
                  No upcoming sessions available at the moment.
                </div>
              ) : (
                <div className="bg-secondary rounded-lg p-4">
                  <h4 className="font-semibold text-black mb-2">Webinar details:</h4>
                  <p className="text-sm text-muted-foreground">
                    {webinars[0].topic} - {formatWebinarDate(webinars[0].start_time)}
                  </p>
                </div>
              )}

              {/* Register Button */}
              <Button 
                onClick={handleRegister}
                variant="cta" 
                size="xl" 
                className="w-full" 
                disabled={loading || webinarsLoading || webinars.length === 0}
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin mr-2" />
                    Registering...
                  </>
                ) : (
                  "Register Now"
                )}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                By registering, you agree to receive webinar updates via email and WhatsApp
              </p>
            </div>
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
    </section>;
};