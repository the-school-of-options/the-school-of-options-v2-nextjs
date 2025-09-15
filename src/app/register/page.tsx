"use client";

import React, { useMemo, useRef, useState } from "react";
import {
  UserPlus,
  Mail,
  Lock,
  User as UserIcon,
  Loader,
  Eye,
  EyeOff,
} from "lucide-react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

type UserBrief = { id: string; email: string; name: string };

const API_BASE = "https://api.theschoolofoptions.com/api/v1";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // stages: "form" -> "otp"
  const [stage, setStage] = useState<"form" | "otp">("form");
  const [userId, setUserId] = useState<string | null>(null);

  // OTP state
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const maskedEmail = useMemo(() => {
    if (!formData.email.includes("@")) return "******";
    const [, domain] = formData.email.split("@");
    return `******@${domain}`;
  }, [formData.email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // SIGNUP request
      const { data } = await axios.post(`${API_BASE}/auth/signup`, formData);

      // Expecting data.userId; keep flexible if your API differs
      setUserId(data.userId ?? null);

      // move to OTP stage
      setStage("otp");
      // focus the first OTP input
      setTimeout(() => inputsRef.current[0]?.focus(), 0);
    } catch (err: any) {
      const msg = "Signup failed";
      setError(msg);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // ===== OTP handlers =====
  const setOtpAt = (index: number, val: string) => {
    setOtp((prev) => {
      const next = [...prev];
      next[index] = val;
      return next;
    });
  };

  const onOtpChange =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value.replace(/\D/g, "");
      if (!v) {
        setOtpAt(index, "");
        return;
      }
      // only take first digit here; auto-advance
      setOtpAt(index, v[0]);
      if (index < 5) {
        inputsRef.current[index + 1]?.focus();
      } else {
        // on 6th digit entered, auto-verify
        void verifyOtp([...otp.slice(0, 5), v[0]].join(""));
      }
    };

  const onOtpKeyDown =
    (index: number) => (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace" && !otp[index] && index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    };

  const onOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!text) return;
    const arr = Array.from({ length: 6 }, (_, i) => text[i] ?? "");
    setOtp(arr);
    if (arr.every((c) => c !== "")) {
      void verifyOtp(arr.join(""));
    } else {
      const firstEmpty = arr.findIndex((c) => c === "");
      inputsRef.current[firstEmpty >= 0 ? firstEmpty : 5]?.focus();
    }
  };

  const verifyOtp = async (code: string) => {
    try {
      setVerifying(true);
      setError("");

      // Adjust payload keys if your API expects a different shape
      const res = await axios.post(`${API_BASE}/otp/verify`, {
        email: formData.email,
        otp: code,
        password: formData.password,
      });

      const user: UserBrief = {
        id: userId ?? "",
        email: formData.email,
        name: formData.fullName,
      };

      if (res.status === 200) {
        router.push("/dashboard");
      }
    } catch (err: any) {
      const msg =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        err?.message ||
        "OTP verification failed";
      setError(msg);
      // reset OTP so user can re-enter
      setOtp(["", "", "", "", "", ""]);
      inputsRef.current[0]?.focus();
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* brand halos */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-orange/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-120px] right-[-80px] h-[460px] w-[460px] rounded-full bg-navy-light/40 blur-3xl" />
      {/* subtle grid */}
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
                <UserPlus className="h-8 w-8 text-primary-foreground" />
              </div>
              <h2 className="text-3xl font-semibold tracking-tight">
                {stage === "form" ? "Create your account" : "Verify your email"}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {stage === "form" ? (
                  "Join The School of Options and get started"
                ) : (
                  <>
                    Enter the 6-digit code sent to{" "}
                    <span className="font-semibold text-orange-light">
                      {maskedEmail}
                    </span>
                  </>
                )}
              </p>
            </div>

            {stage === "form" ? (
              <>
                {/* Signup form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  <label className="block">
                    <span className="mb-2 block text-sm font-medium">
                      Full name
                    </span>
                    <div className="relative">
                      <UserIcon className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input
                        type="text"
                        name="fullName"
                        placeholder="Your full name"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-input bg-background/40 py-3 pl-11 pr-4 placeholder-muted-foreground outline-none transition focus:border-orange focus:ring-2 focus:ring-ring"
                      />
                    </div>
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-medium">
                      Email
                    </span>
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
                    <span className="mb-2 block text-sm font-medium">
                      Password
                    </span>
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
                        <Loader className="h-5 w-5 animate-spin" /> Creating
                        account…
                      </>
                    ) : (
                      "Create account"
                    )}
                  </button>
                </form>

                <div className="mt-6 text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="font-semibold text-orange-light hover:text-orange"
                  >
                    Sign in
                  </Link>
                </div>
              </>
            ) : (
              <>
                {/* OTP screen */}
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      We've sent a code to your email.
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        // Optional: implement resend endpoint here
                        // await axios.post(`${API_BASE}/otp/resend`, { email: formData.email });
                      }}
                      className="text-sm font-semibold text-orange-light hover:text-orange"
                    >
                      Resend code
                    </button>
                  </div>

                  <div className="flex justify-between gap-2">
                    {otp.map((val, i) => (
                      <input
                        key={i}
                        ref={(el) => {
                          inputsRef.current[i] = el;
                        }}
                        value={val}
                        onChange={onOtpChange(i)}
                        onKeyDown={onOtpKeyDown(i)}
                        onPaste={i === 0 ? onOtpPaste : undefined}
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={1}
                        className="h-12 w-12 rounded-xl border border-input bg-background/40 text-center text-lg tracking-widest outline-none transition focus:border-orange focus:ring-2 focus:ring-ring"
                      />
                    ))}
                  </div>

                  {error && (
                    <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">
                      {error}
                    </div>
                  )}

                  <button
                    type="button"
                    disabled={verifying || otp.some((d) => d === "")}
                    onClick={() => verifyOtp(otp.join(""))}
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange to-orange-dark px-4 py-3 font-semibold text-primary-foreground shadow-soft transition hover:from-orange-light hover:to-orange disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {verifying ? (
                      <>
                        <Loader className="h-5 w-5 animate-spin" /> Verifying…
                      </>
                    ) : (
                      "Verify"
                    )}
                  </button>

                  <p className="text-center text-xs text-muted-foreground">
                    Enter the 6 digits. We'll auto-submit on the last digit.
                  </p>
                </div>
              </>
            )}
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

