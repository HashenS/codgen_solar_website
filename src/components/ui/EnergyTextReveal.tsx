"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { twMerge } from "tailwind-merge";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface EnergyTextRevealProps {
  text: string;
  className?: string;
}

export const EnergyTextReveal = ({ text, className }: EnergyTextRevealProps) => {
  const containerRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    
    const chars = containerRef.current.querySelectorAll(".energy-char");
    
    gsap.fromTo(chars, 
      {
        color: "#333333", // Dim gray
        textShadow: "0px 0px 0px rgba(163,255,18,0)",
      },
      {
        color: "#A3FF12", // Bright neon green
        textShadow: "0px 0px 20px rgba(163,255,18,0.8)",
        stagger: 0.1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 40%",
          scrub: true,
        }
      }
    );
  }, { scope: containerRef });

  return (
    <h2 ref={containerRef} className={twMerge("flex flex-wrap justify-center", className)}>
      {text.split(" ").map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap mr-[0.25em]">
          {word.split("").map((char, charIndex) => (
            <span key={charIndex} className="energy-char inline-block transition-colors duration-100">
              {char}
            </span>
          ))}
        </span>
      ))}
    </h2>
  );
};
