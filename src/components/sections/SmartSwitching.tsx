"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { GlassCard } from "../ui/GlassCard";
import { Route, Zap, BatteryCharging } from "lucide-react";

export const SmartSwitching = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Animate the cards staggering in as you scroll
      gsap.from(".bento-card", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
      <div className="text-center mb-16">
        <h2 className="font-headline-lg text-headline-lg text-primary mb-4">
          Intelligent Power Orchestration
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">
          Our proprietary Nexus Inverter acts as the brain of your home, making
          microsecond decisions to optimize energy flow.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
        {/* Large Feature */}
        <div className="bento-card md:col-span-8 glass-panel rounded-3xl p-10 flex flex-col justify-between overflow-hidden relative group">
          <div className="relative z-10">
            <Route className="text-primary-fixed mb-6 w-10 h-10" />
            <h3 className="font-headline-lg text-headline-lg text-primary mb-4">Smart Switching</h3>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md">
              Seamlessly transitions between solar harvesting, battery discharge,
              and grid backup in less than 10 milliseconds. You won't even see
              your lights flicker.
            </p>
          </div>
          <div className="mt-12 relative h-48 md:h-64">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5KERAFS5hQTgiQxMddkWNVk9HRsbSQTy6fmW2gOgfucouiprlVASR3rs9JQDD6bk-qjGDOohYh1SKXgu4qAWBSsYgSKsRaqh9dCYfNzLysk9tHX8kx18HZpn7Mp1VqMg6qamKMmAQcyZleOY6SMcAfXIFLZVoPjf6nC6pFSlpoMM0aV68gr2bJaNFZgj1Z2rs61wVCcu9wm91Fo5NZNAbHsqyQCCrPNXmm4TZ-hmyUq3fYtF4KebcOyWRHOUBrXFzJzE5hLlOWeBp"
              alt="High-fidelity photography of a premium energy inverter circuit board"
              fill
              className="object-cover rounded-2xl opacity-50 group-hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>

        {/* Side Cards */}
        <div className="md:col-span-4 flex flex-col gap-gutter">
          <GlassCard glowBorder className="bento-card flex-1">
            <Zap className="text-primary-fixed mb-4 w-8 h-8" />
            <h4 className="font-headline-md text-headline-md text-primary mb-2">Grid Sync</h4>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Real-time synchronization with local utility prices to export energy
              at peak value.
            </p>
          </GlassCard>

          <GlassCard className="bento-card flex-1">
            <BatteryCharging className="text-primary-fixed mb-4 w-8 h-8" />
            <h4 className="font-headline-md text-headline-md text-primary mb-2">Battery Guard</h4>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Advanced thermal management ensures 20-year operational lifespan for
              your storage.
            </p>
          </GlassCard>
        </div>
      </div>
    </section>
  );
};
