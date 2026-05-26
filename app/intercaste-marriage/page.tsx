import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { IntercasteMarriagePipeline } from "@/components/intercaste-marriage-pipeline"

export const metadata = {
  title: "Caste and Marriage: The Dravidian Paradox | Tamil Nadu Governance Desk",
  description: "Tamil Nadu has the highest caste endogamy in India despite its anti-caste ideology. A data-driven analysis of marriage, caste, and the limits of political reform.",
}

export default function IntercasteMarriagePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />
      <div className="pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-6">
          <IntercasteMarriagePipeline />
        </div>
      </div>
      <Footer />
    </main>
  )
}
