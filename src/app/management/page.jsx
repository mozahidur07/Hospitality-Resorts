"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Building2,
  ShieldCheck,
  ArrowRight,
  Lock,
  LayoutDashboard,
  Globe,
  ArrowLeft,
  KeyRound,
  FileSpreadsheet,
} from "lucide-react";

export default function ManagementHubPage() {
  const router = useRouter();

  useEffect(() => {
    try {
      router.prefetch("/management/hotel/login");
      router.prefetch("/management/admin/login");
      router.prefetch("/management/hotel/dashboard");
      router.prefetch("/management/admin/dashboard");
    } catch (_) {}
  }, [router]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between relative overflow-hidden">
      {/* Subtle Ambient Background Gradients */}
      <div className="pointer-events-none absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full bg-teal-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 right-1/4 h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-3xl" />

      {/* Top Bar / Header */}
      <header className="relative z-10 border-b border-slate-200 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-xl border border-slate-200 shadow-sm bg-white p-1 flex items-center justify-center">
              <Image
                src="/icon.webp"
                alt="AuraLuxe Logo"
                width={36}
                height={36}
                className="h-full w-full object-contain"
                priority
              />
            </div>
            <div>
              <span className="text-sm font-extrabold tracking-tight text-[#031256] block leading-none">
                AuraLuxe Executive
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-teal-700">
                Internal Operations Gateway
              </span>
            </div>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-[#031256]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Public Site</span>
          </Link>
        </div>
      </header>

      {/* Main Gateway Content */}
      <main className="relative z-10 mx-auto w-full max-w-5xl px-6 py-14 sm:py-20">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-teal-200 bg-teal-50 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-teal-800 shadow-sm">
            <Lock className="h-3 w-3 text-teal-700" />
            Restricted Administrative Access
          </span>
          <h1 className="mt-4 text-3xl sm:text-5xl font-black tracking-tight text-[#031256]">
            Management & Operations Hub
          </h1>
          <p className="mt-3 text-sm text-slate-600 leading-relaxed">
            Select your administrative portal below to manage property reservations, live room rates, or oversee global platform operations.
          </p>
        </div>

        {/* Two Portal Cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* 1. Hotel Partner Portal */}
          <Link
            href="/management/hotel/login"
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-md shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1 hover:border-teal-500/60 hover:shadow-xl hover:shadow-teal-900/10"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-teal-700 border border-teal-200/80 shadow-sm">
                  <Building2 className="h-7 w-7" />
                </div>
                <span className="rounded-full bg-slate-100 border border-slate-200 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-700">
                  Property Level
                </span>
              </div>

              <h2 className="mt-6 text-2xl font-bold text-[#031256] group-hover:text-teal-700 transition-colors">
                Hotel Partner Portal
              </h2>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Search and select your registered hotel property, authenticate with your administrative password, and manage front-desk check-ins, room inventory, dynamic pricing, and guest requests.
              </p>

              <ul className="mt-6 space-y-2.5 border-t border-slate-100 pt-5 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <LayoutDashboard className="h-4 w-4 text-teal-600 shrink-0" />
                  <span>Property KPIs, Arrivals & Departures</span>
                </li>
                <li className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-teal-600 shrink-0" />
                  <span>Live Room Rates & Real-Time Availability Overrides</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-5">
              <span className="text-xs font-bold text-teal-700 group-hover:text-teal-800">
                Enter Hotel Portal
              </span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#031256] text-white shadow-md transition-transform group-hover:translate-x-1 group-hover:bg-[#061F5F]">
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </Link>

          {/* 2. Super Admin Portal */}
          <Link
            href="/management/admin/login"
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-md shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/60 hover:shadow-xl hover:shadow-indigo-900/10"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-700 border border-indigo-200/80 shadow-sm">
                  <ShieldCheck className="h-7 w-7" />
                </div>
                <span className="rounded-full bg-indigo-50 border border-indigo-200 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-800">
                  Global Master
                </span>
              </div>

              <h2 className="mt-6 text-2xl font-bold text-[#031256] group-hover:text-indigo-700 transition-colors">
                Super Admin Command Center
              </h2>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Centralized executive oversight across all hotels worldwide. Filter bookings by property, location, or date, export reports to CSV, manage client accounts, resolve inquiries, and control hotel access.
              </p>

              <ul className="mt-6 space-y-2.5 border-t border-slate-100 pt-5 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <FileSpreadsheet className="h-4 w-4 text-indigo-600 shrink-0" />
                  <span>All-Hotel Booking Explorer & CSV Export</span>
                </li>
                <li className="flex items-center gap-2">
                  <KeyRound className="h-4 w-4 text-indigo-600 shrink-0" />
                  <span>Hotel Password Control, Clients & Inquiries</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-5">
              <span className="text-xs font-bold text-indigo-700 group-hover:text-indigo-800">
                Enter Super Admin
              </span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#031256] text-white shadow-md transition-transform group-hover:translate-x-1 group-hover:bg-[#061F5F]">
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-200 bg-white/60 py-5 text-center text-xs text-slate-500">
        AuraLuxe Hospitality Internal Management System • Authorized Personnel Only
      </footer>
    </div>
  );
}
