"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Star, MapPin, Heart, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { isHotelSaved, toggleSavedHotel } from "@/lib/storage/wishlist";

export function HotelCard({ hotel }) {
  const hotelId = hotel.slug || hotel.id;
  const searchParams = useSearchParams();
  const queryString = searchParams?.toString();
  const hotelHref = queryString ? `/hotels/${hotelId}?${queryString}` : `/hotels/${hotelId}`;

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(isHotelSaved(hotelId));
    const handleWishlistChange = () => {
      setIsFavorite(isHotelSaved(hotelId));
    };
    window.addEventListener("auraluxe_wishlist_change", handleWishlistChange);
    return () => {
      window.removeEventListener("auraluxe_wishlist_change", handleWishlistChange);
    };
  }, [hotelId]);
  const image =
    hotel.featuredImage ||
    (hotel.gallery && hotel.gallery[0]) ||
    (hotel.images && hotel.images[0]) ||
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200";

  const city = hotel.cityName || hotel.location?.city || "";
  const country = hotel.countryName || hotel.location?.country || "";
  const locationText = [city, country].filter(Boolean).join(", ") || "Luxury Destination";

  const startingPrice = hotel.startingPrice || hotel.pricePerNight || 3500;
  const currency = hotel.currency || "INR";
  const badge = hotel.badge || hotel.theme || "Luxury Stay";
  const stars = hotel.stars || 5;
  const rating = hotel.rating || 4.8;
  const reviewCount = hotel.reviewCount || 120;
  const amenities = hotel.amenities || [];
  const tagline = hotel.tagline || `${stars}-Star luxury hotel in ${city}`;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
      {/* Image Container with Badges */}
      <Link href={hotelHref} prefetch={true} className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-slate-800 block">
        <Image
          src={image}
          alt={hotel.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Top Badges */}
        <div className="absolute left-3.5 top-3.5 flex items-center gap-2">
          {badge && (
            <Badge
              variant="luxury"
              className="font-medium shadow-sm backdrop-blur-md"
            >
              {badge}
            </Badge>
          )}
        </div>

        {/* Location pill */}
        <div className="absolute bottom-3 left-3.5 flex items-center gap-1.5 text-xs font-medium text-white/95">
          <MapPin className="h-3.5 w-3.5 text-teal-400" />
          <span className="truncate max-w-[240px]">
            {locationText}
          </span>
        </div>
      </Link>

      {/* Wishlist Button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          const nextState = toggleSavedHotel(hotel);
          setIsFavorite(nextState);
        }}
        aria-label="Save to wishlist"
        className="absolute right-3.5 top-3.5 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 backdrop-blur-md transition-colors hover:bg-white dark:bg-slate-900/80 dark:hover:bg-slate-900 shadow-sm"
      >
        <Heart
          className={`h-4 w-4 transition-colors ${
            isFavorite
              ? "fill-rose-500 text-rose-500"
              : "text-slate-700 dark:text-slate-200"
          }`}
        />
      </button>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Rating and Reviews */}
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-1 rounded-md bg-teal-50 px-2 py-0.5 text-xs font-semibold text-teal-800 dark:bg-teal-950 dark:text-teal-300">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <span>{rating}</span>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              ({reviewCount} reviews)
            </span>
          </div>

          <div className="flex text-amber-400">
            {Array.from({ length: Math.min(stars, 5) }).map((_, i) => (
              <Star key={i} className="h-3 w-3 fill-current" />
            ))}
          </div>
        </div>

        {/* Hotel Name & Tagline */}
        <Link href={hotelHref}>
          <h3 className="line-clamp-1 text-lg font-bold text-slate-900 transition-colors group-hover:text-teal-700 dark:text-slate-100 dark:group-hover:text-teal-400">
            {hotel.name}
          </h3>
        </Link>
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
          {tagline}
        </p>

        {/* Key Amenities Preview */}
        <div className="my-4 flex flex-wrap gap-1.5">
          {amenities.slice(0, 3).map((amenity, idx) => (
            <span
              key={idx}
              className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-[11px] text-slate-600 dark:bg-slate-800 dark:text-slate-300"
            >
              {amenity}
            </span>
          ))}
          {amenities.length > 3 && (
            <span className="inline-flex items-center text-[11px] text-slate-400">
              +{amenities.length - 3} more
            </span>
          )}
        </div>

        <div className="mt-auto border-t border-slate-100 pt-3.5 dark:border-slate-800">
          <div className="flex items-center justify-between gap-2.5">
            <div className="min-w-0 flex-1">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Starting from
              </span>
              <div className="mt-0.5 flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
                <span className="whitespace-nowrap text-lg font-extrabold text-teal-900 sm:text-xl dark:text-teal-300">
                  {formatCurrency(startingPrice, currency)}
                </span>
                {hotel.originalPricePerNight && (
                  <span className="whitespace-nowrap text-[11px] text-slate-400 line-through">
                    {formatCurrency(hotel.originalPricePerNight, currency)}
                  </span>
                )}
                <span className="whitespace-nowrap text-[11px] font-medium text-slate-500">
                  / night
                </span>
              </div>
            </div>

            <Link href={hotelHref} prefetch={true} className="shrink-0">
              <Button
                size="sm"
                variant="default"
                className="h-9 shrink-0 gap-1 px-3.5 text-xs font-semibold shadow-sm"
              >
                <span>Explore Stay</span>
                <ArrowRight className="h-3.5 w-3.5 shrink-0" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

