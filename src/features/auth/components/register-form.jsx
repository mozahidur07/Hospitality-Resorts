"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Loader2,
  Mail,
  User,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/features/auth/context/auth-context";

export function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { checkSession, setUser } = useAuth();

  const emailParam = searchParams.get("email") || "";

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [emailParam]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!fullName.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }

    if (!email.trim() || !email.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match. Please verify and try again.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim().toLowerCase(),
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Registration failed. Please try again.");
      }

      setSuccessMessage("Account created successfully. Redirecting...");
      if (data.user) {
        setUser(data.user);
      }
      await checkSession();

      const queryReturnUrl = searchParams?.get("returnUrl");
      let storedReturnUrl = null;
      if (typeof window !== "undefined") {
        storedReturnUrl = sessionStorage.getItem("auraluxe_return_url");
        sessionStorage.removeItem("auraluxe_return_url");
      }
      const targetDestination = queryReturnUrl || storedReturnUrl || "/";

      setTimeout(() => {
        router.push(targetDestination);
        router.refresh();
      }, 1000);
    } catch (err) {
      console.error("[Registration Error]:", err);
      setErrorMessage(err.message || "Unable to create your account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-slate-900">
      {errorMessage && (
        <div className="flex items-center gap-2.5 rounded-xl border border-rose-200 bg-rose-50/90 p-3 text-xs font-medium text-rose-700 animate-in fade-in">
          <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
          <span>{errorMessage}</span>
        </div>
      )}

      {successMessage && (
        <div className="flex items-center gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50/90 p-3 text-xs font-medium text-emerald-700 animate-in fade-in">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Email Field */}
      <div>
        <label className="block text-xs font-semibold text-slate-800">
          Email Address
        </label>
        <div className="relative mt-1.5">
          <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center justify-center z-10">
            <Mail className="h-4 w-4 text-[#031256]" strokeWidth={2.4} />
          </div>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            required
            readOnly={Boolean(emailParam)}
            className={`frosted-glass-input pl-11 pr-24 h-11 text-sm rounded-xl font-medium shadow-sm transition-all text-slate-900 placeholder:text-slate-500 ${
              emailParam
                ? "bg-slate-100/90 text-slate-800 border-[#061F5F]/40 cursor-not-allowed"
                : "border-[#061F5F]/60 focus:border-[#031256] focus:ring-2 focus:ring-[#061F5F]/20"
            }`}
          />
          {emailParam && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md bg-[#031256]/10 px-2 py-0.5 text-[11px] font-bold text-[#031256] border border-[#031256]/20">
              Verified
            </span>
          )}
        </div>
      </div>

      {/* Full Name Field */}
      <div>
        <label className="block text-xs font-semibold text-slate-800">
          Full Name
        </label>
        <div className="relative mt-1.5">
          <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center justify-center z-10">
            <User className="h-4 w-4 text-[#031256]" strokeWidth={2.4} />
          </div>
          <Input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="John Doe"
            required
            autoFocus={Boolean(emailParam)}
            className="frosted-glass-input pl-11 h-11 text-sm text-slate-900 placeholder:text-slate-500 border border-[#061F5F]/60 focus:border-[#031256] focus:ring-2 focus:ring-[#061F5F]/20 rounded-xl font-medium shadow-sm"
          />
        </div>
      </div>

      {/* Password Field */}
      <div>
        <label className="block text-xs font-semibold text-slate-800">
          Password
        </label>
        <div className="relative mt-1.5">
          <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center justify-center z-10">
            <Lock className="h-4 w-4 text-[#031256]" strokeWidth={2.4} />
          </div>
          <Input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 6 characters"
            required
            className="frosted-glass-input pl-11 pr-11 h-11 text-sm text-slate-900 placeholder:text-slate-500 border border-[#061F5F]/60 focus:border-[#031256] focus:ring-2 focus:ring-[#061F5F]/20 rounded-xl font-medium shadow-sm"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#031256] hover:text-black transition-colors p-1"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" strokeWidth={2.2} />
            ) : (
              <Eye className="h-4 w-4" strokeWidth={2.2} />
            )}
          </button>
        </div>
      </div>

      {/* Confirm Password Field */}
      <div>
        <label className="block text-xs font-semibold text-slate-800">
          Confirm Password
        </label>
        <div className="relative mt-1.5">
          <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center justify-center z-10">
            <Lock className="h-4 w-4 text-[#031256]" strokeWidth={2.4} />
          </div>
          <Input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-enter your password"
            required
            className="frosted-glass-input pl-11 pr-11 h-11 text-sm text-slate-900 placeholder:text-slate-500 border border-[#061F5F]/60 focus:border-[#031256] focus:ring-2 focus:ring-[#061F5F]/20 rounded-xl font-medium shadow-sm"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#031256] hover:text-black transition-colors p-1"
            aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
          >
            {showConfirmPassword ? (
              <EyeOff className="h-4 w-4" strokeWidth={2.2} />
            ) : (
              <Eye className="h-4 w-4" strokeWidth={2.2} />
            )}
          </button>
        </div>
      </div>

      {/* Submit Button (Clean text, no icon) */}
      <Button
        type="submit"
        disabled={loading}
        className="w-full h-11 font-semibold rounded-xl shadow-md bg-gradient-to-r from-[#08063F] via-[#031256] to-[#061F5F] hover:from-[#061F5F] hover:via-[#031256] hover:to-[#08063F] text-white text-sm mt-3 transition-all active:scale-[0.98]"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating Account...
          </>
        ) : (
          "Create Account"
        )}
      </Button>
    </form>
  );
}
