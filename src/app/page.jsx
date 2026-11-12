import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Clock,
  Headphones,
  Award,
  ArrowRight,
  Check,
} from "lucide-react";
import { BookingSearchBar } from "@/features/bookings/components/booking-search-bar";
import { HotelGrid } from "@/features/hotels/components/hotel-grid";
import { getAllHotels } from "@/features/hotels/services/mock-hotels.data";
import { POPULAR_DESTINATIONS, VALUE_PROPOSITIONS } from "@/config/constants";
import { TestimonialsSection } from "@/features/reviews/components/testimonials-section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

const SPECIAL_OFFERS = [
  {
    id: "offer-maldives",
    badge: "Island Sanctuary Privilege",
    title: "Complimentary Villa Upgrade & $300 Dining Credit",
    subtitle: "Stay 4 nights or more in our Maldives or Bora Bora lagoon overwater villas.",
    destination: "Maldives & Polynesia",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=900",
    inclusions: [
      "Guaranteed villa upgrade upon check-in",
      "Daily floating champagne breakfast",
      "$300 dining & sommelier cellar credit",
      "Complimentary private speedboat transfer",
    ],
    code: "AURA-LAGOON",
    savings: "Save up to 30%",
    link: "/hotels?destination=Maldives",
  },
  {
    id: "offer-swiss",
    badge: "Alpine Peak Privilege",
    title: "Chalet Escape with Helicopter Transfer",
    subtitle: "Winter and spring luxury chalet stays across Zermatt, St. Moritz & Aspen.",
    destination: "Swiss Alps & Aspen",
    image: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?q=80&w=900",
    inclusions: [
      "Complimentary scenic helipad arrival transfer",
      "Private ski concierge & equipment fitting",
      "In-suite artisanal fondue & rare vintage tasting",
      "Unlimited Alpine thermal wellness access",
    ],
    code: "AURA-ALPINE",
    savings: "Transfer Included",
    link: "/hotels?destination=Switzerland",
  },
  {
    id: "offer-kyoto",
    badge: "Cultural Retreat Privilege",
    title: "Heritage Ryokan & Kaiseki Master Dining",
    subtitle: "Immersive traditional Japanese sanctuary living with geothermal onsens.",
    destination: "Kyoto & Hakone, Japan",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=900",
    inclusions: [
      "Private open-air forest onsen mineral bath",
      "10-course Kaiseki dinner by Master Chef",
      "Traditional tea ceremony & meditation masterclass",
      "Flexible late check-out till 3:00 PM",
    ],
    code: "AURA-ZEN",
    savings: "4th Night Complimentary",
    link: "/hotels?destination=Japan",
  },
];

