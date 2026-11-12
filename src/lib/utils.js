import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines Tailwind classes safely with clsx and twMerge.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const CURRENCY_LOCALES = {
  INR: "en-IN",
  USD: "en-US",
  EUR: "en-IE",
  GBP: "en-GB",
  JPY: "en-US", // Clean ¥ symbol with standard 3-digit groupings
  AED: "en-AE",
  CAD: "en-CA",
  AUD: "en-AU",
  SGD: "en-SG",
  CHF: "de-CH",
};

/**
 * Formats numeric values to standard currency format (defaults to INR ₹).
 */
export function formatCurrency(amount, currency = "INR", locale) {
  const targetCurrency = (currency || "INR").toUpperCase();
  const targetLocale =
    locale ||
    CURRENCY_LOCALES[targetCurrency] ||
    (targetCurrency === "INR" ? "en-IN" : "en-US");

  return new Intl.NumberFormat(targetLocale, {
    style: "currency",
    currency: targetCurrency,
    maximumFractionDigits: 0,
  }).format(Number(amount) || 0);
}

/**
 * Calculates number of nights between check-in and check-out dates.
 */
export function calculateNights(checkIn, checkOut) {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(1, diffDays);
}

/**
 * Formats rating score to 1 decimal place (e.g. 4.8)
 */
export function formatRating(rating) {
  return Number(rating).toFixed(1);
}

