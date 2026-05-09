"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface AnimatedTextProps {
  text: string;
  className?: string;
  el?: React.ElementType;
  delay?: number;
}

export const AnimatedText = ({
  text,
  className,
  el: Element = "div",
  delay = 0,
}: AnimatedTextProps) => {
  const containerRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useGSAP(
    () => {
      // Split text animation without premium SplitText plugin.
      // This maps over words and animates them up.
      if (wordsRef.current.length > 0) {
        gsap.from(wordsRef.current, {
          y: "120%",
          opacity: 0,
          rotateZ: 5,
          duration: 0.8,
          ease: "power4.out",
          stagger: 0.05,
          delay: delay,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
          },
        });
      }
    },
    { scope: containerRef }
  );

  const words = text.split(" ");

  return (
    <Element ref={containerRef as any} className={cn("overflow-hidden flex flex-wrap gap-[0.25em]", className)}>
      {words.map((word, i) => (
        <span
          key={i}
          ref={(el) => {
            wordsRef.current[i] = el;
          }}
          className="inline-block"
          style={{ transformOrigin: "bottom left" }}
        >
          {word}
        </span>
      ))}
    </Element>
  );
};
