import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { DataSection } from "@/components/data-section"

export default function DataPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />
      <div className="pt-20">
        <DataSection />
      </div>
      <Footer />
    </main>
  )
}
