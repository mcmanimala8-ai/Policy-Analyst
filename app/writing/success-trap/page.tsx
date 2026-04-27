"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useEffect } from "react"

export default function SuccessTrapPage() {
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
      {/* Top bar */}
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
          <span className="text-xs uppercase tracking-widest text-accent font-medium">Essay</span>
          <span className="text-xs text-muted-foreground">Research Paper</span>
          <span className="text-xs text-muted-foreground">April 2026</span>
        </div>

        <h1 className="font-serif text-3xl md:text-5xl leading-tight tracking-tight mb-6">
          The Success Trap: Performance, Population and the Future of Indian Federalism
        </h1>
        <p className="text-muted-foreground text-lg mb-12">By Manimala Chithamanan</p>

        <div className="border-l-2 border-accent pl-6 mb-12">
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-3">Abstract</p>
          <p className="text-muted-foreground leading-relaxed">
            This article analyses the legislative defeat of the Constitution (131st Amendment Bill) on April 17, 2026, within the context of challenges faced by India's high-performing states. While the bill was positioned as a vehicle for gender inclusivity, it obscured a deeper structural problem — census-linked delimitation. By examining the demographic divergence between northern and southern states where population rates vary by over 100%, this article argues that the Bill's defeat functioned as an institutional veto against a "Population Penalty." The article concludes that delimitation and reservation are separate policy problems that must not be conflated into a single constitutional instrument.
          </p>
        </div>

        <div className="space-y-10 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="font-serif text-2xl text-foreground mb-4">The Historical Covenant and the Genesis of the Crisis</h2>
            <p>The foundation of this crisis lies in the country's post-independence population growth concern of the 1960s–70s, which brought food insecurity and economic instability. When the Union government set targets to overcome this, the actual "heavy lifting" of the national policy of population control was handed over to the states.</p>
            <p className="mt-4">Health and education were the two driving catalysts that put the southern states' population under control. This resulted in a decline in the Total Fertility Rate (TFR), especially in southern states like Kerala, Tamil Nadu, Andhra Pradesh, Telangana and Karnataka, placing them on a higher developmental trajectory.</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-foreground mb-4">The 1976 Constitutional Freeze</h2>
            <p>The 1976 freeze of constitutional boundaries was derived from the 1971 census, freezing the size of Lok Sabha and state assembly constituencies. This created representational imbalances as constituencies grew at vastly different rates across states. The 84th Amendment extended the freeze till 2026 — creating a fifty-year shield of protection for states like Tamil Nadu to preserve federal integrity without losing representation.</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-foreground mb-4">The 131st Amendment and the Legislative Trap</h2>
            <p>While the 131st Amendment was presented as a progressive tool for the long-delayed women's reservation bill, its structural design imposed a "population penalty" on states leading in Human Development Indicators. By legally coupling gender quotas to a new census and subsequent delimitation, the government set a trap for performing states — using social reform as a vehicle to redistribute political power away from states that had achieved lower population growth through sustained policy interventions.</p>

            <div className="my-8 overflow-x-auto">
              <p className="text-sm text-muted-foreground mb-4 font-medium">Table 1 — Comparative Population Growth from 1971 to 2011</p>
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-8 text-foreground font-medium">State</th>
                    <th className="text-left py-2 text-foreground font-medium">Growth (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {[["Rajasthan","166"],["Haryana","157"],["Bihar","146"],["Madhya Pradesh","142"],["Uttar Pradesh","138"],["Jharkhand","132"],["Gujarat","126"],["Uttarakhand","125"],["Maharashtra","123"],["Chhattisgarh","119"],["Assam","113"],["Karnataka","109"],["West Bengal","106"],["Punjab","104"],["Himachal Pradesh","98"],["Odisha","91"],["Goa","83"],["Tamil Nadu","75"],["Kerala","56"]].map(([state, pct]) => (
                    <tr key={state} className={`border-b border-border/30 ${state === "Tamil Nadu" || state === "Kerala" ? "text-accent font-medium" : ""}`}>
                      <td className="py-2 pr-8">{state}</td>
                      <td className="py-2">{pct}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-foreground mb-4">The Fiscal Friction</h2>
            <p>Southern states contribute a disproportionately high share of GST and direct taxes to the national exchequer, yet their share of central devolution continues to shrink as the formula pivots towards population metrics. The 16th Finance Commission, determining the tax sharing formula for 2026–31, operates on the same demographic divergence. Power-sharing is a zero-sum game; this traditional formula should not be altered.</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-foreground mb-4">Defeat of the Bill</h2>
            <p>The rejection of the 131st Amendment in the Lok Sabha on April 17th represents a significant moment for Indian federalism. The bill failed to secure the mandatory two-thirds majority — suggesting that the "Population Penalty" embedded in its design was a significant factor. The bill bundled social reform with political redistribution, making it impossible to support the former without accepting the latter.</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-foreground mb-4">The Alternative: A Path to Technical Honesty</h2>
            <p>Following the rejection, DMK MP P. Wilson introduced a private members' bill offering 33% reservation within the current 543-seat Lok Sabha allocation — without awaiting a new census or delimitation. By decoupling reservation from delimitation, this bill demonstrates that gender justice does not require a redistribution of federal power. These two were never necessarily linked.</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-foreground mb-4">Conclusion</h2>
            <p>The rejection of the 131st Amendment Bill signals that federal equity concerns carry sufficient political weight to block legislation framed as social reform. Southern states, having borne the demographic cost of development, were unwilling to accept both burdens simultaneously.</p>
            <p className="mt-4">The deeper lesson: social reforms lose legitimacy when perceived as vehicles for political redistribution. Delimitation and reservation are separate problems. They deserve separate solutions.</p>
          </section>

          <section className="border-t border-border pt-8">
            <h2 className="font-serif text-xl text-foreground mb-4">References</h2>
            <ol className="space-y-2 text-sm list-decimal list-inside">
              <li>Census of India (2011). Office of the Registrar General & Census Commissioner, Ministry of Home Affairs, Government of India.</li>
              <li>Government of India (2024). Report of the 16th Finance Commission for 2026–31. Ministry of Finance.</li>
              <li>Nilakantan, R. S. (2022). South vs North: India's Great Divide. Juggernaut Books.</li>
              <li>PRS Legislative Research (2026). Vital Stats: The Constitution (131st Amendment) Bill and the Delimitation Debate.</li>
              <li>Wilson, P. (2026). The Constitution (Amendment) Bill: Private Member's Bill. Rajya Sabha Secretariat.</li>
            </ol>
          </section>

          {/* Copyright */}
          <div className="border border-border/50 bg-secondary/20 p-4 text-xs text-muted-foreground text-center mt-12">
            © 2026 Manimala Chithamanan. All rights reserved. This work may not be reproduced, distributed, or transmitted in any form without prior written permission from the author.
          </div>
        </div>
      </article>
    </main>
  )
}
