"use client"

import { useState } from "react"
import { ArrowUpRight } from "lucide-react"

type WritingCategory = "all" | "essay" | "op-ed" | "field-notes" | "explainer"

interface WritingItem {
  title: string
  category: Exclude<WritingCategory, "all">
  publication: string
  date: string
  excerpt: string
  link: string
}

const writings: WritingItem[] = [
  {
    title: "When the Algorithm Beat the Alliance: Tamil Nadu 2026",
    category: "op-ed",
    publication: "Policy Commentary",
    date: "May 2026",
    excerpt: "A post-election analysis of Tamil Nadu 2026 arguing that anti-incumbency was amplified by algorithmic campaigning, narrative velocity, and failures in trust maintenance between elections.",
    link: "/writing/algorithm-alliance",
  },
  {
    title: "The Success Trap: Performance, Population and the Future of Indian Federalism",
    category: "essay",
    publication: "Research Paper",
    date: "April 2026",
    excerpt: "The defeat of the 131st Amendment Bill on April 17, 2026 was not just about women's reservation — it was an institutional veto against a population penalty. This article argues that delimitation and reservation are separate policy problems that must never be conflated into a single constitutional instrument.",
    link: "/writing/success-trap",
  },
  {
    title: "Platform Economy and Youth Employment: Structural Gaps in India's Development Model",
    category: "essay",
    publication: "Policy Commentary",
    date: "March 2026",
    excerpt: "India's educated youth are caught between a gig economy that offers income but no security, and a formal sector that isn't growing fast enough. Drawing on ground-level observations from Tamil Nadu's industrial ecosystem, this piece analyses the structural gaps that policy must urgently address.",
    link: "/writing/platform-economy",
  },
  {
    title: "The 2026 Governance Crisis: Are We Bypassing the State?",
    category: "op-ed",
    publication: "LinkedIn",
    date: "April 2026",
    excerpt: "As Tamil Nadu State Elections 2026 approach, a structural shift is happening between the Union, State, and Local Bodies. Three policy red flags — the MLA patronage trap, fiscal federalism vs. direct grants, and the lawmaker gap — reveal why subsidiarity is the answer for TN's trillion-dollar ambitions.",
    link: "https://www.linkedin.com/posts/manimala-c-29205b223_publicpolicy-delimitation2026-tfr-ugcPost-7450590915561304064-knwU?utm_source=share&utm_medium=member_android&rcm=ACoAADgSEM4BK-2mNL9kuSc9oh9Aj_5lCkImQu0",
  },
  {
    title: "Success is a Liability: The 2026 'Performance Tax'",
    category: "op-ed",
    publication: "LinkedIn",
    date: "April 2026",
    excerpt: "Tamil Nadu and Kerala crashed their Total Fertility Rate through democratic progress — well below replacement level. Yet with Delimitation 2026, these high-performing states risk losing their parliamentary voice. When success is penalised, incentive design is broken.",
    link: "https://www.linkedin.com/posts/manimala-c-29205b223_publicpolicy-tamilnadu2026-governancereform-ugcPost-7450039741221113857-KQPE?utm_source=share&utm_medium=member_desktop&rcm=ACoAADgSEM4BK-2mNL9kuSc9oh9Aj_5lCkImQu0",
  },
]

const categories: { value: WritingCategory; label: string }[] = [
  { value: "all", label: "All" },
  { value: "essay", label: "Essays" },
  { value: "op-ed", label: "Op-Eds" },
  { value: "field-notes", label: "Field Notes" },
  { value: "explainer", label: "Explainers" },
]

export function WritingSection() {
  const [activeCategory, setActiveCategory] = useState<WritingCategory>("all")

  const filteredWritings = activeCategory === "all" 
    ? writings 
    : writings.filter(w => w.category === activeCategory)

  return (
    <section id="writing" className="py-24 border-b border-border">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
              Archive
            </p>
            <h2 className="font-serif text-3xl md:text-4xl tracking-tight">
              Selected Writing
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-4 py-2 text-sm transition-colors ${
                  activeCategory === cat.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="divide-y divide-border">
          {filteredWritings.map((item, index) => (
            <a
              key={index}
              href={item.link}
              className="group block py-8 first:pt-0 last:pb-0"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs uppercase tracking-wider text-accent font-medium">
                      {item.category.replace("-", " ")}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {item.publication}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {item.date}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl md:text-2xl mb-2 group-hover:text-accent transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl">
                    {item.excerpt}
                  </p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors shrink-0 mt-1" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
