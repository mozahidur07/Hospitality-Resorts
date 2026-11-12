import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { getVerifiedHotelAdminSession } from "@/lib/auth/management-session";

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
    const { bookingReference, bookingStatus, paymentStatus, cancellationReason } = body;

    if (!bookingReference) {
      return NextResponse.json(
        { success: false, message: "Booking reference is required." },
        { status: 400 }
      );
    }

    const updates = {
      updated_at: new Date().toISOString(),
    };

    if (bookingStatus && ["confirmed", "completed", "cancelled"].includes(bookingStatus)) {
      updates.booking_status = bookingStatus;
    }

    if (paymentStatus && ["pending", "confirmed", "cancelled", "refunded"].includes(paymentStatus)) {
      updates.payment_status = paymentStatus;
    }

    if (cancellationReason !== undefined) {
      updates.cancellation_reason = cancellationReason ? String(cancellationReason).trim() : null;
    }

    const { data, error } = await supabaseAdmin
      .from("bookings")
      .update(updates)
      .eq("booking_reference", bookingReference)
      .eq("hotel_id", session.hotelId)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { success: false, message: error.message || "Failed to update booking." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      booking: data,
      message: `Reservation ${bookingReference} updated successfully.`,
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message || "Update error." },
      { status: 500 }
    );
  }
}

