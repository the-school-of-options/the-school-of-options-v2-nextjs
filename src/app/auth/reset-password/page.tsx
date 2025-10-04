"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

function AuthResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Get the token from the current URL
    const token = searchParams.get('token');
    
    if (token) {
      // Redirect to the correct reset password page with the token
      router.replace(`/reset-password?token=${token}`);
    } else {
      // If no token, redirect to login page
      router.replace('/login');
    }
  }, [router, searchParams]);

  // Show a loading state while redirecting
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-8 shadow-2xl">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-400"></div>
          <span className="text-white">Redirecting...</span>
        </div>
      </div>
    </div>
  );
}

export default function AuthResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-8 shadow-2xl">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-400"></div>
            <span className="text-white">Loading...</span>
          </div>
        </div>
      </div>
    }>
      <AuthResetPasswordContent />
    </Suspense>
  );
}
