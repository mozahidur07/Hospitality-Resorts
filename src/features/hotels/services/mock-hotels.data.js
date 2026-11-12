import { ALL_HOTELS } from "@/data/hotels/index";

export const MOCK_HOTELS = [
  {
    id: "hotel-1",
    slug: "azure-mirage-santorini",
    name: "Azure Mirage Caldera Suites",
    tagline: "Infinity cliffside luxury overlooking the Aegean Sea",
    description:
      "Perched on Oia's volcanic cliffs, Azure Mirage offers cave suites carved into the rocks, private heated infinity plunge pools, and uninterrupted sunset panoramas. Enjoy candlelit private veranda dining, sommelier-curated Santorini wine flights, and dedicated round-the-clock VIP butler attention.",
    category: "beachfront",
    location: {
      city: "Oia, Santorini",
      country: "Greece",
      address: "Cliffside Caldera Walk 42",
      latitude: 36.4618,
      longitude: 25.3753,
    },
    stars: 5,
    rating: 4.96,
    reviewCount: 428,
    pricePerNight: 580,
    originalPricePerNight: 720,
    currency: "USD",
    images: [
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1200",
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1200",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200",
    ],
    featured: true,
    badge: "Most Popular",
    amenities: [
      "Private Heated Plunge Pool",
      "Caldera Sunset View",
      "Complimentary High-Speed Wi-Fi",
      "Spa & Hydrotherapy Cavity",
      "Gourmet Champagne Breakfast",
      "Private Airport Chauffeur",
      "24/7 Personal Butler",
      "Nespresso Coffee Bar",
    ],
    rooms: [
      {
        id: "room-1-1",
        name: "Cliffside Cave Honeymoon Suite",
        bedType: "1 King Bed",
        maxGuests: 2,
        pricePerNight: 580,
        availableRooms: 3,
        amenities: ["Private Jacuzzi Plunge Pool", "Aegean Sea Panorama", "Espresso Machine", "Marble Bath"],
        images: ["https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=800"],
      },
      {
        id: "room-1-2",
        name: "Grand Caldera Infinity Pool Villa",
        bedType: "2 King Beds",
        maxGuests: 4,
        pricePerNight: 950,
        availableRooms: 2,
        amenities: ["Private 8m Heated Infinity Pool", "Wraparound Sunset Terrace", "Butler Kitchen", "Sound System"],
        images: ["https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800"],
      },
    ],
  },
  {
    id: "hotel-2",
    slug: "velaa-overwater-haven",
    name: "The Velaa Overwater Sanctuary",
    tagline: "Private turquoise lagoon villas with glass floor ocean viewing",
    description:
      "An exclusive coral atoll sanctuary featuring secluded overwater villas, Michelin-starred dining under the stars, and underwater spa treatments. Direct lagoon swim-up ladders, private catamaran excursions, and vibrant marine reef sanctuaries right outside your bedroom door.",
    category: "luxury-resort",
    location: {
      city: "Noonu Atoll",
      country: "Maldives",
      address: "Private Atoll Isle 09",
    },
    stars: 5,
    rating: 4.98,
    reviewCount: 312,
    pricePerNight: 980,
    originalPricePerNight: 1250,
    currency: "USD",
    images: [
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1200",
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=1200",
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1200",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1200",
    ],
    featured: true,
    badge: "Exclusive Retreat",
    amenities: [
      "Overwater Bungalow",
      "Glass Floor Lagoon Viewing",
      "Private Island Butler",
      "House Coral Snorkeling Reef",
      "Seaplane & Helipad Access",
      "All-Inclusive Michelin Dining",
      "Overwater Net Hammocks",
    ],
    rooms: [
      {
        id: "room-2-1",
        name: "Sunset Overwater Bungalow",
        bedType: "1 Grand King Bed",
        maxGuests: 2,
        pricePerNight: 980,
        availableRooms: 4,
        amenities: ["Private Lagoon Access", "Sunken Ocean Living Room", "Freshwater Plunge Pool", "Outdoor Rainfall Shower"],
        images: ["https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=800"],
      },
      {
        id: "room-2-2",
        name: "Two-Bedroom Ocean Residence",
        bedType: "2 King Beds + Daybed",
        maxGuests: 5,
        pricePerNight: 1650,
        availableRooms: 1,
        amenities: ["Private Chef & Butler", "Curved Water Slide into Lagoon", "Cinema Projector", "Yacht Mooring"],
        images: ["https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=800"],
      },
    ],
  },
  {
    id: "hotel-3",
    slug: "the-matterhorn-chalet-spa",
    name: "The Matterhorn Crest Alpine Spa",
    tagline: "Ultra-luxury ski-in/ski-out chalet with heated cedar hot tubs",
    description:
      "Nestled in the pristine Swiss Alps with unobstructed Matterhorn peaks, combining Swiss pine architecture with modern alpine minimalism. Indulge in private après-ski fondue fireplaces, glacier view Finnish saunas, and premier ski rental concierges.",
    category: "mountain-lodge",
    location: {
      city: "Zermatt",
      country: "Switzerland",
      address: "Alpenstrasse 104",
    },
    stars: 5,
    rating: 4.92,
    reviewCount: 215,
    pricePerNight: 640,
    currency: "USD",
    images: [
      "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=1200",
      "https://images.unsplash.com/photo-1517840905240-472988babdf9?q=80&w=1200",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200",
    ],
    featured: true,
    badge: "Alpine Gem",
    amenities: [
      "Direct Ski-in / Ski-out Access",
      "Outdoor Heated Cedar Tub",
      "Finnish Pine Sauna",
      "Stone Open Fireplace",
      "Alpine Michelin Dining",
      "Heated Ski Equipment Boot Room",
      "Swiss Grand Cru Wine Cellar",
    ],
    rooms: [
      {
        id: "room-3-1",
        name: "Matterhorn Glacier Suite",
        bedType: "1 Alpine King Bed",
        maxGuests: 2,
        pricePerNight: 640,
        availableRooms: 3,
        amenities: ["Wood Burning Fireplace", "Panoramic Peak Balcony", "Steam Shower", "Ski Butler"],
        images: ["https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=800"],
      },
    ],
  },
  {
    id: "hotel-4",
    slug: "aman-kyoto-bamboo-retreat",
    name: "Komorebi Bamboo Forest Ryokan",
    tagline: "Hidden zen gardens, natural onsen waters, and Kaiseki gastronomy",
    description:
      "Set amidst 72 acres of secret cedar and moss forests in historical Kyoto, offering tranquil natural hot springs and traditional architectural serenity. Experience silent morning meditation ceremonies with local Buddhist masters and multi-course seasonal Kaiseki dining.",
    category: "heritage-villas",
    location: {
      city: "Kyoto",
      country: "Japan",
      address: "Kita-ku Oshima 12",
    },
    stars: 5,
    rating: 4.95,
    reviewCount: 380,
    pricePerNight: 750,
    currency: "USD",
    images: [
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200",
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1200",
      "https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=1200",
    ],
    featured: false,
    badge: "Zen Sanctuary",
    amenities: [
      "Natural Mineral Hot Spring (Onsen)",
      "Traditional Tea Ceremony Pavilion",
      "Authentic Kaiseki Breakfast",
      "Private Moss Garden View",
      "Japanese Hinoki Cypress Bath",
      "Meditation & Calligraphy Master",
    ],
    rooms: [
      {
        id: "room-4-1",
        name: "Hinoki Forest Pavillion",
        bedType: "Traditional Silk Futon / King",
        maxGuests: 2,
        pricePerNight: 750,
        availableRooms: 2,
        amenities: ["Private Outdoor Onsen Bath", "Tatami Living Room", "Yukata Kimono Robes", "Green Tea Ceremony Set"],
        images: ["https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800"],
      },
    ],
  },
  {
    id: "hotel-5",
    slug: "palazzo-venezia-grand-canal",
    name: "Palazzo di Grand Canal",
    tagline: "16th-century Renaissance palace on Venice's majestic waterway",
    description:
      "Restored Venetian palazzo with original Tiepolo frescoes, private gondola moorings, and Murano glass chandeliers overlooking the Grand Canal. Located steps from St. Mark's Square with private water taxi docking right at the marble palace doors.",
    category: "boutique-city",
    location: {
      city: "Venice",
      country: "Italy",
      address: "Fondamenta San Polo 418",
    },
    stars: 5,
    rating: 4.89,
    reviewCount: 194,
    pricePerNight: 820,
    originalPricePerNight: 950,
    currency: "USD",
    images: [
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=1200",
      "https://images.unsplash.com/photo-1523906834658-6e25def2486f?q=80&w=1200",
    ],
    featured: false,
    badge: "Historic Prestige",
    amenities: [
      "Private Water Taxi Dock",
      "Rooftop Sunset Canal Terrace",
      "Personal Butler Service",
      "Grand Canal Water View Suites",
      "Private Fine Art Gallery Access",
      "Venetian Bellini Welcome Bar",
    ],
    rooms: [
      {
        id: "room-5-1",
        name: "Doge Presidential Suite",
        bedType: "1 Venetian Canopy King",
        maxGuests: 2,
        pricePerNight: 820,
        availableRooms: 2,
        amenities: ["Direct Grand Canal Balcony", "18th-century Fresco Ceiling", "Murano Glass Chandeliers", "Italian Carrara Bath"],
        images: ["https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=800"],
      },
    ],
  },
  {
    id: "hotel-6",
    slug: "ubud-valley-hanging-villas",
    name: "Ubud Rainforest Canopy Villas",
    tagline: "Multi-tiered infinity pools overlooking lush tropical jungle valleys",
    description:
      "Eco-luxury sanctuary elevated above the Ayung River valley in Bali, offering suspended treehouse villas, Ayurvedic detox spas, and morning yoga. Breathe the purest jungle air while swimming in heated infinity pools cantilevered over the tropical canopy.",
    category: "beachfront",
    location: {
      city: "Ubud, Bali",
      country: "Indonesia",
      address: "Jalan Raya Buahan, Payangan",
    },
    stars: 5,
    rating: 4.93,
    reviewCount: 512,
    pricePerNight: 390,
    originalPricePerNight: 480,
    currency: "USD",
    images: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1200",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1200",
    ],
    featured: true,
    badge: "Eco Luxury",
    amenities: [
      "Multi-Tiered Cantilevered Infinity Pool",
      "Holistic Ayurvedic Wellness Spa",
      "Floating Flower Breakfast",
      "Private Jungle Trekking Guide",
      "Tibetan Sound Healing Pavilion",
      "Organic Farm-to-Table Gastronomy",
    ],
    rooms: [
      {
        id: "room-6-1",
        name: "Valley Canopy Pool Villa",
        bedType: "1 Teak King Bed",
        maxGuests: 2,
        pricePerNight: 390,
        availableRooms: 5,
        amenities: ["Private Jungle Plunge Pool", "Outdoor Terrazzo Soaking Tub", "Ayung River Gorge View", "Daybed Pavillion"],
        images: ["https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800"],
      },
    ],
  },
];

