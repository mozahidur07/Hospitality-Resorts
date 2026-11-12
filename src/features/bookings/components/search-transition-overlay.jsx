"use client";

import React, { useEffect, useState } from "react";
import { useSearchTransition } from "../context/search-transition-context";
import { HotelSkeletonGrid } from "@/features/hotels/components/hotel-skeleton-grid";
import { MapPin, Calendar, Users, Search } from "lucide-react";

// Formats YYYY-MM-DD string into DD/MM/YYYY
function formatDateToDMY(dateStr) {
  if (!dateStr) return "DD/MM/YYYY";
  const parts = dateStr.split("-");
  if (parts.length !== 3) return dateStr;
  const [y, m, d] = parts;
  return `${d}/${m}/${y}`;
}

// Computes the exact pixel position of the search bar (matches the Navbar middle slot on desktop)
function computeHotelsSearchBarRect() {
  if (typeof window === "undefined") {
    return { top: 10, left: 200, width: 768 };
  }
  const screenW = window.innerWidth;
  if (screenW >= 1024) {
    // Desktop: exactly aligns with the Navbar's center search bar slot
    const targetW = Math.min(768, screenW - 400);
    const targetLeft = (screenW - targetW) / 2;
    return { top: 10, left: targetLeft, width: targetW };
  }
  // Mobile / Tablet: aligns with the top mobile search bar
  const targetW = screenW - 32;
  return { top: 80, left: 16, width: targetW };
}

export function SearchTransitionOverlay() {
  const { transitionPhase, originRect, activeParams } = useSearchTransition();
  const [isExpandedVisual, setIsExpandedVisual] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    if (transitionPhase === "expanding") {
      setIsFadingOut(false);
      // Trigger expansion on next animation frame
      const frame = requestAnimationFrame(() => {
        setIsExpandedVisual(true);
      });
      return () => cancelAnimationFrame(frame);
    } else if (transitionPhase === "fadeout") {
      // Clean opacity fade without reversing positions
      setIsFadingOut(true);
    } else {
      setIsFadingOut(false);
      setIsExpandedVisual(false);
    }
  }, [transitionPhase]);

  if (transitionPhase === "idle" || !originRect) {
    return null;
  }

  // Exact target bounding rect on /hotels
  const targetRect = computeHotelsSearchBarRect();

  // Surface bounding styles
  const surfaceStyle = isExpandedVisual
    ? {
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        borderRadius: "0px",
        transition: "all 450ms cubic-bezier(0.16, 1, 0.3, 1)",
      }
    : {
        top: originRect.top,
        left: originRect.left,
        width: originRect.width,
        height: originRect.height,
        borderRadius: "9999px",
        transition: "all 450ms cubic-bezier(0.16, 1, 0.3, 1)",
      };

  // Search bar bounding styles (exact pixel match with /hotels)
  const barStyle = isExpandedVisual
    ? {
        top: targetRect.top,
        left: targetRect.left,
        width: targetRect.width,
        height: originRect.height,
        transition: "all 450ms cubic-bezier(0.16, 1, 0.3, 1)",
      }
    : {
        top: originRect.top,
        left: originRect.left,
        width: originRect.width,
        height: originRect.height,
        transition: "all 450ms cubic-bezier(0.16, 1, 0.3, 1)",
      };

  return (
    <div
      className={`fixed inset-0 z-[100] ${
        transitionPhase === "expanding" ? "pointer-events-auto cursor-wait" : "pointer-events-none"
      } overflow-hidden transition-opacity duration-200 ${
        isFadingOut ? "opacity-0" : "opacity-100"
      }`}
      aria-hidden="true"
    >
      {/* Expanding White Canvas Layer */}
      <div
        style={surfaceStyle}
        className="absolute bg-white shadow-2xl border border-slate-200/80 will-change-transform"
      />

      {/* Morphing Gliding Search Component */}
      <div
        style={barStyle}
        className={`absolute z-10 flex items-center justify-between px-3 py-1.5 will-change-transform transition-all duration-300 ${
          isExpandedVisual
            ? "bg-transparent rounded-none border-none shadow-none"
            : "bg-white rounded-full border border-slate-200/90 shadow-lg"
        }`}
      >
        {/* Destination */}
        <div className="flex items-center gap-2.5 px-3 min-w-0 flex-1">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#031256]/10 text-[#031256]">
            <MapPin className="h-4 w-4" strokeWidth={2.2} />
          </div>
          <div className="truncate">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Destination
            </span>
            <span className="text-xs font-bold text-slate-900 truncate block">
              {activeParams?.destination || "Any Destination"}
            </span>
          </div>
        </div>

        {/* Divider 1 */}
        <div className="hidden md:block h-8 w-[1px] bg-slate-200 shrink-0 my-auto" />

        {/* Stay Dates */}
        <div className="hidden sm:flex items-center gap-2.5 px-4 min-w-0">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#031256]/10 text-[#031256]">
            <Calendar className="h-4 w-4" strokeWidth={2.2} />
          </div>
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Check-in / Check-out
            </span>
            <span className="text-xs font-bold text-slate-900 whitespace-nowrap">
              {formatDateToDMY(activeParams?.checkIn)} - {formatDateToDMY(activeParams?.checkOut)}
            </span>
          </div>
        </div>

        {/* Divider 2 */}
        <div className="hidden md:block h-8 w-[1px] bg-slate-200 shrink-0 my-auto" />

        {/* Guests & Rooms */}
        <div className="hidden md:flex items-center gap-2.5 px-4 min-w-0">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#031256]/10 text-[#031256]">
            <Users className="h-4 w-4" strokeWidth={2.2} />
          </div>
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Guests & Rooms
            </span>
            <span className="text-xs font-bold text-slate-900 whitespace-nowrap">
              {activeParams?.adults || 2} Guests, {activeParams?.rooms || 1} Room
            </span>
          </div>
        </div>

        {/* Search Pill Button */}
        <div className="pl-2 shrink-0">
          <div className="h-10 px-6 rounded-full bg-[#031256] text-white flex items-center justify-center gap-1.5 text-xs font-semibold shadow-md">
            <Search className="h-3.5 w-3.5" />
            <span>Search</span>
          </div>
        </div>
      </div>

      {/* Ultra-Premium 6 Skeleton Cards matching real cards layout */}
      <div
        className={`absolute z-10 left-1/2 -translate-x-1/2 w-full max-w-6xl px-4 sm:px-6 top-24 transition-all duration-300 ${
          isExpandedVisual ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <HotelSkeletonGrid count={6} />
      </div>
    </div>
  );
}
