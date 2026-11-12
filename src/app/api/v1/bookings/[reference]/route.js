import { NextResponse } from "next/server";
import { getBookingByReference } from "@/features/bookings/services/booking.service";

export async function GET(request, { params }) {
  try {
    const { reference } = params;
    if (!reference) {
      return NextResponse.json(
        { success: false, message: "Booking reference required." },
        { status: 400 }
      );
    }

    const booking = await getBookingByReference(reference);

    if (!booking) {
      return NextResponse.json(
        { success: false, message: "Booking record not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      booking,
    });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message: err.message || "Failed to retrieve booking voucher.",
      },
      { status: 500 }
    );
  }
}

