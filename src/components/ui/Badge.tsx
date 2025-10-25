import { cn } from "@/src/lib/utils";
import { forwardRef, HTMLAttributes } from "react";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary" | "success" | "warning" | "error" | "info";
  size?: "sm" | "md" | "lg";
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    { className, variant = "primary", size = "md", children, ...props },
    ref
  ) => {
    const variants = {
      primary:
        "bg-[--color-brand-100] text-[--color-brand-700] border-[--color-brand-200]",
      secondary:
        "bg-[--color-lavender-100] text-[--color-gray-700] border-[--color-lavender-300]",
      success: "bg-green-50 text-green-700 border-green-200",
      warning: "bg-[--color-amber-50] text-amber-700 border-amber-200",
      error:
        "bg-[--color-red-50] text-[--color-red-700] border-[--color-red-200]",
      info: "bg-[--color-blue-50] text-[--color-blue-700] border-[--color-blue-200]",
    };

    const sizes = {
      sm: "px-2 py-0.5 text-xs",
      md: "px-3 py-1 text-sm",
      lg: "px-4 py-1.5 text-base",
    };

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center font-medium rounded-full border",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export default Badge;
