"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ShieldCheck,
  CreditCard,
  Lock,
  CheckCircle2,
  Calendar,
  Users,
  Building,
  ArrowLeft,
  AlertTriangle,
  Loader2,
  Bed,
  Printer,
} from "lucide-react";
import { getHotelBySlug } from "@/features/hotels/services/mock-hotels.data";
import { BookingVoucherModal } from "@/features/bookings/components/booking-voucher-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatCurrency, calculateNights } from "@/lib/utils";
import { useAuth } from "@/features/auth/context/auth-context";
import { saveBookingToIndexedDB } from "@/lib/storage/indexed-db";

// Formats YYYY-MM-DD string into DD/MM/YYYY
function formatDateToDMY(dateStr) {
  if (!dateStr) return "";
  const parts = dateStr.split("-");
  if (parts.length !== 3) return dateStr;
  const [y, m, d] = parts;
  return `${d}/${m}/${y}`;
}

function CheckoutContent() {
  const searchParams = useSearchParams();
  const { user, openAuthModal } = useAuth();

  const hotelSlug = searchParams.get("hotel") || "azure-mirage-santorini";
  const roomId = searchParams.get("room") || "room-1-1";
  const checkIn = searchParams.get("checkIn") || "2026-11-15";
  const checkOut = searchParams.get("checkOut") || "2026-11-18";
  const adults = Number(searchParams.get("adults") || "2");
  const children = Number(searchParams.get("children") || "0");
  const roomsCount = Number(searchParams.get("rooms") || "1");

  const hotel = useMemo(() => {
    return getHotelBySlug(hotelSlug) || getHotelBySlug("azure-mirage-santorini");
  }, [hotelSlug]);

  const room = useMemo(() => {
    return (
      hotel?.rooms?.find((r) => r.id === roomId) ||
      (hotel?.rooms && hotel.rooms[0]) || {
        id: roomId,
        name: "Deluxe Luxury Suite",
        price: hotel?.startingPrice || 3500,
        pricePerNight: hotel?.startingPrice || 3500,
        availableRooms: 3,
      }
    );
  }, [hotel, roomId]);

  const currency = hotel?.currency || "INR";
  const nights = calculateNights(checkIn, checkOut);
  const pricePerNight = Number(room.price || room.pricePerNight || hotel?.startingPrice || 3500);
  const subtotal = pricePerNight * nights * roomsCount;
  const taxesAndFees = Math.round(subtotal * 0.12);
  const conciergeFee = currency === "INR" ? 450 : 45;
  const total = subtotal + taxesAndFees + conciergeFee;

  // Helper to safely extract first and last name from user profile
  const parseUserNames = (userData) => {
    const raw = userData?.fullName || userData?.full_name || "";
    if (!raw) return { first: "", last: "" };
    const parts = raw.trim().split(/\s+/);
    return {
      first: parts[0] || "",
      last: parts.slice(1).join(" ") || "",
    };
  };

  // Form State: Pre-fill from database when available, and keep fully editable
  const [firstName, setFirstName] = useState(() => parseUserNames(user).first);
  const [lastName, setLastName] = useState(() => parseUserNames(user).last);
  const [email, setEmail] = useState(() => user?.email || "");
  const [phone, setPhone] = useState(() => user?.phone || "");
  const [specialRequests, setSpecialRequests] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("razorpay");

  // Sync if user logs in on checkout page or arrives newly authenticated
  useEffect(() => {
    if (user) {
      const names = parseUserNames(user);
      setFirstName((prev) => (prev ? prev : names.first));
      setLastName((prev) => (prev ? prev : names.last));
      setEmail((prev) => (prev ? prev : user.email || ""));
      setPhone((prev) => (prev ? prev : user.phone || ""));
    }
  }, [user]);

  // Live Availability Check State
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(true);
  const [availabilityData, setAvailabilityData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [showVoucherModal, setShowVoucherModal] = useState(false);

  // Check availability on mount and when dates change
  useEffect(() => {
    let active = true;
    async function verifyAvailability() {
      setIsCheckingAvailability(true);
      setErrorMessage("");
      try {
        const query = new URLSearchParams({
          hotelId: hotel?.id || hotelSlug,
          roomId: room.id,
          checkIn,
          checkOut,
          rooms: roomsCount.toString(),
        });

        const res = await fetch(`/api/v1/bookings/check-availability?${query.toString()}`);
        const data = await res.json();
        if (active) {
          setAvailabilityData(data);
          if (!data.available) {
            setErrorMessage(
              `Notice: This suite is already booked for ${formatDateToDMY(checkIn)} - ${formatDateToDMY(checkOut)}. Remaining suites available: ${data.remainingRooms || 0}.`
            );
          }
        }
      } catch (err) {
        console.warn("[Availability Verification Error]:", err);
      } finally {
        if (active) setIsCheckingAvailability(false);
      }
    }

    if (hotel && room) {
      verifyAvailability();
    }

    return () => {
      active = false;
    };
  }, [hotel, room, checkIn, checkOut, roomsCount, hotelSlug]);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (typeof window === "undefined") return resolve(false);
      if (window.Razorpay) return resolve(true);

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleCompleteReservation = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    // If user is not logged in, trigger auth modal and keep reservation params
    if (!user) {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("auraluxe_return_url", window.location.pathname + window.location.search);
      }
      openAuthModal();
      return;
    }

    setIsSubmitting(true);

    const payload = {
      clientId: user?.id || null,
      guestName: `${firstName} ${lastName}`.trim() || "Valued Guest",
      guestEmail: email.trim(),
      guestPhone: phone.trim(),
      hotelId: hotel?.id || hotelSlug,
      roomId: room.id,
      checkIn,
      checkOut,
      adults,
      children,
      roomsCount,
      specialRequests,
      paymentMethod,
    };

    // FLOW A: RAZORPAY ONLINE GATEWAY (UPI, Cards, NetBanking)
    if (paymentMethod === "razorpay") {
      try {
        const isLoaded = await loadRazorpayScript();
        if (!isLoaded) {
          setErrorMessage("Razorpay payment gateway failed to load. Please verify your internet connection.");
          setIsSubmitting(false);
          return;
        }

        // 1. Create order on server
        const orderRes = await fetch("/api/v1/payments/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            hotelId: hotel?.id || hotelSlug,
            roomId: room.id,
            checkIn,
            checkOut,
            roomsCount,
            guestEmail: email.trim(),
          }),
        });

        const orderData = await orderRes.json();
        if (!orderRes.ok || !orderData.success) {
          setErrorMessage(orderData.message || "Failed to initialize payment gateway.");
          setIsSubmitting(false);
          return;
        }

        // 2. Open Razorpay Checkout modal
        const options = {
          key: orderData.key,
          amount: orderData.amount,
          currency: orderData.currency || "INR",
          name: "AuraLuxe Hospitality",
          description: `Suite Reservation: ${room.name} (${hotel?.name})`,
          image: "/icon.webp",
          order_id: orderData.orderId,
          prefill: {
            name: `${firstName} ${lastName}`.trim() || "Guest",
            email: email.trim(),
            contact: phone.trim(),
          },
          theme: {
            color: "#031256",
          },
          modal: {
            ondismiss: function () {
              setIsSubmitting(false);
            },
          },
          handler: async function (response) {
            try {
              setIsSubmitting(true);
              const verifyRes = await fetch("/api/v1/payments/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  bookingPayload: payload,
                }),
              });

              const verifyData = await verifyRes.json();
              if (!verifyRes.ok || !verifyData.success) {
                setErrorMessage(verifyData.message || "Payment verification failed.");
                setIsSubmitting(false);
                return;
              }

              setConfirmedBooking(verifyData.booking);
              saveBookingToIndexedDB(verifyData.booking);
            } catch (err) {
              setErrorMessage(err.message || "Failed to process payment confirmation.");
            } finally {
              setIsSubmitting(false);
            }
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.on("payment.failed", function (resp) {
          setErrorMessage(resp.error?.description || "Payment was declined or cancelled.");
          setIsSubmitting(false);
        });
        rzp.open();
        return;
      } catch (gatewayErr) {
        setErrorMessage(gatewayErr.message || "Payment gateway error.");
        setIsSubmitting(false);
        return;
      }
    }

    // FLOW B: PAY AT HOTEL CHECK-IN
    try {
      const res = await fetch("/api/v1/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMessage(
          data.message ||
            "Unable to secure reservation. The room might have been booked for these dates."
        );
        setIsSubmitting(false);
        return;
      }

      setConfirmedBooking(data.booking);
      saveBookingToIndexedDB(data.booking);
    } catch (err) {
      setErrorMessage(err.message || "Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // SUCCESS CONFIRMATION SCREEN
  if (confirmedBooking) {
    return (
      <div className="mx-auto max-w-2xl text-center py-12 animate-in fade-in duration-300">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <h1 className="mt-6 text-3xl font-extrabold text-slate-900 sm:text-4xl dark:text-slate-100">
          Reservation Confirmed!
        </h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Your luxury reservation has been confirmed. A confirmation copy and official stay voucher have been issued for instant front-desk check-in.
        </p>

        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xl dark:border-slate-800 dark:bg-slate-900 text-left">
          <div className="flex flex-wrap items-center justify-between border-b border-slate-100 pb-5 dark:border-slate-800 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Official Booking Reference
              </span>
              <p className="text-2xl font-mono font-black text-teal-800 dark:text-teal-400">
                {confirmedBooking.booking_reference}
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Total Guaranteed
              </span>
              <p className="text-2xl font-black text-slate-900 dark:text-slate-100">
                {formatCurrency(confirmedBooking.total_amount, confirmedBooking.currency)}
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600 dark:text-slate-300">
            <div>
              <p className="text-slate-400 uppercase font-semibold text-[10px]">Hotel & Property</p>
              <p className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                {confirmedBooking.hotel_name}
              </p>
              <p className="text-slate-500">{confirmedBooking.hotel_city}, {confirmedBooking.hotel_country}</p>
            </div>

            <div>
              <p className="text-slate-400 uppercase font-semibold text-[10px]">Reserved Suite</p>
              <p className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                {confirmedBooking.room_name}
              </p>
              <p className="text-slate-500">
                {confirmedBooking.rooms_count} {confirmedBooking.rooms_count === 1 ? "Room" : "Rooms"} • {confirmedBooking.adults} Guests
              </p>
            </div>

            <div className="mt-2">
              <p className="text-slate-400 uppercase font-semibold text-[10px]">Stay Duration</p>
              <p className="font-semibold text-slate-900 dark:text-slate-100 mt-0.5">
                {formatDateToDMY(confirmedBooking.check_in)} — {formatDateToDMY(confirmedBooking.check_out)}
              </p>
              <p className="text-slate-500">({confirmedBooking.nights} Nights)</p>
            </div>

            <div className="mt-2">
              <p className="text-slate-400 uppercase font-semibold text-[10px]">Primary Guest</p>
              <p className="font-semibold text-slate-900 dark:text-slate-100 mt-0.5">
                {confirmedBooking.guest_name}
              </p>
              <p className="text-slate-500">{confirmedBooking.guest_email}</p>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-2 rounded-xl bg-teal-50 dark:bg-teal-950/40 p-3 text-xs text-teal-800 dark:text-teal-300">
            <ShieldCheck className="h-4 w-4 shrink-0 text-teal-600" />
            <span>Guaranteed Instant Check-in & Double-Booking Protection active for this room.</span>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button
            onClick={() => setShowVoucherModal(true)}
            variant="luxury"
            size="lg"
            className="rounded-full px-8 font-semibold gap-2 shadow-lg"
          >
            <Printer className="h-4 w-4" />
            <span>Print / Download PDF Voucher</span>
          </Button>

          <Link href="/user">
            <Button variant="outline" size="lg" className="rounded-full px-8 font-semibold">
              View in Member Dashboard
            </Button>
          </Link>
        </div>

        {/* Voucher Modal */}
        <BookingVoucherModal
          booking={confirmedBooking}
          isOpen={showVoucherModal}
          onClose={() => setShowVoucherModal(false)}
        />
      </div>
    );
  }

  const isRoomConflict = availabilityData && !availabilityData.available;

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
      {/* Left Column: Guest & Payment Form */}
      <div className="space-y-8 lg:col-span-7">
        {/* Availability Conflict Alert */}
        {isRoomConflict && (
          <div className="rounded-2xl border border-rose-300 bg-rose-50 p-4 text-xs text-rose-900 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-200 flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-sm">Room Unavailable for Selected Dates</p>
              <p className="mt-1">
                This room is fully booked for <strong>{formatDateToDMY(checkIn)} to {formatDateToDMY(checkOut)}</strong>. 
                Please choose different travel dates or explore other suites in {hotel?.name}.
              </p>
              <Link href={`/hotels/${hotel?.id || hotelSlug}`} className="inline-block mt-2 font-bold text-rose-700 underline">
                &larr; Choose another suite
              </Link>
            </div>
          </div>
        )}

        {errorMessage && !isRoomConflict && (
          <div className="rounded-2xl border border-amber-300 bg-amber-50 p-4 text-xs text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-200 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Unauthenticated Quick-Login Banner */}
        {!user && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-2xl border border-blue-200 bg-blue-50/80 p-4 text-xs dark:border-blue-900/60 dark:bg-blue-950/40">
            <div className="flex items-center gap-2.5 text-[#031256] dark:text-blue-300">
              <ShieldCheck className="h-4 w-4 shrink-0 text-teal-600" />
              <span>
                Already have an account? <strong>Sign in</strong> to auto-fill your profile details and save this stay to your dashboard.
              </span>
            </div>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => {
                if (typeof window !== "undefined") {
                  sessionStorage.setItem("auraluxe_return_url", window.location.pathname + window.location.search);
                }
                openAuthModal();
              }}
              className="shrink-0 h-8 text-xs font-semibold border-[#031256]/30 text-[#031256] hover:bg-white"
            >
              Sign In / Register
            </Button>
          </div>
        )}

        <form onSubmit={handleCompleteReservation} className="space-y-8">
          {/* Section 1: Guest Information */}
          <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              1. Primary Guest Details
            </h2>
            <p className="mt-1 text-xs text-slate-400">
              Your reservation voucher and VIP room access will be registered under this name.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  First Name *
                </label>
                <Input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="e.g. Rahul"
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Last Name *
                </label>
                <Input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="e.g. Sharma"
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Email Address (for vouchers) *
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. rahul.sharma@example.com"
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Mobile Number (with country code) *
                </label>
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +91 98300 12345"
                  required
                  className="mt-1"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Special Requests or Dietary Preferences (Optional)
              </label>
              <textarea
                rows={3}
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                placeholder="E.g., High-floor suite, quiet wing, anniversary setup, late airport arrival..."
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white p-3 text-xs focus:border-teal-600 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
              />
            </div>
          </div>

          {/* Section 2: Payment Method */}
          <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                2. Secure Guarantee & Payment
              </h2>
            </div>

            {/* Payment Method Selector */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod("razorpay")}
                className={`flex items-center gap-3 rounded-2xl border p-3.5 text-left transition-all ${
                  paymentMethod === "razorpay"
                    ? "border-teal-600 bg-teal-50/50 text-teal-950 ring-2 ring-teal-600 dark:border-teal-400 dark:bg-teal-950/40 dark:text-teal-200"
                    : "border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
                }`}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#031256] text-white">
                  <CreditCard className="h-5 w-5 text-amber-300" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold">Online Payment</span>
                    <span className="rounded-md bg-emerald-50 px-1.5 py-0.5 text-[9px] font-bold text-emerald-700 border border-emerald-200">
                      Instant Guarantee
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">UPI, Cards, NetBanking, Wallets</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("hotel_pay")}
                className={`flex items-center gap-3 rounded-2xl border p-3.5 text-left transition-all ${
                  paymentMethod === "hotel_pay"
                    ? "border-teal-600 bg-teal-50/50 text-teal-950 ring-2 ring-teal-600 dark:border-teal-400 dark:bg-teal-950/40 dark:text-teal-200"
                    : "border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
                }`}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                  <Building className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-xs font-bold block">Pay at Hotel Check-in</span>
                  <p className="text-[11px] text-slate-500 mt-0.5">Settle at front desk upon arrival</p>
                </div>
              </button>
            </div>

            {paymentMethod === "razorpay" && (
              <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-xs text-slate-700 dark:bg-slate-900/60 dark:text-slate-300 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2 font-bold text-sm text-[#031256] dark:text-blue-300">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  <span>Instant Payment</span>
                </div>
                <p className="mt-1 leading-relaxed text-slate-500 dark:text-slate-400">
                  Complete your transaction securely via Razorpay. We accept all major Credit/Debit cards, UPI, and NetBanking. Your verified booking voucher will be generated immediately upon confirmation.
                </p>
              </div>
            )}

            {paymentMethod === "hotel_pay" && (
              <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-xs text-slate-600 dark:bg-slate-950 dark:text-slate-400 border border-slate-200 dark:border-slate-800">
                <p className="font-semibold text-slate-800 dark:text-slate-200">
                  Pay Upon Arrival Guarantee
                </p>
                <p className="mt-1 leading-relaxed">
                  Your reservation is instantly reserved in our system. No immediate advance deduction is required. You can settle directly at the hotel front desk via cash, card, or UPI.
                </p>
              </div>
            )}
          </div>

          <Button
            type="submit"
            variant="luxury"
            size="lg"
            disabled={isSubmitting || isRoomConflict || isCheckingAvailability}
            className="w-full gap-2 font-semibold shadow-lg text-sm h-12"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Confirming Your Reservation...</span>
              </>
            ) : isCheckingAvailability ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Verifying Room Availability...</span>
              </>
            ) : isRoomConflict ? (
              <span>Unavailable on Selected Dates</span>
            ) : (
              <span>
                {paymentMethod === "razorpay" ? "Pay & Guarantee Reservation with Razorpay" : "Confirm & Guarantee Reservation"}{" "}
                ({formatCurrency(total, currency)})
              </span>
            )}
          </Button>
        </form>
      </div>

      {/* Right Column: Order Summary */}
      <div className="lg:col-span-5">
        <div className="sticky top-28 rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Reservation Summary
          </h3>

          {/* Hotel thumbnail card */}
          <div className="mt-4 flex gap-3 border-b border-slate-100 pb-4 dark:border-slate-800">
            <div className="relative h-16 w-16 overflow-hidden rounded-xl bg-slate-100 shrink-0">
              <Image
                src={
                  hotel?.featuredImage ||
                  (hotel?.images && hotel.images[0]) ||
                  "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600"
                }
                alt={hotel?.name || "Hotel"}
                fill
                className="object-cover"
              />
            </div>
            <div className="min-w-0">
              <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 truncate">
                {hotel?.name}
              </h4>
              <p className="text-xs text-slate-400">
                {hotel?.cityName || hotel?.location?.city}, {hotel?.countryName || hotel?.location?.country}
              </p>
              <p className="text-xs font-semibold text-teal-700 dark:text-teal-400 mt-1 flex items-center gap-1">
                <Bed className="h-3 w-3" />
                <span>{room.name}</span>
              </p>
            </div>
          </div>

          {/* Stay Info */}
          <div className="mt-4 space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-teal-600" />
                Dates
              </span>
              <span className="font-semibold text-slate-900 dark:text-slate-100">
                {formatDateToDMY(checkIn)} — {formatDateToDMY(checkOut)} ({nights} {nights === 1 ? "night" : "nights"})
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5 text-teal-600" />
                Guests & Rooms
              </span>
              <span className="font-semibold text-slate-900 dark:text-slate-100">
                {adults} Adults {children > 0 ? `, ${children} Children` : ""} • {roomsCount} {roomsCount === 1 ? "Room" : "Rooms"}
              </span>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="mt-6 space-y-2 border-t border-slate-100 pt-4 text-xs text-slate-600 dark:border-slate-800 dark:text-slate-300">
            <div className="flex justify-between">
              <span>
                {formatCurrency(pricePerNight, currency)} × {nights} nights {roomsCount > 1 ? `(${roomsCount} rooms)` : ""}
              </span>
              <span className="font-semibold text-slate-900 dark:text-slate-100">
                {formatCurrency(subtotal, currency)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Local Hotel Tax & Tourism Levy (12%)</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100">
                {formatCurrency(taxesAndFees, currency)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>24/7 Verified Concierge</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100">
                {formatCurrency(conciergeFee, currency)}
              </span>
            </div>

            <div className="border-t border-slate-100 pt-3 dark:border-slate-800">
              <div className="flex items-baseline justify-between text-base">
                <span className="font-bold text-slate-900 dark:text-slate-100">Grand Total</span>
                <span className="text-2xl font-black text-teal-800 dark:text-teal-300">
                  {formatCurrency(total, currency)}
                </span>
              </div>
              <p className="mt-1 text-[11px] text-slate-400">All local taxes & luxury services included</p>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-2 text-[11px] text-slate-400">
            <ShieldCheck className="h-4 w-4 text-teal-600 flex-shrink-0" />
            <span>Full refund guarantee if cancelled 48 hours prior to check-in.</span>
          </div>
        </div>
      </div>

      {/* Screen-Level Processing Overlay during Payment & Booking Finalization */}
      {isSubmitting && (
        <div className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-slate-950/85 backdrop-blur-md text-white animate-in fade-in p-6 text-center select-none">
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
              {paymentMethod === "razorpay"
                ? "Verifying Payment & Confirming Suite..."
                : "Securing Suite & Finalizing Booking..."}
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-300 max-w-sm">
            Please do not close, refresh, or leave this window. We are securely registering your reservation with the hotel front desk.
          </p>
        </div>
      )}
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <div className="container mx-auto px-4 py-28 sm:px-6">
      <div className="mb-8">
        <Link
          href="/hotels"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-teal-700 dark:text-slate-400 dark:hover:text-teal-400"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Hotel Stays</span>
        </Link>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
          Complete Your Hotel Reservation
        </h1>
      </div>

      <Suspense fallback={<div className="p-12 text-center text-sm text-slate-400">Loading reservation details...</div>}>
        <CheckoutContent />
      </Suspense>
    </div>
  );
}
