"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Button } from "./Button";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Solutions", href: "/solutions" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
  { label: "FAQs", href: "/faqs" }
];

export const Navbar = () => {
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

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

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 w-full z-[999] transition-colors duration-300"
      >
      {/* Top bar background with blur */}
      <div className="absolute inset-0 bg-[#050505]/60 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] pointer-events-none"></div>

      <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4 md:py-6 max-w-container-max mx-auto relative z-[999]">
        <Link href="/" className="flex items-center">
          <img src="/cg-solar.png" alt="Codegen Solar" className="h-8 md:h-10 w-auto object-contain" />
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          {NAV_LINKS.map((item) => {
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
        
        <div className="hidden md:block">
          <Button size="sm" magnetic>
            Get Started
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white p-2 z-[999] relative"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-[#050505]/95 backdrop-blur-md z-[998] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col pt-24 px-margin-mobile ${
          isOpen ? "translate-x-0 pointer-events-auto" : "translate-x-full pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-6 items-center w-full mt-10">
          {NAV_LINKS.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`text-2xl font-headline-md transition-colors duration-300 ${
                  isActive ? "text-primary drop-shadow-[0_0_10px_rgba(163,255,18,0.5)]" : "text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="mt-8 w-full max-w-xs">
            <Button size="lg" className="w-full">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
