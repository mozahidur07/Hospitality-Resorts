import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import {
  getVerifiedSuperAdminSession,
  hashManagementPassword,
} from "@/lib/auth/management-session";

export async function PATCH(request) {
  try {
    const session = await getVerifiedSuperAdminSession();
    if (!session.authenticated) {
      return NextResponse.json(
        { success: false, message: "Unauthorized." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { action } = body;

    if (action === "update_booking") {
      const { bookingReference, bookingStatus, paymentStatus } = body;
      const updates = { updated_at: new Date().toISOString() };
      if (bookingStatus) updates.booking_status = bookingStatus;
      if (paymentStatus) updates.payment_status = paymentStatus;

      const { data, error } = await supabaseAdmin
        .from("bookings")
        .update(updates)
        .eq("booking_reference", bookingReference)
        .select()
        .single();

      if (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 400 });
      }
      return NextResponse.json({ success: true, booking: data, message: "Booking updated." });
    }

    if (action === "update_inquiry") {
      const { inquiryId, status } = body;
      const { data, error } = await supabaseAdmin
        .from("inquiries")
        .update({ status, updated_at: new Date().toISOString() })
        .eq("id", inquiryId)
        .select()
        .single();

      if (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 400 });
      }
      return NextResponse.json({ success: true, inquiry: data, message: "Inquiry status updated." });
    }

    if (action === "update_client") {
      const { clientId, status } = body;
      const { data, error } = await supabaseAdmin
        .from("clients")
        .update({ status, updated_at: new Date().toISOString() })
        .eq("id", clientId)
        .select()
        .single();

      if (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 400 });
      }
      return NextResponse.json({ success: true, client: data, message: "Client account updated." });
    }

    if (action === "set_hotel_password") {
      const { hotelId, hotelName, newPassword, status = "active" } = body;
      if (!hotelId || !newPassword || String(newPassword).length < 6) {
        return NextResponse.json(
          { success: false, message: "Valid hotel ID and password (min 6 chars) required." },
          { status: 400 }
        );
      }

      const { error } = await supabaseAdmin.from("hotel_admins").upsert(
        {
          hotel_id: hotelId,
          hotel_name: hotelName || hotelId,
          password_hash: hashManagementPassword(newPassword),
          status,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "hotel_id" }
      );

      if (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 400 });
      }
      return NextResponse.json({
        success: true,
        message: `Administrative password set for ${hotelName || hotelId}.`,
      });
    }

    return NextResponse.json({ success: false, message: "Unknown action." }, { status: 400 });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message || "Action failed." },
      { status: 500 }
    );
  }
}

