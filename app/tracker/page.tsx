import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import dynamic from "next/dynamic"

const MPTracker = dynamic(
  () => import("@/components/mp-tracker").then(m => ({ default: m.MPTracker })),
  { 
    ssr: false,
    loading: () => (
      <div className="bg-slate-900 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-slate-600 border-t-slate-300 rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-slate-400">Loading MP Watch…</p>
        </div>
      </div>
    )
  }
)

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
