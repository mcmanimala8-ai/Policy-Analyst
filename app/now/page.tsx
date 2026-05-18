import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Now | Manimala Chithamanan",
  description: "What Manimala Chithamanan is currently working on, reading, and thinking about.",
}

export default function NowPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="border-b border-border py-4 px-6">
        <div className="max-w-2xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-16">
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Updated May 2026</p>
        <h1 className="font-serif text-4xl mb-2">Now</h1>
        <p className="text-muted-foreground text-sm mb-12">What I'm working on, reading, and thinking about right now.</p>

        <div className="space-y-12">
          <section>
            <h2 className="font-serif text-xl text-foreground mb-4">Working on</h2>
            <ul className="space-y-3 text-muted-foreground leading-relaxed list-none">
              <li>IMPRI Data Analytics Fellowship (2026 cohort) — building with R and Stata on state-level fiscal datasets</li>
              <li>Research abstract on manual scavenging deaths and data mismatch in Tamil Nadu</li>
              <li>Two standalone pieces on the 2026 Tamil Nadu election — the Dravidian movement's anti-caste failure and TVK's candidate contradictions</li>
              <li>Applying for policy research roles in political offices and civil society organisations</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl text-foreground mb-4">Recently published</h2>
            <ul className="space-y-3 text-muted-foreground leading-relaxed list-none">
              <li>
                <Link href="/writing/algorithm-beat-alliance" className="text-foreground hover:text-accent transition-colors">
                  When the Algorithm Beat the Alliance: Tamil Nadu 2026
                </Link>
                {" "}— a full audit of how TVK's digital campaign defeated the DMK alliance and what it means for Dravidian politics
              </li>
              <li>
                <Link href="/writing/success-trap" className="text-foreground hover:text-accent transition-colors">
                  The Success Trap
                </Link>
                {" "}— on how Tamil Nadu's demographic success became a liability under delimitation
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl text-foreground mb-4">Reading</h2>
            <ul className="space-y-3 text-muted-foreground leading-relaxed list-none">
              <li>State government budget documents and PLFS data for the IMPRI fellowship</li>
              <li>Frontline and The Hindu for Tamil Nadu governance and politics coverage</li>
              <li>Academic work on fiscal federalism and centre-state relations in India</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl text-foreground mb-4">Thinking about</h2>
            <ul className="space-y-3 text-muted-foreground leading-relaxed list-none">
              <li>Whether the Dravidian movement can rebuild its relationship with Dalit and working class voters before 2031</li>
              <li>How platform economy regulation in India is failing gig workers at the state level</li>
              <li>The structural reasons why good policy design consistently fails at last-mile delivery</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl text-foreground mb-4">Based in</h2>
            <p className="text-muted-foreground">Chennai, Tamil Nadu. Open to remote and hybrid roles.</p>
          </section>
        </div>

        <div className="border-t border-border mt-16 pt-8">
          <p className="text-xs text-muted-foreground">
            This is a <a href="https://nownownow.com/about" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground transition-colors">/now page</a> — a snapshot of what I'm focused on at this point in time.
          </p>
        </div>
      </div>
    </main>
  )
}
