"use client";

import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/layout/Header";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false);
  const [forgotPasswordMessage, setForgotPasswordMessage] = useState("");
  
  const router = useRouter();
  const { login, forgotPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      await login(formData.email, formData.password);
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotPasswordLoading(true);
    setForgotPasswordMessage("");
    
    try {
      await forgotPassword(forgotPasswordEmail);
      setForgotPasswordMessage("Password reset email sent! Check your inbox.");
    } catch (err: any) {
      setForgotPasswordMessage(err.message || "Failed to send reset email");
    } finally {
      setForgotPasswordLoading(false);
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
                Master
                <span className="block bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text">
                  Options Trading
                </span>
              </h1>
              <p className="text-xl text-slate-300 leading-relaxed mb-8">
                Join 2 lakh+ successful traders learning structured, clear, and logic-driven options trading with 20+ years of market expertise.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Expert Mentorship</h3>
                  <p className="text-slate-400">Learn from Kundan Kishore</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Proven Strategies</h3>
                  <p className="text-slate-400">Battle-tested trading methods</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Risk Management</h3>
                  <p className="text-slate-400">Protect your capital first</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center">
          <div className="w-full max-w-md">
            {/* Mobile Header */}
            <div className="lg:hidden mb-8 text-center">
              <h1 className="text-3xl font-bold text-white mb-2">The School of Options</h1>
              <p className="text-slate-400">Sign in to your account</p>
            </div>

            {/* Login Card */}
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-8 shadow-2xl">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Welcome back
                </h2>
                <p className="text-slate-400">
                  Sign in to continue your learning journey
                </p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
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
                        placeholder="Enter your password"
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
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign in
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </button>
              </form>

              {/* Footer Links */}
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(!showForgotPassword)}
                    className="text-orange-400 hover:text-orange-300 font-medium transition-colors"
                  >
                    Forgot your password?
                  </button>
                  <div className="text-slate-400">
                    Don't have an account?{" "}
                    <Link
                      href="/register"
                      className="text-orange-400 hover:text-orange-300 font-semibold transition-colors"
                    >
                      Sign up
                    </Link>
                  </div>
                </div>

                {/* Forgot Password Section */}
                {showForgotPassword && (
                  <div className="mt-4 p-6 bg-slate-700/30 rounded-xl border border-slate-600/50">
                    <h3 className="text-lg font-semibold text-white mb-4">Reset your password</h3>
                    <form onSubmit={handleForgotPassword} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Email address
                        </label>
                        <input
                          type="email"
                          placeholder="Enter your email address"
                          value={forgotPasswordEmail}
                          onChange={(e) => setForgotPasswordEmail(e.target.value)}
                          required
                          className="block w-full px-3 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={forgotPasswordLoading}
                        className="w-full flex justify-center py-3 px-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {forgotPasswordLoading ? (
                          <>
                            <Loader className="h-5 w-5 animate-spin mr-2" />
                            Sending reset email...
                          </>
                        ) : (
                          "Send Reset Email"
                        )}
                      </button>
                    </form>
                    {forgotPasswordMessage && (
                      <div className={`mt-4 p-4 rounded-lg ${
                        forgotPasswordMessage.includes("sent") 
                          ? "bg-green-500/10 border border-green-500/20" 
                          : "bg-red-500/10 border border-red-500/20"
                      }`}>
                        <div className="flex items-center">
                          {forgotPasswordMessage.includes("sent") ? (
                            <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                          ) : (
                            <div className="h-5 w-5 bg-red-400 rounded-full mr-2" />
                          )}
                          <p className={`text-sm ${
                            forgotPasswordMessage.includes("sent") 
                              ? "text-green-400" 
                              : "text-red-400"
                          }`}>
                            {forgotPasswordMessage}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
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