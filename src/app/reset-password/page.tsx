"use client";

import React, { useState, useEffect, Suspense } from "react";
import { Lock, Loader, Eye, EyeOff, CheckCircle, ArrowRight, Shield } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/layout/Header";

function ResetPasswordForm() {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const { resetPassword } = useAuth();

  useEffect(() => {
    const tokenParam = searchParams.get('token');
    if (!tokenParam) {
      setError("Invalid reset link. Please request a new password reset.");
    } else {
      setToken(tokenParam);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    if (!token) {
      setError("Invalid reset token");
      setLoading(false);
      return;
    }

    try {
      await resetPassword(token, formData.password);
      setSuccess(true);
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

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
                Password Reset Successfully
              </h2>
              <p className="text-slate-400 mb-8">
                Your password has been updated successfully. You will be redirected to the login page.
              </p>
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-200 shadow-lg hover:shadow-orange-500/25"
              >
                Go to Login
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
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-orange-900"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
      </div>

      <div className="relative z-10 flex-1 flex items-center justify-center">
        <div className="w-full max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 lg:gap-16">
            {/* Left Side - Hero Section */}
            <div className="hidden lg:flex lg:w-1/2 flex-col justify-center">
          <div className="max-w-lg">
            <div className="mb-12">
              <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
                Reset Your
                <span className="block bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text">
                  Password
                </span>
              </h1>
              <p className="text-xl text-slate-300 leading-relaxed mb-8">
                Create a new secure password to continue your learning journey with The School of Options.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center">
                  <Shield className="h-6 w-6 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Secure Reset</h3>
                  <p className="text-slate-400">Your account is protected</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center">
                  <Lock className="h-6 w-6 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Strong Password</h3>
                  <p className="text-slate-400">Enhanced security features</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Quick Access</h3>
                  <p className="text-slate-400">Back to learning in seconds</p>
                </div>
              </div>
            </div>
          </div>
        </div>

            {/* Right Side - Reset Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center">
          <div className="w-full max-w-md">
            {/* Mobile Header */}
            <div className="lg:hidden mb-8 text-center">
              <h1 className="text-3xl font-bold text-white mb-2">Reset Password</h1>
              <p className="text-slate-400">Create a new secure password</p>
            </div>

            {/* Reset Password Card */}
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-8 shadow-2xl">
              <div className="mb-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg">
                  <Lock className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Reset your password
                </h2>
                <p className="text-slate-400">
                  Enter your new password below
                </p>
              </div>

              {/* Reset Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-slate-400" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Enter your new password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="block w-full pl-10 pr-12 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-slate-400" />
                      </div>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Confirm your new password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        className="block w-full pl-10 pr-12 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white transition-colors"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading || !token}
                  className="w-full flex justify-center items-center py-3 px-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-orange-500/25"
                >
                  {loading ? (
                    <>
                      <Loader className="h-5 w-5 animate-spin mr-2" />
                      Resetting password...
                    </>
                  ) : (
                    <>
                      Reset Password
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </button>
              </form>

              {/* Footer */}
              <div className="mt-6 text-center text-sm text-slate-400">
                Remember your password?{" "}
                <Link
                  href="/login"
                  className="text-orange-400 hover:text-orange-300 font-semibold transition-colors"
                >
                  Sign in
                </Link>
              </div>
            </div>

            {/* Mobile Footer */}
            <div className="lg:hidden mt-8 text-center">
              <p className="text-xs text-slate-500">
                © {new Date().getFullYear()} The School of Options • Educational content only
              </p>
            </div>
          </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
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
      <ResetPasswordForm />
    </Suspense>
  );
}