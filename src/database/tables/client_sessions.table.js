/**
 * Schema definition & Versioned Migrations for 'client_sessions' table
 * Tracks device-bound sessions with machineId & hashed session tokens
 */
export const clientSessionsTable = {
  tableName: "client_sessions",
  version: 1,

  columns: [
    { name: "id", type: "UUID PRIMARY KEY DEFAULT gen_random_uuid()" },
    { name: "client_id", type: "UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE" },
    { name: "machine_id", type: "TEXT NOT NULL" },
    { name: "session_token_hash", type: "TEXT NOT NULL" },
    { name: "ip_address", type: "TEXT" },
    { name: "user_agent", type: "TEXT" },
    { name: "is_active", type: "BOOLEAN DEFAULT TRUE" },
    { name: "last_active_at", type: "TIMESTAMPTZ DEFAULT NOW()" },
    { name: "expires_at", type: "TIMESTAMPTZ NOT NULL" },
    { name: "created_at", type: "TIMESTAMPTZ DEFAULT NOW()" },
  ],

  /**
   * Generates initial CREATE TABLE SQL
   */
  getUpSql() {
    return `
      CREATE TABLE IF NOT EXISTS public.client_sessions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
        machine_id TEXT NOT NULL,
        session_token_hash TEXT NOT NULL,
        ip_address TEXT,
        user_agent TEXT,
        is_active BOOLEAN DEFAULT TRUE,
        last_active_at TIMESTAMPTZ DEFAULT NOW(),
        expires_at TIMESTAMPTZ NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE INDEX IF NOT EXISTS idx_client_sessions_lookup ON public.client_sessions(client_id, machine_id);
      ALTER TABLE public.client_sessions ENABLE ROW LEVEL SECURITY;

      DO $$ 
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_policies WHERE tablename = 'client_sessions' AND policyname = 'Clients can view own sessions'
        ) THEN
          CREATE POLICY "Clients can view own sessions" ON public.client_sessions FOR SELECT USING (auth.uid() = client_id);
        END IF;

        IF NOT EXISTS (
          SELECT 1 FROM pg_policies WHERE tablename = 'client_sessions' AND policyname = 'Service role can manage all sessions'
        ) THEN
          CREATE POLICY "Service role can manage all sessions" ON public.client_sessions USING (true) WITH CHECK (true);
        END IF;
      END $$;
    `;
  },

  /**
   * Incremental migrations for future column additions
   */
  migrations: [],
};

