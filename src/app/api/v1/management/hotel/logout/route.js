import { NextResponse } from "next/server";
import { clearHotelAdminSession, COOKIE_HOTEL_ADMIN_TOKEN } from "@/lib/auth/management-session";

export async function POST() {
  clearHotelAdminSession();
  const response = NextResponse.json({ success: true, message: "Logged out from Hotel Portal." });
  response.cookies.set(COOKIE_HOTEL_ADMIN_TOKEN, "", { path: "/", maxAge: 0 });
  return response;
}

