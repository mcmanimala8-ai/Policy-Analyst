"use client"

import { motion } from "framer-motion"
import { Download, ArrowRight } from "lucide-react"

const topics = [
  "Policy Research",
  "Data Analytics",
  "State Planning",
  "Governance",
  "Federal Equity",
  "Public Policy",
]

export function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col justify-center pt-20 relative overflow-hidden">
      {/* Background gradient accent */}
      <div className="absolute top-1/4 -right-1/4 w-1/2 h-1/2 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-6 py-20 relative z-10">
        <div className="flex flex-col gap-8">
          {/* Open to Work Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 text-green-400 text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Open to Work
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

          <motion.p
            className="text-2xl md:text-3xl text-accent font-serif"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Policy Researcher & Analyst
          </motion.p>

          <motion.div 
            className="max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              Making sense of the systems we live in.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div 
            className="flex flex-wrap items-center gap-4 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            
              <a href="/Manimala_C_Resume.pdf"
              download
              className="group inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all hover:gap-3"
            >
              <Download className="w-4 h-4" />
              Download Resume
            </a>
            
              <a href="#writing"
              className="group inline-flex items-center gap-2 px-6 py-3 border border-border text-sm font-medium hover:bg-secondary hover:border-accent transition-all"
            >
              Read Articles
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            
              <a href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Get in Touch
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
