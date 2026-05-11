"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

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

  const ultimateOpacity = useTransform(scrollYProgress, [0.3, 0.4, 0.5, 0.6], [0, 1, 1, 0]);
  const ultimateY = useTransform(scrollYProgress, [0.3, 0.4, 0.5, 0.6], [30, 0, 0, -30]);

  const safetyOpacity = useTransform(scrollYProgress, [0.6, 0.7, 0.9, 1.0], [0, 1, 1, 1]);
  const safetyY = useTransform(scrollYProgress, [0.6, 0.7, 0.9, 1.0], [30, 0, 0, 0]);

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
      ref={containerRef}
      className="relative h-[300vh] bg-[#050505]"
    >
      {/* Sticky container that stays in view */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col pt-24">
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
          <div className="absolute inset-0 z-10 pointer-events-none">
            {/* The Ultimate */}
            <motion.div
              style={{ opacity: ultimateOpacity, y: ultimateY }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <h1 className="font-display-hero text-display-hero text-primary mb-0 leading-none drop-shadow-2xl text-center">
                The Ultimate
              </h1>
            </motion.div>

            {/* Safety Net. */}
            <motion.div
              style={{ opacity: safetyOpacity, y: safetyY }}
              className="absolute inset-0 flex flex-col items-center justify-center"
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
          </div>
        )}


      </div>
    </section>
  );
};
