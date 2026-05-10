"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { LayoutGrid, Zap, Layers, ArrowRight } from "lucide-react";
import { GlassCard } from "../../ui/GlassCard";

export const SolutionGrid = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(".solution-card",
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
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

  const solutions = [
    {
      icon: LayoutGrid,
      title: "On-Grid Precision",
      desc: "Seamless integration with the global utility network. Optimized for maximum financial yield and accelerated ROI through smart feed-in protocols.",
      tag: "ROI Focus",
    },
    {
      icon: Zap,
      title: "Off-Grid Autonomy",
      desc: "Complete energy sovereignty for remote environments. Built with high-capacity storage to ensure uninterrupted power in the harshest conditions.",
      tag: "Freedom First",
    },
    {
      icon: Layers,
      title: "Hybrid Resilience",
      desc: "The ultimate compromise: grid connectivity with independent backup security. Automated switching protocols manage peak loads and grid outages.",
      tag: "Total Resilience",
    },
  ];

  return (
    <section ref={containerRef} className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        {solutions.map((sol, idx) => {
          const Icon = sol.icon;
          return (
            <GlassCard
              key={idx}
              glowBorder
              className="solution-card p-10 rounded-xl group transition-all duration-500 h-full flex flex-col"
            >
              <div className="w-16 h-16 rounded-full bg-primary-fixed-dim/10 flex items-center justify-center mb-8 group-hover:bg-primary-fixed-dim/20 transition-colors">
                <Icon className="text-primary-fixed-dim w-8 h-8" />
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-4">
                {sol.title}
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-8 h-auto md:h-24">
                {sol.desc}
              </p>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                <span className="font-label-caps text-label-caps text-primary-fixed-dim uppercase tracking-wider">
                  {sol.tag}
                </span>
                <button className="text-on-surface font-label-caps text-label-caps flex items-center gap-2 group-hover:gap-4 transition-all uppercase tracking-wider">
                  Explore Solution <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </section>
  );
};
