import { BarChart3, Landmark, Scale, Users } from "lucide-react"

const workAreas = [
  {
    title: "Federalism & Representation",
    description: "Analysis of delimitation, population metrics, fiscal devolution, and how institutional design shapes state power.",
    icon: Landmark,
  },
  {
    title: "Welfare Delivery",
    description: "Field-informed thinking on how public programs move from policy design to last-mile implementation.",
    icon: Users,
  },
  {
    title: "Platform Economy",
    description: "Research on youth employment, gig work, social security, and the gap between flexibility and protection.",
    icon: BarChart3,
  },
  {
    title: "Gender & Public Institutions",
    description: "Policy questions around representation, institutional access, and the design of more inclusive governance systems.",
    icon: Scale,
  },
]

export function SelectedWorkSection() {
  return (
    <section id="work" className="py-24 border-b border-border bg-secondary/20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
            Focus Areas
          </p>
          <h2 className="font-serif text-3xl md:text-4xl tracking-tight mb-4">
            Selected Work
          </h2>
          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            My work connects policy research, field realities, and data-led argumentation across governance questions that shape everyday life.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-border border border-border">
          {workAreas.map((area) => {
            const Icon = area.icon
            return (
              <div key={area.title} className="bg-background p-6 md:p-8">
                <Icon className="w-6 h-6 text-accent mb-5" />
                <h3 className="font-serif text-xl mb-3">{area.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {area.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
