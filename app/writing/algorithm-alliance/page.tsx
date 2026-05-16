"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useEffect } from "react"

export default function AlgorithmAlliancePage() {
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => e.preventDefault()
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === "c" || e.key === "p" || e.key === "s")) {
        e.preventDefault()
      }
    }
    document.addEventListener("contextmenu", handleContextMenu)
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  return (
    <main className="min-h-screen bg-background select-none">
      <div className="border-b border-border py-4 px-6">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/#writing" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Writing
          </Link>
          <span className="text-xs text-muted-foreground">© 2026 Manimala Chithamanan</span>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-6 py-16">
        <div className="flex flex-wrap gap-3 mb-8">
          <span className="text-xs uppercase tracking-widest text-accent font-medium">Op-Ed</span>
          <span className="text-xs text-muted-foreground">Policy Commentary</span>
          <span className="text-xs text-muted-foreground">May 2026</span>
        </div>

        <h1 className="font-serif text-3xl md:text-5xl leading-tight tracking-tight mb-6">When the Algorithm Beat the Alliance: Tamil Nadu 2026</h1>
        <p className="text-muted-foreground text-lg mb-2 italic">On anti-incumbency, digital campaigns, and what the left missed</p>
        <p className="text-muted-foreground text-lg mb-12">By Manimala Chithamanan</p>

        <div className="space-y-6 text-muted-foreground leading-relaxed">
          <p>The 2026 election results shocked a lot of people in Tamil Nadu. A strong anti-incumbency wave overturned what many believed was politically impossible: a government with welfare delivery, administrative resources, and five full years in power still suffered a major collapse.</p>
          <p>What happened was not simply a defeat. It was a communication failure as much as a political one.</p>
          <p>The DMK government believed governance performance would naturally translate into votes. That assumption was not entirely wrong. But in today's digital political environment, performance alone is no longer enough. Narrative matters just as much, and sometimes even more. The DMK was busy building the state's plumbing. They forgot to write the state's story.</p>
          <p>The numbers tell the story clearly. DMK fell from 159 seats in 2021 to just 59 in 2026. Fifteen ministers lost their constituencies. Nowhere was this more visible than in Chennai, historically an impenetrable DMK fortress. Out of the 16 core constituencies within Chennai district, TVK swept 14. The only exceptions were Harbour, shielded by P.K. Sekarbabu, and Chepauk-Thiruvallikeni, where Deputy Chief Minister Udhayanidhi Stalin managed to hold on. The ultimate symbol came at the top: Chief Minister MK Stalin lost Kolathur, a seat he had held since 2011, to TVK's V.S. Babu by over 9,000 votes.</p>
          <p>The final tally: TVK 108, DMK 59, AIADMK 47, INC 5, VCK 2, Left parties 2 each. The NDA managed only 53 seats. TVK fell 10 seats short of the 118 needed for a majority, which meant the Congress's 5 seats and the VCK and Left's 2 each were not symbolic. They were the mathematical bridge to power. Parties decimated at the ballot box became kingmakers in government formation.</p>

          <h2 className="font-serif text-2xl text-foreground pt-8">The Campaign That Functioned Like a Startup</h2>
          <p>TVK's campaign did not operate like a traditional political party. It functioned more like a fast-growing digital startup, what we can rightly call an algorithmic insurgency.</p>
          <p>From late 2025 onwards, TVK built 34,000+ WhatsApp communities coordinated by digitally active young volunteers aged 19 to 35, trained in content sharing, emotional messaging, and fact-checking protocols. Their digital war room produced 120 to 150 pieces of vernacular video content daily, optimised for different platforms and demographic segments. They hired engineers and data scientists poached from Swiggy and PhonePe's growth teams to build proprietary sentiment tracking tools.</p>

          <h2 className="font-serif text-2xl text-foreground pt-8">What DMK Missed While It Wasn't Looking</h2>
          <p>One of the biggest strategic failures of this election has received almost no attention: DMK campaigned against AIADMK, not TVK. DMK's machinery was calibrated to fight the opponent they knew, while TVK steadily ate into DMK's core vote pockets.</p>

          <h2 className="font-serif text-2xl text-foreground pt-8">Why TAPS Did Not Fully Work Politically</h2>
          <p>Announced on January 3, 2026, the Tamil Nadu Assured Pension Scheme (TAPS) guaranteed 50% of last drawn salary as pension with a 10% employee contribution. But many government employees felt the move came too late and interpreted the contribution as a penalty after decades of delay.</p>

          <h2 className="font-serif text-2xl text-foreground pt-8">The Anti-Caste Party That Lost the Anti-Caste Vote</h2>
          <p>DMK built legitimacy on Periyar's self-respect movement and Ambedkarite social justice politics. Yet, for many working-class and Dalit voters, the gap between anti-caste rhetoric and lived administrative outcomes became too visible, and disappointment shifted votes to TVK.</p>

          <h2 className="font-serif text-2xl text-foreground pt-8">What DMK Needs to Understand Before 2031</h2>
          <p>The lesson is not that social media alone wins elections. It is that ignoring digital political culture is no longer possible. The future belongs to hybrid politics: digital narrative speed plus deep constituency-level trust building and everyday presence.</p>

          <h2 className="font-serif text-2xl text-foreground pt-8">What Should Return to Tamil Nadu Politics</h2>
          <p>Politics cannot survive only through algorithms and content cycles. Grassroots activism, campus organizing, law-and-order credibility, and inter-election public trust must return to the center of political strategy. Digital infrastructure without ground presence is brittle.</p>

          <p className="pt-4">TVK won in 2026 with digital infrastructure. But digital infrastructure without ground presence is brittle. The algorithm defeated the alliance this time. The question for 2031 is whether any party will build a politics worthy of the 85.1% who showed up.</p>

          <div className="border border-border/50 bg-secondary/20 p-4 text-xs text-muted-foreground text-center mt-12">
            © 2026 Manimala Chithamanan. All rights reserved. This work may not be reproduced, distributed, or transmitted in any form without prior written permission from the author.
          </div>
        </div>
      </article>
    </main>
  )
}
