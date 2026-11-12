import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300",
        luxury:
          "border-amber-300 bg-amber-50 text-amber-900 shadow-sm dark:border-amber-700/60 dark:bg-amber-950/40 dark:text-amber-300",
        secondary:
          "border-transparent bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300",
        destructive:
          "border-transparent bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300",
        outline:
          "border-slate-300 text-slate-700 dark:border-slate-700 dark:text-slate-300",
        featured:
          "border-teal-500/30 bg-teal-500/10 text-teal-700 font-medium backdrop-blur-md",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };

