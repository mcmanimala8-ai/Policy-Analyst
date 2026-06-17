import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import MPTracker from "@/components/mp-tracker"

export const metadata = {
  title: "TN MP Watch | Tamil Nadu Governance Desk",
  description:
    "Track the legislative performance of Tamil Nadu's 39 Lok Sabha MPs — attendance, questions, debates, bills, and MPLADS utilisation.",
}

export default function TrackerPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />
      <div className="pt-20">
        <MPTracker />
      </div>
      <Footer />
    </main>
  )
}
