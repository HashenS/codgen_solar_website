import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/sections/Footer";
import { ProjectsHero } from "@/components/sections/projects/ProjectsHero";
import { ProjectGrid } from "@/components/sections/projects/ProjectGrid";
import { ProjectsCTA } from "@/components/sections/projects/ProjectsCTA";

export default function ProjectsPage() {
  return (
    <main className="flex min-h-screen flex-col bg-background text-on-background relative">
      <Navbar />
      <ProjectsHero />
      <ProjectGrid />
      <ProjectsCTA />
      <Footer />
    </main>
  );
}
