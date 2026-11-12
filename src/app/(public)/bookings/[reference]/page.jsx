"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import {
  Printer,
  ArrowLeft,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { VoucherCard } from "@/features/bookings/components/voucher-card";

export default function BookingDetailPage({ params }) {
  const { reference } = params;
  const [booking, setBooking] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let active = true;

    async function fetchBooking() {
      setIsLoading(true);
      setError("");
      try {
        const res = await fetch(`/api/v1/bookings/${reference}`);
        const data = await res.json();
        if (active) {
          if (data.success && data.booking) {
            setBooking(data.booking);
          } else {
            setError(data.message || "Reservation voucher not found.");
          }
        }
      } catch (err) {
        if (active) setError(err.message || "Failed to load voucher.");
      } finally {
        if (active) setIsLoading(false);
      }
    }

    if (reference) {
      fetchBooking();
    }

    return () => {
      active = false;
    };
  }, [reference]);

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      const originalTitle = document.title;
      document.title = "";
      window.print();
      setTimeout(() => {
        document.title = originalTitle;
      }, 1000);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-36 sm:px-6 text-center">
        <div className="mx-auto h-8 w-48 rounded-full bg-slate-200 animate-pulse dark:bg-slate-800" />
        <div className="mx-auto mt-4 h-64 max-w-2xl rounded-3xl bg-slate-200 animate-pulse dark:bg-slate-800" />
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="container mx-auto px-4 py-36 sm:px-6">
        <div className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl dark:border-slate-800 dark:bg-slate-900">
          <AlertTriangle className="mx-auto h-12 w-12 text-amber-500" />
          <h2 className="mt-4 text-xl font-bold text-slate-900 dark:text-slate-100">
            Voucher Not Found
          </h2>
          <p className="mt-2 text-xs text-slate-500">
            We could not locate any booking matching reference &ldquo;{reference}&rdquo;. Please verify your booking reference code.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Link href="/user">
              <Button variant="luxury" size="sm">Go to Member Portal</Button>
            </Link>
            <Link href="/hotels">
              <Button variant="outline" size="sm">Browse Hotels</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-28 sm:px-6 max-w-4xl">
      {/* Top Navigation & Print Trigger */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 print:hidden">
        <Link
          href="/user"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-teal-700 dark:text-slate-400 dark:hover:text-teal-400"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Member Dashboard</span>
        </Link>

        <div className="flex items-center gap-2">
          <Button
            onClick={handlePrint}
            variant="luxury"
            size="sm"
            className="gap-1.5 text-xs font-semibold shadow-md"
          >
            <Printer className="h-3.5 w-3.5" />
            <span>Print / Save as PDF</span>
          </Button>
        </div>
      </div>

      {/* Screen Voucher View */}
      <div className="print:hidden">
        <VoucherCard booking={booking} isPrintVersion={false} />
      </div>

      {/* Dedicated Single-Page Print Portal */}
      {mounted && typeof document !== "undefined" && createPortal(
        <aside
          id="print-voucher-portal"
          aria-label="Printable Hotel Reservation Voucher"
          className="hidden print:block"
        >
          <VoucherCard booking={booking} isPrintVersion={true} />
        </aside>,
        document.body
      )}

      {/* Scoped Global Print Styles: Removes browser headers/footers (URLs) and ensures single page */}
      <style jsx global>{`
        @page {
          size: auto;
          margin: 0mm !important;
        }

        @media print {
          *, *::before, *::after {
            box-sizing: border-box !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          html, body {
            margin: 0 !important;
            padding: 0 !important;
            background: #ffffff !important;
            color: #0f172a !important;
            width: 100% !important;
            height: auto !important;
            min-height: 0 !important;
          }

          /* Hide everything else on the page */
          body > *:not(#print-voucher-portal) {
            display: none !important;
          }

          /* Show ONLY the single-page voucher with internal margins */
          #print-voucher-portal {
            display: block !important;
            position: static !important;
            width: 100% !important;
            max-width: 800px !important;
            margin: 0 auto !important;
            padding: 10mm 12mm !important;
            box-sizing: border-box !important;
            background: #ffffff !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            page-break-after: avoid !important;
            break-after: avoid !important;
          }

          #print-voucher-portal .voucher-card-box {
            border: 1.5px solid #cbd5e1 !important;
            border-radius: 12px !important;
            padding: 20px 24px !important;
            box-shadow: none !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
        }
      `}</style>
    </div>
  );
}
