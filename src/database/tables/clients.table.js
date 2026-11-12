/**
 * Schema definition & Versioned Migrations for 'clients' table
 */
export const clientsTable = {
  tableName: "clients",
  version: 1,

  columns: [
    { name: "id", type: "UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE" },
    { name: "full_name", type: "TEXT NOT NULL" },
    { name: "email", type: "TEXT UNIQUE NOT NULL" },
    { name: "phone", type: "TEXT" },
    { name: "avatar_url", type: "TEXT" },
    { name: "address", type: "TEXT" },
    { name: "city", type: "TEXT" },
    { name: "country", type: "TEXT" },
    { name: "postal_code", type: "TEXT" },
    { name: "role", type: "TEXT DEFAULT 'client' CHECK (role = 'client')" },
    { name: "status", type: "TEXT DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'pending'))" },
    { name: "total_bookings", type: "INT DEFAULT 0" },
    { name: "created_at", type: "TIMESTAMPTZ DEFAULT NOW()" },
    { name: "updated_at", type: "TIMESTAMPTZ DEFAULT NOW()" },
  ],

  /**
   * Generates initial CREATE TABLE SQL
   */
  getUpSql() {
    return `
      CREATE TABLE IF NOT EXISTS public.clients (
        id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
        full_name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        phone TEXT,
        avatar_url TEXT,
        address TEXT,
        city TEXT,
        country TEXT,
        postal_code TEXT,
        role TEXT DEFAULT 'client' CHECK (role = 'client'),
        status TEXT DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'pending')),
        total_bookings INT DEFAULT 0,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE INDEX IF NOT EXISTS idx_clients_email ON public.clients(email);
      ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

      DO $$ 
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_policies WHERE tablename = 'clients' AND policyname = 'Clients can view own profile'
        ) THEN
          CREATE POLICY "Clients can view own profile" ON public.clients FOR SELECT USING (auth.uid() = id);
        END IF;

        IF NOT EXISTS (
          SELECT 1 FROM pg_policies WHERE tablename = 'clients' AND policyname = 'Clients can update own profile'
        ) THEN
          CREATE POLICY "Clients can update own profile" ON public.clients FOR UPDATE USING (auth.uid() = id);
        END IF;

        IF NOT EXISTS (
          SELECT 1 FROM pg_policies WHERE tablename = 'clients' AND policyname = 'Service role can manage all clients'
        ) THEN
          CREATE POLICY "Service role can manage all clients" ON public.clients USING (true) WITH CHECK (true);
        END IF;
      END $$;
    `;
  },

  /**
   * Incremental migrations for future column additions
   */
  migrations: [
    // Future version 2 example:
    // {
    //   version: 2,
    //   description: "Add preferred_currency column",
    //   sql: `ALTER TABLE public.clients ADD COLUMN IF NOT EXISTS preferred_currency TEXT DEFAULT 'USD';`
    // }
  ],
};

