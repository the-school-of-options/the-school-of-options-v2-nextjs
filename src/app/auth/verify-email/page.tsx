"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/layout/Header";
import { Loader, CheckCircle, XCircle, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";

function VerifyEmailContent() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { verifyEmail } = useAuth();

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (!token) {
      setError("Invalid verification link. Please request a new verification email.");
      setLoading(false);
      return;
    }

    const verifyUserEmail = async () => {
      try {
        await verifyEmail(token);
        setSuccess(true);
        // Redirect to home page after 2 seconds
        setTimeout(() => {
          router.push('/');
        }, 2000);
      } catch (err: any) {
        setError(err.message || "Email verification failed");
      } finally {
        setLoading(false);
      }
    };

    verifyUserEmail();
  }, [searchParams, verifyEmail, router]);

  if (loading) {
    return (
      <div className="h-screen bg-slate-900 relative overflow-hidden flex flex-col">
        <Header />
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-orange-900"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>
        </div>
        
        <div className="relative z-10 flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-8 shadow-2xl text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg">
                <Loader className="h-8 w-8 text-white animate-spin" />
              </div>
              <h2 className="text-xl font-bold text-white mb-3">
                Verifying your email...
              </h2>
              <p className="text-slate-400">
                Please wait while we verify your email address.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="h-screen bg-slate-900 relative overflow-hidden flex flex-col">
        <Header />
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-green-900"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>
        </div>
        
        <div className="relative z-10 flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-8 shadow-2xl text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-green-600 shadow-lg">
                <CheckCircle className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">
                Email Verified Successfully!
              </h2>
              <p className="text-slate-400 mb-8">
                Your email has been verified and your account is now active. You will be redirected to the home page.
              </p>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-200 shadow-lg hover:shadow-orange-500/25"
              >
                Continue to Home
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-slate-900 relative overflow-hidden flex flex-col">
      <Header />
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-red-900"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
      </div>
      
      <div className="relative z-10 flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-8 shadow-2xl text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-600 shadow-lg">
              <XCircle className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">
              Verification Failed
            </h2>
            <p className="text-slate-400 mb-8">
              {error}
            </p>
            
            <div className="bg-slate-700/30 rounded-xl border border-slate-600/50 p-4 mb-6">
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white text-sm font-medium mb-1">
                    Need Help?
                  </p>
                  <p className="text-slate-400 text-xs">
                    The verification link may have expired or been used already. 
                    Try registering again or contact support if the problem persists.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/register"
                className="flex-1 flex justify-center items-center py-2 px-4 border border-slate-600 text-slate-300 hover:text-white hover:border-slate-500 font-medium rounded-lg transition-all duration-200"
              >
                Register Again
              </Link>
              <Link
                href="/login"
                className="flex-1 flex justify-center items-center py-2 px-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-orange-500/25"
              >
                Go to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-900 relative overflow-hidden flex items-center justify-center">
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-8 shadow-2xl">
          <div className="flex items-center space-x-3">
            <Loader className="h-6 w-6 animate-spin text-orange-400" />
            <span className="text-white">Loading...</span>
          </div>
        </div>
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}
