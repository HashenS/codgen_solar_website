"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ShieldCheck, CloudLightning } from "lucide-react";

export const PeaceOfMind = () => {
  const containerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const auraRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Initial Blackout State
      gsap.set(imageContainerRef.current, { filter: "brightness(0.2) grayscale(0.8)", scale: 0.95 });
      gsap.set(auraRef.current, { opacity: 0, scale: 0.8 });
      gsap.set(headingRef.current, { opacity: 0 });
      gsap.set(".pom-text", { y: 40, opacity: 0 });



      // The Power-On Sequence
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        },
      });

      // 1. Neon Flicker on the heading
      tl.to(headingRef.current, { opacity: 1, duration: 0.05, ease: "none" })
        .to(headingRef.current, { opacity: 0.3, duration: 0.05, ease: "none" })
        .to(headingRef.current, { opacity: 1, duration: 0.05, ease: "none" })
        .to(headingRef.current, { opacity: 0.5, duration: 0.05, ease: "none" })
        .to(headingRef.current, { opacity: 1, duration: 0.1, ease: "none" });

      // 2. The Surge! (Image flashes on and snaps up)
      tl.to(imageContainerRef.current, {
        filter: "brightness(1) grayscale(0)",
        scale: 1,
        duration: 1.5,
        ease: "elastic.out(1, 0.4)",
      }, "+=0.1")
      
      // 3. Aura flares up in sync
      .to(auraRef.current, {
        opacity: 0.6,
        scale: 1,
        duration: 1.5,
        ease: "elastic.out(1, 0.4)",
      }, "<")
      
      // 4. Stagger in the feature texts
      .to(".pom-text", {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      }, "<0.2");
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="py-section-gap bg-surface-container-lowest overflow-hidden">
      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <div>
          <h2 ref={headingRef} className="font-headline-lg text-headline-lg text-primary mb-8">
            Zero Downtime.<br />
            <span className="text-primary-fixed-dim">Zero Compromise.</span>
          </h2>
          <div className="space-y-6">
            <div className="pom-text flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary-fixed/10 flex items-center justify-center shrink-0">
                <ShieldCheck className="text-primary-fixed w-6 h-6" />
              </div>
              <div>
                <h5 className="font-headline-md text-headline-md text-primary mb-1">
                  100% Uptime Guarantee
                </h5>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  While neighbors are in the dark, your Hybrid Resilience system
                  engages instantly, powering your entire home's essential circuits.
                </p>
              </div>
            </div>

            <div className="pom-text flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary-fixed/10 flex items-center justify-center shrink-0">
                <CloudLightning className="text-primary-fixed w-6 h-6" />
              </div>
              <div>
                <h5 className="font-headline-md text-headline-md text-primary mb-1">
                  AI-Powered Forecasting
                </h5>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  System monitors weather patterns and pre-charges batteries if an
                  outage-causing storm is detected in your area.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          {/* Vibrant Blurred Energy Glow */}
          <div ref={auraRef} className="absolute -inset-10 bg-primary-fixed/30 blur-[80px] rounded-[3rem]"></div>
          <div ref={imageContainerRef} className="relative rounded-3xl overflow-hidden glass-panel aspect-[4/3]">
            <Image
              ref={imageRef}
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBauVn8HrkMnkKEGQDbpvVGUrO24jyy4KBZoQ5UU4flFHGt0o85tHenCRZw0pIvCZP-NY5SHO62ukQtB_d6rqFbW6C9T0RXDf4WimbAFCodGdY5s4fotCioPBtNNPDzHOMWM0Jmt3vemCZUlPY0X0STga_-ldl1xev8hNEaVzF0Wt-ygmBhqg1K4l9ETN7-iT519YPSS6n8_3FIJFESXN-ifNjXWJYpTKYQG1BDgk_5vqeqdRZbsFPXZe75_0r6jb4OQlYfY0EwUGr0"
              alt="High-tech smart home during a dark, stormy night."
              fill
              className="object-cover scale-110"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
