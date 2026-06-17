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
    title: "A bilateral mechanism that met six times in nine years",
    date: "June 2026",
    tag: "tamil-nadu" as const,
    observation: "The Joint Working Group on Fisheries — the mechanism India and Sri Lanka established to resolve the Palk Strait crisis — has met six times in nine years. In 2024, 526 Tamil Nadu fishermen were arrested, the highest in a decade. 86 remain in custody. 225 boats have not been returned. The mechanism exists. It simply does not meet.",
    slug: "fishermen-bilateral-mechanism",
  },
  {
    title: "The three-language formula is a staffing decision",
    date: "June 2026",
    tag: "dravidian-politics" as const,
    observation: "Kendriya Vidyalayas in Tamil Nadu employ 86 Hindi teachers and 65 Sanskrit teachers. Tamil teachers: 24. The three-language policy debate is usually framed as ideology. The staffing data frames it differently — as an allocation choice, already made, already operational, visible in a ratio that sits on parliamentary record.",
    slug: "kv-language-teacher-ratio",
  },
  {
    title: "Parliament is a record, not just a legislature",
    date: "June 2026",
    tag: "political-communication" as const,
    observation: "Private member bills almost never pass. That is not the point. Introduction is the political act — a documented position on the floor of the House that says: this is what I argued, this is the evidence I placed before the government. When we measure MPs only by legislation passed, we misunderstand what Parliament produces. Most of what it produces is record.",
    slug: "parliament-as-record",
  },
  {
    title: "Keezhadi: the non-answer is the answer",
    date: "June 2026",
    tag: "dravidian-politics" as const,
    observation: "The ASI cited 'deficiencies in methodology' to withhold the Keezhadi excavation report — a report backed by carbon dating verified by international laboratories. The question of National Importance designation went unanswered. In parliamentary debate, what the government declines to answer is data. The silence is the position.",
    slug: "keezhadi-non-answer",
  },
  {
    title: "What parliamentary scores don't measure",
    date: "June 2026",
    tag: "tamil-nadu" as const,
    observation: "Composite performance scores capture questions asked, debates attended, bills introduced. They do not capture issue consistency — whether an MP returned to the same problem across sessions until a minister had to respond. They do not capture what a question forces into the public record even without an answer. A score is a starting point for analysis, not a conclusion.",
    slug: "what-scores-dont-measure",
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
