"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Button } from "../ui/Button";

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // Subtle zoom on the background image
      tl.from(bgRef.current, {
        scale: 1.1,
        duration: 3,
        ease: "power2.out",
      });

      // Stagger elements inside the hero content
      tl.from(
        ".hero-element",
        {
          y: 30,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
        },
        "-=2"
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center pt-24 overflow-hidden"
    >
      {/* Background Image / Video Placeholder */}
      <div className="absolute inset-0 z-0">
        <Image
          ref={bgRef}
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5k-GEOv_yKX87tPua0fGcbIl4ubkfamU4AMyjFkO_q-JoiQucKb6pgIA9Um1Asw6j96ExQ8EisVk3Vuqj_C_cgNveZiGXV4hLARfwsFVgQG7_zpu6naEoZi2LJ4mNIpiEQdQxPwyF_uP8Ihl64LZtWixXRB3U-nEgodROSlYerFdM-DdAGKz8SkLLKX_-_Vyn1V4mZmdp0T2sqmWykRCX4qWFZwiRaJghwEp_GciWetdv5J4OqOTG4vttQAQUNgUODGVvBqCcMn1n"
          alt="Architectural modern home with solar panels"
          fill
          className="object-cover opacity-40 transform-gpu"
          priority
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
      </div>

      <div className="relative z-10 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
        <div className="max-w-3xl">
          <span className="hero-element inline-block px-4 py-1 rounded-full border border-primary-fixed/30 text-primary-fixed font-label-caps text-label-caps mb-6 bg-primary-fixed/10">
            HYBRID RESILIENCE
          </span>
          <h1 className="hero-element font-display-hero text-display-hero text-primary mb-8 leading-none">
            The Ultimate <span className="text-primary-fixed-dim">Safety Net.</span>
          </h1>
          <p className="hero-element font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-xl">
            Experience uninterrupted power with Codegen Solar's Hybrid Resilience.
            A tri-mode energy architecture that bridges the gap between solar,
            storage, and the grid.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="primary" className="hero-element w-full sm:w-auto">
              Explore System
            </Button>
            <Button variant="glass" className="hero-element w-full sm:w-auto">
              Watch Technical Film
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
