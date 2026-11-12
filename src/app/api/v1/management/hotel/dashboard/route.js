import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { getHotelBySlug } from "@/features/hotels/services/mock-hotels.data";
import { getVerifiedHotelAdminSession } from "@/lib/auth/management-session";

export async function GET() {
  try {
    const session = await getVerifiedHotelAdminSession();
    if (!session.authenticated) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Please log in as Hotel Admin." },
        { status: 401 }
      );
    }

    const hotel = getHotelBySlug(session.hotelId);
    if (!hotel) {
      return NextResponse.json(
        { success: false, message: "Hotel property not found." },
        { status: 404 }
      );
    }

    // 1. Fetch all bookings for this specific hotel
    const { data: bookingsData, error: bookingsError } = await supabaseAdmin
      .from("bookings")
      .select("*")
      .eq("hotel_id", hotel.id)
      .order("created_at", { ascending: false });

    const bookings = bookingsError ? [] : bookingsData || [];

    // 2. Fetch hotel_admins record for room_overrides
    let roomOverrides = {};
    try {
      const { data: adminRow } = await supabaseAdmin
        .from("hotel_admins")
        .select("room_overrides, last_login_at")
        .eq("hotel_id", hotel.id)
        .maybeSingle();

      if (adminRow?.room_overrides && typeof adminRow.room_overrides === "object") {
        roomOverrides = adminRow.room_overrides;
      }
    } catch {}

    // 3. Merge room overrides and compute live active bookings per room
    const todayStr = new Date().toISOString().split("T")[0];
    const activeTodayByRoom = {};

    for (const b of bookings) {
      if (b.booking_status !== "cancelled" && b.check_in <= todayStr && b.check_out > todayStr) {
        activeTodayByRoom[b.room_id] = (activeTodayByRoom[b.room_id] || 0) + (Number(b.rooms_count) || 1);
      }
    }

    const rooms = (hotel.rooms || []).map((r) => {
      const ov = roomOverrides[r.id] || {};
      const totalRooms = ov.availableRooms !== undefined ? Number(ov.availableRooms) : (r.availableRooms || 4);
      const price = ov.price !== undefined ? Number(ov.price) : (r.price || r.pricePerNight);
      const maxGuests = ov.maxGuests !== undefined ? Number(ov.maxGuests) : (r.maxGuests || 2);
      const occupiedToday = activeTodayByRoom[r.id] || 0;

      return {
        ...r,
        price,
        pricePerNight: price,
        availableRooms: totalRooms,
        maxGuests,
        occupiedToday,
        remainingToday: Math.max(0, totalRooms - occupiedToday),
      };
    });

    // 4. Compute KPIs
    let totalRevenue = 0;
    let onlineRevenue = 0;
    let deskRevenue = 0;
    let todayCheckIns = 0;
    let todayCheckOuts = 0;
    let activeBookingsCount = 0;
    let cancelledCount = 0;

    for (const b of bookings) {
      if (b.booking_status === "cancelled") {
        cancelledCount += 1;
        continue;
      }
      activeBookingsCount += 1;
      const amt = Number(b.total_amount) || 0;
      totalRevenue += amt;
      if (b.payment_method === "hotel_pay") {
        deskRevenue += amt;
      } else {
        onlineRevenue += amt;
      }

      if (b.check_in === todayStr) todayCheckIns += 1;
      if (b.check_out === todayStr) todayCheckOuts += 1;
    }

    const totalInventory = rooms.reduce((sum, r) => sum + r.availableRooms, 0);
    const totalOccupied = rooms.reduce((sum, r) => sum + r.occupiedToday, 0);
    const occupancyRate = totalInventory > 0 ? Math.min(100, Math.round((totalOccupied / totalInventory) * 100)) : 0;

    return NextResponse.json({
      success: true,
      hotel: {
        id: hotel.id,
        name: hotel.name,
        cityName: hotel.cityName,
        stateName: hotel.stateName,
        countryName: hotel.countryName,
        currency: hotel.currency || "INR",
        stars: hotel.stars,
        rating: hotel.rating,
        featuredImage: hotel.featuredImage,
      },
      kpis: {
        totalBookings: bookings.length,
        activeBookingsCount,
        cancelledCount,
        todayCheckIns,
        todayCheckOuts,
        totalRevenue,
        onlineRevenue,
        deskRevenue,
        occupancyRate,
        totalInventory,
        totalOccupied,
      },
      rooms,
      bookings,
    });
  } catch (err) {
    console.error("[Hotel Dashboard API Error]:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to load hotel dashboard." },
      { status: 500 }
    );
  }
}

