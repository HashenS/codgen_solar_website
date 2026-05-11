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
      <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.673477016268!2d79.85854657515601!3d6.929575918310942!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25910773775c5%3A0xf1a31b65302d429d!2sCodeGen%20International%20(Pvt)%20Ltd!5e0!3m2!1sen!2slk!4v1778483224229!5m2!1sen!2slk"
      width={800}
      height={600}
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className="w-full"
    />
      <Footer />
    </main>
  );
}
