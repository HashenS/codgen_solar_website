import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/sections/Footer";
import { SolutionsHero } from "@/components/sections/solutions/SolutionsHero";
import { SolutionGrid } from "@/components/sections/solutions/SolutionGrid";
import { TechnicalComparison } from "@/components/sections/solutions/TechnicalComparison";
import { IntegratedTechnology } from "@/components/sections/solutions/IntegratedTechnology";
import { SolutionsCTA } from "@/components/sections/solutions/SolutionsCTA";
import { QuoteForm } from "@/components/sections/QuoteForm";

export default function SolutionsPage() {
  return (
    <main className="flex min-h-screen flex-col bg-background text-on-background relative">
      <Navbar />
      <SolutionsHero />
      <SolutionGrid />
      <TechnicalComparison />
      <IntegratedTechnology />
      <QuoteForm />
      <SolutionsCTA />
      <Footer />
    </main>
  );
}
