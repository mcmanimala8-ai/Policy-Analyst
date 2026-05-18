import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="max-w-md text-center">
        <p className="font-serif text-8xl text-accent mb-6">404</p>
        <h1 className="font-serif text-2xl text-foreground mb-4">Page not found</h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          This page doesn't exist or has moved. The gap between what's promised and what's delivered isn't just a governance problem.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 border border-border text-sm text-muted-foreground hover:text-foreground hover:border-accent transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>
      </div>
    </main>
  )
}
