import { forwardRef, ButtonHTMLAttributes } from "react";
import { cn } from "@/src/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

    const variants = {
      primary:
        "bg-[--color-primary] text-white hover:bg-[--color-primary-hover] focus-visible:ring-[--color-primary] shadow-sm",
      secondary:
        "bg-[--color-lavender-300] text-[--color-gray-900] hover:bg-[--color-lavender-500] focus-visible:ring-[--color-lavender-500]",
      outline:
        "border-2 border-[--color-primary] text-[--color-primary] hover:bg-[--color-primary-light] focus-visible:ring-[--color-primary]",
      ghost:
        "text-[--color-gray-700] hover:bg-[--color-gray-100] hover:text-[--color-gray-900] focus-visible:ring-[--color-gray-400]",
      danger:
        "bg-[--color-error] text-white hover:bg-[--color-red-700] focus-visible:ring-[--color-error] shadow-sm",
    };

    const sizes = {
      sm: "h-9 px-4 text-sm rounded-[--radius-md]",
      md: "h-11 px-6 text-base rounded-[--radius-lg]",
      lg: "h-14 px-8 text-lg rounded-[--radius-xl]",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg
            className="mr-2 h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
