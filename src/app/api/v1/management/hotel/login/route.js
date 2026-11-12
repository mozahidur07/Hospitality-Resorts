import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { getHotelBySlug } from "@/features/hotels/services/mock-hotels.data";
import {
  DEFAULT_HOTEL_ADMIN_PASSWORD,
  hashManagementPassword,
  verifyManagementPassword,
  createHotelAdminSession,
  COOKIE_HOTEL_ADMIN_TOKEN,
  HOTEL_ADMIN_COOKIE_OPTIONS,
} from "@/lib/auth/management-session";

export async function POST(request) {
  try {
    const body = await request.json();
    const { hotelId, password } = body;

    if (!hotelId || !password) {
      return NextResponse.json(
        { success: false, message: "Please select a hotel and enter your administrative password." },
        { status: 400 }
      );
    }

    const hotel = getHotelBySlug(hotelId);
    if (!hotel) {
      return NextResponse.json(
        { success: false, message: "Selected hotel property not found." },
        { status: 404 }
      );
    }

    // Check hotel_admins record in Supabase
    let adminRecord = null;
    try {
      const { data, error } = await supabaseAdmin
        .from("hotel_admins")
        .select("*")
        .eq("hotel_id", hotel.id)
        .maybeSingle();

      if (!error && data) {
        adminRecord = data;
      }
    } catch {
      // Fallback if table not migrated yet
    }

    if (adminRecord) {
      if (adminRecord.status === "suspended") {
        return NextResponse.json(
          { success: false, message: "This hotel administrative account is currently suspended." },
          { status: 403 }
        );
      }

      const valid = verifyManagementPassword(password, adminRecord.password_hash);
      if (!valid) {
        return NextResponse.json(
          { success: false, message: "Invalid administrative password for this property." },
          { status: 401 }
        );
      }

      try {
        await supabaseAdmin
          .from("hotel_admins")
          .update({ last_login_at: new Date().toISOString() })
          .eq("hotel_id", hotel.id);
      } catch {}
    } else {
      // First-time login: validate against DEFAULT_HOTEL_ADMIN_PASSWORD
      if (password !== DEFAULT_HOTEL_ADMIN_PASSWORD) {
        return NextResponse.json(
          { success: false, message: "Invalid administrative password for this property." },
          { status: 401 }
        );
      }

      // Auto-provision record in hotel_admins table
      try {
        await supabaseAdmin.from("hotel_admins").upsert(
          {
            hotel_id: hotel.id,
            hotel_name: hotel.name,
            password_hash: hashManagementPassword(password),
            room_overrides: {},
            status: "active",
            last_login_at: new Date().toISOString(),
          },
          { onConflict: "hotel_id" }
        );
      } catch {}
    }

    const token = await createHotelAdminSession({ hotelId: hotel.id, hotelName: hotel.name });

    const response = NextResponse.json({
      success: true,
      hotel: {
        id: hotel.id,
        name: hotel.name,
        cityName: hotel.cityName,
        countryName: hotel.countryName,
      },
      message: "Authenticated to Hotel Management Portal.",
    });

    response.cookies.set(COOKIE_HOTEL_ADMIN_TOKEN, token, HOTEL_ADMIN_COOKIE_OPTIONS);

    return response;
  } catch (err) {
    console.error("[Hotel Admin Login Error]:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Authentication failed." },
      { status: 500 }
    );
  }
}

