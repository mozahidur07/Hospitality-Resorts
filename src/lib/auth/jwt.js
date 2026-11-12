import { SignJWT, jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY;
const secretKey = new TextEncoder().encode(JWT_SECRET);

/**
 * Signs a new JWT bound to userId, userEmail, machineId, and role
 * @param {Object} payload { userId, userEmail, machineId, role }
 * @param {string} expiresIn e.g. '7d', '30d'
 */
export async function signAuthToken(payload, expiresIn = "7d") {
  return await new SignJWT({
    ...payload,
    role: payload.role || "client",
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(secretKey);
}

/**
 * Verifies a given JWT and extracts the payload
 * @param {string} token
 */
export async function verifyAuthToken(token) {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return { valid: true, payload };
  } catch (error) {
    return { valid: false, error: error.message };
  }
}

