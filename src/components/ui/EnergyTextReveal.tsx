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
  blueWords?: string[];
}

export const EnergyTextReveal = ({ text, className, blueWords = [] }: EnergyTextRevealProps) => {
  const containerRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    
    const chars = containerRef.current.querySelectorAll(".energy-char");
    
    gsap.fromTo(chars, 
      {
        color: "#333333", // Dim gray
      },
      {
        color: (index, target) => target.dataset.color === "blue" ? "#0863a8" : "#0e9c5c",
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
            <span 
              key={charIndex} 
              className="energy-char inline-block transition-colors duration-100"
              data-color={blueWords.includes(word) ? "blue" : "green"}
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </h2>
  );
};
