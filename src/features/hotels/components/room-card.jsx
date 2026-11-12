"use client";

import React from "react";
import Image from "next/image";
import { Users, Bed, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

export function RoomCard({
  room,
  isSelected,
  onSelect,
  currency = "INR",
  remainingRooms = null,
  requestedRooms = 1,
}) {
  const roomPrice = room.price || room.pricePerNight || 3500;
  const roomCurrency = room.currency || currency || "INR";
  const effectiveRemaining = remainingRooms !== null ? remainingRooms : (room.availableRooms || 4);
  const isAvailable = effectiveRemaining >= requestedRooms;
  const roomImage =
    room.images && room.images.length > 0
      ? room.images[0]
      : "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800";

  return (
    <div
      className={`flex flex-col md:flex-row overflow-hidden rounded-2xl border transition-all duration-300 ${
        isSelected
          ? "border-teal-600 bg-teal-50/20 ring-2 ring-teal-600 shadow-md dark:border-teal-400 dark:bg-teal-950/20"
          : "border-slate-200/80 bg-white hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900"
      }`}
    >
      {/* Room Image */}
      <div className="relative aspect-[16/10] md:w-2/5 md:aspect-auto overflow-hidden bg-slate-100 dark:bg-slate-800">
        <Image
          src={roomImage}
          alt={room.name}
          fill
          sizes="(max-width: 768px) 100vw, 40vw"
          className="object-cover"
        />
        {isSelected && (
          <div className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-teal-700 px-3 py-1 text-[11px] font-bold text-white shadow-md">
            <Check className="h-3.5 w-3.5" />
            <span>Selected Suite</span>
          </div>
        )}
      </div>

      {/* Room Details */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {room.name}
            </h4>
            <span
              className={`text-xs font-semibold ${
                effectiveRemaining === 0
                  ? "text-rose-600 dark:text-rose-400"
                  : !isAvailable
                  ? "text-amber-600 dark:text-amber-400"
                  : "text-emerald-600 dark:text-emerald-400"
              }`}
            >
              {effectiveRemaining === 0
                ? "Sold out for these dates"
                : !isAvailable
                ? `Only ${effectiveRemaining} left (Need ${requestedRooms})`
                : `${effectiveRemaining} ${effectiveRemaining === 1 ? "suite" : "suites"} left`}
            </span>
          </div>

          {/* Quick Specs */}
          <div className="mt-2.5 flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <Bed className="h-3.5 w-3.5 text-slate-400" />
              {room.bedType}
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5 text-slate-400" />
              Up to {room.maxGuests} guests
            </span>
          </div>

          {/* Amenities Chips */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {(room.amenities || []).map((amenity, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-[11px] text-slate-600 dark:bg-slate-800 dark:text-slate-300"
              >
                <Check className="h-3 w-3 text-teal-600 dark:text-teal-400" />
                {amenity}
              </span>
            ))}
          </div>
        </div>

        {/* Pricing and Action */}
        <div className="mt-6 flex items-center justify-between gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
          <div className="min-w-0 flex-1">
            <span className="block text-[11px] font-medium text-slate-400">Per night</span>
            <div className="flex flex-wrap items-baseline gap-1">
              <span className="text-xl font-black text-teal-800 sm:text-2xl dark:text-teal-300">
                {formatCurrency(roomPrice, roomCurrency)}
              </span>
              <span className="text-xs text-slate-500">/ night</span>
            </div>
          </div>

          <Button
            size="sm"
            variant={isSelected ? "luxury" : "outline"}
            disabled={!isAvailable}
            onClick={() => onSelect(room.id)}
            className="shrink-0 text-xs font-semibold shadow-sm disabled:opacity-50"
          >
            {!isAvailable ? "Unavailable" : isSelected ? "Selected" : "Select This Suite"}
          </Button>
        </div>
      </div>
    </div>
  );
}

