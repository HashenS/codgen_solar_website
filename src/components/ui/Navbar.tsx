"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export const Navbar = () => {
  const navRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Basic entrance animation for the navbar
    gsap.from(navRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      delay: 0.2,
    });
  });

  return (
    <nav
      ref={navRef}
      className="fixed top-0 w-full z-50 bg-transparent backdrop-blur-xl border-b border-white/10 transition-colors duration-300"
    >
      <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop py-6 max-w-container-max mx-auto">
        <Link href="/" className="font-headline-md text-headline-md font-bold text-primary tracking-tighter">
          Codegen Solar
        </Link>
        
        <div className="hidden md:flex gap-8 items-center">
          {["Home", "About", "Solutions", "Projects", "Contact", "FAQs"].map((item) => (
            <Link
              key={item}
              href={item === "Home" ? "/" : `#${item.toLowerCase()}`}
              className="text-on-surface-variant font-medium hover:text-primary-fixed-dim transition-colors duration-300 font-label-caps text-label-caps"
            >
              {item}
            </Link>
          ))}
        </div>
        
        <button className="bg-primary-fixed text-[#102000] px-6 py-2 rounded-full font-label-caps text-label-caps font-bold scale-95 hover:scale-100 active:scale-90 transition-all shadow-[0_0_15px_rgba(163,255,18,0.3)] hover:shadow-[0_0_25px_rgba(163,255,18,0.5)]">
          Get Started
        </button>
      </div>
    </nav>
  );
};
