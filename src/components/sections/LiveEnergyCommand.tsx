"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Sun, Cpu, Home } from "lucide-react";
import { ScrambleText } from "../ui/ScrambleText";
import { EnergyTextReveal } from "../ui/EnergyTextReveal";

export const LiveEnergyCommand = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Animate the flow lines (SVG pulse)
      gsap.to(".circuit-pulse", {
        strokeDashoffset: -16, // matches dasharray length (8+8)
        ease: "none",
        duration: 0.5,
        repeat: -1,
      });

      // Pulse the central hub
      gsap.to(".nexus-core-ring", {
        scale: 1.2,
        opacity: 0,
        duration: 2,
        repeat: -1,
        ease: "power2.out",
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto overflow-hidden">
      <div className="glass-panel rounded-[40px] p-8 md:p-16 relative border border-white/5 shadow-2xl">
        <div className="flex flex-col items-center text-center mb-16 gap-8">
          <div>
            <EnergyTextReveal 
              text="Smart Energy Monitoring" 
              className="font-display-hero font-bold tracking-tight text-3xl md:text-5xl lg:text-6xl mb-3 md:mb-4" 
              blueWords={["Monitoring"]}
            />
            <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mx-auto">
              Monitor every watt moving through your ecosystem in real time.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="px-6 py-3 rounded-2xl glass-panel text-center">
              <p className="font-label-caps text-[10px] text-on-surface-variant uppercase mb-1">
                Solar Production
              </p>
              <p className="font-headline-md text-headline-md text-primary-fixed-dim">
                7.4 kW
              </p>
            </div>
            <div className="px-6 py-3 rounded-2xl glass-panel text-center">
              <p className="font-label-caps text-[10px] text-on-surface-variant uppercase mb-1">
                Grid Impact
              </p>
              <p className="font-headline-md text-headline-md text-error">
                -0.2 kW
              </p>
            </div>
          </div>
        </div>

        {/* Diagram Shell */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 items-center text-center">
          
          {/* Background Circuit SVG - Desktop */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none hidden md:block -z-10">
            <line x1="16.66%" y1="50%" x2="83.33%" y2="50%" stroke="rgba(255,255,255,0.05)" strokeWidth="2" />
            <line className="circuit-pulse" x1="16.66%" y1="50%" x2="83.33%" y2="50%" stroke="#0e9c5c" strokeWidth="2" strokeDasharray="8 8" strokeLinecap="round" />
          </svg>

          {/* Background Circuit SVG - Mobile */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none block md:hidden -z-10">
            <line x1="50%" y1="16.66%" x2="50%" y2="83.33%" stroke="rgba(255,255,255,0.05)" strokeWidth="2" />
            <line className="circuit-pulse" x1="50%" y1="16.66%" x2="50%" y2="83.33%" stroke="#0e9c5c" strokeWidth="2" strokeDasharray="8 8" strokeLinecap="round" />
          </svg>

          {/* Source 1 */}
          <div className="space-y-4 relative z-10">
            <div className="w-24 h-24 mx-auto bg-background rounded-full flex items-center justify-center border border-primary-fixed/40 shadow-[0_0_30px_rgba(163,255,18,0.1)]">
              <Sun className="w-10 h-10 text-primary-fixed" />
            </div>
            <p className="font-headline-md text-headline-md">Solar Array</p>
          </div>

          {/* Hub */}
          <div className="relative z-10">
            <div className="w-40 h-40 mx-auto bg-background rounded-3xl flex flex-col items-center justify-center border border-white/20 glow-border relative">
              <Cpu className="w-10 h-10 text-primary mb-2" />
              <p className="font-label-caps text-label-caps font-bold">SMART INVERTER</p>
            </div>
            {/* Decorative HUD elements */}
            <div className="absolute inset-0 flex items-center justify-center -z-10">
              <div className="nexus-core-ring absolute w-64 h-64 border border-primary-fixed/30 rounded-full"></div>
              <div className="w-64 h-64 border border-primary-fixed/10 rounded-full"></div>
            </div>
          </div>

          {/* Sink */}
          <div className="space-y-4 relative z-10">
            <div className="w-24 h-24 mx-auto bg-background rounded-full flex items-center justify-center border border-white/20">
              <Home className="w-10 h-10 text-primary" />
            </div>
            <p className="font-headline-md text-headline-md">Your Home</p>
          </div>
        </div>

        <div className="mt-20 relative min-h-[120px] border-t border-white/5 pt-8 md:pt-0 md:border-t-0">
          {/* Desktop Dividers */}
          <div className="absolute top-0 bottom-0 left-1/4 w-px bg-white/5 hidden md:block"></div>
          <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/5 hidden md:block"></div>
          <div className="absolute top-0 bottom-0 left-3/4 w-px bg-white/5 hidden md:block"></div>
          
          {/* Mobile Dividers */}
          <div className="absolute top-8 bottom-0 left-1/2 w-px bg-white/5 md:hidden"></div>
          <div className="absolute top-1/2 left-0 right-0 h-px bg-white/5 md:hidden mt-4"></div>

          <div className="grid grid-cols-2 md:grid-cols-4 h-full">
            <div className="text-center p-4 md:p-8 flex flex-col justify-center">
            <p className="font-label-caps text-label-caps text-on-surface-variant mb-2">
              SELF SUFFICIENCY
            </p>
            <div className="h-[48px] flex items-center justify-center whitespace-nowrap">
              <p className="text-3xl md:text-4xl font-headline-lg text-primary">
                <ScrambleText text="98" className="stat-number" />%
              </p>
            </div>
          </div>
          <div className="text-center p-4 md:p-8 flex flex-col justify-center">
            <p className="font-label-caps text-label-caps text-on-surface-variant mb-2">
              EST. SAVINGS
            </p>
            <div className="h-[48px] flex items-center justify-center whitespace-nowrap">
              <p className="text-2xl md:text-4xl font-headline-lg text-primary-fixed-dim flex items-baseline">
                <span className="mr-1">Rs.</span>
                <ScrambleText text="45,000" className="stat-number inline-block w-[95px] md:w-[130px] text-center" />
                <span className="text-sm md:text-xl font-body-md text-on-surface-variant ml-1">/mo</span>
              </p>
            </div>
          </div>
          <div className="text-center p-4 md:p-8 flex flex-col justify-center">
            <p className="font-label-caps text-label-caps text-on-surface-variant mb-2">
              CO2 SAVED
            </p>
            <div className="h-[48px] flex items-center justify-center whitespace-nowrap">
              <p className="text-3xl md:text-4xl font-headline-lg text-primary">
                <ScrambleText text="1.2" className="stat-number" />t
              </p>
            </div>
          </div>
          <div className="text-center p-4 md:p-8 flex flex-col items-center justify-center">
            <p className="font-label-caps text-label-caps text-on-surface-variant mb-2">
              GRID STATUS
            </p>
            <div className="h-[48px] flex items-center justify-center">
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary-fixed animate-pulse"></div>
                <p className="text-lg font-headline-md text-primary">OPTIMAL</p>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
};
