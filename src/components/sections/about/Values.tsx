"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ShieldCheck, Wrench, Headset, Network } from "lucide-react";

export const Values = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".value-pillar",
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );
    },
    { scope: containerRef }
  );

  const pillars = [
    {
      icon: ShieldCheck,
      title: "30-Year Warranty",
      desc: "Performance guaranteed for three decades, backed by premium manufacturing standards.",
    },
    {
      icon: Wrench,
      title: "1-Year Free Maintenance",
      desc: "Complimentary white-glove service for your first year of energy independence.",
    },
    {
      icon: Headset,
      title: "Premium After-Sales",
      desc: "Direct access to our senior engineering team for monitoring and optimization.",
    },
    {
      icon: Network,
      title: "End-to-End Service",
      desc: "From initial site survey to utility grid integration, we handle the entire journey.",
    },
  ];

  return (
    <section ref={containerRef} className="py-section-gap bg-surface-container-lowest">
      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="text-center mb-24">
          <h2 className="font-headline-lg text-headline-lg text-primary mb-4">
            Why Choose Codegen Solar?
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Quality, reliability, and unparalleled engineering service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="value-pillar group p-8 rounded-xl bg-surface-container-low border border-white/5 transition-all duration-300 hover:bg-surface-container-high hover:-translate-y-2"
              >
                <div className="w-14 h-14 rounded-full bg-primary-fixed-dim/10 flex items-center justify-center mb-6 border border-primary-fixed-dim/20 group-hover:bg-primary-fixed-dim/20 transition-colors">
                  <Icon className="text-primary-fixed-dim w-6 h-6" />
                </div>
                <h4 className="font-headline-md text-headline-md text-primary mb-3">
                  {pillar.title}
                </h4>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
