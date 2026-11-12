import React from "react";
import Image from "next/image";
import { Star, CheckCircle2 } from "lucide-react";

const TESTIMONIALS = [
  {
    id: "test-1",
    userName: "Elena Rostova",
    userRole: "Design Director, Milan",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300",
    hotelStayed: "Azure Mirage Caldera Suites, Santorini",
    rating: 5,
    quote:
      "The reservation process was seamless from start to finish. The cliffside plunge pool and sunrise champagne breakfast arranged by the concierge team was an unforgettable experience.",
  },
  {
    id: "test-2",
    userName: "Marcus Vance",
    userRole: "Tech Founder & Angel Investor",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300",
    hotelStayed: "The Velaa Overwater Sanctuary, Maldives",
    rating: 5,
    quote:
      "AuraLuxe is in a league of its own. Complete privacy, glass floor villa views, and our personal butler was attentive to every detail before we even landed on the private island.",
  },
  {
    id: "test-3",
    userName: "Sophia Chen",
    userRole: "Architect & Travel Writer",
    avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=300",
    hotelStayed: "The Matterhorn Crest Alpine Spa, Zermatt",
    rating: 5,
    quote:
      "Waking up to the Matterhorn framed through floor-to-ceiling glass while the cedar hot tub was steaming—pure alpine perfection. We are already booking our next winter stay.",
  },
];

export function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden py-20 bg-slate-50 dark:bg-slate-950/50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-3.5 py-1 text-xs font-semibold text-teal-800 dark:bg-teal-950/60 dark:text-teal-300">
            <CheckCircle2 className="h-3.5 w-3.5 text-teal-600" />
            <span>Verified Luxury Experiences</span>
          </div>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
            Cherished by Discerning Travelers
          </h2>
          <p className="mt-3 text-sm text-slate-500 sm:text-base dark:text-slate-400">
            Read candid thoughts from global travelers who trust AuraLuxe for their most precious holiday escapes.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-7 shadow-sm transition-all duration-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
            >
              <div>
                {/* Rating */}
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>

                {/* Quote */}
                <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  “{item.quote}”
                </p>
              </div>

              {/* Author & Hotel */}
              <div className="mt-6 border-t border-slate-100 pt-5 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="relative h-11 w-11 overflow-hidden rounded-full ring-2 ring-teal-600/20">
                    <Image
                      src={item.avatarUrl}
                      alt={item.userName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      {item.userName}
                    </h4>
                    <p className="text-xs text-slate-400">{item.userRole}</p>
                    <p className="text-[11px] font-medium text-teal-700 dark:text-teal-400">
                      Stayed at {item.hotelStayed}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

