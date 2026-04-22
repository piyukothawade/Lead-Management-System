import * as React from "react";
import { cva } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all outline-none disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--primary)] text-white hover:bg-[var(--accent)]",

        outline:
          "border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--light)]",

        secondary:
          "bg-[var(--light)] text-[var(--primary)] hover:bg-[var(--accent)] hover:text-white",

        ghost:
          "text-[var(--primary)] hover:bg-[var(--light)]",

        destructive:
          "bg-red-500 text-white hover:bg-red-600",

        link:
          "text-[var(--primary)] underline-offset-4 hover:underline",
      },

      size: {
        default: "h-9 px-4",
        sm: "h-8 px-3 text-sm",
        lg: "h-10 px-5 text-base",
        icon: "h-9 w-9",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };