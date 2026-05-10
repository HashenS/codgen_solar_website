"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export const AboutCTA = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".about-cta-content", {
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
    <section ref={containerRef} className="py-section-gap">
      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="about-cta-content bg-primary-fixed-dim rounded-3xl p-12 md:p-24 text-center relative overflow-hidden group">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_#000,_transparent)]"></div>
          <h2 className="font-display-hero text-[32px] md:text-headline-lg text-[#102000] mb-6 relative z-10">
            Ready to Join the Solar Revolution?
          </h2>
          <p className="font-body-lg text-body-lg text-[#102000]/80 mb-10 max-w-2xl mx-auto relative z-10">
            Join the hundreds of forward-thinking homeowners and enterprises who
            have already secured their energy future with Codegen.
          </p>
          <button className="bg-[#102000] text-primary-fixed-dim px-12 py-5 rounded-full font-bold text-label-caps tracking-widest relative z-10 hover:bg-[#1f3700] transition-colors hover:scale-105 active:scale-95">
            REQUEST A FREE QUOTE
          </button>
        </div>
      </div>
    </section>
  );
};