export default function HomePage() {
  const featuredHotels = getAllHotels().slice(0, 18);

  return (
    <div className="flex flex-col">
      {/* HERO SECTION */}
      <section className="relative flex min-h-[92vh] w-full flex-col items-center justify-center bg-slate-900 pb-20 pt-32 text-center">
        {/* Background Hero Image with Dark Luxury Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2000"
            alt="Luxury Resort Horizon"
            fill
            priority
            className="object-cover object-center brightness-[0.45] saturate-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-black/70" />
        </div>

        {/* Hero Content */}
        <div className="container relative z-20 mx-auto px-4 sm:px-6">


          {/* Main Headline */}
          <h1 className="mx-auto mt-6 max-w-4xl text-3xl font-extrabold tracking-tight text-white sm:text-6xl sm:leading-[1.15]">
            Book Hotels, Resorts & Luxury Stays Across{" "}
            <span className="bg-gradient-to-r from-teal-300 via-emerald-200 to-amber-200 bg-clip-text text-transparent">
              100+ Countries Worldwide
            </span>
          </h1>          

          {/* Interactive Floating Booking Widget */}
          <div className="mt-10 flex justify-center">
            <BookingSearchBar />
          </div>

          {/* Subtitle */}
          <p className="mx-auto mt-6 max-w-2xl text-base text-slate-200 sm:text-lg">
            Compare and reserve verified hotels, luxury resorts, and boutique suites at guaranteed best rates with instant confirmation and 24/7 guest support.
          </p>

          {/* Trust Highlights */}
          <div className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-4">
            <div>
              <p className="text-2xl font-black text-white sm:text-3xl">100+</p>
              <p className="text-xs font-medium text-slate-300">Countries Worldwide</p>
            </div>
            <div>
              <p className="text-2xl font-black text-white sm:text-3xl">5,000+</p>
              <p className="text-xs font-medium text-slate-300">Verified Hotels</p>
            </div>
            <div>
              <p className="text-2xl font-black text-white sm:text-3xl">99.6%</p>
              <p className="text-xs font-medium text-slate-300">Guest Satisfaction</p>
            </div>
            <div>
              <p className="text-2xl font-black text-white sm:text-3xl">24/7</p>
              <p className="text-xs font-medium text-slate-300">Customer Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* POPULAR DESTINATIONS */}
      <section id="destinations" className="py-24 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <Badge variant="default" className="font-semibold text-teal-800">
                Iconic Escapes
              </Badge>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
                Explore World-Renowned Destinations
              </h2>
              <p className="mt-2 text-sm text-slate-500 sm:text-base dark:text-slate-400">
                From cliffside Greek sunsets to quiet Japanese zen gardens and private coral atolls.
              </p>
            </div>
            <Link
              href="/hotels"
              prefetch={true}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-teal-700 hover:text-teal-800 dark:text-teal-400"
            >
              <span>Explore All 38 Destinations</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Destinations Grid */}
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {POPULAR_DESTINATIONS.map((dest) => (
              <Link
                key={dest.id}
                href={`/hotels?destination=${encodeURIComponent(dest.name)}`}
                prefetch={true}
                className="group relative h-80 overflow-hidden rounded-2xl shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl block cursor-pointer"
              >
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

                {/* Top Badge */}
                <div className="absolute left-4 top-4">
                  <span className="rounded-full bg-black/40 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
                    {dest.tag}
                  </span>
                </div>

                {/* Bottom Content */}
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight">
                      {dest.name}
                    </h3>
                    <p className="text-xs text-slate-300">{dest.country}</p>
                    <p className="mt-1 text-xs font-medium text-teal-300">
                      {dest.hotelCount} luxury properties
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-slate-300">From</span>
                    <p className="text-lg font-black text-amber-300">
                      {formatCurrency(dest.startingPrice, dest.currency || "USD")}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED HOTELS SECTION */}
      <section id="featured-hotels" className="py-24 bg-slate-50 dark:bg-slate-950">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="luxury" className="font-semibold">
              Handpicked Hotels & Resorts
            </Badge>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
              Featured Luxury Accommodations
            </h2>
            <p className="mt-2 text-sm text-slate-500 sm:text-base dark:text-slate-400">
              Each retreat has been visited and audited by our hospitality curators to meet exceptional luxury standards.
            </p>
          </div>

          <div className="mt-12">
            <HotelGrid initialHotels={featuredHotels} />
          </div>
        </div>
      </section>

      {/* SPECIAL CURATED OFFERS SHOWCASE */}
      <section id="special-offers" className="py-24 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <Badge variant="luxury" className="font-semibold">
                Privileged Escapes & Packages
              </Badge>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
                Curated Seasonal Privileges
              </h2>
              <p className="mt-2 text-sm text-slate-500 sm:text-base dark:text-slate-400 max-w-2xl">
                Bespoke luxury stays packaged with complimentary room upgrades, Michelin-inspired dining credits, and private chartered transfers.
              </p>
            </div>
            <Link
              href="/hotels"
              prefetch={true}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-teal-700 hover:text-teal-800 dark:text-teal-400"
            >
              <span>View All Qualifying Villas</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {SPECIAL_OFFERS.map((offer) => (
              <div
                key={offer.id}
                className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-950"
              >
                {/* Visual Header */}
                <div className="relative h-60 w-full overflow-hidden">
                  <Image
                    src={offer.image}
                    alt={offer.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />
                  
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-amber-300 border border-amber-300/30">
                      {offer.badge}
                    </span>
                    <span className="rounded-full bg-teal-900/80 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-bold text-white border border-teal-500/40">
                      {offer.savings}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="text-[11px] font-medium uppercase tracking-wider text-teal-200">
                      {offer.destination}
                    </span>
                  </div>
                </div>

                {/* Offer Details */}
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors">
                      {offer.title}
                    </h3>
                    <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {offer.subtitle}
                    </p>

                    {/* Inclusions List */}
                    <div className="mt-5 space-y-2 border-t border-slate-100 dark:border-slate-800/80 pt-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Package Inclusions:
                      </span>
                      {offer.inclusions.map((inc, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                          <Check className="h-3.5 w-3.5 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" strokeWidth={2.4} />
                          <span className="leading-tight">{inc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Promo Code & Action */}
                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                        Offer Code
                      </span>
                      <code className="text-xs font-mono font-bold text-slate-900 dark:text-teal-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md mt-0.5 border border-slate-200 dark:border-slate-700">
                        {offer.code}
                      </code>
                    </div>

                    <Link
                      href={offer.link}
                      prefetch={true}
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#031256] px-4 py-2 text-xs font-bold text-white transition-transform hover:scale-105 active:scale-95 shadow-sm dark:bg-teal-600 dark:hover:bg-teal-500"
                    >
                      <span>Explore Stay</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE AURALUXE */}
      <section id="why-choose-us" className="py-24 bg-slate-50 dark:bg-slate-950">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="default" className="font-semibold text-teal-800">
              The AuraLuxe Difference
            </Badge>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
              Hospitality Elevated to an Art Form
            </h2>
            <p className="mt-2 text-sm text-slate-500 sm:text-base dark:text-slate-400">
              We eliminate the uncertainty from travel reservations so you can focus entirely on the moments that matter.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {VALUE_PROPOSITIONS.map((prop, idx) => {
              const IconComponent =
                idx === 0
                  ? ShieldCheck
                  : idx === 1
                    ? Clock
                    : idx === 2
                      ? Award
                      : Headphones;

              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200/80 bg-white p-7 shadow-sm transition-all duration-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300">
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-slate-100">
                    {prop.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                    {prop.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <TestimonialsSection />

      {/* VIP CLUB / MOBILE APP CTA */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 items-center gap-12 rounded-3xl border border-slate-200 bg-slate-50 p-8 sm:p-12 lg:grid-cols-2 dark:border-slate-800 dark:bg-slate-950/80">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-teal-700 dark:text-teal-400">
                Personalized Digital Concierge
              </span>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
                Manage Stays, Order In-Room Dining & Chat with Concierge
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                Unlock instant keyless mobile room check-in, real-time villa butler messaging, customized pillow menus, and private yacht bookings directly from your handheld device.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button size="lg" className="bg-slate-900 text-white hover:bg-black dark:bg-white dark:text-slate-900">
                  Download on iOS
                </Button>
                <Button size="lg" variant="outline">
                  Download on Android
                </Button>
              </div>
            </div>

            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000"
                alt="Luxury Hotel Service"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

