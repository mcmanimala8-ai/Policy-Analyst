"use client"

import { motion } from "framer-motion"
import { MPs, getAllianceSummary } from "@/lib/mp-data"

export function TrackerHero() {
 const alliances=getAllianceSummary(); const totalMPs=MPs.length;
 return (<section className="pt-32 pb-16 border-b border-border"><div className="max-w-6xl mx-auto px-6"><motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6}}><p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">Tamil Nadu Governance Desk</p><h1 className="font-serif text-4xl md:text-6xl tracking-tight mb-6 max-w-4xl">Tamil Nadu MP Tracker<span className="text-accent">.</span></h1><p className="text-muted-foreground text-lg max-w-2xl leading-relaxed mb-10">An independent tracker of the parliamentary performance of Tamil Nadu's 39 Members of Parliament in the 18th Lok Sabha (2024–2029).</p></motion.div></div></section>)
}