import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/sections/Footer";
import { AboutHero } from "@/components/sections/about/AboutHero";
import { OurHeritage } from "@/components/sections/about/OurHeritage";
import { Values } from "@/components/sections/about/Values";
import { Impact } from "@/components/sections/about/Impact";
import { AboutCTA } from "@/components/sections/about/AboutCTA";

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col bg-background text-on-background relative">
      <Navbar />
      <AboutHero />
      <OurHeritage />
      <Values />
      <Impact />
      <AboutCTA />
      <Footer />
    </main>
  );
}
