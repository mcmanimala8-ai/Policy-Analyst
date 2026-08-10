"use client"

import { motion } from "framer-motion"
import { Download, ArrowRight, Database } from "lucide-react"

const topics = [
  "39 MPs tracked",
  "37,000+ school units coordinated",
  "108 seats won by TVK, 2026",
]

export function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col justify-center pt-20 relative overflow-hidden">
      {/* Background gradient accent */}
      <div className="absolute top-1/4 -right-1/4 w-1/2 h-1/2 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-6 py-20 relative z-10">
        <div className="flex flex-col gap-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/30 text-accent text-sm font-medium">
              <Database className="w-4 h-4" />
              Independent Researcher — Tamil Nadu Politics, Policy & Governance
            </span>
          </motion.div>

          <motion.h1 
            className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight text-balance"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Manimala Chithamanan
          </motion.h1>

          <motion.div 
            className="max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              Independent research on Tamil Nadu's governance systems — data, policy, and political analysis.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div 
            className="flex flex-wrap items-center gap-4 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <a
              href="/data"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all hover:gap-3"
            >
              Open Data Lab
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#writing"
              className="group inline-flex items-center gap-2 px-6 py-3 border border-border text-sm font-medium hover:bg-secondary hover:border-accent transition-all"
            >
              Read Briefs
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="/Manimala_C_Resume.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Download className="w-4 h-4" />
              Resume
            </a>
          </motion.div>
        </div>
      </div>

      {/* Topic Marquee */}
      <div className="border-y border-border overflow-hidden py-4">
        <div className="animate-marquee flex items-center gap-8 whitespace-nowrap">
          {[...topics, ...topics, ...topics, ...topics].map((topic, i) => (
            <span key={i} className="flex items-center gap-8">
              <span className="text-sm uppercase tracking-wider text-muted-foreground">
                {topic}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}