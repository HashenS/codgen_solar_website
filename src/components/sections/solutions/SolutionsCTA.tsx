"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Button } from "../../ui/Button";
import { EnergyTextReveal } from "../../ui/EnergyTextReveal";

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
    <section ref={containerRef} className="py-section-gap px-margin-mobile md:px-margin-desktop">
      <div className="solutions-cta-content max-w-container-max mx-auto glass-panel rounded-3xl md:rounded-[48px] overflow-hidden relative border border-primary-fixed/20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-fixed/10 via-transparent to-transparent" />
        <div className="relative z-10 p-8 md:p-24 text-center">
          <EnergyTextReveal
            text="Ready to Transcend the Grid?"
            className="font-display-hero font-bold tracking-tight text-3xl md:text-5xl lg:text-6xl mb-4 md:mb-8"
            blueWords={["Transcend", "Grid?"]}
          />
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-12">
            Our engineering team is standing by to architect your bespoke energy
            ecosystem. Experience the future of clean energy today.
          </p>
          <div className="flex justify-center">
            <Button variant="primary" size="lg">
              Consult with Our Engineers
            </Button>
          </div>
          <p className="mt-8 text-on-surface-variant/60 font-label-caps text-label-caps">
            COMPLIMENTARY CONSULTATION • NO OBLIGATION
          </p>
        </div>
      </div>
    </section>
  );
};
