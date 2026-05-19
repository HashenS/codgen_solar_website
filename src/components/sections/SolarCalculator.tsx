"use client";

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { GlassCard } from "../ui/GlassCard";
import { Button } from "../ui/Button";
import { EnergyTextReveal } from "../ui/EnergyTextReveal";

const CALCULATOR_DATA = [
  { range: "0 - 15,000", kw: 5, avgBill: 15000 },
  { range: "15,000 - 30,000", kw: 10, avgBill: 30000 },
  { range: "30,000 - 45,000", kw: 15, avgBill: 45000 },
  { range: "45,000 - 60,000", kw: 20, avgBill: 60000 },
  { range: "60,000 - 75,000", kw: 25, avgBill: 75000 },
  { range: "75,000 - 90,000", kw: 30, avgBill: 90000 },
  { range: "90,000+", kw: 40, avgBill: 120000 }
];

export const SolarCalculator = () => {
  const [billIndex, setBillIndex] = useState(0);
  const containerRef = useRef<HTMLElement>(null);
  
  // Calculated values based on the selected range
  const currentData = CALCULATOR_DATA[billIndex];
  const annualSavings = Math.floor(currentData.avgBill * 12); // Saving the entire bill annually
  const systemSize = currentData.kw;
  const roiYears = 4; // Average payback period in Sri Lanka is ~4 years

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
    // Animate numbers when bill index changes
    gsap.fromTo(".animated-num", 
      { textContent: 0 },
      {
        textContent: (i: number, target: HTMLElement) => target.dataset.val,
        duration: 1,
        snap: { textContent: 1 },
        ease: "power2.out",
        modifiers: {
          textContent: function(value) {
            return new Intl.NumberFormat('en-US').format(value);
          }
        }
      }
    );
  }, [billIndex]);

  // Format Rs with commas (standard international format)
  const formatRs = (num: number) => new Intl.NumberFormat('en-US').format(num);

  return (
    <section ref={containerRef} className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto relative z-30">
      <div className="text-center mb-16 calc-element">
        <EnergyTextReveal 
          text="Calculate Your Solar Capacity" 
          className="font-display-hero font-bold tracking-tight text-3xl md:text-5xl lg:text-6xl mb-3 md:mb-6" 
          blueWords={["Capacity"]}
        />
        <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">
          Adjust your monthly electricity bill to see recommended solar capacity and savings.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Interactive Controls */}
        <div className="lg:col-span-5 calc-element h-full">
          <GlassCard glowBorder className="h-full flex flex-col p-8 md:p-12">
            <h3 className="font-headline-sm md:font-headline-md text-headline-sm md:text-headline-md text-primary mb-8">Monthly Electricity Bill</h3>
            <div className="flex flex-col gap-2 mb-10 text-center">
              <span className="text-4xl md:text-5xl font-display-hero text-primary-fixed-dim">
                Rs. {currentData.range}
              </span>
            </div>
            
            <input 
              type="range" 
              aria-label="Average Monthly Bill"
              min="0" 
              max={CALCULATOR_DATA.length - 1} 
              step="1"
              value={billIndex}
              onChange={(e) => setBillIndex(Number(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary-fixed mb-4"
            />
            
            <div className="flex justify-between text-on-surface-variant font-label-caps text-label-caps mb-8 md:mb-10">
              <span>Rs. 0</span>
              <span>Rs. 90,000+</span>
            </div>

            <Button 
              variant="primary" 
              className="w-full mt-auto bg-[#0e9c5c] hover:bg-[#0863a8] transition-colors gap-2"
              onClick={() => window.open('https://wa.me/+94703468385', '_blank')}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.52 3.44A12.004 12.004 0 0012 0C5.38 0 0 5.38 0 12c0 2.12.55 4.18 1.6 6.02L.2 24l6.14-1.6c1.8.98 3.82 1.5 5.92 1.5 6.62 0 12-5.38 12-12 0-3.2-1.25-6.22-3.74-8.46zm-8.52 18.7c-1.8 0-3.55-.48-5.1-1.4l-.36-.22-3.8 1 .98-3.7-.24-.38C2.5 15.65 2 13.85 2 12 2 6.48 6.48 2 12 2s10 4.48 10 10-4.48 10-10 10zm5.4-7.4c-.3-.15-1.78-.88-2.05-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.95 1.18-.18.2-.35.22-.65.08-.3-.15-1.28-.48-2.42-1.5-1.02-.9-1.58-1.5-1.78-1.8-.2-.3 0-.45.15-.6.12-.12.3-.3.45-.45.15-.15.2-.28.3-.45.1-.15.05-.3-.02-.45-.08-.15-.68-1.65-.92-2.25-.25-.6-.5-.52-.68-.52-.18 0-.38 0-.58 0-.2 0-.52.08-.8.38-.28.3-1.05 1.02-1.05 2.5s1.08 2.92 1.22 3.12c.15.2 2.12 3.25 5.15 4.55.72.3 1.28.5 1.72.62.72.25 1.38.2 1.9.12.58-.08 1.78-.72 2.02-1.42.25-.7.25-1.3.18-1.42-.08-.12-.28-.2-.58-.35z"/></svg>
              Get Free Consultation
            </Button>
          </GlassCard>
        </div>

        {/* Results Dashboard */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 h-full">
          <GlassCard className="calc-element text-center flex flex-col justify-center items-center h-full w-full p-6">
            <p className="font-label-caps text-label-caps text-on-surface-variant mb-4">Recommended Solar Capacity</p>
            <div className="flex items-baseline gap-2 whitespace-nowrap">
              <span className="text-6xl font-headline-lg text-primary animated-num" data-val={systemSize}>{systemSize}</span>
              <span className="text-2xl font-body-md text-on-surface-variant">kW</span>
            </div>
          </GlassCard>

          <GlassCard className="calc-element text-center flex flex-col justify-center items-center h-full w-full p-6">
            <p className="font-label-caps text-label-caps text-on-surface-variant mb-4">20-Year Savings</p>
            <div className="flex flex-col items-center justify-center whitespace-nowrap">
              <span className="text-2xl font-headline-md text-primary-fixed-dim/80 mb-1">Rs.</span>
              <span className="text-4xl md:text-5xl font-headline-lg text-primary-fixed-dim animated-num" data-val={annualSavings * 20}>
                {new Intl.NumberFormat('en-US').format(annualSavings * 20)}
              </span>
            </div>
          </GlassCard>

          <GlassCard className="calc-element sm:col-span-2 relative overflow-hidden flex flex-col justify-between">
            <div className="flex justify-between items-center mb-8 relative z-10">
              <p className="font-label-caps text-label-caps text-on-surface-variant">Estimated Payback Period</p>
              <p className="text-3xl font-headline-md text-primary"><span className="animated-num" data-val={roiYears}>{roiYears}</span> Years</p>
            </div>
            {/* Mock Graph */}
            <div className="h-24 md:h-32 w-full flex items-end gap-2 relative z-10 mt-auto">
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
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-0 pointer-events-none"></div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
};
