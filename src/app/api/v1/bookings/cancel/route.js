import { NextResponse } from "next/server";
import { cancelReservation } from "@/features/bookings/services/booking.service";

export async function POST(request) {
  try {
    const body = await request.json();
    const { bookingId, bookingReference, reason } = body;

    const result = await cancelReservation({
      bookingId,
      bookingReference,
      reason,
    });

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: result.message,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: result.message,
      booking: result.booking,
    });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message: err.message || "Failed to cancel reservation.",
      },
      { status: 500 }
    );
  }
}

