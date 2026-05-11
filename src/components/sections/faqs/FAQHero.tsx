"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Search } from "lucide-react";

export const FAQHero = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.fromTo(
        ".faq-hero-bg",
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 0.2, duration: 2, ease: "power2.out" }
      )
        .fromTo(
          ".faq-hero-title",
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
          "-=1.2"
        )
        .fromTo(
          ".faq-hero-search",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.8"
        );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="relative min-h-[409px] flex items-center justify-center overflow-hidden border-b border-white/5 pt-[120px]">
      <div 
        className="faq-hero-bg absolute inset-0 pointer-events-none bg-cover bg-center" 
        style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAVC1YHjakzlsDrkfWvCp6gAIKtSOA6GlPmI7JWBc25e6sFO6c8FgXc1SK3fU1bLhlSLL3FE_aIVHp-lEMksOCKEhqv3G64ReDC33N7p5goS62SRw1C50T9zCUaNizelmsqBS1HCkeCx23Ehx1zrUai2M_dC7FUU4fIP525SB53iYs8SXZ7PS_KK19Kk1r2pZx9LHXbkiaJZLyTH4bywU6ghNTJRXaqRJlUh2OKphXN-UyIVjo7E2j-r7o7zyaMNHheJXRUsFV4zhzP')" }}
      ></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(159,251,6,0.08),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(15,23,32,1),transparent_50%)] z-10 pointer-events-none"></div>
      
      <div className="relative z-20 px-margin-mobile md:px-margin-desktop text-center max-w-4xl w-full">
        <span className="faq-hero-title font-label-caps text-label-caps text-primary-fixed tracking-[0.2em] mb-4 block uppercase">
          KNOWLEDGE BASE
        </span>
        <h1 className="faq-hero-title font-display-hero text-[40px] leading-[48px] md:text-display-hero mb-8 text-primary">
          Technical Intelligence
        </h1>
        <div className="faq-hero-search relative max-w-2xl mx-auto">
          <input 
            type="text" 
            placeholder="Search systems, ROI, or warranties..." 
            className="w-full bg-surface-container-low border border-white/10 rounded-full py-4 px-8 text-body-md text-white focus:outline-none focus:border-primary-fixed focus:ring-1 focus:ring-primary-fixed transition-all placeholder:text-on-surface-variant/50"
          />
          <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-primary-fixed w-6 h-6" />
        </div>
      </div>
    </section>
  );
};
