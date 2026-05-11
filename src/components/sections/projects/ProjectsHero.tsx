"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Button } from "../../ui/Button";

export const ProjectsHero = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.fromTo(
        ".hero-image",
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 0.4, duration: 2, ease: "power2.out" }
      )
        .fromTo(
          ".hero-badge",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=1.5"
        )
        .fromTo(
          ".hero-title",
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
          "-=1.2"
        )
        .fromTo(
          ".hero-desc",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.8"
        )
        .fromTo(
          ".hero-btn",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out" },
          "-=0.6"
        );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="relative min-h-[716px] flex items-center pt-32 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background z-10"></div>
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdRkVFEYNKhYzWpe2ob72FsCY0dZyRg5iOMK1vspfTnY50Ix_urP5tnU6Ofe7WvifMcdjliIVAHPbFtm3C-tuRdwFs1JsQYaYMuLkv2M7kDSqnVrM1oMjWNRoXE1TSTkl8FDQfUEjcybOkXTye0RG_ZYXznX9CnMBJ6QCvAcFmLyNMOy0y_dojZ0IU11D3hvlIuq6q93RCtIWJ_l3IPNHtjOGgynGBWaOIw5_Z_UDiNdN9__4PYmuFaGBQTMOPT8soqohdsYy_WhEp"
          alt="Engineering the Renewable Revolution"
          fill
          priority
          className="hero-image object-cover"
        />
      </div>
      <div className="relative z-20 w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="max-w-3xl">
          <span className="hero-badge inline-block px-4 py-1.5 mb-6 glass-panel rounded-full text-primary-fixed font-label-caps text-label-caps tracking-widest uppercase">
            THE FUTURE OF CLEAN ENERGY
          </span>
          <h1 className="hero-title font-display-hero text-[40px] leading-[48px] md:text-display-hero text-primary mb-8">
            Engineering the Renewable Revolution
          </h1>
          <p className="hero-desc font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-2xl">
            Codegen Solar delivers precision-engineered photovoltaic ecosystems
            designed for global impact. From massive industrial grids to bespoke
            residential arrays, we define the architecture of sustainability.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" className="hero-btn text-body-md px-8 py-4">
              Explore Projects
            </Button>
            <Button variant="glass" className="hero-btn text-body-md px-8 py-4">
              Technical Specs
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
