"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Search,
  MapPin,
  Calendar,
  Users,
  X,
  Building2,
  ArrowUpDown,
  RotateCcw,
} from "lucide-react";
import { HotelGrid } from "@/features/hotels/components/hotel-grid";
import { HotelSkeletonGrid } from "@/features/hotels/components/hotel-skeleton-grid";
import { BookingSearchBar } from "@/features/bookings/components/booking-search-bar";
import { getAllHotels } from "@/features/hotels/services/mock-hotels.data";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function HotelsDirectoryContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Query parameters from BookingSearchBar
  const paramCityId = searchParams.get("cityId") || "";
  const paramDestination = searchParams.get("destination") || "";
  const paramCheckIn = searchParams.get("checkIn") || "";
  const paramCheckOut = searchParams.get("checkOut") || "";
  const paramAdults = searchParams.get("adults") || "2";
  const paramRooms = searchParams.get("rooms") || "1";

  // Zero-loading state: brief skeleton exhibition for smooth app-like transition
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  // In-page live search & sorting state
  const [localSearch, setLocalSearch] = useState("");
  const [sortBy, setSortBy] = useState("recommended");
  const [bookedMap, setBookedMap] = useState({});
  const [overridesMap, setOverridesMap] = useState({});

  useEffect(() => {
    setIsInitialLoading(true);
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 220);
    return () => clearTimeout(timer);
  }, [paramCityId, paramDestination, paramCheckIn, paramCheckOut]);

  // Fetch real-time booked room counts and live admin price/inventory overrides
  useEffect(() => {
    let cancelled = false;
    const url = `/api/v1/bookings/availability-summary?checkIn=${encodeURIComponent(paramCheckIn || "")}&checkOut=${encodeURIComponent(paramCheckOut || "")}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled && data?.success) {
          if (data.bookedMap) setBookedMap(data.bookedMap);
          if (data.hotelOverridesMap) setOverridesMap(data.hotelOverridesMap);
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [paramCheckIn, paramCheckOut]);

  // Load master list of normalized hotels merged with live admin overrides
  const allHotels = useMemo(() => {
    const raw = getAllHotels();
    if (!overridesMap || Object.keys(overridesMap).length === 0) return raw;
    return raw.map((hotel) => {
      const hotelOverrides = overridesMap[hotel.id];
      if (!hotelOverrides) return hotel;
      const updatedRooms = (hotel.rooms || []).map((r) => {
        const ov = hotelOverrides[r.id];
        if (!ov) return r;
        const price = ov.price !== undefined ? Number(ov.price) : (r.price || r.pricePerNight);
        const availableRooms = ov.availableRooms !== undefined ? Number(ov.availableRooms) : r.availableRooms;
        const maxGuests = ov.maxGuests !== undefined ? Number(ov.maxGuests) : r.maxGuests;
        return { ...r, price, pricePerNight: price, availableRooms, maxGuests };
      });
      const startingPrice = updatedRooms.length > 0 ? (updatedRooms[0].price || updatedRooms[0].pricePerNight) : hotel.startingPrice;
      return {
        ...hotel,
        startingPrice,
        pricePerNight: startingPrice,
        rooms: updatedRooms,
      };
    });
  }, [overridesMap]);

  // Filter hotels based on URL search query parameters + local search + room & guest availability
  const filteredHotels = useMemo(() => {
    const requestedRooms = Math.max(1, Number(paramRooms) || 1);
    const requestedAdults = Math.max(1, Number(paramAdults) || 2);

    return allHotels.filter((hotel) => {
      // 1. Strict City ID filter (from destination selector, e.g. 'in-wb-kolkata')
      if (paramCityId) {
        const matchesCityId =
          hotel.cityId &&
          hotel.cityId.toLowerCase().trim() === paramCityId.toLowerCase().trim();

        if (!matchesCityId) {
          return false;
        }
      }

      // 2. Destination query filter (if no cityId was passed, or fallback text search)
      if (!paramCityId && paramDestination.trim()) {
        const normalizedDest = paramDestination.toLowerCase().trim();
        const primaryCity = normalizedDest.split(",")[0].trim();

        const matchesCity =
          hotel.cityName &&
          (hotel.cityName.toLowerCase() === primaryCity ||
            hotel.cityName.toLowerCase().includes(primaryCity));

        const matchesRegion =
          (hotel.stateName && hotel.stateName.toLowerCase().includes(primaryCity)) ||
          (hotel.countryName && hotel.countryName.toLowerCase().includes(primaryCity)) ||
          (hotel.name && hotel.name.toLowerCase().includes(primaryCity));

        if (!matchesCity && !matchesRegion) {
          return false;
        }
      }

      // 3. Local on-page text search filter
      if (localSearch.trim()) {
        const q = localSearch.toLowerCase().trim();
        const matchesLocal =
          hotel.name.toLowerCase().includes(q) ||
          hotel.cityName.toLowerCase().includes(q) ||
          hotel.address.toLowerCase().includes(q) ||
          hotel.category.toLowerCase().includes(q) ||
          (hotel.theme && hotel.theme.toLowerCase().includes(q)) ||
          (hotel.amenities && hotel.amenities.some((a) => a.toLowerCase().includes(q)));

        if (!matchesLocal) {
          return false;
        }
      }

      // 4. Real-time Room Count & Guest Capacity check (ensures requested rooms & guests fit)
      const hotelBooked = bookedMap[hotel.id] || {};
      const roomsList = hotel.rooms || [];
      if (roomsList.length > 0) {
        const hasEligibleRoom = roomsList.some((r) => {
          const totalCap = r.availableRooms || 3;
          const alreadyBooked = hotelBooked[r.id] || 0;
          const remaining = Math.max(0, totalCap - alreadyBooked);
          const maxGuestCap = (r.maxGuests || 2) * requestedRooms;
          return remaining >= requestedRooms && maxGuestCap >= requestedAdults;
        });
        if (!hasEligibleRoom) {
          return false;
        }
      }

      return true;
    });
  }, [allHotels, paramCityId, paramDestination, localSearch, paramRooms, paramAdults, bookedMap]);

  // Sort hotels
  const sortedHotels = useMemo(() => {
    const list = [...filteredHotels];
    switch (sortBy) {
      case "price-asc":
        return list.sort((a, b) => a.startingPrice - b.startingPrice);
      case "price-desc":
        return list.sort((a, b) => b.startingPrice - a.startingPrice);
      case "rating-desc":
        return list.sort((a, b) => b.rating - a.rating);
      case "recommended":
      default:
        return list.sort((a, b) => (b.stars || 5) - (a.stars || 5) || b.rating - a.rating);
    }
  }, [filteredHotels, sortBy]);

  const handleClearAllSearch = () => {
    setLocalSearch("");
    router.push("/hotels");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Mobile-only Search Bar (On desktop, search is integrated directly inside the Navbar) */}
      <div className="lg:hidden bg-white dark:bg-slate-950 pt-20 pb-3 px-4 border-b border-slate-100 dark:border-slate-800">
        <div className="container mx-auto max-w-6xl">
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
        </div>
      </div>

      {/* Main Content Area */}
      <main className="container mx-auto max-w-6xl px-4 sm:px-6 pt-6 lg:pt-24 pb-24">
        {/* Sub-header Filter & Count Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800/60">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-slate-100">
                {paramDestination ? `Hotels in ${paramDestination}` : "Verified Luxury Hotels"}
              </h1>
              <Badge variant="outline" className="text-xs font-bold text-teal-800 dark:text-teal-400 border-teal-200 dark:border-teal-900">
                {sortedHotels.length} Stays
              </Badge>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Instant confirmation • Best rate guarantee • Zero booking fees
            </p>
          </div>

          {/* Quick Controls: Local Filter & Sort */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <Input
                type="text"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder="Filter results (pool, spa, etc)..."
                className="pl-8 h-9 text-xs bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-xl"
              />
              {localSearch && (
                <button
                  onClick={() => setLocalSearch("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-slate-600"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>

            <div className="relative w-full sm:w-44">
              <ArrowUpDown className="absolute left-3 top-1/2 h-3 w-3 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full h-9 appearance-none rounded-xl border border-slate-200 bg-slate-50 pl-8 pr-7 text-xs font-semibold text-slate-700 shadow-sm focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
              >
                <option value="recommended">Featured Stays</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating-desc">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content Body: Zero-loading 6 Skeleton Cards vs Real Hotel Cards */}
        <div className="mt-8">
          {isInitialLoading ? (
            /* 6 Skeleton Cards (Matching Image 1) */
            <HotelSkeletonGrid count={6} />
          ) : sortedHotels.length > 0 ? (
            /* Loaded Real Hotels */
            <div className="animate-in fade-in duration-300">
              <HotelGrid initialHotels={sortedHotels} />
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-20 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 p-8">
              <Building2 className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-700" />
              <h3 className="mt-4 text-base font-bold text-slate-900 dark:text-slate-100">
                No hotels found matching your search
              </h3>
              <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
                We couldn&apos;t find verified stays matching your current filters. Try adjusting your destination or clearing keywords.
              </p>
              <Button
                variant="luxury"
                size="sm"
                onClick={handleClearAllSearch}
                className="mt-5 rounded-full text-xs font-semibold"
              >
                <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
                <span>Reset Filters</span>
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function HotelsDirectoryFallback() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pt-8 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="mx-auto h-14 w-full max-w-4xl rounded-full bg-slate-100 animate-pulse dark:bg-slate-900 mb-10" />
        <HotelSkeletonGrid count={6} />
      </div>
    </div>
  );
}

export default function HotelsDirectoryPage() {
  return (
    <Suspense fallback={<HotelsDirectoryFallback />}>
      <HotelsDirectoryContent />
    </Suspense>
  );
}
