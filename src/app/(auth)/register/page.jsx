import React, { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { RegisterForm } from "@/features/auth/components/register-form";
import { Loader2, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Create Account | AuraLuxe",
  description: "Create an account to manage your hotel reservations and bookings.",
};

export default function RegisterPage() {
  return (
    <div
      className="relative flex min-h-screen w-full items-center justify-center px-4 py-16 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('https://i.pinimg.com/1200x/b7/ac/b1/b7acb1619cb998eaaa985df91a72a7cf.jpg')`,
      }}
    >
      {/* Ambient overlay */}
      <div className="absolute inset-0 bg-slate-950/30" />

      {/* Top Floating Return Home Link */}
      <div className="absolute top-6 left-6 z-10 flex items-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/70 px-4 py-2 text-xs font-semibold text-slate-800 backdrop-blur-xl hover:bg-white transition-all shadow-md"
        >
          <ArrowLeft className="h-3.5 w-3.5 text-[#031256]" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Main Glassmorphism Form Card: Authentic white frosted glass */}
      <div className="frosted-glass-card relative z-10 w-full max-w-md overflow-hidden rounded-3xl p-8 text-slate-900">
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
            Create Account
          </h2>
          <p className="mt-1 text-xs text-slate-600 font-medium">
            Enter your details to create an account and manage your hotel bookings.
          </p>
        </div>

        <Suspense
          fallback={
            <div className="flex h-48 items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-[#031256]" />
            </div>
          }
        >
          <RegisterForm />
        </Suspense>

        <p className="mt-6 text-center text-xs text-slate-600 font-medium">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-bold text-[#031256] hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
