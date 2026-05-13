"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Button } from "./Button";

export const Navbar = () => {
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

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
        <Link href="/" className="flex items-center">
          <img src="/cg-solar.png" alt="Codegen Solar" className="h-8 md:h-10 w-auto object-contain" />
        </Link>
        
        <div className="hidden md:flex gap-8 items-center">
          {[
            { label: "Home", href: "/" },
            { label: "About", href: "/about" },
            { label: "Solutions", href: "/solutions" },
            { label: "Projects", href: "/projects" },
            { label: "Contact", href: "/contact" },
            { label: "FAQs", href: "/faqs" }
          ].map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
            
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`font-medium transition-colors duration-300 font-label-caps text-label-caps uppercase ${
                  isActive 
                    ? "text-primary drop-shadow-[0_0_8px_rgba(163,255,18,0.5)]" 
                    : "text-on-surface-variant hover:text-primary-fixed-dim"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
        
        <Button size="sm" magnetic>
          Get Started
        </Button>
      </div>
    </nav>
  );
};
