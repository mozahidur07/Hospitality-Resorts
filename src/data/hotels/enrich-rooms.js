const fs = require('fs');
const path = require('path');

// Curated high quality interior room photos from Unsplash
const ROOM_IMAGES = {
  deluxe: [
    "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1000",
    "https://images.unsplash.com/photo-1591088398332-8a7791972843?q=80&w=1000",
    "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1000"
  ],
  executive: [
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1000",
    "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1000",
    "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=1000"
  ],
  suite: [
    "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1000",
    "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=1000",
    "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1000"
  ]
};

// Generates 3 realistic room types for a given hotel
function generateRoomsForHotel(hotel) {
  const isWB = hotel.stateName === "West Bengal";
  const basePrice = isWB 
    ? (Math.floor(Math.random() * 8) * 50 + 750) // ₹750 - ₹1,150 for West Bengal budget/standard entry
    : hotel.startingPrice;

  const isMountain = hotel.theme?.includes("Mountain") || hotel.name?.includes("Darjeeling") || hotel.name?.includes("Kalimpong") || hotel.name?.includes("Lonavala");
  const isBeach = hotel.theme?.includes("Beach") || hotel.name?.includes("Digha") || hotel.name?.includes("Goa") || hotel.name?.includes("Maldives") || hotel.name?.includes("Nice");
  const isHeritage = hotel.theme?.includes("Heritage") || hotel.name?.includes("Palace") || hotel.name?.includes("Haveli") || hotel.name?.includes("Grand");

  // Room 1: Budget / Standard / Deluxe (In West Bengal guaranteed ₹500 - ₹1,150)
  const room1Name = isWB 
    ? (isMountain ? "Standard Mountain View Room" : isBeach ? "Standard Beachside AC Room" : "Standard Comfort AC Room")
    : (isMountain ? "Deluxe Pine Forest View Room" : isBeach ? "Deluxe Coastal Garden Room" : isHeritage ? "Heritage Classic Room" : "Deluxe King City View");
  
  const room1Price = isWB ? Math.min(basePrice, 950) : basePrice;

  const room1 = {
    id: `${hotel.id}-rm-01`,
    name: room1Name,
    price: room1Price,
    bedType: "1 Queen Bed or 2 Twin Beds",
    maxGuests: 2,
    availableRooms: 4 + (Math.floor(Math.random() * 4)),
    images: [ROOM_IMAGES.deluxe[0], ROOM_IMAGES.deluxe[1]],
    amenities: [
      "High-Speed Wi-Fi",
      "LED Smart TV",
      "Private Attached Bathroom",
      "Air Conditioning / Climate Control",
      "Artisan Coffee & Tea Maker",
      "Daily Housekeeping"
    ]
  };

  // Room 2: Executive / Premier Suite (In West Bengal guaranteed ₹1,100 - ₹1,450)
  const room2Name = isWB
    ? (isMountain ? "Deluxe Valley Balcony Room" : isBeach ? "Deluxe Sea Breeze Room" : "Executive Premier AC Room")
    : (isMountain ? "Panoramic Valley View Suite" : isBeach ? "Oceanfront Balcony Suite" : isHeritage ? "Royal Haveli Courtyard Suite" : "Executive Premier Suite");
  
  const room2Price = isWB
    ? Math.min(Math.round((basePrice * 1.35) / 50) * 50, 1450)
    : Math.round((basePrice * 1.5) / 50) * 50;

  const room2 = {
    id: `${hotel.id}-rm-02`,
    name: room2Name,
    price: room2Price,
    bedType: "1 King Size Master Bed",
    maxGuests: 3,
    availableRooms: 3 + (Math.floor(Math.random() * 3)),
    images: [ROOM_IMAGES.executive[0], ROOM_IMAGES.executive[1]],
    amenities: [
      "Private Scenic Balcony",
      "Separate Living & Lounge Area",
      "Espresso Pod Machine",
      "Deep-Soaking Bathtub & Robes",
      "Complimentary Breakfast",
      "Priority Check-in"
    ]
  };

  // Room 3: Presidential / Signature Villa
  const room3Name = isMountain ? "Signature Alpine Chalet with Fireplace" : isBeach ? "Private Pool Beachfront Villa" : isHeritage ? "Imperial Maharaja Presidential Suite" : "Presidential Skyline Penthouse";
  const room3Price = isWB
    ? Math.round((basePrice * 2.2) / 100) * 100 // ₹1,800 - ₹2,800
    : Math.round((basePrice * 2.2) / 100) * 100;

  const room3 = {
    id: `${hotel.id}-rm-03`,
    name: room3Name,
    price: room3Price,
    bedType: "1 Emperor Bed + Daybed",
    maxGuests: 4,
    availableRooms: 2 + (Math.floor(Math.random() * 2)),
    images: [ROOM_IMAGES.suite[0], ROOM_IMAGES.suite[1], ROOM_IMAGES.suite[2]],
    amenities: [
      "Private Plunge Pool / Outdoor Terrace",
      "Dedicated 24/7 Personal Butler Service",
      "Marble Bathroom with Jacuzzi",
      "Complimentary Luxury Airport Transfers",
      "Stocked Gourmet Mini-Bar (Daily Refill)",
      "In-Suite Chef Breakfast & Sunset Hi-Tea"
    ]
  };

  return [room1, room2, room3];
}

