'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, Sparkles, Users, Gift, Loader, Calendar } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useZoomWebinars } from "@/hooks/use-zoom-webinars";
import axios from "axios";
const API_BASE = "https://api.theschoolofoptions.com/api/v1";

export const RegistrationSection = () => {
  const router = useRouter();
  const {
    toast
  } = useToast();
  const { webinars, loading: webinarsLoading, error: webinarsError } = useZoomWebinars();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    webinarId: ""
  });
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{[key: string]: string}>({});

  // Validation functions
  const validateEmail = (email: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'Email is required';
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return null;
  };

  const validatePhone = (phone: string): string | null => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phone) return 'Phone number is required';
    if (phone.length < 10) return 'Phone number must be at least 10 digits';
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) return 'Please enter a valid phone number';
    return null;
  };

  const validateName = (name: string): string | null => {
    if (!name) return 'Full name is required';
    if (name.trim().length < 2) return 'Name must be at least 2 characters';
    if (name.trim().length > 100) return 'Name must be less than 100 characters';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation
    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const phoneError = validatePhone(formData.phone);
    
    const errors: {[key: string]: string} = {};
    if (nameError) errors.name = nameError;
    if (emailError) errors.email = emailError;
    if (phoneError) errors.phone = phoneError;
    
    if (!formData.webinarId) {
      errors.webinarId = 'Please select a webinar session';
    }
    
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      toast({
        title: "Please correct the errors",
        description: "Please fill in all required fields correctly",
        variant: "destructive"
      });
      return;
    }
    
    // Clear field errors if validation passes
    setFieldErrors({});

    setLoading(true);

    try {
      const selectedWebinar = webinars.find(w => w.id === formData.webinarId);
      const webinarName = selectedWebinar?.topic || 'Options Trading Workshop';

      // Create abort controller for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      const response = await axios.post(`${API_BASE}/webinar/register`, {
        fullName: formData.name.trim(),
        email: formData.email.trim(),
        phoneNumber: formData.phone.trim(),
        meetingNumber: formData.webinarId,
        webinarName: webinarName
      }, {
        signal: controller.signal,
        timeout: 30000
      });

      clearTimeout(timeoutId);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Redirect to success page
      router.push('/workshop/success');
    } catch (error: any) {
      console.error('Registration error:', error);
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
        // Handle various error formats
        if (typeof errorData === 'string') {
          errorMessage = errorData;
        } else if (errorData.message) {
          errorMessage = typeof errorData.message === 'string' ? errorData.message : errorMessage;
        } else if (errorData.error) {
          errorMessage = typeof errorData.error === 'string' ? errorData.error : errorMessage;
        }
        
        // Specific error handling for common cases
        if (errorData.error?.toLowerCase().includes('email')) {
          errorMessage = 'This email is already registered. Please use a different email.';
        } else if (errorData.error?.toLowerCase().includes('phone')) {
          errorMessage = 'This phone number is already registered. Please use a different number.';
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

          {/* Registration Form */}
          <div id="registration-form" className="bg-card p-8 rounded-2xl shadow-orange border border-border">
            <h3 className="text-2xl font-bold mb-6 text-center text-black">Register for FREE</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2 text-black">
                <Label htmlFor="name">Full Name / Pura Naam</Label>
                <Input 
                  id="name" 
                  type="text" 
                  placeholder="Enter your name" 
                  value={formData.name} 
                  onChange={e => {
                    setFormData({ ...formData, name: e.target.value });
                    // Clear field error when user starts typing
                    if (fieldErrors.name) {
                      setFieldErrors({ ...fieldErrors, name: '' });
                    }
                  }} 
                  aria-invalid={fieldErrors.name ? 'true' : 'false'}
                  aria-describedby={fieldErrors.name ? 'name-error' : undefined}
                  className={`bg-secondary border-border ${
                    fieldErrors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                  }`} 
                />
                {fieldErrors.name && (
                  <p id="name-error" className="text-sm text-red-600" role="alert">
                    {fieldErrors.name}
                  </p>
                )}
              </div>

              <div className="space-y-2 text-black">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="your.email@example.com" 
                  value={formData.email} 
                  onChange={e => {
                    setFormData({ ...formData, email: e.target.value });
                    // Clear field error when user starts typing
                    if (fieldErrors.email) {
                      setFieldErrors({ ...fieldErrors, email: '' });
                    }
                  }} 
                  aria-invalid={fieldErrors.email ? 'true' : 'false'}
                  aria-describedby={fieldErrors.email ? 'email-error' : undefined}
                  className={`bg-secondary border-border ${
                    fieldErrors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                  }`} 
                />
                {fieldErrors.email && (
                  <p id="email-error" className="text-sm text-red-600" role="alert">
                    {fieldErrors.email}
                  </p>
                )}
              </div>

              <div className="space-y-2 text-black">
                <Label htmlFor="phone">WhatsApp Number</Label>
                <Input 
                  id="phone" 
                  type="tel" 
                  placeholder="+91 98765 43210" 
                  value={formData.phone} 
                  onChange={e => {
                    setFormData({ ...formData, phone: e.target.value });
                    // Clear field error when user starts typing
                    if (fieldErrors.phone) {
                      setFieldErrors({ ...fieldErrors, phone: '' });
                    }
                  }} 
                  aria-invalid={fieldErrors.phone ? 'true' : 'false'}
                  aria-describedby={fieldErrors.phone ? 'phone-error' : undefined}
                  className={`bg-secondary border-border ${
                    fieldErrors.phone ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                  }`} 
                />
                {fieldErrors.phone && (
                  <p id="phone-error" className="text-sm text-red-600" role="alert">
                    {fieldErrors.phone}
                  </p>
                )}
              </div>

              <div className="space-y-2 text-black">
                <Label htmlFor="webinar" className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Select Workshop Session / Webinar Session Chuniye
                </Label>
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
                  <>
                    <Select 
                      value={formData.webinarId} 
                      onValueChange={(value) => {
                        setFormData({ ...formData, webinarId: value });
                        // Clear field error when user selects
                        if (fieldErrors.webinarId) {
                          setFieldErrors({ ...fieldErrors, webinarId: '' });
                        }
                      }}
                    >
                      <SelectTrigger 
                        className={`bg-secondary border-border text-black [&>span]:text-black ${
                          fieldErrors.webinarId ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                        }`}
                        aria-invalid={fieldErrors.webinarId ? 'true' : 'false'}
                        aria-describedby={fieldErrors.webinarId ? 'webinar-error' : undefined}
                      >
                        <SelectValue placeholder="Choose a workshop session" className="text-black" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        {webinars.map((webinar) => (
                          <SelectItem 
                            key={webinar.id} 
                            value={String(webinar.id)} 
                            className="text-black cursor-pointer"
                          >
                            {webinar.topic} - {formatWebinarDate(webinar.start_time)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {fieldErrors.webinarId && (
                      <p id="webinar-error" className="text-sm text-red-600" role="alert">
                        {fieldErrors.webinarId}
                      </p>
                    )}
                  </>
                )}
              </div>

              <Button type="submit" variant="cta" size="xl" className="w-full" disabled={loading || webinarsLoading}>
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
            </form>
          </div>
        </div>
      </div>
    </section>;
};