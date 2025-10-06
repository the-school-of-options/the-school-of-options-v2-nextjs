'use client';

import React, { useState, useEffect, useRef } from 'react';
import Countdown from './Countdown';
import { content } from '../content';
import { registerForWebinar, WebinarRegistrationData } from '@/api/webinar';

interface ZoomMeeting {
  id: string;
  topic: string;
  start_time: string;
  timezone: string;
  duration: number;
  join_url?: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  session: string;
}

interface FormCardProps {
  className?: string;
  meetings?: ZoomMeeting[];
  meetingsLoading?: boolean;
  meetingsError?: string | null;
}

export default function FormCard({ 
  className = '', 
  meetings = [], 
  meetingsLoading = false, 
  meetingsError = null 
}: FormCardProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    session: ''
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isStep2Open, setIsStep2Open] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Format meeting data for display
  const formatMeetingOption = (meeting: any) => {
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

  // Load form data from localStorage on mount
  useEffect(() => {
    const savedData = sessionStorage.getItem('webinar-form-data');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setFormData(parsed);
      } catch (error) {
        // Failed to parse saved form data
      }
    }
  }, []);

  // Save form data to localStorage on change
  useEffect(() => {
    sessionStorage.setItem('webinar-form-data', JSON.stringify(formData));
  }, [formData]);

  // Focus trap for modal
  useEffect(() => {
    if (isStep2Open && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              lastElement?.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === lastElement) {
              firstElement?.focus();
              e.preventDefault();
            }
          }
        }
      };

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsStep2Open(false);
        }
      };

      firstElement?.focus();
      document.addEventListener('keydown', handleTabKey);
      document.addEventListener('keydown', handleEscape);

      return () => {
        document.removeEventListener('keydown', handleTabKey);
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isStep2Open]);

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.session) {
      if (meetings.length === 0 && !meetingsError) {
        newErrors.session = 'No sessions are currently available';
      } else {
        newErrors.session = 'Please select a session';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

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
        // This matches the formatMeetingOption function used in the dropdown
        const optionText = document.querySelector(`option[value="${formData.session}"]`)?.textContent;
        if (optionText && optionText !== 'Select your preferred session' && optionText !== 'Loading sessions...') {
          // Extract the topic part before the date/time (format: "Topic - Date Time")
          const topicMatch = optionText.match(/^([^-]+)/);
          if (topicMatch) {
            webinarName = topicMatch[1].trim();
          }
        }
      }

      
      // Prepare the payload according to the new API structure
      const registrationData: WebinarRegistrationData = {
        email: formData.email,
        fullName: formData.name,
        phoneNumebr: formData.phone, // Note: keeping the typo as specified in requirements
        webinarName: webinarName
      };

      // Call the API
      const response = await registerForWebinar(registrationData);
      
      if (response.ok) {
        // Clear form data on successful submission
        setFormData({
          name: '',
          email: '',
          phone: '',
          session: ''
        });
        sessionStorage.removeItem('webinar-form-data');
        setIsStep2Open(true);
      } else {
        // Handle API error
        alert(`Registration failed: ${response.error || 'Unknown error occurred'}`);
      }
    } catch (error) {
      alert('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModalClose = () => {
    setIsStep2Open(false);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleModalClose();
    }
  };

  return (
    <>
      <div id="register" className={`bg-gradient-to-br from-[var(--primary-800)] to-[var(--primary-700)] rounded-2xl p-6 border border-[var(--border-20)] hover-lift hover-glow ${className}`}>
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-[var(--text-100)] mb-2">
            {content.form.title}
          </h3>
          <div className="flex items-center gap-2 text-sm text-[var(--text-60)]">
            <Countdown variant="mini" meetings={meetings} />
            <div className="flex items-center gap-1 bg-[var(--danger-500)] text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
              ⚠️ LIMITED
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[var(--text-100)] mb-1">
              Full Name *
            </label>
            <input
              ref={firstInputRef}
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={`w-full px-4 py-3 rounded-lg bg-[var(--primary-700)] border text-[var(--text-100)] placeholder-[var(--text-60)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-500)] focus:border-transparent transition-all ${
                errors.name ? 'border-red-500' : 'border-[var(--border-20)]'
              }`}
              placeholder="Enter your full name"
              required
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-400">{errors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[var(--text-100)] mb-1">
              Email *
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`w-full px-4 py-3 rounded-lg bg-[var(--primary-700)] border text-[var(--text-100)] placeholder-[var(--text-60)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-500)] focus:border-transparent transition-all ${
                errors.email ? 'border-red-500' : 'border-[var(--border-20)]'
              }`}
              placeholder="Enter your email"
              required
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-400">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-[var(--text-100)] mb-1">
              Phone *
            </label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className={`w-full px-4 py-3 rounded-lg bg-[var(--primary-700)] border text-[var(--text-100)] placeholder-[var(--text-60)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-500)] focus:border-transparent transition-all ${
                errors.phone ? 'border-red-500' : 'border-[var(--border-20)]'
              }`}
              placeholder="Enter your phone number"
              required
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-400">{errors.phone}</p>
            )}
          </div>

          <div>
            <label htmlFor="session" className="block text-sm font-medium text-[var(--text-100)] mb-1">
              Choose Session *
            </label>
            <select
              id="session"
              value={formData.session}
              onChange={(e) => handleInputChange('session', e.target.value)}
              className={`w-full px-4 py-3 rounded-lg bg-[var(--primary-700)] border text-[var(--text-100)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-500)] focus:border-transparent transition-all ${
                errors.session ? 'border-red-500' : 'border-[var(--border-20)]'
              }`}
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
            {errors.session && (
              <p className="mt-1 text-sm text-red-400">{errors.session}</p>
            )}
            {meetingsError && (
              <p className="mt-1 text-sm text-yellow-400">
                Unable to load sessions. {meetingsError}
              </p>
            )}
            {!meetingsLoading && !meetingsError && meetings.length === 0 && (
              <p className="mt-1 text-sm text-blue-400">
                No upcoming sessions are currently scheduled. Please check back later.
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting || (meetings.length === 0 && !meetingsError)}
            className="w-full btn-primary text-[var(--primary-900)] font-bold py-4 px-6 rounded-xl text-lg shadow-2xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[var(--accent-400)] focus:ring-offset-2 focus:ring-offset-[var(--primary-800)] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:scale-100 animate-pulse"
            style={{
              background: 'linear-gradient(135deg, #10B981 0%, #34D399 50%, #10B981 100%)',
              backgroundSize: '200% 200%',
              animation: isSubmitting ? 'none' : 'buttonGlow 2s ease-in-out infinite alternate, shimmer 3s ease-in-out infinite'
            }}
          >
            {isSubmitting 
              ? '⏳ Processing...' 
              : meetings.length === 0 && !meetingsError
                ? 'NO SESSIONS AVAILABLE'
                : 'REGISTER NOW'
            }
          </button>

          <div className="flex items-center justify-center gap-4 text-sm text-[var(--text-60)] mt-4">
            {content.form.trust.map((item, index) => (
              <React.Fragment key={index}>
                <span>{item}</span>
                {index < content.form.trust.length - 1 && <span>•</span>}
              </React.Fragment>
            ))}
          </div>
        </form>
      </div>

      {/* Step 2 Modal */}
      {isStep2Open && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={handleOverlayClick}
          role="dialog"
          aria-modal="true"
          aria-labelledby="step2-title"
        >
          <div
            ref={modalRef}
            className="bg-[var(--primary-800)] rounded-2xl p-8 max-w-md w-full border border-[var(--border-20)]"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--accent-500)] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[var(--primary-900)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 id="step2-title" className="text-2xl font-bold text-[var(--text-100)] mb-2">
                {content.form.step2Title}
              </h2>
              <p className="text-[var(--text-60)] mb-6">
                {content.form.step2Body}
              </p>
              <button
                onClick={handleModalClose}
                className="btn-primary text-[var(--primary-900)] font-bold py-3 px-8 rounded-xl text-lg shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[var(--accent-400)] focus:ring-offset-2 focus:ring-offset-[var(--primary-800)]"
                style={{
                  background: 'linear-gradient(135deg, #10B981 0%, #34D399 50%, #10B981 100%)',
                  backgroundSize: '200% 200%'
                }}
              >
                ✅ Got it!
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
