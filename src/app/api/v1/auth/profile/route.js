import { NextResponse } from "next/server";
import { getVerifiedClientSession } from "@/lib/auth/session";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function PATCH(request) {
  try {
    const session = await getVerifiedClientSession();
    if (!session.authenticated || !session.user?.id) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Please sign in." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { fullName, phone, address, city, country } = body;

    const updateData = {
      updated_at: new Date().toISOString(),
    };

    if (fullName !== undefined) updateData.full_name = fullName.trim();
    if (phone !== undefined) updateData.phone = phone.trim();
    if (address !== undefined) updateData.address = address.trim();
    if (city !== undefined) updateData.city = city.trim();
    if (country !== undefined) updateData.country = country.trim();

    const { data: updatedClient, error } = await supabaseAdmin
      .from("clients")
      .update(updateData)
      .eq("id", session.user.id)
      .select("*")
      .single();

    if (error) {
      console.error("[Profile Update Error]:", error);
      return NextResponse.json(
        { success: false, message: "Failed to update profile." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully.",
      user: {
        id: updatedClient.id,
        email: updatedClient.email,
        fullName: updatedClient.full_name,
        phone: updatedClient.phone,
        address: updatedClient.address,
        city: updatedClient.city,
        country: updatedClient.country,
        role: updatedClient.role || "client",
        avatarUrl: updatedClient.avatar_url || null,
      },
    });
  } catch (err) {
    console.error("[Profile API Error]:", err);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}

