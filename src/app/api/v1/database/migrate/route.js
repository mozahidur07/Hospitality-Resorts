import { NextResponse } from "next/server";
import { runMigrations, getCombinedMigrationSql } from "@/database/migrator";

export const dynamic = "force-dynamic";

export async function GET() {
  const sql = getCombinedMigrationSql();
  return NextResponse.json({
    success: true,
    hasDatabaseUrl: Boolean(process.env.DATABASE_URL),
    sql,
  });
}

export async function POST() {
  const result = await runMigrations();
  return NextResponse.json(result);
}

