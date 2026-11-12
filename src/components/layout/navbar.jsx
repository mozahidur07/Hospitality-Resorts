"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import {
  Menu,
  X,
  PhoneCall,
  User,
  LogOut,
  ChevronDown,
  LayoutDashboard,
  CalendarCheck,
  Heart,
  Settings,
  HelpCircle,
} from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/context/auth-context";
import { useClickOutside } from "@/hooks/use-click-outside";
import { BookingSearchBar } from "@/features/bookings/components/booking-search-bar";

// Pinned Search Bar rendered inside Navbar on /hotels page
function NavbarSearchBar() {
  const searchParams = useSearchParams();
  const paramCityId = searchParams.get("cityId") || "";
  const paramDestination = searchParams.get("destination") || "";
  const paramCheckIn = searchParams.get("checkIn") || "";
  const paramCheckOut = searchParams.get("checkOut") || "";
  const paramAdults = searchParams.get("adults") || "2";
  const paramRooms = searchParams.get("rooms") || "1";

  return (
    <BookingSearchBar
      initialCityId={paramCityId}
      initialDestination={paramDestination}
      initialCheckIn={paramCheckIn}
      initialCheckOut={paramCheckOut}
      initialAdults={paramAdults}
      initialRooms={paramRooms}
      isFlat={true}
      className="w-full"
    />
  );
}

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const { user, openAuthModal, logout } = useAuth();
  const userMenuRef = useRef(null);

  useClickOutside(userMenuRef, () => setUserMenuOpen(false));

  // High-performance route prefetching for instant page navigation
  useEffect(() => {
    try {
      router.prefetch("/");
      router.prefetch("/hotels");
      router.prefetch("/user");
    } catch (_) {}
  }, [router]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Compute initials for avatar
  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  // Requirement: Do not display Navbar on register or login screens
  if (
    pathname === "/register" ||
    pathname?.startsWith("/register") ||
    pathname === "/login" ||
    pathname?.startsWith("/login") ||
    pathname?.startsWith("/management")
  ) {
    return null;
  }

  // Only the home page ("/") has transparent navbar at top that turns white on scroll.
  // All other pages stay white even without scrolling.
  const isHomePage = pathname === "/";
  const isHotelsPage = pathname === "/hotels";
  const hasWhiteBg = !isHomePage || isScrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        hasWhiteBg
          ? "bg-white/95 shadow-sm backdrop-blur-xl text-slate-900 border-b border-slate-100"
          : "bg-gradient-to-b from-black/60 via-black/20 to-transparent text-white"
      }`}
    >
      <div className="w-full max-w-7xl mx-auto flex h-16 items-center justify-between px-3 sm:px-6">
        {/* Brand Logo */}
        <Link
          href="/"
          prefetch={true}
          onMouseEnter={() => {
            try { router.prefetch("/"); } catch (_) {}
          }}
          className="flex items-center gap-2.5 group shrink-0"
        >
          <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl p-0.5 shadow-md transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/icon.webp"
              alt="AuraLuxe Logo"
              width={40}
              height={40}
              priority
              className="h-full w-full object-contain"
            />
          </div>
          <div>
            <span
              className={`text-xl font-extrabold tracking-tight transition-colors ${
                hasWhiteBg ? "text-slate-900" : "text-white"
              }`}
            >
              Aura<span className={hasWhiteBg ? "text-[#031256]" : "text-teal-400"}>Luxe</span>
            </span>
            <span
              className={`block text-[10px] tracking-widest uppercase font-semibold ${
                hasWhiteBg ? "text-[#061F5F]" : "text-teal-300"
              }`}
            >
              Hotels & Resorts
            </span>
          </div>
        </Link>

        {/* Middle Section: On /hotels, renders the Search Component. On other pages, renders quick navigation */}
        {isHotelsPage ? (
          <div className="hidden lg:flex flex-1 max-w-4xl xl:max-w-5xl mx-2 xl:mx-4 min-w-0">
            <Suspense fallback={<div className="h-10 w-full rounded-full bg-slate-100 animate-pulse" />}>
              <NavbarSearchBar />
            </Suspense>
          </div>
        ) : (
          <nav className="hidden items-center gap-7 lg:flex">
            {siteConfig.mainNav.map((item, index) => {
              const targetHref = pathname === "/" ? item.href : `/${item.href}`;
              return (
                <Link
                  key={index}
                  href={targetHref}
                  prefetch={true}
                  onMouseEnter={() => {
                    if (pathname !== "/") {
                      try { router.prefetch("/"); } catch (_) {}
                    }
                  }}
                  className={`text-sm font-semibold transition-colors ${
                    hasWhiteBg
                      ? "text-slate-700 hover:text-[#031256]"
                      : "text-white/90 hover:text-white"
                  }`}
                >
                  {item.title}
                </Link>
              );
            })}
          </nav>
        )}

        {/* Right Action Buttons */}
        <div className="hidden items-center gap-3 sm:flex">
          {/* Customer Support link (hidden on /hotels and /contact screens) */}
          {!isHotelsPage && pathname !== "/contact" && (
            <Link
              href="/contact"
              className={`hidden items-center gap-1.5 text-xs font-semibold xl:flex transition-colors ${
                hasWhiteBg
                  ? "text-slate-600 hover:text-[#031256]"
                  : "text-white/80 hover:text-white"
              }`}
            >
              <PhoneCall className={`h-3.5 w-3.5 ${hasWhiteBg ? "text-[#031256]" : "text-teal-400"}`} />
              <span>Customer Support</span>
            </Link>
          )}

          {/* User Authenticated vs Guest State */}
          {user ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className={`flex items-center gap-2.5 rounded-full py-1.5 pl-2 pr-3.5 text-xs font-semibold transition-all border ${
                  hasWhiteBg
                    ? "border-slate-200 bg-white text-slate-800 shadow-sm hover:border-[#031256]"
                    : "border-white/20 bg-black/30 text-white backdrop-blur-md hover:border-teal-400"
                }`}
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-tr from-[#08063F] to-[#061F5F] text-[11px] font-bold text-white shadow-sm">
                  {getInitials(user.fullName || user.email)}
                </div>
                <span className="max-w-[110px] truncate">{user.fullName || user.email}</span>
                <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
              </button>

              {/* User Dropdown Menu */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-60 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl backdrop-blur-xl animate-in fade-in zoom-in-95 text-slate-800">
                  <div className="border-b border-slate-100 px-3 py-2.5">
                    <p className="text-xs font-bold text-slate-900 truncate">
                      {user.fullName || "Valued Guest"}
                    </p>
                    <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                  </div>

                  <div className="py-1.5 space-y-0.5">
                    <Link
                      href="/user?tab=bookings"
                      prefetch={true}
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 hover:text-[#031256] transition-colors"
                    >
                      <CalendarCheck className="h-4 w-4 text-[#031256]" />
                      <span>My Reservations</span>
                    </Link>
                    <Link
                      href="/user?tab=saved"
                      prefetch={true}
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 hover:text-[#031256] transition-colors"
                    >
                      <Heart className="h-4 w-4 text-rose-500" />
                      <span>Saved Hotels</span>
                    </Link>
                    <Link
                      href="/user?tab=profile"
                      prefetch={true}
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 hover:text-[#031256] transition-colors"
                    >
                      <Settings className="h-4 w-4 text-slate-600" />
                      <span>Account Settings</span>
                    </Link>
                  </div>

                  <div className="border-t border-slate-100 pt-1 space-y-0.5">
                    <Link
                      href="/contact"
                      prefetch={true}
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 hover:text-[#031256] transition-colors"
                    >
                      <HelpCircle className="h-4 w-4 text-teal-600" />
                      <span>Help & Support</span>
                    </Link>
                    <button
                      onClick={() => {
                        setUserMenuOpen(false);
                        logout();
                      }}
                      className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Button
              onClick={() => openAuthModal()}
              variant={hasWhiteBg ? "outline" : "ghost"}
              size="sm"
              className={
                hasWhiteBg
                  ? "border-slate-300 text-slate-800 hover:bg-slate-100 hover:text-[#031256]"
                  : "text-white hover:bg-white/10"
              }
            >
              Sign In
            </Button>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
          className={`flex h-10 w-10 items-center justify-center rounded-lg lg:hidden ${
            hasWhiteBg ? "text-slate-800" : "text-white"
          }`}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-200 bg-white/95 px-6 py-6 shadow-xl backdrop-blur-xl lg:hidden text-slate-800">
          {user && (
            <div className="mb-4 rounded-2xl bg-slate-50 p-4 border border-slate-200">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-[#08063F] to-[#061F5F] text-xs font-bold text-white">
                  {getInitials(user.fullName || user.email)}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">
                    {user.fullName || "Client"}
                  </p>
                  <p className="text-xs text-slate-500">{user.email}</p>
                </div>
              </div>
            </div>
          )}

          <nav className="flex flex-col space-y-4">
            {siteConfig.mainNav.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-slate-800 transition-colors hover:text-[#031256]"
              >
                {item.title}
              </Link>
            ))}
            {pathname !== "/contact" && (
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 text-base font-semibold text-slate-800 transition-colors hover:text-[#031256]"
              >
                <PhoneCall className="h-4 w-4 text-teal-600" />
                <span>Customer Support</span>
              </Link>
            )}
            {user && (
              <>
                <Link
                  href="/user?tab=bookings"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-base font-semibold text-slate-800 transition-colors hover:text-[#031256]"
                >
                  <CalendarCheck className="h-4 w-4 text-[#031256]" />
                  <span>My Reservations</span>
                </Link>
                <Link
                  href="/user?tab=saved"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-base font-semibold text-slate-800 transition-colors hover:text-[#031256]"
                >
                  <Heart className="h-4 w-4 text-rose-500" />
                  <span>Saved Hotels</span>
                </Link>
                <Link
                  href="/user?tab=profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-base font-semibold text-slate-800 transition-colors hover:text-[#031256]"
                >
                  <Settings className="h-4 w-4 text-slate-600" />
                  <span>Account Settings</span>
                </Link>
              </>
            )}
          </nav>

          <div className="mt-6 flex flex-col gap-3 border-t border-slate-100 pt-6">
            {user ? (
              <Button
                variant="outline"
                onClick={() => {
                  setMobileMenuOpen(false);
                  logout();
                }}
                className="w-full justify-center text-rose-600 border-rose-200 hover:bg-rose-50"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            ) : (
              <Button
                variant="outline"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAuthModal();
                }}
                className="w-full justify-center border-slate-300 text-slate-800 hover:bg-slate-100"
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
