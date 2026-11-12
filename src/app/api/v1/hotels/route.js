import { NextResponse } from "next/server";
import { MOCK_HOTELS } from "@/features/hotels/services/mock-hotels.data";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const search = searchParams.get("query")?.toLowerCase();

  let hotels = [...MOCK_HOTELS];

  if (category && category !== "all") {
    hotels = hotels.filter((h) => h.category === category);
  }

  if (search) {
    hotels = hotels.filter(
      (h) =>
        h.name.toLowerCase().includes(search) ||
        h.location.city.toLowerCase().includes(search) ||
        h.location.country.toLowerCase().includes(search)
    );
  }

  return NextResponse.json({
    success: true,
    data: hotels,
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalItems: hotels.length,
      hasNextPage: false,
    },
  });
}

