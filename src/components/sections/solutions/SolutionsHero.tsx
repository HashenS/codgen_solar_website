"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export const SolutionsHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.from(bgRef.current, {
        scale: 1.1,
        duration: 3,
        ease: "power2.out",
      });

      tl.from(
        ".solutions-hero-element",
        {
          y: 40,
          opacity: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
        },
        "-=2"
      );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="relative h-[921px] flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 z-0">
        <Image
          ref={bgRef}
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbiJACh4LTzaOcFuUfmJhrSH5dFwpJkccHTfKB2U2LFpPDdBQJIYhj7kUNCkrGt5HbdEMHB4_1qjblheiL57ZjcmnVCbd5EmXmoyytWiwYAdu2nTKAKwinRWIAP3ox7MFx8qomYunrRy-5UWGz0VGz0UUZ6h27nvcA0NltSCvSulR4ip84AJ1KrQ7se6xqHfBpErTlLOqKmISvuQltINobAq4sUGVBHZUZ3z3xkS6NiqFYm3RuEv-JBTAm2sC6yhy3ieWYOFVQ3S5O"
          alt="Solar farm"
          fill
          className="object-cover opacity-60 transform-gpu"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center">
        <span className="solutions-hero-element font-label-caps text-label-caps text-primary-fixed-dim mb-6 block tracking-widest uppercase">
          Solar Architecture
        </span>
        <h1 className="solutions-hero-element font-display-hero text-[40px] md:text-display-hero leading-[1.1] text-on-surface max-w-4xl mx-auto mb-8">
          Tailored Solar Ecosystems. Precision Engineering for Every Environment.
        </h1>
        <p className="solutions-hero-element font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-12">
          Redefining energy independence through atmospheric-grade technology and intelligent storage systems designed for the next century.
        </p>
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <button className="solutions-hero-element bg-primary-fixed-dim text-[#102000] font-label-caps text-label-caps px-10 py-5 rounded-full font-bold hover:shadow-[0_0_20px_rgba(163,255,18,0.4)] transition-all uppercase">
            Consult an Engineer
          </button>
          <button className="solutions-hero-element glass-panel text-on-surface font-label-caps text-label-caps px-10 py-5 rounded-full font-bold hover:bg-white/10 transition-all uppercase">
            View Architecture
          </button>
        </div>
      </div>
    </section>
  );
};
