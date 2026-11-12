"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  X,
  Printer,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { VoucherCard } from "./voucher-card";

export function BookingVoucherModal({ booking, isOpen, onClose }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !booking) return null;

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

  return (
    <>
      {/* On-screen Interactive Modal (Hidden from physical print output) */}
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200 print:hidden">
        {/* Modal Window Container */}
        <div className="relative w-full max-w-3xl max-h-[92vh] flex flex-col rounded-3xl bg-white shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden">
          {/* Top Action Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80">
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
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  Official Hotel Reservation Voucher
                </h3>
                <p className="text-[11px] text-slate-400">
                  Ref: <span className="font-mono font-bold text-teal-700 dark:text-teal-400">{booking.booking_reference}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                size="sm"
                onClick={handlePrint}
                variant="luxury"
                className="gap-1.5 text-xs font-semibold h-9 shadow-md"
              >
                <Printer className="h-3.5 w-3.5" />
                <span>Print / Save PDF</span>
              </Button>
              <button
                onClick={onClose}
                className="p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/60 transition-colors"
                aria-label="Close voucher"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Scrollable Screen Voucher View */}
          <div className="overflow-y-auto p-6 sm:p-10 flex-1">
            <VoucherCard booking={booking} isPrintVersion={false} />
          </div>
        </div>
      </div>

      {/* Dedicated Single-Page Print Portal (Mounted directly to document.body) */}
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

          /* Hide all page siblings completely to prevent multi-page ghost height */
          body > *:not(#print-voucher-portal) {
            display: none !important;
          }

          /* Show ONLY the single-page voucher container with internal margins */
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
    </>
  );
}
