import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.warn("[Supabase Admin] SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is missing from environment.");
}

/**
 * Server-only Supabase Admin Client.
 * Possesses full admin privileges. Never expose to client/browser.
 */
export const supabaseAdmin = createClient(supabaseUrl || "", serviceRoleKey || "", {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

