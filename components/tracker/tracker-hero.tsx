"use client"

import { motion } from "framer-motion"
import { MPs, getAllianceSummary } from "@/lib/mp-data"

export function TrackerHero() {
  const alliances = getAllianceSummary()
  const totalMPs = MPs.length

  return (
    <section className="pt-32 pb-16 border-b border-border">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
            Tamil Nadu Governance Desk
          </p>
          <h1 className="font-serif text-4xl md:text-6xl tracking-tight mb-6 max-w-4xl">
            TN MP Watch
            <span className="text-accent">.</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed mb-10">
            A public accountability record of Tamil Nadu's 39 Lok Sabha MPs — 19th Lok Sabha (2024–2029).
            Tracking attendance, parliamentary activity, and MPLADS fund utilisation every quarter.
          </p>

          {/* Stat bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="border border-border p-5">
              <p className="text-3xl font-serif font-bold text-accent">{totalMPs}</p>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mt-1">MPs Tracked</p>
            </div>
            <div className="border border-border p-5">
              <p className="text-3xl font-serif font-bold" style={{ color: "#E63946" }}>{alliances.INDIA}</p>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mt-1">INDIA Alliance</p>
            </div>
            <div className="border border-border p-5">
              <p className="text-3xl font-serif font-bold" style={{ color: "#F4A261" }}>{alliances.NDA}</p>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mt-1">NDA Alliance</p>
            </div>
            <div className="border border-border p-5">
              <p className="text-3xl font-serif font-bold text-muted-foreground">Q1</p>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mt-1">Data Pending Update</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent inline-block" />
              Performance data updated quarterly
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-border inline-block" />
              Sources: Lok Sabha Secretariat · PRS Legislative Research · MPLADS Portal
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
