'use client'
import { useEffect } from 'react';
import { CheckCircle2, Calendar, Mail, Phone, ArrowLeft, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function WorkshopSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // Confetti effect or celebration animation could be added here
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white flex items-center justify-center px-4 py-12">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-2xl w-full relative z-10">
        {/* Success Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl animate-pulse" />
              <div className="relative bg-gradient-to-br from-green-500 to-green-600 rounded-full p-6">
                <CheckCircle2 className="w-16 h-16 text-white" />
              </div>
            </div>
          </div>

          {/* Success Message */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
              🎉 Registration Successful!
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-gradient-primary mb-3">
              Thank You for Registering!
            </h2>
            <p className="text-lg text-muted-foreground">
              Your registration has been successfully completed
            </p>
          </div>
        </div>

        {/* Additional Message */}
        <div className="text-center mt-8">
          <p className="text-muted-foreground">
            Questions? Contact us at{' '}
            <a href="mailto:support@theschoolofoptions.com" className="text-primary hover:underline font-semibold">
              support@theschoolofoptions.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

