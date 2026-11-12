const fs = require('fs');
const path = require('path');

// Curated high-res Unsplash hotel imagery pools
const IMAGES = {
  heritage: [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200",
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200",
    "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=1200",
    "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1200",
  ],
  mountain: [
    "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1200",
    "https://images.unsplash.com/photo-1549294413-26f195200c16?q=80&w=1200",
    "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1200",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200",
  ],
  beach: [
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1200",
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1200",
    "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=1200",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200",
  ],
  urban: [
    "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1200",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200",
    "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1200",
  ]
};

const AMENITY_PRESETS = [
  ["Infinity Pool", "Luxury Spa & Wellness", "Fine Dining Restaurant", "Free High-Speed Wi-Fi", "24/7 Butler Service", "Airport Shuttle"],
  ["Panoramic Mountain Views", "Fireplace Lounge", "Heated Indoor Pool", "Artisan Tea Tasting", "Complimentary Breakfast", "Guided Treks"],
  ["Private Beach Access", "Sea-View Balcony", "Water Sports Center", "Sunset Bar", "Concierge Desk", "Valet Parking"],
  ["Rooftop Sky Lounge", "Business Executive Club", "Fitness & Steam Sauna", "Airport Chauffeur", "24/7 In-Room Dining", "EV Charging Station"],
  ["Ayurvedic Healing Center", "Yoga Pavilion", "Organic Farm-to-Table Dining", "Swimming Pool", "Nature Walking Trails", "Library Lounge"]
];

function generateHotelsForCity(city, count, currency, themeType, basePriceRange, customNames = []) {
  const hotels = [];
  const imagePool = IMAGES[themeType] || IMAGES.urban;

  const prefixes = ["The Grand", "Royal", "The Oberoi", "Taj", "ITC", "Radisson Blu", "Hyatt Regency", "JW Marriott", "Heritage", "Mayfair", "Le Meridien", "Boutique Villa", "Silver Sands", "Whispering Pines", "The Golden Crest", "Summit", "Sterling", "The Elgin", "Lemon Tree Premier", "Regal Vista", "Aura Sanctuary", "Palace", "The Imperial", "Novotel", "Fortune Park"];
  const suffixes = ["Palace & Spa", "Resort & Suites", "Grand Hotel", "Manor", "Retreat", "Residency", "Heritage Haveli", "Haven", "Luxury Villas", "Tower", "Bay Resort", "Estate", "Chalet", "Sanctuary", "Plaza"];

  for (let i = 0; i < count; i++) {
    const customName = customNames[i];
    let name = customName;
    if (!name) {
      const p = prefixes[i % prefixes.length];
      const s = suffixes[i % suffixes.length];
      name = `${p} ${city.name} ${s}`;
    }

    const stars = i < 8 ? 5 : i < 18 ? 4 : 3;
    const category = stars === 5 ? (i < 4 ? "Ultra Luxury & Heritage" : "Premium 5-Star & Resorts") : stars === 4 ? "Boutique & Villa" : "Smart Comfort & Standard";
    const startingPrice = Math.round(basePriceRange[0] + (Math.random() * (basePriceRange[1] - basePriceRange[0])) / 500) * 500;
    const rating = +(4.0 + (Math.random() * 0.9)).toFixed(1);
    const reviewCount = Math.floor(120 + Math.random() * 1800);
    const mainImg = imagePool[i % imagePool.length];
    const gallery = [mainImg, imagePool[(i + 1) % imagePool.length], imagePool[(i + 2) % imagePool.length]];
    const amenities = AMENITY_PRESETS[i % AMENITY_PRESETS.length];

    hotels.push({
      id: `hotel-${city.id}-${String(i + 1).padStart(2, '0')}`,
      name,
      cityId: city.id,
      cityName: city.name,
      stateName: city.stateName,
      countryName: city.countryName,
      stars,
      category,
      theme: themeType === "mountain" ? "Mountain & Valley Retreat" : themeType === "beach" ? "Beachfront & Coastal" : themeType === "heritage" ? "Heritage & Palace" : "Skyline & Urban Luxury",
      rating,
      reviewCount,
      startingPrice,
      currency,
      address: `${10 + i * 4}, Mall Road & Luxury Boulevard, ${city.name}`,
      featuredImage: mainImg,
      gallery,
      amenities,
      rooms: [] // Placeholder ready for Room additions in next step
    });
  }

  return hotels;
}

