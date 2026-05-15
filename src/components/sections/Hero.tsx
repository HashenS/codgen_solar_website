"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from "framer-motion";

const frameCount = 210;

const currentFrame = (index: number) => 
  `/hero-images/ezgif-frame-${index.toString().padStart(3, '0')}.jpg`;

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  // Preload images efficiently
  useEffect(() => {
    setIsMounted(true);
    const loadedImages: HTMLImageElement[] = [];
    
    // 1. Load first 5 frames immediately for instant feedback
    for (let i = 1; i <= Math.min(5, frameCount); i++) {
      const img = new window.Image();
      img.src = currentFrame(i);
      loadedImages.push(img);
    }
    setImages([...loadedImages]);

    // 2. Load the rest in chunks using requestIdleCallback to avoid blocking the main thread
    let currentIndex = 6;
    const loadNextBatch = () => {
      if (currentIndex > frameCount) return;
      
      const batchSize = 10;
      const end = Math.min(currentIndex + batchSize - 1, frameCount);
      
      for (let i = currentIndex; i <= end; i++) {
        const img = new window.Image();
        img.src = currentFrame(i);
        loadedImages.push(img);
      }
      
      setImages([...loadedImages]);
      currentIndex = end + 1;
      
      if (currentIndex <= frameCount) {
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
    } else {
      setActiveStage(1);
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
      className="relative h-[600vh] bg-black -mb-[100vh]"
    >
      {/* Invisible container to track the first 500vh of scroll for animation */}
      <div ref={containerRef} className="absolute top-0 left-0 w-full h-[500vh] pointer-events-none" />

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
                  <Image 
                    src="/cg-solar.png" 
                    alt="Codegen Solar" 
                    width={320}
                    height={100}
                    priority
                    className="w-48 md:w-80 h-auto drop-shadow-[0_0_30px_rgba(163,255,18,0.3)]" 
                  />
                </motion.div>
              )}

              {/* The Ultimate Safety Net. */}
              {activeStage === 1 && (
                <motion.div
                  key="safety"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { 
                      opacity: 1,
                      transition: { staggerChildren: 0.3, delayChildren: 0.1 }
                    },
                    exit: { opacity: 0, y: -30, transition: { duration: 0.4 } }
                  }}
                  className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
                >
                  <div className="flex flex-col items-center mb-6">
                    <motion.h1 
                      variants={{
                        hidden: { opacity: 0, y: -50, filter: "blur(10px)" },
                        visible: { 
                          opacity: 1, 
                          y: 0, 
                          filter: "blur(0px)",
                          transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } // Expo out equivalent
                        }
                      }}
                      className="font-display-hero text-display-hero text-primary mb-0 leading-none drop-shadow-2xl text-center"
                    >
                      The Ultimate
                    </motion.h1>
                    <motion.h1 
                      variants={{
                        hidden: { opacity: 0, scale: 0.9, filter: "blur(15px)", textShadow: "0px 0px 0px rgba(163,255,18,0)" },
                        visible: { 
                          opacity: 1, 
                          scale: 1, 
                          filter: "blur(0px)",
                          textShadow: ["0px 0px 30px rgba(163,255,18,0.8)", "0px 0px 15px rgba(163,255,18,0.3)"],
                          transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] } 
                        }
                      }}
                      className="font-display-hero text-display-hero text-primary-fixed-dim leading-none text-center"
                    >
                      Safety Net.
                    </motion.h1>
                  </div>
                  <motion.p 
                    variants={{
                        hidden: { opacity: 0, y: 30 },
                        visible: { 
                          opacity: 1, 
                          y: 0, 
                          transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } 
                        }
                    }}
                    className="font-body-lg text-body-lg text-on-surface-variant drop-shadow-md text-center max-w-2xl px-4"
                  >
                    Experience uninterrupted power with Codegen Solar's Hybrid Resilience.
                    A tri-mode energy architecture that bridges the gap between solar,
                    storage, and the grid.
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
};
