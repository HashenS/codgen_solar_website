"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Button } from "../../ui/Button";

export const AboutHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.from(bgRef.current, {
        scale: 1.1,
        duration: 3,
        ease: "power2.out",
      });

      tl.from(
        ".about-hero-element",
        {
          y: 40,
          opacity: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
        },
        "-=2"
      );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden pt-24">
      <div className="absolute inset-0 z-0">
        <Image
          ref={bgRef}
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPd0X0S9fTlCjUEfDeVPZD2rhzgimVl36hlc3mBmPeeoX32twx1vq2uQCMj_K2yKAHlhw-vkqfLW530lkly_Yx0JZdOXxVQQPMylVKZLdUcn_yqunO-4pcMlP9GhssSm8vPFicGzmNxpAnXphgA89lvgXO7adeHFYpiN0jZSsNQilF77ldHmXSatf6c5NNS_SmWOvQO0xHgSeaLkHR5aoYSwwLpaV0Jw03YwBC-cRmgfQM0CaI-YkrqrAtfCfN1YYVzI4zU5fBC8UV"
          alt="Solar facility"
          fill
          className="object-cover opacity-50 transform-gpu"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
      </div>

      <div className="relative z-10 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center">
        <span className="about-hero-element font-label-caps text-label-caps text-primary-fixed-dim mb-4 block uppercase tracking-widest">
          Beyond Automotive
        </span>
        <h1 className="about-hero-element font-display-hero text-[40px] md:text-display-hero text-primary mb-6 leading-tight">
          Engineering the <br className="hidden md:block" />{" "}
          <span className="bg-gradient-to-r from-white to-primary-fixed bg-clip-text text-transparent">
            Renewable Revolution.
          </span>
        </h1>
        <p className="about-hero-element font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-10">
          From the makers of the world's first electric supercar comes a new era
          of energy independence. Precision engineering meets sustainable vision.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Button variant="primary" className="about-hero-element uppercase tracking-wider px-10">
            DISCOVER OUR TECH
          </Button>
        </div>
      </div>
    </section>
  );
};
