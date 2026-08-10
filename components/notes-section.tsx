"use client"

import { useState } from "react"

type NoteTag = "all" | "political-communication" | "dravidian-politics" | "tamil-nadu" | "national"

interface Note {
  title: string
  date: string
  publishedAt: string // ISO date (YYYY-MM-DD), used for "new" indicator logic — not displayed directly
  tag: Exclude<NoteTag, "all">
  observation: string
  slug: string
}

// Exported so Navigation can show a "new" indicator when the latest note is recent
export function getLatestNoteDate(): string | null {
  if (notes.length === 0) return null
  return notes.reduce((latest, n) => (n.publishedAt > latest ? n.publishedAt : latest), notes[0].publishedAt)
}

export const notes: Note[] = [
  {
    title: "Parliament is doing less of its own accountability work",
    date: "July 2026",
    publishedAt: "2026-08-10",
    tag: "national",
    observation:
      "Sitting days in the Lok Sabha have fallen from roughly 135 a year in the 1st Lok Sabha to about 55 a year in the 17th. Standing Committees — which scrutinise Bills clause by clause, bringing in outside experts — examined 71% of Bills in the 15th Lok Sabha. That fell to 25% in the 16th, and 16% in the 17th. Fewer sitting days and fewer Bills sent to committee mean less of a government's reasoning ends up on the public record. It's also why external tracking — sites like this one — matters more, not less, as Parliament's own capacity to self-scrutinise shrinks.",
    slug: "parliament-shrinking-scrutiny",
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
            <div className="flex items-center gap-3">
              <h2 className="font-serif text-3xl md:text-4xl tracking-tight">
                Notes
              </h2>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">
                Notes archive — new entries added regularly
              </span>
            </div>
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
