"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Plus, Minus } from "lucide-react";
import { GlassCard } from "../ui/GlassCard";
import { EnergyTextReveal } from "../ui/EnergyTextReveal";

const faqs = [
  {
    question: "What is Hybrid Resilience technology?",
    answer: "Hybrid Resilience is our proprietary energy architecture that seamlessly integrates solar harvesting, battery storage, and grid connection. It intelligently switches between power sources in milliseconds to ensure uninterrupted power."
  },
  {
    question: "How long does the Nexus core installation take?",
    answer: "A standard installation takes 1-2 days. Our elite engineering team handles everything from permitting to final grid integration with minimal disruption to your home."
  },
  {
    question: "Can I go completely off-grid?",
    answer: "While our system allows for significant self-sufficiency (often 95%+), maintaining a grid connection provides the ultimate safety net and allows you to sell excess power back during peak demand."
  },
  {
    question: "What happens during a blackout?",
    answer: "Your system detects grid failure in under 10 milliseconds and instantly switches to battery power. You will not experience a disruption in power, and your essential appliances will continue to run smoothly."
  }
];

export const FAQ = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useGSAP(() => {
    gsap.from(".faq-item", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
      <div className="text-center mb-16">
        <EnergyTextReveal 
          text="Common Inquiries" 
          className="font-display-hero font-bold tracking-tight text-3xl md:text-5xl lg:text-6xl mb-3 md:mb-6" 
          blueWords={["Inquiries"]}
        />
        <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto mt-4">
          Everything you need to know about our technology, installation, and intelligent energy management.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="faq-item">
              <GlassCard 
                className="p-6 cursor-pointer transition-colors hover:bg-white/5"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
              >
                <div className="flex justify-between items-center">
                  <h4 className="font-headline-md text-xl text-primary">{faq.question}</h4>
                  <div className="text-primary-fixed ml-4 shrink-0">
                    {isOpen ? <Minus /> : <Plus />}
                  </div>
                </div>
                <div 
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-48 mt-4 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <p className="font-body-md text-on-surface-variant">
                    {faq.answer}
                  </p>
                </div>
              </GlassCard>
            </div>
          );
        })}
      </div>
    </section>
  );
};
