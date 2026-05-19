"use client";

import React, { useRef } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import gsap from "gsap";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "glass";
  size?: "sm" | "md" | "lg";
  magnetic?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", magnetic = false, children, ...props }, ref) => {
    const internalRef = useRef<HTMLButtonElement>(null);
    const shimmerRef = useRef<HTMLDivElement>(null);

    const setRefs = React.useCallback(
      (node: HTMLButtonElement) => {
        internalRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
        }
      },
      [ref]
    );

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
      // Shimmer sweep
      if (shimmerRef.current) {
        gsap.killTweensOf(shimmerRef.current);
        gsap.fromTo(
          shimmerRef.current,
          { x: "-130%", opacity: 1 },
          {
            x: "130%",
            opacity: 1,
            duration: 0.55,
            ease: "power2.inOut",
            onComplete: () => {
              if (shimmerRef.current) gsap.set(shimmerRef.current, { opacity: 0 });
            },
          }
        );
      }
      // Subtle scale pop
      gsap.to(internalRef.current, { scale: 1.05, duration: 0.22, ease: "power2.out" });
      if (props.onMouseEnter) props.onMouseEnter(e);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!magnetic || !internalRef.current) return;
      const { clientX, clientY } = e;
      const { width, height, left, top } = internalRef.current.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      gsap.to(internalRef.current, { x: x * 0.3, y: y * 0.3, duration: 1, ease: "power3.out" });
      if (props.onMouseMove) props.onMouseMove(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
      gsap.to(internalRef.current, { scale: 1, x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });
      if (shimmerRef.current) gsap.set(shimmerRef.current, { opacity: 0 });
      if (props.onMouseLeave) props.onMouseLeave(e);
    };

    const variants = {
      primary:
        "bg-[#0e9c5c] text-white hover:bg-[#0863a8] transition-colors duration-300",
      secondary:
        "bg-transparent border border-primary-fixed/30 text-primary-fixed hover:bg-primary-fixed/10 transition-colors duration-300",
      glass:
        "glass-panel text-primary border border-white/10 hover:bg-white/5 transition-colors duration-300",
    };

    const sizes = {
      sm: "px-7 py-3 text-base font-bold",
      md: "px-9 py-3.5 text-base font-bold",
      lg: "px-12 py-4 text-lg font-bold",
    };

    return (
      <button
        ref={setRefs}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "rounded-full flex items-center justify-center gap-2 relative overflow-hidden z-10 tracking-wide",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {/* Shimmer sweep */}
        <div
          ref={shimmerRef}
          className="absolute inset-0 pointer-events-none z-20 opacity-0"
          style={{
            background:
              "linear-gradient(105deg, transparent 25%, rgba(255,255,255,0.38) 50%, transparent 75%)",
            transform: "translateX(-130%)",
          }}
        />
        <span className="relative z-10 flex items-center gap-2 pointer-events-none">
          {children}
        </span>
      </button>
    );
  }
);
Button.displayName = "Button";
