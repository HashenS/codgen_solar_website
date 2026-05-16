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
      rawVideo.set(Math.max(0, Math.min(1, (latest - 0.4) / 0.4)));
    } else {
      rawFrame.set(Math.max(0, Math.min(1, latest)));
      rawVideo.set(Math.max(0, Math.min(1, (latest - 0.4) / 0.6)));
      rawText.set(Math.max(0,  Math.min(1, latest / 0.4)));
    }

    if (latest >= 0.8) setShowUI(true);
    else if (latest < 0.6) setShowUI(false);
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
        className="sticky top-0 min-h-[100svh] w-full relative flex flex-col justify-center pt-24 md:pt-32 pb-16 md:pb-24"
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
            <h2 className="font-display-hero font-bold tracking-tight text-5xl md:text-6xl lg:text-7xl text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
              Your{" "}
              <span className="text-[#A3FF12] drop-shadow-[0_0_20px_rgba(163,255,18,0.5)]">
                Power,
              </span>
            </h2>
          </motion.div>

          <motion.div
            style={{ opacity: text2Opacity, y: text2Y }}
            className="text-center md:text-right w-full md:w-auto"
          >
            <h2 className="font-display-hero font-bold tracking-tight text-5xl md:text-6xl lg:text-7xl text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
              Always{" "}
              <span className="text-[#A3FF12] drop-shadow-[0_0_20px_rgba(163,255,18,0.5)]">
                On.
              </span>
            </h2>
          </motion.div>
        </div>

        {/* ── Foreground content grid ───────────────────────────────────── */}
        <div className="px-margin-mobile md:px-margin-desktop max-w-[1440px] w-full mx-auto relative pointer-events-none mt-8">
          <motion.div
            style={{ opacity: titleOpacity, y: titleY }}
            className="text-center mb-16 pointer-events-auto relative z-30"
          >
            <EnergyTextReveal
              text="Intelligent Power Orchestration"
              className="font-headline-lg text-headline-lg mb-4"
            />
            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">
              Our proprietary Nexus Inverter acts as the brain of your home, making
              microsecond decisions to optimize energy flow.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 relative z-10">
            {/* Invisible target for the shrink destination */}
            <div className="md:col-span-8 relative group flex flex-col justify-end p-8 md:p-12 pointer-events-auto h-full min-h-[400px]">
              <div ref={targetRef} className="absolute inset-0 w-full h-full pointer-events-none rounded-3xl" />
            </div>

            {/* Side cards */}
            <div className="md:col-span-4 flex flex-col gap-3 pointer-events-auto">
              {[
                {
                  icon: <Route className="text-primary-fixed mb-2 w-6 h-6" />,
                  title: "Smart Switching",
                  body: "Seamlessly transitions between solar harvesting, battery discharge, and grid backup in less than 10 milliseconds.",
                  delay: 0.1,
                  glow: true,
                },
                {
                  icon: <Zap className="text-primary-fixed mb-2 w-6 h-6" />,
                  title: "Grid Sync",
                  body: "Real-time synchronization with local utility prices to export energy at peak value.",
                  delay: 0.2,
                  glow: true,
                },
                {
                  icon: <BatteryCharging className="text-primary-fixed mb-2 w-6 h-6" />,
                  title: "Battery Guard",
                  body: "Advanced thermal management ensures 20-year operational lifespan for your storage.",
                  delay: 0.3,
                  glow: false,
                },
              ].map(({ icon, title, body, delay, glow }) => (
                <motion.div
                  key={title}
                  initial={{ y: 50, opacity: 0 }}
                  animate={showUI ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay }}
                  className="flex-1 flex flex-col"
                >
                  <GlassCard glowBorder={glow} className="flex-1 h-full !p-5 md:!p-6">
                    {icon}
                    <h3 className="font-headline-sm text-headline-sm text-primary mb-1">{title}</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">{body}</p>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
