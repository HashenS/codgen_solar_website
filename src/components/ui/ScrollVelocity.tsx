"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
  wrap
} from "framer-motion";

interface ScrollVelocityProps {
  text: string;
  className?: string;
  velocity?: number;
}

export function ScrollVelocity({ text, className = "", velocity = 5 }: ScrollVelocityProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  
  // Map scroll velocity to a factor that multiplies the base movement speed.
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 1], {
    clamp: false
  });

  // Wrap the translation to seamlessly loop. We use a wide range to ensure we have enough duplicates.
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * velocity * (delta / 1000);

    // Change direction based on scroll velocity if moving fast enough
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    // Add extra speed based on scroll velocity
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className={`overflow-hidden whitespace-nowrap flex flex-nowrap m-0 w-full ${className}`}>
      <motion.div className="flex whitespace-nowrap gap-10 flex-nowrap items-center" style={{ x }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} className="block shrink-0">{text}</span>
        ))}
      </motion.div>
    </div>
  );
}
