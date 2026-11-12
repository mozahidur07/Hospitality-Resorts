"use client";

import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  MapPin,
  Calendar,
  Users,
  Search,
  ChevronDown,
  Building2,
  CheckCircle2,
  X,
  Check,
  Compass,
  RotateCw,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useClickOutside } from "@/hooks";
import { useSearchTransition } from "../context/search-transition-context";
import {
  searchDestinations,
  getPopularDestinations,
  getSmartRecommendations,
} from "@/data/destinations.data";

// Formats YYYY-MM-DD string into DD/MM/YYYY display order
function formatDateToDMY(dateStr) {
  if (!dateStr) return "DD/MM/YYYY";
  const parts = dateStr.split("-");
  if (parts.length !== 3) return dateStr;
  const [y, m, d] = parts;
  return `${d}/${m}/${y}`;
}

// Returns local YYYY-MM-DD for today
function getTodayString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Returns local YYYY-MM-DD for future offset days
function getFutureDateString(daysAhead = 1) {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function BookingSearchBar({
  initialDestination = "",
  initialCityId = "",
  initialCheckIn = "",
  initialCheckOut = "",
  initialAdults = 2,
  initialRooms = 1,
  onSearch = null,
  isFlat = false,
  className = "",
}) {
  const router = useRouter();
  const { triggerExpand } = useSearchTransition();

  const [destination, setDestination] = useState(initialDestination || "");
  const [selectedDestination, setSelectedDestination] = useState(() => {
    if (initialCityId) {
      return { id: initialCityId, cityName: (initialDestination || "").split(",")[0].trim() };
    }
    return null;
  });
  const [showDestDropdown, setShowDestDropdown] = useState(false);
  const [checkIn, setCheckIn] = useState(() => initialCheckIn || getTodayString());
  const [checkOut, setCheckOut] = useState(() => initialCheckOut || getFutureDateString(3));
  const [adults, setAdults] = useState(() => Number(initialAdults) || 2);
  const [rooms, setRooms] = useState(() => Number(initialRooms) || 1);
  const [showGuestPicker, setShowGuestPicker] = useState(false);
  const [searchSuccess, setSearchSuccess] = useState(false);
  const [refreshSeed, setRefreshSeed] = useState(0);
  const [recentSearches, setRecentSearches] = useState([]);

  // Proactive Route Prefetching for Instant 0ms Navigation to /hotels
  useEffect(() => {
    try {
      router.prefetch("/hotels");
    } catch (_) {}
  }, [router]);

  const prefetchHotels = useCallback(() => {
    try {
      router.prefetch("/hotels");
    } catch (_) {}
  }, [router]);

  // Load latest 2 previous search records (Google-style)
  useEffect(() => {
    try {
      const stored = localStorage.getItem("auraluxe_recent_searches");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setRecentSearches(parsed.slice(0, 2));
        }
      }
    } catch {}
  }, []);

  const saveRecentSearch = (item) => {
    if (!item || !item.cityName) return;
    try {
      const stored = localStorage.getItem("auraluxe_recent_searches");
      const current = stored ? JSON.parse(stored) : [];
      const normalizedCity = item.cityName.toLowerCase().trim();
      const filtered = Array.isArray(current)
        ? current.filter((x) => x?.cityName?.toLowerCase().trim() !== normalizedCity)
        : [];
      const updated = [item, ...filtered].slice(0, 2);
      setRecentSearches(updated);
      localStorage.setItem("auraluxe_recent_searches", JSON.stringify(updated));
    } catch {}
  };

  const clearRecentSearches = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setRecentSearches([]);
    try {
      localStorage.removeItem("auraluxe_recent_searches");
    } catch {}
  };

  // Sync state if initial props change
  useEffect(() => {
    if (initialDestination) setDestination(initialDestination);
    if (initialCityId) {
      setSelectedDestination({
        id: initialCityId,
        cityName: initialDestination.split(",")[0].trim(),
      });
    }
    if (initialCheckIn) setCheckIn(initialCheckIn);
    if (initialCheckOut) setCheckOut(initialCheckOut);
    if (initialAdults) setAdults(Number(initialAdults));
    if (initialRooms) setRooms(Number(initialRooms));
  }, [initialDestination, initialCityId, initialCheckIn, initialCheckOut, initialAdults, initialRooms]);

  // Refs for elements
  const barWrapperRef = useRef(null);
  const destContainerRef = useRef(null);
  const guestContainerRef = useRef(null);
  const destInputRef = useRef(null);

  // Close dropdowns when clicking outside
  useClickOutside(destContainerRef, () => setShowDestDropdown(false));
  useClickOutside(guestContainerRef, () => setShowGuestPicker(false));

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setShowDestDropdown(false);
        setShowGuestPicker(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Compute suggestions based on user query or popular defaults (dynamic shuffle)
  const suggestions = useMemo(() => {
    if (!destination.trim()) {
      return getPopularDestinations(8, refreshSeed);
    }
    return searchDestinations(destination, 8);
  }, [destination, refreshSeed]);

  // Contextual smart recommendations (Strictly Same State + Same Country)
  const smartRecommendations = useMemo(() => {
    if (!destination.trim()) return null;
    const target =
      selectedDestination ||
      (suggestions.length > 0 ? suggestions[0] : null);

    if (!target) return null;
    return getSmartRecommendations(target, 6);
  }, [destination, selectedDestination, suggestions]);

  // Filter out any recommendation that is already present in suggestions list
  const filteredRecommendations = useMemo(() => {
    if (!smartRecommendations?.items) return [];
    const suggestionIds = new Set(suggestions.map((s) => s.id));
    return smartRecommendations.items.filter((item) => !suggestionIds.has(item.id));
  }, [smartRecommendations, suggestions]);

  const handleSelectDestination = (item) => {
    setDestination(`${item.cityName}, ${item.countryName}`);
    setSelectedDestination(item);
    saveRecentSearch(item);
    setShowDestDropdown(false);
  };

  const handleClearDestination = (e) => {
    e.stopPropagation();
    setDestination("");
    setSelectedDestination(null);
    destInputRef.current?.focus();
    setShowDestDropdown(true);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setShowDestDropdown(false);
    setShowGuestPicker(false);
    setSearchSuccess(true);

    if (selectedDestination) {
      saveRecentSearch(selectedDestination);
    } else if (destination.trim()) {
      saveRecentSearch({
        id: "",
        cityName: destination.split(",")[0].trim(),
        countryName: destination.split(",")[1]?.trim() || "",
        displayName: destination.trim(),
      });
    }

    const params = new URLSearchParams();
    if (selectedDestination?.id) {
      params.set("cityId", selectedDestination.id);
    }
    if (destination.trim()) {
      params.set("destination", destination.trim());
    }
    if (checkIn) params.set("checkIn", checkIn);
    if (checkOut) params.set("checkOut", checkOut);
    if (adults) params.set("adults", adults.toString());
    if (rooms) params.set("rooms", rooms.toString());

    const targetUrl = `/hotels?${params.toString()}`;
    try {
      router.prefetch(targetUrl);
    } catch (_) {}

    if (onSearch) {
      onSearch({
        cityId: selectedDestination?.id,
        destination: destination.trim(),
        checkIn,
        checkOut,
        adults,
        rooms,
      });
      setSearchSuccess(false);
      router.push(targetUrl);
      return;
    }

    const isHome =
      typeof window !== "undefined" &&
      (window.location.pathname === "/" || window.location.pathname === "");

    if (isHome && barWrapperRef.current && triggerExpand) {
      const rect = barWrapperRef.current.getBoundingClientRect();
      setSearchSuccess(false);
      triggerExpand({
        rect: {
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        },
        params: {
          cityId: selectedDestination?.id,
          destination: destination.trim(),
          checkIn,
          checkOut,
          adults,
          rooms,
        },
        targetUrl,
      });
    } else {
      setSearchSuccess(false);
      router.push(targetUrl);
    }
  };

  return (
    <div ref={barWrapperRef} className={`relative w-full max-w-5xl z-30 ${className}`}>
      <form
        onSubmit={handleSearch}
        onMouseEnter={prefetchHotels}
        onFocusCapture={prefetchHotels}
        className={`relative z-30 flex flex-col md:flex-row items-stretch justify-between w-full transition-all duration-300 ${
          isFlat
            ? "bg-transparent rounded-none shadow-none border-none p-0"
            : "bg-white dark:bg-slate-900 rounded-3xl md:rounded-full p-1.5 shadow-2xl border border-slate-200/90 dark:border-slate-800"
        }`}
      >
        {/* 1. Destination Field */}
        <div
          ref={destContainerRef}
          className={`relative ${isFlat ? "flex-[1.2] min-w-[130px]" : "flex-1"} min-w-0 ${showDestDropdown ? "z-[100]" : "z-10"}`}
        >
          <div
            onClick={() => {
              destInputRef.current?.focus();
              if (!destination.trim()) setRefreshSeed((s) => s + 1);
              setShowDestDropdown(true);
              setShowGuestPicker(false);
            }}
            className={`flex cursor-pointer items-center ${
              isFlat ? "gap-2 px-2.5 py-1.5" : "gap-3 px-4 py-3"
            } rounded-2xl md:rounded-full h-full transition-colors hover:bg-slate-100/90 dark:hover:bg-slate-800/80`}
          >
            <div
              className={`flex ${
                isFlat ? "h-8 w-8" : "h-11 w-11"
              } flex-shrink-0 items-center justify-center rounded-full bg-[#031256]/10 border border-[#031256]/20 text-[#031256] dark:bg-slate-800 dark:text-slate-200`}
            >
              <MapPin className={isFlat ? "h-4 w-4" : "h-5 w-5"} strokeWidth={2.2} />
            </div>
            <div className="flex-1 overflow-hidden text-left min-w-0">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 whitespace-nowrap select-none [word-break:keep-all]">
                Destination
              </label>
              <div className="flex items-center gap-1.5">
                <input
                  ref={destInputRef}
                  type="text"
                  value={destination}
                  onFocus={() => {
                    setShowDestDropdown(true);
                    setShowGuestPicker(false);
                  }}
                  onChange={(e) => {
                    setDestination(e.target.value);
                    setSelectedDestination(null);
                    setShowDestDropdown(true);
                  }}
                  placeholder="City, State, or Country"
                  className="w-full truncate bg-transparent text-xs font-bold text-slate-900 dark:text-white placeholder:font-normal placeholder:text-slate-400 focus:outline-none"
                />
                {destination && (
                  <button
                    type="button"
                    onClick={handleClearDestination}
                    className="p-1 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors shrink-0"
                    aria-label="Clear destination"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Destination Suggestions Dropdown: Positioned clearly below search bar with z-[100] */}
          {showDestDropdown && (
            <div className="absolute left-0 top-[calc(100%+14px)] w-full sm:w-[440px] rounded-2xl border border-slate-200/90 bg-white p-3 shadow-2xl dark:border-slate-800 dark:bg-slate-900 z-[100] animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between px-3 py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {destination.trim() ? "Matching Destinations" : "Featured Destinations"}
                </span>
                {!destination.trim() ? (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setRefreshSeed((s) => s + 1);
                    }}
                    className="flex items-center gap-1 text-[10px] text-teal-700 dark:text-teal-400 hover:text-teal-900 dark:hover:text-teal-300 font-semibold transition-colors"
                    title="Explore more destinations"
                  >
                    <RotateCw className="h-2.5 w-2.5" />
                    <span>Shuffle</span>
                  </button>
                ) : (
                  <span className="text-[10px] text-slate-400 font-medium">
                    100+ Countries Available
                  </span>
                )}
              </div>

              <div className="max-h-72 sm:max-h-80 overflow-y-auto mt-1 space-y-1 pr-1">
                {/* 1. Latest 2 Recent Searches (Google Style) */}
                {!destination.trim() && recentSearches.length > 0 && (
                  <div className="mb-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center justify-between px-3 py-1 mb-1">
                      <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-teal-800 dark:text-teal-400">
                        <Clock className="h-3 w-3 text-teal-600" />
                        Recent Searches
                      </span>
                      <button
                        type="button"
                        onClick={clearRecentSearches}
                        className="text-[10px] text-slate-400 hover:text-rose-500 font-semibold transition-colors"
                      >
                        Clear
                      </button>
                    </div>

                    {recentSearches.slice(0, 2).map((item, idx) => (
                      <button
                        key={`recent-${item.id || item.cityName}-${idx}`}
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleSelectDestination(item);
                        }}
                        className="flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-left text-xs hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 transition-colors"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <Clock className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                          <div className="truncate">
                            <span className="font-bold text-slate-900 dark:text-slate-100">
                              {item.cityName}
                            </span>
                            {item.countryName && (
                              <span className="text-slate-500 dark:text-slate-400 font-normal">
                                , {item.countryName}
                              </span>
                            )}
                          </div>
                        </div>
                        <span className="text-[10px] text-teal-700 dark:text-teal-300 font-medium bg-teal-50 dark:bg-teal-950/60 border border-teal-200/60 dark:border-teal-800/60 px-1.5 py-0.5 rounded-md shrink-0">
                          Recent
                        </span>
                      </button>
                    ))}
                  </div>
                )}

                {suggestions.length > 0 ? (
                  <>
                    {/* Primary Matches */}
                    {suggestions.map((item) => {
                      const isSelected =
                        selectedDestination?.id === item.id ||
                        destination.trim().toLowerCase() === `${item.cityName}, ${item.countryName}`.toLowerCase();

                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleSelectDestination(item);
                          }}
                          className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-xs transition-colors ${
                            isSelected
                              ? "bg-[#031256]/5 text-[#031256] font-semibold border border-[#031256]/15"
                              : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200"
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            {isSelected ? (
                              <Check className="h-4 w-4 text-[#031256] shrink-0" strokeWidth={2.4} />
                            ) : (
                              <MapPin className="h-4 w-4 text-[#031256] shrink-0" strokeWidth={2.2} />
                            )}
                            <div className="truncate">
                              <span className="font-bold text-slate-900 dark:text-slate-100">
                                {item.cityName}
                              </span>
                              <span className="text-slate-500 dark:text-slate-400 font-normal">
                                , {item.stateName}, {item.countryName}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            {item.popular && (
                              <span className="rounded-md bg-amber-50 dark:bg-amber-950/40 px-1.5 py-0.5 text-[10px] font-semibold text-amber-700 dark:text-amber-400 border border-amber-200/60 dark:border-amber-800/60">
                                Popular
                              </span>
                            )}
                            <span className="text-[10px] text-slate-400 flex items-center gap-1">
                              <Building2 className="h-3 w-3" />
                              {item.hotelCount > 0 ? `${item.hotelCount} Hotels` : "Hotels"}
                            </span>
                          </div>
                        </button>
                      );
                    })}

                    {/* Smart Contextual Recommendations (Strictly Same State + Same Country) */}
                    {filteredRecommendations.length > 0 && (
                      <div className="pt-2 mt-2 border-t border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                          <Compass className="h-3.5 w-3.5 text-[#031256]" />
                          <span>{smartRecommendations?.title || "Recommended Escapes"}</span>
                        </div>
                        {filteredRecommendations.map((rec) => (
                          <button
                            key={rec.id}
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleSelectDestination(rec);
                            }}
                            className="flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-left text-xs transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" strokeWidth={2} />
                              <div className="truncate">
                                <span className="font-semibold text-slate-800 dark:text-slate-200">
                                  {rec.cityName}
                                </span>
                                <span className="text-slate-500 text-[11px]">
                                  , {rec.stateName}, {rec.countryName}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-1.5 shrink-0">
                              {rec.badge && (
                                <span className="rounded-md bg-blue-50 dark:bg-blue-950/40 px-1.5 py-0.5 text-[10px] font-semibold text-[#031256] dark:text-blue-300 border border-blue-200/60 dark:border-blue-900/50">
                                  {rec.badge}
                                </span>
                              )}
                              <span className="text-[10px] text-slate-400 flex items-center gap-1">
                                <Building2 className="h-3 w-3" />
                                Hotels
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="px-3 py-6 text-center text-xs text-slate-500">
                    No destinations match &quot;{destination}&quot;. Try searching another city, state, or country.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Divider 1 */}
        <div className={`hidden md:block ${isFlat ? "h-8" : "h-10"} w-[1px] bg-slate-200 dark:bg-slate-800 shrink-0 my-auto`} />

        {/* 2. Check-in & Check-out Dates */}
        <div className={`relative ${isFlat ? "flex-[1.3] min-w-[155px]" : "flex-1"} min-w-0`}>
          <div
            className={`flex items-center ${
              isFlat ? "gap-2 px-2.5 py-1.5" : "gap-3 px-4 py-3"
            } rounded-2xl md:rounded-full h-full transition-colors hover:bg-slate-100/90 dark:hover:bg-slate-800/80`}
          >
            <div
              className={`flex ${
                isFlat ? "h-8 w-8" : "h-11 w-11"
              } flex-shrink-0 items-center justify-center rounded-full bg-[#031256]/10 border border-[#031256]/20 text-[#031256] dark:bg-slate-800 dark:text-slate-200`}
            >
              <Calendar className={isFlat ? "h-4 w-4" : "h-5 w-5"} strokeWidth={2.2} />
            </div>
            <div className="grid grid-cols-2 gap-2 text-left flex-1 min-w-0">
              {/* Check-in Field (DD/MM/YYYY) */}
              <div className="relative cursor-pointer min-w-0">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 whitespace-nowrap select-none [word-break:keep-all]">
                  Check-in
                </label>
                <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white pointer-events-none mt-0.5 whitespace-nowrap">
                  <span>{formatDateToDMY(checkIn)}</span>
                </div>
                <input
                  type="date"
                  value={checkIn}
                  min={getTodayString()}
                  onClick={(e) => {
                    try {
                      if (e.target.showPicker) e.target.showPicker();
                    } catch (_) {}
                  }}
                  onChange={(e) => {
                    const selected = e.target.value;
                    const today = getTodayString();
                    if (selected && selected < today) {
                      setCheckIn(today);
                      return;
                    }
                    setCheckIn(selected);
                    if (checkOut && selected > checkOut) {
                      setCheckOut(selected);
                    }
                  }}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  aria-label="Select Check-in Date"
                />
              </div>

              {/* Check-out Field (DD/MM/YYYY) */}
              <div className="relative cursor-pointer min-w-0">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 whitespace-nowrap select-none [word-break:keep-all]">
                  Check-out
                </label>
                <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white pointer-events-none mt-0.5 whitespace-nowrap">
                  <span>{formatDateToDMY(checkOut)}</span>
                </div>
                <input
                  type="date"
                  value={checkOut}
                  min={checkIn || getTodayString()}
                  onClick={(e) => {
                    try {
                      if (e.target.showPicker) e.target.showPicker();
                    } catch (_) {}
                  }}
                  onChange={(e) => {
                    const selected = e.target.value;
                    const minValid = checkIn || getTodayString();
                    if (selected && selected < minValid) {
                      setCheckOut(minValid);
                      return;
                    }
                    setCheckOut(selected);
                  }}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  aria-label="Select Check-out Date"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Divider 2 */}
        <div className={`hidden md:block ${isFlat ? "h-8" : "h-10"} w-[1px] bg-slate-200 dark:bg-slate-800 shrink-0 my-auto`} />

        {/* 3. Guests & Rooms */}
        <div
          ref={guestContainerRef}
          className={`relative ${isFlat ? "flex-[1.1] min-w-[130px]" : "flex-1"} min-w-0 ${showGuestPicker ? "z-50" : "z-10"}`}
        >
          <div
            onClick={() => {
              setShowGuestPicker((prev) => !prev);
              setShowDestDropdown(false);
            }}
            className={`flex cursor-pointer items-center justify-between ${
              isFlat ? "gap-2 px-2.5 py-1.5" : "gap-3 px-4 py-3"
            } rounded-2xl md:rounded-full h-full transition-colors hover:bg-slate-100/90 dark:hover:bg-slate-800/80`}
          >
            <div className="flex items-center gap-2 overflow-hidden min-w-0">
              <div
                className={`flex ${
                  isFlat ? "h-8 w-8" : "h-11 w-11"
                } flex-shrink-0 items-center justify-center rounded-full bg-[#031256]/10 border border-[#031256]/20 text-[#031256] dark:bg-slate-800 dark:text-slate-200`}
              >
                <Users className={isFlat ? "h-4 w-4" : "h-5 w-5"} strokeWidth={2.2} />
              </div>
              <div className="text-left overflow-hidden min-w-0">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 whitespace-nowrap select-none">
                  Guests & Rooms
                </label>
                <span className="block truncate text-xs font-bold text-slate-900 dark:text-white whitespace-nowrap">
                  {adults} {parseInt(adults, 10) > 1 ? "Guests" : "Guest"}, {rooms} {parseInt(rooms, 10) > 1 ? "Rooms" : "Room"}
                </span>
              </div>
            </div>
            <ChevronDown
              className={`h-4 w-4 text-slate-400 shrink-0 ml-1 transition-transform duration-200 ${
                showGuestPicker ? "rotate-180 text-[#031256]" : ""
              }`}
            />
          </div>

          {/* Guest Picker Popover */}
          {showGuestPicker && (
            <div className="absolute right-0 top-[calc(100%+14px)] w-72 rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl dark:border-slate-800 dark:bg-slate-900 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="space-y-4">
                {/* Adults */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-slate-100">
                      Adults
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Ages 13 or above</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setAdults(Math.max(1, adults - 1))}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    >
                      -
                    </button>
                    <span className="w-5 text-center text-xs font-bold text-slate-900 dark:text-slate-100">
                      {adults}
                    </span>
                    <button
                      type="button"
                      onClick={() => setAdults(adults + 1)}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Rooms */}
                <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-3">
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-slate-100">
                      Rooms
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Number of rooms</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setRooms(Math.max(1, rooms - 1))}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    >
                      -
                    </button>
                    <span className="w-5 text-center text-xs font-bold text-slate-900 dark:text-slate-100">
                      {rooms}
                    </span>
                    <button
                      type="button"
                      onClick={() => setRooms(rooms + 1)}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                <Button
                  type="button"
                  size="sm"
                  className="w-full text-xs font-semibold bg-[#031256] hover:bg-[#061F5F] text-white"
                  onClick={() => setShowGuestPicker(false)}
                >
                  Apply Selection
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* 4. Search CTA Button */}
        <div className={`p-1 ${isFlat ? "pr-1" : "pr-2.5"} shrink-0 flex items-center`}>
          <Button
            type="submit"
            size={isFlat ? "sm" : "lg"}
            className={`w-full md:w-auto ${
              isFlat
                ? "h-9 px-4 text-xs shadow-md"
                : "h-12 px-7 text-sm shadow-lg shadow-[#031256]/30"
            } rounded-2xl md:rounded-full bg-gradient-to-r from-[#08063F] via-[#031256] to-[#061F5F] hover:from-[#061F5F] hover:via-[#031256] hover:to-[#08063F] text-white font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-[0.98] shrink-0`}
          >
            <Search className={isFlat ? "h-3.5 w-3.5" : "h-4 w-4"} />
            <span>Search</span>
          </Button>
        </div>
      </form>

      {/* Confirmation Toast notification */}
      {searchSuccess && (
        <div className="absolute -bottom-14 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 rounded-full bg-slate-900/95 px-5 py-2.5 text-xs font-medium text-white shadow-xl backdrop-blur-md border border-slate-800">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>
            {selectedDestination
              ? `Searching hotels in ${selectedDestination.cityName}, ${selectedDestination.countryName}...`
              : "Searching available hotels for your selected dates..."}
          </span>
        </div>
      )}
    </div>
  );
}
