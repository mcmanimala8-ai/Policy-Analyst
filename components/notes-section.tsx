"use client"

import { useState } from "react"
import { ArrowUpRight } from "lucide-react"

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
    title: "TVK Put Periyar's Face on a Fan Club",
    date: "June 2026",
    tag: "dravidian-politics",
    observation: "TVK's idols are Periyar and Ambedkar. But Periyar was explicitly anti-hero worship, anti-cinema culture, anti-personality cult. A party built on fan club infrastructure around a cinema star cannot claim Periyar as its founding symbol. That is not Dravidian ideology — it is Dravidian aesthetics.",
    slug: "tvk-periyar-fan-club",
  },
  {
    title: "Kanimozhi's Communication Gap",
    date: "June 2026",
    tag: "political-communication",
    observation: "Kanimozhi doesn't need personal image building — she already has name recognition by inheritance and track record. What she lacks is organisational identity. A clear answer to: what does Kanimozhi stand for beyond DMK? Post-2026, with DMK in opposition and Udhayanidhi positioning for succession, that gap is becoming urgent.",
    slug: "kanimozhi-communication-gap",
  },
  {
    title: "Congress Follows Power, Not Principle",
    date: "June 2026",
    tag: "tamil-nadu",
    observation: "Congress was with DMK when DMK governed Tamil Nadu. TVK won 108 seats in 2026 and formed government. Congress pivots to TVK. The pattern is consistent across every state — Congress has never built independently in Tamil Nadu. They have always been a guest in someone else's house.",
    slug: "congress-follows-power",
  },
  {
    title: "DMK's Third Bloc Is a Negotiating Position, Not a Strategy",
    date: "June 2026",
    tag: "national",
    observation: "DMK delivered 22 Lok Sabha seats in 2024. That is real leverage inside the INDIA bloc. They did not need to threaten a third bloc — they already had power. The impulsive move to float an alternative actually weakened their negotiating position by making them look erratic rather than strategic. Tamil political language does not travel north. The third bloc can never actually be built.",
    slug: "dmk-third-bloc",
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
      </div>
    </section>
  )
}
