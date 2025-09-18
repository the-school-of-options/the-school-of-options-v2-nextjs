"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { registerForWebinar, WebinarRegistrationData } from '@/api/webinar';

interface ZoomMeeting {
  id: string;
  topic: string;
  start_time: string;
  timezone: string;
  duration: number;
  join_url?: string;
}

interface RegistrationFormProps {
  meetings?: ZoomMeeting[];
  meetingsLoading?: boolean;
  meetingsError?: string | null;
}

export const RegistrationForm = ({ 
  meetings = [], 
  meetingsLoading = false, 
  meetingsError = null 
}: RegistrationFormProps) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    session: '',
    experience: 'beginner',
    hearAbout: ''
  });

  // Format meeting data for display
  const formatMeetingOption = (meeting: ZoomMeeting) => {
    const startDate = new Date(meeting.start_time);
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    };
    const formattedDate = startDate.toLocaleDateString('en-US', options);
    const duration = meeting.duration ? ` (${meeting.duration} min)` : '';
    return `${meeting.topic} - ${formattedDate}${duration}`;
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.fullName && formData.email && formData.phone) {
      setStep(2);
    }
  };

  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    
    try {
      // Find the selected meeting to get the webinar name
      const selectedMeeting = meetings.find(meeting => {
        // Try exact match first
        if (meeting.id === formData.session) return true;
        // Try string comparison in case of type mismatch
        if (String(meeting.id) === String(formData.session)) return true;
        return false;
      });
      
      let webinarName = 'Unknown Webinar';
      
      if (selectedMeeting) {
        webinarName = selectedMeeting.topic;
      } else {
        // Fallback: try to extract webinar name from the formatted option text
        const optionText = document.querySelector(`option[value="${formData.session}"]`)?.textContent;
        if (optionText && optionText !== 'Select your preferred session' && optionText !== 'Loading sessions...') {
          // Extract the topic part before the date/time (format: "Topic - Date Time")
          const topicMatch = optionText.match(/^([^-]+)/);
          if (topicMatch) {
            webinarName = topicMatch[1].trim();
          }
        }
      }

      console.log("formData.session", formData.session);
      console.log("meetings array", meetings);
      console.log("selectedMeeting", selectedMeeting);
      console.log("webinarName", webinarName);
      
      // Prepare the payload according to the new API structure
      const registrationData: WebinarRegistrationData = {
        email: formData.email,
        fullName: formData.fullName,
        phoneNumebr: formData.phone, // Note: keeping the typo as specified in requirements
        webinarName: webinarName
      };

      // Call the API
      const response = await registerForWebinar(registrationData);
      
      if (response.ok) {
        // Clear form data on successful submission
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          session: '',
          experience: 'beginner',
          hearAbout: ''
        });
        alert('Registration successful! Check your email for webinar details.');
      } else {
        // Handle API error
        console.error('Registration failed:', response.error);
        alert(`Registration failed: ${response.error || 'Unknown error occurred'}`);
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (step === 1) {
    return (
      <Card className="p-6 shadow-elegant bg-card border-border backdrop-blur-sm">
        <form onSubmit={handleStep1Submit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-sm font-semibold text-foreground">
              Full Name *
            </Label>
            <Input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              required
              className="h-12 text-base bg-input border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-semibold text-foreground">
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="h-12 text-base bg-input border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-semibold text-foreground">
              Phone Number *
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
              className="h-12 text-base bg-input border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="session" className="text-sm font-semibold text-foreground">
              Choose Session *
            </Label>
            <select
              id="session"
              value={formData.session}
              onChange={(e) => setFormData({ ...formData, session: e.target.value })}
              className="w-full h-12 px-3 text-base bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
              required
              disabled={meetingsLoading || (meetings.length === 0 && !meetingsError)}
            >
              <option value="">
                {meetingsLoading 
                  ? 'Loading sessions...' 
                  : meetings.length === 0 && !meetingsError
                    ? 'No sessions scheduled'
                    : 'Select your preferred session'
                }
              </option>
              {meetingsError ? (
                <option value="" disabled>
                  Error loading sessions - please try again later
                </option>
              ) : meetings.length > 0 ? (
                meetings.slice(0, 2).map((meeting) => (
                  <option key={meeting.id} value={meeting.id}>
                    {formatMeetingOption(meeting)}
                  </option>
                ))
              ) : !meetingsLoading && !meetingsError ? (
                <option value="" disabled>
                  No upcoming sessions available
                </option>
              ) : null}
            </select>
            {meetingsError && (
              <p className="text-sm text-yellow-400">
                Unable to load sessions. {meetingsError}
              </p>
            )}
            {!meetingsLoading && !meetingsError && meetings.length === 0 && (
              <p className="text-sm text-blue-400">
                No upcoming sessions are currently scheduled. Please check back later.
              </p>
            )}
          </div>

          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full h-12 text-base font-semibold bg-gradient-orange shadow-orange hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Register Now
          </Button>
          
          <p className="text-xs text-muted-foreground text-center leading-relaxed">
            By registering, you agree to receive reminders for this event. No spam-unsubscribe anytime.
          </p>
        </form>
      </Card>
    );
  }

  return (
    <Card className="p-6 shadow-lg bg-white/80 border border-gray-200 backdrop-blur-sm">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-muted-foreground">Step 2 of 2</span>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setStep(1)}
            className="text-gray-600 hover:text-gray-900"
          >
            Back
          </Button>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div className="bg-gradient-orange h-2 rounded-full w-full"></div>
        </div>
      </div>

      <form onSubmit={handleStep2Submit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="experience" className="text-sm font-semibold text-gray-900">
            Trading Experience *
          </Label>
          <select
            id="experience"
            value={formData.experience}
            onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
            className="w-full h-12 px-3 text-base bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900"
            required
          >
            <option value="beginner">Complete Beginner</option>
            <option value="some">Some Experience</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="hearAbout" className="text-sm font-semibold text-gray-900">
            How did you hear about us? (Optional)
          </Label>
          <select
            id="hearAbout"
            value={formData.hearAbout || ''}
            onChange={(e) => setFormData({ ...formData, hearAbout: e.target.value })}
            className="w-full h-12 px-3 text-base bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900"
          >
            <option value="">Select an option</option>
            <option value="social-media">Social Media</option>
            <option value="google">Google Search</option>
            <option value="friend">Friend/Referral</option>
            <option value="youtube">YouTube</option>
            <option value="other">Other</option>
          </select>
        </div>

        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full h-12 text-base font-semibold bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg shadow-orange-500/25 hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? '⏳ Processing...' : 'Save Your Spot - Free'}
        </Button>
      </form>
    </Card>
  );
};
