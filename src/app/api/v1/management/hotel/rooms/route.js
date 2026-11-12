import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import {
  getVerifiedHotelAdminSession,
  hashManagementPassword,
} from "@/lib/auth/management-session";

export async function PATCH(request) {
  try {
    const session = await getVerifiedHotelAdminSession();
    if (!session.authenticated) {
      return NextResponse.json(
        { success: false, message: "Unauthorized." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { action, roomId, price, availableRooms, maxGuests, newPassword } = body;

    if (action === "change_password") {
      if (!newPassword || String(newPassword).length < 6) {
        return NextResponse.json(
          { success: false, message: "New password must be at least 6 characters." },
          { status: 400 }
        );
      }

      const { error } = await supabaseAdmin
        .from("hotel_admins")
        .upsert(
          {
            hotel_id: session.hotelId,
            hotel_name: session.hotelName,
            password_hash: hashManagementPassword(newPassword),
            updated_at: new Date().toISOString(),
          },
          { onConflict: "hotel_id" }
        );

      if (error) {
        return NextResponse.json(
          { success: false, message: error.message || "Failed to update password." },
          { status: 400 }
        );
      }

      return NextResponse.json({
        success: true,
        message: "Administrative password updated successfully.",
      });
    }

    // Update room overrides
    if (!roomId) {
      return NextResponse.json(
        { success: false, message: "Room ID is required." },
        { status: 400 }
      );
    }

    let currentOverrides = {};
    const { data: existing } = await supabaseAdmin
      .from("hotel_admins")
      .select("room_overrides")
      .eq("hotel_id", session.hotelId)
      .maybeSingle();

    if (existing?.room_overrides && typeof existing.room_overrides === "object") {
      currentOverrides = { ...existing.room_overrides };
    }

    currentOverrides[roomId] = {
      ...(currentOverrides[roomId] || {}),
      ...(price !== undefined ? { price: Math.max(100, Number(price) || 750) } : {}),
      ...(availableRooms !== undefined ? { availableRooms: Math.max(0, Number(availableRooms) || 0) } : {}),
      ...(maxGuests !== undefined ? { maxGuests: Math.max(1, Number(maxGuests) || 2) } : {}),
    };

    const { error } = await supabaseAdmin
      .from("hotel_admins")
      .upsert(
        {
          hotel_id: session.hotelId,
          hotel_name: session.hotelName,
          password_hash: hashManagementPassword(process.env.DEFAULT_HOTEL_ADMIN_PASSWORD || "AuraHotel@2026"),
          room_overrides: currentOverrides,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "hotel_id" }
      );

    if (error) {
      return NextResponse.json(
        { success: false, message: error.message || "Failed to save room configuration." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      roomOverrides: currentOverrides,
      message: "Room rate and inventory updated successfully.",
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message || "Room update failed." },
      { status: 500 }
    );
  }
}

