const drawbacks = [
  {
    title: "Rural-only evidence",
    text: "ASER 2024 covers rural Tamil Nadu. It should not be used as a full estimate for Chennai, Coimbatore, Madurai, or the state's urban schooling system.",
  },
  {
    title: "Foundational skills, not full education quality",
    text: "The test captures basic reading and arithmetic. It does not measure writing, science, social science, reasoning, creativity, board-exam performance, or classroom culture.",
  },
  {
    title: "Household assessment",
    text: "Children are assessed at home, not through school exams. This is useful for real learning levels, but it is not the same as official school assessment data.",
  },
  {
    title: "Post-pandemic distortion",
    text: "The 2022 and 2024 learning numbers are shaped by COVID-era school disruption and recovery. Trend lines after 2020 need careful reading.",
  },
  {
    title: "Government-private comparison limits",
    text: "School-type gaps are affected by income, parental education, caste/class background, and geography. They are not automatic proof that one system is better.",
  },
  {
    title: "Facilities are not learning",
    text: "Toilets, electricity, textbooks, computers, and mid-day meals show delivery capacity. They do not by themselves prove teaching quality or learning outcomes.",
  },
]

export function DataDrawbacksSection() {
  return (
    <section className="py-16 border-b border-border bg-secondary/20">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">Data drawbacks</p>
        <h2 className="font-serif text-3xl tracking-tight mb-4">What this data cannot prove</h2>
        <p className="text-muted-foreground max-w-3xl leading-relaxed mb-8">
          This repository uses ASER as a warning light, not as a final verdict on the Dravidian model. The data is valuable because it is comparable and independent, but its limits must stay visible.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          {drawbacks.map((item) => (
            <div key={item.title} className="border border-border bg-card p-5">
              <h3 className="font-serif text-xl mb-3">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed mt-6">
          Bottom line: ASER shows that Tamil Nadu has strong access and delivery capacity, while foundational learning remains a serious unresolved weakness. It does not, by itself, prove total success or total failure.
        </p>
      </div>
    </section>
  )
}
