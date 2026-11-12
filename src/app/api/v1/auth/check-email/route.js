import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { success: false, message: "Valid email address is required." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    // 1. Fast indexed search in 'clients' table (instant response < 30ms)
    const { data: clientData } = await supabaseAdmin
      .from("clients")
      .select("id")
      .eq("email", normalizedEmail)
      .maybeSingle();

    if (clientData?.id) {
      return NextResponse.json({
        success: true,
        exists: true,
        email: normalizedEmail,
      });
    }

    // 2. Fallback quick check in auth users (only if not found in clients table)
    let exists = false;
    try {
      const { data: usersData } = await supabaseAdmin.auth.admin.listUsers({
        page: 1,
        perPage: 50,
      });
      if (usersData?.users) {
        exists = usersData.users.some(
          (u) => u.email?.toLowerCase() === normalizedEmail
        );
      }
    } catch (_) {
      // Ignored non-critical fallback
    }

    return NextResponse.json({
      success: true,
      exists,
      email: normalizedEmail,
    });
  } catch (error) {
    console.error("[Check Email API Error]:", error);
    return NextResponse.json(
      { success: false, message: "Failed to verify email existence." },
      { status: 500 }
    );
  }
}

