"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  Mail,
  Lock,
  User as UserIcon,
  Loader,
  Eye,
  EyeOff,
  Phone,
  CheckCircle,
  Shield,
  Star,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/layout/Header";

type UserBrief = { id: string; email: string; name: string };

const API_BASE = "https://api.theschoolofoptions.com/api/v1";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    mobileNumber: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await register(formData);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

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
        {/* Main Content Container */}
        <div className="w-full max-w-7xl mx-auto px-8 lg:px-16">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 lg:gap-16">
            {/* Left Side - Hero Section */}
            <div className="hidden lg:flex lg:w-1/2 flex-col justify-center">
              <div className="max-w-lg">
            <div className="mb-12">
              <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
                Start Your
                <span className="block bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text">
                  Trading Journey
                </span>
              </h1>
              <p className="text-xl text-slate-300 leading-relaxed mb-8">
                Join thousands of successful traders who learned options trading the right way with structured education and expert mentorship.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center">
                  <Star className="h-6 w-6 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Free Registration</h3>
                  <p className="text-slate-400">Start learning today</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center">
                  <Shield className="h-6 w-6 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Secure Platform</h3>
                  <p className="text-slate-400">Your data is protected</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Expert Mentorship</h3>
                  <p className="text-slate-400">Learn from the best</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Registration Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center">
          <div className="w-full max-w-md">
            {/* Mobile Header */}
            <div className="lg:hidden mb-8 text-center">
              <h1 className="text-3xl font-bold text-white mb-2">The School of Options</h1>
              <p className="text-slate-400">Create your account</p>
            </div>

            {/* Registration Card */}
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-8 shadow-2xl">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {success ? "Check your email" : "Create your account"}
                </h2>
                <p className="text-slate-400">
                  {success ? (
                    <>
                      We've sent a verification link to{" "}
                      <span className="font-semibold text-orange-400">
                        {formData.email}
                      </span>
                    </>
                  ) : (
                    "Join The School of Options and start learning"
                  )}
                </p>
              </div>

              {!success ? (
                <>
                  {/* Registration Form */}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Full name
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <UserIcon className="h-5 w-5 text-slate-400" />
                          </div>
                          <input
                            type="text"
                            name="fullName"
                            placeholder="Enter your full name"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                            className="block w-full pl-10 pr-3 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Mobile number
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Phone className="h-5 w-5 text-slate-400" />
                          </div>
                          <input
                            type="tel"
                            name="mobileNumber"
                            placeholder="Enter your mobile number"
                            value={formData.mobileNumber}
                            onChange={handleChange}
                            required
                            className="block w-full pl-10 pr-3 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Email address
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-slate-400" />
                          </div>
                          <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="block w-full pl-10 pr-3 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Password
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-slate-400" />
                          </div>
                          <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Create a password"
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
                    </div>

                    {error && (
                      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                        <p className="text-red-400 text-sm">{error}</p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex justify-center items-center py-3 px-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-orange-500/25"
                    >
                      {loading ? (
                        <>
                          <Loader className="h-5 w-5 animate-spin mr-2" />
                          Creating account...
                        </>
                      ) : (
                        <>
                          Create account
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </button>
                  </form>

                  <div className="mt-6 text-center text-sm text-slate-400">
                    Already have an account?{" "}
                    <Link
                      href="/login"
                      className="text-orange-400 hover:text-orange-300 font-semibold transition-colors"
                    >
                      Sign in
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  {/* Success Message */}
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-green-600 shadow-lg">
                        <CheckCircle className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        Account Created Successfully!
                      </h3>
                      <p className="text-slate-400 text-sm mb-6">
                        Please check your email and click the verification link to activate your account.
                      </p>
                    </div>

                    <div className="bg-slate-700/30 rounded-xl border border-slate-600/50 p-4">
                      <div className="flex items-start space-x-3">
                        <Mail className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-white text-sm font-medium mb-1">
                            Verification Email Sent
                          </p>
                          <p className="text-slate-400 text-xs">
                            We've sent a verification link to <span className="text-orange-400">{formData.email}</span>. 
                            Click the link in the email to verify your account.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="text-center space-y-4">
                      <p className="text-slate-500 text-xs">
                        Didn't receive the email? Check your spam folder or try signing up again.
                      </p>
                      
                      <div className="flex flex-col sm:flex-row gap-3">
                        <button
                          type="button"
                          onClick={() => setSuccess(false)}
                          className="flex-1 flex justify-center items-center py-2 px-4 border border-slate-600 text-slate-300 hover:text-white hover:border-slate-500 font-medium rounded-lg transition-all duration-200"
                        >
                          Try Again
                        </button>
                        <Link
                          href="/login"
                          className="flex-1 flex justify-center items-center py-2 px-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-orange-500/25"
                        >
                          Go to Login
                        </Link>
                      </div>
                    </div>
                  </div>
                </>
              )}
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