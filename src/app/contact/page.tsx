import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/sections/Footer";
import { ContactHero } from "@/components/sections/contact/ContactHero";
import { ContactGrid } from "@/components/sections/contact/ContactGrid";
import { ContactCTA } from "@/components/sections/contact/ContactCTA";

export default function ContactPage() {
  return (
    <main className="flex min-h-screen flex-col bg-background text-on-background relative">
      <Navbar />
      <ContactHero />
      <ContactGrid />
      <ContactCTA />
      <Footer />
    </main>
  );
}
