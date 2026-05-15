import dynamic from "next/dynamic";
import { Navbar } from "@/components/ui/Navbar";
import { Hero } from "@/components/sections/Hero";

const SmartSwitching = dynamic(() => import("@/components/sections/SmartSwitching").then(m => m.SmartSwitching));
const PeaceOfMind = dynamic(() => import("@/components/sections/PeaceOfMind").then(m => m.PeaceOfMind));
const LiveEnergyCommand = dynamic(() => import("@/components/sections/LiveEnergyCommand").then(m => m.LiveEnergyCommand));
const SolarCalculator = dynamic(() => import("@/components/sections/SolarCalculator").then(m => m.SolarCalculator));
const FAQ = dynamic(() => import("@/components/sections/FAQ").then(m => m.FAQ));
const ScrollVelocity = dynamic(() => import("@/components/ui/ScrollVelocity").then(m => m.ScrollVelocity));
const CTA = dynamic(() => import("@/components/sections/CTA").then(m => m.CTA));
const Footer = dynamic(() => import("@/components/sections/Footer").then(m => m.Footer));

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-background text-on-background relative">
      <Navbar />
      <Hero />
      <div className="relative z-20 bg-background w-full">
        <SmartSwitching />
        <PeaceOfMind />
        <LiveEnergyCommand />
        <SolarCalculator />
        <FAQ />
        <div className="py-12 md:py-24 overflow-hidden bg-background border-y border-white/5 relative z-10">
          <ScrollVelocity 
            text="POWER YOUR FUTURE • TAKE COMMAND • SMART GRID READY • " 
            className="font-display-hero text-[60px] md:text-[120px] font-bold text-primary drop-shadow-[0_0_20px_rgba(163,255,18,0.3)] tracking-tighter"
            velocity={1}
          />
        </div>
        <CTA />
        <Footer />
      </div>
    </main>
  );
}
