"use client";

import { useEffect } from "react";

export function ScrollToTop() {
  useEffect(() => {
    // Prevent the browser from automatically restoring the previous scroll position
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    
    // Force scroll to the absolute top when the component mounts (page load)
    window.scrollTo(0, 0);
  }, []);

  return null;
}
