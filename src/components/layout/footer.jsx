"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Award,
  CheckCircle2,
} from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { Button } from "@/components/ui/button";

export function Footer() {
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Hide footer on full-screen auth and management portal pages
  if (
    pathname === "/register" ||
    pathname?.startsWith("/register") ||
    pathname === "/login" ||
    pathname?.startsWith("/login") ||
    pathname?.startsWith("/management")
  ) {
    return null;
  }

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail("");
      }, 4000);
    }
  };

  return (
    <footer className="border-t border-[#061F5F]/60 bg-[#08063F] text-slate-300">
      {/* Top Banner / Newsletter */}
      <div className="border-b border-[#061F5F]/40 bg-[#040325] py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-teal-400">
                AuraLuxe Elite Circle
              </span>
              <h3 className="mt-1 text-2xl font-bold text-white">
                Unlock Secret Members-Only Escapes & 20% Off
              </h3>
              <p className="mt-1 text-xs text-slate-400 sm:text-sm">
                Receive invitation-only private sales, complimentary villa upgrades, and travel journals.
              </p>
            </div>

            <form
              onSubmit={handleSubscribe}
              className="flex w-full max-w-md items-center gap-2"
            >
              <div className="relative flex-1">
                <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your private email..."
                  required
                  className="h-11 w-full rounded-xl border border-[#061F5F] bg-[#031256]/80 pl-10 pr-4 text-xs text-white placeholder:text-slate-400 focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-400"
                />
              </div>
              <Button
                variant="luxury"
                size="sm"
                type="submit"
                className="h-11 px-5 font-semibold bg-gradient-to-r from-[#031256] to-[#061F5F] hover:from-[#061F5F] hover:to-[#031256] text-white border border-[#061F5F]"
              >
                {isSubscribed ? "Joined!" : "Subscribe"}
              </Button>
            </form>
          </div>

          {isSubscribed && (
            <div className="mt-3 flex items-center justify-end gap-1.5 text-xs font-semibold text-emerald-400">
              <CheckCircle2 className="h-4 w-4" />
              <span>Welcome to the Elite Circle. Check your inbox for invitation details.</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container mx-auto py-16 px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-white/10 p-1 shadow-md">
                <Image
                  src="/icon.webp"
                  alt="AuraLuxe Logo"
                  width={40}
                  height={40}
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <span className="text-xl font-extrabold text-white">
                  Aura<span className="text-teal-400">Luxe</span>
                </span>
                <span className="block text-[10px] uppercase tracking-widest text-teal-400 font-semibold">
                  Luxury Reservations
                </span>
              </div>
            </Link>

            <p className="mt-4 text-xs leading-relaxed text-slate-400 sm:text-sm max-w-sm">
              Crafting transcendent hospitality experiences across the globe. From private Maldives overwater lagoons to Alpine chalets and historic Venetian palazzos.
            </p>

            <div className="mt-6 space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-teal-400" />
                <span>{siteConfig.contact.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-teal-400" />
                <span>{siteConfig.contact.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-teal-400" />
                <span>{siteConfig.contact.email}</span>
              </div>
            </div>
          </div>

          {/* Column 1: Destinations */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Signature Escapes
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs">
              <li>
                <Link href="#santorini" className="hover:text-teal-400 transition-colors">
                  Santorini Caldera, Greece
                </Link>
              </li>
              <li>
                <Link href="#maldives" className="hover:text-teal-400 transition-colors">
                  Private Atolls, Maldives
                </Link>
              </li>
              <li>
                <Link href="#kyoto" className="hover:text-teal-400 transition-colors">
                  Forest Ryokans, Kyoto
                </Link>
              </li>
              <li>
                <Link href="#swiss-alps" className="hover:text-teal-400 transition-colors">
                  Matterhorn Chalets, Swiss Alps
                </Link>
              </li>
              <li>
                <Link href="#amalfi" className="hover:text-teal-400 transition-colors">
                  Cliffside Villas, Amalfi Coast
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Experiences */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Curated Services
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs">
              <li>
                <Link href="#concierge" className="hover:text-teal-400 transition-colors">
                  24/7 VIP Concierge
                </Link>
              </li>
              <li>
                <Link href="#private-jet" className="hover:text-teal-400 transition-colors">
                  Helicopter & Jet Transfers
                </Link>
              </li>
              <li>
                <Link href="#wellness" className="hover:text-teal-400 transition-colors">
                  Holistic Wellness & Spas
                </Link>
              </li>
              <li>
                <Link href="#gastronomy" className="hover:text-teal-400 transition-colors">
                  Michelin Star Table Reservations
                </Link>
              </li>
              <li>
                <Link href="#corporate" className="hover:text-teal-400 transition-colors">
                  Private Island Buyouts
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company & Trust */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Trust & Legal
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs">
              <li>
                <Link href="#guarantee" className="hover:text-teal-400 transition-colors">
                  Best Price Guarantee
                </Link>
              </li>
              <li>
                <Link href="#cancellation" className="hover:text-teal-400 transition-colors">
                  Flexible Cancellation
                </Link>
              </li>
              <li>
                <Link href="#privacy" className="hover:text-teal-400 transition-colors">
                  Privacy Policy & GDPR
                </Link>
              </li>
              <li>
                <Link href="#terms" className="hover:text-teal-400 transition-colors">
                  Terms of Hospitality
                </Link>
              </li>
              <li>
                <Link href="#sustainability" className="hover:text-teal-400 transition-colors">
                  Eco & Carbon Offsets
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between border-t border-[#061F5F]/60 pt-8 sm:flex-row gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} AuraLuxe International Luxury Hospitality Group. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-teal-400" />
              100% Secure & Verified Booking
            </span>
            <span className="flex items-center gap-1.5">
              <Award className="h-4 w-4 text-amber-400" />
              World Luxury Hotel Awards 2026 Winner
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
