"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Route, Zap, BatteryCharging } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CARDS = [
  {
    icon: <Route className="text-primary-fixed mb-4 w-12 h-12" />,
    title: "Smart Switching",
    body: "Seamlessly transitions between solar harvesting, battery discharge, and grid backup in less than 10 milliseconds.",
    rotation: -8,
    yMiddle: -20,
  },
  {
    icon: <Zap className="text-primary-fixed mb-4 w-12 h-12" />,
    title: "Grid Sync",
    body: "Real-time synchronization with local utility prices to export energy at peak value.",
    rotation: 5,
    yMiddle: 20,
  },
  {
    icon: <BatteryCharging className="text-primary-fixed mb-4 w-12 h-12" />,
    title: "Battery Guard",
    body: "Advanced thermal management ensures 20-year operational lifespan for your storage.",
    rotation: -5,
    yMiddle: -10,
  },
];

export const FeatureScrollCards = () => {
  const containerRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useGSAP(
    () => {
      // 1. Initial State: cards are off-screen at the bottom
      gsap.set(cardsRef.current, { 
        yPercent: 50, 
        y: window.innerHeight,
        rotation: 0
      });

      // 2. Timeline for the whole section (longer duration for pause)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=300%", // Increased scroll distance to accommodate the pause
          pin: pinRef.current,
          scrub: 1,
        },
      });

      cardsRef.current.forEach((card, index) => {
        // 3. IN ANIMATION: Move to center and rotate
        tl.to(
          card,
          {
            yPercent: 0,
            y: CARDS[index].yMiddle,
            rotation: CARDS[index].rotation,
            duration: 1,
            ease: "power2.out",
          },
          index * 0.15 // Stagger entrance
        );

        // 4. PAUSE & OUT ANIMATION: Hold position, then exit up
        // The gap between duration 1 (end of IN) and 2 (start of OUT) creates the pause.
        tl.to(
          card,
          {
            yPercent: -50,
            y: -window.innerHeight,
            rotation: 0,
            duration: 1,
            ease: "power2.in",
          },
          2 + index * 0.15 // Start exit after a delay, maintaining stagger
        );
      });
    },
    { scope: containerRef }
  );

  const addToRefs = (el: HTMLDivElement) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <section ref={containerRef} className="bg-background relative">
      <div ref={pinRef} className="h-screen w-full relative overflow-hidden flex items-center justify-center">
        <div className="w-full max-w-[1440px] px-4 md:px-8 relative h-full flex items-center justify-center">
          {/* Container for cards */}
          <div className="flex gap-4 md:gap-8 w-full justify-center scale-[0.85] md:scale-100">
            {CARDS.map((card) => (
              <div
                key={card.title}
                ref={addToRefs}
                className="relative w-[300px] md:w-[380px] shrink-0 bg-[#0a0a0a] rounded-[32px] p-8 md:p-10 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col will-change-transform"
              >
                {/* Optional top-edge highlight for that 3D card feel */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary-fixed/30 to-transparent opacity-50" />
                
                <div className="mb-6 md:mb-12">
                   {card.icon}
                </div>
                <h3 className="font-headline-lg text-[28px] md:text-[36px] leading-tight text-white font-medium mb-4 tracking-tight">
                  {card.title}
                </h3>
                <p className="font-body-md text-[16px] md:text-[18px] leading-relaxed text-[#8a8a8a]">
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
