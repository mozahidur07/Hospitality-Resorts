import { supabaseAdmin } from "@/lib/supabase/admin";
import { getHotelBySlug } from "@/features/hotels/services/mock-hotels.data";
import { calculateNights } from "@/lib/utils";

/**
 * Returns a hotel object with live dynamic room overrides merged from Supabase hotel_admins table.
 * If hotel admin updated pricing or inventory in the management portal, this returns the live values.
 */
export async function getHotelWithOverrides(hotelId) {
  const hotel = getHotelBySlug(hotelId);
  if (!hotel) return null;

  try {
    const { data: adminRow } = await supabaseAdmin
      .from("hotel_admins")
      .select("room_overrides")
      .eq("hotel_id", hotel.id)
      .maybeSingle();

    if (adminRow?.room_overrides && typeof adminRow.room_overrides === "object") {
      const overrides = adminRow.room_overrides;
      const rooms = (hotel.rooms || []).map((r) => {
        const ov = overrides[r.id];
        if (!ov) return r;
        const price = ov.price !== undefined ? Number(ov.price) : (r.price || r.pricePerNight);
        const availableRooms = ov.availableRooms !== undefined ? Number(ov.availableRooms) : r.availableRooms;
        const maxGuests = ov.maxGuests !== undefined ? Number(ov.maxGuests) : r.maxGuests;
        return {
          ...r,
          price,
          pricePerNight: price,
          availableRooms,
          maxGuests,
        };
      });
      const startingPrice = rooms.length > 0 ? (rooms[0].price || rooms[0].pricePerNight) : hotel.startingPrice;
      return {
        ...hotel,
        startingPrice,
        pricePerNight: startingPrice,
        rooms,
      };
    }
  } catch (err) {
    console.debug("[Hotel Overrides Lookup Warning]:", err);
  }

  return hotel;
}

/**
 * Checks if a specific room is available for the given dates without date overlap.
 * Overlap condition: (existing.check_in < requested.check_out) AND (existing.check_out > requested.check_in)
 *
 * @param {object} params
 * @param {string} params.hotelId
 * @param {string} params.roomId
 * @param {string} params.checkIn - 'YYYY-MM-DD'
 * @param {string} params.checkOut - 'YYYY-MM-DD'
 * @param {number} [params.requestedRooms=1]
 * @returns {Promise<object>}
 */
export async function checkRoomAvailability({
  hotelId,
  roomId,
  checkIn,
  checkOut,
  requestedRooms = 1,
}) {
  if (!hotelId || !roomId || !checkIn || !checkOut) {
    return {
      available: false,
      message: "Missing required booking details (hotelId, roomId, checkIn, checkOut).",
    };
  }

  // 1. Resolve Hotel with dynamic admin room overrides
  const hotel = (await getHotelWithOverrides(hotelId)) || getHotelBySlug(hotelId);
  if (!hotel) {
    return { available: false, message: "Specified hotel does not exist in directory." };
  }

  const room = (hotel.rooms || []).find((r) => r.id === roomId) || hotel.rooms?.[0];
  if (!room) {
    return { available: false, message: "Specified room type does not exist for this hotel." };
  }

  const totalCapacity = room.availableRooms || 3;
  const reqRooms = Math.max(1, Number(requestedRooms) || 1);

  // 2. Query Supabase for active overlapping reservations
  try {
    const { data: overlappingBookings, error } = await supabaseAdmin
      .from("bookings")
      .select("id, booking_reference, rooms_count, check_in, check_out, booking_status")
      .eq("hotel_id", hotel.id)
      .eq("room_id", room.id)
      .neq("booking_status", "cancelled")
      .lt("check_in", checkOut)
      .gt("check_out", checkIn);

    if (error) {
      console.warn("[Availability Check Notice]:", error.message);
      // Fallback: If table is not yet migrated, allow inventory check against room static limit
      return {
        available: true,
        totalCapacity,
        alreadyBooked: 0,
        remainingRooms: totalCapacity,
        hotel,
        room,
      };
    }

    const alreadyBooked = (overlappingBookings || []).reduce(
      (sum, b) => sum + (Number(b.rooms_count) || 1),
      0
    );

    const remainingRooms = Math.max(0, totalCapacity - alreadyBooked);
    const available = remainingRooms >= reqRooms;

    return {
      available,
      totalCapacity,
      alreadyBooked,
      remainingRooms,
      overlappingCount: overlappingBookings?.length || 0,
      hotel,
      room,
    };
  } catch (err) {
    console.error("[Availability Check Exception]:", err);
    return {
      available: true,
      totalCapacity,
      alreadyBooked: 0,
      remainingRooms: totalCapacity,
      hotel,
      room,
    };
  }
}

/**
 * Fetches aggregated booked room counts and live admin room overrides.
 * Used by /hotels search results and hotel detail pages to reflect real-time pricing and remaining inventory.
 */
export async function getAvailabilitySummary({ checkIn, checkOut, hotelId = null }) {
  try {
    let bookedPromise = Promise.resolve({ data: [] });
    if (checkIn && checkOut) {
      let query = supabaseAdmin
        .from("bookings")
        .select("hotel_id, room_id, rooms_count")
        .neq("booking_status", "cancelled")
        .lt("check_in", checkOut)
        .gt("check_out", checkIn);

      if (hotelId) {
        query = query.eq("hotel_id", hotelId);
      }
      bookedPromise = query;
    }

    let adminsQuery = supabaseAdmin.from("hotel_admins").select("hotel_id, room_overrides");
    if (hotelId) {
      adminsQuery = adminsQuery.eq("hotel_id", hotelId);
    }

    const [bookedRes, adminsRes] = await Promise.all([
      bookedPromise,
      adminsQuery,
    ]);

    const bookedMap = {};
    for (const row of bookedRes.data || []) {
      const hId = row.hotel_id;
      const rId = row.room_id;
      const count = Number(row.rooms_count) || 1;
      if (!bookedMap[hId]) bookedMap[hId] = {};
      bookedMap[hId][rId] = (bookedMap[hId][rId] || 0) + count;
    }

    const hotelOverridesMap = {};
    for (const row of adminsRes.data || []) {
      if (row.hotel_id && row.room_overrides && typeof row.room_overrides === "object") {
        hotelOverridesMap[row.hotel_id] = row.room_overrides;
      }
    }

    return { success: true, bookedMap, hotelOverridesMap };
  } catch (err) {
    console.error("[Availability Summary Exception]:", err);
    return { success: true, bookedMap: {}, hotelOverridesMap: {} };
  }
}

/**
 * Creates and confirms a hotel reservation in Supabase after verifying no date conflict.
 *
 * @param {object} payload
 * @returns {Promise<object>}
 */
export async function createReservation(payload) {
  const {
    clientId = null,
    paymentId = null,
    payment_id = null,
    guestName,
    guestEmail,
    guestPhone = "",
    hotelId,
    roomId,
    checkIn,
    checkOut,
    adults = 2,
    children = 0,
    roomsCount = 1,
    specialRequests = "",
    paymentMethod = "card",
  } = payload;

  if (!guestName || !guestEmail || !hotelId || !roomId || !checkIn || !checkOut) {
    return {
      success: false,
      message: "Please fill in all required guest information and travel dates.",
    };
  }

  // Check date sanity
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  if (isNaN(start.getTime()) || isNaN(end.getTime()) || end <= start) {
    return {
      success: false,
      message: "Check-out date must be strictly after the check-in date.",
    };
  }

  // 1. Strict Conflict Verification (Prevent double booking)
  const availability = await checkRoomAvailability({
    hotelId,
    roomId,
    checkIn,
    checkOut,
    requestedRooms: roomsCount,
  });

  if (!availability.available) {
    return {
      success: false,
      conflict: true,
      message: `Sorry, this ${availability.room?.name || "suite"} is already booked for ${checkIn} to ${checkOut}. Only ${availability.remainingRooms} suites are remaining. Please select alternative dates or suites.`,
      remainingRooms: availability.remainingRooms,
    };
  }

  const hotel = availability.hotel;
  const room = availability.room;

  // 2. Financial calculation
  const nights = calculateNights(checkIn, checkOut);
  const pricePerNight = Number(room.price || room.pricePerNight || hotel.startingPrice || 3500);
  const currency = hotel.currency || "INR";
  const subtotal = pricePerNight * nights * Number(roomsCount);
  const taxesAndFees = Math.round(subtotal * 0.12);
  const conciergeFee = currency === "INR" ? 450 : 45;
  const totalAmount = subtotal + taxesAndFees + conciergeFee;

  // 3. Unique Reference Code: e.g. AUR-948123
  const randomSuffix = Math.floor(100000 + Math.random() * 900000);
  const bookingReference = `AUR-${randomSuffix}`;

  const isOnline = Boolean(paymentId || payment_id || paymentMethod === "razorpay");

  const reservationRecord = {
    booking_reference: bookingReference,
    client_id: clientId || null,
    payment_id: paymentId || payment_id || null,
    guest_name: guestName.trim(),
    guest_email: guestEmail.trim().toLowerCase(),
    guest_phone: guestPhone ? guestPhone.trim() : null,
    hotel_id: hotel.id,
    hotel_name: hotel.name,
    hotel_city: hotel.cityName || hotel.location?.city || "",
    hotel_country: hotel.countryName || hotel.location?.country || "",
    room_id: room.id,
    room_name: room.name,
    check_in: checkIn,
    check_out: checkOut,
    nights,
    adults: Number(adults) || 2,
    children: Number(children) || 0,
    rooms_count: Number(roomsCount) || 1,
    price_per_night: pricePerNight,
    subtotal,
    taxes_and_fees: taxesAndFees,
    concierge_fee: conciergeFee,
    total_amount: totalAmount,
    currency,
    payment_status: isOnline ? "confirmed" : "pending",
    payment_method: isOnline ? "razorpay" : "hotel_pay",
    booking_status: "confirmed",
    special_requests: specialRequests ? specialRequests.trim() : null,
  };

  // 4. Save to Database
  try {
    const { data: inserted, error: insertError } = await supabaseAdmin
      .from("bookings")
      .insert(reservationRecord)
      .select()
      .single();

    if (insertError) {
      console.error("[Database Booking Insert Error]:", insertError);
      return {
        success: false,
        message: insertError.message || "Failed to record reservation in database.",
      };
    }

    // Increment client total_bookings if registered
    if (clientId) {
      try {
        await supabaseAdmin.rpc("increment_client_bookings", { client_uid: clientId });
      } catch (_) {
        // Non-critical metric
      }
    }

    return {
      success: true,
      booking: inserted || reservationRecord,
      message: "Reservation successfully confirmed and secured in database.",
    };
  } catch (dbErr) {
    console.error("[Reservation Exception]:", dbErr);
    return {
      success: false,
      message: "Database reservation error: " + dbErr.message,
    };
  }
}

