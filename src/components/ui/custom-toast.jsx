"use client";

import React, { useState, useEffect, useCallback } from "react";
import { CheckCircle2, X } from "lucide-react";

/**
 * Sleek, high-performance Custom Toast with slide-in from right,
 * auto slide-out, and manual close button.
 */
export function CustomToast({
  isOpen,
  onClose,
  title = "Saved Successfully",
  message = "Your account profile information has been updated.",
  type = "success",
  duration = 3500,
}) {
  const [visible, setVisible] = useState(isOpen);
  const [isExiting, setIsExiting] = useState(false);

  const handleDismiss = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      setVisible(false);
      setIsExiting(false);
      if (onClose) onClose();
    }, 280);
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      setIsExiting(false);

      const timer = setTimeout(() => {
        handleDismiss();
      }, duration);

      return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
  }, [isOpen, duration, handleDismiss]);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed top-6 right-6 z-[250] flex items-start gap-3 w-80 sm:w-96 rounded-2xl bg-white p-4 shadow-2xl border border-slate-200/90 dark:bg-slate-900 dark:border-slate-800 transition-all duration-300 ${
        isExiting
          ? "translate-x-full opacity-0 scale-95"
          : "translate-x-0 opacity-100 scale-100"
      }`}
      style={{
        animation: !isExiting ? "slideInFromRight 0.3s cubic-bezier(0.16, 1, 0.3, 1)" : undefined,
      }}
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
        <CheckCircle2 className="h-5 w-5" />
      </div>

      <div className="flex-1 min-w-0 pt-0.5">
        <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">
          {title}
        </h4>
        <p className="mt-0.5 text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
          {message}
        </p>
      </div>

      <button
        onClick={handleDismiss}
        aria-label="Close notification"
        className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
      >
        <X className="h-4 w-4" />
      </button>

      <style jsx>{`
        @keyframes slideInFromRight {
          from {
            transform: translateX(110%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
