"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Building2,
  LayoutDashboard,
  CalendarCheck,
  BedDouble,
  Settings,
  LogOut,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  CreditCard,
  TrendingUp,
  Users,
  RefreshCw,
  Save,
  KeyRound,
  AlertCircle,
  ExternalLink,
  MessageSquare,
  Loader2,
  Download,
  AlertTriangle,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function HotelDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [updatingRef, setUpdatingRef] = useState(null);
  const [confirmModal, setConfirmModal] = useState(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [data, setData] = useState(null);
  const [toast, setToast] = useState(null);

  // Filters for bookings tab
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");

  // Room editing state
  const [roomEdits, setRoomEdits] = useState({});
  const [savingRoomId, setSavingRoomId] = useState(null);

  // Password change state
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchDashboard = useCallback(async () => {
    try {
      const res = await fetch("/api/v1/management/hotel/dashboard", {
        credentials: "include",
      });
      if (res.status === 401) {
        router.push("/management/hotel/login");
        return;
      }
      const json = await res.json();
      if (json.success) {
        setData(json);
        const edits = {};
        (json.rooms || []).forEach((r) => {
          edits[r.id] = {
            price: r.price,
            availableRooms: r.availableRooms,
            maxGuests: r.maxGuests,
          };
        });
        setRoomEdits(edits);
      }
    } catch {
      showToast("Failed to load property data.", "error");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchDashboard();
    setTimeout(() => setIsRefreshing(false), 650);
    showToast("Property reservations refreshed.");
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch("/api/v1/management/hotel/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (_) {}
    router.push("/management/hotel/login");
  };

  const handleBookingAction = async (bookingReference, updates) => {
    try {
      const res = await fetch("/api/v1/management/hotel/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ bookingReference, ...updates }),
      });
      const json = await res.json();
      if (json.success) {
        showToast(json.message || "Reservation updated.");
        fetchDashboard();
      } else {
        showToast(json.message || "Update failed.", "error");
      }
    } catch {
      showToast("Network error while updating booking.", "error");
    }
  };

  const requestBookingAction = (booking, actionType) => {
    let title = "";
    let description = "";
    let confirmText = "";
    let confirmVariant = "primary";
    let updates = {};

    if (actionType === "mark_paid") {
      title = "Confirm Payment Received";
      description = `Are you sure you want to mark reservation ${booking.booking_reference} for guest ${booking.guest_name} as Paid & Verified?`;
      confirmText = "Mark as Paid";
      confirmVariant = "primary";
      updates = { paymentStatus: "confirmed" };
    } else if (actionType === "complete_stay") {
      title = "Complete Guest Stay";
      description = `Check out guest ${booking.guest_name} and mark stay as Completed for reservation ${booking.booking_reference}?`;
      confirmText = "Complete Stay";
      confirmVariant = "primary";
      updates = { bookingStatus: "completed" };
    } else if (actionType === "cancel") {
      title = "Cancel Reservation";
      description = `Are you sure you want to cancel reservation ${booking.booking_reference} for guest ${booking.guest_name}? This will release the suite back to availability.`;
      confirmText = "Yes, Cancel Booking";
      confirmVariant = "danger";
      updates = { bookingStatus: "cancelled", cancellationReason: "Cancelled by Hotel Front Desk" };
    }

    setConfirmModal({
      title,
      description,
      confirmText,
      confirmVariant,
      onConfirm: async () => {
        setConfirmModal(null);
        setUpdatingRef(booking.booking_reference);
        await handleBookingAction(booking.booking_reference, updates);
        setUpdatingRef(null);
      },
    });
  };

  const handleSaveRoom = async (roomId) => {
    const edit = roomEdits[roomId];
    if (!edit) return;
    setSavingRoomId(roomId);
    try {
      const res = await fetch("/api/v1/management/hotel/rooms", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomId,
          price: Number(edit.price),
          availableRooms: Number(edit.availableRooms),
          maxGuests: Number(edit.maxGuests),
        }),
      });
      const json = await res.json();
      if (json.success) {
        showToast("Room rate & inventory saved to database.");
        fetchDashboard();
      } else {
        showToast(json.message || "Failed to save room.", "error");
      }
    } catch {
      showToast("Network error saving room.", "error");
    } finally {
      setSavingRoomId(null);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      showToast("Password must be at least 6 characters.", "error");
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast("Passwords do not match.", "error");
      return;
    }
    setSavingPassword(true);
    try {
      const res = await fetch("/api/v1/management/hotel/rooms", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "change_password", newPassword }),
      });
      const json = await res.json();
      if (json.success) {
        showToast("Administrative password updated.");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        showToast(json.message || "Failed to update password.", "error");
      }
    } catch {
      showToast("Network error.", "error");
    } finally {
      setSavingPassword(false);
    }
  };

  const handleExportCSV = () => {
    if (!filteredBookings.length) {
      showToast("No reservations to export.", "error");
      return;
    }
    const headers = [
      "Booking Reference",
      "Hotel Name",
      "City",
      "Guest Name",
      "Guest Email",
      "Guest Phone",
      "Suite Name",
      "Check-In Date",
      "Check-Out Date",
      "Nights",
      "Rooms Count",
      "Total Amount",
      "Currency",
      "Payment Method",
      "Payment ID / Transaction ID",
      "Payment Status",
      "Booking Status",
      "Reservation Date",
    ];
    const rows = filteredBookings.map((b) => [
      `"${b.booking_reference || ""}"`,
      `"${(b.hotel_name || hotel?.name || "").replace(/"/g, '""')}"`,
      `"${(b.hotel_city || hotel?.cityName || "").replace(/"/g, '""')}"`,
      `"${(b.guest_name || "").replace(/"/g, '""')}"`,
      `"${b.guest_email || ""}"`,
      `"${b.guest_phone || ""}"`,
      `"${(b.room_name || "").replace(/"/g, '""')}"`,
      `"${b.check_in || b.checkIn || ""}"`,
      `"${b.check_out || b.checkOut || ""}"`,
      b.nights || 1,
      b.rooms_count || b.roomsCount || 1,
      b.total_amount || 0,
      b.currency || currency,
      `"${b.payment_method || (b.payment_id ? "razorpay" : "hotel_pay")}"`,
      `"${b.payment_id || b.paymentId || (b.payment_method === "razorpay" ? "Online" : "Pay at Hotel")}"`,
      `"${b.payment_status || "confirmed"}"`,
      `"${b.booking_status || "confirmed"}"`,
      `"${b.created_at ? new Date(b.created_at).toISOString().split("T")[0] : ""}"`,
    ]);
    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${hotel?.id || "hotel"}_bookings_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast(`Exported ${filteredBookings.length} reservations to CSV.`);
  };

  const filteredBookings = useMemo(() => {
    const list = data?.bookings || [];
    return list.filter((b) => {
      if (statusFilter !== "all" && b.booking_status !== statusFilter) return false;
      if (paymentFilter === "online" && b.payment_method === "hotel_pay") return false;
      if (paymentFilter === "hotel_pay" && b.payment_method !== "hotel_pay") return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          b.booking_reference?.toLowerCase().includes(q) ||
          b.guest_name?.toLowerCase().includes(q) ||
          b.guest_email?.toLowerCase().includes(q) ||
          b.room_name?.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    });
  }, [data?.bookings, statusFilter, paymentFilter, searchQuery]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-700 text-sm font-medium">
        <RefreshCw className="mr-2 h-4 w-4 animate-spin text-teal-600" />
        Loading Property Command Center...
      </div>
    );
  }

  if (!data) return null;

  const { hotel, kpis, rooms, bookings } = data;
  const currency = hotel.currency || "INR";

  const navItems = [
    { id: "overview", label: "Overview & Analytics", icon: LayoutDashboard },
    { id: "bookings", label: "Front Desk & Bookings", icon: CalendarCheck, badge: kpis.activeBookingsCount },
    { id: "rooms", label: "Rooms & Dynamic Rates", icon: BedDouble },
    { id: "settings", label: "Security & Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col lg:flex-row">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 flex items-center gap-2.5 rounded-2xl px-4 py-3 text-xs font-bold shadow-lg border ${
            toast.type === "error"
              ? "bg-rose-50 text-rose-800 border-rose-200"
              : "bg-white text-teal-800 border-teal-200"
          }`}
        >
          {toast.type === "error" ? <AlertCircle className="h-4 w-4 text-rose-600" /> : <CheckCircle2 className="h-4 w-4 text-teal-600" />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Left Sidebar */}
      <aside className="w-full lg:w-72 bg-white text-slate-800 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-200 shrink-0 shadow-sm">
        <div>
          <div className="p-6 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-white p-1 shadow-sm flex items-center justify-center">
                <Image
                  src="/icon.webp"
                  alt="AuraLuxe Logo"
                  width={36}
                  height={36}
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-widest text-teal-700 block">
                  Hotel Partner Portal
                </span>
                <h2 className="text-sm font-extrabold text-[#031256] truncate">
                  {hotel.name}
                </h2>
              </div>
            </div>
            <p className="mt-2.5 text-[11px] text-slate-500 truncate font-medium">
              {hotel.cityName}, {hotel.countryName} • {hotel.id}
            </p>
          </div>

          <nav className="p-4 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "bg-teal-50 text-teal-800 border border-teal-200 font-bold shadow-sm"
                      : "text-slate-600 hover:bg-slate-50 hover:text-[#031256]"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Icon className={`h-4 w-4 ${isActive ? "text-teal-700" : "text-slate-400"}`} />
                    {item.label}
                  </span>
                  {item.badge !== undefined && (
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${isActive ? "bg-teal-100 text-teal-800" : "bg-slate-100 text-slate-600"}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-100 space-y-2">
          <button
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-bold text-rose-700 hover:bg-rose-100 transition-colors cursor-pointer"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Workspace */}
      <main className="flex-1 p-5 sm:p-8 lg:p-10 overflow-y-auto">
        <div className="mx-auto max-w-6xl space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black text-[#031256] tracking-tight">
                {navItems.find((n) => n.id === activeTab)?.label}
              </h1>
              <p className="text-xs text-slate-500">
                Real-time property operations for {hotel.name}
              </p>
            </div>
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 hover:text-[#031256] transition-all self-start cursor-pointer disabled:opacity-60"
            >
              <RefreshCw className={`h-3.5 w-3.5 text-teal-600 ${isRefreshing ? "animate-spin" : ""}`} />
              <span>{isRefreshing ? "Refreshing..." : "Refresh Data"}</span>
            </button>
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Total Revenue
                  </span>
                  <p className="mt-2 text-2xl font-black text-teal-800 dark:text-teal-400">
                    {formatCurrency(kpis.totalRevenue, currency)}
                  </p>
                  <p className="mt-1 text-[11px] text-slate-500">
                    Online: {formatCurrency(kpis.onlineRevenue, currency)} • Desk: {formatCurrency(kpis.deskRevenue, currency)}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Active Reservations
                  </span>
                  <p className="mt-2 text-2xl font-black text-slate-900 dark:text-white">
                    {kpis.activeBookingsCount}
                  </p>
                  <p className="mt-1 text-[11px] text-slate-500">
                    Total: {kpis.totalBookings} • Cancelled: {kpis.cancelledCount}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Today&apos;s Front Desk
                  </span>
                  <p className="mt-2 text-2xl font-black text-indigo-700 dark:text-indigo-400">
                    {kpis.todayCheckIns} In / {kpis.todayCheckOuts} Out
                  </p>
                  <p className="mt-1 text-[11px] text-slate-500">
                    Scheduled arrivals & departures
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Today&apos;s Occupancy
                  </span>
                  <p className="mt-2 text-2xl font-black text-emerald-700 dark:text-emerald-400">
                    {kpis.occupancyRate}%
                  </p>
                  <p className="mt-1 text-[11px] text-slate-500">
                    {kpis.totalOccupied} of {kpis.totalInventory} total rooms occupied
                  </p>
                </div>
              </div>

              {/* Recent Reservations Preview */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-teal-600" />
                    Latest Property Bookings
                  </h3>
                  <button
                    onClick={() => setActiveTab("bookings")}
                    className="text-xs font-bold text-teal-700 dark:text-teal-400 hover:underline"
                  >
                    Manage All →
                  </button>
                </div>

                {bookings.length === 0 ? (
                  <p className="text-xs text-slate-500 py-8 text-center">
                    No reservations recorded for {hotel.name} yet.
                  </p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-100 dark:border-slate-800 text-[10px] uppercase text-slate-400">
                          <th className="py-2.5 pr-4">Reference</th>
                          <th className="py-2.5 pr-4">Guest</th>
                          <th className="py-2.5 pr-4">Suite</th>
                          <th className="py-2.5 pr-4">Dates</th>
                          <th className="py-2.5 pr-4">Amount</th>
                          <th className="py-2.5">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {bookings.slice(0, 6).map((b) => (
                          <tr key={b.id}>
                            <td className="py-3 pr-4 font-mono font-bold text-slate-900 dark:text-slate-100">
                              {b.booking_reference}
                            </td>
                            <td className="py-3 pr-4">
                              <p className="font-semibold text-slate-900 dark:text-white">{b.guest_name}</p>
                              <p className="text-[10px] text-slate-400">{b.guest_email}</p>
                            </td>
                            <td className="py-3 pr-4 text-slate-600 dark:text-slate-300">
                              {b.room_name} ({b.rooms_count}×)
                            </td>
                            <td className="py-3 pr-4 font-mono text-[11px] text-slate-500">
                              {b.check_in} → {b.check_out}
                            </td>
                            <td className="py-3 pr-4 font-bold text-teal-800 dark:text-teal-300">
                              {formatCurrency(b.total_amount, b.currency)}
                            </td>
                            <td className="py-3">
                              <span
                                className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${
                                  b.booking_status === "cancelled"
                                    ? "bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300"
                                    : b.booking_status === "completed"
                                    ? "bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300"
                                    : "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
                                }`}
                              >
                                {b.booking_status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: FRONT DESK & BOOKINGS */}
          {activeTab === "bookings" && (
            <div className="space-y-4">
              {/* Filter Bar */}
              <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search reference, guest name, email, or room..."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 py-2 text-xs focus:border-teal-600 focus:outline-none dark:border-slate-700 dark:bg-slate-950"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold dark:border-slate-700 dark:bg-slate-950"
                >
                  <option value="all">All Statuses</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <select
                  value={paymentFilter}
                  onChange={(e) => setPaymentFilter(e.target.value)}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold"
                >
                  <option value="all">All Payments</option>
                  <option value="online">Online Paid (Razorpay)</option>
                  <option value="hotel_pay">Pay at Hotel Desk</option>
                </select>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleExportCSV}
                  className="gap-1.5 text-xs border-slate-200 bg-white text-slate-700 hover:bg-slate-50 shadow-sm"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Export CSV</span>
                </Button>
              </div>

              {/* Bookings List */}
              <div className="space-y-3">
                {filteredBookings.length === 0 ? (
                  <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-900">
                    No reservations match your current filters.
                  </div>
                ) : (
                  filteredBookings.map((b) => (
                    <div
                      key={b.id}
                      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                    >
                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs font-black text-[#031256] dark:text-teal-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-md">
                            {b.booking_reference}
                          </span>
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${
                              b.booking_status === "cancelled"
                                ? "bg-rose-100 text-rose-700"
                                : b.booking_status === "completed"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-emerald-100 text-emerald-700"
                            }`}
                          >
                            {b.booking_status}
                          </span>
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                              b.payment_status === "confirmed"
                                ? "bg-teal-50 text-teal-800 border border-teal-200"
                                : "bg-amber-50 text-amber-800 border border-amber-200"
                            }`}
                          >
                            <CreditCard className="h-3 w-3" />
                            {b.payment_method === "hotel_pay" ? "Pay at Desk" : "Online Paid"} ({b.payment_status})
                          </span>
                        </div>

                        <p className="text-sm font-bold text-slate-900 dark:text-white">
                          {b.guest_name}{" "}
                          <span className="text-xs font-normal text-slate-500">
                            • {b.guest_email} {b.guest_phone ? `• ${b.guest_phone}` : ""}
                          </span>
                        </p>

                        <p className="text-xs text-slate-600 dark:text-slate-300">
                          <span className="font-semibold">{b.room_name}</span> • {b.rooms_count} Room(s) • {b.adults} Adults
                          {b.children > 0 ? `, ${b.children} Children` : ""} •{" "}
                          <span className="font-mono font-semibold">
                            {b.check_in} → {b.check_out}
                          </span>{" "}
                          ({b.nights} nights)
                        </p>

                        {b.special_requests && (
                          <p className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 px-2.5 py-1 text-[11px] text-indigo-800 dark:text-indigo-300">
                            <MessageSquare className="h-3 w-3 shrink-0" />
                            <span>Request: {b.special_requests}</span>
                          </p>
                        )}
                      </div>

                      <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-3 border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-100 dark:border-slate-800">
                        <div className="text-left lg:text-right">
                          <span className="text-[10px] uppercase text-slate-400 font-bold block">Total Amount</span>
                          <span className="text-lg font-black text-teal-800 dark:text-teal-300">
                            {formatCurrency(b.total_amount, b.currency)}
                          </span>
                        </div>

                        {updatingRef === b.booking_reference ? (
                          <div className="flex items-center gap-1.5 rounded-xl bg-teal-50 border border-teal-200 px-3 py-1.5 text-xs font-bold text-teal-800 shadow-sm">
                            <Loader2 className="h-3.5 w-3.5 animate-spin text-teal-600" />
                            <span>Updating Status...</span>
                          </div>
                        ) : (
                          <div className="flex flex-wrap gap-2">
                            {b.payment_status !== "confirmed" && b.booking_status !== "cancelled" && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => requestBookingAction(b, "mark_paid")}
                                className="h-8 text-[11px] border-teal-200 text-teal-700 hover:bg-teal-50"
                              >
                                Mark Paid
                              </Button>
                            )}
                            {b.booking_status === "confirmed" && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => requestBookingAction(b, "complete_stay")}
                                className="h-8 text-[11px] border-blue-200 text-blue-700 hover:bg-blue-50"
                              >
                                <CheckCircle2 className="mr-1 h-3 w-3" />
                                Complete Stay
                              </Button>
                            )}
                            {b.booking_status !== "cancelled" && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => requestBookingAction(b, "cancel")}
                                className="h-8 text-[11px] border-rose-200 text-rose-600 hover:bg-rose-50"
                              >
                                <XCircle className="mr-1 h-3 w-3" />
                                Cancel
                              </Button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 3: ROOMS & DYNAMIC PRICING */}
          {activeTab === "rooms" && (
            <div className="grid grid-cols-1 gap-5">
              {rooms.map((r) => {
                const edit = roomEdits[r.id] || {
                  price: r.price,
                  availableRooms: r.availableRooms,
                  maxGuests: r.maxGuests,
                };
                return (
                  <div
                    key={r.id}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                      <div>
                        <h3 className="text-base font-bold text-slate-900 dark:text-white">
                          {r.name}
                        </h3>
                        <p className="text-xs text-slate-400 font-mono">
                          ID: {r.id} • Occupied Today: {r.occupiedToday} • Remaining Today: {r.remainingToday}
                        </p>
                      </div>
                      <span className="rounded-full bg-teal-50 dark:bg-teal-950/50 px-3 py-1 text-xs font-bold text-teal-700 dark:text-teal-300 self-start">
                        Current Rate: {formatCurrency(r.price, currency)} / night
                      </span>
                    </div>

                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                          Nightly Rate ({currency})
                        </label>
                        <input
                          type="number"
                          min="100"
                          value={edit.price}
                          onChange={(e) =>
                            setRoomEdits({
                              ...roomEdits,
                              [r.id]: { ...edit, price: e.target.value },
                            })
                          }
                          className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs font-bold dark:border-slate-700 dark:bg-slate-950"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                          Total Rooms Inventory
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={edit.availableRooms}
                          onChange={(e) =>
                            setRoomEdits({
                              ...roomEdits,
                              [r.id]: { ...edit, availableRooms: e.target.value },
                            })
                          }
                          className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs font-bold dark:border-slate-700 dark:bg-slate-950"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                          Max Guests per Room
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="10"
                          value={edit.maxGuests}
                          onChange={(e) =>
                            setRoomEdits({
                              ...roomEdits,
                              [r.id]: { ...edit, maxGuests: e.target.value },
                            })
                          }
                          className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs font-bold dark:border-slate-700 dark:bg-slate-950"
                        />
                      </div>

                      <Button
                        onClick={() => handleSaveRoom(r.id)}
                        disabled={savingRoomId === r.id}
                        className="h-9 rounded-xl bg-[#031256] text-white text-xs font-bold hover:bg-[#061F5F] gap-1.5"
                      >
                        <Save className="h-3.5 w-3.5" />
                        <span>{savingRoomId === r.id ? "Saving..." : "Save Changes"}</span>
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 4: SECURITY & SETTINGS */}
          {activeTab === "settings" && (
            <div className="max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center gap-2.5 mb-4">
                <KeyRound className="h-5 w-5 text-teal-600" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Update Administrative Password
                </h3>
              </div>
              <p className="text-xs text-slate-500 mb-5">
                Set a custom private password for <strong>{hotel.name}</strong> so only authorized hotel staff can access this portal.
              </p>

              <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    New Administrative Password
                  </label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs dark:border-slate-700 dark:bg-slate-950"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter password"
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs dark:border-slate-700 dark:bg-slate-950"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={savingPassword}
                  className="rounded-xl bg-teal-600 text-white text-xs font-bold hover:bg-teal-500 px-6"
                >
                  {savingPassword ? "Updating..." : "Update Password"}
                </Button>
              </form>
            </div>
          )}
        </div>
      </main>

      {/* Action Confirmation Modal */}
      {confirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in select-none">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 text-slate-900 shadow-2xl">
            <div className="flex items-center gap-3">
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-2xl shrink-0 ${
                  confirmModal.confirmVariant === "danger"
                    ? "bg-rose-50 text-rose-600 border border-rose-200"
                    : "bg-teal-50 text-teal-700 border border-teal-200"
                }`}
              >
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <h3 className="text-base font-extrabold text-[#031256] truncate">
                  {confirmModal.title}
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Action Confirmation Required
                </span>
              </div>
            </div>
            <p className="mt-3.5 text-xs text-slate-600 leading-relaxed">
              {confirmModal.description}
            </p>
            <div className="mt-6 flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setConfirmModal(null)}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmModal.onConfirm}
                className={`rounded-xl px-4 py-2 text-xs font-bold text-white shadow-md transition-all cursor-pointer ${
                  confirmModal.confirmVariant === "danger"
                    ? "bg-rose-600 hover:bg-rose-700 shadow-rose-600/20"
                    : "bg-[#031256] hover:bg-[#061F5F] shadow-[#031256]/20"
                }`}
              >
                {confirmModal.confirmText}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Screen-Level Sign Out Overlay */}
      {isLoggingOut && (
        <div className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-md text-white animate-in fade-in p-6 text-center select-none">
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
              Signing out of Hotel Partner Portal...
            </span>
          </div>
          <p className="mt-1.5 text-xs text-slate-300">
            Terminating property administrative session securely
          </p>
        </div>
      )}
    </div>
  );
}

