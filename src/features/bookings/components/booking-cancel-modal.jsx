"use client";

import React, { useState } from "react";
import {
  AlertTriangle,
  X,
  Loader2,
  ShieldCheck,
  Building2,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Formats YYYY-MM-DD string into DD/MM/YYYY
function formatDateToDMY(dateStr) {
  if (!dateStr) return "";
  const parts = dateStr.split("-");
  if (parts.length !== 3) return dateStr;
  const [y, m, d] = parts;
  return `${d}/${m}/${y}`;
}

export function BookingCancelModal({ booking, isOpen, onClose, onCancelled }) {
  const [reason, setReason] = useState("Change of travel plans");
  const [isCancelling, setIsCancelling] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen || !booking) return null;

  const handleConfirmCancel = async () => {
    setIsCancelling(true);
    setError("");

    try {
      const res = await fetch("/api/v1/bookings/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingId: booking.id,
          bookingReference: booking.booking_reference,
          reason,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || "Failed to cancel reservation.");
        setIsCancelling(false);
        return;
      }

      onCancelled(data.booking);
      onClose();
    } catch (err) {
      setError(err.message || "Network error. Please try again.");
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-3xl bg-white p-6 sm:p-8 shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        <button
          onClick={onClose}
          disabled={isCancelling}
          className="absolute right-4 top-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 dark:bg-rose-950 dark:text-rose-400">
          <AlertTriangle className="h-6 w-6" />
        </div>

        <h3 className="mt-4 text-xl font-black text-slate-900 dark:text-slate-100">
          Cancel Reservation?
        </h3>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Are you sure you want to cancel this booking? This will immediately unlock the suite dates for other guests.
        </p>

        {/* Booking Card Summary */}
        <div className="mt-4 rounded-2xl border border-slate-100 bg-slate-50 p-4 text-xs dark:border-slate-800 dark:bg-slate-800/50">
          <p className="font-bold text-slate-900 dark:text-slate-100">
            {booking.hotel_name}
          </p>
          <p className="text-slate-400 mt-0.5">{booking.room_name}</p>
          <div className="mt-2 flex items-center gap-2 text-slate-600 dark:text-slate-300">
            <Calendar className="h-3.5 w-3.5 text-teal-600" />
            <span>
              {formatDateToDMY(booking.check_in)} — {formatDateToDMY(booking.check_out)}
            </span>
          </div>
          <p className="mt-1 font-mono text-[11px] text-teal-700 dark:text-teal-400">
            Ref: {booking.booking_reference}
          </p>
        </div>

        {/* Refund Notice */}
        <div className="mt-4 flex items-start gap-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 p-3 text-xs text-emerald-800 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60">
          <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
          <span>
            <strong>100% Free Cancellation Policy:</strong> Full refund will be automatically issued.
          </span>
        </div>

        {/* Cancellation Reason */}
        <div className="mt-4">
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
            Reason for cancellation
          </label>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            disabled={isCancelling}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-800 shadow-sm focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
          >
            <option value="Change of travel dates">Change of travel dates</option>
            <option value="Change of travel destination">Change of travel destination</option>
            <option value="Personal emergency">Personal emergency</option>
            <option value="Booked by mistake">Booked by mistake</option>
            <option value="Found alternative accommodation">Found alternative accommodation</option>
          </select>
        </div>

        {error && (
          <p className="mt-3 text-xs text-rose-600 font-semibold">{error}</p>
        )}

        {/* Action Buttons */}
        <div className="mt-6 flex items-center justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClose}
            disabled={isCancelling}
            className="text-xs"
          >
            Keep Reservation
          </Button>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={handleConfirmCancel}
            disabled={isCancelling}
            className="text-xs font-semibold"
          >
            {isCancelling ? (
              <>
                <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                <span>Cancelling...</span>
              </>
            ) : (
              <span>Confirm Cancellation</span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

