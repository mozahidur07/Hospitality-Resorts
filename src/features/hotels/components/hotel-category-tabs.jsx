"use client";

import React from "react";
import { HOTEL_CATEGORIES } from "@/config/constants";
import { cn } from "@/lib/utils";

export function HotelCategoryTabs({
  activeCategory,
  onSelectCategory,
}) {
  return (
    <div className="flex w-full items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
      {HOTEL_CATEGORIES.map((cat) => {
        const isActive = activeCategory === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={cn(
              "flex-shrink-0 rounded-full px-5 py-2.5 text-xs font-semibold transition-all duration-200",
              isActive
                ? "bg-teal-700 text-white shadow-md shadow-teal-700/20"
                : "border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
            )}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}

