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

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Store email in localStorage for future prefills
    localStorage.setItem("newsletter-email", email);
    
    setIsSuccess(true);
    setIsSubmitting(false);
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
          Check your inbox to confirm your subscription.
        </h3>
        <p className="text-[var(--newsletter-text-80)]">
          If you don't see it, check spam/promotions.
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
        <Input
          id="email"
          type="email"
          placeholder={placeholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="h-12 text-base bg-white/10 border-white/20 text-[var(--newsletter-text-100)] placeholder:text-[var(--newsletter-text-60)] focus:border-[var(--newsletter-accent-500)] focus:ring-[var(--newsletter-accent-500)]"
          disabled={isSubmitting}
        />
        {error && (
          <p className="text-sm text-red-400" role="alert">
            {error}
          </p>
        )}
      </div>
      
      {/* Mobile: Horizontal layout, Desktop: Full width */}
      <div className="flex flex-col md:block space-y-4 md:space-y-0">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full md:w-full h-12 text-base font-semibold newsletter-btn-primary text-[var(--newsletter-primary-900)] shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              Subscribing...
            </div>
          ) : (
            cta
          )}
        </Button>
        
        <p className="text-sm text-[var(--newsletter-text-60)] text-center">
          {micro}
        </p>
      </div>
    </form>
  );
}
