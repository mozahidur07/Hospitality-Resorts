"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/features/auth/context/auth-context";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  const emailParam = searchParams?.get("email") || "";

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [emailParam]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      await login({ email: email.trim(), password });
      
      const queryReturnUrl = searchParams?.get("returnUrl");
      let storedReturnUrl = null;
      if (typeof window !== "undefined") {
        storedReturnUrl = sessionStorage.getItem("auraluxe_return_url");
        sessionStorage.removeItem("auraluxe_return_url");
      }

      const targetDestination = queryReturnUrl || storedReturnUrl || "/";
      router.push(targetDestination);
      router.refresh();
    } catch (err) {
      console.error("[Login Form Error]:", err);
      setErrorMessage(err.message || "Invalid email or password. Please verify your credentials.");
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

      {/* Email Input */}
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

      {/* Password Input */}
      <div>
        <div className="flex items-center justify-between">
          <label className="block text-xs font-semibold text-slate-800">
            Password
          </label>
          <button
            type="button"
            onClick={() => alert("Please contact customer support for password resets.")}
            className="text-xs font-semibold text-[#031256] hover:underline"
          >
            Forgot password?
          </button>
        </div>
        <div className="relative mt-1.5">
          <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center justify-center z-10">
            <Lock className="h-4 w-4 text-[#031256]" strokeWidth={2.4} />
          </div>
          <Input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            autoFocus={Boolean(emailParam)}
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

      {/* Submit Button (Clean text, no icon) */}
      <Button
        type="submit"
        disabled={loading}
        className="w-full h-11 font-semibold rounded-xl shadow-md bg-gradient-to-r from-[#08063F] via-[#031256] to-[#061F5F] hover:from-[#061F5F] hover:via-[#031256] hover:to-[#08063F] text-white text-sm mt-3 transition-all active:scale-[0.98]"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Signing In...
          </>
        ) : (
          "Sign In"
        )}
      </Button>

      <div className="mt-6 pt-3 border-t border-slate-200/60 text-center">
        <p className="text-xs text-slate-600 font-medium">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-bold text-[#031256] hover:underline"
          >
            Create Account
          </Link>
        </p>
      </div>
    </form>
  );
}
