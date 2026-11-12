"use client";

import React from "react";
import { Heart, MapPin, Star } from "lucide-react";

/**
 * Ultra-premium Hotel Skeleton Grid matching the exact layout of HotelCard (Image 2).
 * Displays a 3-column x 2-row grid of high-fidelity luxury card skeletons
 * with exact aspect ratios, badge placeholders, amenity chips, and pricing bars.
 */
export function HotelSkeletonGrid({ count = 6, className = "" }) {
  return (
    <div
      className={`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 ${className}`}
      aria-label="Loading hotel stays"
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900 shadow-sm"
        >
          {/* 1. Aspect Ratio Photo Container with Badges */}
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-200 dark:bg-slate-800 animate-pulse">
            {/* Top-left Badge placeholder */}
            <div className="absolute left-3.5 top-3.5 flex items-center rounded-full bg-white/90 px-3 py-1 shadow-sm backdrop-blur-md dark:bg-slate-900/90">
              <div className="h-3 w-20 rounded-full bg-slate-300/80 dark:bg-slate-700" />
            </div>

            {/* Top-right Wishlist heart button placeholder */}
            <div className="absolute right-3.5 top-3.5 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur-md dark:bg-slate-900/90">
              <Heart className="h-4 w-4 text-slate-300 dark:text-slate-600" />
            </div>

            {/* Bottom-left Location tag placeholder */}
            <div className="absolute bottom-3 left-3.5 flex items-center gap-1.5 rounded-full bg-black/45 px-2.5 py-1 text-xs text-white backdrop-blur-sm">
              <MapPin className="h-3.5 w-3.5 text-teal-400 shrink-0" />
              <div className="h-3 w-24 rounded-full bg-white/70" />
            </div>
          </div>

          {/* 2. Card Content Body */}
          <div className="flex flex-1 flex-col p-5">
            {/* Rating & Review Stars row */}
            <div className="mb-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 rounded-md bg-teal-50 px-2 py-0.5 dark:bg-teal-950/60">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <div className="h-3 w-6 rounded bg-teal-200 dark:bg-teal-800" />
                </div>
                <div className="h-3 w-20 rounded bg-slate-200 dark:bg-slate-700 animate-pulse" />
              </div>

              {/* 5 Star rating icons */}
              <div className="flex gap-1 text-amber-300/60 dark:text-amber-500/40">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="h-3 w-3 fill-current" />
                ))}
              </div>
            </div>

            {/* Hotel Name Title placeholder */}
            <div className="h-5 w-4/5 rounded-md bg-slate-200 dark:bg-slate-700 animate-pulse" />

            {/* Subtitle / Tagline placeholder */}
            <div className="mt-2 h-3.5 w-3/5 rounded bg-slate-100 dark:bg-slate-800 animate-pulse" />

            {/* Amenity Pill Chips */}
            <div className="my-4 flex flex-wrap gap-1.5">
              <div className="h-6 w-24 rounded-md bg-slate-100 dark:bg-slate-800 animate-pulse" />
              <div className="h-6 w-20 rounded-md bg-slate-100 dark:bg-slate-800 animate-pulse" />
              <div className="h-6 w-16 rounded-md bg-slate-100 dark:bg-slate-800 animate-pulse" />
            </div>

            {/* Bottom Pricing & Action Button */}
            <div className="mt-auto border-t border-slate-100 dark:border-slate-800 pt-4 flex items-end justify-between">
              <div>
                <div className="h-2.5 w-16 rounded bg-slate-200 dark:bg-slate-700 mb-1.5" />
                <div className="h-6 w-24 rounded bg-slate-200 dark:bg-slate-700 animate-pulse" />
              </div>

              <div className="h-8 w-24 rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