// 1. WEST BENGAL HOTELS
const kolkataReal = [
  "The Oberoi Grand Kolkata", "ITC Sonar Luxury Collection", "ITC Royal Bengal Kolkata", "Taj Bengal Alipore", "The Westin Kolkata Rajarhat",
  "JW Marriott Hotel Kolkata", "The Lalit Great Eastern", "Hyatt Regency Kolkata", "Novotel Kolkata Hotel & Residences", "Swissotel Kolkata",
  "The Peerless Inn Kolkata", "The Pride Hotel Kolkata", "Kenilworth Hotel", "The Astor Heritage Hotel", "Vedic Village Spa Resort",
  "Holiday Inn Express Kolkata", "Polo Floatel Heritage on the Ganges", "Raichak on Ganges Fort", "Ibiza The Fern Resort", "Howard Johnson by Wyndham",
  "Zone by The Park Kolkata", "Hotel Hindusthan International", "Senses Hotel Sector V", "Barsana Boutique Hotel", "Monotel Kolkata"
];

const darjeelingReal = [
  "Mayfair Darjeeling Luxury Resort", "The Elgin Heritage Hotel Darjeeling", "Windamere Heritage Hotel", "Cedar Inn Darjeeling", "Glenburn Tea Estate & Boutique Retreat",
  "Summit Grace Boutique Hotel & Spa", "Sinclairs Darjeeling", "The Chalamthang Heritage", "Ramada by Wyndham Darjeeling", "Sterling Darjeeling Ghoom",
  "Central Heritage Resort & Spa", "Dekeling Resort Darjeeling", "Little Tibet Boutique Hotel", "Hotel Seven Seventeen", "Udaan Nirvana Resort",
  "Rhododendron Dell Exotic Retreat", "The Golden Crest Resort", "Viceroy Hotel Darjeeling", "Pine Ridge Heritage Hotel", "Singalila Tea Lodge",
  "Chamong Chiabari Mountain Retreat", "Pinnacle Holiday Inn", "The Himalayan Resort", "Darjeeling Gymkhana Resort", "Mount Himalayan Resort"
];

const dighaReal = [
  "Hotel Sea Hawk Digha", "Hotel Sonar Bangla Digha", "Le Roi Digha Luxury Resort", "Cygnett Lite Digha", "Hotel Sea Coast Digha",
  "Pride Biznotel Digha", "Hotel Coral Digha", "Blue Waves Digha Beach Resort", "Rukmani Guest House & Resort", "Hotel Dolphin Digha",
  "Hotel Aditya International", "Parijat Beach Resort", "The Palm Resort Mandarmani", "Victoria Beach Resort", "Ananya Backwater Resort",
  "Kings Crown Resort", "Sea Sand Luxury Retreat", "Digha Tourist Lodge", "Pearl Beach Resort", "Green View Digha Resort"
];

const wbHotels = [
  ...generateHotelsForCity({ id: "in-wb-kolkata", name: "Kolkata", stateName: "West Bengal", countryName: "India" }, 25, "INR", "heritage", [4500, 18000], kolkataReal),
  ...generateHotelsForCity({ id: "in-wb-darjeeling", name: "Darjeeling", stateName: "West Bengal", countryName: "India" }, 25, "INR", "mountain", [3800, 16000], darjeelingReal),
  ...generateHotelsForCity({ id: "in-wb-digha", name: "Digha", stateName: "West Bengal", countryName: "India" }, 20, "INR", "beach", [2500, 8500], dighaReal),
  ...generateHotelsForCity({ id: "in-wb-kalimpong", name: "Kalimpong", stateName: "West Bengal", countryName: "India" }, 20, "INR", "mountain", [3000, 9500]),
  ...generateHotelsForCity({ id: "in-wb-shantiniketan", name: "Shantiniketan (Bolpur)", stateName: "West Bengal", countryName: "India" }, 20, "INR", "heritage", [2800, 8000]),
  ...generateHotelsForCity({ id: "in-wb-sundarbans", name: "Sundarbans", stateName: "West Bengal", countryName: "India" }, 20, "INR", "heritage", [3500, 11000])
];

fs.writeFileSync(path.join(__dirname, 'india/west-bengal.hotels.js'), `export const WEST_BENGAL_HOTELS = ${JSON.stringify(wbHotels, null, 2)};\n`);

