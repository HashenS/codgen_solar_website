"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      // Small delay to ensure smooth transition and allow fonts to snap into place
      setTimeout(() => {
        setIsLoading(false);
      }, 800);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      // Fallback timeout of 6 seconds just in case the window load event hangs
      const fallback = setTimeout(() => {
        setIsLoading(false);
      }, 6000);
      
      return () => {
        window.removeEventListener("load", handleLoad);
        clearTimeout(fallback);
      };
    }
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, filter: "blur(10px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <Image 
              src="/cg-solar.png" 
              alt="Codegen Solar Loading" 
              width={260}
              height={80}
              priority
              className="drop-shadow-[0_0_20px_rgba(14,156,92,0.4)]" 
            />
          </motion.div>
          
          <motion.div 
            className="mt-12 w-48 h-[2px] bg-white/10 rounded-full overflow-hidden relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <motion.div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#0e9c5c] to-[#0863a8]"
              initial={{ width: "0%" }}
              animate={{ width: isLoading ? "90%" : "100%" }}
              transition={{ 
                duration: isLoading ? 3 : 0.4, 
                ease: isLoading ? "easeOut" : "easeInOut" 
              }}
            />
            {/* Indeterminate sweep effect over the bar */}
            <motion.div 
              className="absolute top-0 h-full w-[40%] bg-white/40 blur-[2px]"
              animate={{ 
                left: ["-40%", "140%"] 
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
