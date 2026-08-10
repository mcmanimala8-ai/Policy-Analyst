import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { WritingSection } from "@/components/writing-section"
import { NotesSection } from "@/components/notes-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Manimala Chithamanan | Independent Researcher — Tamil Nadu Politics, Policy & Governance",
  description: "Independent researcher focused on Tamil Nadu politics, policy, and governance — public sector data, policy analysis, and political research.",
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
