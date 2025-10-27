import { forwardRef, HTMLAttributes } from "react";
import { cn } from "@/src/lib/utils";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  gradient?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = false, gradient = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-[--radius-xl] border border-[--border] bg-[--card] p-6 shadow-[--shadow-card] transition-all duration-300",
          hover &&
            "hover:shadow-[--shadow-lg] hover:-translate-y-1 cursor-pointer",
          gradient && "bg-linear-to-br from-[--color-brand-50] to-white",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export default Card;
