"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Button } from "../../ui/Button";

export const ContactCTA = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".contact-cta-content",
        { scale: 0.95, opacity: 0, y: 40 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="py-section-gap bg-surface-container-low/30 px-margin-mobile">
      <div className="contact-cta-content max-w-4xl mx-auto text-center space-y-8">
        <span className="font-label-caps text-label-caps text-primary-fixed tracking-[0.3em] uppercase block">
          Ready for transition?
        </span>
        <h2 className="font-headline-lg text-headline-lg text-white">
          Schedule a Comprehensive Technical Audit
        </h2>
        <p className="text-on-surface-variant text-body-lg max-w-3xl mx-auto">
          Our specialists will evaluate your structural capacity, atmospheric efficiency, and grid-backbone compatibility within 48 hours.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center pt-8">
          <Button variant="primary" className="px-12 py-5 text-body-md">
            Start Technical Audit
          </Button>
          <Button variant="glass" className="px-12 py-5 text-body-md border-white/20">
            Download Specs
          </Button>
        </div>
      </div>
    </section>
  );
};
