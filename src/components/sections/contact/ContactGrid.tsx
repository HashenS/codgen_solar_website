"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { GlassCard } from "../../ui/GlassCard";
import { MapPin, Network, Mail } from "lucide-react";
import { Button } from "../../ui/Button";

export const ContactGrid = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".contact-element",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
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
    <section ref={containerRef} className="px-margin-mobile md:px-margin-desktop py-section-gap max-w-container-max mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        {/* Contact Form Column */}
        <div className="lg:col-span-7 contact-element">
          <GlassCard className="p-8 md:p-12 rounded-xl h-full border border-white/10">
            <h2 className="font-headline-lg text-white mb-8">Inquiry Portal</h2>
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest">Full Name</label>
                  <input 
                    type="text" 
                    aria-label="Full Name"
                    placeholder="John Doe"
                    className="w-full bg-surface-container-low border border-white/10 rounded-lg px-4 py-4 text-white focus:outline-none focus:border-primary-fixed focus:shadow-[0_0_15px_rgba(159,251,6,0.2)] transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest">Corporate Email</label>
                  <input 
                    type="email" 
                    aria-label="Corporate Email"
                    placeholder="john@company.com"
                    className="w-full bg-surface-container-low border border-white/10 rounded-lg px-4 py-4 text-white focus:outline-none focus:border-primary-fixed focus:shadow-[0_0_15px_rgba(159,251,6,0.2)] transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest">Inquiry Type</label>
                <select aria-label="Inquiry Type" className="w-full bg-surface-container-low border border-white/10 rounded-lg px-4 py-4 text-white focus:outline-none focus:border-primary-fixed focus:shadow-[0_0_15px_rgba(159,251,6,0.2)] transition-all appearance-none">
                  <option>Technical Audit</option>
                  <option>Commercial Consultation</option>
                  <option>Project Partnership</option>
                  <option>Residential Engineering</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest">Project Brief</label>
                <textarea 
                  rows={4} 
                  aria-label="Project Brief"
                  placeholder="Describe your vision or technical requirements..."
                  className="w-full bg-surface-container-low border border-white/10 rounded-lg px-4 py-4 text-white focus:outline-none focus:border-primary-fixed focus:shadow-[0_0_15px_rgba(159,251,6,0.2)] transition-all"
                ></textarea>
              </div>

              <Button variant="primary" className="w-full py-5 text-body-md font-bold hover:shadow-[0_0_30px_rgba(159,251,6,0.4)]">
                Initiate Consultation
              </Button>
            </form>
          </GlassCard>
        </div>

        {/* Corporate Details Column */}
        <div className="lg:col-span-5 space-y-12">
          <div className="space-y-6 contact-element">
            <h3 className="font-headline-md text-primary-fixed drop-shadow-[0_0_20px_rgba(14,156,92,0.4)]">Global Hubs</h3>
            
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 shrink-0 flex items-center justify-center rounded-lg bg-surface-container-high border border-white/5">
                  <MapPin className="text-primary-fixed w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-headline-md text-white text-lg mb-1">Head Office</h4>
                  <p className="text-on-surface-variant text-body-md">Trace Expert City, Bay 1-5,</p>
                  <p className="text-on-surface-variant text-body-md">Maradana Rd, Colombo</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 shrink-0 flex items-center justify-center rounded-lg bg-surface-container-high border border-white/5">
                  <Network className="text-primary-fixed w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-headline-md text-white text-lg mb-1">Working Hours</h4>
                  <p className="text-on-surface-variant text-body-md">Mon to Fri</p>
                  <p className="text-on-surface-variant text-body-md">8:30am - 5:00pm</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 shrink-0 flex items-center justify-center rounded-lg bg-surface-container-high border border-white/5">
                  <Mail className="text-primary-fixed w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-headline-md text-white text-lg mb-1">Contact Information</h4>
                  <p className="text-on-surface-variant text-body-md">info@codegensolar.com</p>
                  <p className="text-on-surface-variant text-body-md">(+94) 114 222 501</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map/Visual Section */}
          <div className="relative group cursor-crosshair contact-element">
            <div className="absolute inset-0 bg-primary-fixed/10 opacity-0 group-hover:opacity-20 transition-opacity duration-700 rounded-xl z-10 pointer-events-none"></div>
            <div className="h-64 w-full relative rounded-xl overflow-hidden border border-white/10">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQvSQ344LwVjJlN2cu30TN8Chg7lp-vtrMEM9y516tPPDkzu-X0PfG_ykII_KNDvEL0yug6-WVAQ-_rceJFAJGYuynSYlAxsw8AeIBMxRlLs2sGYCtsX6EeMu29XM9L-BKhY1Ajn4tTuxtiTfilebod_0AxBmWtl4T3rODYNVwLvY-fTPWQXqullQZGtfabeeFkuSqcb9qu5qHJbJcXngO1WEwCCDesbUjkUvwxJIHpPm4rn8_y-Kc0oFnmY8O7xFbWGd7HoPaej_p"
                alt="Regional hub location"
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="absolute bottom-4 left-4 bg-surface/80 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 z-20 border border-white/10">
              <span className="w-2 h-2 bg-primary-fixed rounded-full animate-pulse shadow-[0_0_10px_rgba(159,251,6,0.8)]"></span>
              <span className="text-xs font-label-caps text-white tracking-widest">GLOBAL GRID ACTIVE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
