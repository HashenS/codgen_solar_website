"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence, useInView } from "framer-motion";
import { Button } from "../ui/Button";
import { useRouter } from "next/navigation";

const frameCount = 210;

const currentFrame = (index: number) => {
  const path = `/hero-images/ezgif-frame-${index.toString().padStart(3, '0')}.jpg`;
  return `/_next/image?url=${encodeURIComponent(path)}&w=1920&q=75`;
};

export const Hero = () => {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  const isInView = useInView(containerRef, { once: true, margin: "200% 0px" });

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
  }, []);

  useEffect(() => {
    if (!isInView || images.length >= frameCount) return;

    let currentIndex = Math.max(6, images.length + 1);
    let isActive = true;
    const loadedImages = [...images];

    const loadNextBatch = () => {
      if (!isActive || currentIndex > frameCount) return;
      
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

    return () => { isActive = false; };
  }, [isInView]);

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
        <div className="absolute inset-0 z-0 bg-black">
          {/* Static fallback image ensures it blocks window.onload so the Preloader waits for it */}
          <Image 
            src={currentFrame(1)} 
            alt="Codegen Solar Hybrid Resilience" 
            fill 
            priority
            className="object-cover opacity-60" 
          />
          <motion.canvas
            ref={canvasRef}
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 3, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full object-cover"
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
                    className="w-48 md:w-80 h-auto drop-shadow-[0_0_20px_rgba(14,156,92,0.3)]" 
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
                      className="font-display-hero text-display-hero text-primary mb-0 leading-none drop-shadow-2xl text-center translate-x-1 md:translate-x-2"
                    >
                      The Ultimate
                    </motion.h1>
                    <motion.h1 
                      variants={{
                        hidden: { opacity: 0, scale: 0.9, filter: "blur(10px)" },
                        visible: { 
                          opacity: 1, 
                          scale: 1, 
                          filter: "blur(0px)",
                          transition: { 
                            duration: 0.5, 
                            ease: "easeOut"
                          } 
                        }
                      }}
                      className="font-display-hero text-display-hero leading-none text-center flex justify-center gap-[0.3em]"
                    >
                      <motion.span
                        variants={{
                          hidden: { color: "#333333", textShadow: "0px 0px 0px rgba(0,0,0,0)" },
                          visible: {
                            color: ["#333333", "#333333", "#ffffff", "#333333", "#ffffff", "#0e9c5c"],
                            textShadow: ["0px 0px 0px rgba(0,0,0,0)", "0px 0px 0px rgba(0,0,0,0)", "0px 0px 40px rgba(255,255,255,0.8)", "0px 0px 0px rgba(0,0,0,0)", "0px 0px 40px rgba(255,255,255,0.8)", "0px 0px 0px rgba(0,0,0,0)"],
                            transition: { duration: 2, times: [0, 0.4, 0.45, 0.55, 0.6, 1] }
                          }
                        }}
                      >Safety</motion.span>
                      <motion.span
                        variants={{
                          hidden: { color: "#333333", textShadow: "0px 0px 0px rgba(0,0,0,0)" },
                          visible: {
                            color: ["#333333", "#333333", "#ffffff", "#333333", "#ffffff", "#0863a8"],
                            textShadow: ["0px 0px 0px rgba(0,0,0,0)", "0px 0px 0px rgba(0,0,0,0)", "0px 0px 40px rgba(255,255,255,0.8)", "0px 0px 0px rgba(0,0,0,0)", "0px 0px 40px rgba(255,255,255,0.8)", "0px 0px 0px rgba(0,0,0,0)"],
                            transition: { duration: 2, times: [0, 0.4, 0.45, 0.55, 0.6, 1] }
                          }
                        }}
                      >Net.</motion.span>
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
                  
                  <motion.div
                    variants={{
                        hidden: { opacity: 0, y: 30 },
                        visible: { 
                          opacity: 1, 
                          y: 0, 
                          transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } 
                        }
                    }}
                    className="flex flex-col sm:flex-row gap-4 mt-10 justify-center pointer-events-auto relative z-50"
                  >
                    <Button variant="primary" size="md" magnetic onClick={() => router.push('/solutions')}>
                      Our Solutions
                    </Button>
                    <Button 
                      variant="primary" 
                      size="md" 
                      magnetic 
                      className="bg-[#0863a8] hover:bg-[#0e9c5c]"
                      style={{ color: "#ffffff" }}
                      onClick={() => router.push('/contact')}
                    >
                      Contact Us
                    </Button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
};