// 2. MAHARASHTRA HOTELS
const mumbaiReal = [
  "The Taj Mahal Palace Mumbai", "The Oberoi Mumbai Nariman Point", "Taj Lands End Bandra", "The St. Regis Mumbai Lower Parel", "Trident Hotel Nariman Point",
  "JW Marriott Mumbai Juhu", "Sofitel Mumbai BKC", "Grand Hyatt Mumbai & Residences", "The Leela Mumbai", "ITC Maratha Luxury Collection",
  "Taj Santacruz Mumbai", "Four Seasons Hotel Mumbai", "InterContinental Marine Drive", "The Lalit Mumbai", "Radisson Blu Mumbai International Airport",
  "Novotel Mumbai Juhu Beach", "Meluha The Fern Powai", "The Orchid Hotel Vile Parle", "Sun-n-Sand Hotel Juhu", "Courtyard by Marriott Mumbai International",
  "Citizen Hotel Juhu Beach", "Residency Hotel Fort", "The Gordon House Hotel Colaba", "Sea Green South Hotel", "Waterstones Hotel Mumbai"
];

const mhHotels = [
  ...generateHotelsForCity({ id: "in-mh-mumbai", name: "Mumbai", stateName: "Maharashtra", countryName: "India" }, 25, "INR", "urban", [6000, 32000], mumbaiReal),
  ...generateHotelsForCity({ id: "in-mh-pune", name: "Pune", stateName: "Maharashtra", countryName: "India" }, 20, "INR", "urban", [4000, 14000]),
  ...generateHotelsForCity({ id: "in-mh-lonavala", name: "Lonavala & Khandala", stateName: "Maharashtra", countryName: "India" }, 20, "INR", "mountain", [4500, 18000]),
  ...generateHotelsForCity({ id: "in-mh-nashik", name: "Nashik", stateName: "Maharashtra", countryName: "India" }, 20, "INR", "heritage", [3500, 12000])
];
fs.writeFileSync(path.join(__dirname, 'india/maharashtra.hotels.js'), `export const MAHARASHTRA_HOTELS = ${JSON.stringify(mhHotels, null, 2)};\n`);

// 3. GOA HOTELS
const goaPanajiReal = [
  "Taj Cidade de Goa Heritage", "The Crown Goa Panaji", "Vivanta Goa Panaji", "DoubleTree by Hilton Panaji", "Goa Marriott Resort & Spa",
  "Fortune Miramar Panaji", "The Fern Kadamba Hotel", "Country Inn & Suites Panjim", "Hotel Fidalgo Panaji", "Pousada Tauma Boutique",
  "Ahilya by the Sea", "Mateus Boutique Hotel Panaji", "WelcomHeritage Panjim Inn", "Deltin Suites Nerul", "Casa Britona Boutique Villa",
  "Ginger Goa Panaji", "The Mandovi Hotel", "Old Quarter Heritage Hostel", "La Maison Fontainhas", "Hospedaria Abrigo de Botelho",
  "Hotel Campal Heritage", "Park Prime Goa", "The Park Calangute Beachfront", "W Goa Vagator Beach", "Alila Diwa Goa Beach Resort"
];
const goaHotels = [
  ...generateHotelsForCity({ id: "in-ga-panaji", name: "Panaji (Panjim)", stateName: "Goa", countryName: "India" }, 25, "INR", "beach", [5000, 26000], goaPanajiReal),
  ...generateHotelsForCity({ id: "in-ga-calangute", name: "Calangute & Baga", stateName: "Goa", countryName: "India" }, 25, "INR", "beach", [4000, 18000]),
  ...generateHotelsForCity({ id: "in-ga-candolim", name: "Candolim", stateName: "Goa", countryName: "India" }, 20, "INR", "beach", [4500, 22000]),
  ...generateHotelsForCity({ id: "in-ga-anjuna", name: "Anjuna & Vagator", stateName: "Goa", countryName: "India" }, 20, "INR", "beach", [4000, 20000])
];
fs.writeFileSync(path.join(__dirname, 'india/goa.hotels.js'), `export const GOA_HOTELS = ${JSON.stringify(goaHotels, null, 2)};\n`);

