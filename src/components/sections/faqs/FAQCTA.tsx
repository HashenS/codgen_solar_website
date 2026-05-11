"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Button } from "../../ui/Button";

export const FAQCTA = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".faq-cta-content",
        { scale: 0.95, opacity: 0, y: 40 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1.2,
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
    <section ref={containerRef} className="py-section-gap px-margin-mobile md:px-margin-desktop relative overflow-hidden">
      <div className="absolute inset-0 bg-primary-container/5 pointer-events-none"></div>
      <div className="faq-cta-content max-w-4xl mx-auto bg-surface/70 backdrop-blur-xl border border-primary-fixed/30 rounded-[2rem] p-12 md:p-20 text-center relative z-10 hover:border-primary-fixed transition-colors duration-500 hover:shadow-[0_0_30px_rgba(159,251,6,0.1)]">
        <h2 className="font-headline-lg text-headline-lg text-primary mb-6">
          Still have questions?
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-2xl mx-auto">
          Our engineering consultants are available for complex technical inquiries and custom architectural project planning.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-6">
          <Button variant="primary" className="px-10 py-4 text-[18px]">
            Contact Engineering
          </Button>
          <Button variant="glass" className="px-10 py-4 text-[18px] border-white/20">
            Download Technical PDF
          </Button>
        </div>
      </div>
    </section>
  );
};
