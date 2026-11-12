/**
 * Client-Side IndexedDB Storage for AuraLuxe Reservations
 * Enables instant 0ms offline-first dashboard loads with silent background server sync.
 */

const DB_NAME = "auraluxe_reservations_db";
const DB_VERSION = 1;
const STORE_NAME = "reservations";

function openDatabase() {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !window.indexedDB) {
      return reject(new Error("IndexedDB is not supported in this environment"));
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: "booking_reference" });
        store.createIndex("client_id", "client_id", { unique: false });
        store.createIndex("guest_email", "guest_email", { unique: false });
        store.createIndex("created_at", "created_at", { unique: false });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error("Failed to open IndexedDB"));
  });
}

/**
 * Saves or updates a single reservation in IndexedDB
 */
export async function saveBookingToIndexedDB(booking) {
  if (!booking || !booking.booking_reference) return;
  try {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(booking);
      req.onsuccess = () => resolve(true);
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.debug("[IndexedDB Save Warning]:", err);
  }
}

/**
 * Bulk saves an array of reservations to IndexedDB
 */
export async function saveAllBookingsToIndexedDB(bookings) {
  if (!Array.isArray(bookings) || bookings.length === 0) return;
  try {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      for (const item of bookings) {
        if (item && item.booking_reference) {
          store.put(item);
        }
      }
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => reject(tx.error);
    });
  } catch (err) {
    console.debug("[IndexedDB Bulk Save Warning]:", err);
  }
}

/**
 * Retrieves all stored reservations, optionally filtered for the active user
 */
export async function getBookingsFromIndexedDB(user = null) {
  try {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const req = store.getAll();

      req.onsuccess = () => {
        let results = req.result || [];
        if (user) {
          const userEmail = (user.email || "").trim().toLowerCase();
          results = results.filter((b) => {
            const matchesId = user.id && b.client_id === user.id;
            const matchesEmail = userEmail && (b.guest_email || "").trim().toLowerCase() === userEmail;
            return matchesId || matchesEmail;
          });
        }
        // Sort newest first
        results.sort((a, b) => new Date(b.created_at || b.check_in || 0) - new Date(a.created_at || a.check_in || 0));
        resolve(results);
      };

      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.debug("[IndexedDB Read Warning]:", err);
    return [];
  }
}

