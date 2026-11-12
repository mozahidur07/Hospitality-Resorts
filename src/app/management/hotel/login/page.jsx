"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Building2,
  Search,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  CheckCircle2,
  MapPin,
  Loader2,
  KeyRound,
} from "lucide-react";
import { getAllHotels } from "@/features/hotels/services/mock-hotels.data";

export default function HotelPartnerLoginPage() {
  const router = useRouter();
  const allHotels = useMemo(() => getAllHotels(), []);

  // Proactively prefetch the heavy hotel dashboard in advance for 0ms post-login transition
  useEffect(() => {
    try {
      router.prefetch("/management/hotel/dashboard");
    } catch (_) {}
  }, [router]);

  const [hotelQuery, setHotelQuery] = useState("");
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const matchingHotels = useMemo(() => {
    const q = hotelQuery.trim().toLowerCase();
    if (!q) return allHotels.slice(0, 8);
    return allHotels
      .filter(
        (h) =>
          h.name.toLowerCase().includes(q) ||
          h.cityName.toLowerCase().includes(q) ||
          h.id.toLowerCase().includes(q)
      )
      .slice(0, 12);
  }, [hotelQuery, allHotels]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!selectedHotel) {
      setErrorMsg("Please search and select your hotel property first.");
      return;
    }

    setIsLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/v1/management/hotel/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          hotelId: selectedHotel.id,
          password,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        router.push("/management/hotel/dashboard");
      } else {
        setErrorMsg(data.message || "Invalid credentials.");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-center px-4 py-12 relative overflow-hidden">
      {/* Background radial gradient glow */}
      <div className="pointer-events-none absolute -top-32 right-1/4 h-96 w-96 rounded-full bg-teal-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 left-1/4 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-lg">
        <Link
          href="/management"
          className="mb-6 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#031256] transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Management Hub</span>
        </Link>

        <div className="rounded-3xl border border-slate-200 bg-white p-7 sm:p-9 shadow-xl shadow-slate-200/60">
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm flex items-center justify-center">
              <Image
                src="/icon.webp"
                alt="AuraLuxe Logo"
                width={40}
                height={40}
                className="h-full w-full object-contain"
                priority
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-full">
                  Partner Portal
                </span>
              </div>
              <h1 className="mt-0.5 text-xl font-extrabold text-[#031256]">
                Hotel Partner Sign In
              </h1>
              <p className="text-xs text-slate-500">
                Select your property & enter administrative password
              </p>
            </div>
          </div>

          {errorMsg && (
            <div className="mt-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs font-medium text-rose-700">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin} className="mt-6 space-y-5">
            {/* Step 1: Hotel Search & Selection */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                1. Search & Select Property *
              </label>

              {selectedHotel ? (
                <div className="flex items-center justify-between gap-3 rounded-2xl border border-teal-300 bg-teal-50/60 p-3.5 shadow-sm">
                  <div className="flex items-center gap-3 min-w-0">
                    <CheckCircle2 className="h-5 w-5 text-teal-600 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-[#031256] truncate">
                        {selectedHotel.name}
                      </p>
                      <p className="text-[11px] text-teal-800 flex items-center gap-1 truncate font-medium">
                        <MapPin className="h-3 w-3 shrink-0" />
                        {selectedHotel.cityName}, {selectedHotel.countryName} • {selectedHotel.id}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedHotel(null)}
                    className="text-xs font-bold text-teal-700 hover:text-teal-900 underline shrink-0 cursor-pointer"
                  >
                    Change
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={hotelQuery}
                      onChange={(e) => setHotelQuery(e.target.value)}
                      placeholder="Search by hotel name, city (e.g. Kolkata), or ID..."
                      className="w-full rounded-xl border border-slate-300 bg-white pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 focus:outline-none transition-all shadow-sm"
                    />
                  </div>

                  <div className="max-h-48 overflow-y-auto rounded-xl border border-slate-200 bg-white divide-y divide-slate-100 shadow-sm">
                    {matchingHotels.length > 0 ? (
                      matchingHotels.map((h) => (
                        <button
                          key={h.id}
                          type="button"
                          onClick={() => setSelectedHotel(h)}
                          className="flex w-full items-center justify-between px-3.5 py-2.5 text-left hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                          <div className="min-w-0 pr-3">
                            <p className="text-xs font-bold text-slate-900 truncate">
                              {h.name}
                            </p>
                            <p className="text-[10px] text-slate-500 truncate">
                              {h.cityName}, {h.countryName}
                            </p>
                          </div>
                          <span className="text-[10px] font-bold text-teal-700 shrink-0">
                            Select →
                          </span>
                        </button>
                      ))
                    ) : (
                      <div className="p-4 text-center text-xs text-slate-400">
                        No matching hotel property found.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Step 2: Administrative Password */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                2. Administrative Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter property admin password"
                  className="w-full rounded-xl border border-slate-300 bg-white pl-10 pr-10 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 focus:outline-none transition-all shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-3 flex items-start gap-2.5 text-[11px] text-amber-900">
              <KeyRound className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span>
                  First-time setup default password: <code className="bg-amber-100 text-amber-900 px-1 py-0.5 rounded font-mono font-bold">AuraHotel@2026</code> (can be customized inside Settings or by Super Admin).
                </span>
              </div>
            </div>

            {/* High-Contrast Clear Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !selectedHotel}
              className="w-full h-12 rounded-xl bg-[#031256] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#061F5F] active:scale-[0.99] shadow-lg shadow-[#031256]/25 transition-all flex items-center justify-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying Property Credentials...
                </>
              ) : (
                "Access Hotel Dashboard"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
