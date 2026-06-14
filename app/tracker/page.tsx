import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { TrackerHero } from "@/components/tracker/tracker-hero"
import { TrackerDashboard } from "@/components/tracker/tracker-dashboard"

export const metadata = {
  title: "Tamil Nadu MP Tracker (18th Lok Sabha) | Tamil Nadu Governance Desk",
  description:
    "An independent tracker of the parliamentary performance of Tamil Nadu's 39 Members of Parliament in the 18th Lok Sabha.",
}

export default function TrackerPage() {
  return (
    <main>
      <Navigation />
      <TrackerHero />
      <TrackerDashboard />
      <Footer />
    </main>
  )
}