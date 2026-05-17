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
    const flareContainerRef = useRef<HTMLDivElement>(null);

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

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!magnetic || !internalRef.current) return;
      const { clientX, clientY } = e;
      const { width, height, left, top } = internalRef.current.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      gsap.to(internalRef.current, { x: x * 0.3, y: y * 0.3, duration: 1, ease: "power3.out" });

      if (flareContainerRef.current && variant === "primary") {
        const flares = flareContainerRef.current.children;
        if (flares.length > 0 && Math.random() > 0.6) {
          const idx = Math.floor(Math.random() * flares.length);
          const flare = flares[idx] as HTMLElement;
          if (!gsap.isTweening(flare)) {
            gsap.fromTo(flare, {
              x: (clientX - left),
              y: (clientY - top),
              scale: 0,
              opacity: 1
            }, {
              x: (clientX - left) + (Math.random() - 0.5) * 80,
              y: (clientY - top) + (Math.random() - 0.5) * 80,
              scale: Math.random() * 2 + 0.5,
              opacity: 0,
              duration: 0.6 + Math.random() * 0.4,
              ease: "power2.out"
            });
          }
        }
      }
      
      if (props.onMouseMove) props.onMouseMove(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!magnetic || !internalRef.current) return;
      gsap.to(internalRef.current, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.3)" });
      if (props.onMouseLeave) props.onMouseLeave(e);
    };

    const variants = {
      primary:
        "bg-[#0e9c5c] text-white hover:bg-[#0863a8] transition-colors", // removed scale here since gsap handles transform
      secondary:
        "bg-transparent border border-primary-fixed/30 text-primary-fixed hover:bg-primary-fixed/10",
      glass:
        "glass-panel text-primary border border-white/10 hover:bg-white/5",
    };

    const sizes = {
      sm: "px-6 py-3 font-headline-md text-lg",
      md: "px-8 py-4 font-headline-md text-headline-md",
      lg: "px-12 py-5 font-headline-md text-headline-md",
    };

    return (
      <button
        ref={setRefs}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "rounded-xl font-bold transition-colors duration-300 flex items-center justify-center gap-2 relative overflow-visible z-10",
          variants[variant],
          sizes[size],
          variant === "primary" && size === "sm" ? "rounded-full" : "",
          className
        )}
        style={variant === "primary" ? { color: "#102000" } : undefined}
        {...props}
      >
        {magnetic && variant === "primary" && (
          <div ref={flareContainerRef} className="absolute inset-0 pointer-events-none z-[-1] overflow-visible">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="absolute w-2 h-2 rounded-full bg-[#0e9c5c] opacity-0"></div>
            ))}
          </div>
        )}
        <span className="relative z-10 flex items-center gap-2 pointer-events-none">{children}</span>
      </button>
    );
  }
);
Button.displayName = "Button";
