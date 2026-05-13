"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const chars = "!<>-_\\\\/[]{}—=+*^?#_0123456789";

interface ScrambleTextProps {
  text: string;
  className?: string;
  duration?: number;
}

export const ScrambleText = ({ text, className, duration = 1.5 }: ScrambleTextProps) => {
  const elRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (!elRef.current) return;
    
    const obj = { value: 0 };
    
    gsap.to(obj, {
      value: 1,
      duration: duration,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: elRef.current,
        start: "top 85%",
        toggleActions: "play none none none"
      },
      onUpdate: () => {
        const progress = obj.value;
        const length = text.length;
        const revealedIndex = Math.floor(progress * length);
        
        let scrambled = "";
        for (let i = 0; i < length; i++) {
          if (i < revealedIndex) {
            scrambled += text[i];
          } else {
            scrambled += chars[Math.floor(Math.random() * chars.length)];
          }
        }
        if (elRef.current) {
          elRef.current.innerText = scrambled;
        }
      },
      onComplete: () => {
        if (elRef.current) {
          elRef.current.innerText = text;
        }
      }
    });
  }, { scope: elRef });

  return (
    <span ref={elRef} className={className}>
      {text.replace(/./g, "0")}
    </span>
  );
};
