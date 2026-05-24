import { ArrowUpRight, Database, AlertTriangle, CheckCircle2 } from "lucide-react"

const caveats = [
  "ASER 2024 is rural-only, so it cannot represent Chennai, Coimbatore, Madurai, or other urban schooling systems.",
  "ASER tests foundational reading and arithmetic at home; it is not a board-exam or classroom-quality measure.",
  "Government-private comparisons are affected by income, parental education, caste/class, and geography.",
  "Facilities show delivery capacity, but toilets, computers, and textbooks do not automatically produce learning.",
]

export function EducationRepositorySection() {
  return (
    <section id="education-repository" className="py-20 border-b border-border bg-secondary/20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
          <div>
            <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">Repository Entry 01</p>
            <h2 className="font-serif text-3xl md:text-4xl tracking-tight mb-4">
              Dravidian Model: Education Evidence Ledger
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              The first dataset uses ASER 2024 rural Tamil Nadu data to show both sides of the education story: strong access and welfare delivery, but unfinished foundational learning.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="/education"
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Open education page
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <a
                href="/data/aser-2024-tamil-nadu-education.csv"
                className="inline-flex items-center gap-2 px-4 py-2 border border-border text-sm font-medium hover:border-accent transition-colors"
              >
                <Database className="w-4 h-4" />
                Download CSV
              </a>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="border border-border bg-card p-5">
              <CheckCircle2 className="w-5 h-5 text-accent mb-4" />
              <p className="font-serif text-3xl text-accent mb-2">0.1%</p>
              <p className="text-sm text-muted-foreground">Children aged 6-14 not in school in rural Tamil Nadu.</p>
            </div>
            <div className="border border-border bg-card p-5">
              <CheckCircle2 className="w-5 h-5 text-accent mb-4" />
              <p className="font-serif text-3xl text-accent mb-2">99.2%</p>
              <p className="text-sm text-muted-foreground">Surveyed schools where mid-day meal was served on the day of visit.</p>
            </div>
            <div className="border border-border bg-card p-5">
              <AlertTriangle className="w-5 h-5 text-accent mb-4" />
              <p className="font-serif text-3xl text-accent mb-2">12.0%</p>
              <p className="text-sm text-muted-foreground">Std III children who can read Std II level text.</p>
            </div>
            <div className="border border-border bg-card p-5">
              <AlertTriangle className="w-5 h-5 text-accent mb-4" />
              <p className="font-serif text-3xl text-accent mb-2">28.5%</p>
              <p className="text-sm text-muted-foreground">Schools where computers were being used by children on survey day.</p>
            </div>
          </div>
        </div>

        <div className="mt-10 border border-border bg-background/60 p-5">
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">Data drawbacks</p>
          <div className="grid md:grid-cols-2 gap-4">
            {caveats.map((item) => (
              <p key={item} className="text-sm text-muted-foreground leading-relaxed">
                {item}
              </p>
            ))}
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mt-5">
            ASER is best used as a warning light, not a final verdict: it shows that Tamil Nadu has strong access and delivery capacity, while foundational learning remains a serious unresolved weakness.
          </p>
        </div>
      </div>
    </section>
  )
}
