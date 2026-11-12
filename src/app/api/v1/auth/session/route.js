import { NextResponse } from "next/server";
import { getVerifiedClientSession } from "@/lib/auth/session";

export async function GET() {
  try {
    const session = await getVerifiedClientSession();

    if (!session.authenticated) {
      return NextResponse.json({
        success: true,
        authenticated: false,
        user: null,
      });
    }

    return NextResponse.json({
      success: true,
      authenticated: true,
      user: {
        id: session.user.id,
        email: session.user.email,
        fullName: session.user.full_name || session.user.email?.split("@")[0] || "Guest",
        role: session.user.role || "client",
        avatarUrl: session.user.avatar_url || null,
        phone: session.user.phone || null,
        address: session.user.address || "",
        city: session.user.city || "",
        country: session.user.country || "",
      },
    });
  } catch (error) {
    console.error("[Session Check API Error]:", error);
    return NextResponse.json({
      success: false,
      authenticated: false,
      user: null,
    });
  }
}

