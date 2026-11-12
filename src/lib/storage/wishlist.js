/**
 * Client-side Wishlist / Saved Hotels Storage Helper
 * Persists wishlisted hotels in browser localStorage with cross-component event sync.
 */

const STORAGE_KEY = "auraluxe_saved_hotels";

export function getSavedHotels() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.debug("[Wishlist Storage Read Error]:", e);
    return [];
  }
}

export function isHotelSaved(hotelId) {
  if (!hotelId) return false;
  const list = getSavedHotels();
  return list.some((item) => (typeof item === "string" ? item === hotelId : item.id === hotelId));
}

export function toggleSavedHotel(hotel) {
  if (typeof window === "undefined" || !hotel) return false;
  try {
    const list = getSavedHotels();
    const id = typeof hotel === "string" ? hotel : hotel.id;
    const exists = list.some((item) => (typeof item === "string" ? item === id : item.id === id));
    let updated;
    if (exists) {
      updated = list.filter((item) => (typeof item === "string" ? item !== id : item.id !== id));
    } else {
      updated = [hotel, ...list];
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("auraluxe_wishlist_change"));
    return !exists;
  } catch (e) {
    console.debug("[Wishlist Storage Write Error]:", e);
    return false;
  }
}

