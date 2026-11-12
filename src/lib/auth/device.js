import crypto from "crypto";

/**
 * Generates a cryptographic random machine / device identifier
 */
export function generateMachineId() {
  return "mach_" + crypto.randomUUID().replace(/-/g, "");
}

/**
 * Creates a SHA-256 hash of a session token for secure database storage
 */
export function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

