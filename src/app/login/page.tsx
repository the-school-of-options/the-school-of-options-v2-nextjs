"use client";

import React, { useState } from "react";
import { LogIn, Mail, Lock, Loader, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        "https://api.theschoolofoptions.com/api/v1/auth/login",
        formData
      );
      const data = response.data;
      if (response.status !== 200) {
        setError(data.error);
      }

      //   const user: any = {
      //     id: data.userId,
      //     email: formData.email,
      //     name: "User",
      //   };
      router.push("/");
      // onSuccess(user, formData.email, data.otp);
    } catch (err) {
      setError("Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* soft brand halos */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-orange/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-120px] right-[-80px] h-[460px] w-[460px] rounded-full bg-navy-light/40 blur-3xl" />

      {/* subtle grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.35) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          mixBlendMode: "overlay",
        }}
      />

      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="rounded-3xl border border-border bg-card/70 p-8 shadow-medium backdrop-blur-xl">
            {/* Header */}
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-light to-orange shadow-soft">
                <LogIn className="h-8 w-8 text-primary-foreground" />
              </div>
              <h2 className="text-3xl font-semibold tracking-tight">
                Welcome back
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Sign in to continue your mentorship journey
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <label className="block">
                <span className="mb-2 block text-sm font-medium">Email</span>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-input bg-background/40 py-3 pl-11 pr-4 placeholder-muted-foreground outline-none transition focus:border-orange focus:ring-2 focus:ring-ring"
                  />
                </div>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium">Password</span>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-input bg-background/40 py-3 pl-11 pr-12 placeholder-muted-foreground outline-none transition focus:border-orange focus:ring-2 focus:ring-ring"
                  />
                  <button
                    type="button"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-2 text-muted-foreground hover:bg-white/5 hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </label>

              {error && (
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange to-orange-dark px-4 py-3 font-semibold text-primary-foreground shadow-soft transition hover:from-orange-light hover:to-orange disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader className="h-5 w-5 animate-spin" /> Signing in…
                  </>
                ) : (
                  "Sign in"
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-6 flex items-center justify-between text-sm">
              {/* <a
                href="#"
                className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                Forgot password?
              </a> */}
              <div className="text-muted-foreground">
                Don't have an account?{" "}
                <Link
                  href="/register"
                  className="font-semibold text-orange-light hover:text-orange"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} The School of Options • Educational
            content only
          </p>
        </div>
      </div>
    </div>
  );
}

