"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ShieldCheck,
  LayoutDashboard,
  CalendarCheck,
  Building2,
  Users,
  MessageSquare,
  LogOut,
  Search,
  Download,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  Filter,
  XCircle,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { getAllHotels } from "@/features/hotels/services/mock-hotels.data";
import { Button } from "@/components/ui/button";

export default function SuperAdminDashboardPage() {
  const router = useRouter();
  const allHotels = useMemo(() => getAllHotels(), []);

  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [updatingRef, setUpdatingRef] = useState(null);
  const [confirmModal, setConfirmModal] = useState(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [data, setData] = useState(null);
  const [toast, setToast] = useState(null);

  // Advanced Multi-Filter State for All Bookings
  const [searchQuery, setSearchQuery] = useState("");
  const [hotelFilter, setHotelFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  // Hotel Access Control state
  const [hotelSearch, setHotelSearch] = useState("");
  const [passwordModalHotel, setPasswordModalHotel] = useState(null);
  const [newHotelPassword, setNewHotelPassword] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);

  // Clients & Inquiries search
  const [clientSearch, setClientSearch] = useState("");

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchOverview = useCallback(async () => {
    try {
      const res = await fetch("/api/v1/management/admin/overview", {
        credentials: "include",
      });
      if (res.status === 401) {
        router.push("/management/admin/login");
        return;
      }
      const json = await res.json();
      if (json.success) {
        setData(json);
      }
    } catch {
      showToast("Failed to load platform overview.", "error");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchOverview();
  }, [fetchOverview]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchOverview();
    setTimeout(() => setIsRefreshing(false), 650);
    showToast("Global platform data synchronized.");
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch("/api/v1/management/admin/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (_) {}
    router.push("/management/admin/login");
  };

  const handleAdminAction = async (payload) => {
    try {
      const res = await fetch("/api/v1/management/admin/actions", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (json.success) {
        showToast(json.message || "Action completed.");
        fetchOverview();
        return true;
      } else {
        showToast(json.message || "Action failed.", "error");
        return false;
      }
    } catch {
      showToast("Network error.", "error");
      return false;
    }
  };

  const requestBookingAction = (booking, actionType, value) => {
    let title = "";
    let description = "";
    let confirmText = "Confirm";
    let confirmVariant = "primary";
    let payload = {};

    if (actionType === "booking_status") {
      title = `Change Booking Status to ${value}`;
      description = `Are you sure you want to change reservation ${booking.booking_reference} status to "${value}"?`;
      confirmText = `Set to ${value}`;
      confirmVariant = value === "cancelled" ? "danger" : "primary";
      payload = { action: "update_booking_status", bookingReference: booking.booking_reference, status: value };
    } else if (actionType === "payment_status") {
      title = `Update Payment to ${value}`;
      description = `Change payment status for ${booking.booking_reference} (${booking.guest_name}) to "${value}"?`;
      confirmText = `Mark ${value}`;
      confirmVariant = value === "refunded" ? "danger" : "primary";
      payload = { action: "update_payment_status", bookingReference: booking.booking_reference, status: value };
    }

    setConfirmModal({
      title,
      description,
      confirmText,
      confirmVariant,
      onConfirm: async () => {
        setConfirmModal(null);
        setUpdatingRef(booking.booking_reference);
        await handleAdminAction(payload);
        setUpdatingRef(null);
      },
    });
  };

  // Unique booked hotels for dropdown filter
  const bookedHotelOptions = useMemo(() => {
    const map = new Map();
    (data?.bookings || []).forEach((b) => {
      if (b.hotel_id && !map.has(b.hotel_id)) {
        map.set(b.hotel_id, `${b.hotel_name} (${b.hotel_city})`);
      }
    });
    return Array.from(map.entries()).map(([id, label]) => ({ id, label }));
  }, [data?.bookings]);

  // Filtered Bookings
  const filteredBookings = useMemo(() => {
    const list = data?.bookings || [];
    return list.filter((b) => {
      if (hotelFilter !== "all" && b.hotel_id !== hotelFilter) return false;
      if (statusFilter !== "all" && b.booking_status !== statusFilter) return false;
      if (paymentFilter === "online" && b.payment_method === "hotel_pay") return false;
      if (paymentFilter === "hotel_pay" && b.payment_method !== "hotel_pay") return false;
      if (dateFrom && b.check_in < dateFrom) return false;
      if (dateTo && b.check_in > dateTo) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          b.booking_reference?.toLowerCase().includes(q) ||
          b.guest_name?.toLowerCase().includes(q) ||
          b.guest_email?.toLowerCase().includes(q) ||
          b.hotel_name?.toLowerCase().includes(q) ||
          b.hotel_city?.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    });
  }, [data?.bookings, hotelFilter, statusFilter, paymentFilter, dateFrom, dateTo, searchQuery]);

  // CSV Export for filtered bookings with guaranteed Check-In, Check-Out, and Payment ID columns
  const handleExportCSV = () => {
    if (!filteredBookings.length) {
      showToast("No bookings to export.", "error");
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
      `"${(b.hotel_name || "").replace(/"/g, '""')}"`,
      `"${(b.hotel_city || "").replace(/"/g, '""')}"`,
      `"${(b.guest_name || "").replace(/"/g, '""')}"`,
      `"${b.guest_email || ""}"`,
      `"${b.guest_phone || ""}"`,
      `"${(b.room_name || "").replace(/"/g, '""')}"`,
      `"${b.check_in || b.checkIn || ""}"`,
      `"${b.check_out || b.checkOut || ""}"`,
      b.nights || 1,
      b.rooms_count || b.roomsCount || 1,
      b.total_amount || 0,
      b.currency || "INR",
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
    link.setAttribute("download", `auraluxe_all_bookings_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast(`Exported ${filteredBookings.length} bookings to CSV.`);
  };

  // Filtered hotels for Hotels & Access tab
  const filteredHotels = useMemo(() => {
    const q = hotelSearch.trim().toLowerCase();
    const list = q
      ? allHotels.filter(
          (h) =>
            h.name.toLowerCase().includes(q) ||
            h.cityName.toLowerCase().includes(q) ||
            h.id.toLowerCase().includes(q)
        )
      : allHotels;
    return list.slice(0, 24);
  }, [allHotels, hotelSearch]);

  // Filtered clients
  const filteredClients = useMemo(() => {
    const q = clientSearch.trim().toLowerCase();
    const list = data?.clients || [];
    if (!q) return list;
    return list.filter(
      (c) =>
        c.full_name?.toLowerCase().includes(q) ||
        c.email?.toLowerCase().includes(q) ||
        c.city?.toLowerCase().includes(q)
    );
  }, [data?.clients, clientSearch]);

  const handleSetHotelPassword = async (e) => {
    e.preventDefault();
    if (!passwordModalHotel) return;
    setSavingPassword(true);
    const ok = await handleAdminAction({
      action: "set_hotel_password",
      hotelId: passwordModalHotel.id,
      hotelName: passwordModalHotel.name,
      newPassword: newHotelPassword,
    });
    setSavingPassword(false);
    if (ok) {
      setPasswordModalHotel(null);
      setNewHotelPassword("");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-700 text-sm font-medium">
        <RefreshCw className="mr-2 h-4 w-4 animate-spin text-indigo-600" />
        Loading Super Admin Command Center...
      </div>
    );
  }

  if (!data) return null;

  const { kpis, topHotels, inquiries, hotelAdmins, adminEmail } = data;

  const hotelAdminMap = {};
  (hotelAdmins || []).forEach((ha) => {
    hotelAdminMap[ha.hotel_id] = ha;
  });

  const navItems = [
    { id: "overview", label: "Global Overview", icon: LayoutDashboard },
    { id: "bookings", label: "All Bookings Explorer", icon: CalendarCheck, badge: kpis.totalBookings },
    { id: "hotels", label: "Hotels & Access Control", icon: Building2 },
    { id: "inquiries", label: "Support Inquiries", icon: MessageSquare, badge: kpis.openInquiries },
    { id: "clients", label: "Registered Clients", icon: Users, badge: kpis.totalClients },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col lg:flex-row">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 flex items-center gap-2.5 rounded-2xl px-4 py-3 text-xs font-bold shadow-lg border ${
            toast.type === "error"
              ? "bg-rose-50 text-rose-800 border-rose-200"
              : "bg-white text-indigo-900 border-indigo-200"
          }`}
        >
          {toast.type === "error" ? <AlertCircle className="h-4 w-4 text-rose-600" /> : <CheckCircle2 className="h-4 w-4 text-indigo-600" />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Password Reset Modal */}
      {passwordModalHotel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 text-slate-900 shadow-2xl">
            <h3 className="text-base font-bold flex items-center gap-2 text-[#031256]">
              <KeyRound className="h-4 w-4 text-indigo-600" />
              Set Hotel Admin Password
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Property: <strong className="text-slate-900">{passwordModalHotel.name}</strong> ({passwordModalHotel.id})
            </p>
            <form onSubmit={handleSetHotelPassword} className="mt-4 space-y-4">
              <input
                type="text"
                required
                minLength={6}
                value={newHotelPassword}
                onChange={(e) => setNewHotelPassword(e.target.value)}
                placeholder="Enter new administrative password (min 6 chars)"
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:outline-none shadow-sm"
              />
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setPasswordModalHotel(null);
                    setNewHotelPassword("");
                  }}
                  className="text-xs border-slate-300 text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={savingPassword}
                  className="text-xs bg-[#031256] text-white hover:bg-[#061F5F]"
                >
                  {savingPassword ? "Saving..." : "Save Password"}
                </Button>
              </div>
            </form>
          </div>
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
                <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-700 block">
                  Super Admin
                </span>
                <h2 className="text-sm font-extrabold text-[#031256] truncate">
                  AuraLuxe Global
                </h2>
              </div>
            </div>
            <p className="mt-2.5 text-[11px] text-slate-500 truncate font-medium">{adminEmail}</p>
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
                      ? "bg-indigo-50 text-indigo-900 border border-indigo-200 font-bold shadow-sm"
                      : "text-slate-600 hover:bg-slate-50 hover:text-[#031256]"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Icon className={`h-4 w-4 ${isActive ? "text-indigo-700" : "text-slate-400"}`} />
                    {item.label}
                  </span>
                  {item.badge !== undefined && (
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${isActive ? "bg-indigo-100 text-indigo-800" : "bg-slate-100 text-slate-600"}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-100">
          <button
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-bold text-rose-700 hover:bg-rose-100 transition-colors cursor-pointer"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-5 sm:p-8 lg:p-10 overflow-y-auto">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black text-[#031256] tracking-tight">
                {navItems.find((n) => n.id === activeTab)?.label}
              </h1>
              <p className="text-xs text-slate-500">
                Centralized platform analytics, multi-hotel booking control & governance
              </p>
            </div>
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 hover:text-[#031256] transition-all self-start cursor-pointer disabled:opacity-60"
            >
              <RefreshCw className={`h-3.5 w-3.5 text-indigo-600 ${isRefreshing ? "animate-spin" : ""}`} />
              <span>{isRefreshing ? "Syncing Global Data..." : "Sync Global Data"}</span>
            </button>
          </div>

          {/* TAB 1: GLOBAL OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Global Revenue
                  </span>
                  <div className="mt-2 space-y-1">
                    {Object.keys(kpis.revenueByCurrency || {}).length === 0 ? (
                      <p className="text-2xl font-black text-indigo-700 dark:text-indigo-400">₹0</p>
                    ) : (
                      Object.entries(kpis.revenueByCurrency).map(([curr, amt]) => (
                        <p key={curr} className="text-xl font-black text-indigo-700 dark:text-indigo-400">
                          {formatCurrency(amt, curr)}
                        </p>
                      ))
                    )}
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Total Reservations
                  </span>
                  <p className="mt-2 text-2xl font-black text-slate-900 dark:text-white">
                    {kpis.totalBookings}
                  </p>
                  <p className="mt-1 text-[11px] text-slate-500">
                    Active: {kpis.activeBookings} • Cancelled: {kpis.cancelledBookings}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Registered Guests
                  </span>
                  <p className="mt-2 text-2xl font-black text-teal-700 dark:text-teal-400">
                    {kpis.totalClients}
                  </p>
                  <p className="mt-1 text-[11px] text-slate-500">
                    Across {kpis.uniqueHotelsBooked} active properties
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Guest Inquiries
                  </span>
                  <p className="mt-2 text-2xl font-black text-amber-600 dark:text-amber-400">
                    {kpis.openInquiries} Open
                  </p>
                  <p className="mt-1 text-[11px] text-slate-500">
                    Out of {kpis.totalInquiries} total inquiries
                  </p>
                </div>
              </div>

              {/* Top Performing Hotels Table */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">
                  Top Performing Properties
                </h3>
                {topHotels.length === 0 ? (
                  <p className="text-xs text-slate-500 py-6 text-center">No hotel booking data yet.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-100 dark:border-slate-800 text-[10px] uppercase text-slate-400">
                          <th className="py-2.5 pr-4">Hotel Property</th>
                          <th className="py-2.5 pr-4">Location</th>
                          <th className="py-2.5 pr-4">Active / Total</th>
                          <th className="py-2.5 pr-4">Revenue</th>
                          <th className="py-2.5">Inspect</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {topHotels.map((h) => (
                          <tr key={h.hotelId}>
                            <td className="py-3 pr-4 font-bold text-slate-900 dark:text-white">
                              {h.hotelName}
                            </td>
                            <td className="py-3 pr-4 text-slate-500">
                              {h.city}, {h.country}
                            </td>
                            <td className="py-3 pr-4 font-semibold">
                              {h.activeBookings} / {h.totalBookings}
                            </td>
                            <td className="py-3 pr-4 font-bold text-indigo-700 dark:text-indigo-400">
                              {formatCurrency(h.revenue, h.currency)}
                            </td>
                            <td className="py-3">
                              <button
                                onClick={() => {
                                  setHotelFilter(h.hotelId);
                                  setActiveTab("bookings");
                                }}
                                className="text-xs font-bold text-teal-700 dark:text-teal-400 hover:underline"
                              >
                                View Bookings →
                              </button>
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

          {/* TAB 2: ALL BOOKINGS EXPLORER */}
          {activeTab === "bookings" && (
            <div className="space-y-4">
              {/* Advanced Filter Panel */}
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                    <Filter className="h-3.5 w-3.5 text-indigo-500" />
                    Advanced Multi-Filter ({filteredBookings.length} results)
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleExportCSV}
                    className="h-8 gap-1.5 text-xs border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Export CSV</span>
                  </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                  <div className="relative lg:col-span-2">
                    <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search Ref, Guest, Hotel, City..."
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 py-2 text-xs dark:border-slate-700 dark:bg-slate-950"
                    />
                  </div>

                  <select
                    value={hotelFilter}
                    onChange={(e) => setHotelFilter(e.target.value)}
                    className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold dark:border-slate-700 dark:bg-slate-950"
                  >
                    <option value="all">All Hotels</option>
                    {bookedHotelOptions.map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {opt.label}
                      </option>
                    ))}
                  </select>

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
                    className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold dark:border-slate-700 dark:bg-slate-950"
                  >
                    <option value="all">All Payments</option>
                    <option value="online">Razorpay Online</option>
                    <option value="hotel_pay">Pay at Hotel</option>
                  </select>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 font-semibold">Check-In From:</span>
                    <input
                      type="date"
                      value={dateFrom}
                      onChange={(e) => setDateFrom(e.target.value)}
                      className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs dark:border-slate-700 dark:bg-slate-950"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 font-semibold">To:</span>
                    <input
                      type="date"
                      value={dateTo}
                      onChange={(e) => setDateTo(e.target.value)}
                      className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs dark:border-slate-700 dark:bg-slate-950"
                    />
                  </div>
                  {(hotelFilter !== "all" || statusFilter !== "all" || paymentFilter !== "all" || dateFrom || dateTo || searchQuery) && (
                    <button
                      onClick={() => {
                        setHotelFilter("all");
                        setStatusFilter("all");
                        setPaymentFilter("all");
                        setDateFrom("");
                        setDateTo("");
                        setSearchQuery("");
                      }}
                      className="text-xs font-bold text-rose-600 hover:underline"
                    >
                      Reset Filters
                    </button>
                  )}
                </div>
              </div>

              {/* Bookings Table */}
              <div className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-800 text-[10px] uppercase text-slate-400 bg-slate-50/70 dark:bg-slate-950/50">
                      <th className="p-4">Reference</th>
                      <th className="p-4">Hotel & Location</th>
                      <th className="p-4">Guest</th>
                      <th className="p-4">Stay & Suite</th>
                      <th className="p-4">Amount & Mode</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {filteredBookings.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-slate-500">
                          No bookings match your filters.
                        </td>
                      </tr>
                    ) : (
                      filteredBookings.map((b) => (
                        <tr key={b.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30">
                          <td className="p-4 font-mono font-bold text-[#031256] dark:text-teal-300">
                            {b.booking_reference}
                          </td>
                          <td className="p-4">
                            <p className="font-bold text-slate-900 dark:text-white">{b.hotel_name}</p>
                            <p className="text-[10px] text-slate-400">{b.hotel_city}, {b.hotel_country}</p>
                          </td>
                          <td className="p-4">
                            <p className="font-semibold text-slate-900 dark:text-white">{b.guest_name}</p>
                            <p className="text-[10px] text-slate-400">{b.guest_email}</p>
                          </td>
                          <td className="p-4">
                            <p className="font-semibold">{b.room_name} ({b.rooms_count}×)</p>
                            <p className="font-mono text-[10px] text-slate-500">
                              {b.check_in} → {b.check_out}
                            </p>
                          </td>
                          <td className="p-4">
                            <p className="font-bold text-teal-800 dark:text-teal-300">
                              {formatCurrency(b.total_amount, b.currency)}
                            </p>
                            <p className="text-[10px] text-slate-400">
                              {b.payment_method === "hotel_pay" ? "Pay at Desk" : "Online Paid"} ({b.payment_status})
                            </p>
                          </td>
                          <td className="p-4">
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
                          </td>
                          <td className="p-4">
                            {updatingRef === b.booking_reference ? (
                              <div className="flex items-center gap-1.5 text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-200">
                                <Loader2 className="h-3 w-3 animate-spin text-indigo-600" />
                                <span>Updating...</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-1.5">
                                {b.booking_status === "confirmed" && (
                                  <button
                                    onClick={() =>
                                      requestBookingAction(b, "booking_status", "completed")
                                    }
                                    title="Mark Completed"
                                    className="rounded-lg bg-blue-50 px-2.5 py-1 text-[10px] font-bold text-blue-700 hover:bg-blue-100 transition-colors cursor-pointer"
                                  >
                                    Complete
                                  </button>
                                )}
                                {b.booking_status !== "cancelled" && (
                                  <button
                                    onClick={() =>
                                      requestBookingAction(b, "booking_status", "cancelled")
                                    }
                                    title="Cancel Booking"
                                    className="rounded-lg bg-rose-50 px-2.5 py-1 text-[10px] font-bold text-rose-600 hover:bg-rose-100 transition-colors cursor-pointer"
                                  >
                                    Cancel
                                  </button>
                                )}
                                {b.payment_status !== "confirmed" && b.booking_status !== "cancelled" && (
                                  <button
                                    onClick={() =>
                                      requestBookingAction(b, "payment_status", "confirmed")
                                    }
                                    title="Verify & Confirm Payment"
                                    className="rounded-lg bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-700 hover:bg-emerald-100 transition-colors cursor-pointer"
                                  >
                                    Verify Pay
                                  </button>
                                )}
                              </div>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: HOTELS & ACCESS CONTROL */}
          {activeTab === "hotels" && (
            <div className="space-y-4">
              <div className="relative max-w-md">
                <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={hotelSearch}
                  onChange={(e) => setHotelSearch(e.target.value)}
                  placeholder="Search any registered hotel by name, city, or ID..."
                  className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-xs dark:border-slate-800 dark:bg-slate-900"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredHotels.map((h) => {
                  const adminInfo = hotelAdminMap[h.id];
                  return (
                    <div
                      key={h.id}
                      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                            {h.name}
                          </h3>
                          <span className="rounded-md bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[10px] font-mono text-slate-500">
                            {h.currency}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {h.cityName}, {h.countryName}
                        </p>
                        <p className="text-[10px] font-mono text-slate-400 mt-1">{h.id}</p>
                      </div>

                      <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-3">
                        <span className="text-[11px] font-semibold text-slate-500">
                          {adminInfo ? "Custom Password Active" : "Default Password"}
                        </span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setPasswordModalHotel(h)}
                          className="h-8 gap-1.5 text-[11px] border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                        >
                          <KeyRound className="h-3 w-3" />
                          <span>Set Password</span>
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: SUPPORT INQUIRIES */}
          {activeTab === "inquiries" && (
            <div className="space-y-3">
              {inquiries.length === 0 ? (
                <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-900">
                  No guest inquiries submitted yet.
                </div>
              ) : (
                inquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-0.5 text-[10px] font-bold text-indigo-700 dark:text-indigo-300">
                          {inq.subject}
                        </span>
                        {inq.booking_reference && (
                          <span className="font-mono text-[10px] font-bold bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                            Ref: {inq.booking_reference}
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">
                        {inq.full_name}{" "}
                        <span className="text-xs font-normal text-slate-500">
                          • {inq.email} {inq.phone ? `• ${inq.phone}` : ""}
                        </span>
                      </p>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {inq.message}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <select
                        value={inq.status}
                        onChange={(e) =>
                          handleAdminAction({
                            action: "update_inquiry",
                            inquiryId: inq.id,
                            status: e.target.value,
                          })
                        }
                        className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold dark:border-slate-700 dark:bg-slate-950"
                      >
                        <option value="new">New</option>
                        <option value="in_progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 5: CLIENTS DIRECTORY */}
          {activeTab === "clients" && (
            <div className="space-y-4">
              <div className="relative max-w-md">
                <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={clientSearch}
                  onChange={(e) => setClientSearch(e.target.value)}
                  placeholder="Search clients by name, email, or city..."
                  className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-xs dark:border-slate-800 dark:bg-slate-900"
                />
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-800 text-[10px] uppercase text-slate-400">
                      <th className="p-4">Client Name</th>
                      <th className="p-4">Contact</th>
                      <th className="p-4">Location</th>
                      <th className="p-4">Bookings</th>
                      <th className="p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {filteredClients.map((c) => (
                      <tr key={c.id}>
                        <td className="p-4 font-bold text-slate-900 dark:text-white">
                          {c.full_name}
                        </td>
                        <td className="p-4">
                          <p>{c.email}</p>
                          <p className="text-[10px] text-slate-400">{c.phone || "No phone"}</p>
                        </td>
                        <td className="p-4 text-slate-500">
                          {[c.city, c.country].filter(Boolean).join(", ") || "—"}
                        </td>
                        <td className="p-4 font-bold">{c.total_bookings || 0}</td>
                        <td className="p-4">
                          <button
                            onClick={() =>
                              handleAdminAction({
                                action: "update_client",
                                clientId: c.id,
                                status: c.status === "suspended" ? "active" : "suspended",
                              })
                            }
                            className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase ${
                              c.status === "suspended"
                                ? "bg-rose-100 text-rose-700"
                                : "bg-emerald-100 text-emerald-700"
                            }`}
                          >
                            {c.status || "active"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
                    : "bg-indigo-50 text-indigo-700 border border-indigo-200"
                }`}
              >
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <h3 className="text-base font-extrabold text-[#031256] truncate">
                  {confirmModal.title}
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Executive Override Confirmation
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
            <Loader2 className="h-5 w-5 animate-spin text-indigo-400" />
            <span className="text-base font-extrabold tracking-wide">
              Signing out of Super Admin Command Center...
            </span>
          </div>
          <p className="mt-1.5 text-xs text-slate-300">
            Terminating master administrative session securely
          </p>
        </div>
      )}
    </div>
  );
}

