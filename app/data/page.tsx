import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { DataTopicChart } from "@/components/data-topic-chart"
import { Database } from "lucide-react"

const sidebarLinks = [
  { href: "#overview", label: "Overview" },
  { href: "#dashboard", label: "Performance dashboard" },
  { href: "#flow", label: "Operational flow" },
  { href: "#risk", label: "Strategic implications" },
  { href: "#education", label: "Current dataset" },
  { href: "#standards", label: "Data standards" },
]

const dashboardRows = [
  ["Promise", "What the department or programme says it will deliver"],
  ["Allocation", "What the budget, scheme note, or administrative order makes possible"],
  ["Achievement", "What field data, survey data, or official reporting shows"],
  ["Gap", "Where the claim, money, and outcome fail to match"],
]

const flowSteps = [
  "Policy announcement",
  "Administrative order",
  "Budget release",
  "District execution",
  "Field verification",
  "Public outcome",
]

const riskRows = [
  ["Operational gap", "Which delivery failure is visible to citizens"],
  ["Affected group", "Which demographic, region, or economic block feels it most"],
  ["Political exposure", "How the gap can become a campaign vulnerability"],
  ["Leadership response", "What communication or correction is strategically available"],
]

const educationCards = [
  { label: "Out of school", value: "0.1%", text: "Children aged 6-14 not in school in rural Tamil Nadu." },
  { label: "Government schools", value: "68.7%", text: "Children aged 6-14 enrolled in government schools." },
  { label: "Std III reading", value: "12.0%", text: "Children who can read Std II level text." },
  { label: "Mid-day meal", value: "99.2%", text: "Surveyed schools where meal was served on survey day." },
]

const standards = [
  "Every chart must have a named source and year.",
  "Raw figures should be converted into readable labels before publication.",
  "Code outputs, script variables, and terminal traces must never appear in public tables.",
  "Limitations must sit next to interpretation, not hidden at the end.",
  "A data point should support a clear administrative or political question.",
]

const sources = [
  "ASER 2024 Final Report, Tamil Nadu Rural profile",
  "ASER 2024 Final Report, rural India state-comparison tables",
]

export default function DataPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />

      <section className="border-b border-border pt-28 pb-12">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">Data Lab</p>
          <h1 className="font-serif text-4xl md:text-6xl tracking-tight max-w-4xl mb-6">
            Policy evidence built for technical writing and political strategy
          </h1>
          <p className="text-muted-foreground max-w-3xl text-lg leading-relaxed">
            A neutral, reusable lab for turning public datasets into clean dashboards, administrative flow analysis, and strategic briefs. The structure can adapt to any policy domain while keeping sources, caveats, and interpretation visible.
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
            <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">Operating model</p>
            <h2 className="font-serif text-3xl tracking-tight mb-4">What the Data Lab is designed to prove</h2>
            <p className="text-muted-foreground leading-relaxed max-w-3xl">
              The goal is to show that a policy question can be handled end to end: clean data, readable evidence, administrative understanding, and strategic interpretation. This is the portfolio bridge between technical writing and political consultancy.
            </p>
          </section>

          <section id="dashboard" className="scroll-mt-28 border border-border bg-card p-6 md:p-8">
            <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">Pillar 01</p>
            <h2 className="font-serif text-3xl tracking-tight mb-4">Policy performance dashboard</h2>
            <p className="text-muted-foreground leading-relaxed max-w-3xl mb-6">
              Each dataset should become a target-versus-achievement view: what was promised, what was funded, what was delivered, and where the gap appears.
            </p>
            <div className="border border-border overflow-hidden">
              {dashboardRows.map(([label, text]) => (
                <div key={label} className="grid md:grid-cols-[180px_1fr] border-b border-border last:border-b-0">
                  <div className="bg-secondary/40 p-4 text-sm font-medium">{label}</div>
                  <div className="p-4 text-sm text-muted-foreground">{text}</div>
                </div>
              ))}
            </div>
          </section>

          <section id="flow" className="scroll-mt-28 border border-border bg-card p-6 md:p-8">
            <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">Pillar 02</p>
            <h2 className="font-serif text-3xl tracking-tight mb-4">Operational flowchart</h2>
            <p className="text-muted-foreground leading-relaxed max-w-3xl mb-6">
              Policy analysis becomes stronger when it maps the actual administrative path from decision to delivery. The useful question is not only whether a scheme worked, but where the wiring slowed down.
            </p>
            <div className="grid md:grid-cols-3 gap-3">
              {flowSteps.map((step, index) => (
                <div key={step} className="border border-border bg-background p-4 min-h-28">
                  <p className="text-xs uppercase tracking-widest text-accent mb-3">Step {index + 1}</p>
                  <p className="font-serif text-xl">{step}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="risk" className="scroll-mt-28 border border-border bg-card p-6 md:p-8">
            <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">Pillar 03</p>
            <h2 className="font-serif text-3xl tracking-tight mb-4">Strategic implications for leadership</h2>
            <p className="text-muted-foreground leading-relaxed max-w-3xl mb-6">
              Each data brief should end with the political meaning of the administrative gap: who is affected, how the issue may be framed, and what leadership needs to know before it becomes a public vulnerability.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {riskRows.map(([label, text]) => (
                <div key={label} className="border border-border bg-background p-5">
                  <h3 className="font-serif text-xl mb-3">{label}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="education" className="scroll-mt-28 border border-border bg-card p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
              <div>
                <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">Applied dataset 01</p>
                <h2 className="font-serif text-3xl tracking-tight mb-4">Education: access solved, learning unfinished</h2>
                <p className="text-muted-foreground leading-relaxed max-w-3xl">
                  The first applied dataset uses ASER 2024 rural Tamil Nadu data to demonstrate the Data Lab method: dashboard evidence, learning charts, delivery indicators, and clear caveats.
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

            <DataTopicChart type="education-reading" />
            <DataTopicChart type="education-facilities" />
          </section>

          <section id="standards" className="scroll-mt-28 border border-border bg-card p-6 md:p-8">
            <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">Data standards</p>
            <h2 className="font-serif text-3xl tracking-tight mb-4">Clean data, visible limits</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {standards.map((item) => (
                <p key={item} className="border border-border bg-background p-4 text-sm text-muted-foreground leading-relaxed">
                  {item}
                </p>
              ))}
            </div>
            <div className="border border-border bg-secondary/30 p-5">
              <h3 className="font-serif text-xl mb-3">Current source trail</h3>
              <div className="divide-y divide-border">
                {sources.map((source) => (
                  <p key={source} className="py-3 text-sm text-muted-foreground">
                    {source}
                  </p>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  )
}
