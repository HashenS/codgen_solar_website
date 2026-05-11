"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export const ContactHero = () => {
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
        );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="relative min-h-[614px] flex items-center px-margin-mobile md:px-margin-desktop overflow-hidden pt-32">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050505] z-10"></div>
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlqLlU5C8e8shsY3jHzQLhEW2O3MnSQ6omWAF1TeLDngjeMZwP66fMvsjHvyX1vjJpNhOmnLZojpzJNGXRN-UEFnZPdKBivK5bnpNI5-lAKeXR3WTGe8T2LeILOeBK_WqbGekbvPstpCV9978GlqJ7f1kXRuJTquHSR7nuZj5QIs44BvCdkF1pjJ7Rti0__-sLfu6ZthhWCegRfelth7XUVu9JLWp6bu1rT7Kc-nl1CQWp1qmCpyh8NfU8XK25isSeY9gTgEv2dIFU"
          alt="Cinematic solar installation"
          fill
          priority
          className="hero-image object-cover"
        />
      </div>
      <div className="relative z-20 max-w-4xl max-w-container-max mx-auto w-full">
        <h1 className="hero-title font-display-hero text-display-hero text-white mb-6 leading-none">
          Connect with <span className="text-primary-fixed">Infinite</span> Potential.
        </h1>
        <p className="hero-desc font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
          Whether you're looking for a large-scale commercial integration or a
          bespoke residential array, our engineering team is ready to redefine
          your energy footprint.
        </p>
      </div>
    </section>
  );
};
