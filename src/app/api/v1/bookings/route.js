import { NextResponse } from "next/server";
import {
  createReservation,
  getClientReservations,
} from "@/features/bookings/services/booking.service";

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const body = await request.json();
    const result = await createReservation(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          conflict: Boolean(result.conflict),
          message: result.message,
          remainingRooms: result.remainingRooms,
        },
        { status: result.conflict ? 409 : 400 }
      );
    }

    return NextResponse.json({
      success: true,
      booking: result.booking,
      message: result.message,
    });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message: err.message || "Failed to process hotel reservation.",
      },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const clientId = searchParams.get("clientId");
    const guestEmail = searchParams.get("email");

    const bookings = await getClientReservations(clientId, guestEmail);

    return NextResponse.json({
      success: true,
      bookings,
      count: bookings.length,
    });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        bookings: [],
        message: err.message || "Failed to load reservations.",
      },
      { status: 500 }
    );
  }
}

