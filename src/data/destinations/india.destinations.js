/**
 * Exhaustive India Destination Data
 * Covers all 28 States and 8 Union Territories with their primary cities, districts, and tourist destinations.
 * Ready for Hotel Provider registrations.
 */

export const INDIA_DESTINATIONS = {
  id: "country-in",
  name: "India",
  code: "IN",
  continent: "Asia",
  currency: "INR",
  states: [
    // 1. West Bengal
    {
      code: "WB",
      name: "West Bengal",
      cities: [
        { id: "in-wb-kolkata", name: "Kolkata", popular: true, hotels: [] },
        { id: "in-wb-darjeeling", name: "Darjeeling", popular: true, hotels: [] },
        { id: "in-wb-siliguri", name: "Siliguri", popular: false, hotels: [] },
        { id: "in-wb-kalimpong", name: "Kalimpong", popular: false, hotels: [] },
        { id: "in-wb-digha", name: "Digha", popular: true, hotels: [] },
        { id: "in-wb-mandarmani", name: "Mandarmani", popular: false, hotels: [] },
        { id: "in-wb-howrah", name: "Howrah", popular: false, hotels: [] },
        { id: "in-wb-durgapur", name: "Durgapur", popular: false, hotels: [] },
        { id: "in-wb-asansol", name: "Asansol", popular: false, hotels: [] },
        { id: "in-wb-shantiniketan", name: "Shantiniketan (Bolpur)", popular: true, hotels: [] },
        { id: "in-wb-sundarbans", name: "Sundarbans", popular: true, hotels: [] },
        { id: "in-wb-murshidabad", name: "Murshidabad", popular: false, hotels: [] },
        { id: "in-wb-kurseong", name: "Kurseong", popular: false, hotels: [] },
        { id: "in-wb-haldia", name: "Haldia", popular: false, hotels: [] },
        { id: "in-wb-kharagpur", name: "Kharagpur", popular: false, hotels: [] },
        { id: "in-wb-malda", name: "Malda", popular: false, hotels: [] },
        { id: "in-wb-jalpaiguri", name: "Jalpaiguri (Dooars)", popular: false, hotels: [] },
        { id: "in-wb-purulia", name: "Purulia", popular: false, hotels: [] },
        { id: "in-wb-bakkhali", name: "Bakkhali", popular: false, hotels: [] },
        { id: "in-wb-coochbehar", name: "Cooch Behar", popular: false, hotels: [] },
      ],
    },

    // 2. Maharashtra
    {
      code: "MH",
      name: "Maharashtra",
      cities: [
        { id: "in-mh-mumbai", name: "Mumbai", popular: true, hotels: [] },
        { id: "in-mh-pune", name: "Pune", popular: true, hotels: [] },
        { id: "in-mh-nagpur", name: "Nagpur", popular: false, hotels: [] },
        { id: "in-mh-nashik", name: "Nashik", popular: true, hotels: [] },
        { id: "in-mh-lonavala", name: "Lonavala & Khandala", popular: true, hotels: [] },
        { id: "in-mh-mahabaleshwar", name: "Mahabaleshwar", popular: true, hotels: [] },
        { id: "in-mh-shirdi", name: "Shirdi", popular: true, hotels: [] },
        { id: "in-mh-aurangabad", name: "Chhatrapati Sambhajinagar (Aurangabad)", popular: false, hotels: [] },
        { id: "in-mh-alibaug", name: "Alibaug", popular: true, hotels: [] },
        { id: "in-mh-panchgani", name: "Panchgani", popular: false, hotels: [] },
        { id: "in-mh-matheran", name: "Matheran", popular: false, hotels: [] },
        { id: "in-mh-thane", name: "Thane", popular: false, hotels: [] },
        { id: "in-mh-kolhapur", name: "Kolhapur", popular: false, hotels: [] },
        { id: "in-mh-tarkarli", name: "Tarkarli (Malvan)", popular: false, hotels: [] },
        { id: "in-mh-solapur", name: "Solapur", popular: false, hotels: [] },
        { id: "in-mh-ratnagiri", name: "Ratnagiri", popular: false, hotels: [] },
      ],
    },

    // 3. Delhi (NCT)
    {
      code: "DL",
      name: "Delhi",
      cities: [
        { id: "in-dl-newdelhi", name: "New Delhi", popular: true, hotels: [] },
        { id: "in-dl-aerocity", name: "Aerocity", popular: true, hotels: [] },
        { id: "in-dl-connaughtplace", name: "Connaught Place", popular: true, hotels: [] },
        { id: "in-dl-southdelhi", name: "South Delhi (Hauz Khas / Saket)", popular: false, hotels: [] },
        { id: "in-dl-dwarka", name: "Dwarka", popular: false, hotels: [] },
        { id: "in-dl-chandnichowk", name: "Old Delhi (Chandni Chowk)", popular: false, hotels: [] },
      ],
    },

    // 4. Karnataka
    {
      code: "KA",
      name: "Karnataka",
      cities: [
        { id: "in-ka-bengaluru", name: "Bengaluru (Bangalore)", popular: true, hotels: [] },
        { id: "in-ka-mysuru", name: "Mysuru (Mysore)", popular: true, hotels: [] },
        { id: "in-ka-coorg", name: "Coorg (Madikeri)", popular: true, hotels: [] },
        { id: "in-ka-mangaluru", name: "Mangaluru (Mangalore)", popular: false, hotels: [] },
        { id: "in-ka-hampi", name: "Hampi", popular: true, hotels: [] },
        { id: "in-ka-gokarna", name: "Gokarna", popular: true, hotels: [] },
        { id: "in-ka-chikmagalur", name: "Chikmagalur", popular: true, hotels: [] },
        { id: "in-ka-udupi", name: "Udupi", popular: false, hotels: [] },
        { id: "in-ka-kabini", name: "Kabini & Nagarhole", popular: true, hotels: [] },
        { id: "in-ka-bandipur", name: "Bandipur", popular: false, hotels: [] },
        { id: "in-ka-hubballi", name: "Hubballi-Dharwad", popular: false, hotels: [] },
        { id: "in-ka-belagavi", name: "Belagavi", popular: false, hotels: [] },
        { id: "in-ka-dandeli", name: "Dandeli", popular: false, hotels: [] },
      ],
    },

    // 5. Kerala
    {
      code: "KL",
      name: "Kerala",
      cities: [
        { id: "in-kl-kochi", name: "Kochi (Cochin)", popular: true, hotels: [] },
        { id: "in-kl-munnar", name: "Munnar", popular: true, hotels: [] },
        { id: "in-kl-alleppey", name: "Alleppey (Alappuzha)", popular: true, hotels: [] },
        { id: "in-kl-thiruvananthapuram", name: "Thiruvananthapuram (Trivandrum)", popular: false, hotels: [] },
        { id: "in-kl-kovalam", name: "Kovalam", popular: true, hotels: [] },
        { id: "in-kl-varkala", name: "Varkala", popular: true, hotels: [] },
        { id: "in-kl-wayanad", name: "Wayanad", popular: true, hotels: [] },
        { id: "in-kl-thekkady", name: "Thekkady (Periyar)", popular: true, hotels: [] },
        { id: "in-kl-kumarakom", name: "Kumarakom", popular: true, hotels: [] },
        { id: "in-kl-kozhikode", name: "Kozhikode (Calicut)", popular: false, hotels: [] },
        { id: "in-kl-thrissur", name: "Thrissur", popular: false, hotels: [] },
        { id: "in-kl-kannur", name: "Kannur", popular: false, hotels: [] },
        { id: "in-kl-bekal", name: "Bekal", popular: false, hotels: [] },
      ],
    },

    // 6. Goa
    {
      code: "GA",
      name: "Goa",
      cities: [
        { id: "in-ga-panaji", name: "Panaji (Panjim)", popular: true, hotels: [] },
        { id: "in-ga-calangute", name: "Calangute & Baga", popular: true, hotels: [] },
        { id: "in-ga-candolim", name: "Candolim", popular: true, hotels: [] },
        { id: "in-ga-anjuna", name: "Anjuna & Vagator", popular: true, hotels: [] },
        { id: "in-ga-morjim", name: "Morjim & Ashwem", popular: true, hotels: [] },
        { id: "in-ga-arambol", name: "Arambol", popular: false, hotels: [] },
        { id: "in-ga-margao", name: "Margao (Madgaon)", popular: false, hotels: [] },
        { id: "in-ga-colva", name: "Colva & Benaulim", popular: true, hotels: [] },
        { id: "in-ga-palolem", name: "Palolem & Agonda", popular: true, hotels: [] },
        { id: "in-ga-cavelossim", name: "Cavelossim & Mobor", popular: false, hotels: [] },
        { id: "in-ga-vasco", name: "Vasco da Gama", popular: false, hotels: [] },
      ],
    },

    // 7. Rajasthan
    {
      code: "RJ",
      name: "Rajasthan",
      cities: [
        { id: "in-rj-jaipur", name: "Jaipur (Pink City)", popular: true, hotels: [] },
        { id: "in-rj-udaipur", name: "Udaipur (City of Lakes)", popular: true, hotels: [] },
        { id: "in-rj-jodhpur", name: "Jodhpur (Blue City)", popular: true, hotels: [] },
        { id: "in-rj-jaisalmer", name: "Jaisalmer (Golden City)", popular: true, hotels: [] },
        { id: "in-rj-pushkar", name: "Pushkar", popular: true, hotels: [] },
        { id: "in-rj-mountabu", name: "Mount Abu", popular: true, hotels: [] },
        { id: "in-rj-ranthambore", name: "Ranthambore (Sawai Madhopur)", popular: true, hotels: [] },
        { id: "in-rj-bikaner", name: "Bikaner", popular: false, hotels: [] },
        { id: "in-rj-ajmer", name: "Ajmer", popular: false, hotels: [] },
        { id: "in-rj-alwar", name: "Alwar (Sariska)", popular: false, hotels: [] },
        { id: "in-rj-chittorgarh", name: "Chittorgarh", popular: false, hotels: [] },
        { id: "in-rj-kumbhalgarh", name: "Kumbhalgarh", popular: false, hotels: [] },
        { id: "in-rj-shekhawati", name: "Mandawa (Shekhawati)", popular: false, hotels: [] },
        { id: "in-rj-neemrana", name: "Neemrana", popular: false, hotels: [] },
      ],
    },

    // 8. Tamil Nadu
    {
      code: "TN",
      name: "Tamil Nadu",
      cities: [
        { id: "in-tn-chennai", name: "Chennai", popular: true, hotels: [] },
        { id: "in-tn-ooty", name: "Ooty (Udhagamandalam)", popular: true, hotels: [] },
        { id: "in-tn-kodaikanal", name: "Kodaikanal", popular: true, hotels: [] },
        { id: "in-tn-madurai", name: "Madurai", popular: true, hotels: [] },
        { id: "in-tn-coimbatore", name: "Coimbatore", popular: false, hotels: [] },
        { id: "in-tn-mahabalipuram", name: "Mahabalipuram", popular: true, hotels: [] },
        { id: "in-tn-rameshwaram", name: "Rameswaram", popular: true, hotels: [] },
        { id: "in-tn-kanyakumari", name: "Kanyakumari", popular: true, hotels: [] },
        { id: "in-tn-thanjavur", name: "Thanjavur", popular: false, hotels: [] },
        { id: "in-tn-trichy", name: "Tiruchirappalli", popular: false, hotels: [] },
        { id: "in-tn-salem", name: "Salem (Yercaud)", popular: false, hotels: [] },
        { id: "in-tn-coonoor", name: "Coonoor", popular: false, hotels: [] },
      ],
    },

    // 9. Uttar Pradesh
    {
      code: "UP",
      name: "Uttar Pradesh",
      cities: [
        { id: "in-up-agra", name: "Agra (Taj Mahal)", popular: true, hotels: [] },
        { id: "in-up-varanasi", name: "Varanasi (Kashi)", popular: true, hotels: [] },
        { id: "in-up-lucknow", name: "Lucknow", popular: true, hotels: [] },
        { id: "in-up-ayodhya", name: "Ayodhya", popular: true, hotels: [] },
        { id: "in-up-mathura", name: "Mathura & Vrindavan", popular: true, hotels: [] },
        { id: "in-up-noida", name: "Noida & Greater Noida", popular: false, hotels: [] },
        { id: "in-up-prayagraj", name: "Prayagraj (Allahabad)", popular: false, hotels: [] },
        { id: "in-up-kanpur", name: "Kanpur", popular: false, hotels: [] },
        { id: "in-up-ghaziabad", name: "Ghaziabad", popular: false, hotels: [] },
        { id: "in-up-jhansi", name: "Jhansi", popular: false, hotels: [] },
        { id: "in-up-bareilly", name: "Bareilly", popular: false, hotels: [] },
        { id: "in-up-meerut", name: "Meerut", popular: false, hotels: [] },
      ],
    },

    // 10. Himachal Pradesh
    {
      code: "HP",
      name: "Himachal Pradesh",
      cities: [
        { id: "in-hp-shimla", name: "Shimla", popular: true, hotels: [] },
        { id: "in-hp-manali", name: "Manali", popular: true, hotels: [] },
        { id: "in-hp-dharamshala", name: "Dharamshala & McLeodGanj", popular: true, hotels: [] },
        { id: "in-hp-kullu", name: "Kullu", popular: false, hotels: [] },
        { id: "in-hp-kasauli", name: "Kasauli", popular: true, hotels: [] },
        { id: "in-hp-spiti", name: "Spiti Valley (Kaza)", popular: true, hotels: [] },
        { id: "in-hp-dalhousie", name: "Dalhousie & Khajjiar", popular: true, hotels: [] },
        { id: "in-hp-jibhi", name: "Jibhi & Tirthan Valley", popular: false, hotels: [] },
        { id: "in-hp-birbilling", name: "Bir Billing", popular: false, hotels: [] },
        { id: "in-hp-kasol", name: "Kasol & Parvati Valley", popular: true, hotels: [] },
        { id: "in-hp-chamba", name: "Chamba", popular: false, hotels: [] },
        { id: "in-hp-kinnaur", name: "Kinnaur (Kalpa)", popular: false, hotels: [] },
      ],
    },

    // 11. Uttarakhand
    {
      code: "UK",
      name: "Uttarakhand",
      cities: [
        { id: "in-uk-dehradun", name: "Dehradun", popular: false, hotels: [] },
        { id: "in-uk-mussoorie", name: "Mussoorie", popular: true, hotels: [] },
        { id: "in-uk-rishikesh", name: "Rishikesh", popular: true, hotels: [] },
        { id: "in-uk-haridwar", name: "Haridwar", popular: true, hotels: [] },
        { id: "in-uk-nainital", name: "Nainital", popular: true, hotels: [] },
        { id: "in-uk-jimcorbett", name: "Jim Corbett (Ramnagar)", popular: true, hotels: [] },
        { id: "in-uk-auli", name: "Auli & Joshimath", popular: true, hotels: [] },
        { id: "in-uk-ranikhet", name: "Ranikhet", popular: false, hotels: [] },
        { id: "in-uk-almora", name: "Almora", popular: false, hotels: [] },
        { id: "in-uk-lansdowne", name: "Lansdowne", popular: false, hotels: [] },
        { id: "in-uk-kausani", name: "Kausani", popular: false, hotels: [] },
        { id: "in-uk-chardham", name: "Char Dham (Badrinath, Kedarnath)", popular: true, hotels: [] },
      ],
    },

    // 12. Gujarat
    {
      code: "GJ",
      name: "Gujarat",
      cities: [
        { id: "in-gj-ahmedabad", name: "Ahmedabad", popular: true, hotels: [] },
        { id: "in-gj-surat", name: "Surat", popular: false, hotels: [] },
        { id: "in-gj-vadodara", name: "Vadodara (Baroda)", popular: false, hotels: [] },
        { id: "in-gj-rajkot", name: "Rajkot", popular: false, hotels: [] },
        { id: "in-gj-kutch", name: "Rann of Kutch (Bhuj)", popular: true, hotels: [] },
        { id: "in-gj-gir", name: "Gir National Park (Sasan Gir)", popular: true, hotels: [] },
        { id: "in-gj-dwarka", name: "Dwarka", popular: true, hotels: [] },
        { id: "in-gj-somnath", name: "Somnath", popular: true, hotels: [] },
        { id: "in-gj-kevadia", name: "Statue of Unity (Kevadia)", popular: true, hotels: [] },
        { id: "in-gj-gandhinagar", name: "Gandhinagar", popular: false, hotels: [] },
        { id: "in-gj-saputara", name: "Saputara", popular: false, hotels: [] },
      ],
    },

    // 13. Jammu and Kashmir (UT)
    {
      code: "JK",
      name: "Jammu and Kashmir",
      cities: [
        { id: "in-jk-srinagar", name: "Srinagar (Dal Lake)", popular: true, hotels: [] },
        { id: "in-jk-gulmarg", name: "Gulmarg", popular: true, hotels: [] },
        { id: "in-jk-pahalgam", name: "Pahalgam", popular: true, hotels: [] },
        { id: "in-jk-sonamarg", name: "Sonamarg", popular: false, hotels: [] },
        { id: "in-jk-jammu", name: "Jammu City", popular: false, hotels: [] },
        { id: "in-jk-katra", name: "Katra (Vaishno Devi)", popular: true, hotels: [] },
        { id: "in-jk-patnitop", name: "Patnitop", popular: false, hotels: [] },
        { id: "in-jk-doodhpathri", name: "Doodhpathri", popular: false, hotels: [] },
      ],
    },

    // 14. Ladakh (UT)
    {
      code: "LA",
      name: "Ladakh",
      cities: [
        { id: "in-la-leh", name: "Leh", popular: true, hotels: [] },
        { id: "in-la-nubra", name: "Nubra Valley (Hunder / Diskit)", popular: true, hotels: [] },
        { id: "in-la-pangong", name: "Pangong Tso", popular: true, hotels: [] },
        { id: "in-la-kargil", name: "Kargil", popular: false, hotels: [] },
        { id: "in-la-tsomoriri", name: "Tso Moriri", popular: false, hotels: [] },
        { id: "in-la-zanskar", name: "Zanskar Valley", popular: false, hotels: [] },
      ],
    },

    // 15. Telangana
    {
      code: "TG",
      name: "Telangana",
      cities: [
        { id: "in-tg-hyderabad", name: "Hyderabad", popular: true, hotels: [] },
        { id: "in-tg-secunderabad", name: "Secunderabad", popular: false, hotels: [] },
        { id: "in-tg-warangal", name: "Warangal", popular: false, hotels: [] },
        { id: "in-tg-karimnagar", name: "Karimnagar", popular: false, hotels: [] },
        { id: "in-tg-nizamabad", name: "Nizamabad", popular: false, hotels: [] },
      ],
    },

    // 16. Andhra Pradesh
    {
      code: "AP",
      name: "Andhra Pradesh",
      cities: [
        { id: "in-ap-visakhapatnam", name: "Visakhapatnam (Vizag)", popular: true, hotels: [] },
        { id: "in-ap-tirupati", name: "Tirupati", popular: true, hotels: [] },
        { id: "in-ap-vijayawada", name: "Vijayawada", popular: false, hotels: [] },
        { id: "in-ap-araku", name: "Araku Valley", popular: true, hotels: [] },
        { id: "in-ap-guntur", name: "Guntur", popular: false, hotels: [] },
        { id: "in-ap-rajahmundry", name: "Rajahmundry", popular: false, hotels: [] },
        { id: "in-ap-kurnool", name: "Kurnool", popular: false, hotels: [] },
      ],
    },

    // 17. Madhya Pradesh
    {
      code: "MP",
      name: "Madhya Pradesh",
      cities: [
        { id: "in-mp-indore", name: "Indore", popular: true, hotels: [] },
        { id: "in-mp-bhopal", name: "Bhopal", popular: false, hotels: [] },
        { id: "in-mp-khajuraho", name: "Khajuraho", popular: true, hotels: [] },
        { id: "in-mp-gwalior", name: "Gwalior", popular: false, hotels: [] },
        { id: "in-mp-ujjain", name: "Ujjain (Mahakaleshwar)", popular: true, hotels: [] },
        { id: "in-mp-jabalpur", name: "Jabalpur (Bhedaghat)", popular: false, hotels: [] },
        { id: "in-mp-orchha", name: "Orchha", popular: false, hotels: [] },
        { id: "in-mp-kanha", name: "Kanha Tiger Reserve", popular: true, hotels: [] },
        { id: "in-mp-bandhavgarh", name: "Bandhavgarh", popular: true, hotels: [] },
        { id: "in-mp-pachmarhi", name: "Pachmarhi", popular: false, hotels: [] },
        { id: "in-mp-pench", name: "Pench National Park", popular: false, hotels: [] },
      ],
    },

    // 18. Punjab
    {
      code: "PB",
      name: "Punjab",
      cities: [
        { id: "in-pb-amritsar", name: "Amritsar (Golden Temple)", popular: true, hotels: [] },
        { id: "in-pb-ludhiana", name: "Ludhiana", popular: false, hotels: [] },
        { id: "in-pb-jalandhar", name: "Jalandhar", popular: false, hotels: [] },
        { id: "in-pb-patiala", name: "Patiala", popular: false, hotels: [] },
        { id: "in-pb-mohali", name: "Mohali", popular: false, hotels: [] },
        { id: "in-pb-bathinda", name: "Bathinda", popular: false, hotels: [] },
      ],
    },

    // 19. Haryana
    {
      code: "HR",
      name: "Haryana",
      cities: [
        { id: "in-hr-gurugram", name: "Gurugram (Gurgaon)", popular: true, hotels: [] },
        { id: "in-hr-faridabad", name: "Faridabad", popular: false, hotels: [] },
        { id: "in-hr-panchkula", name: "Panchkula", popular: false, hotels: [] },
        { id: "in-hr-kurukshetra", name: "Kurukshetra", popular: false, hotels: [] },
        { id: "in-hr-panipat", name: "Panipat", popular: false, hotels: [] },
        { id: "in-hr-karnal", name: "Karnal", popular: false, hotels: [] },
      ],
    },

    // 20. Sikkim
    {
      code: "SK",
      name: "Sikkim",
      cities: [
        { id: "in-sk-gangtok", name: "Gangtok", popular: true, hotels: [] },
        { id: "in-sk-pelling", name: "Pelling", popular: true, hotels: [] },
        { id: "in-sk-lachung", name: "Lachung (Yumthang Valley)", popular: true, hotels: [] },
        { id: "in-sk-lachen", name: "Lachen (Gurudongmar)", popular: false, hotels: [] },
        { id: "in-sk-ravangla", name: "Ravangla", popular: false, hotels: [] },
        { id: "in-sk-namchi", name: "Namchi", popular: false, hotels: [] },
      ],
    },

    // 21. Assam
    {
      code: "AS",
      name: "Assam",
      cities: [
        { id: "in-as-guwahati", name: "Guwahati", popular: true, hotels: [] },
        { id: "in-as-kaziranga", name: "Kaziranga National Park", popular: true, hotels: [] },
        { id: "in-as-tezpur", name: "Tezpur", popular: false, hotels: [] },
        { id: "in-as-dibrugarh", name: "Dibrugarh", popular: false, hotels: [] },
        { id: "in-as-jorhat", name: "Jorhat (Majuli)", popular: false, hotels: [] },
        { id: "in-as-silchar", name: "Silchar", popular: false, hotels: [] },
        { id: "in-as-manas", name: "Manas National Park", popular: false, hotels: [] },
      ],
    },

    // 22. Meghalaya
    {
      code: "ML",
      name: "Meghalaya",
      cities: [
        { id: "in-ml-shillong", name: "Shillong", popular: true, hotels: [] },
        { id: "in-ml-cherrapunji", name: "Cherrapunji (Sohra)", popular: true, hotels: [] },
        { id: "in-ml-dawki", name: "Dawki (Umngot River)", popular: true, hotels: [] },
        { id: "in-ml-mawlynnong", name: "Mawlynnong", popular: false, hotels: [] },
        { id: "in-ml-jowai", name: "Jowai", popular: false, hotels: [] },
        { id: "in-ml-tura", name: "Tura", popular: false, hotels: [] },
      ],
    },

    // 23. Odisha
    {
      code: "OR",
      name: "Odisha",
      cities: [
        { id: "in-or-bhubaneswar", name: "Bhubaneswar", popular: true, hotels: [] },
        { id: "in-or-puri", name: "Puri (Jagannath Temple)", popular: true, hotels: [] },
        { id: "in-or-konark", name: "Konark (Sun Temple)", popular: true, hotels: [] },
        { id: "in-or-cuttack", name: "Cuttack", popular: false, hotels: [] },
        { id: "in-or-chilika", name: "Chilika Lake", popular: false, hotels: [] },
        { id: "in-or-gopalpur", name: "Gopalpur-on-Sea", popular: false, hotels: [] },
        { id: "in-or-rourkela", name: "Rourkela", popular: false, hotels: [] },
      ],
    },

    // 24. Bihar
    {
      code: "BR",
      name: "Bihar",
      cities: [
        { id: "in-br-patna", name: "Patna", popular: false, hotels: [] },
        { id: "in-br-bodhgaya", name: "Bodh Gaya", popular: true, hotels: [] },
        { id: "in-br-rajgir", name: "Rajgir", popular: true, hotels: [] },
        { id: "in-br-nalanda", name: "Nalanda", popular: false, hotels: [] },
        { id: "in-br-gaya", name: "Gaya", popular: false, hotels: [] },
        { id: "in-br-bhagalpur", name: "Bhagalpur", popular: false, hotels: [] },
        { id: "in-br-muzaffarpur", name: "Muzaffarpur", popular: false, hotels: [] },
      ],
    },

    // 25. Jharkhand
    {
      code: "JH",
      name: "Jharkhand",
      cities: [
        { id: "in-jh-ranchi", name: "Ranchi", popular: false, hotels: [] },
        { id: "in-jh-jamshedpur", name: "Jamshedpur (Tatanagar)", popular: false, hotels: [] },
        { id: "in-jh-deoghar", name: "Deoghar (Baidyanath Dham)", popular: true, hotels: [] },
        { id: "in-jh-dhanbad", name: "Dhanbad", popular: false, hotels: [] },
        { id: "in-jh-bokaro", name: "Bokaro Steel City", popular: false, hotels: [] },
        { id: "in-jh-netarhat", name: "Netarhat", popular: false, hotels: [] },
      ],
    },

    // 26. Chhattisgarh
    {
      code: "CG",
      name: "Chhattisgarh",
      cities: [
        { id: "in-cg-raipur", name: "Raipur", popular: false, hotels: [] },
        { id: "in-cg-jagdalpur", name: "Jagdalpur (Chitrakote Falls)", popular: true, hotels: [] },
        { id: "in-cg-bilaspur", name: "Bilaspur", popular: false, hotels: [] },
        { id: "in-cg-bhilai", name: "Bhilai-Durg", popular: false, hotels: [] },
        { id: "in-cg-mainpat", name: "Mainpat", popular: false, hotels: [] },
      ],
    },

    // 27. Arunachal Pradesh
    {
      code: "AR",
      name: "Arunachal Pradesh",
      cities: [
        { id: "in-ar-tawang", name: "Tawang", popular: true, hotels: [] },
        { id: "in-ar-itanagar", name: "Itanagar", popular: false, hotels: [] },
        { id: "in-ar-ziro", name: "Ziro Valley", popular: true, hotels: [] },
        { id: "in-ar-bomdila", name: "Bomdila", popular: false, hotels: [] },
        { id: "in-ar-dirang", name: "Dirang", popular: false, hotels: [] },
      ],
    },

    // 28. Nagaland
    {
      code: "NL",
      name: "Nagaland",
      cities: [
        { id: "in-nl-kohima", name: "Kohima", popular: true, hotels: [] },
        { id: "in-nl-dimapur", name: "Dimapur", popular: false, hotels: [] },
        { id: "in-nl-mokokchung", name: "Mokokchung", popular: false, hotels: [] },
        { id: "in-nl-dzukou", name: "Dzukou Valley", popular: true, hotels: [] },
      ],
    },

    // 29. Manipur
    {
      code: "MN",
      name: "Manipur",
      cities: [
        { id: "in-mn-imphal", name: "Imphal", popular: true, hotels: [] },
        { id: "in-mn-loktak", name: "Loktak Lake (Moirang)", popular: true, hotels: [] },
        { id: "in-mn-ukhrul", name: "Ukhrul", popular: false, hotels: [] },
      ],
    },

    // 30. Mizoram
    {
      code: "MZ",
      name: "Mizoram",
      cities: [
        { id: "in-mz-aizawl", name: "Aizawl", popular: true, hotels: [] },
        { id: "in-mz-champhai", name: "Champhai", popular: false, hotels: [] },
        { id: "in-mz-lunglei", name: "Lunglei", popular: false, hotels: [] },
      ],
    },

    // 31. Tripura
    {
      code: "TR",
      name: "Tripura",
      cities: [
        { id: "in-tr-agartala", name: "Agartala", popular: true, hotels: [] },
        { id: "in-tr-udaipur", name: "Udaipur (Tripura Sundari)", popular: false, hotels: [] },
        { id: "in-tr-dharmanagar", name: "Dharmanagar", popular: false, hotels: [] },
      ],
    },

    // 32. Andaman and Nicobar Islands (UT)
    {
      code: "AN",
      name: "Andaman and Nicobar Islands",
      cities: [
        { id: "in-an-portblair", name: "Port Blair", popular: true, hotels: [] },
        { id: "in-an-havelock", name: "Havelock Island (Swaraj Dweep)", popular: true, hotels: [] },
        { id: "in-an-neil", name: "Neil Island (Shaheed Dweep)", popular: true, hotels: [] },
        { id: "in-an-baratang", name: "Baratang Island", popular: false, hotels: [] },
        { id: "in-an-diglipur", name: "Diglipur", popular: false, hotels: [] },
      ],
    },

    // 33. Puducherry (UT)
    {
      code: "PY",
      name: "Puducherry",
      cities: [
        { id: "in-py-pondicherry", name: "Pondicherry (White Town)", popular: true, hotels: [] },
        { id: "in-py-auroville", name: "Auroville", popular: true, hotels: [] },
        { id: "in-py-karaikal", name: "Karaikal", popular: false, hotels: [] },
      ],
    },

    // 34. Chandigarh (UT)
    {
      code: "CH",
      name: "Chandigarh",
      cities: [
        { id: "in-ch-chandigarh", name: "Chandigarh City", popular: true, hotels: [] },
      ],
    },

    // 35. Dadra & Nagar Haveli and Daman & Diu (UT)
    {
      code: "DH",
      name: "Dadra and Nagar Haveli and Daman and Diu",
      cities: [
        { id: "in-dh-daman", name: "Daman", popular: true, hotels: [] },
        { id: "in-dh-diu", name: "Diu", popular: true, hotels: [] },
        { id: "in-dh-silvassa", name: "Silvassa", popular: false, hotels: [] },
      ],
    },

    // 36. Lakshadweep (UT)
    {
      code: "LD",
      name: "Lakshadweep",
      cities: [
        { id: "in-ld-agatti", name: "Agatti Island", popular: true, hotels: [] },
        { id: "in-ld-bangaram", name: "Bangaram Atoll", popular: true, hotels: [] },
        { id: "in-ld-kavaratti", name: "Kavaratti", popular: false, hotels: [] },
        { id: "in-ld-minicoy", name: "Minicoy", popular: false, hotels: [] },
      ],
    },
  ],
};

