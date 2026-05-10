"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { GlassCard } from "../../ui/GlassCard";
import { Car } from "lucide-react";

export const OurHeritage = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".heritage-card", {
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
      <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
        <div className="max-w-2xl">
          <span className="font-label-caps text-label-caps text-primary-fixed-dim mb-4 block uppercase">
            Our Heritage
          </span>
          <h2 className="font-headline-lg text-headline-lg text-primary">
            Born from <span className="text-primary-fixed-dim">Vega Innovations</span>
          </h2>
        </div>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
          Our engineering DNA is forged in the high-performance world of electric mobility,
          translating extreme efficiency into residential energy.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
        {/* Large Glass Card: Automotive Heritage */}
        <div className="md:col-span-8 heritage-card group">
          <GlassCard glowBorder className="h-full flex flex-col justify-between p-8 rounded-xl">
            <div className="mb-12">
              <h3 className="font-headline-md text-headline-md text-primary mb-4">
                The VEGA EVX Legacy
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-lg">
                We pioneered the electric supercar in South Asia. Today, we use those same battery
                management systems and power electronics to revolutionize how you capture the sun.
              </p>
            </div>
            <div className="relative h-64 md:h-80 w-full rounded-lg overflow-hidden">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhmy1PGedHgoRCy3XIfd7bNqD3hD2bJ78T-D3byrtHfuNWXBfg46Q8bWEFDVbPJZKA28A_MkxcjuUqJI7ICvjLeu2878KbENzp-uXYG7HjmvofOOMb7RbBy48maCB5J_Mi8OsA2Pvd9xLpU-_Km8kklVwtF5pOUpmRx9w1FLgKWA6b8-3g8Hyv5ELVnCSBzb5HVXCYN6r5TCmv2IKCAom7OGp28lFFIFQtA7u-A1FWGq5a7vy1eKJrwEEmZbt578ktZ1IjRDhx_TID"
                alt="Electric supercar technology"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          </GlassCard>
        </div>

        {/* Vertical Glass Card: Mobility */}
        <div className="md:col-span-4 heritage-card group">
          <GlassCard glowBorder className="h-full flex flex-col justify-between p-8 rounded-xl">
            <div>
              <h3 className="font-headline-md text-headline-md text-primary mb-4">
                Urban Eco-Systems
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                From eco-friendly three-wheelers to smart micro-grids.
              </p>
            </div>
            <div className="relative h-48 md:h-full mt-8 rounded-lg overflow-hidden bg-surface-container-high flex items-center justify-center p-4">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary-fixed-dim to-transparent"></div>
              <Car className="w-24 h-24 text-primary-fixed-dim opacity-80" />
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
};
