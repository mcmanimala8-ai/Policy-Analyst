import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { MPTracker } from "@/components/mp-tracker"

export const metadata = {
  title: "MP Watch | Manimala Chithamanan",
  description: "Live legislative performance tracker for all 39 Tamil Nadu Lok Sabha MPs.",
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
