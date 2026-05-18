"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowLeft, MapPin, Zap, Building2 } from "lucide-react";
import { Project } from "@/data/projects";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/sections/Footer";
import { EnergyTextReveal } from "@/components/ui/EnergyTextReveal";

interface ProjectClientProps {
  project: Project;
}

export const ProjectClient = ({ project }: ProjectClientProps) => {
  const containerRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Parallax hero image
    gsap.to(".hero-parallax", {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    });

    // Animate content reveal
    gsap.fromTo(
      ".reveal-elem",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.2
      }
    );

    // Big image expand effect
    gsap.utils.toArray(".gallery-big").forEach((elem: any) => {
      gsap.fromTo(elem,
        { scale: 0.3, opacity: 0, transformOrigin: "center center" },
        {
          scale: 1,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: elem,
            start: "top bottom",
            end: "center center",
            scrub: 1.5,
          }
        }
      );
    });

    // Left images slide in
    gsap.utils.toArray(".gallery-left").forEach((elem: any) => {
      gsap.fromTo(elem,
        { x: -150, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: elem,
            start: "top bottom",
            end: "center center",
            scrub: 1.5,
          }
        }
      );
    });

    // Right images slide in
    gsap.utils.toArray(".gallery-right").forEach((elem: any) => {
      gsap.fromTo(elem,
        { x: 150, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: elem,
            start: "top bottom",
            end: "center center",
            scrub: 1.5,
          }
        }
      );
    });
  }, { scope: containerRef });

  return (
    <main className="flex min-h-screen flex-col bg-background text-on-background relative" ref={containerRef}>
      <Navbar />
      
      {/* Hero Section */}
      <div ref={heroRef} className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden mt-20 md:mt-24">
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          priority
          className="hero-parallax object-cover object-center grayscale-[20%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-black/30 pointer-events-none" />
        
        <div className="absolute inset-0 flex flex-col justify-end px-margin-mobile md:px-margin-desktop pb-16 md:pb-24 max-w-container-max mx-auto w-full z-10">
          <Link href="/#projects" className="reveal-elem inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors w-fit mb-6 md:mb-8 font-label-caps tracking-widest text-xs uppercase">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          
          <div className="reveal-elem mb-4">
            <span className="px-3 py-1 rounded-full border border-primary-fixed/30 bg-primary-fixed/10 text-primary-fixed font-label-caps text-xs tracking-widest">
              {project.category}
            </span>
          </div>
          
          <div className="reveal-elem">
            <EnergyTextReveal 
              text={project.title} 
              className="font-display-hero font-bold tracking-tight text-4xl md:text-6xl lg:text-7xl mb-4 max-w-4xl"
              blueWords={project.blueWords || []}
            />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <section className="py-16 md:py-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full z-20 relative bg-background">
        
        {/* Project Meta Bar */}
        <div className="reveal-elem grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-16 md:mb-24 p-6 md:p-8 rounded-3xl border border-white/5 bg-surface-container-low/50 backdrop-blur-md">
          <div className="flex flex-col gap-2">
            <span className="flex items-center gap-2 text-on-surface-variant font-label-caps text-[10px] tracking-widest">
              <Zap className="w-4 h-4 text-primary-fixed" /> CAPACITY
            </span>
            <span className="font-headline-md text-xl md:text-2xl text-white">{project.capacity}</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="flex items-center gap-2 text-on-surface-variant font-label-caps text-[10px] tracking-widest">
              <MapPin className="w-4 h-4 text-primary-fixed" /> LOCATION
            </span>
            <span className="font-headline-md text-xl md:text-2xl text-white">{project.location}</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="flex items-center gap-2 text-on-surface-variant font-label-caps text-[10px] tracking-widest">
              <Building2 className="w-4 h-4 text-primary-fixed" /> CATEGORY
            </span>
            <span className="font-headline-md text-xl md:text-2xl text-white">{project.category}</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="flex items-center gap-2 text-on-surface-variant font-label-caps text-[10px] tracking-widest">
              <div className="w-2 h-2 rounded-full bg-primary-fixed animate-pulse" /> STATUS
            </span>
            <span className="font-headline-md text-xl md:text-2xl text-white">Online & Monitored</span>
          </div>
        </div>

        {/* Description */}
        <div className="reveal-elem max-w-3xl mb-24 md:mb-32">
          <h2 className="font-headline-lg text-3xl md:text-4xl text-primary mb-6">Project Overview</h2>
          <p className="font-body-lg text-lg md:text-xl text-on-surface-variant leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Gallery */}
        <div className="gallery-grid grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-24 overflow-hidden">
          {project.gallery.map((imgUrl, index) => {
            const isBig = index % 3 === 0;
            const isLeft = index % 3 === 1;

            return (
              <div 
                key={index} 
                className={`relative overflow-hidden rounded-2xl bg-surface-container-low ${
                  isBig ? "gallery-big md:col-span-2 aspect-video" : 
                  isLeft ? "gallery-left aspect-[4/3]" : "gallery-right aspect-[4/3]"
                }`}
              >
                <Image
                  src={imgUrl}
                  alt={`${project.title} Gallery Image ${index + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            );
          })}
        </div>
      </section>

      <Footer />
    </main>
  );
};
