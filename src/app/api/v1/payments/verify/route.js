import { NextResponse } from "next/server";
import { verifyRazorpaySignature } from "@/lib/razorpay";
import { createReservation } from "@/features/bookings/services/booking.service";

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      bookingPayload,
    } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        {
          success: false,
          message: "Payment credentials (order_id, payment_id, signature) are required.",
        },
        { status: 400 }
      );
    }

    // 1. Verify Razorpay cryptographic signature
    const isAuthentic = verifyRazorpaySignature({
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      signature: razorpay_signature,
    });

    if (!isAuthentic) {
      return NextResponse.json(
        {
          success: false,
          message: "Payment authenticity check failed. Signature mismatch.",
        },
        { status: 400 }
      );
    }

    // 2. Lock Reservation in Database
    const reservationData = {
      ...bookingPayload,
      paymentMethod: "razorpay",
      paymentId: razorpay_payment_id,
      payment_id: razorpay_payment_id,
      specialRequests: bookingPayload.specialRequests ? bookingPayload.specialRequests.trim() : null,
    };

    const result = await createReservation(reservationData);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          conflict: Boolean(result.conflict),
          message: result.message,
        },
        { status: result.conflict ? 409 : 400 }
      );
    }

    return NextResponse.json({
      success: true,
      booking: result.booking,
      paymentId: razorpay_payment_id,
      message: "Payment verified successfully. Reservation confirmed!",
    });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message: err.message || "Failed to process and verify payment.",
      },
      { status: 500 }
    );
  }
}

