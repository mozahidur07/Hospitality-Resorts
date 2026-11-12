import { NextResponse } from "next/server";
import { clearSuperAdminSession, COOKIE_SUPER_ADMIN_TOKEN } from "@/lib/auth/management-session";

export async function POST() {
  clearSuperAdminSession();
  const response = NextResponse.json({ success: true, message: "Logged out from Super Admin Portal." });
  response.cookies.set(COOKIE_SUPER_ADMIN_TOKEN, "", { path: "/", maxAge: 0 });
  return response;
}

