"use client";

import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { GlassCard } from "../ui/GlassCard";
import { Button } from "../ui/Button";
import { Home, Building2 } from "lucide-react";

export const QuoteForm = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    location: "",
    propertyType: "residential",
    purchaseType: "loan",
    usageType: "LKR",
    usageValue: "",
  });

  useGSAP(
    () => {
      gsap.fromTo(
        ".quote-form-element",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
    },
    { scope: containerRef }
  );

  const handleNext = () => {
    if (step < 2) setStep(step + 1);
  };

  return (
    <section ref={containerRef} className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-2xl mx-auto">
      <div className="text-center mb-12 quote-form-element">
        <h2 className="font-headline-lg text-[40px] md:text-headline-lg text-on-surface mb-4">
          Get Your Free Solar Quote
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Fill out the form below and our experts will contact you within 24 hours
        </p>
      </div>

      <GlassCard className="quote-form-element relative overflow-hidden p-8 md:p-12">
        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className={`w-3 h-3 rounded-full transition-colors ${step >= 1 ? 'bg-primary-fixed-dim shadow-[0_0_10px_rgba(163,255,18,0.5)]' : 'bg-white/20'}`} />
          <div className="w-16 h-px bg-white/20 relative">
            <div 
              className="absolute top-0 left-0 h-full bg-primary-fixed-dim transition-all duration-500" 
              style={{ width: step === 2 ? '100%' : '0%' }}
            />
          </div>
          <div className={`w-3 h-3 rounded-full transition-colors ${step >= 2 ? 'bg-primary-fixed-dim shadow-[0_0_10px_rgba(163,255,18,0.5)]' : 'bg-white/20'}`} />
        </div>

        {step === 1 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Location */}
            <div className="space-y-3">
              <label className="block font-label-caps text-label-caps text-on-surface uppercase tracking-wider">
                Your Location (City / Town)
              </label>
              <input 
                type="text" 
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className="w-full bg-surface-container-highest border border-outline-variant rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-primary-fixed-dim transition-colors"
                placeholder="Enter city or town"
              />
            </div>

            {/* Property Type */}
            <div className="space-y-3">
              <label className="block font-label-caps text-label-caps text-on-surface uppercase tracking-wider">
                Property Type
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setFormData({...formData, propertyType: 'residential'})}
                  className={`flex items-center justify-center gap-3 py-3 px-4 rounded-lg border transition-all ${
                    formData.propertyType === 'residential' 
                      ? 'border-primary-fixed-dim bg-primary-fixed-dim/10 text-primary-fixed-dim' 
                      : 'border-outline-variant bg-surface-container-highest text-on-surface hover:bg-white/5'
                  }`}
                >
                  <Home className="w-5 h-5" />
                  <span className="font-medium">Residential</span>
                </button>
                <button
                  onClick={() => setFormData({...formData, propertyType: 'commercial'})}
                  className={`flex items-center justify-center gap-3 py-3 px-4 rounded-lg border transition-all ${
                    formData.propertyType === 'commercial' 
                      ? 'border-primary-fixed-dim bg-primary-fixed-dim/10 text-primary-fixed-dim' 
                      : 'border-outline-variant bg-surface-container-highest text-on-surface hover:bg-white/5'
                  }`}
                >
                  <Building2 className="w-5 h-5" />
                  <span className="font-medium">Commercial</span>
                </button>
              </div>
            </div>

            {/* Leasing or Purchasing */}
            <div className="space-y-3">
              <label className="block font-label-caps text-label-caps text-on-surface uppercase tracking-wider">
                Are you interested in leasing or purchasing?
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setFormData({...formData, purchaseType: 'loan'})}
                  className={`py-3 px-4 rounded-lg border transition-all font-medium ${
                    formData.purchaseType === 'loan' 
                      ? 'border-primary-fixed-dim bg-primary-fixed-dim/10 text-primary-fixed-dim' 
                      : 'border-outline-variant bg-surface-container-highest text-on-surface hover:bg-white/5'
                  }`}
                >
                  Via a Loan
                </button>
                <button
                  onClick={() => setFormData({...formData, purchaseType: 'cash'})}
                  className={`py-3 px-4 rounded-lg border transition-all font-medium ${
                    formData.purchaseType === 'cash' 
                      ? 'border-primary-fixed-dim bg-primary-fixed-dim/10 text-primary-fixed-dim' 
                      : 'border-outline-variant bg-surface-container-highest text-on-surface hover:bg-white/5'
                  }`}
                >
                  Cash Purchase
                </button>
              </div>
            </div>

            {/* Electricity Usage */}
            <div className="space-y-3">
              <label className="block font-label-caps text-label-caps text-on-surface uppercase tracking-wider">
                Your Average Monthly Electricity Usage
              </label>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex rounded-lg border border-outline-variant overflow-hidden bg-surface-container-highest p-1 shrink-0">
                  <button
                    onClick={() => setFormData({...formData, usageType: 'LKR'})}
                    className={`flex-1 px-6 py-2 rounded-md font-medium transition-all ${
                      formData.usageType === 'LKR'
                        ? 'bg-[#141c25] text-primary-fixed-dim'
                        : 'text-on-surface hover:text-white'
                    }`}
                  >
                    LKR
                  </button>
                  <button
                    onClick={() => setFormData({...formData, usageType: 'Units'})}
                    className={`flex-1 px-6 py-2 rounded-md font-medium transition-all ${
                      formData.usageType === 'Units'
                        ? 'bg-[#141c25] text-primary-fixed-dim'
                        : 'text-on-surface hover:text-white'
                    }`}
                  >
                    Units
                  </button>
                </div>
                <input 
                  type="number" 
                  value={formData.usageValue}
                  onChange={(e) => setFormData({...formData, usageValue: e.target.value})}
                  className="w-full bg-surface-container-highest border border-outline-variant rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-primary-fixed-dim transition-colors"
                />
              </div>
            </div>

            {/* Next Button */}
            <div className="pt-6 flex justify-end">
              <button 
                onClick={handleNext}
                className="bg-[#0e9c5c] text-white font-bold px-10 py-4 rounded-lg hover:bg-[#0863a8] transition-all"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
             {/* Step 2 Placeholder for Contact Info */}
             <div className="text-center py-10">
                <h3 className="font-headline-md text-headline-md text-primary-fixed-dim mb-4">Almost There</h3>
                <p className="text-on-surface-variant">Please provide your contact details to receive the quote.</p>
             </div>
             
             <div className="space-y-4">
               <input 
                  type="text" 
                  placeholder="Full Name"
                  className="w-full bg-surface-container-highest border border-outline-variant rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-primary-fixed-dim transition-colors"
                />
                <input 
                  type="email" 
                  placeholder="Email Address"
                  className="w-full bg-surface-container-highest border border-outline-variant rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-primary-fixed-dim transition-colors"
                />
                <input 
                  type="tel" 
                  placeholder="Phone Number"
                  className="w-full bg-surface-container-highest border border-outline-variant rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-primary-fixed-dim transition-colors"
                />
             </div>

             <div className="pt-6 flex justify-between">
              <button 
                onClick={() => setStep(1)}
                className="text-on-surface-variant font-medium hover:text-white transition-colors"
              >
                Back
              </button>
              <button 
                className="bg-[#0e9c5c] text-white font-bold px-10 py-4 rounded-lg hover:bg-[#0863a8] transition-all"
              >
                Submit Request
              </button>
            </div>
          </div>
        )}
      </GlassCard>
    </section>
  );
};
