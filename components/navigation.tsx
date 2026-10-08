"use client"

import { useState, useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { Menu, X, Download } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { getLatestNoteDate } from "@/components/notes-section"

const navLinks = [
  { href: "/#about", label: "About" },
  { href: "/data", label: "Data" },
  { href: "/tracker", label: "MP Watch" },
  { href: "/#writing", label: "Writing" },
  { href: "/#notes", label: "Notes" },
  { href: "/#contact", label: "Contact" },
]

// Returns true if the latest note was published within the last 14 days
function hasRecentNote(): boolean {
  const latest = getLatestNoteDate()
  if (!latest) return false
  const latestDate = new Date(latest)
  const daysSince = (Date.now() - latestDate.getTime()) / (1000 * 60 * 60 * 24)
  return daysSince >= 0 && daysSince <= 14
}

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === "/"
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const wasOpenRef = useRef(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (!isOpen) {
      if (wasOpenRef.current) menuButtonRef.current?.focus()
      wasOpenRef.current = false
      return
    }

    wasOpenRef.current = true
    const panel = menuRef.current
    const firstLink = panel?.querySelector<HTMLElement>("a, button")
    firstLink?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault()
        setIsOpen(false)
        return
      }

      if (event.key === "Tab" && panel) {
        const focusable = Array.from(
          panel.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")
        )
        if (!focusable.length) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen])

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || !isHomePage
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-lg"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <motion.a
          href="/"
          className="font-serif text-xl tracking-tight hover:text-accent transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          MC
        </motion.a>

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
              {link.label === "Notes" && hasRecentNote() && (
                <span className="absolute -top-1 -right-2 w-1.5 h-1.5 rounded-full bg-accent" aria-label="New note published recently" />
              )}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full" />
            </motion.a>
          ))}

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

        <button
          ref={menuButtonRef}
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 -mr-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop - closes menu when tapped outside */}
            <motion.div
              className="fixed inset-0 bg-black/60 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            {/* Menu panel */}
            <motion.div
              ref={menuRef}
              id="mobile-navigation"
              role="dialog"
              aria-label="Site navigation"
              aria-modal="true"
              className="fixed top-0 left-0 right-0 bg-background border-b border-border z-50 md:hidden"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                <span className="font-serif text-xl">MC</span>
                <button onClick={() => setIsOpen(false)} className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent" aria-label="Close navigation menu">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="px-6 py-6 flex flex-col gap-6">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
<a
                  href="/Manimala_C_Resume.pdf"
                  download
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-primary text-primary-foreground text-sm font-medium w-fit mt-2"
                >
                  <Download className="w-4 h-4" />
                  Download Resume
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
