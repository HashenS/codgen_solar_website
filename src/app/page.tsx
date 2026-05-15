import dynamic from "next/dynamic";
import { Navbar } from "@/components/ui/Navbar";
import { Hero } from "@/components/sections/Hero";

const SmartSwitching = dynamic(() => import("@/components/sections/SmartSwitching").then(m => m.SmartSwitching));
const PeaceOfMind = dynamic(() => import("@/components/sections/PeaceOfMind").then(m => m.PeaceOfMind));
const LiveEnergyCommand = dynamic(() => import("@/components/sections/LiveEnergyCommand").then(m => m.LiveEnergyCommand));
const SolarCalculator = dynamic(() => import("@/components/sections/SolarCalculator").then(m => m.SolarCalculator));
const FAQ = dynamic(() => import("@/components/sections/FAQ").then(m => m.FAQ));
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
        <CTA />
        <Footer />
      </div>
    </main>
  );
}
