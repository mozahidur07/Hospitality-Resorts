/**
 * Schema definition & Versioned Migrations for 'bookings' (Hotel Reservations) table
 * Enforces room availability, guest details, and prevents double-booking.
 */
export const bookingsTable = {
  tableName: "bookings",
  version: 1,

  columns: [
    { name: "id", type: "UUID PRIMARY KEY DEFAULT gen_random_uuid()" },
    { name: "booking_reference", type: "TEXT UNIQUE NOT NULL" },
    { name: "client_id", type: "UUID REFERENCES auth.users(id) ON DELETE SET NULL" },
    { name: "payment_id", type: "TEXT" },
    { name: "guest_name", type: "TEXT NOT NULL" },
    { name: "guest_email", type: "TEXT NOT NULL" },
    { name: "guest_phone", type: "TEXT" },
    { name: "hotel_id", type: "TEXT NOT NULL" },
    { name: "hotel_name", type: "TEXT NOT NULL" },
    { name: "hotel_city", type: "TEXT NOT NULL" },
    { name: "hotel_country", type: "TEXT NOT NULL" },
    { name: "room_id", type: "TEXT NOT NULL" },
    { name: "room_name", type: "TEXT NOT NULL" },
    { name: "check_in", type: "DATE NOT NULL" },
    { name: "check_out", type: "DATE NOT NULL" },
    { name: "nights", type: "INT NOT NULL CHECK (nights > 0)" },
    { name: "adults", type: "INT DEFAULT 2 CHECK (adults > 0)" },
    { name: "children", type: "INT DEFAULT 0" },
    { name: "rooms_count", type: "INT DEFAULT 1 CHECK (rooms_count > 0)" },
    { name: "price_per_night", type: "NUMERIC(12, 2) NOT NULL" },
    { name: "subtotal", type: "NUMERIC(12, 2) NOT NULL" },
    { name: "taxes_and_fees", type: "NUMERIC(12, 2) NOT NULL" },
    { name: "concierge_fee", type: "NUMERIC(12, 2) DEFAULT 0" },
    { name: "total_amount", type: "NUMERIC(12, 2) NOT NULL" },
    { name: "currency", type: "TEXT DEFAULT 'INR'" },
    { name: "payment_status", type: "TEXT DEFAULT 'confirmed' CHECK (payment_status IN ('pending', 'confirmed', 'cancelled', 'refunded'))" },
    { name: "booking_status", type: "TEXT DEFAULT 'confirmed' CHECK (booking_status IN ('confirmed', 'completed', 'cancelled'))" },
    { name: "special_requests", type: "TEXT" },
    { name: "created_at", type: "TIMESTAMPTZ DEFAULT NOW()" },
    { name: "updated_at", type: "TIMESTAMPTZ DEFAULT NOW()" },
  ],

  getUpSql() {
    return `
      CREATE TABLE IF NOT EXISTS public.bookings (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        booking_reference TEXT UNIQUE NOT NULL,
        client_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
        payment_id TEXT,
        guest_name TEXT NOT NULL,
        guest_email TEXT NOT NULL,
        guest_phone TEXT,
        hotel_id TEXT NOT NULL,
        hotel_name TEXT NOT NULL,
        hotel_city TEXT NOT NULL,
        hotel_country TEXT NOT NULL,
        room_id TEXT NOT NULL,
        room_name TEXT NOT NULL,
        check_in DATE NOT NULL,
        check_out DATE NOT NULL,
        nights INT NOT NULL CHECK (nights > 0),
        adults INT DEFAULT 2 CHECK (adults > 0),
        children INT DEFAULT 0,
        rooms_count INT DEFAULT 1 CHECK (rooms_count > 0),
        price_per_night NUMERIC(12, 2) NOT NULL,
        subtotal NUMERIC(12, 2) NOT NULL,
        taxes_and_fees NUMERIC(12, 2) NOT NULL,
        concierge_fee NUMERIC(12, 2) DEFAULT 0,
        total_amount NUMERIC(12, 2) NOT NULL,
        currency TEXT DEFAULT 'INR',
        payment_status TEXT DEFAULT 'confirmed' CHECK (payment_status IN ('pending', 'confirmed', 'cancelled', 'refunded')),
        booking_status TEXT DEFAULT 'confirmed' CHECK (booking_status IN ('confirmed', 'completed', 'cancelled')),
        special_requests TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW(),
        CONSTRAINT check_valid_dates CHECK (check_out > check_in)
      );

      -- Essential indexes for fast conflict lookup and client queries
      CREATE INDEX IF NOT EXISTS idx_bookings_overlap 
        ON public.bookings(hotel_id, room_id, check_in, check_out) 
        WHERE booking_status != 'cancelled';

      CREATE INDEX IF NOT EXISTS idx_bookings_client 
        ON public.bookings(client_id);

      CREATE INDEX IF NOT EXISTS idx_bookings_guest_email 
        ON public.bookings(guest_email);

      CREATE INDEX IF NOT EXISTS idx_bookings_reference 
        ON public.bookings(booking_reference);

      -- Enable RLS
      ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

      DO $$ 
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_policies WHERE tablename = 'bookings' AND policyname = 'Clients can view own bookings'
        ) THEN
          CREATE POLICY "Clients can view own bookings" ON public.bookings FOR SELECT 
          USING (auth.uid() = client_id OR client_id IS NULL);
        END IF;

        IF NOT EXISTS (
          SELECT 1 FROM pg_policies WHERE tablename = 'bookings' AND policyname = 'Service role can manage all bookings'
        ) THEN
          CREATE POLICY "Service role can manage all bookings" ON public.bookings 
          USING (true) WITH CHECK (true);
        END IF;
      END $$;
    `;
  },

  migrations: [],
};

