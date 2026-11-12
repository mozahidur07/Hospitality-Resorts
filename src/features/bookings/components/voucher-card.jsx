"use client";

import React from "react";
import {
  MapPin,
  Bed,
  CheckCircle2,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { VoucherBarcode } from "./voucher-barcode";

// Formats YYYY-MM-DD string into DD/MM/YYYY
function formatDateToDMY(dateStr) {
  if (!dateStr) return "";
  const parts = dateStr.split("-");
  if (parts.length !== 3) return dateStr;
  const [y, m, d] = parts;
  return `${d}/${m}/${y}`;
}

/**
 * Reusable Voucher Card component used in:
 * 1. BookingVoucherModal (screen & print)
 * 2. Standalone /bookings/[reference] page (screen & print)
 */
export function VoucherCard({ booking, isPrintVersion = false }) {
  if (!booking) return null;

  const isCancelled = booking.booking_status === "cancelled";
  const isPayAtHotel =
    booking.payment_method === "hotel_pay" ||
    booking.payment_status === "pay_at_hotel" ||
    booking.payment_status === "pending" ||
    (!booking.payment_id &&
      booking.payment_status !== "paid" &&
      booking.payment_status !== "paid_online" &&
      booking.payment_status !== "confirmed");

  return (
    <div
      className={`voucher-card-box rounded-2xl bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100 ${
        isPrintVersion
          ? "border-0 p-2 sm:p-4 text-slate-900 bg-white shadow-none"
          : "border-2 border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm"
      }`}
    >
      {/* Brand & Reference Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b-2 border-slate-900/10 dark:border-slate-100/10 pb-5 gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-xl shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/icon.webp"
                alt="AuraLuxe Logo"
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-[#031256] dark:text-teal-400">
                  Aura<span className="text-teal-600 dark:text-teal-300">Luxe</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#061F5F] dark:text-teal-300">
                  HOTELS & RESORTS
                </span>
              </div>
            </div>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Verified Global Luxury Hotel Reservation Voucher
          </p>
        </div>

        <div className="text-left sm:text-right">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Booking Reference
          </span>
          <span className="text-xl sm:text-2xl font-mono font-black text-[#031256] dark:text-teal-300">
            {booking.booking_reference}
          </span>
          <div className="mt-1">
            {isCancelled ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-bold text-rose-700 border border-rose-200">
                RESERVATION CANCELLED
              </span>
            ) : isPayAtHotel ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-bold text-amber-800 border border-amber-300">
                <CheckCircle2 className="h-3 w-3 text-amber-600" />
                CONFIRMED • PAY AT CHECK-IN
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700 border border-emerald-200">
                <CheckCircle2 className="h-3 w-3" />
                PAID & GUARANTEED
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Hotel & Guest Two-Column Grid */}
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-6 pb-5 border-b border-slate-100 dark:border-slate-800">
        {/* Hotel Details */}
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Hotel & Property
          </span>
          <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-slate-100 mt-0.5">
            {booking.hotel_name}
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-1">
            <MapPin className="h-3.5 w-3.5 text-teal-600 shrink-0" />
            <span>{booking.hotel_city}, {booking.hotel_country}</span>
          </p>
          <div className="mt-2.5 flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <Bed className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <span>Suite: {booking.room_name} ({booking.rooms_count} {booking.rooms_count === 1 ? "Room" : "Rooms"})</span>
          </div>
        </div>

        {/* Guest Details */}
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Primary Guest Information
          </span>
          <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 mt-0.5">
            {booking.guest_name}
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Email: {booking.guest_email}
          </p>
          {booking.guest_phone && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Phone: {booking.guest_phone}
            </p>
          )}
          <div className="mt-2 text-xs font-medium text-slate-500">
            Occupancy: {booking.adults} Adults {booking.children > 0 ? `, ${booking.children} Children` : ""}
          </div>
        </div>
      </div>

      {/* Stay Itinerary Box */}
      <div className="mt-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 p-4 border border-slate-200/80 dark:border-slate-700/80">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Check-in</span>
            <p className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-0.5">
              {formatDateToDMY(booking.check_in)}
            </p>
            <span className="text-[10px] text-slate-500">From 14:00 (2:00 PM)</span>
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Check-out</span>
            <p className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-0.5">
              {formatDateToDMY(booking.check_out)}
            </p>
            <span className="text-[10px] text-slate-500">Until 11:00 (11:00 AM)</span>
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Duration</span>
            <p className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-0.5">
              {booking.nights} {booking.nights === 1 ? "Night" : "Nights"}
            </p>
            <span className="text-[10px] text-teal-600 font-semibold">Guaranteed Best Rate</span>
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Payment Method</span>
            <p className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-0.5">
              {isPayAtHotel ? "Pay at Hotel Desk" : "Paid Online"}
            </p>
            <span className="text-[10px] text-teal-700 dark:text-teal-400 font-semibold block truncate">
              {isPayAtHotel
                ? "Due at check-in (Cash/Card)"
                : booking.payment_id
                  ? `Razorpay ID: ${booking.payment_id}`
                  : "Verified Payment"}
            </span>
          </div>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="mt-5 border-b border-slate-100 dark:border-slate-800 pb-4">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
          Financial Summary
        </span>
        <div className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
          <div className="flex justify-between">
            <span>
              Room Rate ({formatCurrency(booking.price_per_night, booking.currency)} × {booking.nights}N × {booking.rooms_count}R)
            </span>
            <span className="font-semibold text-slate-900 dark:text-slate-100">
              {formatCurrency(booking.subtotal, booking.currency)}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Hotel Tax & Tourism Levy (12%)</span>
            <span className="font-semibold text-slate-900 dark:text-slate-100">
              {formatCurrency(booking.taxes_and_fees, booking.currency)}
            </span>
          </div>
          <div className="flex justify-between">
            <span>AuraLuxe VIP Concierge Service</span>
            <span className="font-semibold text-slate-900 dark:text-slate-100">
              {formatCurrency(booking.concierge_fee, booking.currency)}
            </span>
          </div>
          <div className="flex items-baseline justify-between pt-2 border-t border-slate-200 dark:border-slate-700 text-sm">
            <span className="font-black text-slate-900 dark:text-slate-100">
              {isPayAtHotel ? "Total Due upon Arrival" : "Total Amount Paid"}
            </span>
            <span className="text-xl font-black text-teal-800 dark:text-teal-400">
              {formatCurrency(booking.total_amount, booking.currency)}
            </span>
          </div>
        </div>
      </div>

      {/* Barcode & Verification Notice */}
      <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 p-3.5 bg-slate-50/50 dark:bg-slate-800/30">
        <div className="text-xs text-slate-500">
          <p className="font-bold text-slate-800 dark:text-slate-200">
            Check-in Verification Notice:
          </p>
          <p className="mt-0.5 text-[11px] leading-relaxed max-w-sm">
            Please show this voucher or state reference code <strong className="text-slate-900 dark:text-slate-100">{booking.booking_reference}</strong> at reception. 
            Valid government-issued photo ID is required for all guests.
          </p>
        </div>

        {/* Crisp Vector SVG Barcode */}
        <div className="shrink-0">
          <VoucherBarcode code={booking.booking_reference} />
        </div>
      </div>

      {/* Footer Assurance */}
      <div className="mt-4 text-center text-[10px] text-slate-400">
        AuraLuxe Hospitality & Travel Concierge • 24/7 Priority Support: support@auraluxe.com
      </div>
    </div>
  );
}

