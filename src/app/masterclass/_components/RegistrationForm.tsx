"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';

export const RegistrationForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    session: 'english',
    experience: 'beginner',
    hearAbout: ''
  });

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.fullName && formData.email && formData.phone) {
      setStep(2);
    }
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle final form submission
    console.log('Registration completed:', formData);
    // Here you would typically send the data to your backend
    alert('Registration successful! Check your email for webinar details.');
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
            <Label htmlFor="email" className="text-sm font-semibold text-gray-900">
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
            <Label htmlFor="phone" className="text-sm font-semibold text-gray-900">
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
            <Label htmlFor="session" className="text-sm font-semibold text-gray-900">
              Choose Session *
            </Label>
            <select
              id="session"
              value={formData.session || 'english'}
              onChange={(e) => setFormData({ ...formData, session: e.target.value })}
              className="w-full h-12 px-3 text-base bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
              required
            >
              <option value="english">English (Saturday 8-10 PM)</option>
              <option value="hindi">Hindi (Sunday 8-10 PM)</option>
            </select>
          </div>

          <Button 
            type="submit" 
            className="w-full h-12 text-base font-semibold bg-gradient-orange shadow-orange hover:shadow-xl transition-all duration-300"
          >
            Continue to Step 2
          </Button>
          
          <p className="text-xs text-muted-foreground text-center leading-relaxed">
            By registering, you agree to receive reminders for this event. No spam—unsubscribe anytime.
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
          className="w-full h-12 text-base font-semibold bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg shadow-orange-500/25 hover:shadow-xl transition-all duration-300"
        >
          Save Your Spot - Free
        </Button>
      </form>
    </Card>
  );
};
