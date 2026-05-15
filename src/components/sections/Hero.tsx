"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from "framer-motion";

const frameCount = 210;

const currentFrame = (index: number) => 
  `/hero-images/ezgif-frame-${index.toString().padStart(3, '0')}.jpg`;

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  // Preload images
  useEffect(() => {
    setIsMounted(true);
    const loadedImages: HTMLImageElement[] = [];
    
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [1, frameCount]);

  const [activeStage, setActiveStage] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.2) {
      setActiveStage(0);
    } else if (latest >= 0.2 && latest < 0.6) {
      setActiveStage(1);
    } else if (latest >= 0.6) {
      setActiveStage(2);
    }
  });

  const drawImage = (index: number) => {
    if (images[index - 1] && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        const img = images[index - 1];
        if (!img.complete) return; // Don't draw if not loaded yet
        
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

  // Handle resizing canvas
  useEffect(() => {
    const resizeCanvas = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        // Redraw current frame
        const index = Math.round(frameIndex.get());
        drawImage(index);
      }
    };
    
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas(); // Initial call
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
    <section
      className="relative h-[400vh] bg-[#050505] -mb-[100vh]"
    >
      {/* Invisible container to track the first 300vh of scroll for animation */}
      <div ref={containerRef} className="absolute top-0 left-0 w-full h-[300vh] pointer-events-none" />

      {/* Sticky container that stays in view */}
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden flex flex-col pt-24 z-0">
        {/* Background Canvas */}
        <div className="absolute inset-0 z-0">
          <motion.canvas
            ref={canvasRef}
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.6 }}
            transition={{ duration: 3, ease: "easeOut" }}
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
        </div>

        {/* Centered Animated Text */}
        {isMounted && (
          <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
            <AnimatePresence mode="wait">
              {/* Initial Logo */}
              {activeStage === 0 && (
                <motion.div
                  key="logo"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                  <img 
                    src="/cg-solar.png" 
                    alt="Codegen Solar" 
                    className="w-48 md:w-80 h-auto drop-shadow-[0_0_30px_rgba(163,255,18,0.3)]" 
                  />
                </motion.div>
              )}

              {/* The Ultimate */}
              {activeStage === 1 && (
                <motion.div
                  key="ultimate"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                  <h1 className="font-display-hero text-display-hero text-primary mb-0 leading-none drop-shadow-2xl text-center">
                    The Ultimate
                  </h1>
                </motion.div>
              )}

              {/* Safety Net. */}
              {activeStage === 2 && (
                <motion.div
                  key="safety"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
                >
                  <h1 className="font-display-hero text-display-hero text-primary-fixed-dim drop-shadow-[0_0_15px_rgba(159,251,6,0.3)] mb-6 leading-none text-center">
                    Safety Net.
                  </h1>
                  <p className="font-body-lg text-body-lg text-on-surface-variant drop-shadow-md text-center max-w-2xl px-4">
                    Experience uninterrupted power with Codegen Solar's Hybrid Resilience.
                    A tri-mode energy architecture that bridges the gap between solar,
                    storage, and the grid.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
};
