"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export const SolutionsCTA = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".solutions-cta-content", {
        scale: 0.95,
        opacity: 0,
        y: 40,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="py-section-gap px-margin-mobile pb-24">
      <div className="solutions-cta-content max-w-container-max mx-auto glass-panel rounded-3xl p-16 md:p-32 text-center relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLDWdMsFsYmkyfbo_29_43T7O5ttn1iWyeUVyPIF5fGL-rD_WDKC7J2ky24h-M_K-3VlIPs9Y1OcwAVMDZ8xi0zDom2846xnRFmrWhz5hl-x32NgV5EYsUar_806fVSob31sLSbh8_-FRBQdS6oKevvQnwn7P4QJ8N6AXj_tJtY5CegZ9duE1ksrKD_2LLUmK8-IedJzaxxzKYvYGMD_S-SSaUpL11G4VCDWPV9hLUUhHsq2aFSphW425gXJ9Gbt5gfG0EME26kz6c"
            alt="Abstract circuitry"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10">
          <h2 className="font-display-hero text-[40px] md:text-headline-lg text-on-surface mb-8">
            Ready to Transcend the Grid?
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mx-auto mb-12">
            Our engineering team is standing by to architect your bespoke energy
            ecosystem. Experience the future of clean energy today.
          </p>
          <button className="bg-primary-fixed-dim text-[#102000] font-label-caps text-label-caps px-12 py-6 rounded-full font-bold hover:scale-105 transition-transform uppercase tracking-wider">
            Consult with our engineers
          </button>
        </div>
      </div>
    </section>
  );
};
