import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { CaseStudiesSection } from "@/components/case-studies-section"
import { WritingSection } from "@/components/writing-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main>
      <Navigation />
      <HeroSection />
      <AboutSection />
      <CaseStudiesSection />
      <WritingSection />
      <ContactSection />
      <Footer />
    </main>
  )
}