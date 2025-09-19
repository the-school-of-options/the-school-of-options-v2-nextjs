"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SubscribeFormProps {
  placeholder: string;
  cta: string;
  micro: string;
}

export default function SubscribeForm({ placeholder, cta, micro }: SubscribeFormProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://api.theschoolofoptions.com/api/v1/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: email.trim(),
          listId: 29
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store email in sessionStorage for future prefills
        sessionStorage.setItem("newsletter-email", email);
        setIsSuccess(true);
      } else {
        setError(data.message || data.error || 'Failed to subscribe. Please try again.');
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div 
        className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center shadow-xl"
        role="status"
        aria-live="polite"
      >
        <div className="w-16 h-16 bg-gradient-to-br from-[var(--newsletter-accent-500)] to-[var(--newsletter-accent-400)] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
          <svg className="w-8 h-8 text-[var(--newsletter-primary-900)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-[var(--newsletter-text-100)] mb-2">
          Thank you for subscribing to our newsletter.
        </h3>
        <p className="text-[var(--newsletter-text-80)]">
          You'll receive weekly updates from Kundan Kishore.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email" className="sr-only">
          Email address
        </Label>
        <div className="flex flex-row gap-0.5">
          <Input
            id="email"
            type="email"
            placeholder={placeholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 h-12 text-base bg-white/10 border-white/20 text-[var(--newsletter-text-100)] placeholder:text-[var(--newsletter-text-60)] focus:border-[var(--newsletter-accent-500)] focus:ring-[var(--newsletter-accent-500)]"
            disabled={isSubmitting}
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-12 px-2 text-base font-semibold newsletter-btn-primary newsletter-glow-animation text-[var(--newsletter-primary-900)] shadow-lg hover:shadow-xl transition-all duration-300 whitespace-nowrap"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 border-1 border-current border-t-transparent rounded-full animate-spin" />
                Subscribing...
              </div>
            ) : (
              cta
            )}
          </Button>
        </div>
        {error && (
          <p className="text-sm text-red-400" role="alert">
            {error}
          </p>
        )}
      </div>
      
      <p className="text-sm text-[var(--newsletter-text-60)] text-center">
        {micro}
      </p>
    </form>
  );
}