// 4. RAJASTHAN HOTELS
const jaipurReal = [
  "Rambagh Palace Jaipur by Taj", "The Oberoi Rajvilas Jaipur", "The Leela Palace Jaipur", "Jai Mahal Palace Jaipur", "ITC Rajputana Luxury Collection",
  "Fairmont Jaipur", "JW Marriott Jaipur Resort & Spa", "Alsisar Haveli Heritage Hotel", "Samode Haveli Jaipur", "Shahpura Haveli Luxury Heritage",
  "Trident Hotel Jaipur", "Radisson Blu Jaipur", "Hilton Jaipur", "Holiday Inn Jaipur City Centre", "Chokhi Dhani Ethnic Resort Jaipur",
  "Umaid Bhawan Heritage Hotel", "Dera Mandawa Heritage Suites", "Mandawa Haveli Jaipur", "Hotel Narain Niwas Palace", "Khandela Haveli Boutique",
  "LMB Heritage Hotel Johari Bazaar", "Clarks Amer Jaipur", "Park Prime Jaipur", "Zone by The Park Jaipur", "Devi Ratn IHCL SeleQtions"
];
const rajHotels = [
  ...generateHotelsForCity({ id: "in-rj-jaipur", name: "Jaipur", stateName: "Rajasthan", countryName: "India" }, 25, "INR", "heritage", [4500, 35000], jaipurReal),
  ...generateHotelsForCity({ id: "in-rj-udaipur", name: "Udaipur", stateName: "Rajasthan", countryName: "India" }, 25, "INR", "heritage", [5000, 42000]),
  ...generateHotelsForCity({ id: "in-rj-jodhpur", name: "Jodhpur", stateName: "Rajasthan", countryName: "India" }, 20, "INR", "heritage", [4000, 28000]),
  ...generateHotelsForCity({ id: "in-rj-jaisalmer", name: "Jaisalmer", stateName: "Rajasthan", countryName: "India" }, 20, "INR", "heritage", [3800, 22000])
];
fs.writeFileSync(path.join(__dirname, 'india/rajasthan.hotels.js'), `export const RAJASTHAN_HOTELS = ${JSON.stringify(rajHotels, null, 2)};\n`);

// 5. UAE HOTELS (INTERNATIONAL)
const dubaiReal = [
  "Burj Al Arab Jumeirah", "Atlantis The Royal Palm", "Armani Hotel Dubai (Burj Khalifa)", "The Ritz-Carlton Dubai Marina", "Four Seasons Resort Dubai at Jumeirah Beach",
  "Bulgari Resort Dubai", "Jumeirah Al Naseem", "One&Only The Palm Dubai", "Palazzo Versace Dubai", "W Dubai - The Palm",
  "Address Downtown Dubai", "JW Marriott Marquis Dubai", "Sofitel Dubai The Obelisk", "Mandarin Oriental Jumeira", "Raffles Dubai Wafi",
  "Kempinski Hotel Mall of the Emirates", "Anantara The Palm Dubai Resort", "The St. Regis Downtown Dubai", "Habtoor Grand Resort Autograph Collection", "Fairmont The Palm",
  "Sheraton Grand Hotel Dubai", "Le Royal Meridien Beach Resort", "Dukes The Palm Royal Hideaway", "Rove Downtown Dubai", "Vida Downtown Dubai"
];
const uaeHotels = [
  ...generateHotelsForCity({ id: "ae-dxb-dubai", name: "Dubai", stateName: "Dubai", countryName: "United Arab Emirates" }, 25, "AED", "urban", [500, 4500], dubaiReal),
  ...generateHotelsForCity({ id: "ae-auh-abudhabi", name: "Abu Dhabi", stateName: "Abu Dhabi", countryName: "United Arab Emirates" }, 20, "AED", "urban", [400, 3200]),
  ...generateHotelsForCity({ id: "ae-rak-rasalkhaimah", name: "Ras Al Khaimah", stateName: "Ras Al Khaimah", countryName: "United Arab Emirates" }, 20, "AED", "beach", [350, 2400])
];
fs.writeFileSync(path.join(__dirname, 'international/uae.hotels.js'), `export const UAE_HOTELS = ${JSON.stringify(uaeHotels, null, 2)};\n`);

