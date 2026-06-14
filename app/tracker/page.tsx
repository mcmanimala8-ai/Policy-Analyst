import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { TrackerHero } from "@/components/tracker/tracker-hero"
import { TrackerDashboard } from "@/components/tracker/tracker-dashboard"

export const metadata = {
  title: "TN MP Watch | Tamil Nadu Governance Desk",
  description:
    "Track how Tamil Nadu's 39 Lok Sabha MPs perform across attendance, questions, debates, and MPLADS fund utilisation. Built for the 2029 elections.",
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
