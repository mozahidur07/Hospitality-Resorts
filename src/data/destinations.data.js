/**
 * Comprehensive Destinations Master Data Module
 * Combines exhaustive India dataset (all 28 states & 8 UTs) and 147+ International countries.
 * Hierarchical structure: Country -> State -> City -> [Hotels]
 *
 * Provides optimized search & lookup utilities for:
 * 1. Landing Page Booking Search Bar (instant search across City, State, Country)
 * 2. Hotel Provider registration (Country -> State -> City dropdown cascades)
 */

import { INDIA_DESTINATIONS } from "./destinations/india.destinations";
import { INTERNATIONAL_DESTINATIONS } from "./destinations/international.destinations";
import { getHotelsByCityId } from "./hotels/index";

// Full Hierarchical Destination Tree (India + 147 International Countries)
export const ALL_DESTINATIONS = [
  INDIA_DESTINATIONS,
  ...INTERNATIONAL_DESTINATIONS,
];

// Common country/region aliases for instant token resolution
const COUNTRY_ALIASES = {
  uae: ["united arab emirates", "ae"],
  uk: ["united kingdom", "great britain", "england", "gb"],
  usa: ["united states", "america", "us"],
  us: ["united states", "america"],
  ind: ["india", "in"],
};

/**
 * Helper to compute real hotel count for a given city
 */
function getCityHotelCount(city) {
  const hotels = getHotelsByCityId(city.id);
  if (hotels.length > 0) return hotels.length;
  return Array.isArray(city.hotels) ? city.hotels.length : 0;
}

/**
 * Returns all available countries (sorted with India first, then alphabetically)
 */
export function getCountries() {
  return ALL_DESTINATIONS.map((c) => ({
    id: c.id,
    name: c.name,
    code: c.code,
    continent: c.continent,
    currency: c.currency,
  }));
}

/**
 * Returns states / provinces for a specific country code (e.g., 'IN', 'AE', 'US')
 */
export function getStatesByCountry(countryCode) {
  if (!countryCode) return [];
  const normalized = countryCode.trim().toUpperCase();
  const country = ALL_DESTINATIONS.find(
    (c) => c.code.toUpperCase() === normalized || c.id === countryCode
  );
  return country ? country.states : [];
}

/**
 * Returns cities for a specific country and state
 */
export function getCitiesByState(countryCode, stateCode) {
  const states = getStatesByCountry(countryCode);
  if (!states.length || !stateCode) return [];
  const state = states.find(
    (s) =>
      s.code.toUpperCase() === stateCode.trim().toUpperCase() ||
      s.name.toLowerCase() === stateCode.trim().toLowerCase()
  );
  return state ? state.cities : [];
}

/**
 * Fast, intelligent search across all cities, states, and countries.
 * Supports multi-token searches like "Darjeeling, India", "Paris, France", "Dubai UAE", "Goa".
 *
 * @param {string} query - The search string typed by the user or selected from dropdown.
 * @param {number} limit - Maximum number of results to return (default: 12).
 * @returns {Array<{ id: string, cityName: string, stateName: string, countryName: string, displayName: string, popular: boolean, hotelCount: number, priority: number }>}
 */
export function searchDestinations(query = "", limit = 12) {
  const rawQ = (query || "").trim().toLowerCase();

  // If query is empty, return popular curated destinations
  if (!rawQ) {
    return getPopularDestinations(limit);
  }

  // Tokenize query by commas, hyphens, and whitespace (e.g. "Darjeeling, India" -> ["darjeeling", "india"])
  const tokens = rawQ
    .split(/[,\s-]+/)
    .map((t) => t.trim())
    .filter((t) => t.length > 0);

  if (tokens.length === 0) {
    return getPopularDestinations(limit);
  }

  const results = [];

  for (const country of ALL_DESTINATIONS) {
    const countryNameLower = country.name.toLowerCase();
    const countryCodeLower = country.code.toLowerCase();

    for (const state of country.states) {
      const stateNameLower = state.name.toLowerCase();
      const stateCodeLower = state.code.toLowerCase();

      for (const city of state.cities) {
        const cityNameLower = city.name.toLowerCase();

        // Combined searchable metadata
        const fullCompound = `${cityNameLower} ${stateNameLower} ${countryNameLower} ${stateCodeLower} ${countryCodeLower}`;
        const cityCountry = `${cityNameLower}, ${countryNameLower}`;
        const cityStateCountry = `${cityNameLower}, ${stateNameLower}, ${countryNameLower}`;

        // Match check: Every token must match somewhere in (city, state, country, code, or alias)
        const allTokensMatch = tokens.every((token) => {
          if (fullCompound.includes(token)) return true;
          // Check aliases (e.g. "uae" -> "united arab emirates", "uk" -> "united kingdom", "usa" -> "united states")
          const aliases = COUNTRY_ALIASES[token];
          if (aliases) {
            return aliases.some(
              (alias) => countryNameLower.includes(alias) || countryCodeLower === alias
            );
          }
          return false;
        });

        if (allTokensMatch) {
          let priority = 5;

          if (
            rawQ === cityNameLower ||
            rawQ === cityCountry ||
            rawQ === cityStateCountry
          ) {
            priority = 1;
          } else if (cityNameLower.startsWith(tokens[0])) {
            priority = 2;
          } else if (cityNameLower.includes(tokens[0])) {
            priority = 3;
          } else if (stateNameLower.includes(tokens[0])) {
            priority = 4;
          }

          results.push({
            id: city.id,
            cityName: city.name,
            stateName: state.name,
            countryName: country.name,
            displayName: `${city.name}, ${state.name}, ${country.name}`,
            popular: Boolean(city.popular),
            hotelCount: getCityHotelCount(city),
            priority,
          });

          if (results.length >= limit * 4) {
            break;
          }
        }
      }
      if (results.length >= limit * 4) break;
    }
    if (results.length >= limit * 4) break;
  }

  // Sort by priority (1 highest), then popular status, then alphabetical
  results.sort((a, b) => {
    if (a.priority !== b.priority) return a.priority - b.priority;
    if (a.popular && !b.popular) return -1;
    if (!a.popular && b.popular) return 1;
    return a.cityName.localeCompare(b.cityName);
  });

  return results.slice(0, limit);
}

