/**
 * Schema definition for 'hotel_admins' table
 * Stores hotel-level administrative credentials and live room inventory/rate overrides.
 */
export const hotelAdminsTable = {
  tableName: "hotel_admins",
  version: 1,

  getUpSql() {
    return `
      CREATE TABLE IF NOT EXISTS public.hotel_admins (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        hotel_id TEXT UNIQUE NOT NULL,
        hotel_name TEXT,
        password_hash TEXT NOT NULL,
        room_overrides JSONB DEFAULT '{}'::jsonb,
        status TEXT DEFAULT 'active' CHECK (status IN ('active', 'suspended')),
        last_login_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE INDEX IF NOT EXISTS idx_hotel_admins_hotel_id ON public.hotel_admins(hotel_id);
      ALTER TABLE public.hotel_admins ENABLE ROW LEVEL SECURITY;

      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_policies
          WHERE tablename = 'hotel_admins' AND policyname = 'Service role full access on hotel_admins'
        ) THEN
          CREATE POLICY "Service role full access on hotel_admins"
          ON public.hotel_admins FOR ALL
          USING (auth.role() = 'service_role');
        END IF;
      END $$;
    `;
  },
};

