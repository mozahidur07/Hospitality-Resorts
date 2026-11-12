"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error("Global Error Caught:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 text-center dark:bg-slate-950">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400">
          <AlertTriangle className="h-8 w-8" />
        </div>
        <h2 className="mt-6 text-3xl font-extrabold text-slate-900 dark:text-slate-100">
          Something went wrong
        </h2>
        <p className="mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400">
          We experienced an unexpected hospitality service hiccup. Our engineers have been alerted.
        </p>
        <div className="mt-6">
          <Button onClick={() => reset()} variant="default">
            <RotateCcw className="mr-2 h-4 w-4" />
            Reload Page
          </Button>
        </div>
      </body>
    </html>
  );
}

