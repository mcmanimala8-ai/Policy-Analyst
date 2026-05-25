import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { SocialJusticePipeline } from "@/components/social-justice-pipeline"

export const metadata = {
  title: "SC/ST Justice Pipeline | Tamil Nadu Governance Desk",
  description: "How Tamil Nadu's SC/ST atrocity convictions collapse despite active police investigation. A data-driven analysis of India's most broken judicial system.",
}

export default function SocialJusticePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />
      <div className="pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-6">
          <SocialJusticePipeline />
        </div>
      </div>
      <Footer />
    </main>
  )
}
