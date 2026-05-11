import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FAQHero } from "@/components/sections/faqs/FAQHero";
import { KnowledgeBase } from "@/components/sections/faqs/KnowledgeBase";
import { FAQCTA } from "@/components/sections/faqs/FAQCTA";

export default function FAQsPage() {
  return (
    <main className="flex min-h-screen flex-col bg-background text-on-background relative">
      <Navbar />
      <FAQHero />
      <KnowledgeBase />
      <FAQCTA />
      <Footer />
    </main>
  );
}
