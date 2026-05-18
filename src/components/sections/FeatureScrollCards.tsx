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
      let mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        // Desktop Animation
        gsap.set(cardsRef.current, { 
          yPercent: 50, 
          y: window.innerHeight * 0.8,
          rotation: 0,
          opacity: 1
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=200%",
            pin: pinRef.current,
            scrub: 1,
          },
        });

        cardsRef.current.forEach((card, index) => {
          tl.to(
            card,
            {
              yPercent: 0,
              y: CARDS[index].yMiddle,
              rotation: CARDS[index].rotation,
              opacity: 1,
              duration: 1,
              ease: "power2.out",
            },
            index * 0.15
          );

          tl.to(
            card,
            {
              yPercent: -50,
              y: -window.innerHeight,
              rotation: 0,
              opacity: 0,
              duration: 1,
              ease: "power2.in",
            },
            1.5 + index * 0.15
          );
        });
      });

      mm.add("(max-width: 767px)", () => {
        // On mobile, we hand off to native CSS scroll snapping for that 
        // buttery smooth, true "magnetic swipe" feel (120fps hardware accelerated).
        gsap.set(cardsRef.current, { 
          clearProps: "all" 
        });
        // We do NOT create a scrollTrigger here, so vertical scroll flows naturally!
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
    <section ref={containerRef} className="bg-background relative z-30">
      {/* Remove the fixed h-[100svh] pin wrapper for mobile so it flows naturally */}
      <div ref={pinRef} className="h-auto md:h-[100svh] py-20 md:py-0 w-full relative md:overflow-hidden flex items-center justify-center">
        <div className="w-full max-w-[1440px] relative h-full flex items-center justify-start md:justify-center">
          {/* Container for cards - Native CSS Snapping on Mobile */}
          <div className="mobile-scroll-container flex gap-4 md:gap-8 h-full items-center md:justify-center relative w-full overflow-x-auto snap-x snap-mandatory px-[calc(50vw-140px)] md:px-0 pb-8 md:pb-0" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
            {/* Inject global styles for hiding scrollbar in webkit */}
            <style dangerouslySetInnerHTML={{__html: `
              .mobile-scroll-container::-webkit-scrollbar { display: none; }
            `}} />
            
            {CARDS.map((card) => (
              <div
                key={card.title}
                ref={addToRefs}
                className="relative w-[280px] md:w-[380px] shrink-0 bg-[#0a0a0a] rounded-[32px] p-6 md:p-10 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col will-change-transform snap-center"
              >
                {/* Optional top-edge highlight for that 3D card feel */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary-fixed/30 to-transparent opacity-50" />
                
                <div className="mb-6 md:mb-12">
                   {card.icon}
                </div>
                <h3 className="font-headline-md md:font-headline-lg text-[24px] md:text-[36px] leading-tight text-white font-medium mb-3 md:mb-4 tracking-tight">
                  {card.title}
                </h3>
                <p className="font-body-sm md:font-body-md text-[15px] md:text-[18px] leading-relaxed text-[#8a8a8a]">
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
