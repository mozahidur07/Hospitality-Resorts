"use client";

import React, { useState } from "react";
import { HotelCard } from "./hotel-card";
import { HotelCategoryTabs } from "./hotel-category-tabs";
import { Button } from "@/components/ui/button";

export function HotelGrid({ initialHotels }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [visibleCount, setVisibleCount] = useState(18);

  const filteredHotels =
    selectedCategory === "all"
      ? initialHotels
      : initialHotels.filter((hotel) => {
          const cat = (hotel.category || "").toLowerCase();
          const theme = (hotel.theme || "").toLowerCase();
          switch (selectedCategory) {
            case "luxury-resort":
              return (
                cat.includes("resort") ||
                theme.includes("resort") ||
                cat === "luxury-resort" ||
                cat.includes("5-star")
              );
            case "beachfront":
              return (
                theme.includes("beach") ||
                theme.includes("coastal") ||
                theme.includes("lagoon") ||
                theme.includes("overwater") ||
                cat === "beachfront"
              );
            case "mountain-lodge":
              return (
                theme.includes("mountain") ||
                theme.includes("valley") ||
                theme.includes("alpine") ||
                cat === "mountain-lodge"
              );
            case "boutique-city":
              return (
                theme.includes("city") ||
                theme.includes("skyview") ||
                cat.includes("boutique") ||
                cat.includes("business") ||
                cat === "boutique-city"
              );
            case "heritage-villas":
              return (
                theme.includes("heritage") ||
                theme.includes("palace") ||
                cat.includes("heritage") ||
                cat === "heritage-villas"
              );
            default:
              return cat === selectedCategory || cat.includes(selectedCategory);
          }
        });

  const displayedHotels = filteredHotels.slice(0, visibleCount);

  return (
    <div className="space-y-8">
      {/* Category Tabs */}
      <HotelCategoryTabs
        activeCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setVisibleCount(18);
        }}
      />

      {/* Grid */}
      {filteredHotels.length === 0 ? (
        <div className="flex min-h-[260px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 p-8 text-center dark:border-slate-800">
          <p className="text-base font-semibold text-slate-700 dark:text-slate-300">
            No accommodations found in this category
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Try choosing another category or explore all stays.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("all");
              setVisibleCount(18);
            }}
            className="mt-4 text-sm font-semibold text-teal-700 hover:underline dark:text-teal-400"
          >
            Reset Category Filter
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {displayedHotels.map((hotel) => (
              <HotelCard key={hotel.id || hotel.slug} hotel={hotel} />
            ))}
          </div>

          {/* Load More Button */}
          {filteredHotels.length > visibleCount && (
            <div className="mt-12 flex flex-col items-center justify-center gap-2">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setVisibleCount((prev) => prev + 18)}
                className="rounded-full px-8 py-3 text-xs font-bold uppercase tracking-wider text-slate-800 border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Load More Hotels ({displayedHotels.length} of {filteredHotels.length})
              </Button>
              <span className="text-[11px] text-slate-400">
                Displaying luxury verified stays
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
}

