import { NextResponse } from "next/server";
import { getAvailabilitySummary } from "@/features/bookings/services/booking.service";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const checkIn = searchParams.get("checkIn") || "";
    const checkOut = searchParams.get("checkOut") || "";
    const hotelId = searchParams.get("hotelId") || null;

    const result = await getAvailabilitySummary({ checkIn, checkOut, hotelId });
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(
      { success: false, bookedMap: {}, message: err.message || "Failed to load availability summary." },
      { status: 500 }
    );
  }
}

