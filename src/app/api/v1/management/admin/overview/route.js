import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { getVerifiedSuperAdminSession } from "@/lib/auth/management-session";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getVerifiedSuperAdminSession();
    if (!session.authenticated) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Super Admin access required." },
        { status: 401 }
      );
    }

    // Parallel fetch across bookings, clients, inquiries, and hotel_admins
    const [bookingsRes, clientsRes, inquiriesRes, hotelAdminsRes] = await Promise.all([
      supabaseAdmin.from("bookings").select("*").order("created_at", { ascending: false }),
      supabaseAdmin.from("clients").select("*").order("created_at", { ascending: false }),
      supabaseAdmin.from("inquiries").select("*").order("created_at", { ascending: false }),
      supabaseAdmin.from("hotel_admins").select("id, hotel_id, hotel_name, status, last_login_at, updated_at"),
    ]);

    const bookings = bookingsRes.error ? [] : bookingsRes.data || [];
    const clients = clientsRes.error ? [] : clientsRes.data || [];
    const inquiries = inquiriesRes.error ? [] : inquiriesRes.data || [];
    const hotelAdmins = hotelAdminsRes.error ? [] : hotelAdminsRes.data || [];

    // Compute Global KPIs & Hotel Performance Map
    const revenueByCurrency = {};
    const hotelStatsMap = {};
    let activeBookings = 0;
    let cancelledBookings = 0;

    for (const b of bookings) {
      const curr = (b.currency || "INR").toUpperCase();
      const amt = Number(b.total_amount) || 0;

      if (!hotelStatsMap[b.hotel_id]) {
        hotelStatsMap[b.hotel_id] = {
          hotelId: b.hotel_id,
          hotelName: b.hotel_name,
          city: b.hotel_city,
          country: b.hotel_country,
          currency: curr,
          totalBookings: 0,
          activeBookings: 0,
          cancelledBookings: 0,
          revenue: 0,
        };
      }

      hotelStatsMap[b.hotel_id].totalBookings += 1;

      if (b.booking_status === "cancelled") {
        cancelledBookings += 1;
        hotelStatsMap[b.hotel_id].cancelledBookings += 1;
      } else {
        activeBookings += 1;
        hotelStatsMap[b.hotel_id].activeBookings += 1;
        hotelStatsMap[b.hotel_id].revenue += amt;
        revenueByCurrency[curr] = (revenueByCurrency[curr] || 0) + amt;
      }
    }

    const topHotels = Object.values(hotelStatsMap)
      .sort((a, b) => b.totalBookings - a.totalBookings || b.revenue - a.revenue)
      .slice(0, 15);

    const openInquiries = inquiries.filter((i) => i.status === "new" || i.status === "in_progress").length;

    return NextResponse.json({
      success: true,
      adminEmail: session.email,
      kpis: {
        totalBookings: bookings.length,
        activeBookings,
        cancelledBookings,
        totalClients: clients.length,
        totalInquiries: inquiries.length,
        openInquiries,
        uniqueHotelsBooked: Object.keys(hotelStatsMap).length,
        revenueByCurrency,
      },
      topHotels,
      bookings,
      clients,
      inquiries,
      hotelAdmins,
    });
  } catch (err) {
    console.error("[Super Admin Overview Error]:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to load global overview." },
      { status: 500 }
    );
  }
}

