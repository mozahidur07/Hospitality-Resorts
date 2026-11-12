import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

/**
 * Browser-safe Supabase Client using the public anon key.
 */
export const supabase = createClient(supabaseUrl || "", anonKey || "", {
  auth: {
    persistSession: true,
  },
});