// Function to correct any previous pricing overflow, ensure 5 gallery images, and enrich with rooms
function enrichHotelDataset(hotels, realisticPriceBounds) {
  return hotels.map((hotel) => {
    const isWB = hotel.stateName === "West Bengal";
    const minP = realisticPriceBounds[0];
    const maxP = realisticPriceBounds[1];

    let price = isWB
      ? (Math.floor(Math.random() * 8) * 50 + 750) // ₹750 - ₹1,150
      : (Math.round((minP + Math.random() * (maxP - minP)) / 100) * 100);

    // Ensure at least 5 gallery images for perfect gap-free grid
    const gallery = [
      hotel.featuredImage || ROOM_IMAGES.deluxe[0],
      ROOM_IMAGES.deluxe[0],
      ROOM_IMAGES.deluxe[1],
      ROOM_IMAGES.executive[0],
      ROOM_IMAGES.suite[0],
    ];

    const updatedHotel = {
      ...hotel,
      startingPrice: price,
      gallery,
    };

    const rooms = generateRoomsForHotel(updatedHotel);
    // Explicitly guarantee startingPrice strictly matches room 1 price:
    updatedHotel.startingPrice = rooms[0].price;
    updatedHotel.rooms = rooms;
    return updatedHotel;
  });
}

// Process each hotel file with realistic, averaged pricing
const targetFiles = [
  { file: 'india/west-bengal.hotels.js', exportName: 'WEST_BENGAL_HOTELS', bounds: [750, 1450] },
  { file: 'india/maharashtra.hotels.js', exportName: 'MAHARASHTRA_HOTELS', bounds: [1600, 3800] },
  { file: 'india/goa.hotels.js', exportName: 'GOA_HOTELS', bounds: [1500, 3500] },
  { file: 'india/rajasthan.hotels.js', exportName: 'RAJASTHAN_HOTELS', bounds: [1800, 4200] },
  { file: 'international/uae.hotels.js', exportName: 'UAE_HOTELS', bounds: [350, 750] },
  { file: 'international/france.hotels.js', exportName: 'FRANCE_HOTELS', bounds: [110, 260] },
  { file: 'international/japan.hotels.js', exportName: 'JAPAN_HOTELS', bounds: [12000, 26000] },
  { file: 'international/maldives.hotels.js', exportName: 'MALDIVES_HOTELS', bounds: [250, 650] },
];

for (const item of targetFiles) {
  const filePath = path.join(__dirname, item.file);
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${filePath}`);
    continue;
  }

  const rawContent = fs.readFileSync(filePath, 'utf-8');
  // Strip export const NAME =
  const jsonMatch = rawContent.match(/export const [A-Z_]+ = (\[[\s\S]*\]);/);
  if (!jsonMatch) {
    console.error(`Could not parse JSON from ${filePath}`);
    continue;
  }

  const hotels = JSON.parse(jsonMatch[1]);
  const enriched = enrichHotelDataset(hotels, item.bounds);

  const newFileContent = `export const ${item.exportName} = ${JSON.stringify(enriched, null, 2)};\n`;
  fs.writeFileSync(filePath, newFileContent, 'utf-8');
  console.log(`Enriched ${enriched.length} hotels in ${item.file} with 3 distinct room inventories each!`);
}

console.log('Successfully completed Room Inventory Enrichment!');

