"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { GlassCard } from "../ui/GlassCard";
import { Route, Zap, BatteryCharging } from "lucide-react";

export const SmartSwitching = () => {
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const frameCount = 81;

  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = `/bulbe_animation/ezgif-frame-${i.toString().padStart(3, '0')}.jpg`;
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [1, frameCount]);

  const drawImage = (index: number) => {
    if (images[index - 1] && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        const img = images[index - 1];
        if (!img.complete) return;
        
        const canvas = canvasRef.current;
        // Keep aspect ratio covering the whole canvas
        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        const x = (canvas.width / 2) - (img.width / 2) * scale;
        const y = (canvas.height / 2) - (img.height / 2) * scale;
        
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, x, y, img.width * scale, img.height * scale);
      }
    }
  };

  useMotionValueEvent(frameIndex, "change", (latest) => {
    drawImage(Math.round(latest));
  });

  useEffect(() => {
    const resizeCanvas = () => {
      if (canvasRef.current) {
        // Get the parent container's dimensions to make it responsive
        const parent = canvasRef.current.parentElement;
        if (parent) {
          canvasRef.current.width = parent.clientWidth;
          canvasRef.current.height = parent.clientHeight;
        } else {
          canvasRef.current.width = window.innerWidth;
          canvasRef.current.height = window.innerHeight;
        }
        drawImage(Math.round(frameIndex.get()));
      }
    };
    
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [images, frameIndex]);

  // Initial draw once first image is loaded
  useEffect(() => {
    if (images[0] && canvasRef.current) {
      const img = images[0];
      if (img.complete) {
        drawImage(1);
      } else {
        img.onload = () => drawImage(1);
      }
    }
  }, [images]);

  return (
    <section ref={containerRef} className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
      <div className="text-center mb-16">
        <h2 className="font-headline-lg text-headline-lg text-primary mb-4">
          Intelligent Power Orchestration
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">
          Our proprietary Nexus Inverter acts as the brain of your home, making
          microsecond decisions to optimize energy flow.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
        {/* Large Feature */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -15% 0px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="md:col-span-8 glass-panel rounded-3xl overflow-hidden relative group md:aspect-video flex flex-col justify-end p-8 md:p-12"
        >
          <div className="absolute inset-0 z-0">
            <motion.canvas
              ref={canvasRef}
              className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700"
            />
            {/* Gradient overlay to ensure text remains perfectly readable */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent"></div>
          </div>
          <div className="relative z-10">
            <Route className="text-primary-fixed mb-4 w-10 h-10" />
            <h3 className="font-headline-lg text-headline-lg text-primary mb-3">Smart Switching</h3>
            <p className="font-body-lg text-body-lg text-white max-w-xl drop-shadow-md">
              Seamlessly transitions between solar harvesting, battery discharge,
              and grid backup in less than 10 milliseconds. You won't even see
              your lights flicker.
            </p>
          </div>
        </motion.div>

        {/* Side Cards */}
        <div className="md:col-span-4 flex flex-col gap-gutter">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -15% 0px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
            className="flex-1 flex flex-col"
          >
            <GlassCard glowBorder className="flex-1">
              <Zap className="text-primary-fixed mb-4 w-8 h-8" />
              <h4 className="font-headline-md text-headline-md text-primary mb-2">Grid Sync</h4>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Real-time synchronization with local utility prices to export energy
                at peak value.
              </p>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -15% 0px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="flex-1 flex flex-col"
          >
            <GlassCard className="flex-1">
              <BatteryCharging className="text-primary-fixed mb-4 w-8 h-8" />
              <h4 className="font-headline-md text-headline-md text-primary mb-2">Battery Guard</h4>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Advanced thermal management ensures 20-year operational lifespan for
                your storage.
              </p>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
