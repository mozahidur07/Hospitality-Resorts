import { NextResponse } from "next/server";
import { checkRoomAvailability } from "@/features/bookings/services/booking.service";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const hotelId = searchParams.get("hotelId");
    const roomId = searchParams.get("roomId");
    const checkIn = searchParams.get("checkIn");
    const checkOut = searchParams.get("checkOut");
    const rooms = Number(searchParams.get("rooms") || 1);

    if (!hotelId || !roomId || !checkIn || !checkOut) {
      return NextResponse.json(
        {
          success: false,
          available: false,
          message: "hotelId, roomId, checkIn, and checkOut are required parameters.",
        },
        { status: 400 }
      );
    }

    const result = await checkRoomAvailability({
      hotelId,
      roomId,
      checkIn,
      checkOut,
      requestedRooms: rooms,
    });

    return NextResponse.json({
      success: true,
      available: result.available,
      totalCapacity: result.totalCapacity,
      alreadyBooked: result.alreadyBooked,
      remainingRooms: result.remainingRooms,
      overlappingCount: result.overlappingCount || 0,
      hotelName: result.hotel?.name,
      roomName: result.room?.name,
    });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        available: false,
        message: err.message || "Failed to check room availability.",
      },
      { status: 500 }
    );
  }
}

