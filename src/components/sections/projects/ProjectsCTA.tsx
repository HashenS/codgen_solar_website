"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Button } from "../../ui/Button";

export const ProjectsCTA = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".projects-cta-content",
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
    <section ref={containerRef} className="py-section-gap px-margin-mobile md:px-margin-desktop">
      <div className="projects-cta-content max-w-container-max mx-auto glass-panel rounded-3xl p-12 md:p-24 relative overflow-hidden text-center group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-fixed opacity-5 blur-[120px] group-hover:opacity-10 transition-opacity duration-700"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-fixed opacity-5 blur-[100px] group-hover:opacity-10 transition-opacity duration-700"></div>
        
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="font-headline-lg text-headline-lg text-primary mb-6">
            Ready to Power the Infinite?
          </h2>
          <p className="text-on-surface-variant font-body-lg text-body-lg mb-10">
            Join the vanguard of renewable energy. Our engineering team is ready to design your customized solar ecosystem.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="primary" className="text-body-md px-10 py-5">
              Partner with Us
            </Button>
            <Button variant="glass" className="text-body-md px-10 py-5">
              Request Technical Audit
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
