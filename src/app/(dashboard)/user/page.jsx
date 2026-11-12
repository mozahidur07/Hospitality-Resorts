"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Calendar,
  Heart,
  Building2,
  LogIn,
  Printer,
  XCircle,
  Settings,
  User,
  Phone,
  MapPin,
  CheckCircle2,
  Mail,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/context/auth-context";
import { formatCurrency } from "@/lib/utils";
import { BookingVoucherModal } from "@/features/bookings/components/booking-voucher-modal";
import { BookingCancelModal } from "@/features/bookings/components/booking-cancel-modal";
import { HotelCard } from "@/features/hotels/components/hotel-card";
import { CustomToast } from "@/components/ui/custom-toast";
import {
  getBookingsFromIndexedDB,
  saveAllBookingsToIndexedDB,
  saveBookingToIndexedDB,
} from "@/lib/storage/indexed-db";
import { getSavedHotels } from "@/lib/storage/wishlist";

// Formats YYYY-MM-DD string into DD/MM/YYYY
function formatDateToDMY(dateStr) {
  if (!dateStr) return "";
  const parts = dateStr.split("-");
  if (parts.length !== 3) return dateStr;
  const [y, m, d] = parts;
  return `${d}/${m}/${y}`;
}

function UserDashboardContent() {
  const { user, loading: authLoading, openAuthModal, setUser } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();

  const tabParam = searchParams.get("tab") || "bookings";
  const activeTab = ["bookings", "saved", "profile"].includes(tabParam)
    ? tabParam
    : "bookings";

  const [bookings, setBookings] = useState([]);
  const [isLoadingBookings, setIsLoadingBookings] = useState(true);

  // Saved Hotels State
  const [savedHotels, setSavedHotels] = useState([]);

  // Modal States
  const [voucherBooking, setVoucherBooking] = useState(null);
  const [isVoucherOpen, setIsVoucherOpen] = useState(false);

  const [cancelTargetBooking, setCancelTargetBooking] = useState(null);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  // Profile Form States
  const [profileFullName, setProfileFullName] = useState("");
  const [profilePhone, setProfilePhone] = useState("");
  const [profileAddress, setProfileAddress] = useState("");
  const [profileCity, setProfileCity] = useState("");
  const [profileCountry, setProfileCountry] = useState("");
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [profileMessage, setProfileMessage] = useState(null);
  const [profileError, setProfileError] = useState(null);

  // Custom Toast Notification State
  const [toastOpen, setToastOpen] = useState(false);
  const [toastInfo, setToastInfo] = useState({ title: "", message: "" });

  // Hydrate profile form when user object is available
  useEffect(() => {
    if (user) {
      setProfileFullName(user.fullName || user.full_name || "");
      setProfilePhone(user.phone || "");
      setProfileAddress(user.address || "");
      setProfileCity(user.city || "");
      setProfileCountry(user.country || "");
    }
  }, [user]);

  // Load Saved Hotels & listen to cross-component wishlist events
  useEffect(() => {
    setSavedHotels(getSavedHotels());

    const handleWishlistChange = () => {
      setSavedHotels(getSavedHotels());
    };

    window.addEventListener("auraluxe_wishlist_change", handleWishlistChange);
    return () => {
      window.removeEventListener("auraluxe_wishlist_change", handleWishlistChange);
    };
  }, []);

  // 1. Instant Cache Hydration: Read immediately from IndexedDB with 0ms delay
  useEffect(() => {
    if (!user) return;
    let isSubscribed = true;

    async function loadCachedBookings() {
      try {
        const cached = await getBookingsFromIndexedDB(user);
        if (isSubscribed && cached && cached.length > 0) {
          setBookings(cached);
          setIsLoadingBookings(false);
        }
      } catch (err) {
        console.debug("[IndexedDB Hydrate Notice]:", err);
      }
    }

    loadCachedBookings();

    return () => {
      isSubscribed = false;
    };
  }, [user]);

  // 2. Silent Background Revalidation (Stale-While-Revalidate with Server Sync)
  useEffect(() => {
    let active = true;

    async function syncBookingsWithServer() {
      if (!user) {
        setIsLoadingBookings(false);
        return;
      }

      try {
        const params = new URLSearchParams();
        if (user.id) params.set("clientId", user.id);
        if (user.email) params.set("email", user.email);

        const res = await fetch(`/api/v1/bookings?${params.toString()}`);
        const data = await res.json();
        if (active && data.success && Array.isArray(data.bookings)) {
          setBookings(data.bookings);
          // Sync fresh server records into IndexedDB
          await saveAllBookingsToIndexedDB(data.bookings);
        }
      } catch (err) {
        console.warn("[Dashboard Bookings Sync Warning]:", err);
      } finally {
        if (active) setIsLoadingBookings(false);
      }
    }

    if (!authLoading && user) {
      syncBookingsWithServer();
    }

    return () => {
      active = false;
    };
  }, [user, authLoading]);

  const handleBookingCancelled = (updatedBooking) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === updatedBooking.id || b.booking_reference === updatedBooking.booking_reference
          ? updatedBooking
          : b
      )
    );
    saveBookingToIndexedDB(updatedBooking);
  };

  const setTab = (tab) => {
    router.push(`/user?tab=${tab}`, { scroll: false });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setIsSavingProfile(true);
    setProfileMessage(null);
    setProfileError(null);

    try {
      const res = await fetch("/api/v1/auth/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: profileFullName,
          phone: profilePhone,
          address: profileAddress,
          city: profileCity,
          country: profileCountry,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to update profile.");
      }

      setProfileMessage("Your account profile has been saved successfully.");
      setToastInfo({
        title: "Profile Updated",
        message: "Your personal details, contact number, and address have been saved successfully.",
      });
      setToastOpen(true);
      if (data.user) {
        setUser(data.user);
      }
    } catch (err) {
      setProfileError(err.message || "Unable to save profile changes.");
    } finally {
      setIsSavingProfile(false);
    }
  };

  // Guest State / Not Logged In
  if (!authLoading && !user) {
    return (
      <div className="container mx-auto px-4 py-32 sm:px-6">
        <div className="mx-auto max-w-xl text-center rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-xl dark:border-slate-800 dark:bg-slate-900">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#031256]/10 text-[#031256] dark:bg-slate-800 dark:text-slate-200">
            <LogIn className="h-8 w-8" />
          </div>
          <h1 className="mt-6 text-2xl font-black text-slate-900 dark:text-slate-100 sm:text-3xl">
            Guest Portal
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Sign in to view your hotel reservations, download confirmed vouchers, access saved properties, and manage your account.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              variant="luxury"
              size="lg"
              onClick={() => openAuthModal()}
              className="w-full sm:w-auto font-semibold px-8"
            >
              Sign In to Your Account
            </Button>
            <Link href="/hotels" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full font-semibold">
                Browse Stays
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const displayName = user?.fullName || user?.full_name || user?.email?.split("@")[0] || "Guest";
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="container mx-auto px-4 py-28 sm:px-6 max-w-6xl">
      {/* Top Profile Header */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/80 pb-8 dark:border-slate-800">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#08063F] to-[#031256] text-white font-black text-xl shadow-md">
            {initials}
          </div>
          <div className="min-w-0">
            <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 truncate">
              {displayName}
            </h1>
            <p className="text-xs text-slate-400 mt-0.5 truncate">{user?.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/hotels">
            <Button variant="luxury" size="sm" className="font-semibold shadow-sm px-4">
              <span>Browse Hotels</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Clean Tab Navigation */}
      <div className="mt-8 flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setTab("bookings")}
          className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition-all whitespace-nowrap ${
            activeTab === "bookings"
              ? "border-[#031256] text-[#031256] dark:border-teal-400 dark:text-teal-400"
              : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
          }`}
        >
          <Calendar className="h-4 w-4" />
          <span>My Reservations</span>
          {bookings.length > 0 && (
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
              {bookings.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setTab("saved")}
          className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition-all whitespace-nowrap ${
            activeTab === "saved"
              ? "border-[#031256] text-[#031256] dark:border-teal-400 dark:text-teal-400"
              : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
          }`}
        >
          <Heart className="h-4 w-4 text-rose-500" />
          <span>Saved Hotels</span>
          {savedHotels.length > 0 && (
            <span className="rounded-full bg-rose-50 px-2 py-0.5 text-[11px] font-bold text-rose-600 dark:bg-rose-950/60 dark:text-rose-300">
              {savedHotels.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setTab("profile")}
          className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition-all whitespace-nowrap ${
            activeTab === "profile"
              ? "border-[#031256] text-[#031256] dark:border-teal-400 dark:text-teal-400"
              : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
          }`}
        >
          <Settings className="h-4 w-4 text-slate-500" />
          <span>Account Settings</span>
        </button>
      </div>

      {/* TAB 1: RESERVATIONS */}
      {activeTab === "bookings" && (
        <div className="mt-8 animate-in fade-in duration-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                Your Reserved Stays & Vouchers
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Confirmed reservations with instant check-in verification and printable vouchers.
              </p>
            </div>
          </div>

          {isLoadingBookings ? (
            <div className="p-12 text-center text-sm text-slate-400 rounded-2xl border border-slate-200 dark:border-slate-800">
              Loading your reservations...
            </div>
          ) : bookings.length === 0 ? (
            <div className="flex min-h-[260px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 p-8 text-center dark:border-slate-800 bg-white dark:bg-slate-900">
              <Building2 className="h-10 w-10 text-slate-300 mb-2" />
              <p className="text-base font-semibold text-slate-700 dark:text-slate-300">
                No reservations found under this account
              </p>
              <p className="mt-1 text-xs text-slate-400 max-w-md">
                When you reserve a hotel suite, your confirmed booking reference and voucher details will appear here immediately.
              </p>
              <Link href="/hotels" className="mt-5">
                <Button variant="luxury" size="sm" className="font-semibold">
                  Explore Available Hotels
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => {
                const isCancelled = booking.booking_status === "cancelled";

                return (
                  <div
                    key={booking.id || booking.booking_reference}
                    className={`flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 rounded-3xl border p-5 sm:p-6 shadow-sm transition-all hover:shadow-md ${
                      isCancelled
                        ? "border-rose-200 bg-rose-50/20 dark:border-rose-950 dark:bg-rose-950/10 opacity-80"
                        : "border-slate-200/90 bg-white dark:border-slate-800 dark:bg-slate-900"
                    }`}
                  >
                    <div className="flex items-start gap-4 min-w-0">
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
                          isCancelled
                            ? "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400"
                            : "bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-300"
                        }`}
                      >
                        <Building2 className="h-6 w-6" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                            {booking.hotel_name}
                          </h3>
                          {isCancelled ? (
                            <span className="rounded-md bg-rose-50 px-2.5 py-0.5 text-[10px] font-bold text-rose-700 dark:bg-rose-950 dark:text-rose-400 border border-rose-200/60">
                              Cancelled & Refunded
                            </span>
                          ) : (
                            <span className="rounded-md bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 border border-emerald-200/60">
                              Confirmed & Guaranteed
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-slate-400 mt-0.5">
                          {booking.hotel_city}, {booking.hotel_country} • Suite:{" "}
                          <strong className="text-slate-700 dark:text-slate-200">
                            {booking.room_name}
                          </strong>
                        </p>

                        <div className="mt-2.5 flex flex-wrap items-center gap-4 text-xs text-slate-500">
                          <span className="flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300">
                            <Calendar className="h-3.5 w-3.5 text-teal-600" />
                            {formatDateToDMY(booking.check_in)} — {formatDateToDMY(booking.check_out)} ({booking.nights}N)
                          </span>
                          <span>
                            Voucher Ref:{" "}
                            <strong className="font-mono text-teal-700 dark:text-teal-400">
                              {booking.booking_reference}
                            </strong>
                          </span>
                          <span>
                            {booking.adults} Adults ({booking.rooms_count || 1} Room)
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions & Pricing Right Side */}
                    <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between border-t lg:border-t-0 pt-3 lg:pt-0 w-full lg:w-auto shrink-0 gap-3">
                      <div className="text-left lg:text-right">
                        <span className="text-[10px] text-slate-400 uppercase font-semibold block">Total</span>
                        <p className="text-xl font-black text-teal-800 dark:text-teal-300">
                          {formatCurrency(booking.total_amount, booking.currency || "INR")}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setVoucherBooking(booking);
                            setIsVoucherOpen(true);
                          }}
                          className="text-xs font-semibold gap-1.5 h-8 border-slate-300 dark:border-slate-700"
                        >
                          <Printer className="h-3.5 w-3.5" />
                          <span>Print Voucher</span>
                        </Button>

                        {!isCancelled && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setCancelTargetBooking(booking);
                              setIsCancelModalOpen(true);
                            }}
                            className="text-xs font-semibold text-rose-600 hover:bg-rose-50 hover:text-rose-700 dark:hover:bg-rose-950/40 h-8"
                          >
                            <XCircle className="h-3.5 w-3.5 mr-1" />
                            <span>Cancel</span>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: SAVED HOTELS */}
      {activeTab === "saved" && (
        <div className="mt-8 animate-in fade-in duration-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                Saved Hotels & Wishlist
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Properties you have saved for upcoming trips and vacations.
              </p>
            </div>
          </div>

          {savedHotels.length === 0 ? (
            <div className="flex min-h-[260px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 p-8 text-center dark:border-slate-800 bg-white dark:bg-slate-900">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 text-rose-500 mb-3 dark:bg-rose-950/50">
                <Heart className="h-6 w-6" />
              </div>
              <p className="text-base font-semibold text-slate-800 dark:text-slate-200">
                No saved hotels yet
              </p>
              <p className="mt-1 text-xs text-slate-400 max-w-md">
                While exploring hotels and suites, click the heart icon on any hotel card to save it here for easy booking.
              </p>
              <Link href="/hotels" className="mt-5">
                <Button variant="luxury" size="sm" className="font-semibold">
                  Explore Luxury Hotels
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedHotels.map((hotel) => (
                <HotelCard key={hotel.id || hotel.slug} hotel={hotel} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: ACCOUNT PROFILE SETTINGS */}
      {activeTab === "profile" && (
        <div className="mt-8 animate-in fade-in duration-200 max-w-3xl">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Personal Details & Contact
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Keep your contact details up to date to pre-fill guest details on reservations and receive booking updates.
            </p>
          </div>

          <form
            onSubmit={handleProfileSubmit}
            className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            {profileMessage && (
              <div className="mb-6 flex items-center gap-2 rounded-xl bg-emerald-50 p-3.5 text-xs font-semibold text-emerald-800 border border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-900">
                <Check className="h-4 w-4 shrink-0 text-emerald-600" />
                <span>{profileMessage}</span>
              </div>
            )}

            {profileError && (
              <div className="mb-6 flex items-center gap-2 rounded-xl bg-rose-50 p-3.5 text-xs font-semibold text-rose-800 border border-rose-200 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-900">
                <XCircle className="h-4 w-4 shrink-0 text-rose-600" />
                <span>{profileError}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Full Name */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={profileFullName}
                    onChange={(e) => setProfileFullName(e.target.value)}
                    placeholder="e.g. Rakhesh Sharma"
                    className="w-full rounded-xl border border-slate-300 pl-10 pr-4 py-2.5 text-xs font-medium text-slate-900 focus:border-[#031256] focus:outline-none focus:ring-1 focus:ring-[#031256] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                  />
                </div>
              </div>

              {/* Email Address (Read-only / Verified) */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Email Address
                  </label>
                  <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full dark:bg-emerald-950/50">
                    Verified
                  </span>
                </div>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                  <input
                    type="email"
                    disabled
                    value={user?.email || ""}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-2.5 text-xs font-medium text-slate-500 cursor-not-allowed dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-400"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                  <input
                    type="tel"
                    value={profilePhone}
                    onChange={(e) => setProfilePhone(e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full rounded-xl border border-slate-300 pl-10 pr-4 py-2.5 text-xs font-medium text-slate-900 focus:border-[#031256] focus:outline-none focus:ring-1 focus:ring-[#031256] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                  />
                </div>
              </div>

              {/* Address */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Street Address
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    value={profileAddress}
                    onChange={(e) => setProfileAddress(e.target.value)}
                    placeholder="e.g. 12/A Park Street"
                    className="w-full rounded-xl border border-slate-300 pl-10 pr-4 py-2.5 text-xs font-medium text-slate-900 focus:border-[#031256] focus:outline-none focus:ring-1 focus:ring-[#031256] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                  />
                </div>
              </div>

              {/* City */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  City
                </label>
                <input
                  type="text"
                  value={profileCity}
                  onChange={(e) => setProfileCity(e.target.value)}
                  placeholder="e.g. Kolkata"
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs font-medium text-slate-900 focus:border-[#031256] focus:outline-none focus:ring-1 focus:ring-[#031256] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                />
              </div>

              {/* Country */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Country
                </label>
                <input
                  type="text"
                  value={profileCountry}
                  onChange={(e) => setProfileCountry(e.target.value)}
                  placeholder="e.g. India"
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs font-medium text-slate-900 focus:border-[#031256] focus:outline-none focus:ring-1 focus:ring-[#031256] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                />
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <Button
                type="submit"
                variant="luxury"
                size="default"
                disabled={isSavingProfile}
                className="font-semibold px-6 shadow-sm"
              >
                {isSavingProfile ? "Saving Changes..." : "Save Profile Details"}
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Printable Voucher Modal */}
      <BookingVoucherModal
        booking={voucherBooking}
        isOpen={isVoucherOpen}
        onClose={() => {
          setIsVoucherOpen(false);
          setVoucherBooking(null);
        }}
      />

      {/* Booking Cancellation Confirmation Modal */}
      <BookingCancelModal
        booking={cancelTargetBooking}
        isOpen={isCancelModalOpen}
        onClose={() => {
          setIsCancelModalOpen(false);
          setCancelTargetBooking(null);
        }}
        onCancelled={handleBookingCancelled}
      />

      {/* Slide-in Top-Right Toast Notification */}
      <CustomToast
        isOpen={toastOpen}
        onClose={() => setToastOpen(false)}
        title={toastInfo.title}
        message={toastInfo.message}
        type="success"
      />
    </div>
  );
}

export default function UserDashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-32 text-center text-sm text-slate-400">
          Loading portal...
        </div>
      }
    >
      <UserDashboardContent />
    </Suspense>
  );
}
