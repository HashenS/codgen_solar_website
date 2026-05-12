"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { GlassCard } from "../ui/GlassCard";
import { Route, Zap, BatteryCharging } from "lucide-react";

export const SmartSwitching = () => {
  const containerRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const frameCount = 81;

  // Track target bounds relative to the sticky container
  const [targetBounds, setTargetBounds] = useState({ top: 0, left: 0, width: 0, height: 0 });
  const [windowBounds, setWindowBounds] = useState({ width: 0, height: 0 });
  
  // State to trigger the UI entrance animation
  const [showUI, setShowUI] = useState(false);

  useEffect(() => {
    const measure = () => {
      if (targetRef.current && stickyRef.current) {
        const targetRect = targetRef.current.getBoundingClientRect();
        const stickyRect = stickyRef.current.getBoundingClientRect();
        
        setTargetBounds({
          top: targetRect.top - stickyRect.top,
          left: targetRect.left - stickyRect.left,
          width: targetRect.width,
          height: targetRect.height,
        });
        setWindowBounds({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
    };

    measure();
    window.addEventListener("resize", measure);
    // Add a small timeout measure to ensure layout is complete
    const timeout = setTimeout(measure, 100);
    return () => {
      window.removeEventListener("resize", measure);
      clearTimeout(timeout);
    };
  }, []);

  // Preload images
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
    offset: ["start start", "end end"],
  });

  // Phase 1: Scrub video from 0 to 0.3
  const frameIndex = useTransform(scrollYProgress, [0, 0.3], [1, frameCount]);

  // Phase 2: Shrink canvas to target bounds from 0.3 to 0.6
  const canvasWidth = useTransform(scrollYProgress, [0.3, 0.6], [windowBounds.width || 1920, targetBounds.width || 800]);
  const canvasHeight = useTransform(scrollYProgress, [0.3, 0.6], [windowBounds.height || 1080, targetBounds.height || 450]);
  const canvasTop = useTransform(scrollYProgress, [0.3, 0.6], [0, targetBounds.top]);
  const canvasLeft = useTransform(scrollYProgress, [0.3, 0.6], [0, targetBounds.left]);
  const canvasRadius = useTransform(scrollYProgress, [0.3, 0.6], [0, 24]); // 24px = rounded-3xl

  // Fade in the dark gradient over the video ONLY as it shrinks to a card
  const gradientOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);

  // Trigger the UI fade-up animation AFTER the shrink completes (at 60% scroll)
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= 0.6 && !showUI) {
      setShowUI(true);
    } else if (latest < 0.6 && showUI) {
      setShowUI(false);
    }
  });

  // Canvas drawing logic
  const drawImage = (index: number) => {
    if (images[index - 1] && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        const img = images[index - 1];
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
    drawImage(Math.round(latest));
  });

  // Need a separate useMotionValueEvent for height/width to ensure the canvas 
  // internal resolution matches its display size during animation
  useMotionValueEvent(canvasWidth, "change", () => {
    if (canvasRef.current && windowBounds.width > 0) {
      canvasRef.current.width = canvasWidth.get();
      canvasRef.current.height = canvasHeight.get();
      drawImage(Math.round(frameIndex.get()));
    }
  });

  // Initial draw once first image is loaded
  useEffect(() => {
    if (images[0] && canvasRef.current && windowBounds.width > 0) {
      const img = images[0];
      canvasRef.current.width = windowBounds.width;
      canvasRef.current.height = windowBounds.height;
      if (img.complete) {
        drawImage(1);
      } else {
        img.onload = () => drawImage(1);
      }
    }
  }, [images, windowBounds]);

  return (
    <section ref={containerRef} className="h-[300vh] relative z-20 bg-background">
      <div ref={stickyRef} className="sticky top-0 min-h-screen w-full flex flex-col justify-center pt-24 md:pt-32 pb-16 md:pb-24">
        
        {/* Animated Background Canvas */}
        <motion.div
          style={{
            position: "absolute",
            width: canvasWidth,
            height: canvasHeight,
            top: canvasTop,
            left: canvasLeft,
            borderRadius: canvasRadius,
          }}
          className="z-0 overflow-hidden shadow-2xl bg-black"
        >
          <canvas
            ref={canvasRef}
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay specifically for the card mode */}
          <motion.div style={{ opacity: gradientOpacity }} className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent mix-blend-multiply pointer-events-none"></motion.div>
          <motion.div style={{ opacity: gradientOpacity }} className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent pointer-events-none"></motion.div>
        </motion.div>

        {/* Foreground Content Grid */}
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max w-full mx-auto relative z-10 pointer-events-none">
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={showUI ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-16 pointer-events-auto"
          >
            <h2 className="font-headline-lg text-headline-lg text-primary mb-4">
              Intelligent Power Orchestration
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">
              Our proprietary Nexus Inverter acts as the brain of your home, making
              microsecond decisions to optimize energy flow.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            {/* Target Layout Box for Video Only */}
            <div className="md:col-span-8 relative group flex flex-col justify-end p-8 md:p-12 pointer-events-auto h-full min-h-[400px]">
              {/* Invisible Target Div */}
              <div ref={targetRef} className="absolute inset-0 w-full h-full pointer-events-none rounded-3xl" />
            </div>

            {/* Side Cards */}
            <div className="md:col-span-4 flex flex-col gap-3 pointer-events-auto">
              <motion.div 
                initial={{ y: 50, opacity: 0 }}
                animate={showUI ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                className="flex-1 flex flex-col"
              >
                <GlassCard glowBorder className="flex-1 h-full !p-5 md:!p-6">
                  <Route className="text-primary-fixed mb-2 w-6 h-6" />
                  <h4 className="font-headline-sm text-headline-sm text-primary mb-1">Smart Switching</h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Seamlessly transitions between solar harvesting, battery discharge,
                    and grid backup in less than 10 milliseconds.
                  </p>
                </GlassCard>
              </motion.div>

              <motion.div 
                initial={{ y: 50, opacity: 0 }}
                animate={showUI ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="flex-1 flex flex-col"
              >
                <GlassCard glowBorder className="flex-1 h-full !p-5 md:!p-6">
                  <Zap className="text-primary-fixed mb-2 w-6 h-6" />
                  <h4 className="font-headline-sm text-headline-sm text-primary mb-1">Grid Sync</h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Real-time synchronization with local utility prices to export energy
                    at peak value.
                  </p>
                </GlassCard>
              </motion.div>

              <motion.div 
                initial={{ y: 50, opacity: 0 }}
                animate={showUI ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                className="flex-1 flex flex-col"
              >
                <GlassCard className="flex-1 h-full !p-5 md:!p-6">
                  <BatteryCharging className="text-primary-fixed mb-2 w-6 h-6" />
                  <h4 className="font-headline-sm text-headline-sm text-primary mb-1">Battery Guard</h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Advanced thermal management ensures 20-year operational lifespan for
                    your storage.
                  </p>
                </GlassCard>
              </motion.div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
