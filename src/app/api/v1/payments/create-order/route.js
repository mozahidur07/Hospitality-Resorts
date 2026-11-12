import { NextResponse } from "next/server";
import { createRazorpayOrder } from "@/lib/razorpay";
import { checkRoomAvailability } from "@/features/bookings/services/booking.service";
import { calculateNights } from "@/lib/utils";

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      hotelId,
      roomId,
      checkIn,
      checkOut,
      roomsCount = 1,
      guestEmail,
    } = body;

    if (!hotelId || !roomId || !checkIn || !checkOut) {
      return NextResponse.json(
        { success: false, message: "Missing required booking details." },
        { status: 400 }
      );
    }

    // 1. Availability Pre-Check before collecting payment
    const availability = await checkRoomAvailability({
      hotelId,
      roomId,
      checkIn,
      checkOut,
      requestedRooms: Number(roomsCount) || 1,
    });

    if (!availability.available) {
      return NextResponse.json(
        {
          success: false,
          conflict: true,
          message: `This suite is already booked for the selected dates. Remaining suites: ${availability.remainingRooms || 0}.`,
        },
        { status: 409 }
      );
    }

    const hotel = availability.hotel;
    const room = availability.room;

    // 2. Exact amount calculation
    const nights = calculateNights(checkIn, checkOut);
    const pricePerNight = Number(room.price || room.pricePerNight || hotel.startingPrice || 3500);
    const currency = hotel.currency || "INR";
    const subtotal = pricePerNight * nights * (Number(roomsCount) || 1);
    const taxesAndFees = Math.round(subtotal * 0.12);
    const conciergeFee = currency === "INR" ? 450 : 45;
    const totalAmount = subtotal + taxesAndFees + conciergeFee;

    // 3. Create Order on Razorpay
    const targetCurrency = (currency || "INR").toUpperCase();
    const order = await createRazorpayOrder({
      amount: totalAmount,
      currency: targetCurrency,
      receipt: `bk_${Date.now().toString().slice(-8)}`,
      notes: {
        hotelId: hotel.id,
        hotelName: hotel.name,
        roomId: room.id,
        checkIn,
        checkOut,
        guestEmail: guestEmail || "",
      },
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      totalAmount,
      key: process.env.RAZORPAY_KEY || process.env.NEXT_PUBLIC_RAZORPAY_KEY,
    });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message: err.message || "Failed to initialize payment gateway.",
      },
      { status: 500 }
    );
  }
}

