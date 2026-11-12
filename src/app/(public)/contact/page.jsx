"use client";

import React, { useState, useEffect } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Send,
  CheckCircle2,
  HelpCircle,
  Building2,
  Headphones,
  UserCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/context/auth-context";

export default function ContactPage() {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    bookingRef: "",
    subject: "Reservation Inquiry",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Pre-fill fields if user is authenticated
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: prev.fullName || user.fullName || user.full_name || "",
        email: prev.email || user.email || "",
        phone: prev.phone || user.phone || "",
      }));
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/v1/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setIsSubmitted(true);
        setFormData({
          fullName: user ? (user.fullName || user.full_name || "") : "",
          email: user ? (user.email || "") : "",
          phone: user ? (user.phone || "") : "",
          bookingRef: "",
          subject: "Reservation Inquiry",
          message: "",
        });
      } else {
        setErrorMsg(data.message || "Unable to send inquiry at this moment. Please try again.");
      }
    } catch (err) {
      setErrorMsg("A network error occurred. Please try again or call our direct concierge line.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-28 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-3.5 py-1 text-xs font-bold text-teal-800 dark:bg-teal-950/60 dark:text-teal-300">
            <Headphones className="h-3.5 w-3.5 text-teal-600 dark:text-teal-400" />
            24/7 Global Guest Assistance
          </span>
          <h1 className="mt-3 text-3xl sm:text-5xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            Connect With Our Team
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
            Whether you need assistance with an existing reservation, desire private transfer arrangements, or wish to plan an bespoke itinerary, our advisors are here for you.
          </p>
        </div>

        {/* Top 3 Info Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-3xl border border-slate-200/90 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300 mb-5">
              <Phone className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Direct Telephone
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Priority phone line for urgent reservation and check-in queries.
            </p>
            <div className="mt-4 space-y-1">
              <p className="text-sm font-bold text-[#031256] dark:text-teal-400 font-mono">
                +91 332 489 8000
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                Toll-Free: 1800-58-3289
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200/90 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300 mb-5">
              <Mail className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              VIP Concierge Desk
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Bespoke travel planning, dietary requests, and corporate partnerships.
            </p>
            <div className="mt-4 space-y-1">
              <p className="text-sm font-bold text-[#031256] dark:text-teal-400">
                contact@auraluxe.com
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                support@auraluxe.com
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200/90 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300 mb-5">
              <MapPin className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Headquarters
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Corporate hub and luxury hospitality management office.
            </p>
            <div className="mt-4 space-y-1">
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                AuraLuxe Hospitality Center
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                30, Mall Road & Boulevard, Kolkata, India
              </p>
            </div>
          </div>
        </div>

        {/* Main Form Section */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-10 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Send an Inquiry
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Fill out the form below and an advisor will respond within 2 to 4 hours.
            </p>

            {isSubmitted && (
              <div className="mt-6 flex items-center gap-3 rounded-2xl bg-emerald-50 p-4 border border-emerald-200 dark:bg-emerald-950/50 dark:border-emerald-900 text-emerald-800 dark:text-emerald-300">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
                <div className="text-xs">
                  <p className="font-bold">Thank you for reaching out.</p>
                  <p className="mt-0.5">Your message has been received. Our concierge desk will contact you promptly.</p>
                </div>
              </div>
            )}

            {errorMsg && (
              <div className="mt-4 rounded-xl bg-rose-50 p-3.5 text-xs font-medium text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                {errorMsg}
              </div>
            )}

            {user && !isSubmitted && (
              <div className="mt-4 flex items-center gap-2 rounded-xl bg-teal-50/80 px-3.5 py-2 text-xs font-medium text-teal-800 border border-teal-200/60 dark:bg-teal-950/40 dark:border-teal-800/60 dark:text-teal-300">
                <UserCheck className="h-4 w-4 shrink-0 text-teal-600 dark:text-teal-400" />
                <span>Contact details pre-filled from your authenticated profile.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Rakhesh Sharma"
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs font-medium text-slate-900 focus:border-[#031256] focus:outline-none focus:ring-1 focus:ring-[#031256] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. rakhesh@gmail.com"
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs font-medium text-slate-900 focus:border-[#031256] focus:outline-none focus:ring-1 focus:ring-[#031256] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 987XX XX210"
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs font-medium text-slate-900 focus:border-[#031256] focus:outline-none focus:ring-1 focus:ring-[#031256] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Booking Reference (If applicable)
                  </label>
                  <input
                    type="text"
                    value={formData.bookingRef}
                    onChange={(e) => setFormData({ ...formData, bookingRef: e.target.value })}
                    placeholder="e.g. AUR-8xx412"
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs font-mono font-medium text-slate-900 focus:border-[#031256] focus:outline-none focus:ring-1 focus:ring-[#031256] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 uppercase"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Subject *
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs font-medium text-slate-900 focus:border-[#031256] focus:outline-none focus:ring-1 focus:ring-[#031256] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 cursor-pointer"
                >
                  <option value="Reservation Inquiry">Reservation & Booking Inquiry</option>
                  <option value="Special Requests">Special Requests & Dietary Requirements</option>
                  <option value="Transportation">Private Chauffeur & Helicopter Transfer</option>
                  <option value="Corporate Booking">Corporate & Group Stays</option>
                  <option value="Feedback">Feedback & Hospitality Review</option>
                  <option value="Other">Other / General Assistance</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Your Message *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your request or questions in detail..."
                  className="w-full rounded-xl border border-slate-300 p-3.5 text-xs font-medium text-slate-900 focus:border-[#031256] focus:outline-none focus:ring-1 focus:ring-[#031256] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="luxury"
                  size="lg"
                  className="w-full sm:w-auto font-bold gap-2 px-8 shadow-md"
                >
                  <Send className="h-4 w-4" />
                  <span>{isSubmitting ? "Sending Inquiry..." : "Send Message"}</span>
                </Button>
              </div>
            </form>
          </div>

          {/* Right Column: FAQ & Assurances */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl border border-slate-200/90 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center gap-2 font-bold text-sm text-[#031256] dark:text-teal-300 mb-4">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span>Guest Assurance & SLA</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                <li className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-teal-600 mt-1.5 shrink-0" />
                  <span><strong>Instant Confirmation:</strong> Live online bookings generate instantaneous vouchers stored in your browser and account.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-teal-600 mt-1.5 shrink-0" />
                  <span><strong>Flexible Modifications:</strong> Free cancellation on guaranteed stays up to 48 hours prior to arrival date.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-teal-600 mt-1.5 shrink-0" />
                  <span><strong>Dedicated Response Time:</strong> Direct inquiries via this portal are routed with top priority to our chief concierge desk.</span>
                </li>
              </ul>
            </div>

            <div className="rounded-3xl border border-slate-200/90 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-slate-100 mb-4">
                <HelpCircle className="h-4 w-4 text-teal-600" />
                <span>Frequently Asked Questions</span>
              </div>
              <div className="space-y-3.5 text-xs">
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-200">
                    Where can I access my voucher?
                  </h4>
                  <p className="mt-0.5 text-slate-500 dark:text-slate-400 leading-relaxed">
                    Navigate to your <strong>My Reservations</strong> tab in the user menu. You can view or print official vouchers at any time.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-200">
                    What if I need early check-in or late checkout?
                  </h4>
                  <p className="mt-0.5 text-slate-500 dark:text-slate-400 leading-relaxed">
                    Early check-in from 11:00 AM and late checkout up to 3:00 PM are subject to hotel suite availability and can be requested directly through this form.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

