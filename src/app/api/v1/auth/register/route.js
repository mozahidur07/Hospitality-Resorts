import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { createClientSession } from "@/lib/auth/session";

export async function POST(request) {
  let createdAuthUserId = null;

  try {
    const { email, password, fullName } = await request.json();

    if (!email || !password || !fullName) {
      return NextResponse.json(
        { success: false, message: "Full Name, email, and password are required." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: "Password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    const cleanFullName = fullName.trim();

    // 1. Create User in Supabase Auth via Admin API
    const { data: createData, error: createError } =
      await supabaseAdmin.auth.admin.createUser({
        email: normalizedEmail,
        password,
        email_confirm: true,
        user_metadata: {
          full_name: cleanFullName,
        },
      });

    if (createError || !createData?.user) {
      return NextResponse.json(
        {
          success: false,
          message:
            createError?.message ||
            "Unable to register user. The email may already be in use.",
        },
        { status: 400 }
      );
    }

    const newAuthUser = createData.user;
    createdAuthUserId = newAuthUser.id;

    // 2. Create corresponding client profile in 'clients' table
    const { data: clientProfile, error: profileError } = await supabaseAdmin
      .from("clients")
      .insert({
        id: createdAuthUserId,
        full_name: cleanFullName,
        email: normalizedEmail,
        role: "client",
        status: "active",
        total_bookings: 0,
      })
      .select()
      .single();

    // 3. Rollback guarantee: If client profile creation fails, delete user from Supabase Auth
    if (profileError) {
      console.error(
        "[Rollback Alert]: Failed to create client profile in database. Rolling back Supabase Auth user:",
        profileError.message
      );

      try {
        await supabaseAdmin.auth.admin.deleteUser(createdAuthUserId);
        console.log(`[Rollback Succeeded]: Removed orphan auth user ID: ${createdAuthUserId}`);
      } catch (rollbackErr) {
        console.error("[Rollback Fatal]: Failed to delete orphan auth user:", rollbackErr.message);
      }

      return NextResponse.json(
        {
          success: false,
          message:
            "Could not complete client profile registration. Any created account was rolled back. Please try again.",
          error: profileError.message,
        },
        { status: 500 }
      );
    }

    // 4. Create device-bound session token and set cookies
    await createClientSession({
      clientId: createdAuthUserId,
      email: normalizedEmail,
      request,
    });

    return NextResponse.json({
      success: true,
      message: "Account created successfully.",
      user: {
        id: createdAuthUserId,
        email: normalizedEmail,
        fullName: cleanFullName,
        role: "client",
        phone: null,
        address: "",
        city: "",
        country: "",
      },
    });
  } catch (error) {
    console.error("[Register API Error]:", error);

    // Rollback if exception occurred after auth creation
    if (createdAuthUserId) {
      try {
        await supabaseAdmin.auth.admin.deleteUser(createdAuthUserId);
        console.log(`[Rollback Succeeded after catch]: Removed user ID: ${createdAuthUserId}`);
      } catch (err) {
        console.error("[Rollback Error in Catch]:", err.message);
      }
    }

    return NextResponse.json(
      { success: false, message: "Internal server error during account registration." },
      { status: 500 }
    );
  }
}

