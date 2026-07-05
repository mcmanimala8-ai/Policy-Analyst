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

export const notes: Note[] = []

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
