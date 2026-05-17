"use client";

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { GlassCard } from "../ui/GlassCard";
import { Button } from "../ui/Button";
import { EnergyTextReveal } from "../ui/EnergyTextReveal";

export const SolarCalculator = () => {
  const [bill, setBill] = useState(250);
  const containerRef = useRef<HTMLElement>(null);
  
  // Calculated values
  const annualSavings = Math.floor(bill * 12 * 0.95);
  const systemSize = Math.max(3, Math.floor(bill / 30));
  const roiYears = Math.max(4, Math.floor(12 - (bill / 50)));

  useGSAP(() => {
    gsap.from(".calc-element", {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      }
    });
  }, { scope: containerRef });

  useEffect(() => {
    // Animate numbers when bill changes
    gsap.fromTo(".animated-num", 
      { textContent: 0 },
      {
        textContent: (i: number, target: HTMLElement) => target.dataset.val,
        duration: 1,
        snap: { textContent: 1 },
        ease: "power2.out"
      }
    );
  }, [bill]);

  return (
    <section ref={containerRef} className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
      <div className="text-center mb-16 calc-element">
        <EnergyTextReveal 
          text="Calculate Your Future" 
          className="font-headline-lg text-headline-lg mb-4" 
          blueWords={["Future"]}
        />
        <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">
          See exactly how much you can save with a custom Codegen Solar array.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
        {/* Interactive Controls */}
        <div className="lg:col-span-5 calc-element h-full">
          <GlassCard glowBorder className="h-full flex flex-col">
            <h3 className="font-headline-md text-headline-md text-primary mb-8">Average Monthly Bill</h3>
            <div className="flex items-end gap-2 mb-8">
              <span className="text-5xl font-display-hero text-primary-fixed-dim">${bill}</span>
              <span className="text-on-surface-variant mb-2">/ month</span>
            </div>
            
            <input 
              type="range" 
              aria-label="Average Monthly Bill"
              min="50" 
              max="1000" 
              step="10"
              value={bill}
              onChange={(e) => setBill(Number(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary-fixed"
            />
            
            <div className="flex justify-between mt-4 text-on-surface-variant font-label-caps text-label-caps">
              <span>$50</span>
              <span>$1000+</span>
            </div>

            <Button variant="primary" className="w-full mt-auto pt-4">
              Get Detailed Quote
            </Button>
          </GlassCard>
        </div>

        {/* Results Dashboard */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 h-full">
          <GlassCard className="calc-element text-center">
            <p className="font-label-caps text-label-caps text-on-surface-variant mb-4">20-Year Savings</p>
            <p className="text-5xl font-headline-lg text-primary-fixed-dim">
              $<span className="animated-num" data-val={annualSavings * 20}>{annualSavings * 20}</span>
            </p>
          </GlassCard>

          <GlassCard className="calc-element text-center">
            <p className="font-label-caps text-label-caps text-on-surface-variant mb-4">Est. System Size</p>
            <p className="text-5xl font-headline-lg text-primary">
              <span className="animated-num" data-val={systemSize}>{systemSize}</span>kW
            </p>
          </GlassCard>

          <GlassCard className="calc-element sm:col-span-2 relative overflow-hidden">
            <div className="flex justify-between items-center mb-8 relative z-10">
              <p className="font-label-caps text-label-caps text-on-surface-variant">Payback Period</p>
              <p className="text-3xl font-headline-md text-primary"><span className="animated-num" data-val={roiYears}>{roiYears}</span> Years</p>
            </div>
            {/* Mock Graph */}
            <div className="h-32 w-full flex items-end gap-2 relative z-10">
              {[...Array(10)].map((_, i) => {
                const height = i >= roiYears ? 100 : (i / roiYears) * 80;
                const isGreen = i >= roiYears;
                return (
                  <div 
                    key={i} 
                    className={`flex-1 rounded-t-md transition-all duration-500 ${isGreen ? 'bg-primary-fixed/80' : 'bg-white/10'}`}
                    style={{ height: `${height}%` }}
                  />
                );
              })}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-0"></div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
};
