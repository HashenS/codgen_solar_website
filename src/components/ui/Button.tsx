import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "glass";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const variants = {
      primary:
        "bg-[#A3FF12] text-[#102000] hover:shadow-[0_0_20px_rgba(163,255,18,0.4)] hover:scale-105 active:scale-95",
      secondary:
        "bg-transparent border border-primary-fixed/30 text-primary-fixed hover:bg-primary-fixed/10",
      glass:
        "glass-panel text-primary border border-white/10 hover:bg-white/5",
    };

    const sizes = {
      sm: "px-6 py-2 font-label-caps text-label-caps",
      md: "px-8 py-4 font-headline-md text-headline-md",
      lg: "px-12 py-5 font-headline-md text-headline-md",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2",
          variants[variant],
          sizes[size],
          variant === "primary" && size === "sm" ? "rounded-full" : "",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
