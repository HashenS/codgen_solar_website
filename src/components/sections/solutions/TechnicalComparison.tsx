"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export const TechnicalComparison = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".comparison-table-row", {
        x: -20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="py-section-gap bg-surface-container-lowest">
      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="text-center mb-20">
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-6">
            Technical Architecture Comparison
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Precision metrics for informed decision-making.
          </p>
        </div>

        <div className="overflow-x-auto pb-4">
          <table className="w-full text-left border-collapse glass-panel rounded-xl overflow-hidden min-w-[800px]">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="p-8 font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest">
                  Metric
                </th>
                <th className="p-8 font-headline-md text-headline-md text-primary-fixed-dim">
                  On-Grid
                </th>
                <th className="p-8 font-headline-md text-headline-md text-primary-fixed-dim">
                  Off-Grid
                </th>
                <th className="p-8 font-headline-md text-headline-md text-primary-fixed-dim">
                  Hybrid
                </th>
              </tr>
            </thead>
            <tbody className="font-body-md text-body-md">
              <tr className="comparison-table-row border-b border-white/10 hover:bg-white/5 transition-colors">
                <td className="p-8 text-on-surface font-medium">Energy Autonomy</td>
                <td className="p-8 text-on-surface-variant">Low (Grid Dependent)</td>
                <td className="p-8 text-on-surface-variant">100% (Total Independent)</td>
                <td className="p-8 text-on-surface-variant">Partial (Intelligent Backup)</td>
              </tr>
              <tr className="comparison-table-row border-b border-white/10 hover:bg-white/5 transition-colors">
                <td className="p-8 text-on-surface font-medium">ROI Speed</td>
                <td className="p-8 text-on-surface-variant">Rapid (3-5 Years)</td>
                <td className="p-8 text-on-surface-variant">Moderate (LCOE focus)</td>
                <td className="p-8 text-on-surface-variant">Balanced (5-8 Years)</td>
              </tr>
              <tr className="comparison-table-row border-b border-white/10 hover:bg-white/5 transition-colors">
                <td className="p-8 text-on-surface font-medium">Backup Capability</td>
                <td className="p-8 text-on-surface-variant">None</td>
                <td className="p-8 text-on-surface-variant">Infinite (Battery Limited)</td>
                <td className="p-8 text-on-surface-variant">Priority Load Support</td>
              </tr>
              <tr className="comparison-table-row hover:bg-white/5 transition-colors">
                <td className="p-8 text-on-surface font-medium">Installation Complexity</td>
                <td className="p-8 text-on-surface-variant">Minimal</td>
                <td className="p-8 text-on-surface-variant">High Precision</td>
                <td className="p-8 text-on-surface-variant">Sophisticated</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
