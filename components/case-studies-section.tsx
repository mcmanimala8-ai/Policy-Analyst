"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function CaseStudiesSection() {
  const caseStudies = [
    {
      id: "social-justice",
      title: "SC/ST Justice: The Conviction Pipeline Collapse",
      subtitle: "Social Justice Domain",
      description: "Tamil Nadu files more SC/ST atrocity cases than most states. Police investigate seriously. But only 8.5% end in conviction. Where does justice disappear?",
      findings: [
        "100 FIRs → 79.7% charge sheets → 23.4% trials → 8.5% convictions",
        "Every year in trial = 4x lower conviction rate",
        "Rural districts worst hit: only 4-7% convictions"
      ],
      cta: "Read Case Study"
    },
    {
      id: "caste-marriage",
      title: "Caste & Marriage: The Dravidian Paradox",
      subtitle: "Social Justice Domain",
      description: "TN claims to be anti-caste. Yet shows the highest caste endogamy in India — 97.4% same-caste marriages. An ideology-behavior gap that data reveals.",
      findings: [
        "TN: 97.4% same-caste marriages (worst in India)",
        "Only 1.3% marry down-caste vs 5.1% nationally",
        "Kerala shows 21.3% intercaste vs TN's 2.6%"
      ],
      cta: "Read Case Study"
    }
  ]

  return (
    <section id="cases" className="py-24 border-b border-border bg-secondary/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
            Case Studies
          </p>
          <h2 className="font-serif text-3xl md:text-4xl tracking-tight mb-4">
            What Works. What Doesn't. The Data.
          </h2>
          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            Tamil Nadu Governance Desk publishes data-driven case studies on policy delivery. No ideology. Just numbers and their meaning.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {caseStudies.map((study) => (
            <Link
              key={study.id}
              href={`/${study.id}`}
              className="group"
            >
              <div className="border border-border bg-card p-8 rounded-lg hover:border-accent transition-all h-full flex flex-col">
                <div className="mb-6">
                  <p className="text-xs uppercase tracking-widest text-accent mb-2">
                    {study.subtitle}
                  </p>
                  <h3 className="font-serif text-xl tracking-tight leading-tight group-hover:text-accent transition-colors">
                    {study.title}
                  </h3>
                </div>

                <p className="text-sm text-muted-foreground mb-6 leading-relaxed flex-grow">
                  {study.description}
                </p>

                <div className="mb-6 border-t border-border pt-6">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
                    Key Findings
                  </p>
                  <ul className="space-y-2">
                    {study.findings.map((finding, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex gap-2">
                        <span className="text-accent">•</span>
                        <span>{finding}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center gap-2 text-sm font-medium text-accent group-hover:gap-3 transition-all">
                  {study.cta}
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 p-6 bg-background border border-border rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Coming soon:</strong> Health (NFHS-5 access analysis), Demographics (fertility as federal liability), Labour (employment + wages by district).
          </p>
        </div>
      </div>
    </section>
  )
}
