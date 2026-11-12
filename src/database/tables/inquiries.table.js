/**
 * Schema definition & Versioned Migrations for 'inquiries' table
 */
export const inquiriesTable = {
  tableName: "inquiries",
  version: 1,

  columns: [
    { name: "id", type: "UUID PRIMARY KEY DEFAULT gen_random_uuid()" },
    { name: "client_id", type: "UUID REFERENCES auth.users(id) ON DELETE SET NULL" },
    { name: "full_name", type: "TEXT NOT NULL" },
    { name: "email", type: "TEXT NOT NULL" },
    { name: "phone", type: "TEXT" },
    { name: "booking_reference", type: "TEXT" },
    { name: "subject", type: "TEXT NOT NULL" },
    { name: "message", type: "TEXT NOT NULL" },
    { name: "status", type: "TEXT DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'resolved', 'archived'))" },
    { name: "created_at", type: "TIMESTAMPTZ DEFAULT NOW()" },
    { name: "updated_at", type: "TIMESTAMPTZ DEFAULT NOW()" },
  ],

  /**
   * Generates initial CREATE TABLE SQL for Supabase SQL Editor
   */
  getUpSql() {
    return `
      CREATE TABLE IF NOT EXISTS public.inquiries (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        client_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
        full_name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        booking_reference TEXT,
        subject TEXT NOT NULL,
        message TEXT NOT NULL,
        status TEXT DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'resolved', 'archived')),
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE INDEX IF NOT EXISTS idx_inquiries_email ON public.inquiries(email);
      CREATE INDEX IF NOT EXISTS idx_inquiries_client_id ON public.inquiries(client_id);
      CREATE INDEX IF NOT EXISTS idx_inquiries_status ON public.inquiries(status);

      ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

      -- Allow public guest & authenticated user inquiry submissions
      DO $$ 
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_policies 
          WHERE tablename = 'inquiries' AND policyname = 'Allow public insert to inquiries'
        ) THEN
          CREATE POLICY "Allow public insert to inquiries" 
          ON public.inquiries FOR INSERT 
          WITH CHECK (true);
        END IF;
      END $$;

      -- Allow users to read their own inquiries and service role full access
      DO $$ 
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_policies 
          WHERE tablename = 'inquiries' AND policyname = 'Allow users to read inquiries'
        ) THEN
          CREATE POLICY "Allow users to read inquiries" 
          ON public.inquiries FOR SELECT 
          USING (
            (auth.uid() = client_id) OR
            (auth.role() = 'service_role')
          );
        END IF;
      END $$;
    `;
  },
};

