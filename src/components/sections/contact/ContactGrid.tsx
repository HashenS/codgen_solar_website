"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { GlassCard } from "../../ui/GlassCard";
import { MapPin, Network, Mail } from "lucide-react";
import { Button } from "../../ui/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const contactSchema = z.object({
  fullName: z.string().min(5, "Name is required (at least 2 characters)"),
  email: z.string().email("Please enter a valid corporate email"),
  inquiryType: z.string().min(1, "Please select an inquiry type"),
  projectBrief: z.string().min(10, "Please provide more details (at least 10 characters)"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export const ContactGrid = () => {
  const containerRef = useRef<HTMLElement>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      email: "",
      inquiryType: "Technical Audit",
      projectBrief: "",
    }
  });

  const onSubmit = async (data: ContactFormValues) => {
    // Simulate an API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Form Submitted:", data);
    alert("Inquiry submitted successfully!");
  };

  useGSAP(
    () => {
      gsap.fromTo(
        ".contact-element",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.05,
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
            <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest">Full Name</label>
                  <input 
                    type="text" 
                    {...register("fullName")}
                    aria-label="Full Name"
                    placeholder="John Doe"
                    className={`w-full bg-surface-container-low border ${errors.fullName ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-4 text-white focus:outline-none focus:border-primary-fixed focus:shadow-[0_0_15px_rgba(159,251,6,0.2)] transition-all`}
                  />
                  {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest">Corporate Email</label>
                  <input 
                    type="email" 
                    {...register("email")}
                    aria-label="Corporate Email"
                    placeholder="john@company.com"
                    className={`w-full bg-surface-container-low border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-4 text-white focus:outline-none focus:border-primary-fixed focus:shadow-[0_0_15px_rgba(159,251,6,0.2)] transition-all`}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest">Inquiry Type</label>
                <select 
                  {...register("inquiryType")} 
                  aria-label="Inquiry Type" 
                  className={`w-full bg-surface-container-low border ${errors.inquiryType ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-4 text-white focus:outline-none focus:border-primary-fixed focus:shadow-[0_0_15px_rgba(159,251,6,0.2)] transition-all appearance-none`}
                >
                  <option value="Technical Audit">Technical Audit</option>
                  <option value="Commercial Consultation">Commercial Consultation</option>
                  <option value="Project Partnership">Project Partnership</option>
                  <option value="Residential Engineering">Residential Engineering</option>
                </select>
                {errors.inquiryType && <p className="text-red-500 text-sm mt-1">{errors.inquiryType.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest">Project Brief</label>
                <textarea 
                  rows={4} 
                  {...register("projectBrief")}
                  aria-label="Project Brief"
                  placeholder="Describe your vision or technical requirements..."
                  className={`w-full bg-surface-container-low border ${errors.projectBrief ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-4 text-white focus:outline-none focus:border-primary-fixed focus:shadow-[0_0_15px_rgba(159,251,6,0.2)] transition-all`}
                ></textarea>
                {errors.projectBrief && <p className="text-red-500 text-sm mt-1">{errors.projectBrief.message}</p>}
              </div>

              <Button type="submit" disabled={isSubmitting} variant="primary" className="w-full py-5 text-body-md font-bold hover:shadow-[0_0_30px_rgba(159,251,6,0.4)] disabled:opacity-50">
                {isSubmitting ? "Submitting..." : "Initiate Consultation"}
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
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.6748038052287!2d79.85848017589655!3d6.929417993070427!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25927e44cd567%3A0xb7badf48e5a10763!2sCodeGen%20Solar!5e0!3m2!1sen!2slk!4v1779001869676!5m2!1sen!2slk" 
                className="w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700"
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
