type ReadingStatus = "reading" | "finished" | "queued"

interface Book {
  title: string
  author: string
  status: ReadingStatus
}

const books: Book[] = [
  {
    title: "North vs South: India's Great Divide",
    author: "Nilakantan RS",
    status: "reading",
  },
]

const statusStyles: Record<ReadingStatus, { label: string; className: string }> = {
  reading: { label: "Reading", className: "bg-accent text-accent-foreground" },
  finished: { label: "Finished", className: "bg-secondary text-secondary-foreground" },
  queued: { label: "Queued", className: "bg-muted text-muted-foreground" },
}

export function ReadingSection() {
  return (
    <section id="reading" className="py-24 border-b border-border bg-secondary/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
            Library
          </p>
          <h2 className="font-serif text-3xl md:text-4xl tracking-tight">
            Reading List
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {books.map((book, index) => (
            <div
              key={index}
              className="bg-card border border-border p-6 flex flex-col gap-3"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-serif text-lg leading-snug mb-1">
                    {book.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {book.author}
                  </p>
                </div>
                <span className={`shrink-0 px-2 py-1 text-xs ${statusStyles[book.status].className}`}>
                  {statusStyles[book.status].label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
