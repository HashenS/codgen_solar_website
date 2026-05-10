"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { BatteryFull, Activity } from "lucide-react";

export const IntegratedTechnology = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".integrated-tech-image", {
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      });

      gsap.from(".integrated-tech-content", {
        x: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto overflow-hidden">
      <div className="flex flex-col md:flex-row items-center gap-20">
        <div className="flex-1 integrated-tech-image relative h-[600px] w-full">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkQ5PFn9zP6fwybcpNdP1kmDdt7k4e6Roco4UGW42BLxqALQoansQfprnYObGQbL8pEXQXwH1rBbyvhLBH8mMcMQhRtB0_xrIoKEqIuyomggFU5ffgJJxSRtcvneDrGcuwsNHMX9xymWdiBTpNsxlXheW9rMBKsqpMRw_xLG1tsbw1wJnQSyBU4EtrPgvAedBO6OR6mfz6YYglDzt9Kza1w_cE0T_2mPpl2Q0SbqSLCt_APZkb8FMpew7Uu9px1UolK5XN4pchD6OT"
            alt="LuminousCore Battery Storage Unit"
            fill
            className="rounded-2xl shadow-2xl object-cover"
          />
        </div>
        <div className="flex-1 space-y-12">
          <div className="integrated-tech-content">
            <span className="font-label-caps text-label-caps text-primary-fixed-dim tracking-widest block mb-4 uppercase">
              The Core Stack
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-6">
              Unified Intelligence
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Every system we design is powered by our proprietary hardware
              ecosystem, ensuring 100% compatibility and zero latency in energy
              transfer.
            </p>
          </div>

          <div className="space-y-8">
            <div className="integrated-tech-content flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 glass-panel flex items-center justify-center rounded-lg border-primary-fixed-dim/30">
                <BatteryFull className="text-primary-fixed-dim w-6 h-6" />
              </div>
              <div>
                <h4 className="font-headline-md text-headline-md text-on-surface mb-2">
                  LuminousCore Battery
                </h4>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  High-density solid-state storage with 25-year performance
                  guarantee.
                </p>
              </div>
            </div>

            <div className="integrated-tech-content flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 glass-panel flex items-center justify-center rounded-lg border-primary-fixed-dim/30">
                <Activity className="text-primary-fixed-dim w-6 h-6" />
              </div>
              <div>
                <h4 className="font-headline-md text-headline-md text-on-surface mb-2">
                  Nexus OS Monitoring
                </h4>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  AI-driven energy orchestration that predicts consumption
                  patterns.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
