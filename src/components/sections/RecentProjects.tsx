"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";
import { EnergyTextReveal } from "../ui/EnergyTextReveal";
import { GlassCard } from "../ui/GlassCard";

const RECENT_PROJECTS = [
  {
    id: 1,
    title: "Henuka Fresh Fruits 100kW Project - Heiyanthuduwa",
    tag: "COMMERCIAL",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBjjR6DfK24Uz3R76VwCNiYOa_4aU9h7NvLKrhb9louVpcwwJHJRSiuchocc21JQz2_HDIDA4XymnYIyMUjWOZSVY0fgy68uFZ8fn0EXZAkG1oeI8qRvTY4yzO4mMYkb3zs7MK_epfAqClDX4gJVUdL2UGgG0xAAEc0q7c4vaZSe_xenLFCzSLWEVruPcM-P_RKDhOmC4dlkz7B--uo3gBJ_MOTRMw6lkYkqLfkeK3sXZ4Xzi4o65zUJ4J4rDuTaL7lW--8SaaqC3re",
  },
  {
    id: 2,
    title: "Malitha Lanka 100kW Project - Ganemulla",
    tag: "COMMERCIAL",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBbySG6fudrxsACbL2MBk9_vdwhp6wl69ig6SwXD7g6WIOxJOJYgHUMQM26UjBd_6S0WLnbhtoA5_AYG3StRVOiwhUlE8a1TQOmL90H-O8rioSNgFw45aqCUZC0ZradFCBWZw85uJxL3rD8EcRSqfsT2LapJG3PkLvqm6el63nvDtFbHadyHVxyc4V44wZvMO2y5CnaFuJ8Z8BeZzC1r_EhqERwUio325u6_iWW1gPfxYHHnmq9OCj7Uzef3a5J1aEoOz4dBWfzAr9v",
  },
  {
    id: 3,
    title: "The Rise Tech Village 100kW Project - Kandy",
    tag: "SMART GRID",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDFXLw-7QG-C5K_i0XnUjhaC64lEIVYaJyRhgpNENeFGD2Kgws0KUa9KY4CvHvllmxzeLF5Twxfg0LQY7qJ0Wsv_SKLlVNyiy3iwhcx4WmCLYCKg9mV6p-YaBK5cXRA69uPKBvD_9CZP_2vnmr3uDrvissqWgPQ-ExYrTHhp5NQxc5yfNB8ri8Ej8DsYA7h8uVj0rcHPsIcbKB2o-Hmzmzj4NgXfYE78o-CFgrdgdPNxbVnLZUocYgs9r1fkWTGk4QpFZC8DB-wBTH4",
  }
];

export const RecentProjects = () => {
  const containerRef = useRef<HTMLElement>(null);

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

    // Staggered card entrance
    gsap.fromTo(
      ".recent-project-card",
      { y: 60, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".recent-project-grid",
          start: "top 80%",
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
            blueWords={[]}
          />
        </div>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl recent-header-elem">
          Powering Progress: See our commitment to quality and innovation in action through diverse solar projects across Sri Lanka.
        </p>
      </div>

      {/* Grid */}
      <div className="recent-project-grid grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {RECENT_PROJECTS.map((project) => (
          <div 
            key={project.id} 
            className="recent-project-card group relative overflow-hidden rounded-2xl aspect-[4/5] bg-surface-container-low cursor-pointer"
          >
            {/* Background Image */}
            <Image
              src={project.image}
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
                    {project.tag}
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
          </div>
        ))}
      </div>
      
    </section>
  );
};
