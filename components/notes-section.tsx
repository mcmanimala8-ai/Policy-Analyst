"use client"

import { useState } from "react"

type NoteTag = "all" | "political-communication" | "dravidian-politics" | "tamil-nadu" | "national"

interface Note {
  title: string
  date: string
  tag: Exclude<NoteTag, "all">
  observation: string
  slug: string
}

export const notes: Note[] = [
  {
    title: "86 fishermen, 225 boats — and a bilateral mechanism that met six times in nine years",
    date: "June 2026",
    tag: "tamil-nadu" as const,
    observation: "Between 2015 and 2025, 2,870 Tamil Nadu fishermen were arrested by Sri Lankan authorities. In 2024 alone, 526 were arrested — the highest in a decade. The Joint Working Group on Fisheries, the bilateral mechanism meant to resolve this, has met only six times in nine years. Kanimozhi raised the issue three times across three sessions, escalating to a Rule 197 Calling Attention Motion to force a ministerial response. As of March 2025, 86 fishermen remain in custody and 225 boats have not been returned. The mechanism exists. It simply does not meet.",
    slug: "fishermen-bilateral-mechanism",
  },
  {
    title: "86 Hindi teachers, 65 Sanskrit teachers, 24 Tamil teachers — in Tamil Nadu's Kendriya Vidyalayas",
    date: "June 2026",
    tag: "dravidian-politics" as const,
    observation: "A parliamentary question on the three-language formula revealed this: Kendriya Vidyalayas in Tamil Nadu employ 86 Hindi teachers and 65 Sanskrit teachers — but only 24 Tamil teachers. The number did not make headlines. It did not need to. Placed on parliamentary record, it changes how the policy debate is framed. The three-language formula is not just an ideological dispute — it is a staffing decision, visible in a ratio, documented in an unstarred question.",
    slug: "kv-language-teacher-ratio",
  },
  {
    title: "Three private member bills in one day — and why that matters even when bills do not pass",
    date: "June 2026",
    tag: "political-communication" as const,
    observation: "On 5th December 2025, Kanimozhi introduced three private member bills in a single day — the Salt Workers Welfare Bill, the Death Penalty Abolition Bill, and the Climate Change Bill. Private member bills almost never pass. She knows that. Introduction itself is the political act — a documented parliamentary position that says: this is where I stood, this is what I argued, this is the evidence I put before the House. Parliament is a record as much as it is a legislature.",
    slug: "private-member-bills-as-political-act",
  },
  {
    title: "Keezhadi and the non-answer that is itself an answer",
    date: "June 2026",
    tag: "dravidian-politics" as const,
    observation: "Kanimozhi asked why the Keezhadi excavation report had still not been published, citing carbon dating verified by international laboratories including US-based Beta Analytic Labs. The ASI cited deficiencies in methodology — in a report backed by international science. The question of whether Keezhadi has been recognised as a site of National Importance went unanswered. In parliamentary debate, what the government chooses not to answer is often more revealing than what it does.",
    slug: "keezhadi-non-answer",
  },
  {
    title: "A score of 44 is a starting point, not a verdict",
    date: "June 2026",
    tag: "tamil-nadu" as const,
    observation: "Parliamentary work disappears. A Chief Minister's decisions make front pages. An MLA's constituency work travels through local networks. But what an MP does in the Lok Sabha — the questions raised, the bills introduced, the Ministers confronted — rarely reaches the people who elected them. Kanimozhi's composite score of 44 out of 100 is what most people will see. What they will not see is three years of consistent pressure on fishermen's rights, a civilisational argument made on the floor of Parliament, and three private member bills introduced in a single day. A score is a starting point, not a verdict.",
    slug: "score-starting-point-not-verdict",
  },
]

const tags: { value: NoteTag; label: string }[] = [
  { value: "all", label: "All" },
  { value: "dravidian-politics", label: "Dravidian Politics" },
  { value: "political-communication", label: "Political Communication" },
  { value: "tamil-nadu", label: "Tamil Nadu" },
  { value: "national", label: "National" },
]

export function NotesSection() {
  const [activeTag, setActiveTag] = useState<NoteTag>("all")

  const filtered = activeTag === "all"
    ? notes
    : notes.filter(n => n.tag === activeTag)

  return (
    <section id="notes" className="py-24 border-b border-border">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
              Observations
            </p>
            <h2 className="font-serif text-3xl md:text-4xl tracking-tight">
              Notes
            </h2>
            <p className="text-muted-foreground text-sm mt-3 max-w-xl">
              Short observations on Tamil Nadu politics, political communication, and governance. Things worth saying before they become full articles.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag.value}
                onClick={() => setActiveTag(tag.value)}
                className={`px-4 py-2 text-sm transition-colors ${
                  activeTag === tag.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="text-muted-foreground text-sm py-8">
            No notes yet. Check back soon.
          </p>
        ) : (
          <div className="divide-y divide-border">
            {filtered.map((note, index) => (
              <div key={index} className="py-8 first:pt-0 last:pb-0">
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs uppercase tracking-wider text-accent font-medium">
                        {note.tag.replace(/-/g, " ")}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {note.date}
                      </span>
                    </div>
                    <h3 className="font-serif text-xl md:text-2xl mb-3">
                      {note.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl">
                      {note.observation}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
