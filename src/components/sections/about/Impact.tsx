"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CheckCircle } from "lucide-react";

export const Impact = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".impact-text", {
        x: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      });

      gsap.from(".impact-image", {
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
        <div className="order-2 md:order-1 impact-image relative h-[500px] w-full">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuALytXvycn8ahYGfiDm9ZjDL08trhyMmrv6ExFYjJVGeJvtCrlEZe5GBE8ajw1WM_8WG6Kb5m_554X4iANLtmdAknUa__QrKYvBY8kBkgSKbYENwfkFn-wYvlfXwgD06pwuVd654AzLyf6A2Ne-A1Dvxca6Ul19Xg-OeHAzcXxWXuTxH_WOsYtR7Va1lhWH4F8CK9z7W2rCizx-SVq3LVLclXbtqaeu1SpnbmEXV47z_6_8sLGfPl67Q9ZBCoMisE11X_7AOFjHcjOl"
            alt="Sustainable community"
            fill
            className="rounded-2xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-700 object-cover"
          />
        </div>

        <div className="order-1 md:order-2">
          <span className="impact-text font-label-caps text-label-caps text-primary-fixed-dim mb-4 block uppercase">
            The Impact
          </span>
          <h2 className="impact-text font-headline-lg text-headline-lg text-primary mb-8 leading-tight">
            Pioneering a <br />
            Sustainable Future
          </h2>
          <p className="impact-text font-body-lg text-body-lg text-on-surface-variant mb-8">
            We are transforming how industries and communities operate. By focusing
            on high-efficiency products and localized energy storage, we empower the
            next generation to thrive without compromise.
          </p>

          <ul className="space-y-4">
            {[
              "Net-Zero Industrial Solutions",
              "Community Micro-grid Empowerment",
              "Advanced Energy Storage Integration",
            ].map((item, idx) => (
              <li key={idx} className="impact-text flex items-center gap-4 font-body-md text-body-md text-primary">
                <CheckCircle className="text-primary-fixed-dim w-6 h-6 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