// 6. FRANCE HOTELS (INTERNATIONAL)
const parisReal = [
  "The Ritz Paris (Place Vendôme)", "Hôtel de Crillon Rosewood", "Four Seasons Hotel George V Paris", "Le Meurice Dorchester Collection", "Plaza Athénée Paris",
  "Shangri-La Hotel Paris", "Le Bristol Paris", "The Peninsula Paris", "Cheval Blanc Paris", "Mandarin Oriental Paris",
  "Hôtel Lutetia Saint-Germain", "Sofitel Paris Le Faubourg", "InterContinental Paris Le Grand", "Grand Hôtel du Palais Royal", "Hôtel Plaza Tour Eiffel",
  "Pullman Paris Tour Eiffel", "Novotel Paris Les Halles", "Maison Souquet Montmartre", "Hôtel Regina Louvre", "Le Dokhan's Paris Arc de Triomphe",
  "citizenM Paris Gare de Lyon", "Hôtel Vernet Champs-Elysées", "Hôtel San Régis", "Hôtel Dame des Arts", "Mama Shelter Paris East"
];
const franceHotels = [
  ...generateHotelsForCity({ id: "fr-idf-paris", name: "Paris", stateName: "Île-de-France", countryName: "France" }, 25, "EUR", "urban", [180, 1800], parisReal),
  ...generateHotelsForCity({ id: "fr-pac-nice", name: "Nice", stateName: "Provence-Alpes-Côte d'Azur", countryName: "France" }, 20, "EUR", "beach", [140, 950])
];
fs.writeFileSync(path.join(__dirname, 'international/france.hotels.js'), `export const FRANCE_HOTELS = ${JSON.stringify(franceHotels, null, 2)};\n`);

// 7. JAPAN HOTELS (INTERNATIONAL)
const tokyoReal = [
  "Aman Tokyo Otemachi", "The Ritz-Carlton Tokyo Roppongi", "Palace Hotel Tokyo", "Mandarin Oriental Tokyo", "Four Seasons Hotel Tokyo at Otemachi",
  "Grand Hyatt Tokyo", "Park Hyatt Tokyo Shinjuku", "The Capitol Hotel Tokyu", "Hoshinoya Tokyo Ryokan", "Cerulean Tower Tokyu Hotel",
  "The Tokyo Edition Toranomon", "Conrad Tokyo Shiodome", "Hotel Chinzanso Tokyo", "The Peninsula Tokyo", "Imperial Hotel Tokyo",
  "Hilton Tokyo Shinjuku", "Shibuya Stream Excel Hotel Tokyu", "InterContinental Tokyo Bay", "Mitsui Garden Hotel Ginza Premier", "Keio Plaza Hotel Shinjuku",
  "Hotel New Otani Tokyo The Main", "Candeo Hotels Tokyo Shimbashi", "Hotel Gracery Shinjuku", "The Gate Hotel Asakusa Kaminarimon", "Dormy Inn Premium Shibuya-Jingumae"
];
const japanHotels = [
  ...generateHotelsForCity({ id: "jp-tyo-tokyo", name: "Tokyo", stateName: "Tokyo", countryName: "Japan" }, 25, "JPY", "urban", [18000, 120000], tokyoReal),
  ...generateHotelsForCity({ id: "jp-kto-kyoto", name: "Kyoto", stateName: "Kyoto", countryName: "Japan" }, 20, "JPY", "heritage", [15000, 95000])
];
fs.writeFileSync(path.join(__dirname, 'international/japan.hotels.js'), `export const JAPAN_HOTELS = ${JSON.stringify(japanHotels, null, 2)};\n`);

// 8. MALDIVES HOTELS (INTERNATIONAL)
const maldivesReal = [
  "Soneva Jani Overwater Sanctuary", "Cheval Blanc Randheli Maldives", "The St. Regis Maldives Vommuli Resort", "Waldorf Astoria Maldives Ithaafushi", "One&Only Reethi Rah",
  "Gili Lankanfushi Maldives", "Velaa Private Island", "Anantara Kihavah Maldives Villas", "Baros Maldives Luxury Resort", "W Maldives Fesdu Island",
  "Hurawalhi Island Resort (Underwater Restaurant)", "Joali Maldives Muravandhoo", "Kudadoo Maldives Private Island", "Six Senses Laamu", "Niyama Private Islands Maldives",
  "LUX* South Ari Atoll Resort & Villas", "Milaidhoo Island Maldives", "Cora Cora Maldives Raa Atoll", "Hard Rock Hotel Maldives", "Sun Siyam Iru Fushi",
  "Kurumba Maldives North Male", "Adaaran Prestige Water Villas", "Velassaru Maldives", "Meeru Island Resort & Spa", "Centara Grand Island Resort"
];
const maldivesHotels = [
  ...generateHotelsForCity({ id: "mv-mle-male", name: "Malé", stateName: "Malé Atoll", countryName: "Maldives" }, 25, "MVR", "beach", [2500, 32000], maldivesReal)
];
fs.writeFileSync(path.join(__dirname, 'international/maldives.hotels.js'), `export const MALDIVES_HOTELS = ${JSON.stringify(maldivesHotels, null, 2)};\n`);

console.log('All modular hotel files successfully built!');

