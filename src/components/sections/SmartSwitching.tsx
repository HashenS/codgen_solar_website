"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  useScroll,
  useTransform,
  motion,
  useMotionValueEvent,
  useSpring,
  useMotionValue,
  MotionValue,
  useInView,
} from "framer-motion";
import { GlassCard } from "../ui/GlassCard";
import { Route, Zap, BatteryCharging } from "lucide-react";
import { EnergyTextReveal } from "../ui/EnergyTextReveal";

const FRAME_COUNT = 81;
const FRAMES = Array.from({ length: FRAME_COUNT }, (_, i) => {
  const path = `/bulbe_animation/ezgif-frame-${String(i + 1).padStart(3, "0")}.jpg`;
  return `/_next/image?url=${encodeURIComponent(path)}&w=1920&q=75`;
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

export const SmartSwitching = () => {
  const containerRef = useRef<HTMLElement>(null);
  const stickyRef   = useRef<HTMLDivElement>(null);
  const targetRef   = useRef<HTMLDivElement>(null);

  const [targetBounds, setTargetBounds] = useState({ top: 0, left: 0, width: 0, height: 0 });
  const [windowBounds, setWindowBounds] = useState({ width: 0, height: 0 });
  const [showUI, setShowUI] = useState(false);

  useEffect(() => {
    const measure = () => {
      if (targetRef.current && stickyRef.current) {
        const tRect = targetRef.current.getBoundingClientRect();
        const sRect = stickyRef.current.getBoundingClientRect();
        setTargetBounds({
          top: tRect.top - sRect.top,
          left: tRect.left - sRect.left,
          width: tRect.width,
          height: tRect.height,
        });
        setWindowBounds({ width: window.innerWidth, height: window.innerHeight });
      }
    };
    measure();
    window.addEventListener("resize", measure);
    const t = setTimeout(measure, 100);
    return () => { window.removeEventListener("resize", measure); clearTimeout(t); };
  }, []);

  // ── Scroll progress ───────────────────────────────────────────────────────
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Raw motion values (set imperatively for directional control)
  const rawVideo  = useMotionValue(0);
  const rawFrame  = useMotionValue(0);
  const rawText   = useMotionValue(0);

  // Spring-smoothed versions
  const smoothVideo = useSpring(rawVideo, { stiffness: 40, damping: 15, restDelta: 0.001 });
  const smoothFrame = useSpring(rawFrame, { stiffness: 60, damping: 22, restDelta: 0.001 });
  const smoothText  = useSpring(rawText,  { stiffness: 60, damping: 22, restDelta: 0.001 });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const prev = scrollYProgress.getPrevious() ?? 0;
    const goingDown = latest >= prev;

    if (goingDown) {
      rawFrame.set(Math.max(0, Math.min(1, latest / 0.4)));
      rawText.set(Math.max(0, Math.min(1,  latest / 0.4)));
      rawVideo.set(Math.max(0, Math.min(1, (latest - 0.4) / 0.45)));
    } else {
      rawFrame.set(Math.max(0, Math.min(1, latest)));
      rawVideo.set(Math.max(0, Math.min(1, (latest - 0.4) / 0.45)));
      rawText.set(Math.max(0,  Math.min(1, latest / 0.4)));
    }

    if (latest >= 0.7) setShowUI(true);
    else if (latest < 0.5) setShowUI(false);
  });

  // ── Derived motion values ─────────────────────────────────────────────────
  // Frame index 0-based for the image array
  const frameIndex = useTransform(smoothFrame, [0, 1], [0, FRAME_COUNT - 1]);

  const W = windowBounds.width  || 1920;
  const H = windowBounds.height || 1080;
  const tw = targetBounds.width  || 800;
  const th = targetBounds.height || 450;

  const canvasWidth  = useTransform(smoothVideo, [0, 1], [W,  tw]);
  const canvasHeight = useTransform(smoothVideo, [0, 1], [H,  th]);
  const canvasTop    = useTransform(smoothVideo, [0, 1], [0,  targetBounds.top]);
  const canvasLeft   = useTransform(smoothVideo, [0, 1], [0,  targetBounds.left]);
  const canvasRadius = useTransform(smoothVideo, [0, 1], [0,  24]);

  const gradientOpacity = useTransform(smoothVideo, [0, 1], [0, 1]);
  const titleOpacity    = useTransform(smoothVideo, [0.5, 1], [0, 1]);
  const titleY          = useTransform(smoothVideo, [0.5, 1], [30, 0]);

  // Bulb text — staggered slide-up, early exit before shrink
  const text1Opacity = useTransform(smoothText, [0.05, 0.25, 0.6, 0.8], [0, 1, 1, 0]);
  const text1Y       = useTransform(smoothText, [0.05, 0.35],            [50, 0]);
  const text2Opacity = useTransform(smoothText, [0.25, 0.45, 0.6, 0.8], [0, 1, 1, 0]);
  const text2Y       = useTransform(smoothText, [0.25, 0.55],            [50, 0]);

  return (
    <section ref={containerRef} className="h-[400vh] relative z-20 bg-background">
      <div
        ref={stickyRef}
        className="sticky top-0 h-[100svh] w-full relative flex flex-col justify-center pt-20 md:pt-24 pb-8 md:pb-12 overflow-hidden"
      >
        {/* ── Framer Motion image-sequence player ──────────────────────── */}
        <motion.div
          style={{
            position: "absolute",
            width:        canvasWidth,
            height:       canvasHeight,
            top:          canvasTop,
            left:         canvasLeft,
            borderRadius: canvasRadius,
          }}
          className="z-20 overflow-hidden shadow-2xl bg-black"
        >
          <BulbFramePlayer frameIndex={frameIndex} />

          {/* Gradient overlays (only visible in card mode) */}
          <motion.div
            style={{ opacity: gradientOpacity }}
            className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent mix-blend-multiply pointer-events-none"
          />
          <motion.div
            style={{ opacity: gradientOpacity }}
            className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent pointer-events-none"
          />
        </motion.div>

        {/* ── Bulb text overlay ─────────────────────────────────────────── */}
        <div className="absolute top-0 left-0 w-full h-[100svh] pointer-events-none flex flex-col md:flex-row items-center justify-between py-[20vh] md:py-0 px-4 md:px-[8vw] lg:px-[12vw] z-30">
          <motion.div
            style={{ opacity: text1Opacity, y: text1Y }}
            className="text-center md:text-left w-full md:w-auto"
          >
            <h2 className="font-display-hero font-bold tracking-tight text-5xl md:text-6xl lg:text-7xl text-white">
              Your{" "}
              <span className="text-[#0e9c5c]">
                Power,
              </span>
            </h2>
          </motion.div>

          <motion.div
            style={{ opacity: text2Opacity, y: text2Y }}
            className="text-center md:text-right w-full md:w-auto"
          >
            <h2 className="font-display-hero font-bold tracking-tight text-5xl md:text-6xl lg:text-7xl text-white">
              Always{" "}
              <span className="text-[#0863a8]">
                On.
              </span>
            </h2>
          </motion.div>
        </div>

        {/* ── Foreground content grid ───────────────────────────────────── */}
        <div className="px-margin-mobile md:px-margin-desktop max-w-[1440px] w-full mx-auto relative pointer-events-none mt-4 md:mt-8 flex-1 flex flex-col justify-end pb-4 md:pb-12">
          <motion.div
            style={{ opacity: titleOpacity, y: titleY }}
            className="text-center mb-4 md:mb-8 pointer-events-auto relative z-30"
          >
            <EnergyTextReveal
              text="Intelligent Power Orchestration"
              className="font-display-hero font-bold tracking-tight text-3xl md:text-5xl lg:text-6xl mb-3 md:mb-4"
              blueWords={["Orchestration"]}
            />
            <p className="font-body-sm md:font-body-lg text-body-sm md:text-body-lg text-on-surface-variant max-w-2xl mx-auto line-clamp-2 md:line-clamp-none">
              Our proprietary Nexus Inverter acts as the brain of your home, making
              microsecond decisions to optimize energy flow.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 lg:gap-12 relative z-10 mb-2 md:mb-8">
            {/* Invisible target for the shrink destination */}
            <div className="md:col-span-7 lg:col-span-8 relative group flex flex-col justify-end p-0 md:p-10 pointer-events-auto h-full min-h-[120px] md:min-h-[350px]">
              <div ref={targetRef} className="absolute inset-0 w-full h-full pointer-events-none rounded-2xl md:rounded-3xl" />
            </div>

            {/* Checklist */}
            <div className="md:col-span-5 lg:col-span-4 flex flex-col justify-center pointer-events-auto">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={showUI ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex flex-col gap-3 md:gap-6"
              >
                <div>
                  <h3 className="font-headline-sm md:font-headline-md text-headline-sm md:text-headline-md text-primary mb-1 md:mb-2">
                    Your Best Friend in Solar
                  </h3>
                  <p className="font-body-sm md:font-body-md text-body-sm md:text-body-md text-on-surface-variant line-clamp-2 md:line-clamp-none">
                    We guide you every step of the way on your solar investment journey.
                  </p>
                </div>

                <div className="flex flex-col gap-2 md:gap-3">
                  {[
                    "30 Years Warranty",
                    "Premium After-Sales Service",
                    "Premium Quality Components",
                    "Free Consultation by Experts",
                  ].map((item, i) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: 20 }}
                      animate={showUI ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                      transition={{ duration: 0.5, delay: i * 0.15 + 0.2 }}
                      className="flex items-center gap-3 md:gap-4 glass-panel p-2.5 md:p-4 rounded-xl border border-white/5 relative overflow-hidden group"
                    >
                      {/* Hover glow effect */}
                      <div className="absolute inset-0 bg-primary-fixed/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                      
                      <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-primary-fixed/10 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(163,255,18,0.15)] relative z-10">
                        <svg className="w-3 h-3 md:w-4 md:h-4 text-primary-fixed" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="font-body-sm md:font-body-md text-primary font-medium relative z-10">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
