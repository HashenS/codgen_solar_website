"use client";

import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ChevronDown, Zap, ShieldCheck, DollarSign, Wrench } from "lucide-react";

const faqs = [
  {
    id: 1,
    question: "What is the primary difference between on-grid and off-grid solutions?",
    answer: "On-grid systems are connected to the public utility grid, allowing you to use solar energy during the day and grid power at night, often benefiting from net metering. Off-grid systems are entirely autonomous, requiring high-capacity battery storage like our Kinetic Lumina Core to provide power 24/7 without external utility reliance.",
    tag: null
  },
  {
    id: 2,
    question: "How does the ROI calculation account for seasonal variance?",
    answer: "Our proprietary Codegen Analytics engine uses 20 years of localized meteorological data to project annual generation. We account for shorter winter days and lower sun angles, ensuring your 6-8 year ROI projection remains accurate across all four seasons.",
    tag: null
  },
  {
    id: 3,
    question: "What are the specific terms of the 25-year Performance Guarantee?",
    answer: "Codegen Solar guarantees that our Tier 1 monocrystalline panels will maintain at least 85% of their original nameplate power capacity after 25 years of operation. If production falls below this threshold, we provide hardware replacement and labor at zero cost to the owner.",
    tag: null
  },
  {
    id: 4,
    question: "Can I integrate EV charging into an existing residential installation?",
    answer: "Absolutely. Our systems are designed with a modular architecture. We can integrate Level 2 fast-charging stations (7kW to 22kW) into your existing Smart Inverter setup at any time.",
    tag: ["RESIDENTIAL", "EV READY"]
  }
];

export const KnowledgeBase = () => {
  const [openId, setOpenId] = useState<number | null>(1);
  const [activeTab, setActiveTab] = useState("Systems");
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".kb-sidebar",
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );

      gsap.fromTo(
        ".kb-item",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
      {/* Sidebar Navigation */}
      <aside className="kb-sidebar hidden lg:block lg:col-span-3 sticky top-[140px] h-fit">
        <div className="flex flex-col gap-2">
          <button 
            onClick={() => setActiveTab("Systems")}
            className={`flex items-center gap-3 px-6 py-4 rounded-xl font-headline-md text-[18px] transition-all ${activeTab === "Systems" ? "bg-primary-container text-on-primary-container" : "text-on-surface-variant hover:bg-surface-container"}`}
          >
            <Zap className={activeTab === "Systems" ? "fill-current" : ""} />
            Systems
          </button>
          <button 
            onClick={() => setActiveTab("Warranties")}
            className={`flex items-center gap-3 px-6 py-4 rounded-xl font-headline-md text-[18px] transition-all ${activeTab === "Warranties" ? "bg-primary-container text-on-primary-container" : "text-on-surface-variant hover:bg-surface-container"}`}
          >
            <ShieldCheck className={activeTab === "Warranties" ? "fill-current" : ""} />
            Warranties
          </button>
          <button 
            onClick={() => setActiveTab("Financials")}
            className={`flex items-center gap-3 px-6 py-4 rounded-xl font-headline-md text-[18px] transition-all ${activeTab === "Financials" ? "bg-primary-container text-on-primary-container" : "text-on-surface-variant hover:bg-surface-container"}`}
          >
            <DollarSign className={activeTab === "Financials" ? "fill-current" : ""} />
            Financials
          </button>
          <button 
            onClick={() => setActiveTab("Installation")}
            className={`flex items-center gap-3 px-6 py-4 rounded-xl font-headline-md text-[18px] transition-all ${activeTab === "Installation" ? "bg-primary-container text-on-primary-container" : "text-on-surface-variant hover:bg-surface-container"}`}
          >
            <Wrench className={activeTab === "Installation" ? "fill-current" : ""} />
            Installation
          </button>
        </div>
      </aside>

      {/* Accordion List */}
      <div className="col-span-1 lg:col-span-9 flex flex-col gap-6">
        <h2 className="font-headline-lg text-headline-lg text-primary mb-4 kb-item">On-Grid & Off-Grid Systems</h2>
        
        {faqs.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div 
              key={faq.id} 
              className={`kb-item bg-surface/70 backdrop-blur-xl border-t border-white/10 rounded-2xl p-8 group transition-all duration-500 ease-in-out ${isOpen ? "border border-primary-fixed/30 shadow-[0_0_20px_rgba(159,251,6,0.05)]" : "hover:border-primary-fixed/50 hover:shadow-[0_0_20px_rgba(159,251,6,0.1)]"}`}
            >
              <div 
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setOpenId(isOpen ? null : faq.id)}
              >
                <h3 className={`font-headline-md text-headline-md pr-8 transition-colors ${isOpen ? "text-primary-fixed" : "text-primary group-hover:text-primary-fixed"}`}>
                  {faq.question}
                </h3>
                <ChevronDown 
                  className={`text-primary-fixed shrink-0 w-8 h-8 transition-transform duration-500 ${isOpen ? "rotate-180" : "group-hover:-translate-y-1"}`} 
                />
              </div>
              
              <div 
                className={`grid transition-all duration-500 ease-in-out ${isOpen ? "grid-rows-[1fr] mt-6 pt-6 border-t border-white/5 opacity-100" : "grid-rows-[0fr] opacity-0"}`}
              >
                <div className="overflow-hidden">
                  <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                    {faq.answer}
                  </p>
                  {faq.tag && (
                    <div className="flex gap-4 mt-4">
                      {faq.tag.map(t => (
                        <span key={t} className="px-3 py-1 bg-surface-container-high rounded text-[12px] font-label-caps text-primary-fixed uppercase tracking-widest">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
