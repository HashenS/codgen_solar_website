"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import { GlassCard } from "../../ui/GlassCard";

const projects = [
  {
    id: 1,
    title: "Henuka Fresh Fruits\n100kW Commercial Solar",
    category: "Commercial",
    tag: "COMMERCIAL | SRI LANKA",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBjjR6DfK24Uz3R76VwCNiYOa_4aU9h7NvLKrhb9louVpcwwJHJRSiuchocc21JQz2_HDIDA4XymnYIyMUjWOZSVY0fgy68uFZ8fn0EXZAkG1oeI8qRvTY4yzO4mMYkb3zs7MK_epfAqClDX4gJVUdL2UGgG0xAAEc0q7c4vaZSe_xenLFCzSLWEVruPcM-P_RKDhOmC4dlkz7B--uo3gBJ_MOTRMw6lkYkqLfkeK3sXZ4Xzi4o65zUJ4J4rDuTaL7lW--8SaaqC3re",
    colSpan: "md:col-span-8",
    aspectRatio: "aspect-[16/9]",
    blueWords: ["100kW Commercial Solar"]
  },
  {
    id: 2,
    title: "Malitha Lanka\n100kW Industrial Power",
    category: "Commercial",
    tag: "INDUSTRIAL | GANEMULLA",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBbySG6fudrxsACbL2MBk9_vdwhp6wl69ig6SwXD7g6WIOxJOJYgHUMQM26UjBd_6S0WLnbhtoA5_AYG3StRVOiwhUlE8a1TQOmL90H-O8rioSNgFw45aqCUZC0ZradFCBWZw85uJxL3rD8EcRSqfsT2LapJG3PkLvqm6el63nvDtFbHadyHVxyc4V44wZvMO2y5CnaFuJ8Z8BeZzC1r_EhqERwUio325u6_iWW1gPfxYHHnmq9OCj7Uzef3a5J1aEoOz4dBWfzAr9v",
    colSpan: "md:col-span-4",
    aspectRatio: "h-full min-h-[400px]",
    blueWords: ["100kW Industrial Power"]
  },
  {
    id: 3,
    title: "The Rise Tech Village\n100kW Smart Grid",
    category: "Commercial",
    tag: "SMART GRID | KANDY",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDFXLw-7QG-C5K_i0XnUjhaC64lEIVYaJyRhgpNENeFGD2Kgws0KUa9KY4CvHvllmxzeLF5Twxfg0LQY7qJ0Wsv_SKLlVNyiy3iwhcx4WmCLYCKg9mV6p-YaBK5cXRA69uPKBvD_9CZP_2vnmr3uDrvissqWgPQ-ExYrTHhp5NQxc5yfNB8ri8Ej8DsYA7h8uVj0rcHPsIcbKB2o-Hmzmzj4NgXfYE78o-CFgrdgdPNxbVnLZUocYgs9r1fkWTGk4QpFZC8DB-wBTH4",
    colSpan: "md:col-span-4",
    aspectRatio: "h-full min-h-[400px]",
    blueWords: ["100kW Smart Grid"]
  },
  {
    id: 4,
    title: "Waterfront Complex\nNext-Gen Urban Integration",
    category: "Residential",
    tag: "FUTURE GRID | COLOMBO",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAEEPW4TsMcjs2l49KmwtYloR_KCZ8HDGnqnX88yxCMMq9cq3RzIrVtKVujHPKJfhRJzX16-bnJY-3YmPzu2ZI1ARA5nufRv5ys_Es7CPHvfP2nE9KAVoXLbAlhXOMFr729v67NAQPG_whyDbRnHJRZ4sRXE_059c24xyJHQak8_kLoqATEiFDCIc3fRuoCSG729k5hi-low8E4N_tBXVCZqbbbWmzlhlfO58CPgnl8wnRIiV4gjstQ83OP6IP0p1XeyarVS2hFaClC",
    colSpan: "md:col-span-8",
    aspectRatio: "aspect-[16/9]",
    blueWords: ["Next-Gen Urban Integration"]
  }
];

export const ProjectGrid = () => {
  const [filter, setFilter] = useState("All");
  const containerRef = useRef<HTMLElement>(null);
  
  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter(p => p.category === filter);

  const renderColoredText = (text: string, blueWords?: string[]) => {
    if (!blueWords || blueWords.length === 0) return text;
    const regex = new RegExp(`(${blueWords.join('|')})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) => {
      if (blueWords.some(w => w.toLowerCase() === part.toLowerCase())) {
        return <span key={i} className="text-[#0e9c5c]">{part}</span>;
      }
      return part;
    });
  };

  useGSAP(() => {
    gsap.fromTo(
      ".project-header",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      }
    );
  }, { scope: containerRef });

  useGSAP(() => {
    // Re-animate when filter changes
    gsap.fromTo(
      ".project-card",
      { y: 40, opacity: 0, scale: 0.98 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        }
      }
    );
  }, { scope: containerRef, dependencies: [filter] });

  return (
    <section ref={containerRef} className="py-section-gap w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
      <div className="project-header flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-primary mb-4">Select Portfolio</h2>
          <p className="text-on-surface-variant text-body-md max-w-md">
            Our global deployments represent the pinnacle of solar integration and carbon-negative engineering.
          </p>
        </div>
        <div className="flex gap-2 p-1 glass-panel rounded-xl overflow-x-auto w-full md:w-auto pb-2 md:pb-1 no-scrollbar">
          {["All", "Commercial", "Residential"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-lg font-medium text-body-md whitespace-nowrap transition-all duration-300 ${
                filter === cat
                  ? "bg-primary-fixed text-on-primary-fixed font-bold"
                  : "text-on-surface-variant hover:text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
        {filteredProjects.map((project) => (
          <div key={project.id} className={`project-card group relative overflow-hidden rounded-2xl glass-panel glow-border transition-all duration-500 cursor-pointer ${project.colSpan}`}>
            <div className={`w-full ${project.aspectRatio}`}>
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8 z-10 pointer-events-none">
              <div className="flex justify-between items-end">
                <div>
                  <span className="text-primary-fixed font-label-caps text-label-caps mb-2 block tracking-widest uppercase">
                    {project.tag}
                  </span>
                  <h3 className="font-headline-md text-primary text-headline-md leading-tight max-w-lg whitespace-pre-line">
                    {renderColoredText(project.title, project.blueWords)}
                  </h3>
                </div>
                <ArrowUpRight className="text-primary-fixed w-10 h-10 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
