import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-[#08063F] via-[#031256] to-[#061F5F] text-white shadow-md hover:from-[#061F5F] hover:via-[#031256] hover:to-[#08063F] active:scale-[0.98]",
        primary:
          "bg-gradient-to-r from-[#031256] to-[#061F5F] text-white shadow-md hover:from-[#061F5F] hover:to-[#031256] active:scale-[0.98]",
        luxury:
          "bg-gradient-to-r from-[#08063F] via-[#031256] to-[#061F5F] text-white shadow-lg shadow-[#08063F]/25 hover:from-[#061F5F] hover:via-[#031256] hover:to-[#08063F] active:scale-[0.98] border border-[#061F5F]/40",
        outline:
          "border border-[#061F5F] bg-white hover:bg-[#061F5F]/10 text-[#031256] dark:border-[#061F5F] dark:bg-slate-900/80 dark:hover:bg-[#061F5F]/20 dark:text-slate-100",
        ghost:
          "hover:bg-slate-100 text-slate-700 dark:hover:bg-slate-800 dark:text-slate-300",
        link:
          "text-[#061F5F] underline-offset-4 hover:underline dark:text-[#061F5F]",
      },
      size: {
        default: "h-11 px-5 py-2.5",
        sm: "h-9 rounded-md px-3.5 text-xs",
        lg: "h-12 md:h-14 rounded-xl px-8 py-3.5 text-base font-semibold",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
