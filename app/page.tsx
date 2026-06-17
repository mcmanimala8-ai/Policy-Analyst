import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { WritingSection } from "@/components/writing-section"
import { NotesSection } from "@/components/notes-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Manimala Chithamanan | Tamil Nadu Governance Data & Political Risk Strategy",
  description: "Independent Tamil Nadu governance desk focused on sub-national public sector data, operational frameworks, technical policy briefs, and political risk strategy.",
}

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <WritingSection />
      <NotesSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
