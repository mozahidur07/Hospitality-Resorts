/**
 * Global International Destinations Dataset
 * Covers 147+ countries across Europe, Asia, Americas, Africa, and Oceania.
 * Hierarchical structure: Country -> States/Provinces -> Cities -> hotels: []
 * Ready for Hotel Provider registrations.
 */

export const INTERNATIONAL_DESTINATIONS = [
  {
    "id": "country-ae",
    "name": "United Arab Emirates",
    "code": "AE",
    "continent": "Asia",
    "currency": "AED",
    "states": [
      {
        "code": "DXB",
        "name": "Dubai",
        "cities": [
          {
            "id": "ae-dxb-dubai",
            "name": "Dubai",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "AUH",
        "name": "Abu Dhabi",
        "cities": [
          {
            "id": "ae-auh-abudhabi",
            "name": "Abu Dhabi",
            "popular": true,
            "hotels": []
          },
          {
            "id": "ae-auh-alain",
            "name": "Al Ain",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "SHJ",
        "name": "Sharjah",
        "cities": [
          {
            "id": "ae-shj-sharjah",
            "name": "Sharjah",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "RAK",
        "name": "Ras Al Khaimah",
        "cities": [
          {
            "id": "ae-rak-rasalkhaimah",
            "name": "Ras Al Khaimah",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "AJM",
        "name": "Ajman",
        "cities": [
          {
            "id": "ae-ajm-ajman",
            "name": "Ajman",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "FUJ",
        "name": "Fujairah",
        "cities": [
          {
            "id": "ae-fuj-fujairah",
            "name": "Fujairah",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "UAQ",
        "name": "Umm Al Quwain",
        "cities": [
          {
            "id": "ae-uaq-ummalquwain",
            "name": "Umm Al Quwain",
            "popular": false,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-sa",
    "name": "Saudi Arabia",
    "code": "SA",
    "continent": "Asia",
    "currency": "SAR",
    "states": [
      {
        "code": "RIY",
        "name": "Riyadh",
        "cities": [
          {
            "id": "sa-riy-riyadh",
            "name": "Riyadh",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "MAK",
        "name": "Makkah",
        "cities": [
          {
            "id": "sa-mak-makkah",
            "name": "Mecca",
            "popular": true,
            "hotels": []
          },
          {
            "id": "sa-mak-jeddah",
            "name": "Jeddah",
            "popular": true,
            "hotels": []
          },
          {
            "id": "sa-mak-taif",
            "name": "Taif",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "MED",
        "name": "Madinah",
        "cities": [
          {
            "id": "sa-med-madinah",
            "name": "Medina",
            "popular": true,
            "hotels": []
          },
          {
            "id": "sa-med-yanbu",
            "name": "Yanbu",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "EAS",
        "name": "Eastern Province",
        "cities": [
          {
            "id": "sa-eas-dammam",
            "name": "Dammam",
            "popular": true,
            "hotels": []
          },
          {
            "id": "sa-eas-khobar",
            "name": "Al Khobar",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "TAB",
        "name": "Tabuk",
        "cities": [
          {
            "id": "sa-tab-tabuk",
            "name": "Tabuk",
            "popular": false,
            "hotels": []
          },
          {
            "id": "sa-tab-neom",
            "name": "NEOM",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "ASI",
        "name": "Asir",
        "cities": [
          {
            "id": "sa-asi-abha",
            "name": "Abha",
            "popular": false,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-sg",
    "name": "Singapore",
    "code": "SG",
    "continent": "Asia",
    "currency": "SGD",
    "states": [
      {
        "code": "SG-C",
        "name": "Central",
        "cities": [
          {
            "id": "sg-singapore",
            "name": "Singapore City",
            "popular": true,
            "hotels": []
          },
          {
            "id": "sg-sentosa",
            "name": "Sentosa Island",
            "popular": true,
            "hotels": []
          },
          {
            "id": "sg-marinabay",
            "name": "Marina Bay",
            "popular": true,
            "hotels": []
          },
          {
            "id": "sg-orchard",
            "name": "Orchard",
            "popular": true,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-th",
    "name": "Thailand",
    "code": "TH",
    "continent": "Asia",
    "currency": "THB",
    "states": [
      {
        "code": "BKK",
        "name": "Bangkok",
        "cities": [
          {
            "id": "th-bkk-bangkok",
            "name": "Bangkok",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "HKT",
        "name": "Phuket",
        "cities": [
          {
            "id": "th-hkt-phuket",
            "name": "Phuket",
            "popular": true,
            "hotels": []
          },
          {
            "id": "th-hkt-patong",
            "name": "Patong",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "CNX",
        "name": "Chiang Mai",
        "cities": [
          {
            "id": "th-cnx-chiangmai",
            "name": "Chiang Mai",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "CBI",
        "name": "Chon Buri",
        "cities": [
          {
            "id": "th-cbi-pattaya",
            "name": "Pattaya",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "SNI",
        "name": "Surat Thani",
        "cities": [
          {
            "id": "th-sni-samui",
            "name": "Koh Samui",
            "popular": true,
            "hotels": []
          },
          {
            "id": "th-sni-phangan",
            "name": "Koh Phangan",
            "popular": false,
            "hotels": []
          },
          {
            "id": "th-sni-tao",
            "name": "Koh Tao",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "KBI",
        "name": "Krabi",
        "cities": [
          {
            "id": "th-kbi-krabi",
            "name": "Krabi",
            "popular": true,
            "hotels": []
          },
          {
            "id": "th-kbi-aonang",
            "name": "Ao Nang",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "PRI",
        "name": "Prachuap Khiri Khan",
        "cities": [
          {
            "id": "th-pri-huahin",
            "name": "Hua Hin",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "CEI",
        "name": "Chiang Rai",
        "cities": [
          {
            "id": "th-cei-chiangrai",
            "name": "Chiang Rai",
            "popular": false,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-jp",
    "name": "Japan",
    "code": "JP",
    "continent": "Asia",
    "currency": "JPY",
    "states": [
      {
        "code": "TYO",
        "name": "Tokyo",
        "cities": [
          {
            "id": "jp-tyo-tokyo",
            "name": "Tokyo",
            "popular": true,
            "hotels": []
          },
          {
            "id": "jp-tyo-shinjuku",
            "name": "Shinjuku",
            "popular": true,
            "hotels": []
          },
          {
            "id": "jp-tyo-ginza",
            "name": "Ginza",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "KTO",
        "name": "Kyoto",
        "cities": [
          {
            "id": "jp-kto-kyoto",
            "name": "Kyoto",
            "popular": true,
            "hotels": []
          },
          {
            "id": "jp-kto-uji",
            "name": "Uji",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "OSA",
        "name": "Osaka",
        "cities": [
          {
            "id": "jp-osa-osaka",
            "name": "Osaka",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "HOK",
        "name": "Hokkaido",
        "cities": [
          {
            "id": "jp-hok-sapporo",
            "name": "Sapporo",
            "popular": true,
            "hotels": []
          },
          {
            "id": "jp-hok-niseko",
            "name": "Niseko",
            "popular": true,
            "hotels": []
          },
          {
            "id": "jp-hok-hakodate",
            "name": "Hakodate",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "KAN",
        "name": "Kanagawa",
        "cities": [
          {
            "id": "jp-kan-yokohama",
            "name": "Yokohama",
            "popular": false,
            "hotels": []
          },
          {
            "id": "jp-kan-hakone",
            "name": "Hakone",
            "popular": true,
            "hotels": []
          },
          {
            "id": "jp-kan-kamakura",
            "name": "Kamakura",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "OKI",
        "name": "Okinawa",
        "cities": [
          {
            "id": "jp-oki-naha",
            "name": "Naha",
            "popular": true,
            "hotels": []
          },
          {
            "id": "jp-oki-ishigaki",
            "name": "Ishigaki",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "FUK",
        "name": "Fukuoka",
        "cities": [
          {
            "id": "jp-fuk-fukuoka",
            "name": "Fukuoka",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "AIC",
        "name": "Aichi",
        "cities": [
          {
            "id": "jp-aic-nagoya",
            "name": "Nagoya",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "HIR",
        "name": "Hiroshima",
        "cities": [
          {
            "id": "jp-hir-hiroshima",
            "name": "Hiroshima",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "NAR",
        "name": "Nara",
        "cities": [
          {
            "id": "jp-nar-nara",
            "name": "Nara",
            "popular": false,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-my",
    "name": "Malaysia",
    "code": "MY",
    "continent": "Asia",
    "currency": "MYR",
    "states": [
      {
        "code": "KUL",
        "name": "Kuala Lumpur",
        "cities": [
          {
            "id": "my-kul-kualalumpur",
            "name": "Kuala Lumpur",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "PNG",
        "name": "Penang",
        "cities": [
          {
            "id": "my-png-georgetown",
            "name": "George Town",
            "popular": true,
            "hotels": []
          },
          {
            "id": "my-png-batuferringhi",
            "name": "Batu Ferringhi",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "KDH",
        "name": "Kedah",
        "cities": [
          {
            "id": "my-kdh-langkawi",
            "name": "Langkawi",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "SBH",
        "name": "Sabah",
        "cities": [
          {
            "id": "my-sbh-kotakinabalu",
            "name": "Kota Kinabalu",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "JHR",
        "name": "Johor",
        "cities": [
          {
            "id": "my-jhr-johorbahru",
            "name": "Johor Bahru",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "MLK",
        "name": "Malacca",
        "cities": [
          {
            "id": "my-mlk-malacca",
            "name": "Malacca City",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "SWK",
        "name": "Sarawak",
        "cities": [
          {
            "id": "my-swk-kuching",
            "name": "Kuching",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "PHG",
        "name": "Pahang",
        "cities": [
          {
            "id": "my-phg-genting",
            "name": "Genting Highlands",
            "popular": true,
            "hotels": []
          },
          {
            "id": "my-phg-cameron",
            "name": "Cameron Highlands",
            "popular": false,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-id",
    "name": "Indonesia",
    "code": "ID",
    "continent": "Asia",
    "currency": "IDR",
    "states": [
      {
        "code": "BAL",
        "name": "Bali",
        "cities": [
          {
            "id": "id-bal-denpasar",
            "name": "Denpasar",
            "popular": true,
            "hotels": []
          },
          {
            "id": "id-bal-ubud",
            "name": "Ubud",
            "popular": true,
            "hotels": []
          },
          {
            "id": "id-bal-seminyak",
            "name": "Seminyak",
            "popular": true,
            "hotels": []
          },
          {
            "id": "id-bal-kuta",
            "name": "Kuta",
            "popular": true,
            "hotels": []
          },
          {
            "id": "id-bal-canggu",
            "name": "Canggu",
            "popular": true,
            "hotels": []
          },
          {
            "id": "id-bal-nusa",
            "name": "Nusa Dua",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "JKT",
        "name": "Jakarta",
        "cities": [
          {
            "id": "id-jkt-jakarta",
            "name": "Jakarta",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "NTB",
        "name": "West Nusa Tenggara",
        "cities": [
          {
            "id": "id-ntb-lombok",
            "name": "Lombok",
            "popular": true,
            "hotels": []
          },
          {
            "id": "id-ntb-gili",
            "name": "Gili Islands",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "YOG",
        "name": "Yogyakarta",
        "cities": [
          {
            "id": "id-yog-yogyakarta",
            "name": "Yogyakarta",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "JAB",
        "name": "West Java",
        "cities": [
          {
            "id": "id-jab-bandung",
            "name": "Bandung",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "JAT",
        "name": "East Java",
        "cities": [
          {
            "id": "id-jat-surabaya",
            "name": "Surabaya",
            "popular": false,
            "hotels": []
          },
          {
            "id": "id-jat-bromo",
            "name": "Mount Bromo",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "NTT",
        "name": "East Nusa Tenggara",
        "cities": [
          {
            "id": "id-ntt-labuanbajo",
            "name": "Labuan Bajo (Komodo)",
            "popular": true,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-mv",
    "name": "Maldives",
    "code": "MV",
    "continent": "Asia",
    "currency": "MVR",
    "states": [
      {
        "code": "MLE",
        "name": "Malé Atoll",
        "cities": [
          {
            "id": "mv-mle-male",
            "name": "Malé",
            "popular": true,
            "hotels": []
          },
          {
            "id": "mv-mle-hulhumale",
            "name": "Hulhumalé",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "ARI",
        "name": "Ari Atoll",
        "cities": [
          {
            "id": "mv-ari-alif",
            "name": "North & South Ari Atoll",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "BAA",
        "name": "Baa Atoll",
        "cities": [
          {
            "id": "mv-baa-unesco",
            "name": "Baa Atoll Biosphere",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "KAA",
        "name": "Kaafu Atoll",
        "cities": [
          {
            "id": "mv-kaa-resorts",
            "name": "Kaafu Luxury Island Resorts",
            "popular": true,
            "hotels": []
          },
          {
            "id": "mv-kaa-maafushi",
            "name": "Maafushi Island",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "DHA",
        "name": "Dhaalu Atoll",
        "cities": [
          {
            "id": "mv-dha-atoll",
            "name": "Dhaalu Atoll",
            "popular": false,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-vn",
    "name": "Vietnam",
    "code": "VN",
    "continent": "Asia",
    "currency": "VND",
    "states": [
      {
        "code": "HAN",
        "name": "Hanoi",
        "cities": [
          {
            "id": "vn-han-hanoi",
            "name": "Hanoi",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "SGN",
        "name": "Ho Chi Minh City",
        "cities": [
          {
            "id": "vn-sgn-saigon",
            "name": "Ho Chi Minh City",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "QNH",
        "name": "Quang Ninh",
        "cities": [
          {
            "id": "vn-qnh-halong",
            "name": "Ha Long Bay",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "DAN",
        "name": "Da Nang",
        "cities": [
          {
            "id": "vn-dan-danang",
            "name": "Da Nang",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "QNA",
        "name": "Quang Nam",
        "cities": [
          {
            "id": "vn-qna-hoian",
            "name": "Hoi An",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "KHA",
        "name": "Khanh Hoa",
        "cities": [
          {
            "id": "vn-kha-nhatrang",
            "name": "Nha Trang",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "KGG",
        "name": "Kien Giang",
        "cities": [
          {
            "id": "vn-kgg-phuquoc",
            "name": "Phu Quoc Island",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "LDG",
        "name": "Lam Dong",
        "cities": [
          {
            "id": "vn-ldg-dalat",
            "name": "Da Lat",
            "popular": false,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-qa",
    "name": "Qatar",
    "code": "QA",
    "continent": "Asia",
    "currency": "QAR",
    "states": [
      {
        "code": "DOH",
        "name": "Doha",
        "cities": [
          {
            "id": "qa-doh-doha",
            "name": "Doha",
            "popular": true,
            "hotels": []
          },
          {
            "id": "qa-doh-pearl",
            "name": "The Pearl-Qatar",
            "popular": true,
            "hotels": []
          },
          {
            "id": "qa-doh-lusail",
            "name": "Lusail",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "RAY",
        "name": "Al Rayyan",
        "cities": [
          {
            "id": "qa-ray-alrayyan",
            "name": "Al Rayyan",
            "popular": false,
            "hotels": []
          },
          {
            "id": "qa-ray-educationcity",
            "name": "Education City",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "WAK",
        "name": "Al Wakrah",
        "cities": [
          {
            "id": "qa-wak-alwakrah",
            "name": "Al Wakrah",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "KHO",
        "name": "Al Khor",
        "cities": [
          {
            "id": "qa-kho-alkhor",
            "name": "Al Khor",
            "popular": false,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-om",
    "name": "Oman",
    "code": "OM",
    "continent": "Asia",
    "currency": "OMR",
    "states": [
      {
        "code": "MUS",
        "name": "Muscat",
        "cities": [
          {
            "id": "om-mus-muscat",
            "name": "Muscat",
            "popular": true,
            "hotels": []
          },
          {
            "id": "om-mus-seeb",
            "name": "Al Seeb",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "DHO",
        "name": "Dhofar",
        "cities": [
          {
            "id": "om-dho-salalah",
            "name": "Salalah",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "DAK",
        "name": "Ad Dakhiliyah",
        "cities": [
          {
            "id": "om-dak-nizwa",
            "name": "Nizwa",
            "popular": true,
            "hotels": []
          },
          {
            "id": "om-dak-jebelakhdar",
            "name": "Jebel Akhdar",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "BAT",
        "name": "Al Batinah",
        "cities": [
          {
            "id": "om-bat-sohar",
            "name": "Sohar",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "MUSANDAM",
        "name": "Musandam",
        "cities": [
          {
            "id": "om-msd-khasab",
            "name": "Khasab",
            "popular": false,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-bh",
    "name": "Bahrain",
    "code": "BH",
    "continent": "Asia",
    "currency": "BHD",
    "states": [
      {
        "code": "CAP",
        "name": "Capital Governorate",
        "cities": [
          {
            "id": "bh-cap-manama",
            "name": "Manama",
            "popular": true,
            "hotels": []
          },
          {
            "id": "bh-cap-juffair",
            "name": "Juffair",
            "popular": false,
            "hotels": []
          },
          {
            "id": "bh-cap-seef",
            "name": "Seef",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "MUH",
        "name": "Muharraq Governorate",
        "cities": [
          {
            "id": "bh-muh-muharraq",
            "name": "Muharraq",
            "popular": false,
            "hotels": []
          },
          {
            "id": "bh-muh-amwaj",
            "name": "Amwaj Islands",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "SOU",
        "name": "Southern Governorate",
        "cities": [
          {
            "id": "bh-sou-riffa",
            "name": "Riffa",
            "popular": false,
            "hotels": []
          },
          {
            "id": "bh-sou-zallaq",
            "name": "Al Zallaq",
            "popular": false,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-kw",
    "name": "Kuwait",
    "code": "KW",
    "continent": "Asia",
    "currency": "KWD",
    "states": [
      {
        "code": "ASI",
        "name": "Al Asimah",
        "cities": [
          {
            "id": "kw-asi-kuwaitcity",
            "name": "Kuwait City",
            "popular": true,
            "hotels": []
          },
          {
            "id": "kw-asi-sharq",
            "name": "Sharq",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "HAW",
        "name": "Hawalli",
        "cities": [
          {
            "id": "kw-haw-salmiya",
            "name": "Salmiya",
            "popular": true,
            "hotels": []
          },
          {
            "id": "kw-haw-hawalli",
            "name": "Hawalli",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "AHM",
        "name": "Al Ahmadi",
        "cities": [
          {
            "id": "kw-ahm-fahaheel",
            "name": "Fahaheel",
            "popular": false,
            "hotels": []
          },
          {
            "id": "kw-ahm-khiran",
            "name": "Al Khiran",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "FAR",
        "name": "Al Farwaniyah",
        "cities": [
          {
            "id": "kw-far-farwaniya",
            "name": "Farwaniya",
            "popular": false,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-kr",
    "name": "South Korea",
    "code": "KR",
    "continent": "Asia",
    "currency": "KRW",
    "states": [
      {
        "code": "SEO",
        "name": "Seoul",
        "cities": [
          {
            "id": "kr-seo-seoul",
            "name": "Seoul",
            "popular": true,
            "hotels": []
          },
          {
            "id": "kr-seo-gangnam",
            "name": "Gangnam",
            "popular": true,
            "hotels": []
          },
          {
            "id": "kr-seo-hongdae",
            "name": "Hongdae",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "BUS",
        "name": "Busan",
        "cities": [
          {
            "id": "kr-bus-busan",
            "name": "Busan",
            "popular": true,
            "hotels": []
          },
          {
            "id": "kr-bus-haeundae",
            "name": "Haeundae",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "JEJ",
        "name": "Jeju",
        "cities": [
          {
            "id": "kr-jej-jeju",
            "name": "Jeju Island",
            "popular": true,
            "hotels": []
          },
          {
            "id": "kr-jej-seogwipo",
            "name": "Seogwipo",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "INC",
        "name": "Incheon",
        "cities": [
          {
            "id": "kr-inc-incheon",
            "name": "Incheon",
            "popular": false,
            "hotels": []
          },
          {
            "id": "kr-inc-songdo",
            "name": "Songdo",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "GYE",
        "name": "Gyeonggi",
        "cities": [
          {
            "id": "kr-gye-suwon",
            "name": "Suwon",
            "popular": false,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-ph",
    "name": "Philippines",
    "code": "PH",
    "continent": "Asia",
    "currency": "PHP",
    "states": [
      {
        "code": "NCR",
        "name": "Metro Manila",
        "cities": [
          {
            "id": "ph-ncr-manila",
            "name": "Manila",
            "popular": true,
            "hotels": []
          },
          {
            "id": "ph-ncr-makati",
            "name": "Makati",
            "popular": true,
            "hotels": []
          },
          {
            "id": "ph-ncr-bgc",
            "name": "Taguig (BGC)",
            "popular": true,
            "hotels": []
          },
          {
            "id": "ph-ncr-quezon",
            "name": "Quezon City",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "CEB",
        "name": "Cebu",
        "cities": [
          {
            "id": "ph-ceb-cebucity",
            "name": "Cebu City",
            "popular": true,
            "hotels": []
          },
          {
            "id": "ph-ceb-mactan",
            "name": "Mactan Island",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "AKL",
        "name": "Aklan",
        "cities": [
          {
            "id": "ph-akl-boracay",
            "name": "Boracay Island",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "PLW",
        "name": "Palawan",
        "cities": [
          {
            "id": "ph-plw-elnido",
            "name": "El Nido",
            "popular": true,
            "hotels": []
          },
          {
            "id": "ph-plw-coron",
            "name": "Coron",
            "popular": true,
            "hotels": []
          },
          {
            "id": "ph-plw-puertoprincesa",
            "name": "Puerto Princesa",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "BOH",
        "name": "Bohol",
        "cities": [
          {
            "id": "ph-boh-panglao",
            "name": "Panglao Island",
            "popular": false,
            "hotels": []
          },
          {
            "id": "ph-boh-tagbilaran",
            "name": "Tagbilaran",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "SIA",
        "name": "Surigao del Norte",
        "cities": [
          {
            "id": "ph-sia-siargao",
            "name": "Siargao Island",
            "popular": true,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-lk",
    "name": "Sri Lanka",
    "code": "LK",
    "continent": "Asia",
    "currency": "LKR",
    "states": [
      {
        "code": "WES",
        "name": "Western Province",
        "cities": [
          {
            "id": "lk-wes-colombo",
            "name": "Colombo",
            "popular": true,
            "hotels": []
          },
          {
            "id": "lk-wes-negombo",
            "name": "Negombo",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "CEN",
        "name": "Central Province",
        "cities": [
          {
            "id": "lk-cen-kandy",
            "name": "Kandy",
            "popular": true,
            "hotels": []
          },
          {
            "id": "lk-cen-nuwaraeliya",
            "name": "Nuwara Eliya",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "SOU",
        "name": "Southern Province",
        "cities": [
          {
            "id": "lk-sou-galle",
            "name": "Galle",
            "popular": true,
            "hotels": []
          },
          {
            "id": "lk-sou-mirissa",
            "name": "Mirissa",
            "popular": true,
            "hotels": []
          },
          {
            "id": "lk-sou-bentota",
            "name": "Bentota",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "UVA",
        "name": "Uva Province",
        "cities": [
          {
            "id": "lk-uva-ella",
            "name": "Ella",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "NCP",
        "name": "North Central Province",
        "cities": [
          {
            "id": "lk-ncp-sigiriya",
            "name": "Sigiriya",
            "popular": true,
            "hotels": []
          },
          {
            "id": "lk-ncp-anuradhapura",
            "name": "Anuradhapura",
            "popular": false,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-np",
    "name": "Nepal",
    "code": "NP",
    "continent": "Asia",
    "currency": "NPR",
    "states": [
      {
        "code": "BAG",
        "name": "Bagmati",
        "cities": [
          {
            "id": "np-bag-kathmandu",
            "name": "Kathmandu",
            "popular": true,
            "hotels": []
          },
          {
            "id": "np-bag-bhaktapur",
            "name": "Bhaktapur",
            "popular": false,
            "hotels": []
          },
          {
            "id": "np-bag-patannp",
            "name": "Lalitpur (Patan)",
            "popular": false,
            "hotels": []
          },
          {
            "id": "np-bag-nagarkot",
            "name": "Nagarkot",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "GAN",
        "name": "Gandaki",
        "cities": [
          {
            "id": "np-gan-pokhara",
            "name": "Pokhara",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "KOS",
        "name": "Koshi",
        "cities": [
          {
            "id": "np-kos-namche",
            "name": "Namche Bazaar (Everest)",
            "popular": true,
            "hotels": []
          },
          {
            "id": "np-kos-dharan",
            "name": "Dharan",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "LUM",
        "name": "Lumbini",
        "cities": [
          {
            "id": "np-lum-lumbini",
            "name": "Lumbini",
            "popular": true,
            "hotels": []
          },
          {
            "id": "np-lum-chitwan",
            "name": "Chitwan (Sauraha)",
            "popular": true,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-bt",
    "name": "Bhutan",
    "code": "BT",
    "continent": "Asia",
    "currency": "BTN",
    "states": [
      {
        "code": "THI",
        "name": "Thimphu",
        "cities": [
          {
            "id": "bt-thi-thimphu",
            "name": "Thimphu",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "PAR",
        "name": "Paro",
        "cities": [
          {
            "id": "bt-par-paro",
            "name": "Paro",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "PUN",
        "name": "Punakha",
        "cities": [
          {
            "id": "bt-pun-punakha",
            "name": "Punakha",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "BUM",
        "name": "Bumthang",
        "cities": [
          {
            "id": "bt-bum-bumthang",
            "name": "Bumthang (Jakar)",
            "popular": false,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-bd",
    "name": "Bangladesh",
    "code": "BD",
    "continent": "Asia",
    "currency": "BDT",
    "states": [
      {
        "code": "DHA",
        "name": "Dhaka",
        "cities": [
          {
            "id": "bd-dha-dhaka",
            "name": "Dhaka",
            "popular": true,
            "hotels": []
          },
          {
            "id": "bd-dha-gazipur",
            "name": "Gazipur",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "CTG",
        "name": "Chittagong",
        "cities": [
          {
            "id": "bd-ctg-coxsbazar",
            "name": "Cox's Bazar",
            "popular": true,
            "hotels": []
          },
          {
            "id": "bd-ctg-chittagong",
            "name": "Chittagong",
            "popular": true,
            "hotels": []
          },
          {
            "id": "bd-ctg-saintmartin",
            "name": "Saint Martin Island",
            "popular": false,
            "hotels": []
          },
          {
            "id": "bd-ctg-rangamati",
            "name": "Rangamati",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "SYL",
        "name": "Sylhet",
        "cities": [
          {
            "id": "bd-syl-sylhet",
            "name": "Sylhet",
            "popular": true,
            "hotels": []
          },
          {
            "id": "bd-syl-sreemangal",
            "name": "Sreemangal",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "KHU",
        "name": "Khulna",
        "cities": [
          {
            "id": "bd-khu-khulna",
            "name": "Khulna",
            "popular": false,
            "hotels": []
          },
          {
            "id": "bd-khu-sundarbans",
            "name": "Sundarbans Gateway",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "RAJ",
        "name": "Rajshahi",
        "cities": [
          {
            "id": "bd-raj-rajshahi",
            "name": "Rajshahi",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "BAR",
        "name": "Barisal",
        "cities": [
          {
            "id": "bd-bar-kuakata",
            "name": "Kuakata",
            "popular": false,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-tr",
    "name": "Turkey (Türkiye)",
    "code": "TR",
    "continent": "Asia",
    "currency": "TRY",
    "states": [
      {
        "code": "IST",
        "name": "Istanbul",
        "cities": [
          {
            "id": "tr-ist-istanbul",
            "name": "Istanbul",
            "popular": true,
            "hotels": []
          },
          {
            "id": "tr-ist-beyoglu",
            "name": "Beyoğlu",
            "popular": false,
            "hotels": []
          },
          {
            "id": "tr-ist-sultanahmet",
            "name": "Sultanahmet",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "ANT",
        "name": "Antalya",
        "cities": [
          {
            "id": "tr-ant-antalya",
            "name": "Antalya",
            "popular": true,
            "hotels": []
          },
          {
            "id": "tr-ant-alanya",
            "name": "Alanya",
            "popular": false,
            "hotels": []
          },
          {
            "id": "tr-ant-side",
            "name": "Side",
            "popular": false,
            "hotels": []
          },
          {
            "id": "tr-ant-kas",
            "name": "Kaş",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "NEV",
        "name": "Nevşehir (Cappadocia)",
        "cities": [
          {
            "id": "tr-nev-goreme",
            "name": "Göreme",
            "popular": true,
            "hotels": []
          },
          {
            "id": "tr-nev-urgup",
            "name": "Ürgüp",
            "popular": false,
            "hotels": []
          },
          {
            "id": "tr-nev-uchisar",
            "name": "Uçhisar",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "MUG",
        "name": "Muğla",
        "cities": [
          {
            "id": "tr-mug-bodrum",
            "name": "Bodrum",
            "popular": true,
            "hotels": []
          },
          {
            "id": "tr-mug-marmaris",
            "name": "Marmaris",
            "popular": false,
            "hotels": []
          },
          {
            "id": "tr-mug-fethiye",
            "name": "Fethiye (Ölüdeniz)",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "IZM",
        "name": "Izmir",
        "cities": [
          {
            "id": "tr-izm-izmir",
            "name": "Izmir",
            "popular": false,
            "hotels": []
          },
          {
            "id": "tr-izm-cesme",
            "name": "Çeşme (Alaçatı)",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "ANK",
        "name": "Ankara",
        "cities": [
          {
            "id": "tr-ank-ankara",
            "name": "Ankara",
            "popular": false,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-jo",
    "name": "Jordan",
    "code": "JO",
    "continent": "Asia",
    "currency": "JOD",
    "states": [
      {
        "code": "AMM",
        "name": "Amman",
        "cities": [
          {
            "id": "jo-amm-amman",
            "name": "Amman",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "MAA",
        "name": "Ma'an",
        "cities": [
          {
            "id": "jo-maa-petra",
            "name": "Petra (Wadi Musa)",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "AQB",
        "name": "Aqaba",
        "cities": [
          {
            "id": "jo-aqb-aqaba",
            "name": "Aqaba",
            "popular": true,
            "hotels": []
          },
          {
            "id": "jo-aqb-wadirum",
            "name": "Wadi Rum",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "BAL",
        "name": "Balqa (Dead Sea)",
        "cities": [
          {
            "id": "jo-bal-deadsea",
            "name": "Dead Sea Coast",
            "popular": true,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-il",
    "name": "Israel",
    "code": "IL",
    "continent": "Asia",
    "currency": "ILS",
    "states": [
      {
        "code": "TA",
        "name": "Tel Aviv",
        "cities": [
          {
            "id": "il-ta-telaviv",
            "name": "Tel Aviv",
            "popular": true,
            "hotels": []
          },
          {
            "id": "il-ta-jaffa",
            "name": "Jaffa",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "JER",
        "name": "Jerusalem",
        "cities": [
          {
            "id": "il-jer-jerusalem",
            "name": "Jerusalem",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "HAI",
        "name": "Haifa",
        "cities": [
          {
            "id": "il-hai-haifa",
            "name": "Haifa",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "SOU",
        "name": "Southern District",
        "cities": [
          {
            "id": "il-sou-eilat",
            "name": "Eilat",
            "popular": true,
            "hotels": []
          },
          {
            "id": "il-sou-deadsea",
            "name": "Dead Sea (Ein Bokek)",
            "popular": false,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-lb",
    "name": "Lebanon",
    "code": "LB",
    "continent": "Asia",
    "currency": "LBP",
    "states": [
      {
        "code": "BEY",
        "name": "Beirut",
        "cities": [
          {
            "id": "lb-bey-beirut",
            "name": "Beirut",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "MNB",
        "name": "Mount Lebanon",
        "cities": [
          {
            "id": "lb-mnb-jounieh",
            "name": "Jounieh",
            "popular": false,
            "hotels": []
          },
          {
            "id": "lb-mnb-byblos",
            "name": "Byblos",
            "popular": true,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-ge",
    "name": "Georgia",
    "code": "GE",
    "continent": "Asia",
    "currency": "GEL",
    "states": [
      {
        "code": "TBS",
        "name": "Tbilisi",
        "cities": [
          {
            "id": "ge-tbs-tbilisi",
            "name": "Tbilisi",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "ADJ",
        "name": "Adjara",
        "cities": [
          {
            "id": "ge-adj-batumi",
            "name": "Batumi",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "MSH",
        "name": "Mtskheta-Mtianeti",
        "cities": [
          {
            "id": "ge-msh-kazbegi",
            "name": "Kazbegi (Stepantsminda)",
            "popular": true,
            "hotels": []
          },
          {
            "id": "ge-msh-gudauri",
            "name": "Gudauri Ski Resort",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "KAK",
        "name": "Kakheti",
        "cities": [
          {
            "id": "ge-kak-sighnaghi",
            "name": "Sighnaghi",
            "popular": false,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-am",
    "name": "Armenia",
    "code": "AM",
    "continent": "Asia",
    "currency": "AMD",
    "states": [
      {
        "code": "EVN",
        "name": "Yerevan",
        "cities": [
          {
            "id": "am-evn-yerevan",
            "name": "Yerevan",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "KOT",
        "name": "Kotayk",
        "cities": [
          {
            "id": "am-kot-tsaghkadzor",
            "name": "Tsaghkadzor Ski",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "GEG",
        "name": "Gegharkunik",
        "cities": [
          {
            "id": "am-geg-sevan",
            "name": "Lake Sevan",
            "popular": false,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-az",
    "name": "Azerbaijan",
    "code": "AZ",
    "continent": "Asia",
    "currency": "AZN",
    "states": [
      {
        "code": "BAK",
        "name": "Baku",
        "cities": [
          {
            "id": "az-bak-baku",
            "name": "Baku",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "QAB",
        "name": "Gabala",
        "cities": [
          {
            "id": "az-qab-gabala",
            "name": "Gabala (Qabala)",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "QUS",
        "name": "Qusar",
        "cities": [
          {
            "id": "az-qus-shahdag",
            "name": "Shahdag Mountain Resort",
            "popular": true,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-uz",
    "name": "Uzbekistan",
    "code": "UZ",
    "continent": "Asia",
    "currency": "UZS",
    "states": [
      {
        "code": "TAS",
        "name": "Tashkent",
        "cities": [
          {
            "id": "uz-tas-tashkent",
            "name": "Tashkent",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "SAM",
        "name": "Samarkand",
        "cities": [
          {
            "id": "uz-sam-samarkand",
            "name": "Samarkand",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "BUK",
        "name": "Bukhara",
        "cities": [
          {
            "id": "uz-buk-bukhara",
            "name": "Bukhara",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "KHO",
        "name": "Khorezm",
        "cities": [
          {
            "id": "uz-kho-khiva",
            "name": "Khiva",
            "popular": false,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-kz",
    "name": "Kazakhstan",
    "code": "KZ",
    "continent": "Asia",
    "currency": "KZT",
    "states": [
      {
        "code": "ALA",
        "name": "Almaty",
        "cities": [
          {
            "id": "kz-ala-almaty",
            "name": "Almaty",
            "popular": true,
            "hotels": []
          },
          {
            "id": "kz-ala-shymbulak",
            "name": "Shymbulak",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "AST",
        "name": "Astana",
        "cities": [
          {
            "id": "kz-ast-astana",
            "name": "Astana",
            "popular": true,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-tw",
    "name": "Taiwan",
    "code": "TW",
    "continent": "Asia",
    "currency": "TWD",
    "states": [
      {
        "code": "TPE",
        "name": "Taipei",
        "cities": [
          {
            "id": "tw-tpe-taipei",
            "name": "Taipei",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "KHH",
        "name": "Kaohsiung",
        "cities": [
          {
            "id": "tw-khh-kaohsiung",
            "name": "Kaohsiung",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "TXG",
        "name": "Taichung",
        "cities": [
          {
            "id": "tw-txg-taichung",
            "name": "Taichung",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "NAN",
        "name": "Nantou",
        "cities": [
          {
            "id": "tw-nan-sunmoonlake",
            "name": "Sun Moon Lake",
            "popular": true,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-hk",
    "name": "Hong Kong",
    "code": "HK",
    "continent": "Asia",
    "currency": "HKD",
    "states": [
      {
        "code": "HKI",
        "name": "Hong Kong Island",
        "cities": [
          {
            "id": "hk-central",
            "name": "Central",
            "popular": true,
            "hotels": []
          },
          {
            "id": "hk-wan-chai",
            "name": "Wan Chai",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "KLN",
        "name": "Kowloon",
        "cities": [
          {
            "id": "hk-tsimshatsui",
            "name": "Tsim Sha Tsui",
            "popular": true,
            "hotels": []
          },
          {
            "id": "hk-mong-kok",
            "name": "Mong Kok",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "LAN",
        "name": "Lantau Island",
        "cities": [
          {
            "id": "hk-disneyland",
            "name": "Hong Kong Disneyland",
            "popular": true,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-mo",
    "name": "Macau",
    "code": "MO",
    "continent": "Asia",
    "currency": "MOP",
    "states": [
      {
        "code": "MAC",
        "name": "Macau Peninsula",
        "cities": [
          {
            "id": "mo-mac-macau",
            "name": "Macau City",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "COT",
        "name": "Cotai",
        "cities": [
          {
            "id": "mo-cot-cotai",
            "name": "Cotai Strip (Resorts)",
            "popular": true,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-gb",
    "name": "United Kingdom",
    "code": "GB",
    "continent": "Europe",
    "currency": "GBP",
    "states": [
      {
        "code": "ENG",
        "name": "England",
        "cities": [
          {
            "id": "gb-eng-london",
            "name": "London",
            "popular": true,
            "hotels": []
          },
          {
            "id": "gb-eng-manchester",
            "name": "Manchester",
            "popular": true,
            "hotels": []
          },
          {
            "id": "gb-eng-birmingham",
            "name": "Birmingham",
            "popular": false,
            "hotels": []
          },
          {
            "id": "gb-eng-liverpool",
            "name": "Liverpool",
            "popular": false,
            "hotels": []
          },
          {
            "id": "gb-eng-oxford",
            "name": "Oxford",
            "popular": true,
            "hotels": []
          },
          {
            "id": "gb-eng-cambridge",
            "name": "Cambridge",
            "popular": true,
            "hotels": []
          },
          {
            "id": "gb-eng-bath",
            "name": "Bath",
            "popular": true,
            "hotels": []
          },
          {
            "id": "gb-eng-brighton",
            "name": "Brighton",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "SCT",
        "name": "Scotland",
        "cities": [
          {
            "id": "gb-sct-edinburgh",
            "name": "Edinburgh",
            "popular": true,
            "hotels": []
          },
          {
            "id": "gb-sct-glasgow",
            "name": "Glasgow",
            "popular": true,
            "hotels": []
          },
          {
            "id": "gb-sct-highlands",
            "name": "Inverness (Highlands)",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "WLS",
        "name": "Wales",
        "cities": [
          {
            "id": "gb-wls-cardiff",
            "name": "Cardiff",
            "popular": false,
            "hotels": []
          },
          {
            "id": "gb-wls-swansea",
            "name": "Swansea",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "NIR",
        "name": "Northern Ireland",
        "cities": [
          {
            "id": "gb-nir-belfast",
            "name": "Belfast",
            "popular": true,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-fr",
    "name": "France",
    "code": "FR",
    "continent": "Europe",
    "currency": "EUR",
    "states": [
      {
        "code": "IDF",
        "name": "Île-de-France",
        "cities": [
          {
            "id": "fr-idf-paris",
            "name": "Paris",
            "popular": true,
            "hotels": []
          },
          {
            "id": "fr-idf-versailles",
            "name": "Versailles",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "PAC",
        "name": "Provence-Alpes-Côte d'Azur",
        "cities": [
          {
            "id": "fr-pac-nice",
            "name": "Nice",
            "popular": true,
            "hotels": []
          },
          {
            "id": "fr-pac-cannes",
            "name": "Cannes",
            "popular": true,
            "hotels": []
          },
          {
            "id": "fr-pac-marseille",
            "name": "Marseille",
            "popular": false,
            "hotels": []
          },
          {
            "id": "fr-pac-saint-tropez",
            "name": "Saint-Tropez",
            "popular": true,
            "hotels": []
          },
          {
            "id": "fr-pac-antibes",
            "name": "Antibes",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "ARA",
        "name": "Auvergne-Rhône-Alpes",
        "cities": [
          {
            "id": "fr-ara-lyon",
            "name": "Lyon",
            "popular": true,
            "hotels": []
          },
          {
            "id": "fr-ara-chamonix",
            "name": "Chamonix Mont-Blanc",
            "popular": true,
            "hotels": []
          },
          {
            "id": "fr-ara-annecy",
            "name": "Annecy",
            "popular": true,
            "hotels": []
          },
          {
            "id": "fr-ara-courchevel",
            "name": "Courchevel",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "NAQ",
        "name": "Nouvelle-Aquitaine",
        "cities": [
          {
            "id": "fr-naq-bordeaux",
            "name": "Bordeaux",
            "popular": true,
            "hotels": []
          },
          {
            "id": "fr-naq-biarritz",
            "name": "Biarritz",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "OCC",
        "name": "Occitanie",
        "cities": [
          {
            "id": "fr-occ-toulouse",
            "name": "Toulouse",
            "popular": false,
            "hotels": []
          },
          {
            "id": "fr-occ-carcassonne",
            "name": "Carcassonne",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "GES",
        "name": "Grand Est",
        "cities": [
          {
            "id": "fr-ges-strasbourg",
            "name": "Strasbourg",
            "popular": true,
            "hotels": []
          },
          {
            "id": "fr-ges-colmar",
            "name": "Colmar",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "NOR",
        "name": "Normandy",
        "cities": [
          {
            "id": "fr-nor-montstmichel",
            "name": "Mont Saint-Michel",
            "popular": true,
            "hotels": []
          },
          {
            "id": "fr-nor-rouen",
            "name": "Rouen",
            "popular": false,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-it",
    "name": "Italy",
    "code": "IT",
    "continent": "Europe",
    "currency": "EUR",
    "states": [
      {
        "code": "LAZ",
        "name": "Lazio",
        "cities": [
          {
            "id": "it-laz-rome",
            "name": "Rome",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "LOM",
        "name": "Lombardy",
        "cities": [
          {
            "id": "it-lom-milan",
            "name": "Milan",
            "popular": true,
            "hotels": []
          },
          {
            "id": "it-lom-lakecomo",
            "name": "Lake Como (Bellagio)",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "VEN",
        "name": "Veneto",
        "cities": [
          {
            "id": "it-ven-venice",
            "name": "Venice",
            "popular": true,
            "hotels": []
          },
          {
            "id": "it-ven-verona",
            "name": "Verona",
            "popular": false,
            "hotels": []
          },
          {
            "id": "it-ven-cortina",
            "name": "Cortina d'Ampezzo",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "TOS",
        "name": "Tuscany",
        "cities": [
          {
            "id": "it-tos-florence",
            "name": "Florence",
            "popular": true,
            "hotels": []
          },
          {
            "id": "it-tos-siena",
            "name": "Siena",
            "popular": false,
            "hotels": []
          },
          {
            "id": "it-tos-pisa",
            "name": "Pisa",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "CAM",
        "name": "Campania",
        "cities": [
          {
            "id": "it-cam-naples",
            "name": "Naples",
            "popular": false,
            "hotels": []
          },
          {
            "id": "it-cam-amalfi",
            "name": "Amalfi Coast (Positano)",
            "popular": true,
            "hotels": []
          },
          {
            "id": "it-cam-capri",
            "name": "Capri",
            "popular": true,
            "hotels": []
          },
          {
            "id": "it-cam-sorrento",
            "name": "Sorrento",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "SIC",
        "name": "Sicily",
        "cities": [
          {
            "id": "it-sic-palermo",
            "name": "Palermo",
            "popular": false,
            "hotels": []
          },
          {
            "id": "it-sic-taormina",
            "name": "Taormina",
            "popular": true,
            "hotels": []
          },
          {
            "id": "it-sic-catania",
            "name": "Catania",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "LIG",
        "name": "Liguria",
        "cities": [
          {
            "id": "it-lig-cinqueterre",
            "name": "Cinque Terre",
            "popular": true,
            "hotels": []
          },
          {
            "id": "it-lig-portofino",
            "name": "Portofino",
            "popular": true,
            "hotels": []
          },
          {
            "id": "it-lig-genoa",
            "name": "Genoa",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "TAA",
        "name": "Trentino-Alto Adige",
        "cities": [
          {
            "id": "it-taa-dolomites",
            "name": "Dolomites (Val Gardena)",
            "popular": true,
            "hotels": []
          },
          {
            "id": "it-taa-bolzano",
            "name": "Bolzano",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "PUG",
        "name": "Puglia",
        "cities": [
          {
            "id": "it-pug-bari",
            "name": "Bari",
            "popular": false,
            "hotels": []
          },
          {
            "id": "it-pug-alberobello",
            "name": "Alberobello",
            "popular": false,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-de",
    "name": "Germany",
    "code": "DE",
    "continent": "Europe",
    "currency": "EUR",
    "states": [
      {
        "code": "BER",
        "name": "Berlin",
        "cities": [
          {
            "id": "de-ber-berlin",
            "name": "Berlin",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "BY",
        "name": "Bavaria",
        "cities": [
          {
            "id": "de-by-munich",
            "name": "Munich",
            "popular": true,
            "hotels": []
          },
          {
            "id": "de-by-nuremberg",
            "name": "Nuremberg",
            "popular": false,
            "hotels": []
          },
          {
            "id": "de-by-fussen",
            "name": "Füssen (Neuschwanstein)",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "HE",
        "name": "Hesse",
        "cities": [
          {
            "id": "de-he-frankfurt",
            "name": "Frankfurt",
            "popular": true,
            "hotels": []
          },
          {
            "id": "de-he-wiesbaden",
            "name": "Wiesbaden",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "HH",
        "name": "Hamburg",
        "cities": [
          {
            "id": "de-hh-hamburg",
            "name": "Hamburg",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "BW",
        "name": "Baden-Württemberg",
        "cities": [
          {
            "id": "de-bw-stuttgart",
            "name": "Stuttgart",
            "popular": false,
            "hotels": []
          },
          {
            "id": "de-bw-heidelberg",
            "name": "Heidelberg",
            "popular": true,
            "hotels": []
          },
          {
            "id": "de-bw-badenbaden",
            "name": "Baden-Baden",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "NW",
        "name": "North Rhine-Westphalia",
        "cities": [
          {
            "id": "de-nw-cologne",
            "name": "Cologne",
            "popular": true,
            "hotels": []
          },
          {
            "id": "de-nw-dusseldorf",
            "name": "Düsseldorf",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "SN",
        "name": "Saxony",
        "cities": [
          {
            "id": "de-sn-dresden",
            "name": "Dresden",
            "popular": false,
            "hotels": []
          },
          {
            "id": "de-sn-leipzig",
            "name": "Leipzig",
            "popular": false,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-es",
    "name": "Spain",
    "code": "ES",
    "continent": "Europe",
    "currency": "EUR",
    "states": [
      {
        "code": "CAT",
        "name": "Catalonia",
        "cities": [
          {
            "id": "es-cat-barcelona",
            "name": "Barcelona",
            "popular": true,
            "hotels": []
          },
          {
            "id": "es-cat-girona",
            "name": "Girona (Costa Brava)",
            "popular": false,
            "hotels": []
          },
          {
            "id": "es-cat-sitges",
            "name": "Sitges",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "MAD",
        "name": "Madrid",
        "cities": [
          {
            "id": "es-mad-madrid",
            "name": "Madrid",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "AND",
        "name": "Andalusia",
        "cities": [
          {
            "id": "es-and-seville",
            "name": "Seville",
            "popular": true,
            "hotels": []
          },
          {
            "id": "es-and-malaga",
            "name": "Málaga (Costa del Sol)",
            "popular": true,
            "hotels": []
          },
          {
            "id": "es-and-marbella",
            "name": "Marbella",
            "popular": true,
            "hotels": []
          },
          {
            "id": "es-and-granada",
            "name": "Granada",
            "popular": true,
            "hotels": []
          },
          {
            "id": "es-and-cordoba",
            "name": "Córdoba",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "IB",
        "name": "Balearic Islands",
        "cities": [
          {
            "id": "es-ib-mallorca",
            "name": "Mallorca (Palma)",
            "popular": true,
            "hotels": []
          },
          {
            "id": "es-ib-ibiza",
            "name": "Ibiza",
            "popular": true,
            "hotels": []
          },
          {
            "id": "es-ib-menorca",
            "name": "Menorca",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "CN",
        "name": "Canary Islands",
        "cities": [
          {
            "id": "es-cn-tenerife",
            "name": "Tenerife",
            "popular": true,
            "hotels": []
          },
          {
            "id": "es-cn-grancanaria",
            "name": "Gran Canaria",
            "popular": true,
            "hotels": []
          },
          {
            "id": "es-cn-lanzarote",
            "name": "Lanzarote",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "VAL",
        "name": "Valencian Community",
        "cities": [
          {
            "id": "es-val-valencia",
            "name": "Valencia",
            "popular": true,
            "hotels": []
          },
          {
            "id": "es-val-alicante",
            "name": "Alicante",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "PV",
        "name": "Basque Country",
        "cities": [
          {
            "id": "es-pv-sansebastian",
            "name": "San Sebastián",
            "popular": true,
            "hotels": []
          },
          {
            "id": "es-pv-bilbao",
            "name": "Bilbao",
            "popular": false,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-ch",
    "name": "Switzerland",
    "code": "CH",
    "continent": "Europe",
    "currency": "CHF",
    "states": [
      {
        "code": "ZH",
        "name": "Zurich",
        "cities": [
          {
            "id": "ch-zh-zurich",
            "name": "Zurich",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "GE",
        "name": "Geneva",
        "cities": [
          {
            "id": "ch-ge-geneva",
            "name": "Geneva",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "BE",
        "name": "Bern",
        "cities": [
          {
            "id": "ch-be-bern",
            "name": "Bern",
            "popular": false,
            "hotels": []
          },
          {
            "id": "ch-be-interlaken",
            "name": "Interlaken",
            "popular": true,
            "hotels": []
          },
          {
            "id": "ch-be-grindelwald",
            "name": "Grindelwald",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "LU",
        "name": "Lucerne",
        "cities": [
          {
            "id": "ch-lu-lucerne",
            "name": "Lucerne",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "VS",
        "name": "Valais",
        "cities": [
          {
            "id": "ch-vs-zermatt",
            "name": "Zermatt (Matterhorn)",
            "popular": true,
            "hotels": []
          },
          {
            "id": "ch-vs-verbier",
            "name": "Verbier",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "GR",
        "name": "Graubünden",
        "cities": [
          {
            "id": "ch-gr-stmoritz",
            "name": "St. Moritz",
            "popular": true,
            "hotels": []
          },
          {
            "id": "ch-gr-davos",
            "name": "Davos",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "TI",
        "name": "Ticino",
        "cities": [
          {
            "id": "ch-ti-lugano",
            "name": "Lugano",
            "popular": false,
            "hotels": []
          },
          {
            "id": "ch-ti-locarno",
            "name": "Locarno",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "VD",
        "name": "Vaud",
        "cities": [
          {
            "id": "ch-vd-montreux",
            "name": "Montreux",
            "popular": true,
            "hotels": []
          },
          {
            "id": "ch-vd-lausanne",
            "name": "Lausanne",
            "popular": false,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-at",
    "name": "Austria",
    "code": "AT",
    "continent": "Europe",
    "currency": "EUR",
    "states": [
      {
        "code": "VIE",
        "name": "Vienna",
        "cities": [
          {
            "id": "at-vie-vienna",
            "name": "Vienna",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "SBG",
        "name": "Salzburg",
        "cities": [
          {
            "id": "at-sbg-salzburg",
            "name": "Salzburg",
            "popular": true,
            "hotels": []
          },
          {
            "id": "at-sbg-zellamsee",
            "name": "Zell am See",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "TYR",
        "name": "Tyrol",
        "cities": [
          {
            "id": "at-tyr-innsbruck",
            "name": "Innsbruck",
            "popular": true,
            "hotels": []
          },
          {
            "id": "at-tyr-kitzbuhel",
            "name": "Kitzbühel",
            "popular": false,
            "hotels": []
          },
          {
            "id": "at-tyr-stanton",
            "name": "St. Anton am Arlberg",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "OOE",
        "name": "Upper Austria",
        "cities": [
          {
            "id": "at-ooe-hallstatt",
            "name": "Hallstatt",
            "popular": true,
            "hotels": []
          },
          {
            "id": "at-ooe-linz",
            "name": "Linz",
            "popular": false,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-nl",
    "name": "Netherlands",
    "code": "NL",
    "continent": "Europe",
    "currency": "EUR",
    "states": [
      {
        "code": "NH",
        "name": "North Holland",
        "cities": [
          {
            "id": "nl-nh-amsterdam",
            "name": "Amsterdam",
            "popular": true,
            "hotels": []
          },
          {
            "id": "nl-nh-haarlem",
            "name": "Haarlem",
            "popular": false,
            "hotels": []
          },
          {
            "id": "nl-nh-zaandam",
            "name": "Zaandam",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "ZH",
        "name": "South Holland",
        "cities": [
          {
            "id": "nl-zh-rotterdam",
            "name": "Rotterdam",
            "popular": true,
            "hotels": []
          },
          {
            "id": "nl-zh-thehague",
            "name": "The Hague",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "UT",
        "name": "Utrecht",
        "cities": [
          {
            "id": "nl-ut-utrecht",
            "name": "Utrecht",
            "popular": false,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-be",
    "name": "Belgium",
    "code": "BE",
    "continent": "Europe",
    "currency": "EUR",
    "states": [
      {
        "code": "BRU",
        "name": "Brussels-Capital",
        "cities": [
          {
            "id": "be-bru-brussels",
            "name": "Brussels",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "VLG",
        "name": "Flanders",
        "cities": [
          {
            "id": "be-vlg-bruges",
            "name": "Bruges",
            "popular": true,
            "hotels": []
          },
          {
            "id": "be-vlg-ghent",
            "name": "Ghent",
            "popular": true,
            "hotels": []
          },
          {
            "id": "be-vlg-antwerp",
            "name": "Antwerp",
            "popular": false,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-pt",
    "name": "Portugal",
    "code": "PT",
    "continent": "Europe",
    "currency": "EUR",
    "states": [
      {
        "code": "LIS",
        "name": "Lisbon",
        "cities": [
          {
            "id": "pt-lis-lisbon",
            "name": "Lisbon",
            "popular": true,
            "hotels": []
          },
          {
            "id": "pt-lis-sintra",
            "name": "Sintra",
            "popular": true,
            "hotels": []
          },
          {
            "id": "pt-lis-cascais",
            "name": "Cascais",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "POR",
        "name": "Porto",
        "cities": [
          {
            "id": "pt-por-porto",
            "name": "Porto",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "FAR",
        "name": "Faro (Algarve)",
        "cities": [
          {
            "id": "pt-far-faro",
            "name": "Faro",
            "popular": false,
            "hotels": []
          },
          {
            "id": "pt-far-lagos",
            "name": "Lagos",
            "popular": true,
            "hotels": []
          },
          {
            "id": "pt-far-albufeira",
            "name": "Albufeira",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "MAD",
        "name": "Madeira",
        "cities": [
          {
            "id": "pt-mad-funchal",
            "name": "Funchal",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "AZO",
        "name": "Azores",
        "cities": [
          {
            "id": "pt-azo-pontadelgada",
            "name": "Ponta Delgada",
            "popular": false,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-gr",
    "name": "Greece",
    "code": "GR",
    "continent": "Europe",
    "currency": "EUR",
    "states": [
      {
        "code": "ATT",
        "name": "Attica",
        "cities": [
          {
            "id": "gr-att-athens",
            "name": "Athens",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "SAE",
        "name": "South Aegean (Cyclades)",
        "cities": [
          {
            "id": "gr-sae-santorini",
            "name": "Santorini (Oia/Fira)",
            "popular": true,
            "hotels": []
          },
          {
            "id": "gr-sae-mykonos",
            "name": "Mykonos",
            "popular": true,
            "hotels": []
          },
          {
            "id": "gr-sae-rhodes",
            "name": "Rhodes",
            "popular": false,
            "hotels": []
          },
          {
            "id": "gr-sae-naxos",
            "name": "Naxos",
            "popular": false,
            "hotels": []
          },
          {
            "id": "gr-sae-paros",
            "name": "Paros",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "CRT",
        "name": "Crete",
        "cities": [
          {
            "id": "gr-crt-heraklion",
            "name": "Heraklion",
            "popular": false,
            "hotels": []
          },
          {
            "id": "gr-crt-chania",
            "name": "Chania",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "ION",
        "name": "Ionian Islands",
        "cities": [
          {
            "id": "gr-ion-corfu",
            "name": "Corfu",
            "popular": true,
            "hotels": []
          },
          {
            "id": "gr-ion-zakynthos",
            "name": "Zakynthos",
            "popular": true,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-se",
    "name": "Sweden",
    "code": "SE",
    "continent": "Europe",
    "currency": "SEK",
    "states": [
      {
        "code": "AB",
        "name": "Stockholm",
        "cities": [
          {
            "id": "se-ab-stockholm",
            "name": "Stockholm",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "O",
        "name": "Västra Götaland",
        "cities": [
          {
            "id": "se-o-gothenburg",
            "name": "Gothenburg",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "M",
        "name": "Skåne",
        "cities": [
          {
            "id": "se-m-malmo",
            "name": "Malmö",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "BD",
        "name": "Norrbotten (Lapland)",
        "cities": [
          {
            "id": "se-bd-kiruna",
            "name": "Kiruna (Icehotel)",
            "popular": true,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-no",
    "name": "Norway",
    "code": "NO",
    "continent": "Europe",
    "currency": "NOK",
    "states": [
      {
        "code": "OSL",
        "name": "Oslo",
        "cities": [
          {
            "id": "no-osl-oslo",
            "name": "Oslo",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "VES",
        "name": "Vestland",
        "cities": [
          {
            "id": "no-ves-bergen",
            "name": "Bergen (Fjords)",
            "popular": true,
            "hotels": []
          },
          {
            "id": "no-ves-flam",
            "name": "Flåm",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "TRO",
        "name": "Troms og Finnmark",
        "cities": [
          {
            "id": "no-tro-tromso",
            "name": "Tromsø (Northern Lights)",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "NOL",
        "name": "Nordland",
        "cities": [
          {
            "id": "no-nol-lofoten",
            "name": "Lofoten Islands",
            "popular": true,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-dk",
    "name": "Denmark",
    "code": "DK",
    "continent": "Europe",
    "currency": "DKK",
    "states": [
      {
        "code": "CAP",
        "name": "Capital Region",
        "cities": [
          {
            "id": "dk-cap-copenhagen",
            "name": "Copenhagen",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "MID",
        "name": "Central Denmark",
        "cities": [
          {
            "id": "dk-mid-aarhus",
            "name": "Aarhus",
            "popular": false,
            "hotels": []
          },
          {
            "id": "dk-mid-billund",
            "name": "Billund (Legoland)",
            "popular": false,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-fi",
    "name": "Finland",
    "code": "FI",
    "continent": "Europe",
    "currency": "EUR",
    "states": [
      {
        "code": "UUS",
        "name": "Uusimaa",
        "cities": [
          {
            "id": "fi-uus-helsinki",
            "name": "Helsinki",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "LAP",
        "name": "Lapland",
        "cities": [
          {
            "id": "fi-lap-rovaniemi",
            "name": "Rovaniemi (Santa Claus)",
            "popular": true,
            "hotels": []
          },
          {
            "id": "fi-lap-levi",
            "name": "Levi Ski",
            "popular": false,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-ie",
    "name": "Ireland",
    "code": "IE",
    "continent": "Europe",
    "currency": "EUR",
    "states": [
      {
        "code": "DUB",
        "name": "Dublin",
        "cities": [
          {
            "id": "ie-dub-dublin",
            "name": "Dublin",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "GAL",
        "name": "Galway",
        "cities": [
          {
            "id": "ie-gal-galway",
            "name": "Galway",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "KER",
        "name": "Kerry",
        "cities": [
          {
            "id": "ie-ker-killarney",
            "name": "Killarney",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "CRK",
        "name": "Cork",
        "cities": [
          {
            "id": "ie-crk-cork",
            "name": "Cork",
            "popular": false,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-cz",
    "name": "Czech Republic",
    "code": "CZ",
    "continent": "Europe",
    "currency": "CZK",
    "states": [
      {
        "code": "PRG",
        "name": "Prague",
        "cities": [
          {
            "id": "cz-prg-prague",
            "name": "Prague",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "JHC",
        "name": "South Bohemia",
        "cities": [
          {
            "id": "cz-jhc-ceskykrumlov",
            "name": "Český Krumlov",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "KVK",
        "name": "Karlovy Vary",
        "cities": [
          {
            "id": "cz-kvk-karlovyvary",
            "name": "Karlovy Vary",
            "popular": false,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-hu",
    "name": "Hungary",
    "code": "HU",
    "continent": "Europe",
    "currency": "HUF",
    "states": [
      {
        "code": "BUD",
        "name": "Budapest",
        "cities": [
          {
            "id": "hu-bud-budapest",
            "name": "Budapest",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "BAL",
        "name": "Lake Balaton",
        "cities": [
          {
            "id": "hu-bal-balatonfured",
            "name": "Balatonfüred",
            "popular": false,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-pl",
    "name": "Poland",
    "code": "PL",
    "continent": "Europe",
    "currency": "PLN",
    "states": [
      {
        "code": "MAZ",
        "name": "Masovian",
        "cities": [
          {
            "id": "pl-maz-warsaw",
            "name": "Warsaw",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "MAL",
        "name": "Lesser Poland",
        "cities": [
          {
            "id": "pl-mal-krakow",
            "name": "Kraków",
            "popular": true,
            "hotels": []
          },
          {
            "id": "pl-mal-zakopane",
            "name": "Zakopane",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "DLS",
        "name": "Lower Silesian",
        "cities": [
          {
            "id": "pl-dls-wroclaw",
            "name": "Wrocław",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "POM",
        "name": "Pomeranian",
        "cities": [
          {
            "id": "pl-pom-gdansk",
            "name": "Gdańsk",
            "popular": false,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-hr",
    "name": "Croatia",
    "code": "HR",
    "continent": "Europe",
    "currency": "EUR",
    "states": [
      {
        "code": "DUB",
        "name": "Dubrovnik-Neretva",
        "cities": [
          {
            "id": "hr-dub-dubrovnik",
            "name": "Dubrovnik",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "SPL",
        "name": "Split-Dalmatia",
        "cities": [
          {
            "id": "hr-spl-split",
            "name": "Split",
            "popular": true,
            "hotels": []
          },
          {
            "id": "hr-spl-hvar",
            "name": "Hvar Island",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "ZAG",
        "name": "Zagreb",
        "cities": [
          {
            "id": "hr-zag-zagreb",
            "name": "Zagreb",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "IST",
        "name": "Istria",
        "cities": [
          {
            "id": "hr-ist-rovinj",
            "name": "Rovinj",
            "popular": false,
            "hotels": []
          },
          {
            "id": "hr-ist-pula",
            "name": "Pula",
            "popular": false,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-is",
    "name": "Iceland",
    "code": "IS",
    "continent": "Europe",
    "currency": "ISK",
    "states": [
      {
        "code": "CAP",
        "name": "Capital Region",
        "cities": [
          {
            "id": "is-cap-reykjavik",
            "name": "Reykjavik",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "SOU",
        "name": "Southern Region",
        "cities": [
          {
            "id": "is-sou-vik",
            "name": "Vík í Mýrdal",
            "popular": true,
            "hotels": []
          },
          {
            "id": "is-sou-geysir",
            "name": "Golden Circle (Geysir)",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "NOR",
        "name": "Northeastern Region",
        "cities": [
          {
            "id": "is-nor-akureyri",
            "name": "Akureyri",
            "popular": false,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-mc",
    "name": "Monaco",
    "code": "MC",
    "continent": "Europe",
    "currency": "EUR",
    "states": [
      {
        "code": "MC-MC",
        "name": "Monaco",
        "cities": [
          {
            "id": "mc-montecarlo",
            "name": "Monte Carlo",
            "popular": true,
            "hotels": []
          },
          {
            "id": "mc-larvotto",
            "name": "Larvotto",
            "popular": false,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-lu",
    "name": "Luxembourg",
    "code": "LU",
    "continent": "Europe",
    "currency": "EUR",
    "states": [
      {
        "code": "LUX",
        "name": "Luxembourg District",
        "cities": [
          {
            "id": "lu-lux-city",
            "name": "Luxembourg City",
            "popular": true,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-cy",
    "name": "Cyprus",
    "code": "CY",
    "continent": "Europe",
    "currency": "EUR",
    "states": [
      {
        "code": "PAP",
        "name": "Paphos",
        "cities": [
          {
            "id": "cy-pap-paphos",
            "name": "Paphos",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "LIM",
        "name": "Limassol",
        "cities": [
          {
            "id": "cy-lim-limassol",
            "name": "Limassol",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "AYN",
        "name": "Famagusta",
        "cities": [
          {
            "id": "cy-ayn-ayianapa",
            "name": "Ayia Napa",
            "popular": true,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-mt",
    "name": "Malta",
    "code": "MT",
    "continent": "Europe",
    "currency": "EUR",
    "states": [
      {
        "code": "VAL",
        "name": "Valletta",
        "cities": [
          {
            "id": "mt-val-valletta",
            "name": "Valletta",
            "popular": true,
            "hotels": []
          },
          {
            "id": "mt-val-stjulians",
            "name": "St. Julian's",
            "popular": true,
            "hotels": []
          },
          {
            "id": "mt-val-sliema",
            "name": "Sliema",
            "popular": false,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-ro",
    "name": "Romania",
    "code": "RO",
    "continent": "Europe",
    "currency": "RON",
    "states": [
      {
        "code": "BUC",
        "name": "Bucharest",
        "cities": [
          {
            "id": "ro-buc-bucharest",
            "name": "Bucharest",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "BRA",
        "name": "Brașov",
        "cities": [
          {
            "id": "ro-bra-brasov",
            "name": "Brașov (Transylvania)",
            "popular": true,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-bg",
    "name": "Bulgaria",
    "code": "BG",
    "continent": "Europe",
    "currency": "BGN",
    "states": [
      {
        "code": "SOF",
        "name": "Sofia",
        "cities": [
          {
            "id": "bg-sof-sofia",
            "name": "Sofia",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "BUR",
        "name": "Burgas",
        "cities": [
          {
            "id": "bg-bur-sunnybeach",
            "name": "Sunny Beach",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "VAR",
        "name": "Varna",
        "cities": [
          {
            "id": "bg-var-varna",
            "name": "Varna",
            "popular": false,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-sk",
    "name": "Slovakia",
    "code": "SK",
    "continent": "Europe",
    "currency": "EUR",
    "states": [
      {
        "code": "BTS",
        "name": "Bratislava",
        "cities": [
          {
            "id": "sk-bts-bratislava",
            "name": "Bratislava",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "TAT",
        "name": "High Tatras",
        "cities": [
          {
            "id": "sk-tat-strbskepleso",
            "name": "Štrbské Pleso",
            "popular": false,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-si",
    "name": "Slovenia",
    "code": "SI",
    "continent": "Europe",
    "currency": "EUR",
    "states": [
      {
        "code": "LJU",
        "name": "Ljubljana",
        "cities": [
          {
            "id": "si-lju-ljubljana",
            "name": "Ljubljana",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "BLE",
        "name": "Bled",
        "cities": [
          {
            "id": "si-ble-lakebled",
            "name": "Lake Bled",
            "popular": true,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-ee",
    "name": "Estonia",
    "code": "EE",
    "continent": "Europe",
    "currency": "EUR",
    "states": [
      {
        "code": "HAR",
        "name": "Harju",
        "cities": [
          {
            "id": "ee-har-tallinn",
            "name": "Tallinn",
            "popular": true,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-lv",
    "name": "Latvia",
    "code": "LV",
    "continent": "Europe",
    "currency": "EUR",
    "states": [
      {
        "code": "RIG",
        "name": "Riga",
        "cities": [
          {
            "id": "lv-rig-riga",
            "name": "Riga",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "JUR",
        "name": "Jūrmala",
        "cities": [
          {
            "id": "lv-jur-jurmala",
            "name": "Jūrmala",
            "popular": false,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-lt",
    "name": "Lithuania",
    "code": "LT",
    "continent": "Europe",
    "currency": "EUR",
    "states": [
      {
        "code": "VIL",
        "name": "Vilnius",
        "cities": [
          {
            "id": "lt-vil-vilnius",
            "name": "Vilnius",
            "popular": true,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-us",
    "name": "United States",
    "code": "US",
    "continent": "North America",
    "currency": "USD",
    "states": [
      {
        "code": "NY",
        "name": "New York",
        "cities": [
          {
            "id": "us-ny-nyc",
            "name": "New York City",
            "popular": true,
            "hotels": []
          },
          {
            "id": "us-ny-hamptons",
            "name": "The Hamptons",
            "popular": false,
            "hotels": []
          },
          {
            "id": "us-ny-niagara",
            "name": "Niagara Falls",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "CA",
        "name": "California",
        "cities": [
          {
            "id": "us-ca-losangeles",
            "name": "Los Angeles",
            "popular": true,
            "hotels": []
          },
          {
            "id": "us-ca-sanfrancisco",
            "name": "San Francisco",
            "popular": true,
            "hotels": []
          },
          {
            "id": "us-ca-sandiego",
            "name": "San Diego",
            "popular": true,
            "hotels": []
          },
          {
            "id": "us-ca-napa",
            "name": "Napa Valley",
            "popular": true,
            "hotels": []
          },
          {
            "id": "us-ca-tahoe",
            "name": "Lake Tahoe",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "FL",
        "name": "Florida",
        "cities": [
          {
            "id": "us-fl-miami",
            "name": "Miami (South Beach)",
            "popular": true,
            "hotels": []
          },
          {
            "id": "us-fl-orlando",
            "name": "Orlando",
            "popular": true,
            "hotels": []
          },
          {
            "id": "us-fl-keywest",
            "name": "Key West",
            "popular": true,
            "hotels": []
          },
          {
            "id": "us-fl-tampa",
            "name": "Tampa",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "NV",
        "name": "Nevada",
        "cities": [
          {
            "id": "us-nv-lasvegas",
            "name": "Las Vegas",
            "popular": true,
            "hotels": []
          },
          {
            "id": "us-nv-reno",
            "name": "Reno",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "HI",
        "name": "Hawaii",
        "cities": [
          {
            "id": "us-hi-honolulu",
            "name": "Honolulu (Oahu)",
            "popular": true,
            "hotels": []
          },
          {
            "id": "us-hi-maui",
            "name": "Maui",
            "popular": true,
            "hotels": []
          },
          {
            "id": "us-hi-kauai",
            "name": "Kauai",
            "popular": false,
            "hotels": []
          },
          {
            "id": "us-hi-kona",
            "name": "Kona (Big Island)",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "TX",
        "name": "Texas",
        "cities": [
          {
            "id": "us-tx-austin",
            "name": "Austin",
            "popular": true,
            "hotels": []
          },
          {
            "id": "us-tx-houston",
            "name": "Houston",
            "popular": false,
            "hotels": []
          },
          {
            "id": "us-tx-dallas",
            "name": "Dallas",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "IL",
        "name": "Illinois",
        "cities": [
          {
            "id": "us-il-chicago",
            "name": "Chicago",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "CO",
        "name": "Colorado",
        "cities": [
          {
            "id": "us-co-denver",
            "name": "Denver",
            "popular": false,
            "hotels": []
          },
          {
            "id": "us-co-aspen",
            "name": "Aspen",
            "popular": true,
            "hotels": []
          },
          {
            "id": "us-co-vail",
            "name": "Vail",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "WA",
        "name": "Washington",
        "cities": [
          {
            "id": "us-wa-seattle",
            "name": "Seattle",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "MA",
        "name": "Massachusetts",
        "cities": [
          {
            "id": "us-ma-boston",
            "name": "Boston",
            "popular": true,
            "hotels": []
          },
          {
            "id": "us-ma-nantucket",
            "name": "Nantucket",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "LA",
        "name": "Louisiana",
        "cities": [
          {
            "id": "us-la-neworleans",
            "name": "New Orleans",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "AZ",
        "name": "Arizona",
        "cities": [
          {
            "id": "us-az-phoenix",
            "name": "Phoenix / Scottsdale",
            "popular": true,
            "hotels": []
          },
          {
            "id": "us-az-sedona",
            "name": "Sedona",
            "popular": true,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-ca",
    "name": "Canada",
    "code": "CA",
    "continent": "North America",
    "currency": "CAD",
    "states": [
      {
        "code": "ON",
        "name": "Ontario",
        "cities": [
          {
            "id": "ca-on-toronto",
            "name": "Toronto",
            "popular": true,
            "hotels": []
          },
          {
            "id": "ca-on-ottawa",
            "name": "Ottawa",
            "popular": false,
            "hotels": []
          },
          {
            "id": "ca-on-niagara",
            "name": "Niagara-on-the-Lake",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "BC",
        "name": "British Columbia",
        "cities": [
          {
            "id": "ca-bc-vancouver",
            "name": "Vancouver",
            "popular": true,
            "hotels": []
          },
          {
            "id": "ca-bc-whistler",
            "name": "Whistler",
            "popular": true,
            "hotels": []
          },
          {
            "id": "ca-bc-victoria",
            "name": "Victoria",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "QC",
        "name": "Quebec",
        "cities": [
          {
            "id": "ca-qc-montreal",
            "name": "Montreal",
            "popular": true,
            "hotels": []
          },
          {
            "id": "ca-qc-quebeccity",
            "name": "Quebec City",
            "popular": true,
            "hotels": []
          },
          {
            "id": "ca-qc-tremblant",
            "name": "Mont-Tremblant",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "AB",
        "name": "Alberta",
        "cities": [
          {
            "id": "ca-ab-banff",
            "name": "Banff",
            "popular": true,
            "hotels": []
          },
          {
            "id": "ca-ab-lake-louise",
            "name": "Lake Louise",
            "popular": true,
            "hotels": []
          },
          {
            "id": "ca-ab-calgary",
            "name": "Calgary",
            "popular": false,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-mx",
    "name": "Mexico",
    "code": "MX",
    "continent": "North America",
    "currency": "MXN",
    "states": [
      {
        "code": "ROO",
        "name": "Quintana Roo",
        "cities": [
          {
            "id": "mx-roo-cancun",
            "name": "Cancún",
            "popular": true,
            "hotels": []
          },
          {
            "id": "mx-roo-playadelcarmen",
            "name": "Playa del Carmen",
            "popular": true,
            "hotels": []
          },
          {
            "id": "mx-roo-tulum",
            "name": "Tulum",
            "popular": true,
            "hotels": []
          },
          {
            "id": "mx-roo-cozumel",
            "name": "Cozumel",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "BCS",
        "name": "Baja California Sur",
        "cities": [
          {
            "id": "mx-bcs-loscabos",
            "name": "Cabo San Lucas (Los Cabos)",
            "popular": true,
            "hotels": []
          },
          {
            "id": "mx-bcs-lapaz",
            "name": "La Paz",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "CMX",
        "name": "Mexico City",
        "cities": [
          {
            "id": "mx-cmx-cdmx",
            "name": "Mexico City (CDMX)",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "JAL",
        "name": "Jalisco",
        "cities": [
          {
            "id": "mx-jal-puertovallarta",
            "name": "Puerto Vallarta",
            "popular": true,
            "hotels": []
          },
          {
            "id": "mx-jal-guadalajara",
            "name": "Guadalajara",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "OAX",
        "name": "Oaxaca",
        "cities": [
          {
            "id": "mx-oax-oaxaca",
            "name": "Oaxaca City",
            "popular": false,
            "hotels": []
          },
          {
            "id": "mx-oax-huatulco",
            "name": "Huatulco",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "GTO",
        "name": "Guanajuato",
        "cities": [
          {
            "id": "mx-gto-sanmiguel",
            "name": "San Miguel de Allende",
            "popular": true,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-cr",
    "name": "Costa Rica",
    "code": "CR",
    "continent": "North America",
    "currency": "CRC",
    "states": [
      {
        "code": "ALA",
        "name": "Alajuela",
        "cities": [
          {
            "id": "cr-ala-arenal",
            "name": "La Fortuna (Arenal)",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "GUA",
        "name": "Guanacaste",
        "cities": [
          {
            "id": "cr-gua-tamarindo",
            "name": "Tamarindo",
            "popular": true,
            "hotels": []
          },
          {
            "id": "cr-gua-papagayo",
            "name": "Gulf of Papagayo",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "PUN",
        "name": "Puntarenas",
        "cities": [
          {
            "id": "cr-pun-manuelantonio",
            "name": "Manuel Antonio",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "SJ",
        "name": "San José",
        "cities": [
          {
            "id": "cr-sj-sanjose",
            "name": "San José",
            "popular": false,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-pa",
    "name": "Panama",
    "code": "PA",
    "continent": "North America",
    "currency": "PAB",
    "states": [
      {
        "code": "PAN",
        "name": "Panamá",
        "cities": [
          {
            "id": "pa-pan-panamacity",
            "name": "Panama City",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "BOC",
        "name": "Bocas del Toro",
        "cities": [
          {
            "id": "pa-boc-bocas",
            "name": "Bocas del Toro",
            "popular": true,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-jm",
    "name": "Jamaica",
    "code": "JM",
    "continent": "North America",
    "currency": "JMD",
    "states": [
      {
        "code": "SJA",
        "name": "St. James",
        "cities": [
          {
            "id": "jm-sja-montegobay",
            "name": "Montego Bay",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "WML",
        "name": "Westmoreland",
        "cities": [
          {
            "id": "jm-wml-negril",
            "name": "Negril",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "SAN",
        "name": "St. Ann",
        "cities": [
          {
            "id": "jm-san-ochorios",
            "name": "Ocho Rios",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "KIN",
        "name": "Kingston",
        "cities": [
          {
            "id": "jm-kin-kingston",
            "name": "Kingston",
            "popular": false,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-bs",
    "name": "Bahamas",
    "code": "BS",
    "continent": "North America",
    "currency": "BSD",
    "states": [
      {
        "code": "NP",
        "name": "New Providence",
        "cities": [
          {
            "id": "bs-np-nassau",
            "name": "Nassau",
            "popular": true,
            "hotels": []
          },
          {
            "id": "bs-np-paradiseland",
            "name": "Paradise Island (Atlantis)",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "EX",
        "name": "Exuma",
        "cities": [
          {
            "id": "bs-ex-georgetown",
            "name": "Great Exuma",
            "popular": true,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-do",
    "name": "Dominican Republic",
    "code": "DO",
    "continent": "North America",
    "currency": "DOP",
    "states": [
      {
        "code": "ALT",
        "name": "La Altagracia",
        "cities": [
          {
            "id": "do-alt-puntacana",
            "name": "Punta Cana",
            "popular": true,
            "hotels": []
          },
          {
            "id": "do-alt-bavaro",
            "name": "Bávaro",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "SD",
        "name": "Santo Domingo",
        "cities": [
          {
            "id": "do-sd-santodomingo",
            "name": "Santo Domingo",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "LR",
        "name": "La Romana",
        "cities": [
          {
            "id": "do-lr-laromana",
            "name": "La Romana (Casa de Campo)",
            "popular": true,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-bb",
    "name": "Barbados",
    "code": "BB",
    "continent": "North America",
    "currency": "BBD",
    "states": [
      {
        "code": "MIC",
        "name": "Saint Michael",
        "cities": [
          {
            "id": "bb-mic-bridgetown",
            "name": "Bridgetown",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "JAM",
        "name": "Saint James",
        "cities": [
          {
            "id": "bb-jam-holetown",
            "name": "Holetown (Platinum Coast)",
            "popular": true,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-cu",
    "name": "Cuba",
    "code": "CU",
    "continent": "North America",
    "currency": "CUP",
    "states": [
      {
        "code": "HAV",
        "name": "Havana",
        "cities": [
          {
            "id": "cu-hav-havana",
            "name": "Havana",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "MAT",
        "name": "Matanzas",
        "cities": [
          {
            "id": "cu-mat-varadero",
            "name": "Varadero",
            "popular": true,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-pr",
    "name": "Puerto Rico",
    "code": "PR",
    "continent": "North America",
    "currency": "USD",
    "states": [
      {
        "code": "SJU",
        "name": "San Juan",
        "cities": [
          {
            "id": "pr-sju-sanjuan",
            "name": "San Juan",
            "popular": true,
            "hotels": []
          },
          {
            "id": "pr-sju-condado",
            "name": "Condado",
            "popular": false,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-ky",
    "name": "Cayman Islands",
    "code": "KY",
    "continent": "North America",
    "currency": "KYD",
    "states": [
      {
        "code": "GC",
        "name": "Grand Cayman",
        "cities": [
          {
            "id": "ky-gc-georgetown",
            "name": "George Town (Seven Mile Beach)",
            "popular": true,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-br",
    "name": "Brazil",
    "code": "BR",
    "continent": "South America",
    "currency": "BRL",
    "states": [
      {
        "code": "RJ",
        "name": "Rio de Janeiro",
        "cities": [
          {
            "id": "br-rj-riodejaneiro",
            "name": "Rio de Janeiro (Copacabana)",
            "popular": true,
            "hotels": []
          },
          {
            "id": "br-rj-buzios",
            "name": "Armação dos Búzios",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "SP",
        "name": "São Paulo",
        "cities": [
          {
            "id": "br-sp-saopaulo",
            "name": "São Paulo",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "BA",
        "name": "Bahia",
        "cities": [
          {
            "id": "br-ba-salvador",
            "name": "Salvador",
            "popular": true,
            "hotels": []
          },
          {
            "id": "br-ba-trancoso",
            "name": "Trancoso",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "PR",
        "name": "Paraná",
        "cities": [
          {
            "id": "br-pr-fozdoiguacu",
            "name": "Foz do Iguaçu (Iguazu Falls)",
            "popular": true,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-ar",
    "name": "Argentina",
    "code": "AR",
    "continent": "South America",
    "currency": "ARS",
    "states": [
      {
        "code": "CABA",
        "name": "Buenos Aires City",
        "cities": [
          {
            "id": "ar-caba-buenosaires",
            "name": "Buenos Aires",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "MEN",
        "name": "Mendoza",
        "cities": [
          {
            "id": "ar-men-mendoza",
            "name": "Mendoza (Wine Region)",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "RN",
        "name": "Río Negro",
        "cities": [
          {
            "id": "ar-rn-bariloche",
            "name": "San Carlos de Bariloche",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "MIS",
        "name": "Misiones",
        "cities": [
          {
            "id": "ar-mis-iguazu",
            "name": "Puerto Iguazú",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "TF",
        "name": "Tierra del Fuego",
        "cities": [
          {
            "id": "ar-tf-ushuaia",
            "name": "Ushuaia (End of the World)",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "SC",
        "name": "Santa Cruz",
        "cities": [
          {
            "id": "ar-sc-elcalafate",
            "name": "El Calafate (Perito Moreno)",
            "popular": true,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-cl",
    "name": "Chile",
    "code": "CL",
    "continent": "South America",
    "currency": "CLP",
    "states": [
      {
        "code": "RM",
        "name": "Santiago Metropolitan",
        "cities": [
          {
            "id": "cl-rm-santiago",
            "name": "Santiago",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "VAL",
        "name": "Valparaíso",
        "cities": [
          {
            "id": "cl-val-valparaiso",
            "name": "Valparaíso",
            "popular": false,
            "hotels": []
          },
          {
            "id": "cl-val-vinadelmar",
            "name": "Viña del Mar",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "ANT",
        "name": "Antofagasta",
        "cities": [
          {
            "id": "cl-ant-sanpedro",
            "name": "San Pedro de Atacama",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "MAG",
        "name": "Magallanes",
        "cities": [
          {
            "id": "cl-mag-torresdelpaine",
            "name": "Torres del Paine",
            "popular": true,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-co",
    "name": "Colombia",
    "code": "CO",
    "continent": "South America",
    "currency": "COP",
    "states": [
      {
        "code": "BOL",
        "name": "Bolívar",
        "cities": [
          {
            "id": "co-bol-cartagena",
            "name": "Cartagena",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "ANT",
        "name": "Antioquia",
        "cities": [
          {
            "id": "co-ant-medellin",
            "name": "Medellín",
            "popular": true,
            "hotels": []
          },
          {
            "id": "co-ant-guatape",
            "name": "Guatapé",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "DC",
        "name": "Bogotá",
        "cities": [
          {
            "id": "co-dc-bogota",
            "name": "Bogotá",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "MAG",
        "name": "Magdalena",
        "cities": [
          {
            "id": "co-mag-santamarta",
            "name": "Santa Marta (Tayrona)",
            "popular": false,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-pe",
    "name": "Peru",
    "code": "PE",
    "continent": "South America",
    "currency": "PEN",
    "states": [
      {
        "code": "CUS",
        "name": "Cusco",
        "cities": [
          {
            "id": "pe-cus-cusco",
            "name": "Cusco",
            "popular": true,
            "hotels": []
          },
          {
            "id": "pe-cus-machupicchu",
            "name": "Machu Picchu (Aguas Calientes)",
            "popular": true,
            "hotels": []
          },
          {
            "id": "pe-cus-sacredvalley",
            "name": "Sacred Valley",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "LIM",
        "name": "Lima",
        "cities": [
          {
            "id": "pe-lim-lima",
            "name": "Lima (Miraflores)",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "ARE",
        "name": "Arequipa",
        "cities": [
          {
            "id": "pe-are-arequipa",
            "name": "Arequipa",
            "popular": false,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-ec",
    "name": "Ecuador",
    "code": "EC",
    "continent": "South America",
    "currency": "USD",
    "states": [
      {
        "code": "GAL",
        "name": "Galápagos",
        "cities": [
          {
            "id": "ec-gal-santacruz",
            "name": "Santa Cruz (Puerto Ayora)",
            "popular": true,
            "hotels": []
          },
          {
            "id": "ec-gal-sancristobal",
            "name": "San Cristóbal",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "PIC",
        "name": "Pichincha",
        "cities": [
          {
            "id": "ec-pic-quito",
            "name": "Quito",
            "popular": true,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-uy",
    "name": "Uruguay",
    "code": "UY",
    "continent": "South America",
    "currency": "UYU",
    "states": [
      {
        "code": "MAL",
        "name": "Maldonado",
        "cities": [
          {
            "id": "uy-mal-puntadeleste",
            "name": "Punta del Este",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "MO",
        "name": "Montevideo",
        "cities": [
          {
            "id": "uy-mo-montevideo",
            "name": "Montevideo",
            "popular": true,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-au",
    "name": "Australia",
    "code": "AU",
    "continent": "Oceania",
    "currency": "AUD",
    "states": [
      {
        "code": "NSW",
        "name": "New South Wales",
        "cities": [
          {
            "id": "au-nsw-sydney",
            "name": "Sydney",
            "popular": true,
            "hotels": []
          },
          {
            "id": "au-nsw-byronbay",
            "name": "Byron Bay",
            "popular": true,
            "hotels": []
          },
          {
            "id": "au-nsw-bluemountains",
            "name": "Blue Mountains",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "VIC",
        "name": "Victoria",
        "cities": [
          {
            "id": "au-vic-melbourne",
            "name": "Melbourne",
            "popular": true,
            "hotels": []
          },
          {
            "id": "au-vic-yarravalley",
            "name": "Yarra Valley",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "QLD",
        "name": "Queensland",
        "cities": [
          {
            "id": "au-qld-brisbane",
            "name": "Brisbane",
            "popular": false,
            "hotels": []
          },
          {
            "id": "au-qld-goldcoast",
            "name": "Gold Coast",
            "popular": true,
            "hotels": []
          },
          {
            "id": "au-qld-cairns",
            "name": "Cairns (Great Barrier Reef)",
            "popular": true,
            "hotels": []
          },
          {
            "id": "au-qld-whitsundays",
            "name": "Whitsundays (Hamilton Island)",
            "popular": true,
            "hotels": []
          },
          {
            "id": "au-qld-sunshinecoast",
            "name": "Sunshine Coast",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "WA",
        "name": "Western Australia",
        "cities": [
          {
            "id": "au-wa-perth",
            "name": "Perth",
            "popular": true,
            "hotels": []
          },
          {
            "id": "au-wa-margaritriver",
            "name": "Margaret River",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "SA",
        "name": "South Australia",
        "cities": [
          {
            "id": "au-sa-adelaide",
            "name": "Adelaide",
            "popular": false,
            "hotels": []
          },
          {
            "id": "au-sa-barossa",
            "name": "Barossa Valley",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "TAS",
        "name": "Tasmania",
        "cities": [
          {
            "id": "au-tas-hobart",
            "name": "Hobart",
            "popular": true,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-nz",
    "name": "New Zealand",
    "code": "NZ",
    "continent": "Oceania",
    "currency": "NZD",
    "states": [
      {
        "code": "OTA",
        "name": "Otago (South Island)",
        "cities": [
          {
            "id": "nz-ota-queenstown",
            "name": "Queenstown",
            "popular": true,
            "hotels": []
          },
          {
            "id": "nz-ota-wanaka",
            "name": "Wanaka",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "AUK",
        "name": "Auckland (North Island)",
        "cities": [
          {
            "id": "nz-auk-auckland",
            "name": "Auckland",
            "popular": true,
            "hotels": []
          },
          {
            "id": "nz-auk-waiheke",
            "name": "Waiheke Island",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "CAN",
        "name": "Canterbury",
        "cities": [
          {
            "id": "nz-can-christchurch",
            "name": "Christchurch",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "WKO",
        "name": "Waikato",
        "cities": [
          {
            "id": "nz-wko-rotorua",
            "name": "Rotorua",
            "popular": true,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-fj",
    "name": "Fiji",
    "code": "FJ",
    "continent": "Oceania",
    "currency": "FJD",
    "states": [
      {
        "code": "WES",
        "name": "Western Division",
        "cities": [
          {
            "id": "fj-wes-nadi",
            "name": "Nadi",
            "popular": true,
            "hotels": []
          },
          {
            "id": "fj-wes-denarau",
            "name": "Denarau Island",
            "popular": true,
            "hotels": []
          },
          {
            "id": "fj-wes-mamanuca",
            "name": "Mamanuca Islands",
            "popular": true,
            "hotels": []
          },
          {
            "id": "fj-wes-yasawa",
            "name": "Yasawa Islands",
            "popular": true,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-pf",
    "name": "French Polynesia",
    "code": "PF",
    "continent": "Oceania",
    "currency": "XPF",
    "states": [
      {
        "code": "ISL",
        "name": "Society Islands",
        "cities": [
          {
            "id": "pf-isl-borabora",
            "name": "Bora Bora",
            "popular": true,
            "hotels": []
          },
          {
            "id": "pf-isl-tahiti",
            "name": "Tahiti (Papeete)",
            "popular": true,
            "hotels": []
          },
          {
            "id": "pf-isl-moorea",
            "name": "Mo'orea",
            "popular": true,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-za",
    "name": "South Africa",
    "code": "ZA",
    "continent": "Africa",
    "currency": "ZAR",
    "states": [
      {
        "code": "WC",
        "name": "Western Cape",
        "cities": [
          {
            "id": "za-wc-capetown",
            "name": "Cape Town",
            "popular": true,
            "hotels": []
          },
          {
            "id": "za-wc-stellenbosch",
            "name": "Stellenbosch (Winelands)",
            "popular": true,
            "hotels": []
          },
          {
            "id": "za-wc-knysna",
            "name": "Knysna (Garden Route)",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "GP",
        "name": "Gauteng",
        "cities": [
          {
            "id": "za-gp-johannesburg",
            "name": "Johannesburg",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "MP",
        "name": "Mpumalanga",
        "cities": [
          {
            "id": "za-mp-kruger",
            "name": "Kruger National Park",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "KZN",
        "name": "KwaZulu-Natal",
        "cities": [
          {
            "id": "za-kzn-durban",
            "name": "Durban",
            "popular": false,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-eg",
    "name": "Egypt",
    "code": "EG",
    "continent": "Africa",
    "currency": "EGP",
    "states": [
      {
        "code": "CAI",
        "name": "Cairo",
        "cities": [
          {
            "id": "eg-cai-cairo",
            "name": "Cairo",
            "popular": true,
            "hotels": []
          },
          {
            "id": "eg-cai-giza",
            "name": "Giza (Pyramids)",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "JS",
        "name": "South Sinai",
        "cities": [
          {
            "id": "eg-js-sharm",
            "name": "Sharm El Sheikh",
            "popular": true,
            "hotels": []
          },
          {
            "id": "eg-js-dahab",
            "name": "Dahab",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "BA",
        "name": "Red Sea",
        "cities": [
          {
            "id": "eg-ba-hurghada",
            "name": "Hurghada",
            "popular": true,
            "hotels": []
          },
          {
            "id": "eg-ba-elgouna",
            "name": "El Gouna",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "LX",
        "name": "Luxor",
        "cities": [
          {
            "id": "eg-lx-luxor",
            "name": "Luxor (Valley of the Kings)",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "ASN",
        "name": "Aswan",
        "cities": [
          {
            "id": "eg-asn-aswan",
            "name": "Aswan",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "ALX",
        "name": "Alexandria",
        "cities": [
          {
            "id": "eg-alx-alexandria",
            "name": "Alexandria",
            "popular": false,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-ma",
    "name": "Morocco",
    "code": "MA",
    "continent": "Africa",
    "currency": "MAD",
    "states": [
      {
        "code": "MAR",
        "name": "Marrakesh-Safi",
        "cities": [
          {
            "id": "ma-mar-marrakesh",
            "name": "Marrakesh",
            "popular": true,
            "hotels": []
          },
          {
            "id": "ma-mar-essaouira",
            "name": "Essaouira",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "CAS",
        "name": "Casablanca-Settat",
        "cities": [
          {
            "id": "ma-cas-casablanca",
            "name": "Casablanca",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "FES",
        "name": "Fès-Meknès",
        "cities": [
          {
            "id": "ma-fes-fez",
            "name": "Fez",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "TNG",
        "name": "Tanger-Tetouan-Al Hoceima",
        "cities": [
          {
            "id": "ma-tng-tangier",
            "name": "Tangier",
            "popular": false,
            "hotels": []
          },
          {
            "id": "ma-tng-chefchaouen",
            "name": "Chefchaouen (Blue City)",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "AGA",
        "name": "Souss-Massa",
        "cities": [
          {
            "id": "ma-aga-agadir",
            "name": "Agadir",
            "popular": false,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-ke",
    "name": "Kenya",
    "code": "KE",
    "continent": "Africa",
    "currency": "KES",
    "states": [
      {
        "code": "NBO",
        "name": "Nairobi",
        "cities": [
          {
            "id": "ke-nbo-nairobi",
            "name": "Nairobi",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "NAR",
        "name": "Narok",
        "cities": [
          {
            "id": "ke-nar-masaimara",
            "name": "Maasai Mara National Reserve",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "MSA",
        "name": "Mombasa",
        "cities": [
          {
            "id": "ke-msa-mombasa",
            "name": "Mombasa",
            "popular": true,
            "hotels": []
          },
          {
            "id": "ke-msa-diani",
            "name": "Diani Beach",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "KFI",
        "name": "Kilifi",
        "cities": [
          {
            "id": "ke-kfi-watamu",
            "name": "Watamu",
            "popular": false,
            "hotels": []
          },
          {
            "id": "ke-kfi-malindi",
            "name": "Malindi",
            "popular": false,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-tz",
    "name": "Tanzania",
    "code": "TZ",
    "continent": "Africa",
    "currency": "TZS",
    "states": [
      {
        "code": "ZNZ",
        "name": "Zanzibar",
        "cities": [
          {
            "id": "tz-znz-stonetown",
            "name": "Stone Town (Zanzibar City)",
            "popular": true,
            "hotels": []
          },
          {
            "id": "tz-znz-nungwi",
            "name": "Nungwi Beach",
            "popular": true,
            "hotels": []
          },
          {
            "id": "tz-znz-kendwa",
            "name": "Kendwa",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "ARU",
        "name": "Arusha",
        "cities": [
          {
            "id": "tz-aru-serengeti",
            "name": "Serengeti National Park",
            "popular": true,
            "hotels": []
          },
          {
            "id": "tz-aru-arusha",
            "name": "Arusha (Safari Hub)",
            "popular": false,
            "hotels": []
          },
          {
            "id": "tz-aru-ngorongoro",
            "name": "Ngorongoro Crater",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "KIL",
        "name": "Kilimanjaro",
        "cities": [
          {
            "id": "tz-kil-moshi",
            "name": "Moshi (Mount Kilimanjaro)",
            "popular": true,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-mu",
    "name": "Mauritius",
    "code": "MU",
    "continent": "Africa",
    "currency": "MUR",
    "states": [
      {
        "code": "RIV",
        "name": "Rivière du Rempart",
        "cities": [
          {
            "id": "mu-riv-grandbaie",
            "name": "Grand Baie",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "BLA",
        "name": "Black River",
        "cities": [
          {
            "id": "mu-bla-lemorne",
            "name": "Le Morne Brabant",
            "popular": true,
            "hotels": []
          },
          {
            "id": "mu-bla-flicenflac",
            "name": "Flic-en-Flac",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "PLU",
        "name": "Port Louis",
        "cities": [
          {
            "id": "mu-plu-portlouis",
            "name": "Port Louis",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "FLA",
        "name": "Flacq",
        "cities": [
          {
            "id": "mu-fla-belmare",
            "name": "Belle Mare",
            "popular": true,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-sc",
    "name": "Seychelles",
    "code": "SC",
    "continent": "Africa",
    "currency": "SCR",
    "states": [
      {
        "code": "MAH",
        "name": "Mahé",
        "cities": [
          {
            "id": "sc-mah-victoria",
            "name": "Victoria (Mahé Island)",
            "popular": true,
            "hotels": []
          },
          {
            "id": "sc-mah-beauvallon",
            "name": "Beau Vallon",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "PRA",
        "name": "Praslin",
        "cities": [
          {
            "id": "sc-pra-ansevolbert",
            "name": "Anse Volbert (Praslin)",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "DIG",
        "name": "La Digue",
        "cities": [
          {
            "id": "sc-dig-ladigue",
            "name": "La Digue (Anse Source d'Argent)",
            "popular": true,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-tn",
    "name": "Tunisia",
    "code": "TN",
    "continent": "Africa",
    "currency": "TND",
    "states": [
      {
        "code": "TUN",
        "name": "Tunis",
        "cities": [
          {
            "id": "tn-tun-tunis",
            "name": "Tunis",
            "popular": true,
            "hotels": []
          },
          {
            "id": "tn-tun-sidibou",
            "name": "Sidi Bou Said",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "SOU",
        "name": "Sousse",
        "cities": [
          {
            "id": "tn-sou-sousse",
            "name": "Sousse",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "MED",
        "name": "Médenine",
        "cities": [
          {
            "id": "tn-med-djerba",
            "name": "Djerba Island",
            "popular": true,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-rw",
    "name": "Rwanda",
    "code": "RW",
    "continent": "Africa",
    "currency": "RWF",
    "states": [
      {
        "code": "KIG",
        "name": "Kigali",
        "cities": [
          {
            "id": "rw-kig-kigali",
            "name": "Kigali",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "NOR",
        "name": "Northern Province",
        "cities": [
          {
            "id": "rw-nor-musanze",
            "name": "Musanze (Volcanoes / Gorillas)",
            "popular": true,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-ng",
    "name": "Nigeria",
    "code": "NG",
    "continent": "Africa",
    "currency": "NGN",
    "states": [
      {
        "code": "LAG",
        "name": "Lagos",
        "cities": [
          {
            "id": "ng-lag-lagos",
            "name": "Lagos (Victoria Island)",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "ABJ",
        "name": "Abuja",
        "cities": [
          {
            "id": "ng-abj-abuja",
            "name": "Abuja",
            "popular": false,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-gh",
    "name": "Ghana",
    "code": "GH",
    "continent": "Africa",
    "currency": "GHS",
    "states": [
      {
        "code": "ACC",
        "name": "Greater Accra",
        "cities": [
          {
            "id": "gh-acc-accra",
            "name": "Accra",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "CEN",
        "name": "Central",
        "cities": [
          {
            "id": "gh-cen-capecoast",
            "name": "Cape Coast",
            "popular": false,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-ug",
    "name": "Uganda",
    "code": "UG",
    "continent": "Africa",
    "currency": "UGX",
    "states": [
      {
        "code": "KAM",
        "name": "Kampala",
        "cities": [
          {
            "id": "ug-kam-kampala",
            "name": "Kampala",
            "popular": true,
            "hotels": []
          },
          {
            "id": "ug-kam-entebbe",
            "name": "Entebbe",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "WES",
        "name": "Western Region",
        "cities": [
          {
            "id": "ug-wes-bwindi",
            "name": "Bwindi Impenetrable (Gorillas)",
            "popular": true,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-na",
    "name": "Namibia",
    "code": "NA",
    "continent": "Africa",
    "currency": "NAD",
    "states": [
      {
        "code": "KHA",
        "name": "Khomas",
        "cities": [
          {
            "id": "na-kha-windhoek",
            "name": "Windhoek",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "ERO",
        "name": "Erongo",
        "cities": [
          {
            "id": "na-ero-swakopmund",
            "name": "Swakopmund",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "HAR",
        "name": "Hardap",
        "cities": [
          {
            "id": "na-har-sossusvlei",
            "name": "Sossusvlei Dunes",
            "popular": true,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-bw",
    "name": "Botswana",
    "code": "BW",
    "continent": "Africa",
    "currency": "BWP",
    "states": [
      {
        "code": "NW",
        "name": "North-West",
        "cities": [
          {
            "id": "bw-nw-maun",
            "name": "Maun (Okavango Delta)",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "CH",
        "name": "Chobe",
        "cities": [
          {
            "id": "bw-ch-kasane",
            "name": "Kasane (Chobe National Park)",
            "popular": true,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-zm",
    "name": "Zambia",
    "code": "ZM",
    "continent": "Africa",
    "currency": "ZMW",
    "states": [
      {
        "code": "SOU",
        "name": "Southern",
        "cities": [
          {
            "id": "zm-sou-livingstone",
            "name": "Livingstone (Victoria Falls)",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "LUS",
        "name": "Lusaka",
        "cities": [
          {
            "id": "zm-lus-lusaka",
            "name": "Lusaka",
            "popular": false,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-zw",
    "name": "Zimbabwe",
    "code": "ZW",
    "continent": "Africa",
    "currency": "USD",
    "states": [
      {
        "code": "MAT",
        "name": "Matabeleland North",
        "cities": [
          {
            "id": "zw-mat-victoriafalls",
            "name": "Victoria Falls",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "HAR",
        "name": "Harare",
        "cities": [
          {
            "id": "zw-har-harare",
            "name": "Harare",
            "popular": false,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-et",
    "name": "Ethiopia",
    "code": "ET",
    "continent": "Africa",
    "currency": "ETB",
    "states": [
      {
        "code": "ADD",
        "name": "Addis Ababa",
        "cities": [
          {
            "id": "et-add-addisababa",
            "name": "Addis Ababa",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "AMH",
        "name": "Amhara",
        "cities": [
          {
            "id": "et-amh-lalibela",
            "name": "Lalibela",
            "popular": true,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-mg",
    "name": "Madagascar",
    "code": "MG",
    "continent": "Africa",
    "currency": "MGA",
    "states": [
      {
        "code": "ANT",
        "name": "Analamanga",
        "cities": [
          {
            "id": "mg-ant-antananarivo",
            "name": "Antananarivo",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "NOS",
        "name": "Diana",
        "cities": [
          {
            "id": "mg-dia-nosybe",
            "name": "Nosy Be Island",
            "popular": true,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-ad",
    "name": "Andorra",
    "code": "AD",
    "continent": "Europe",
    "currency": "EUR",
    "states": [
      {
        "code": "AND",
        "name": "Andorra la Vella",
        "cities": [
          {
            "id": "ad-andorra",
            "name": "Andorra la Vella",
            "popular": false,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-li",
    "name": "Liechtenstein",
    "code": "LI",
    "continent": "Europe",
    "currency": "CHF",
    "states": [
      {
        "code": "VAD",
        "name": "Vaduz",
        "cities": [
          {
            "id": "li-vaduz",
            "name": "Vaduz",
            "popular": false,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-sm",
    "name": "San Marino",
    "code": "SM",
    "continent": "Europe",
    "currency": "EUR",
    "states": [
      {
        "code": "SMR",
        "name": "San Marino",
        "cities": [
          {
            "id": "sm-sanmarino",
            "name": "San Marino City",
            "popular": false,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-va",
    "name": "Vatican City",
    "code": "VA",
    "continent": "Europe",
    "currency": "EUR",
    "states": [
      {
        "code": "VAT",
        "name": "Vatican City",
        "cities": [
          {
            "id": "va-vatican",
            "name": "Vatican City",
            "popular": true,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-rs",
    "name": "Serbia",
    "code": "RS",
    "continent": "Europe",
    "currency": "RSD",
    "states": [
      {
        "code": "BEL",
        "name": "Belgrade",
        "cities": [
          {
            "id": "rs-belgrade",
            "name": "Belgrade",
            "popular": true,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-ba",
    "name": "Bosnia and Herzegovina",
    "code": "BA",
    "continent": "Europe",
    "currency": "BAM",
    "states": [
      {
        "code": "SAR",
        "name": "Sarajevo",
        "cities": [
          {
            "id": "ba-sarajevo",
            "name": "Sarajevo",
            "popular": true,
            "hotels": []
          },
          {
            "id": "ba-mostar",
            "name": "Mostar",
            "popular": true,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-me",
    "name": "Montenegro",
    "code": "ME",
    "continent": "Europe",
    "currency": "EUR",
    "states": [
      {
        "code": "KOT",
        "name": "Kotor",
        "cities": [
          {
            "id": "me-kotor",
            "name": "Kotor",
            "popular": true,
            "hotels": []
          },
          {
            "id": "me-budva",
            "name": "Budva",
            "popular": true,
            "hotels": []
          },
          {
            "id": "me-tivat",
            "name": "Tivat (Porto Montenegro)",
            "popular": true,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-al",
    "name": "Albania",
    "code": "AL",
    "continent": "Europe",
    "currency": "ALL",
    "states": [
      {
        "code": "TIR",
        "name": "Tirana",
        "cities": [
          {
            "id": "al-tirana",
            "name": "Tirana",
            "popular": false,
            "hotels": []
          }
        ]
      },
      {
        "code": "SAR",
        "name": "Vlorë",
        "cities": [
          {
            "id": "al-saranda",
            "name": "Sarandë",
            "popular": true,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-mk",
    "name": "North Macedonia",
    "code": "MK",
    "continent": "Europe",
    "currency": "MKD",
    "states": [
      {
        "code": "SKP",
        "name": "Skopje",
        "cities": [
          {
            "id": "mk-skopje",
            "name": "Skopje",
            "popular": false,
            "hotels": []
          },
          {
            "id": "mk-ohrid",
            "name": "Ohrid",
            "popular": true,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-kh",
    "name": "Cambodia",
    "code": "KH",
    "continent": "Asia",
    "currency": "USD",
    "states": [
      {
        "code": "SRP",
        "name": "Siem Reap",
        "cities": [
          {
            "id": "kh-siemreap",
            "name": "Siem Reap (Angkor Wat)",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "PNH",
        "name": "Phnom Penh",
        "cities": [
          {
            "id": "kh-phnompenh",
            "name": "Phnom Penh",
            "popular": false,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-la",
    "name": "Laos",
    "code": "LA",
    "continent": "Asia",
    "currency": "LAK",
    "states": [
      {
        "code": "LPB",
        "name": "Luang Prabang",
        "cities": [
          {
            "id": "la-luangprabang",
            "name": "Luang Prabang",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "VTE",
        "name": "Vientiane",
        "cities": [
          {
            "id": "la-vientiane",
            "name": "Vientiane",
            "popular": false,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-mm",
    "name": "Myanmar",
    "code": "MM",
    "continent": "Asia",
    "currency": "MMK",
    "states": [
      {
        "code": "MDY",
        "name": "Mandalay",
        "cities": [
          {
            "id": "mm-bagan",
            "name": "Bagan",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "YGN",
        "name": "Yangon",
        "cities": [
          {
            "id": "mm-yangon",
            "name": "Yangon",
            "popular": false,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-mn",
    "name": "Mongolia",
    "code": "MN",
    "continent": "Asia",
    "currency": "MNT",
    "states": [
      {
        "code": "UBN",
        "name": "Ulaanbaatar",
        "cities": [
          {
            "id": "mn-ulaanbaatar",
            "name": "Ulaanbaatar",
            "popular": false,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-bn",
    "name": "Brunei",
    "code": "BN",
    "continent": "Asia",
    "currency": "BND",
    "states": [
      {
        "code": "BSB",
        "name": "Brunei-Muara",
        "cities": [
          {
            "id": "bn-bandar",
            "name": "Bandar Seri Begawan",
            "popular": false,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-kg",
    "name": "Kyrgyzstan",
    "code": "KG",
    "continent": "Asia",
    "currency": "KGS",
    "states": [
      {
        "code": "BIS",
        "name": "Bishkek",
        "cities": [
          {
            "id": "kg-bishkek",
            "name": "Bishkek",
            "popular": false,
            "hotels": []
          },
          {
            "id": "kg-issykkul",
            "name": "Issyk-Kul",
            "popular": false,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-tj",
    "name": "Tajikistan",
    "code": "TJ",
    "continent": "Asia",
    "currency": "TJS",
    "states": [
      {
        "code": "DUS",
        "name": "Dushanbe",
        "cities": [
          {
            "id": "tj-dushanbe",
            "name": "Dushanbe",
            "popular": false,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-bz",
    "name": "Belize",
    "code": "BZ",
    "continent": "North America",
    "currency": "BZD",
    "states": [
      {
        "code": "CYO",
        "name": "Cayo",
        "cities": [
          {
            "id": "bz-ambergriscaye",
            "name": "Ambergris Caye (San Pedro)",
            "popular": true,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-gt",
    "name": "Guatemala",
    "code": "GT",
    "continent": "North America",
    "currency": "GTQ",
    "states": [
      {
        "code": "SAC",
        "name": "Sacatepéquez",
        "cities": [
          {
            "id": "gt-antigua",
            "name": "Antigua Guatemala",
            "popular": true,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-hn",
    "name": "Honduras",
    "code": "HN",
    "continent": "North America",
    "currency": "HNL",
    "states": [
      {
        "code": "IB",
        "name": "Bay Islands",
        "cities": [
          {
            "id": "hn-roatan",
            "name": "Roatán Island",
            "popular": true,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-sv",
    "name": "El Salvador",
    "code": "SV",
    "continent": "North America",
    "currency": "USD",
    "states": [
      {
        "code": "LIB",
        "name": "La Libertad",
        "cities": [
          {
            "id": "sv-eltunco",
            "name": "El Tunco (Surf City)",
            "popular": false,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-ni",
    "name": "Nicaragua",
    "code": "NI",
    "continent": "North America",
    "currency": "NIO",
    "states": [
      {
        "code": "GRA",
        "name": "Granada",
        "cities": [
          {
            "id": "ni-granada",
            "name": "Granada",
            "popular": false,
            "hotels": []
          },
          {
            "id": "ni-sanjuan",
            "name": "San Juan del Sur",
            "popular": false,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-tt",
    "name": "Trinidad and Tobago",
    "code": "TT",
    "continent": "North America",
    "currency": "TTD",
    "states": [
      {
        "code": "POS",
        "name": "Port of Spain",
        "cities": [
          {
            "id": "tt-portofspain",
            "name": "Port of Spain",
            "popular": false,
            "hotels": []
          },
          {
            "id": "tt-tobago",
            "name": "Tobago Island",
            "popular": false,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-lc",
    "name": "Saint Lucia",
    "code": "LC",
    "continent": "North America",
    "currency": "XCD",
    "states": [
      {
        "code": "SOU",
        "name": "Soufrière",
        "cities": [
          {
            "id": "lc-soufriere",
            "name": "Soufrière (The Pitons)",
            "popular": true,
            "hotels": []
          },
          {
            "id": "lc-rodneybay",
            "name": "Rodney Bay",
            "popular": false,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-ag",
    "name": "Antigua and Barbuda",
    "code": "AG",
    "continent": "North America",
    "currency": "XCD",
    "states": [
      {
        "code": "STJ",
        "name": "Saint John",
        "cities": [
          {
            "id": "ag-saintjohn",
            "name": "St. John's",
            "popular": false,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-aw",
    "name": "Aruba",
    "code": "AW",
    "continent": "North America",
    "currency": "AWG",
    "states": [
      {
        "code": "ORA",
        "name": "Oranjestad",
        "cities": [
          {
            "id": "aw-oranjestad",
            "name": "Oranjestad (Palm Beach)",
            "popular": true,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-cw",
    "name": "Curaçao",
    "code": "CW",
    "continent": "North America",
    "currency": "ANG",
    "states": [
      {
        "code": "WIL",
        "name": "Willemstad",
        "cities": [
          {
            "id": "cw-willemstad",
            "name": "Willemstad",
            "popular": true,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-sx",
    "name": "Sint Maarten",
    "code": "SX",
    "continent": "North America",
    "currency": "ANG",
    "states": [
      {
        "code": "PHI",
        "name": "Philipsburg",
        "cities": [
          {
            "id": "sx-philipsburg",
            "name": "Philipsburg (Maho Beach)",
            "popular": true,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-tc",
    "name": "Turks and Caicos Islands",
    "code": "TC",
    "continent": "North America",
    "currency": "USD",
    "states": [
      {
        "code": "PRO",
        "name": "Providenciales",
        "cities": [
          {
            "id": "tc-provo",
            "name": "Providenciales (Grace Bay)",
            "popular": true,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-bm",
    "name": "Bermuda",
    "code": "BM",
    "continent": "North America",
    "currency": "BMD",
    "states": [
      {
        "code": "HAM",
        "name": "Hamilton",
        "cities": [
          {
            "id": "bm-hamilton",
            "name": "Hamilton (Horseshoe Bay)",
            "popular": true,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-gd",
    "name": "Grenada",
    "code": "GD",
    "continent": "North America",
    "currency": "XCD",
    "states": [
      {
        "code": "STG",
        "name": "Saint George",
        "cities": [
          {
            "id": "gd-saintgeorge",
            "name": "St. George's (Grand Anse)",
            "popular": false,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-kn",
    "name": "Saint Kitts and Nevis",
    "code": "KN",
    "continent": "North America",
    "currency": "XCD",
    "states": [
      {
        "code": "BAS",
        "name": "Basseterre",
        "cities": [
          {
            "id": "kn-basseterre",
            "name": "Basseterre",
            "popular": false,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-bo",
    "name": "Bolivia",
    "code": "BO",
    "continent": "South America",
    "currency": "BOB",
    "states": [
      {
        "code": "POT",
        "name": "Potosí",
        "cities": [
          {
            "id": "bo-uyuni",
            "name": "Salar de Uyuni (Salt Flats)",
            "popular": true,
            "hotels": []
          }
        ]
      },
      {
        "code": "LPZ",
        "name": "La Paz",
        "cities": [
          {
            "id": "bo-lapaz",
            "name": "La Paz",
            "popular": false,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-py",
    "name": "Paraguay",
    "code": "PY",
    "continent": "South America",
    "currency": "PYG",
    "states": [
      {
        "code": "ASU",
        "name": "Asunción",
        "cities": [
          {
            "id": "py-asuncion",
            "name": "Asunción",
            "popular": false,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-ve",
    "name": "Venezuela",
    "code": "VE",
    "continent": "South America",
    "currency": "USD",
    "states": [
      {
        "code": "BOL",
        "name": "Bolívar",
        "cities": [
          {
            "id": "ve-canaima",
            "name": "Canaima (Angel Falls)",
            "popular": true,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-ws",
    "name": "Samoa",
    "code": "WS",
    "continent": "Oceania",
    "currency": "WST",
    "states": [
      {
        "code": "TUAM",
        "name": "Tuamasaga",
        "cities": [
          {
            "id": "ws-apia",
            "name": "Apia",
            "popular": false,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-vu",
    "name": "Vanuatu",
    "code": "VU",
    "continent": "Oceania",
    "currency": "VUV",
    "states": [
      {
        "code": "SHE",
        "name": "Shefa",
        "cities": [
          {
            "id": "vu-portvila",
            "name": "Port Vila",
            "popular": false,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-ck",
    "name": "Cook Islands",
    "code": "CK",
    "continent": "Oceania",
    "currency": "NZD",
    "states": [
      {
        "code": "RAR",
        "name": "Rarotonga",
        "cities": [
          {
            "id": "ck-rarotonga",
            "name": "Rarotonga",
            "popular": true,
            "hotels": []
          },
          {
            "id": "ck-aitutaki",
            "name": "Aitutaki Lagoon",
            "popular": true,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-sn",
    "name": "Senegal",
    "code": "SN",
    "continent": "Africa",
    "currency": "XOF",
    "states": [
      {
        "code": "DAK",
        "name": "Dakar",
        "cities": [
          {
            "id": "sn-dakar",
            "name": "Dakar",
            "popular": false,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-ci",
    "name": "Côte d'Ivoire",
    "code": "CI",
    "continent": "Africa",
    "currency": "XOF",
    "states": [
      {
        "code": "ABJ",
        "name": "Abidjan",
        "cities": [
          {
            "id": "ci-abidjan",
            "name": "Abidjan",
            "popular": false,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-cv",
    "name": "Cape Verde",
    "code": "CV",
    "continent": "Africa",
    "currency": "CVE",
    "states": [
      {
        "code": "SAL",
        "name": "Sal Island",
        "cities": [
          {
            "id": "cv-santaphmaria",
            "name": "Santa Maria Beach",
            "popular": true,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-st",
    "name": "São Tomé and Príncipe",
    "code": "ST",
    "continent": "Africa",
    "currency": "STN",
    "states": [
      {
        "code": "STP",
        "name": "São Tomé",
        "cities": [
          {
            "id": "st-saotome",
            "name": "São Tomé City",
            "popular": false,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-ao",
    "name": "Angola",
    "code": "AO",
    "continent": "Africa",
    "currency": "AOA",
    "states": [
      {
        "code": "LUA",
        "name": "Luanda",
        "cities": [
          {
            "id": "ao-luanda",
            "name": "Luanda",
            "popular": false,
            "hotels": []
          }
        ]
      }
    ]
  },
  {
    "id": "country-mz",
    "name": "Mozambique",
    "code": "MZ",
    "continent": "Africa",
    "currency": "MZN",
    "states": [
      {
        "code": "INB",
        "name": "Inhambane",
        "cities": [
          {
            "id": "mz-bazaruto",
            "name": "Bazaruto Archipelago",
            "popular": true,
            "hotels": []
          }
        ]
      }
    ]
  }
];
