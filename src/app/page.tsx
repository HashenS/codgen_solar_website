import { Navbar } from "@/components/ui/Navbar";
import { Hero } from "@/components/sections/Hero";
import { SmartSwitching } from "@/components/sections/SmartSwitching";
import { PeaceOfMind } from "@/components/sections/PeaceOfMind";
import { LiveEnergyCommand } from "@/components/sections/LiveEnergyCommand";
import { SolarCalculator } from "@/components/sections/SolarCalculator";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-background text-on-background relative">
      <Navbar />
      <Hero />
      <SmartSwitching />
      <PeaceOfMind />
      <LiveEnergyCommand />
      <SolarCalculator />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
