import { cookies } from "next/headers";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { generateMachineId, hashToken } from "./device";
import { signAuthToken, verifyAuthToken } from "./jwt";

export const COOKIE_MACHINE_ID = "auraluxe_machine_id";
export const COOKIE_SESSION_TOKEN = "auraluxe_session_token";

const IS_PROD = process.env.NODE_ENV === "production";

/**
 * Creates an active device-bound session for a client
 */
export async function createClientSession({ clientId, email, request }) {
  const cookieStore = cookies();

  // 1. Get or generate Machine ID
  let machineId = cookieStore.get(COOKIE_MACHINE_ID)?.value;
  if (!machineId) {
    machineId = generateMachineId();
  }

  // 2. Sign JWT Token
  const jwtToken = await signAuthToken({
    userId: clientId,
    userEmail: email,
    machineId,
    role: "client",
  }, "30d");

  // 3. Extract request metadata
  const userAgent = request?.headers?.get("user-agent") || "Unknown Device";
  const ipAddress =
    request?.headers?.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request?.headers?.get("x-real-ip") ||
    "127.0.0.1";

  const tokenHash = hashToken(jwtToken);
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(); // 30 days

  // 4. Save to client_sessions table if it exists
  try {
    await supabaseAdmin.from("client_sessions").insert({
      client_id: clientId,
      machine_id: machineId,
      session_token_hash: tokenHash,
      ip_address: ipAddress,
      user_agent: userAgent,
      is_active: true,
      expires_at: expiresAt,
    });
  } catch (err) {
    console.warn("[Session Storage Warning]:", err.message);
  }

  // 5. Set HttpOnly, Secure Cookies
  cookieStore.set(COOKIE_MACHINE_ID, machineId, {
    httpOnly: true,
    secure: IS_PROD,
    sameSite: "lax",
    path: "/",
    maxAge: 365 * 24 * 60 * 60, // 1 year
  });

  cookieStore.set(COOKIE_SESSION_TOKEN, jwtToken, {
    httpOnly: true,
    secure: IS_PROD,
    sameSite: "lax",
    path: "/",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  });

  return { machineId, jwtToken };
}

/**
 * Verifies current session from cookies
 */
export async function getVerifiedClientSession() {
  const cookieStore = cookies();
  const machineId = cookieStore.get(COOKIE_MACHINE_ID)?.value;
  const sessionToken = cookieStore.get(COOKIE_SESSION_TOKEN)?.value;

  if (!sessionToken || !machineId) {
    return { authenticated: false };
  }

  // Verify JWT signature & expiration
  const { valid, payload } = await verifyAuthToken(sessionToken);
  if (!valid || !payload) {
    return { authenticated: false };
  }

  // Verify Device Binding (machineId match)
  if (payload.machineId !== machineId) {
    console.warn("[Security Alert]: Machine ID mismatch detected! Invalidating session.");
    clearAuthCookies();
    return { authenticated: false };
  }

  // Fetch client details from database
  try {
    const { data: client, error } = await supabaseAdmin
      .from("clients")
      .select("*")
      .eq("id", payload.userId)
      .single();

    if (error || !client) {
      return {
        authenticated: true,
        user: {
          id: payload.userId,
          email: payload.userEmail,
          role: payload.role,
        },
      };
    }

    return {
      authenticated: true,
      user: client,
    };
  } catch {
    return {
      authenticated: true,
      user: {
        id: payload.userId,
        email: payload.userEmail,
        role: payload.role,
      },
    };
  }
}

/**
 * Clears authentication cookies
 */
export function clearAuthCookies() {
  const cookieStore = cookies();
  cookieStore.delete(COOKIE_SESSION_TOKEN);
}

