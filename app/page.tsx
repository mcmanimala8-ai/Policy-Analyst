import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { SelectedWorkSection } from "@/components/selected-work-section"
import { WritingSection } from "@/components/writing-section"
import { DataSection } from "@/components/data-section"
import { QuizSection } from "@/components/quiz-section"
import { ReadingSection } from "@/components/reading-section"
import { AvailableForSection } from "@/components/available-for-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main>
      <Navigation />
      <HeroSection />
      <AboutSection />
      <SelectedWorkSection />
      <WritingSection />
      <DataSection />
      <QuizSection />
      <ReadingSection />
      <AvailableForSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
