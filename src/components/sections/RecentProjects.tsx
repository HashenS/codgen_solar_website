"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";
import { EnergyTextReveal } from "../ui/EnergyTextReveal";
import { GlassCard } from "../ui/GlassCard";
import { projectsData } from "../../data/projects";

export const RecentProjects = () => {
  const containerRef = useRef<HTMLElement>(null);
  const recentProjectsList = Object.values(projectsData);

  useGSAP(() => {
    // Animate section headers
    gsap.fromTo(
      ".recent-header-elem",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        }
      }
    );

    // Camera lens expansion effect from bottom
    gsap.fromTo(
      ".recent-project-card",
      { 
        y: 100,
        clipPath: "circle(10% at 50% 50%)", 
        scale: 0.5,
        opacity: 0
      },
      {
        y: 0,
        clipPath: "circle(150% at 50% 50%)",
        scale: 1,
        opacity: 1,
        stagger: 0.1,
        ease: "none",
        scrollTrigger: {
          trigger: ".recent-project-grid",
          start: "top 90%",
          end: "top 30%",
          scrub: 1,
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-section-gap w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-30">
      
      {/* Header */}
      <div className="mb-12 md:mb-16">
        <p className="font-label-caps text-label-caps text-primary-fixed mb-4 recent-header-elem flex items-center gap-4">
          <span className="w-6 h-[1px] bg-primary-fixed"></span>
          RECENT PROJECTS
        </p>
        <div className="recent-header-elem">
          <EnergyTextReveal 
            text="Our Portfolio of Success" 
            className="font-display-hero font-bold tracking-tight text-3xl md:text-5xl lg:text-6xl mb-4" 
            blueWords={["Success"]}
          />
        </div>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl recent-header-elem">
          Powering Progress: See our commitment to quality and innovation in action through diverse solar projects across Sri Lanka.
        </p>
      </div>

      {/* Grid */}
      <div className="recent-project-grid grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {recentProjectsList.map((project) => (
          <Link 
            href={`/projects-post/${project.slug}`}
            key={project.id} 
            className="recent-project-card group relative overflow-hidden rounded-2xl aspect-[4/5] bg-surface-container-low cursor-pointer block"
          >
            {/* Background Image */}
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out grayscale-[10%] group-hover:grayscale-0"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050B08] via-black/20 to-transparent pointer-events-none opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

            {/* Content */}
            <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end pb-12 md:pb-16 pointer-events-none">
              <div className="flex justify-between items-end gap-4 transform transition-transform duration-500 group-hover:-translate-y-2">
                <div className="flex-1">
                  <span className="text-primary-fixed font-label-caps text-[10px] tracking-widest mb-3 flex items-center gap-2">
                    <span className="w-4 h-[1px] bg-primary-fixed"></span>
                    {project.category}
                  </span>
                  <h3 className="font-headline-md text-white text-xl md:text-2xl leading-tight font-semibold line-clamp-2 drop-shadow-lg">
                    {project.title}
                  </h3>
                </div>

                {/* Circular Hover Button */}
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center shrink-0 shadow-lg transform scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 ease-out">
                  <ArrowRight className="w-5 h-5 md:w-6 md:h-6 -rotate-45" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
    </section>
  );
};
