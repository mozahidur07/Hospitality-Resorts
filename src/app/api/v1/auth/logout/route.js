import { NextResponse } from "next/server";
import { clearAuthCookies } from "@/lib/auth/session";

export async function POST() {
  try {
    clearAuthCookies();
    return NextResponse.json({
      success: true,
      message: "Signed out successfully",
    });
  } catch (error) {
    console.error("[Logout API Error]:", error);
    return NextResponse.json(
      { success: false, message: "Error during sign out." },
      { status: 500 }
    );
  }
}