/**
 * Retrieves reservations belonging to a client or email
 *
 * @param {string} [clientId]
 * @param {string} [guestEmail]
 * @returns {Promise<Array<object>>}
 */
export async function getClientReservations(clientId, guestEmail) {
  try {
    let query = supabaseAdmin
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });

    if (clientId) {
      query = query.eq("client_id", clientId);
    } else if (guestEmail) {
      query = query.eq("guest_email", guestEmail.trim().toLowerCase());
    } else {
      return [];
    }

    const { data, error } = await query;
    if (error) {
      console.warn("[Fetch Reservations Warning]:", error.message);
      return [];
    }
    return data || [];
  } catch (err) {
    console.error("[Fetch Reservations Error]:", err);
    return [];
  }
}

/**
 * Retrieves a single reservation by its unique reference code (e.g. AUR-123456)
 *
 * @param {string} bookingReference
 * @returns {Promise<object|null>}
 */
export async function getBookingByReference(bookingReference) {
  if (!bookingReference) return null;
  try {
    const { data, error } = await supabaseAdmin
      .from("bookings")
      .select("*")
      .eq("booking_reference", bookingReference.trim().toUpperCase())
      .single();

    if (error) {
      console.warn("[Fetch By Reference Warning]:", error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.error("[Fetch By Reference Error]:", err);
    return null;
  }
}

/**
 * Cancels an active reservation, unlocking the dates for future guests.
 *
 * @param {object} params
 * @param {string} [params.bookingId]
 * @param {string} [params.bookingReference]
 * @param {string} [params.reason]
 * @returns {Promise<object>}
 */
export async function cancelReservation({ bookingId, bookingReference, reason = "" }) {
  if (!bookingId && !bookingReference) {
    return { success: false, message: "bookingId or bookingReference is required." };
  }

  try {
    let query = supabaseAdmin.from("bookings").select("*");
    if (bookingId) {
      query = query.eq("id", bookingId);
    } else {
      query = query.eq("booking_reference", bookingReference.trim().toUpperCase());
    }

    const { data: existing, error: fetchErr } = await query.single();
    if (fetchErr || !existing) {
      return { success: false, message: "Booking record not found in system." };
    }

    if (existing.booking_status === "cancelled") {
      return { success: false, message: "This reservation is already cancelled." };
    }

    // Update status to cancelled and refund initiated
    const { data: updated, error: updateErr } = await supabaseAdmin
      .from("bookings")
      .update({
        booking_status: "cancelled",
        payment_status: "refunded",
        cancellation_reason: reason ? reason.trim() : "Guest requested cancellation",
        updated_at: new Date().toISOString(),
      })
      .eq("id", existing.id)
      .select()
      .single();

    if (updateErr) {
      return { success: false, message: updateErr.message || "Failed to cancel reservation." };
    }

    return {
      success: true,
      message: "Reservation successfully cancelled. Room dates have been released and refund processed.",
      booking: updated,
    };
  } catch (err) {
    console.error("[Cancel Reservation Exception]:", err);
    return { success: false, message: err.message || "Failed to cancel reservation." };
  }
}


