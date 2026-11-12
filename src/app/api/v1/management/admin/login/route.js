import { NextResponse } from "next/server";
import {
  SUPER_ADMIN_EMAIL,
  SUPER_ADMIN_PASSWORD,
  createSuperAdminSession,
  COOKIE_SUPER_ADMIN_TOKEN,
  SUPER_ADMIN_COOKIE_OPTIONS,
} from "@/lib/auth/management-session";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Administrator email and master password are required." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    if (
      normalizedEmail !== SUPER_ADMIN_EMAIL.toLowerCase() ||
      password !== SUPER_ADMIN_PASSWORD
    ) {
      return NextResponse.json(
        { success: false, message: "Invalid Super Admin credentials." },
        { status: 401 }
      );
    }

    const token = await createSuperAdminSession({ email: normalizedEmail });

    const response = NextResponse.json({
      success: true,
      email: normalizedEmail,
      message: "Super Admin session established.",
    });

    response.cookies.set(COOKIE_SUPER_ADMIN_TOKEN, token, SUPER_ADMIN_COOKIE_OPTIONS);

    return response;
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message || "Authentication failed." },
      { status: 500 }
    );
  }
}

