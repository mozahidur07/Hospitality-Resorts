export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    try {
      const { runMigrations } = await import("@/database/migrator.js");
      const result = await runMigrations();
      if (result.success) {
        console.log(`[Database Auto-Migrator] ✅ ${result.message}`);
      } else if (result.mode === "manual") {
        console.log(`[Database Auto-Migrator] ℹ️ ${result.message}`);
      } else {
        console.warn(`[Database Auto-Migrator] ⚠️ ${result.message}`);
      }
    } catch (err) {
      console.warn("[Database Auto-Migrator Error]:", err.message);
    }
  }
}

