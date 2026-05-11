"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Button } from "../ui/Button";

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // Subtle zoom out on the background video on load
      tl.fromTo(
        videoRef.current,
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 0.6, duration: 3, ease: "power2.out" }
      );

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

      // Scrub video playback with GSAP ScrollTrigger
      const video = videoRef.current;
      if (video) {
        const setupScrollScrub = () => {
          // Set a defined end scroll distance, e.g. 3000px, so there's plenty of scroll room to play the video
          gsap.to(video, {
            currentTime: video.duration || 5, // Fallback duration
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "+=3000", // Much longer scroll distance to make the playback slower/smoother
              scrub: 1.5, // Adding a scrub delay (1.5s) massively smooths out video playback
              pin: true, // This locks the hero in place until the scroll distance is covered
              pinSpacing: true, // Forces following sections to wait
            },
          });
        };

        if (video.readyState >= 1) {
          setupScrollScrub();
        } else {
          video.addEventListener("loadedmetadata", setupScrollScrub);
          return () => video.removeEventListener("loadedmetadata", setupScrollScrub);
        }
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center pt-24 overflow-hidden"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0 bg-[#050505]">
        <video
          ref={videoRef}
          src="/hero_video.mp4"
          muted
          playsInline
          className="w-full h-full object-cover opacity-60 transform-gpu"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
      </div>

      <div className="relative z-10 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full flex flex-col md:flex-row justify-between items-end gap-12 pb-20">
        <div className="max-w-2xl">
          <span className="hero-element inline-block px-4 py-1 rounded-full border border-primary-fixed/30 text-primary-fixed font-label-caps text-label-caps mb-6 bg-primary-fixed/10 backdrop-blur-md">
            HYBRID RESILIENCE
          </span>
          <h1 className="hero-element font-display-hero text-display-hero text-primary mb-0 leading-none drop-shadow-2xl">
            The Ultimate <br/><span className="text-primary-fixed-dim drop-shadow-[0_0_15px_rgba(159,251,6,0.3)]">Safety Net.</span>
          </h1>
        </div>
        
        <div className="max-w-xl flex flex-col gap-8">
          <p className="hero-element font-body-lg text-body-lg text-on-surface-variant drop-shadow-md">
            Experience uninterrupted power with Codegen Solar's Hybrid Resilience.
            A tri-mode energy architecture that bridges the gap between solar,
            storage, and the grid.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="primary" className="hero-element w-full sm:w-auto shadow-[0_0_20px_rgba(159,251,6,0.3)]">
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
