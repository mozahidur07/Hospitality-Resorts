"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import {
  Star,
  ArrowRight,
  ShieldCheck,
  Calendar as CalendarIcon,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency, calculateNights } from "@/lib/utils";
import { useAuth } from "@/features/auth/context/auth-context";

// Formats YYYY-MM-DD string into DD/MM/YYYY for strict standardized display
function formatDateToDMY(dateStr) {
  if (!dateStr) return "";
  const parts = dateStr.split("-");
  if (parts.length !== 3) return dateStr;
  const [y, m, d] = parts;
  return `${d}/${m}/${y}`;
}

export function HotelReservationWidget({
  hotel,
  selectedRoomId,
  onRoomSelect,
  onAvailabilitySync,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, openAuthModal } = useAuth();

  // Read search filter params from URL if navigated from search or hotel list
  const queryCheckIn = searchParams?.get("checkIn") || "";
  const queryCheckOut = searchParams?.get("checkOut") || "";
  const queryAdults = searchParams?.get("adults") || "";
  const queryChildren = searchParams?.get("children") || "";
  const queryRooms = searchParams?.get("rooms") || "";

  const currency = hotel.currency || "INR";
  const defaultRoom = hotel.rooms && hotel.rooms.length > 0 ? hotel.rooms[0] : null;
  const currentRoom =
    hotel.rooms?.find((r) => r.id === selectedRoomId) || defaultRoom;

  // Initialize dates safely with priority to search query params
  const [checkIn, setCheckIn] = useState(() => {
    if (queryCheckIn && !isNaN(new Date(queryCheckIn).getTime())) {
      return queryCheckIn;
    }
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  });

  const [checkOut, setCheckOut] = useState(() => {
    if (queryCheckOut && !isNaN(new Date(queryCheckOut).getTime())) {
      return queryCheckOut;
    }
    const d = new Date();
    d.setDate(d.getDate() + 3);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  });

  const [adults, setAdults] = useState(() => {
    const val = Number(queryAdults);
    return val > 0 ? val : 2;
  });

  const [children, setChildren] = useState(() => {
    const val = Number(queryChildren);
    return val >= 0 ? val : 0;
  });

  const [roomsCount, setRoomsCount] = useState(() => {
    const val = Number(queryRooms);
    return val > 0 ? val : 1;
  });

  const [bookedByRoom, setBookedByRoom] = useState({});
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Synchronize when query parameters change
  useEffect(() => {
    if (queryCheckIn && !isNaN(new Date(queryCheckIn).getTime())) {
      setCheckIn(queryCheckIn);
    }
    if (queryCheckOut && !isNaN(new Date(queryCheckOut).getTime())) {
      setCheckOut(queryCheckOut);
    }
    if (queryAdults && Number(queryAdults) > 0) {
      setAdults(Number(queryAdults));
    }
    if (queryChildren && Number(queryChildren) >= 0) {
      setChildren(Number(queryChildren));
    }
    if (queryRooms && Number(queryRooms) > 0) {
      setRoomsCount(Number(queryRooms));
    }
  }, [queryCheckIn, queryCheckOut, queryAdults, queryChildren, queryRooms]);

  // Fetch real-time booked rooms count and live admin room overrides for this hotel
  useEffect(() => {
    let cancelled = false;
    if (!hotel?.id) return;

    const url = `/api/v1/bookings/availability-summary?checkIn=${encodeURIComponent(checkIn || "")}&checkOut=${encodeURIComponent(checkOut || "")}&hotelId=${encodeURIComponent(hotel.id)}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled && data?.success) {
          const roomMap = data.bookedMap?.[hotel.id] || {};
          const hotelOverrides = data.hotelOverridesMap?.[hotel.id] || null;
          setBookedByRoom(roomMap);
          if (onAvailabilitySync) {
            onAvailabilitySync(roomMap, roomsCount, hotelOverrides);
          }
        }
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [hotel?.id, checkIn, checkOut, roomsCount, onAvailabilitySync]);

  const pricePerNight = currentRoom
    ? currentRoom.price || currentRoom.pricePerNight || hotel.startingPrice || 3500
    : hotel.startingPrice || hotel.pricePerNight || 3500;

  const currentRoomTotal = currentRoom?.availableRooms || 4;
  const currentRoomBooked = currentRoom ? bookedByRoom[currentRoom.id] || 0 : 0;
  const remainingRooms = Math.max(0, currentRoomTotal - currentRoomBooked);
  const hasEnoughRooms = remainingRooms >= roomsCount;

  const nights = calculateNights(checkIn, checkOut);
  const subtotal = pricePerNight * nights * roomsCount;
  const taxesAndFees = Math.round(subtotal * 0.12);
  const conciergeFee = currency === "INR" ? 450 : 45;
  const total = subtotal + taxesAndFees + conciergeFee;

  const handleProceedToCheckout = () => {
    if (isRedirecting || !hasEnoughRooms) return;

    const hotelIdentifier = hotel.slug || hotel.id;
    const params = new URLSearchParams({
      hotel: hotelIdentifier,
      room: currentRoom ? currentRoom.id : "standard",
      checkIn,
      checkOut,
      adults: adults.toString(),
      children: children.toString(),
      rooms: roomsCount.toString(),
      nights: nights.toString(),
    });
    const targetUrl = `/checkout?${params.toString()}`;

    // If user is not logged in, remember the chosen room/dates and open auth modal
    if (!user) {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("auraluxe_return_url", targetUrl);
      }
      openAuthModal();
      return;
    }

    setIsRedirecting(true);
    try {
      router.prefetch(targetUrl);
    } catch (_) {}
    router.push(targetUrl);
  };

  return (
    <div className="sticky top-28 rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900">
      {/* Price Header */}
      <div className="flex items-baseline justify-between border-b border-slate-100 pb-5 dark:border-slate-800">
        <div>
          <span className="text-xs text-slate-400">Nightly rate from</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-black text-teal-800 dark:text-teal-300">
              {formatCurrency(pricePerNight, currency)}
            </span>
            <span className="text-xs text-slate-500">/ night</span>
          </div>
        </div>

        <div className="flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-900 dark:bg-amber-950/60 dark:text-amber-300">
          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
          <span>{hotel.rating} Rating</span>
        </div>
      </div>

      {/* Inputs Form */}
      <div className="mt-5 space-y-3">
        {/* Date Selector with strict DD/MM/YYYY display and overlay native picker */}
        <div className="grid grid-cols-2 gap-2 rounded-2xl border border-slate-200 p-2.5 dark:border-slate-800">
          <div className="relative group cursor-pointer">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Check-In
            </label>
            <div className="flex items-center justify-between mt-1">
              <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 font-mono tracking-tight">
                {formatDateToDMY(checkIn)}
              </span>
              <CalendarIcon className="h-3.5 w-3.5 text-slate-400 group-hover:text-teal-600 transition-colors" />
            </div>
            <input
              type="date"
              value={checkIn}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setCheckIn(e.target.value)}
              className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
              title="Select Check-In Date"
            />
          </div>

          <div className="relative group cursor-pointer border-l border-slate-200 pl-2.5 dark:border-slate-800">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Check-Out
            </label>
            <div className="flex items-center justify-between mt-1">
              <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 font-mono tracking-tight">
                {formatDateToDMY(checkOut)}
              </span>
              <CalendarIcon className="h-3.5 w-3.5 text-slate-400 group-hover:text-teal-600 transition-colors" />
            </div>
            <input
              type="date"
              value={checkOut}
              min={checkIn || new Date().toISOString().split("T")[0]}
              onChange={(e) => setCheckOut(e.target.value)}
              className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
              title="Select Check-Out Date"
            />
          </div>
        </div>

        {/* Room Selection Dropdown if multiple rooms */}
        {hotel.rooms && hotel.rooms.length > 0 && (
          <div className="rounded-2xl border border-slate-200 p-2.5 dark:border-slate-800">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Selected Suite / Room
            </label>
            <select
              value={currentRoom?.id}
              onChange={(e) => onRoomSelect && onRoomSelect(e.target.value)}
              className="mt-1 w-full bg-transparent text-xs font-semibold text-slate-800 focus:outline-none dark:text-slate-200 cursor-pointer"
            >
              {hotel.rooms.map((r) => (
                <option key={r.id} value={r.id} className="dark:bg-slate-900">
                  {r.name} - {formatCurrency(r.price || r.pricePerNight, r.currency || currency)}/night
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Guests & Rooms Selector */}
        <div className="grid grid-cols-3 gap-2 rounded-2xl border border-slate-200 p-2.5 dark:border-slate-800">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Adults
            </label>
            <select
              value={adults}
              onChange={(e) => setAdults(Number(e.target.value))}
              className="mt-1 w-full bg-transparent text-xs font-semibold text-slate-800 focus:outline-none dark:text-slate-200 cursor-pointer"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <option key={num} value={num} className="dark:bg-slate-900">
                  {num} {num === 1 ? "Adult" : "Adults"}
                </option>
              ))}
            </select>
          </div>
          <div className="border-l border-slate-200 pl-2 dark:border-slate-800">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Children
            </label>
            <select
              value={children}
              onChange={(e) => setChildren(Number(e.target.value))}
              className="mt-1 w-full bg-transparent text-xs font-semibold text-slate-800 focus:outline-none dark:text-slate-200 cursor-pointer"
            >
              {[0, 1, 2, 3, 4].map((num) => (
                <option key={num} value={num} className="dark:bg-slate-900">
                  {num} {num === 1 ? "Child" : "Children"}
                </option>
              ))}
            </select>
          </div>
          <div className="border-l border-slate-200 pl-2 dark:border-slate-800">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Rooms
            </label>
            <select
              value={roomsCount}
              onChange={(e) => setRoomsCount(Number(e.target.value))}
              className="mt-1 w-full bg-transparent text-xs font-semibold text-slate-800 focus:outline-none dark:text-slate-200 cursor-pointer"
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num} className="dark:bg-slate-900">
                  {num} {num === 1 ? "Room" : "Rooms"}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Live Availability Status Badge */}
        <div className={`rounded-xl px-3 py-2 text-[11px] font-semibold flex items-center justify-between ${
          hasEnoughRooms
            ? "bg-emerald-50/80 text-emerald-700 border border-emerald-200/60 dark:bg-emerald-950/30 dark:border-emerald-800/50 dark:text-emerald-300"
            : "bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-950/40 dark:border-rose-800 dark:text-rose-300"
        }`}>
          <span>
            {hasEnoughRooms
              ? `${remainingRooms} ${remainingRooms === 1 ? "suite" : "suites"} available for your dates`
              : remainingRooms === 0
              ? "Selected suite is sold out for these dates"
              : `Only ${remainingRooms} ${remainingRooms === 1 ? "suite" : "suites"} left (requested ${roomsCount})`}
          </span>
        </div>
      </div>

      {/* Pricing Breakdown */}
      <div className="mt-5 space-y-2.5 border-t border-slate-100 pt-4 text-xs dark:border-slate-800">
        <div className="flex justify-between text-slate-600 dark:text-slate-400">
          <span>
            {formatCurrency(pricePerNight, currency)} × {nights} {nights === 1 ? "night" : "nights"}{" "}
            {roomsCount > 1 ? `× ${roomsCount} rooms` : ""}
          </span>
          <span className="font-semibold text-slate-900 dark:text-slate-100">
            {formatCurrency(subtotal, currency)}
          </span>
        </div>

        <div className="flex justify-between text-slate-600 dark:text-slate-400">
          <span>Resort Tax & Tourism Levy (12%)</span>
          <span className="font-semibold text-slate-900 dark:text-slate-100">
            {formatCurrency(taxesAndFees, currency)}
          </span>
        </div>

        <div className="flex justify-between text-slate-600 dark:text-slate-400">
          <span>AuraLuxe 24/7 VIP Concierge</span>
          <span className="font-semibold text-slate-900 dark:text-slate-100">
            {formatCurrency(conciergeFee, currency)}
          </span>
        </div>

        <div className="border-t border-slate-100 pt-3 dark:border-slate-800">
          <div className="flex items-baseline justify-between text-sm">
            <span className="font-bold text-slate-900 dark:text-slate-100">Total Due</span>
            <span className="text-xl font-black text-teal-800 dark:text-teal-300">
              {formatCurrency(total, currency)}
            </span>
          </div>
          <p className="mt-1 text-[11px] text-slate-400">Includes all local taxes and service charges</p>
        </div>
      </div>

      {/* CTA Button */}
      <div className="mt-6">
        <Button
          onClick={handleProceedToCheckout}
          disabled={isRedirecting || !hasEnoughRooms}
          variant="luxury"
          size="lg"
          className="w-full h-12 sm:h-14 min-h-[50px] py-3.5 px-6 rounded-full gap-2 text-sm sm:text-base font-bold shadow-lg shadow-[#031256]/25 transition-all disabled:opacity-50"
        >
          {isRedirecting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Securing Your Stay...</span>
            </>
          ) : !hasEnoughRooms ? (
            <span>Insufficient Rooms for Selected Dates</span>
          ) : (
            <>
              <span>Reserve Your Stay</span>
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>

      {/* Reassurance */}
      <div className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs text-slate-500">
        <ShieldCheck className="h-3.5 w-3.5 text-teal-600" />
        <span>No immediate charge. Free cancellation up to 48h before stay.</span>
      </div>

      {/* Screen-Level Processing Overlay during redirect */}
      {isRedirecting && (
        <div className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-md text-white animate-in fade-in p-6 text-center select-none">
          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-white p-2 shadow-2xl">
            <Image
              src="/icon.webp"
              alt="AuraLuxe Logo"
              width={48}
              height={48}
              className="object-contain"
              priority
            />
          </div>
          <div className="mt-5 flex items-center gap-2.5 justify-center">
            <Loader2 className="h-5 w-5 animate-spin text-teal-400" />
            <span className="text-base font-extrabold tracking-wide">
              Preparing Your Luxury Suite...
            </span>
          </div>
          <p className="mt-1.5 text-xs text-slate-300 max-w-xs">
            Locking real-time room availability and routing to secure checkout
          </p>
        </div>
      )}
    </div>
  );
}
