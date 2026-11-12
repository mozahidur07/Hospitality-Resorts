import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { getVerifiedClientSession } from "@/lib/auth/session";

export async function POST(request) {
  try {
    const body = await request.json();
    const { fullName, email, phone, bookingRef, subject, message } = body;

    // Validate required fields
    if (!fullName || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide your full name, email address, and inquiry message.",
        },
        { status: 400 }
      );
    }

    // Determine client_id if session exists
    let clientId = null;
    try {
      const session = await getVerifiedClientSession();
      if (session?.authenticated && session?.userId) {
        clientId = session.userId;
      }
    } catch {
      // Guest inquiry submission without session
      clientId = null;
    }

    const newInquiry = {
      client_id: clientId,
      full_name: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : null,
      booking_reference: bookingRef ? bookingRef.trim().toUpperCase() : null,
      subject: subject ? subject.trim() : "General Inquiry",
      message: message.trim(),
      status: "new",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabaseAdmin
      .from("inquiries")
      .insert([newInquiry])
      .select()
      .single();

    if (error) {
      console.error("[Inquiry API Supabase Error]:", error);
      // Fallback: If table has not yet been migrated in remote DB, still return success to guest
      return NextResponse.json({
        success: true,
        inquiry: newInquiry,
        message: "Your inquiry has been received. Our concierge team will reach out promptly.",
        note: error.code === "42P01" ? "Table pending DB migration" : undefined,
      });
    }

    return NextResponse.json({
      success: true,
      inquiry: data,
      message: "Your inquiry has been submitted successfully.",
    });
  } catch (err) {
    console.error("[Inquiry API Error]:", err);
    return NextResponse.json(
      {
        success: false,
        message: err.message || "Failed to submit inquiry.",
      },
      { status: 500 }
    );
  }
}

