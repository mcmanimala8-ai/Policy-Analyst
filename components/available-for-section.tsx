import { FileText, LineChart, MessagesSquare, Search } from "lucide-react"

const opportunities = [
  {
    title: "Policy Research",
    description: "Issue briefs, literature reviews, policy notes, and evidence synthesis for governance questions.",
    icon: Search,
  },
  {
    title: "Data Analysis",
    description: "Public-data interpretation, charts, dashboards, and research-ready visual narratives.",
    icon: LineChart,
  },
  {
    title: "Policy Writing",
    description: "Articles, explainers, op-eds, and long-form argumentation for public policy audiences.",
    icon: FileText,
  },
  {
    title: "Research Collaboration",
    description: "Support for fellowships, civil society projects, academic work, and policy communications.",
    icon: MessagesSquare,
  },
]

export function AvailableForSection() {
  return (
    <section id="available" className="py-24 border-b border-border">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-4">
            <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
              Open To
            </p>
            <h2 className="font-serif text-3xl md:text-4xl tracking-tight mb-4">
              Research, writing, and policy projects
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Open to roles and collaborations that combine policy analysis, public data, and clear communication.
            </p>
          </div>

          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-4">
            {opportunities.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="border border-border p-5 bg-card">
                  <Icon className="w-5 h-5 text-accent mb-4" />
                  <h3 className="font-serif text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
