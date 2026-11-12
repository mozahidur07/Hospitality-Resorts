"use client";

import React, { useState, useEffect, useCallback, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Star,
  MapPin,
  Check,
  ArrowLeft,
  Share2,
  Heart,
  Shield,
  Wifi,
  Coffee,
  Waves,
  Images,
} from "lucide-react";
import { getHotelBySlug } from "@/features/hotels/services/mock-hotels.data";
import { HotelReservationWidget } from "@/features/bookings/components/hotel-reservation-widget";
import { RoomCard } from "@/features/hotels/components/room-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { isHotelSaved, toggleSavedHotel } from "@/lib/storage/wishlist";

export default function HotelDetailPage({ params }) {
  const initialHotel = getHotelBySlug(params.slug);

  if (!initialHotel) {
    notFound();
  }

  const [hotel, setHotel] = useState(initialHotel);

  const [selectedRoomId, setSelectedRoomId] = useState(
    initialHotel.rooms && initialHotel.rooms.length > 0 ? initialHotel.rooms[0].id : null
  );

  const [isSaved, setIsSaved] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [bookedByRoom, setBookedByRoom] = useState({});
  const [requestedRooms, setRequestedRooms] = useState(1);

  const handleAvailabilitySync = useCallback((roomMap, reqRooms, hotelOverrides) => {
    setBookedByRoom(roomMap || {});
    setRequestedRooms(reqRooms || 1);

    if (hotelOverrides && typeof hotelOverrides === "object") {
      setHotel((prev) => {
        if (!prev) return prev;
        const updatedRooms = (prev.rooms || []).map((r) => {
          const ov = hotelOverrides[r.id];
          if (!ov) return r;
          const price = ov.price !== undefined ? Number(ov.price) : (r.price || r.pricePerNight);
          const availableRooms = ov.availableRooms !== undefined ? Number(ov.availableRooms) : r.availableRooms;
          const maxGuests = ov.maxGuests !== undefined ? Number(ov.maxGuests) : r.maxGuests;
          return {
            ...r,
            price,
            pricePerNight: price,
            availableRooms,
            maxGuests,
          };
        });
        const startingPrice = updatedRooms.length > 0 ? (updatedRooms[0].price || updatedRooms[0].pricePerNight) : prev.startingPrice;
        return {
          ...prev,
          startingPrice,
          pricePerNight: startingPrice,
          rooms: updatedRooms,
        };
      });
    }
  }, []);

  // Sync wishlist status with localStorage and cross-component events
  useEffect(() => {
    if (hotel?.id) {
      setIsSaved(isHotelSaved(hotel.id));
      const handleWishlistChange = () => {
        setIsSaved(isHotelSaved(hotel.id));
      };
      window.addEventListener("auraluxe_wishlist_change", handleWishlistChange);
      return () => {
        window.removeEventListener("auraluxe_wishlist_change", handleWishlistChange);
      };
    }
  }, [hotel?.id]);

  const handleToggleSave = () => {
    if (!hotel) return;
    const nextState = toggleSavedHotel(hotel);
    setIsSaved(nextState);
  };

  const handleShare = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({
          title: hotel.name,
          text: `Check out ${hotel.name} on AuraLuxe Retreats!`,
          url: window.location.href,
        });
        return;
      }
    } catch {}

    // Fallback: Copy to clipboard
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2400);
      }
    } catch {}
  };

  return (
    <div className="container mx-auto px-4 py-28 sm:px-6">
      {/* Top Breadcrumb & Actions */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/hotels"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-teal-700 dark:text-slate-400 dark:hover:text-teal-400"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to All Hotels</span>
        </Link>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
            className={`gap-1.5 text-xs transition-colors ${
              isCopied
                ? "border-teal-500 text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/40"
                : "text-slate-700 dark:text-slate-300 hover:text-slate-900"
            }`}
          >
            {isCopied ? (
              <>
                <Check className="h-3.5 w-3.5 text-teal-600 dark:text-teal-400" />
                <span>Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="h-3.5 w-3.5" />
                <span>Share</span>
              </>
            )}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleToggleSave}
            className={`gap-1.5 text-xs transition-colors ${
              isSaved
                ? "border-rose-200 bg-rose-50/80 text-rose-600 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-400 hover:bg-rose-100"
                : "text-slate-700 dark:text-slate-300 hover:text-slate-900"
            }`}
          >
            <Heart
              className={`h-3.5 w-3.5 ${
                isSaved ? "fill-rose-500 text-rose-500" : "text-slate-500"
              }`}
            />
            <span>{isSaved ? "Saved" : "Save"}</span>
          </Button>
        </div>
      </div>

      {/* Hotel Title & Badges */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-2">
          {hotel.badge && <Badge variant="luxury">{hotel.badge}</Badge>}
          <span className="flex text-amber-400">
            {Array.from({ length: hotel.stars }).map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-current" />
            ))}
          </span>
          <span className="text-xs font-semibold text-slate-500">
            • {hotel.rating} Rating ({hotel.reviewCount} verified reviews)
          </span>
        </div>

        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
          {hotel.name}
        </h1>
        <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
          <MapPin className="h-3.5 w-3.5 text-teal-600" />
          <span>
            {hotel.location.address}, {hotel.location.city}, {hotel.location.country}
          </span>
        </div>
      </div>

      {/* Photo Gallery Grid - Gap-Free 5-Photo Luxury Grid */}
      <div className="mb-10 overflow-hidden rounded-3xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 h-[320px] sm:h-[420px] md:h-[480px]">
          {/* Main Hero Photo (7 Cols on desktop) */}
          <div className="relative md:col-span-7 h-full w-full overflow-hidden rounded-2xl group cursor-pointer shadow-sm">
            <Image
              src={hotel.images[0]}
              alt={hotel.name}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent md:hidden" />
          </div>

          {/* Quad Grid Photos (5 Cols on desktop, 2x2 grid, EXACT height matching hero) */}
          <div className="hidden md:grid md:col-span-5 grid-cols-2 grid-rows-2 gap-3 h-full">
            {hotel.images.slice(1, 5).map((img, idx) => (
              <div
                key={idx}
                className="relative h-full w-full overflow-hidden rounded-2xl group cursor-pointer shadow-sm"
              >
                <Image
                  src={img}
                  alt={`${hotel.name} view ${idx + 2}`}
                  fill
                  sizes="25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors" />

                {idx === 3 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[1px] transition-all group-hover:bg-black/55">
                    <span className="flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-slate-900 shadow-md">
                      <Images className="h-3.5 w-3.5" />
                      <span>{hotel.images.length}+ Photos</span>
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* Left Column: Details, Rooms, Amenities */}
        <div className="space-y-12 lg:col-span-8">
          {/* Overview */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              About This Property
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
              {hotel.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-4 border-y border-slate-100 py-4 dark:border-slate-800">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <Shield className="h-4 w-4 text-teal-600" />
                <span>Verified 5-Star Luxury Standards</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <Check className="h-4 w-4 text-teal-600" />
                <span>24/7 Dedicated Private Concierge</span>
              </div>
            </div>
          </div>

          {/* Amenities Grid */}
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Exclusive Property Amenities
            </h3>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {hotel.amenities.map((amenity, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 rounded-xl border border-slate-100 bg-slate-50/50 p-3 text-xs font-medium text-slate-700 dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-200"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-300">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Room Selection */}
          {hotel.rooms && hotel.rooms.length > 0 && (
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  Select Your Suite
                </h3>
                <span className="text-xs text-slate-400">
                  {hotel.rooms.length} room options available
                </span>
              </div>

              <div className="mt-4 space-y-4">
                {hotel.rooms.map((room) => {
                  const totalCap = room.availableRooms || 4;
                  const bookedCount = bookedByRoom[room.id] || 0;
                  const remaining = Math.max(0, totalCap - bookedCount);

                  return (
                    <RoomCard
                      key={room.id}
                      room={room}
                      isSelected={selectedRoomId === room.id}
                      onSelect={(id) => setSelectedRoomId(id)}
                      currency={hotel.currency || "INR"}
                      remainingRooms={remaining}
                      requestedRooms={requestedRooms}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Sticky Booking Widget */}
        <div className="lg:col-span-4">
          <Suspense fallback={<div className="h-96 w-full rounded-3xl bg-slate-100 animate-pulse dark:bg-slate-800" />}>
            <HotelReservationWidget
              hotel={hotel}
              selectedRoomId={selectedRoomId}
              onRoomSelect={(id) => setSelectedRoomId(id)}
              onAvailabilitySync={handleAvailabilitySync}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

