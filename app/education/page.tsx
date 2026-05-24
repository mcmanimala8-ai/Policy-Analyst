const highlights = [
  {
    label: "Access success",
    value: "0.1%",
    text: "Children aged 6-14 not in school in rural Tamil Nadu.",
  },
  {
    label: "Public system footprint",
    value: "68.7%",
    text: "Children aged 6-14 enrolled in government schools.",
  },
  {
    label: "Foundational warning",
    value: "12.0%",
    text: "Std III children who can read Std II level text.",
  },
  {
    label: "Delivery strength",
    value: "99.2%",
    text: "Surveyed schools where mid-day meal was served on the day of visit.",
  },
]

const readingTrend = [
  { year: "2014", govt: 16.8, pvt: 14.4, all: 15.9 },
  { year: "2016", govt: 20.2, pvt: 13.5, all: 17.7 },
  { year: "2018", govt: 11.6, pvt: 7.6, all: 10.2 },
  { year: "2022", govt: 4.7, pvt: 5.0, all: 4.8 },
  { year: "2024", govt: 13.2, pvt: 9.4, all: 12.0 },
]

const facilityData = [
  { indicator: "Mid-day meal served", value: 99.2 },
  { indicator: "Kitchen/shed for meal", value: 96.6 },
  { indicator: "Drinking water available", value: 77.7 },
  { indicator: "Usable toilet", value: 81.4 },
  { indicator: "Girls toilet usable", value: 77.5 },
  { indicator: "Library books used", value: 64.3 },
  { indicator: "Computer used by children", value: 28.5 },
]

const evidenceRows = [
  ["Access", "Age 6-14 not in school", "0.1%", "Success"],
  ["Access", "Age 6-14 in government schools", "68.7%", "Public system footprint"],
  ["Learning", "Std III can read Std II text", "12.0%", "Failure / warning"],
  ["Learning", "Std V can read Std II text", "35.6%", "Failure / warning"],
  ["Learning", "Std VIII can read Std II text", "64.2%", "Mixed"],
  ["Delivery", "Mid-day meal served", "99.2%", "Success"],
  ["Delivery", "Computer used by children", "28.5%", "Implementation gap"],
]

export default function EducationRepositoryPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="border-b border-border pt-28 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">Dravidian Model Evidence Ledger</p>
          <h1 className="font-serif text-4xl md:text-6xl tracking-tight max-w-4xl mb-6">
            Education: access solved, learning unfinished
          </h1>
          <p className="text-muted-foreground max-w-3xl text-lg leading-relaxed">
            The first entry in this repository uses ASER 2024 rural Tamil Nadu data to separate the Dravidian model's delivery success from its learning gaps. The claim is deliberately balanced: Tamil Nadu has built a strong access-and-welfare state, but foundational learning remains the test it has not yet passed.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <a href="/data/aser-2024-tamil-nadu-education.csv" className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
              Download dataset
            </a>
            <a href="/#data" className="px-4 py-2 border border-border text-sm font-medium hover:border-accent transition-colors">
              Back to Data Lab
            </a>
          </div>
        </div>
      </section>

      <section className="py-12 border-b border-border">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-4">
          {highlights.map((item) => (
            <div key={item.label} className="border border-border bg-card p-5">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">{item.label}</p>
              <p className="font-serif text-4xl text-accent mb-3">{item.value}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 border-b border-border">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
          <div>
            <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">Core argument</p>
            <h2 className="font-serif text-3xl tracking-tight mb-4">A model can succeed at access and still fail at learning.</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The strongest defence of Tamil Nadu's education model is that it keeps children inside school and delivers welfare infrastructure at scale. The strongest critique is that access has not translated into strong foundational reading.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              This makes the education story useful for LinkedIn: it is not praise or attack. It is an evidence ledger with both columns visible.
            </p>
          </div>

          <div className="border border-border bg-card p-6">
            <h3 className="font-serif text-2xl mb-2">Std III reading recovery, Tamil Nadu rural</h3>
            <p className="text-sm text-muted-foreground mb-6">Percent of children who can read Std II level text.</p>
            <div className="space-y-5">
              {readingTrend.map((row) => (
                <div key={row.year}>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span>{row.year}</span>
                    <span className="text-muted-foreground">All: {row.all}%</span>
                  </div>
                  <div className="h-3 bg-secondary overflow-hidden">
                    <div className="h-full bg-accent" style={{ width: `${row.all}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-5">Source: ASER 2024 Final Report, Tamil Nadu Rural profile, Table 5.</p>
          </div>
        </div>
      </section>

      <section className="py-16 border-b border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">School delivery</p>
              <h2 className="font-serif text-3xl tracking-tight">The welfare state is visible inside schools.</h2>
            </div>
            <p className="text-sm text-muted-foreground max-w-md">Facilities data from surveyed government schools in rural Tamil Nadu, ASER 2024.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {facilityData.map((row) => (
              <div key={row.indicator} className="border border-border bg-card p-4">
                <div className="flex items-center justify-between gap-4 mb-3">
                  <span className="text-sm">{row.indicator}</span>
                  <span className="font-medium text-accent">{row.value}%</span>
                </div>
                <div className="h-2 bg-secondary overflow-hidden">
                  <div className="h-full bg-accent" style={{ width: `${row.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">Evidence table</p>
          <h2 className="font-serif text-3xl tracking-tight mb-8">Success and failure, side by side</h2>
          <div className="overflow-x-auto border border-border">
            <table className="w-full text-sm">
              <thead className="bg-secondary text-muted-foreground">
                <tr>
                  <th className="text-left p-4 font-medium">Category</th>
                  <th className="text-left p-4 font-medium">Indicator</th>
                  <th className="text-left p-4 font-medium">Value</th>
                  <th className="text-left p-4 font-medium">Reading</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {evidenceRows.map((row) => (
                  <tr key={row.join(":")}> 
                    {row.map((cell) => (
                      <td key={cell} className="p-4 text-muted-foreground">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-5">
            Source: ASER 2024 Final Report, rural Tamil Nadu profile. ASER is a rural household survey; these numbers should not be read as all-Tamil Nadu urban plus rural estimates.
          </p>
        </div>
      </section>
    </main>
  )
}
