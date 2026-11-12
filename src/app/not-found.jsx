import Link from "next/link";
import { Compass, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-50 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300">
        <Compass className="h-8 w-8 animate-spin-slow" />
      </div>
      <h1 className="mt-6 text-4xl font-extrabold text-slate-900 dark:text-slate-100">
        404 - Sanctuary Not Found
      </h1>
      <p className="mt-3 max-w-md text-sm text-slate-500 dark:text-slate-400">
        The destination or suite you are searching for might have been relocated or is reserved exclusively for a private event.
      </p>
      <div className="mt-8 flex items-center gap-4">
        <Link href="/">
          <Button variant="default">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Sanctuary Home
          </Button>
        </Link>
      </div>
    </div>
  );
}

