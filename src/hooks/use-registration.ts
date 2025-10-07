import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useZoomWebinars } from "@/hooks/use-zoom-webinars";
import { useAuth } from "@/contexts/AuthContext";
import axios from "axios";

const API_BASE = "https://api.theschoolofoptions.com/api/v1";

export const useRegistration = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useAuth();
  const { webinars, loading: webinarsLoading, error: webinarsError } = useZoomWebinars();
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    // Check if user is authenticated
    if (!user) {
      // Return a flag to indicate auth is needed
      return { needsAuth: true };
    }

    // If user is authenticated, proceed with registration
    // Get the latest webinar
    if (webinars.length === 0) {
      toast({
        title: "No sessions available",
        description: "No upcoming webinar sessions are available at the moment.",
        variant: "destructive"
      });
      return { success: false };
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

      toast({
        title: "Registration Successful",
        description: "You have been successfully registered for the workshop!",
      });

      // Redirect to success page
      router.push('/esummit/success');
      return { success: true };
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
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return {
    handleRegister,
    loading,
    user,
    webinars,
    webinarsLoading,
    webinarsError
  };
};
