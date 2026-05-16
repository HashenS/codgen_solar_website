"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ShieldCheck, CloudLightning } from "lucide-react";
import { EnergyTextReveal } from "../ui/EnergyTextReveal";
import {
  useScroll,
  useTransform,
  useSpring,
  motion,
  useMotionValueEvent,
  MotionValue,
  useInView,
} from "framer-motion";

const FRAME_COUNT = 87;
const FRAMES = Array.from({ length: FRAME_COUNT }, (_, i) => {
  const path = `/Solar_animation/ezgif-frame-${String(i + 1).padStart(3, "0")}.jpg`;
  return `/_next/image?url=${encodeURIComponent(path)}&w=1200&q=75`;
});

function BulbFramePlayer({ frameIndex }: { frameIndex: MotionValue<number> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);

  const isInView = useInView(canvasRef, { once: true, margin: "200% 0px" });

  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    
    // Load first 5 frames immediately
    for (let i = 0; i < Math.min(5, FRAME_COUNT); i++) {
      const img = new Image();
      img.src = FRAMES[i];
      loadedImages.push(img);
    }
    setImages([...loadedImages]);
  }, []);

  useEffect(() => {
    if (!isInView || images.length >= FRAME_COUNT) return;

    let currentIndex = Math.max(5, images.length);
    let isActive = true;
    const loadedImages = [...images];

    const loadNextBatch = () => {
      if (!isActive || currentIndex >= FRAME_COUNT) return;
      
      const batchSize = 10;
      const end = Math.min(currentIndex + batchSize - 1, FRAME_COUNT - 1);
      
      for (let i = currentIndex; i <= end; i++) {
        const img = new Image();
        img.src = FRAMES[i];
        loadedImages.push(img);
      }
      
      setImages([...loadedImages]);
      currentIndex = end + 1;
      
      if (currentIndex < FRAME_COUNT) {
        if ('requestIdleCallback' in window) {
          (window as any).requestIdleCallback(loadNextBatch);
        } else {
          setTimeout(loadNextBatch, 50);
        }
      }
    };
    
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(loadNextBatch);
    } else {
      setTimeout(loadNextBatch, 100);
    }

    return () => { isActive = false; };
  }, [isInView]);

  const drawImage = (index: number) => {
    if (images[index] && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        const img = images[index];
        if (!img.complete) return;
        
        const canvas = canvasRef.current;
        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        const x = (canvas.width / 2) - (img.width / 2) * scale;
        const y = (canvas.height / 2) - (img.height / 2) * scale;
        
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, x, y, img.width * scale, img.height * scale);
      }
    }
  };

  useMotionValueEvent(frameIndex, "change", (latest) => {
    const index = Math.round(latest);
    drawImage(index);
  });

  useEffect(() => {
    const resizeCanvas = () => {
      if (canvasRef.current) {
        const { width, height } = canvasRef.current.parentElement!.getBoundingClientRect();
        canvasRef.current.width = width;
        canvasRef.current.height = height;
        drawImage(Math.round(frameIndex.get()));
      }
    };
    
    window.addEventListener("resize", resizeCanvas);
    setTimeout(resizeCanvas, 0); 
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [images, frameIndex]);

  useEffect(() => {
    if (images[0] && canvasRef.current) {
      if (images[0].complete) {
        drawImage(0);
      } else {
        images[0].onload = () => drawImage(0);
      }
    }
  }, [images]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full object-cover"
    />
  );
}

export const PeaceOfMind = () => {
  const containerRef   = useRef<HTMLElement>(null);
  const auraRef        = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // ── GSAP power-on effect (cards + aura entrance) ──────────────────────────
  useGSAP(
    () => {
      gsap.set(imageContainerRef.current, { filter: "brightness(0.2) grayscale(0.8)", scale: 0.95 });
      gsap.set(auraRef.current, { opacity: 0, scale: 0.8 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: containerRef.current, start: "top 60%" },
      });

      tl.to(imageContainerRef.current, {
        filter: "brightness(1) grayscale(0)",
        scale: 1,
        duration: 1.5,
        ease: "elastic.out(1, 0.4)",
      }, "+=0.1")
        .to(auraRef.current, {
          opacity: 0.6,
          scale: 1,
          duration: 1.5,
          ease: "elastic.out(1, 0.4)",
        }, "<")
        .from(".pom-card", {
          y: 80,
          rotationX: 25,
          rotationY: -15,
          opacity: 0,
          duration: 1.2,
          stagger: 0.2,
          ease: "power3.out",
        }, "<0.2")
        .from(".pom-icon", {
          y: 30,
          scale: 0.8,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          ease: "back.out(1.5)",
        }, "<0.2");
    },
    { scope: containerRef }
  );

  // ── Scroll-linked frame animation ─────────────────────────────────────────
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Map scroll into frame progress with a very fluid, "buttery" spring
  const rawFrame   = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  const smoothFrame = useSpring(rawFrame, { 
    stiffness: 30, 
    damping: 18, 
    mass: 1.2,
    restDelta: 0.001 
  });
  const frameIndex  = useTransform(smoothFrame, [0, 1], [0, FRAME_COUNT - 1]);

  return (
    <section
      ref={containerRef}
      className="py-section-gap bg-surface-container-lowest overflow-hidden"
      style={{ perspective: "1000px" }}
    >
      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
        {/* Left: text + cards */}
        <div>
          <EnergyTextReveal
            text="Zero Downtime. Zero Compromise."
            className="font-headline-lg text-headline-lg mb-8"
          />
          <div className="space-y-6 perspective-[1000px]">
            <div className="pom-card glass-panel p-6 rounded-2xl flex items-start gap-4 border border-white/5 relative z-10 transform-style-3d">
              <div className="pom-icon w-12 h-12 rounded-full bg-primary-fixed/10 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(163,255,18,0.2)]">
                <ShieldCheck className="text-primary-fixed w-6 h-6" />
              </div>
              <div>
                <h3 className="font-headline-md text-headline-md text-primary mb-1">
                  100% Uptime Guarantee
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  While neighbors are in the dark, your Hybrid Resilience system
                  engages instantly, powering your entire home's essential circuits.
                </p>
              </div>
            </div>

            <div className="pom-card glass-panel p-6 rounded-2xl flex items-start gap-4 border border-white/5 relative z-10 transform-style-3d">
              <div className="pom-icon w-12 h-12 rounded-full bg-primary-fixed/10 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(163,255,18,0.2)]">
                <CloudLightning className="text-primary-fixed w-6 h-6" />
              </div>
              <div>
                <h3 className="font-headline-md text-headline-md text-primary mb-1">
                  AI-Powered Forecasting
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  System monitors weather patterns and pre-charges batteries if an
                  outage-causing storm is detected in your area.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: scroll-driven bulb animation */}
        <div className="relative">
          {/* Glow aura */}
          <div ref={auraRef} className="absolute -inset-10 bg-primary-fixed/30 blur-[80px] rounded-[3rem]" />

          <div
            ref={imageContainerRef}
            className="relative rounded-3xl overflow-hidden glass-panel aspect-[4/3] bg-black"
          >
            <BulbFramePlayer frameIndex={frameIndex} />

            {/* Subtle vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
};
