import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ArrowUpRight, Database } from "lucide-react"

const sidebarLinks = [
  { href: "#overview", label: "Overview" },
  { href: "#fertility", label: "Fertility & federalism" },
  { href: "#delimitation", label: "Delimitation" },
  { href: "#education", label: "Education" },
  { href: "#drawbacks", label: "Data drawbacks" },
  { href: "#sources", label: "Sources" },
]

const educationCards = [
  { label: "Out of school", value: "0.1%", text: "Children aged 6-14 not in school in rural Tamil Nadu." },
  { label: "Government schools", value: "68.7%", text: "Children aged 6-14 enrolled in government schools." },
  { label: "Std III reading", value: "12.0%", text: "Children who can read Std II level text." },
  { label: "Mid-day meal", value: "99.2%", text: "Surveyed schools where meal was served on survey day." },
]

const drawbacks = [
  "ASER 2024 is rural-only, so it should not be read as a full urban plus rural Tamil Nadu estimate.",
  "ASER tests foundational reading and arithmetic, not full education quality, board-exam outcomes, reasoning, writing, or classroom culture.",
  "Children are assessed at home, which is useful for real learning levels but different from official school assessment data.",
  "Post-2020 trends carry pandemic disruption and recovery effects, so 2022 and 2024 need careful interpretation.",
  "Government-private school comparisons are affected by income, parental education, caste/class background, and geography.",
  "Facilities show delivery capacity, but toilets, textbooks, electricity, meals, and computers do not automatically prove learning quality.",
]

const sources = [
  "ASER 2024 Final Report, Tamil Nadu Rural profile",
  "ASER 2024 Final Report, rural India state-comparison tables",
  "NFHS-5, 2019-21, National Family Health Survey",
  "Census 2011 and delimitation/population-share calculations used in current data lab charts",
]

export default function DataPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />

      <section className="border-b border-border pt-28 pb-12">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">Data Lab</p>
          <h1 className="font-serif text-4xl md:text-6xl tracking-tight max-w-4xl mb-6">
            Dravidian Model evidence, organised for scrutiny
          </h1>
          <p className="text-muted-foreground max-w-3xl text-lg leading-relaxed">
            A growing public data lab for testing claims about Tamil Nadu's governance model. Every data work belongs here, with success, failure, source notes, and limits visible together.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-10 grid lg:grid-cols-[240px_1fr] gap-10">
        <aside className="lg:sticky lg:top-24 lg:self-start border border-border bg-card p-4">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Locate</p>
          <nav className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible">
            {sidebarLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="shrink-0 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </aside>

        <div className="space-y-10">
          <section id="overview" className="scroll-mt-28 border border-border bg-card p-6 md:p-8">
            <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">Overview</p>
            <h2 className="font-serif text-3xl tracking-tight mb-4">What the Data Lab holds</h2>
            <p className="text-muted-foreground leading-relaxed max-w-3xl">
              This is the single location for all data work on the site. The homepage can preview charts, but the Data Lab holds the datasets, interpretation, drawbacks, and source trail.
            </p>
          </section>

          <section id="fertility" className="scroll-mt-28 border border-border bg-card p-6 md:p-8">
            <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">Dataset theme</p>
            <h2 className="font-serif text-3xl tracking-tight mb-4">Fertility and federalism</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              The existing data lab charts compare Tamil Nadu's low fertility trajectory with India and selected states. The political question is whether demographic success becomes a representation penalty under future delimitation.
            </p>
            <a href="/#data" className="inline-flex items-center gap-2 text-sm text-accent hover:text-foreground transition-colors">
              View current homepage charts
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </section>

          <section id="delimitation" className="scroll-mt-28 border border-border bg-card p-6 md:p-8">
            <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">Dataset theme</p>
            <h2 className="font-serif text-3xl tracking-tight mb-4">Delimitation and the performance penalty</h2>
            <p className="text-muted-foreground leading-relaxed max-w-3xl">
              This section tracks the argument that states which reduced fertility earlier may lose relative parliamentary weight if future seat allocation follows population alone. It belongs here as a federal equity dataset, not only as a chart.
            </p>
          </section>

          <section id="education" className="scroll-mt-28 border border-border bg-card p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
              <div>
                <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">Data Lab Entry 01</p>
                <h2 className="font-serif text-3xl tracking-tight mb-4">Education: access solved, learning unfinished</h2>
                <p className="text-muted-foreground leading-relaxed max-w-3xl">
                  ASER 2024 rural Tamil Nadu data shows the core education paradox: Tamil Nadu has strong access and delivery capacity, but foundational learning remains a serious unresolved weakness.
                </p>
              </div>
              <a
                href="/data/aser-2024-tamil-nadu-education.csv"
                className="inline-flex items-center gap-2 px-4 py-2 border border-border text-sm font-medium hover:border-accent transition-colors"
              >
                <Database className="w-4 h-4" />
                Download CSV
              </a>
            </div>

            <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
              {educationCards.map((card) => (
                <div key={card.label} className="border border-border bg-background p-5">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">{card.label}</p>
                  <p className="font-serif text-4xl text-accent mb-3">{card.value}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{card.text}</p>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="border border-border bg-secondary/30 p-5">
                <h3 className="font-serif text-xl mb-3">Success column</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Near-universal school access, strong government-school footprint, mid-day meal delivery, uniforms, textbooks, and visible welfare infrastructure.
                </p>
              </div>
              <div className="border border-border bg-secondary/30 p-5">
                <h3 className="font-serif text-xl mb-3">Failure column</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Foundational reading and classroom technology use lag behind what a high-social-development state should aim for.
                </p>
              </div>
            </div>
          </section>

          <section id="drawbacks" className="scroll-mt-28 border border-border bg-card p-6 md:p-8">
            <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">Data drawbacks</p>
            <h2 className="font-serif text-3xl tracking-tight mb-4">What this data cannot prove</h2>
            <p className="text-muted-foreground leading-relaxed max-w-3xl mb-6">
              ASER is best used as a warning light, not a final verdict. The limitations need to be visible because the Data Lab is meant for public argument, not propaganda.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {drawbacks.map((item) => (
                <p key={item} className="border border-border bg-background p-4 text-sm text-muted-foreground leading-relaxed">
                  {item}
                </p>
              ))}
            </div>
          </section>

          <section id="sources" className="scroll-mt-28 border border-border bg-card p-6 md:p-8">
            <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">Sources</p>
            <h2 className="font-serif text-3xl tracking-tight mb-4">Source trail</h2>
            <div className="divide-y divide-border">
              {sources.map((source) => (
                <p key={source} className="py-3 text-sm text-muted-foreground">
                  {source}
                </p>
              ))}
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  )
}
