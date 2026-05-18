"use client"

import { Mail, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8">
          <div>
            <p className="font-serif text-lg text-foreground mb-1">Manimala Chithamanan</p>
            <p className="text-sm text-muted-foreground max-w-sm">Policy researcher working on the structures that decide whether policy actually reaches people.</p>
          </div>
          <div className="flex flex-col gap-3">
            <a href="mailto:mcmanimala8@gmail.com" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Mail className="w-4 h-4" />
              mcmanimala8@gmail.com
            </a>
            <a href="https://www.linkedin.com/in/manimala-c-29205b223/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </a>
            <p className="text-sm text-muted-foreground">Chennai, Tamil Nadu</p>
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">© 2026 Manimala Chithamanan. All rights reserved.</p>
          <p className="text-xs text-muted-foreground">IMPRI Data Analytics Fellow 2026</p>
        </div>
      </div>
    </footer>
  )
}
