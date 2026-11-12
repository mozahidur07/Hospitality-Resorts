import { clientsTable } from "./tables/clients.table.js";
import { clientSessionsTable } from "./tables/client_sessions.table.js";
import { bookingsTable } from "./tables/bookings.table.js";
import pg from "pg";

const ALL_TABLES = [clientsTable, clientSessionsTable, bookingsTable];

/**
 * Executes or verifies migrations across all registered database tables
 */
export async function runMigrations() {
  const dbUrl = process.env.DATABASE_URL;

  if (!dbUrl || dbUrl.includes("[YOUR-PASSWORD]") || dbUrl.includes("[YOUR_PASSWORD]")) {
    return {
      success: false,
      mode: "manual",
      message:
        "DATABASE_URL contains [YOUR-PASSWORD] placeholder or is missing. Please add your actual database password in .env.",
      sql: getCombinedMigrationSql(),
    };
  }

  const pool = new pg.Pool({
    connectionString: dbUrl,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 5000,
  });

  try {
    const client = await pool.connect();
    try {
      // 1. Create migration tracker table if it doesn't exist
      await client.query(`
        CREATE TABLE IF NOT EXISTS public._schema_migrations (
          table_name TEXT PRIMARY KEY,
          version INT NOT NULL,
          updated_at TIMESTAMPTZ DEFAULT NOW()
        );
      `);

      // 2. Iterate each table
      for (const table of ALL_TABLES) {
        const { rows } = await client.query(
          `SELECT version FROM public._schema_migrations WHERE table_name = $1`,
          [table.tableName]
        );

        const currentVersion = rows[0]?.version || 0;

        // If table never created, run initial up SQL
        if (currentVersion === 0) {
          console.log(`[Migrator] Creating initial table: ${table.tableName} (v${table.version})`);
          await client.query(table.getUpSql());
          await client.query(
            `INSERT INTO public._schema_migrations (table_name, version) VALUES ($1, $2)
             ON CONFLICT (table_name) DO UPDATE SET version = $2, updated_at = NOW()`,
            [table.tableName, table.version]
          );
        } else if (currentVersion < table.version) {
          // Run pending incremental migrations
          console.log(`[Migrator] Upgrading ${table.tableName} from v${currentVersion} to v${table.version}`);
          for (const m of table.migrations) {
            if (m.version > currentVersion && m.version <= table.version) {
              await client.query(m.sql);
            }
          }
          await client.query(
            `UPDATE public._schema_migrations SET version = $1, updated_at = NOW() WHERE table_name = $2`,
            [table.version, table.tableName]
          );
        }
      }

      return {
        success: true,
        mode: "automatic",
        message: "All database tables are up to date and verified.",
      };
    } finally {
      client.release();
    }
  } catch (error) {
    const isDnsError = error.code === "ENOTFOUND" || error.message?.includes("ENOTFOUND");
    const hint = isDnsError
      ? " (Tip: 'db.[ref].supabase.co' is IPv6-only. If your ISP lacks IPv6, use Supabase Connection Pooler URI 'aws-0-[region].pooler.supabase.com:6543' or run SQL directly in Supabase SQL Editor.)"
      : "";

    return {
      success: false,
      mode: "error",
      message: `${error.message}${hint}`,
      sql: getCombinedMigrationSql(),
    };
  } finally {
    await pool.end().catch(() => {});
  }
}

/**
 * Returns combined SQL for all tables & security policies
 */
export function getCombinedMigrationSql() {
  return ALL_TABLES.map((t) => t.getUpSql()).join("\n\n");
}
