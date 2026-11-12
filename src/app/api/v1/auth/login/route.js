import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { createClientSession } from "@/lib/auth/session";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    // 1. Authenticate with Supabase
    const authClient = createClient(supabaseUrl || "", anonKey || "", {
      auth: { persistSession: false },
    });

    const { data: authData, error: authError } = await authClient.auth.signInWithPassword({
      email: normalizedEmail,
      password,
    });

    if (authError || !authData?.user) {
      return NextResponse.json(
        {
          success: false,
          message: authError?.message || "Invalid email or password. Please verify your credentials.",
        },
        { status: 401 }
      );
    }

    const user = authData.user;

    // 2. Fetch or sync client profile from 'clients' table
    let clientProfile = null;
    try {
      const { data: existingClient, error: fetchError } = await supabaseAdmin
        .from("clients")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      if (!fetchError && existingClient) {
        clientProfile = existingClient;
      } else {
        // Auto-provision client profile if user exists in Auth but missing in clients table
        const fullName =
          user.user_metadata?.full_name ||
          user.user_metadata?.name ||
          normalizedEmail.split("@")[0];

        const { data: newProfile } = await supabaseAdmin
          .from("clients")
          .insert({
            id: user.id,
            email: normalizedEmail,
            full_name: fullName,
            role: "client",
            status: "active",
          })
          .select()
          .maybeSingle();

        clientProfile = newProfile;
      }
    } catch (err) {
      console.warn("[Profile Lookup Warning]:", err.message);
    }

    // 3. Create device-bound session token and set cookies
    await createClientSession({
      clientId: user.id,
      email: normalizedEmail,
      request,
    });

    return NextResponse.json({
      success: true,
      message: "Signed in successfully",
      user: {
        id: user.id,
        email: normalizedEmail,
        fullName:
          clientProfile?.full_name ||
          user.user_metadata?.full_name ||
          normalizedEmail.split("@")[0],
        role: clientProfile?.role || "client",
        avatarUrl: clientProfile?.avatar_url || null,
        phone: clientProfile?.phone || user.user_metadata?.phone || null,
        address: clientProfile?.address || "",
        city: clientProfile?.city || "",
        country: clientProfile?.country || "",
      },
    });
  } catch (error) {
    console.error("[Login API Error]:", error);
    return NextResponse.json(
      { success: false, message: "Internal authentication error occurred." },
      { status: 500 }
    );
  }
}