/**
 * Normalizes any hotel data object (from modular ALL_HOTELS or legacy MOCK_HOTELS)
 * to ensure 100% component compatibility across all views without undefined errors.
 */
export function normalizeHotel(h) {
  if (!h) return null;
  const id = h.id || h.slug;
  const slug = h.slug || h.id;
  const cityName = h.cityName || h.location?.city || "Destination";
  const stateName = h.stateName || "";
  const countryName = h.countryName || h.location?.country || "";
  const address =
    h.address ||
    h.location?.address ||
    `${cityName}${stateName ? `, ${stateName}` : ""}${countryName ? `, ${countryName}` : ""}`;

  const baseImgs =
    h.gallery && h.gallery.length > 0
      ? h.gallery
      : h.images && h.images.length > 0
      ? h.images
      : [h.featuredImage || "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200"];

  const fillerPhotos = [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200",
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200",
    "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=1200",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200",
    "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1200",
  ];

  // Guarantee at least 5 images for clean, gap-free gallery layouts
  const images = [...baseImgs, ...fillerPhotos].slice(0, Math.max(5, baseImgs.length));

  const featuredImage = h.featuredImage || images[0];
  const rawRooms = Array.isArray(h.rooms) && h.rooms.length > 0 ? h.rooms : [];

  // Strict Synchronization: startingPrice and lowest room rate must be 100% identical
  const baseStarting = h.startingPrice || h.pricePerNight || 750;
  const lowestRoomPrice = rawRooms.length > 0
    ? Math.min(...rawRooms.map((r) => Number(r.price || r.pricePerNight || baseStarting)))
    : baseStarting;

  const startingPrice = lowestRoomPrice;
  const currency = h.currency || "INR";

  const rooms = rawRooms.map((r, idx) => {
    // Room 0 is always guaranteed to match the exact card starting rate
    const roomPrice = idx === 0 ? startingPrice : Number(r.price || r.pricePerNight || startingPrice);
    return {
      id: r.id || `${id}-room-${idx + 1}`,
      name: r.name || "Luxury Deluxe Suite",
      price: roomPrice,
      pricePerNight: roomPrice,
      currency: r.currency || currency,
      bedType: r.bedType || "1 King Bed",
      maxGuests: r.maxGuests || 2,
      availableRooms: r.availableRooms || 4,
      images:
        r.images && r.images.length > 0
          ? r.images
          : [images[idx % images.length] || featuredImage],
      amenities:
        r.amenities && r.amenities.length > 0
          ? r.amenities
          : [
              "Complimentary Wi-Fi",
              "King Bed with Egyptian Cotton",
              "Rain Shower & Luxury Bath",
              "Artisan Coffee & Tea Maker",
            ],
    };
  });

  return {
    ...h,
    id,
    slug,
    name: h.name,
    tagline: h.tagline || `${h.stars || 5}-Star Luxury Sanctuary in ${cityName}`,
    description:
      h.description ||
      `${h.name} welcomes you with exceptional luxury, world-class dining, and tailored guest hospitality situated in the heart of ${cityName}.`,
    category: h.category || "Luxury Resort",
    theme: h.theme || "Heritage & Luxury",
    cityId: h.cityId || "",
    cityName,
    stateName,
    countryName,
    address,
    location: {
      city: cityName,
      country: countryName,
      address,
      latitude: h.location?.latitude || null,
      longitude: h.location?.longitude || null,
    },
    images,
    gallery: images,
    featuredImage,
    stars: h.stars || 5,
    rating: h.rating || 4.8,
    reviewCount: h.reviewCount || 140,
    startingPrice,
    pricePerNight: startingPrice,
    originalPricePerNight:
      h.originalPricePerNight || Math.round(startingPrice * 1.25),
    currency,
    badge: h.badge || h.theme || "5-Star Luxury",
    amenities:
      h.amenities && h.amenities.length > 0
        ? h.amenities
        : [
            "Infinity Swimming Pool",
            "Full Service Luxury Spa",
            "Michelin-Inspired Dining",
            "24/7 Dedicated Concierge",
            "Airport Chauffeur Service",
            "Complimentary High-Speed Wi-Fi",
          ],
    rooms,
  };
}

// Global in-memory cache to guarantee 0ms instant route switching
let memoizedAllHotels = null;
const hotelSlugCache = new Map();

export function getAllHotels() {
  if (!memoizedAllHotels) {
    const combined = [...ALL_HOTELS, ...MOCK_HOTELS];
    memoizedAllHotels = combined.map(normalizeHotel);
  }
  return memoizedAllHotels;
}

export function getHotelBySlug(slug) {
  if (!slug) return null;
  const decoded = decodeURIComponent(slug).toLowerCase().trim();

  if (hotelSlugCache.has(decoded)) {
    return hotelSlugCache.get(decoded);
  }

  const all = getAllHotels();
  const found = all.find(
    (hotel) =>
      (hotel.id && hotel.id.toLowerCase() === decoded) ||
      (hotel.slug && hotel.slug.toLowerCase() === decoded)
  );

  const result = found || null;
  hotelSlugCache.set(decoded, result);
  return result;
}


 