/**
 * Returns top curated popular destinations for empty search queries
 * Shuffles through domestic and international popular destinations dynamically
 * so that each visit/search provides fresh, varied recommendations.
 *
 * @param {number} limit - Maximum number of destinations to return
 * @param {number} _seed - Optional rotation seed to refresh suggestions
 */
export function getPopularDestinations(limit = 8, _seed = 0) {
  const popular = [];

  for (const country of ALL_DESTINATIONS) {
    for (const state of country.states) {
      for (const city of state.cities) {
        if (city.popular) {
          popular.push({
            id: city.id,
            cityName: city.name,
            stateName: state.name,
            countryName: country.name,
            displayName: `${city.name}, ${state.name}, ${country.name}`,
            popular: true,
            hotelCount: getCityHotelCount(city),
          });
        }
      }
    }
  }

  // Fisher-Yates shuffle to guarantee dynamic, non-fixed destination suggestions
  for (let i = popular.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = popular[i];
    popular[i] = popular[j];
    popular[j] = temp;
  }

  return popular.slice(0, limit);
}

/**
 * Smart contextual recommendations based on current search or selected destination.
 * Strictly guarantees that all recommended cities belong to the specified State and/or Country:
 * 1. Cities in the same State (popular first, then others)
 * 2. Cities in the same Country (popular first, then others)
 * 3. Never injects unrelated external countries into a country-specific recommendation block.
 *
 * @param {object|null} targetDestination - The matched destination { id, cityName, stateName, countryName }
 * @param {number} limit - Maximum recommendations to return (default: 6)
 * @returns {{ title: string, items: Array<object> }}
 */
export function getSmartRecommendations(targetDestination, limit = 6) {
  if (!targetDestination || !targetDestination.countryName) {
    return {
      title: "Popular Escapes",
      items: getPopularDestinations(limit),
    };
  }

  const { cityName, stateName, countryName, id: currentId } = targetDestination;

  // Locate country node in hierarchy
  const countryObj = ALL_DESTINATIONS.find(
    (c) =>
      c.name.toLowerCase() === countryName.toLowerCase() ||
      c.code.toUpperCase() === countryName.toUpperCase()
  );

  if (!countryObj) {
    return {
      title: "Popular Escapes",
      items: getPopularDestinations(limit),
    };
  }

  // Locate state node in hierarchy (if present)
  const stateObj = countryObj.states.find(
    (s) =>
      s.name.toLowerCase() === stateName?.toLowerCase() ||
      s.code.toUpperCase() === stateName?.toUpperCase()
  );

  const sameStatePopular = [];
  const sameStateOther = [];
  const sameCountryPopular = [];
  const sameCountryOther = [];

  // 1. Collect cities in the same State (excluding the currently selected city)
  if (stateObj) {
    for (const city of stateObj.cities) {
      if (city.id === currentId || city.name.toLowerCase() === cityName?.toLowerCase()) {
        continue;
      }
      const item = {
        id: city.id,
        cityName: city.name,
        stateName: stateObj.name,
        countryName: countryObj.name,
        displayName: `${city.name}, ${stateObj.name}, ${countryObj.name}`,
        popular: Boolean(city.popular),
        hotelCount: getCityHotelCount(city),
        badge: `In ${stateObj.name}`,
      };

      if (city.popular) {
        sameStatePopular.push(item);
      } else {
        sameStateOther.push(item);
      }
    }
  }

  // 2. Collect cities in other states of the SAME COUNTRY
  for (const s of countryObj.states) {
    if (stateObj && s.name.toLowerCase() === stateObj.name.toLowerCase()) {
      continue;
    }
    for (const city of s.cities) {
      if (city.id === currentId || city.name.toLowerCase() === cityName?.toLowerCase()) {
        continue;
      }
      const item = {
        id: city.id,
        cityName: city.name,
        stateName: s.name,
        countryName: countryObj.name,
        displayName: `${city.name}, ${s.name}, ${countryObj.name}`,
        popular: Boolean(city.popular),
        hotelCount: getCityHotelCount(city),
        badge: `In ${countryObj.name}`,
      };

      if (city.popular) {
        sameCountryPopular.push(item);
      } else {
        sameCountryOther.push(item);
      }
    }
  }

  // Combine recommendations exclusively within the target state/country:
  // Same State popular -> Same State other -> Same Country popular -> Same Country other
  const combined = [
    ...sameStatePopular,
    ...sameStateOther,
    ...sameCountryPopular,
    ...sameCountryOther,
  ];

  const finalItems = combined.slice(0, limit);

  // Dynamic context-aware title
  let title = "Popular Escapes";
  if (stateObj?.name && countryObj?.name && stateObj.name !== countryObj.name) {
    title = `Popular in ${stateObj.name} & ${countryObj.name}`;
  } else if (countryObj?.name) {
    title = `Popular in ${countryObj.name}`;
  }

  return {
    title,
    items: finalItems,
  };
}
