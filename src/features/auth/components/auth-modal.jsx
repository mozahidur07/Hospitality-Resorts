"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  X,
  Mail,
  Loader2,
} from "lucide-react";
import { useAuth } from "@/features/auth/context/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, authModalInitialEmail } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Prefetch register & login routes immediately for instantaneous routing
  useEffect(() => {
    if (isAuthModalOpen) {
      setEmail(authModalInitialEmail || "");
      setErrorMessage("");
      setLoading(false);
      try {
        router.prefetch("/register");
        router.prefetch("/login");
      } catch (err) {
        console.debug("[Prefetch warning]:", err);
      }
    }
  }, [isAuthModalOpen, authModalInitialEmail, router]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isAuthModalOpen) {
        closeAuthModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAuthModalOpen, closeAuthModal]);

  if (!isAuthModalOpen) return null;

  // Handle Email Submit & Instant Redirect
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const normalizedEmail = email.trim().toLowerCase();

      const res = await fetch("/api/v1/auth/check-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalizedEmail }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to check email.");
      }

      // Check if there is a pending return URL (e.g. from reserving a suite)
      let returnUrl = "";
      if (typeof window !== "undefined") {
        returnUrl = sessionStorage.getItem("auraluxe_return_url") || "";
      }
      const returnParam = returnUrl ? `&returnUrl=${encodeURIComponent(returnUrl)}` : "";

      // Determine instant target destination
      const targetUrl = data.exists
        ? `/login?email=${encodeURIComponent(normalizedEmail)}${returnParam}`
        : `/register?email=${encodeURIComponent(normalizedEmail)}${returnParam}`;

      // Instant transition: close modal and push route in same event loop tick
      closeAuthModal();
      router.push(targetUrl);
    } catch (err) {
      console.error("[Auth Modal Email Check Error]:", err);
      setErrorMessage(err.message || "Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Frosted Dark Backdrop */}
      <div
        onClick={closeAuthModal}
        className="fixed inset-0 bg-slate-950/50 backdrop-blur-md transition-opacity duration-200 animate-in fade-in"
      />

      {/* Modal Dialog Card: White with strong frosted glass blur */}
      <div className="frosted-glass-card relative w-full max-w-md overflow-hidden rounded-3xl p-8 transition-all duration-200 animate-in zoom-in-95 text-slate-900">
        {/* Top Right Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full text-slate-500 hover:bg-black/5 hover:text-slate-900 transition-colors"
          aria-label="Close dialog"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Modal Header */}
        <div className="text-center">
          <div className="relative mx-auto flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-white/80 p-2 shadow-sm border border-white/80 backdrop-blur-md">
            <Image
              src="/icon.webp"
              alt="AuraLuxe Logo"
              width={48}
              height={48}
              className="h-full w-full object-contain"
            />
          </div>

          <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-900">
            Sign In
          </h2>
          <p className="mt-1 text-xs text-slate-600 font-medium">
            Enter your email address to access your bookings.
          </p>
        </div>

        {/* Error Notification */}
        {errorMessage && (
          <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50/90 p-3 text-xs font-medium text-rose-700 animate-in fade-in">
            {errorMessage}
          </div>
        )}

        {/* EMAIL INPUT FORM */}
        <form onSubmit={handleEmailSubmit} className="mt-6 space-y-4">
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
                autoFocus
                className="frosted-glass-input pl-11 h-11 text-sm text-slate-900 placeholder:text-slate-500 border border-[#061F5F]/60 focus:border-[#031256] focus:ring-2 focus:ring-[#061F5F]/20 rounded-xl font-medium shadow-sm"
              />
            </div>
          </div>

          {/* Submit Button (Clean text, no icon) */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full h-11 font-semibold rounded-xl shadow-md bg-gradient-to-r from-[#08063F] via-[#031256] to-[#061F5F] hover:from-[#061F5F] hover:via-[#031256] hover:to-[#08063F] text-white text-sm transition-all active:scale-[0.98]"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Checking Account...
              </>
            ) : (
              "Continue with Email"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
