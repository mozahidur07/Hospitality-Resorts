import crypto from "crypto";
import { cookies } from "next/headers";
import { signAuthToken, verifyAuthToken } from "./jwt";

export const COOKIE_HOTEL_ADMIN_TOKEN = "auraluxe_hotel_admin_token";
export const COOKIE_SUPER_ADMIN_TOKEN = "auraluxe_super_admin_token";

export const DEFAULT_HOTEL_ADMIN_PASSWORD =
  process.env.DEFAULT_HOTEL_ADMIN_PASSWORD ||
  process.env.HOTEL_PASS ||
  "AuraHotel@2026";
export const SUPER_ADMIN_EMAIL =
  process.env.SUPER_ADMIN_EMAIL || "admin@auraluxe.com";
export const SUPER_ADMIN_PASSWORD =
  process.env.SUPER_ADMIN_PASSWORD || "AuraMaster@2026";

export const IS_PROD = process.env.NODE_ENV === "production";

export const HOTEL_ADMIN_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: IS_PROD,
  sameSite: "lax",
  path: "/",
  maxAge: 7 * 24 * 60 * 60,
};

export const SUPER_ADMIN_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: IS_PROD,
  sameSite: "lax",
  path: "/",
  maxAge: 7 * 24 * 60 * 60,
};

/**
 * Hashes a management password deterministically with a secret salt
 */
export function hashManagementPassword(password) {
  const salt = process.env.JWT_SECRET || "auraluxe-mgmt-salt-2026";
  return crypto
    .createHmac("sha256", salt)
    .update(String(password))
    .digest("hex");
}

/**
 * Verifies a plaintext password against a stored hash
 */
export function verifyManagementPassword(password, storedHash) {
  if (!password || !storedHash) return false;
  const computed = hashManagementPassword(password);
  try {
    return crypto.timingSafeEqual(
      Buffer.from(computed, "hex"),
      Buffer.from(storedHash, "hex")
    );
  } catch {
    return computed === storedHash;
  }
}

/**
 * Sets HttpOnly JWT session cookie for a specific Hotel Admin
 */
export async function createHotelAdminSession({ hotelId, hotelName }) {
  const cookieStore = cookies();
  const token = await signAuthToken(
    {
      role: "hotel_admin",
      hotelId,
      hotelName,
      userId: `hotel_admin_${hotelId}`,
    },
    "7d"
  );

  try {
    cookieStore.set(COOKIE_HOTEL_ADMIN_TOKEN, token, HOTEL_ADMIN_COOKIE_OPTIONS);
  } catch {}

  return token;
}

/**
 * Verifies current Hotel Admin session from cookies
 */
export async function getVerifiedHotelAdminSession() {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_HOTEL_ADMIN_TOKEN)?.value;
  if (!token) return { authenticated: false };

  const { valid, payload } = await verifyAuthToken(token);
  if (!valid || !payload || payload.role !== "hotel_admin" || !payload.hotelId) {
    return { authenticated: false };
  }

  return {
    authenticated: true,
    hotelId: payload.hotelId,
    hotelName: payload.hotelName,
  };
}

/**
 * Clears Hotel Admin session cookie
 */
export function clearHotelAdminSession() {
  try {
    const cookieStore = cookies();
    cookieStore.delete(COOKIE_HOTEL_ADMIN_TOKEN);
  } catch {}
}

/**
 * Sets HttpOnly JWT session cookie for Super Admin
 */
export async function createSuperAdminSession({ email }) {
  const cookieStore = cookies();
  const token = await signAuthToken(
    {
      role: "super_admin",
      email,
      userEmail: email,
      userId: `super_admin_${email}`,
    },
    "7d"
  );

  try {
    cookieStore.set(COOKIE_SUPER_ADMIN_TOKEN, token, SUPER_ADMIN_COOKIE_OPTIONS);
  } catch {}

  return token;
}

/**
 * Verifies current Super Admin session from cookies
 */
export async function getVerifiedSuperAdminSession() {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_SUPER_ADMIN_TOKEN)?.value;
  if (!token) return { authenticated: false };

  const { valid, payload } = await verifyAuthToken(token);
  if (!valid || !payload || payload.role !== "super_admin") {
    return { authenticated: false };
  }

  return {
    authenticated: true,
    email: payload.email || payload.userEmail,
  };
}

/**
 * Clears Super Admin session cookie
 */
export function clearSuperAdminSession() {
  try {
    const cookieStore = cookies();
    cookieStore.delete(COOKIE_SUPER_ADMIN_TOKEN);
  } catch {}
}

