This preserves your full commit history, gives you 3 clean commits with proper messages, and zero risk.

Step 1 — Delete the messy branch (optional cleanup)
Go to https://github.com/mcmanimala8-ai/Policy-Analyst/branches → next to conflict_290426_0241 click 🗑️.

Step 2 — Edit File 1: app/page.tsx
Open: https://github.com/mcmanimala8-ai/Policy-Analyst/edit/main/app/page.tsx
Select all (Ctrl/Cmd + A) → Delete
Paste this exact content:
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { WritingSection } from "@/components/writing-section"
import { DataSection } from "@/components/data-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main>
      <Navigation />
      <HeroSection />
      <AboutSection />
      <WritingSection />
      <DataSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
Scroll down → commit message: Remove SelectedWork, Quiz, Reading, AvailableFor sections
Make sure "Commit directly to the main branch" is selected
Click "Commit changes"
Step 3 — Edit File 2: components/hero-section.tsx
Open: https://github.com/mcmanimala8-ai/Policy-Analyst/edit/main/components/hero-section.tsx
Find line 75 — you'll see this broken section:
            
              href="/Manimala_C_Resume.pdf"
The fix: add <a on each of the 3 broken lines (lines ~75, ~83, ~90). Easiest way:
Select all → delete → paste this complete file:

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
Commit message: Fix broken JSX <a> tags in hero CTAs
Commit directly to main
Step 4 — Edit File 3: components/navigation.tsx
Open: https://github.com/mcmanimala8-ai/Policy-Analyst/edit/main/components/navigation.tsx
Select all → delete → paste:
"use client"

import { useState, useEffect } from "react"
import { Menu, X, Download, Sun, Moon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#writing", label: "Writing" },
  { href: "#data", label: "Data" },
  { href: "#contact", label: "Contact" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle("light")
  }

  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-lg" 
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <motion.a 
          href="#" 
          className="font-serif text-xl tracking-tight hover:text-accent transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          MC
        </motion.a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link, index) => (
            <motion.a
              key={link.href}
              href={link.href}
              className="relative text-sm text-muted-foreground hover:text-foreground transition-colors group"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full" />
            </motion.a>
          ))}
          
          <div className="w-px h-6 bg-border mx-2" />
          
          <motion.button
            onClick={toggleTheme}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </motion.button>

          <motion.a
            href="/Manimala_C_Resume.pdf"
            download
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Download className="w-4 h-4" />
            Resume
          </motion.a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 -mr-2"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="md:hidden border-t border-border bg-background"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/Manimala_C_Resume.pdf"
                download
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium w-fit"
              >
                <Download className="w-4 h-4" />
                Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
