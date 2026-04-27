"use client"

import { motion } from "framer-motion"
import { Download, ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"

const roles = [
  "Policy Researcher",
  "Impact Analyst",
  "Regulatory & Policy Strategy",
  "IMPRI Fellow",
]

export function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setRoleIndex((prev) => (prev + 1) % roles.length)
        setIsVisible(true)
      }, 300)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const topics = [
    "Policy Research",
    "Data Analytics", 
    "State Planning",
    "Governance",
    "Federal Equity",
    "Public Policy",
  ]

  const stats = [
    { value: "37,000+", label: "Units Managed" },
    { value: "2026", label: "IMPRI Fellow" },
    { value: "2", label: "Years Experience" },
  ]

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

          {/* Animated Role */}
          <motion.div 
            className="h-10 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <span 
              className={`block text-2xl md:text-3xl text-accent font-serif transition-all duration-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
              }`}
            >
              {roles[roleIndex]}
            </span>
          </motion.div>

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

          {/* Stats */}
          <motion.div 
            className="flex flex-wrap gap-8 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={stat.label}
                className="flex flex-col"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
              >
                <span className="text-3xl md:text-4xl font-serif text-accent">{stat.value}</span>
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div 
            className="flex flex-wrap items-center gap-4 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <a
              href="/Manimala_C_Resume.pdf"
              download
              className="group inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all hover:gap-3"
            >
              <Download className="w-4 h-4" />
              Download Resume
            </a>
            <a
              href="#writing"
              className="group inline-flex items-center gap-2 px-6 py-3 border border-border text-sm font-medium hover:bg-secondary hover:border-accent transition-all"
            >
              Read Articles
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
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
