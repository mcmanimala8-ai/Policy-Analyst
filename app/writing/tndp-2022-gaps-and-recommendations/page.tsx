"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useEffect } from "react"



function CusdisComments({ pageId, pageUrl, pageTitle }: { pageId: string, pageUrl: string, pageTitle: string }) {
  useEffect(() => {
    // Load Cusdis script
    const script = document.createElement('script')
    script.src = 'https://cusdis.com/js/cusdis.es.js'
    script.async = true
    script.defer = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <div className="mt-16 pt-8 border-t border-border">
      <h3 className="font-serif text-xl text-foreground mb-6">Comments</h3>
      <div
        id="cusdis_thread"
        data-host="https://cusdis.com"
        data-app-id="0e0f2871-7f53-4458-ba1e-2c2b3ce8126b"
        data-page-id={pageId}
        data-page-url={pageUrl}
        data-page-title={pageTitle}
        data-theme="dark"
      />
    </div>
  )
}

export default function TNDPGapsPage() {
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
          <span className="text-xs uppercase tracking-widest text-accent font-medium">Explainer</span>
          <span className="text-xs text-muted-foreground">Policy Analysis</span>
          <span className="text-xs text-muted-foreground">August 2026</span>
        </div>

        <h1 className="font-serif text-3xl md:text-5xl leading-tight tracking-tight mb-6">
          Tamil Nadu Data Policy 2022: Gaps and Recommendations
        </h1>
        <p className="text-muted-foreground text-lg mb-12">By Manimala Chithamanan</p>

        <div className="border-l-2 border-accent pl-6 mb-12">
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-3">Abstract</p>
          <p className="text-muted-foreground leading-relaxed">
            The Tamil Nadu Data Policy 2022 (TNDP), issued by G.O. (Ms) No. 16 dated 10.03.2022, is a framework aimed at using government data for evidence-based policy making, transparency, and improved service delivery. While the policy's ambition is sound, four structural gaps limit its capacity to deliver genuine data protection and citizen safeguards — gaps sharpened by the fact that TNDP pre-dates the Digital Personal Data Protection Act, 2023 (DPDP Act 2023). This analysis examines each gap in turn, with recommendations for revision.
          </p>
        </div>

        <div className="space-y-10 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="font-serif text-2xl text-foreground mb-4">Introduction</h2>
            <p>Tamil Nadu was among the first Indian states to formalise a comprehensive data governance framework, releasing TNDP in March 2022 with the stated aim of using "data for the public good." The policy envisions a state-level Empowered Data Governance Committee headed by the Chief Secretary, and operational decisions delegated to a Data Inter-Departmental Committee headed by the CEO of the Tamil Nadu e-Governance Agency (TNeGA), who also serves as the state's Chief Data Officer. It applies to all Public Authorities as defined under Section 2(h) of the Right to Information Act, 2005, within the state's jurisdiction.</p>
            <p className="mt-4">This is meaningful ambition. But TNDP was written around the Personal Data Protection Bill, 2019 — legislation that was withdrawn in 2022 and eventually replaced by the DPDP Act, 2023. TNDP has not been updated since. What follows are four gaps this leaves open, and what closing them would require.</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-foreground mb-4">Gap 1 — Absence of Statutory Force</h2>
            <p>TNDP was passed as a Government Order, not through legislative means. A Government Order can guide departments internally, but it carries no penalty for violation and creates no citizen right to legal remedy if ignored. This weakens the document's ability to govern data in a sensitive manner.</p>
            <p className="mt-4">The practical consequence is an odd asymmetry. TNDP applies to a wide range of government bodies handling citizen data — every Public Authority under the RTI Act's definition, operating within Tamil Nadu. Yet a resident whose data is mishandled under TNDP has no statutory complaint pathway comparable to what the DPDP Act grants against private companies. The state currently regulates private data handlers more strictly than it binds itself.</p>
            <p className="mt-4"><strong className="text-foreground">Recommendations:</strong> Ratification through the state legislature would give citizens a clear legal basis to enforce TNDP's privacy commitments, rather than relying solely on administrative goodwill. This should be paired with defined enforcement mechanisms — remedies, penalties, and a complaints pathway for citizens — and codified legal responsibilities, so TNeGA's role and departmental obligations can be audited and enforced rather than assumed.</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-foreground mb-4">Gap 2 — Privacy Framework</h2>
            <p>TNDP explicitly designs its privacy principles around the Personal Data Protection Bill, 2019 — legislation expected to become law but withdrawn in 2022 and reinstated as the DPDP Act 2023, built around data fiduciaries, data principals, defined consent notices, and a Data Protection Board. TNDP has not been updated to reflect any of these concepts.</p>
            <p className="mt-4">The gap is concrete. Under the DPDP Rules 2025, Data Fiduciaries must provide a privacy notice in clear, plain language whenever personal data is collected on the basis of consent — explaining what data is collected, the purpose of processing, how a Data Principal can exercise their rights, and how to file a complaint with the Data Protection Board. None of this vocabulary appears in TNDP.</p>
            <p className="mt-4">Worth noting for balance: DPDP's own substantive consent and notice requirements only become fully effective from 13 May 2027. Tamil Nadu currently has a genuine window to align TNDP with the national framework before it is fully operative — a proactive revision rather than a reactive scramble.</p>
            <p className="mt-4"><strong className="text-foreground">Recommendations:</strong> A revision should standardise TNDP's terminology in line with the DPDP Act 2023 — including data fiduciaries and data principals as defined categories — and update consent, breach, and governance definitions, ensuring machine-readable consent and handling protocols are specified rather than left implicit.</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-foreground mb-4">Gap 3 — Data Commercialisation</h2>
            <p>TNDP treats aggregated and anonymised datasets as marketable public assets, but does not address re-identification risk, data quality standards, metadata governance, retention or deletion rules, or commercial governance separate from ordinary data-sharing conditions.</p>
            <p className="mt-4">TNDP's own text illustrates the gap. The policy states that the price of non-open data to be shared, if any, "would be as per the policy of the Government of Tamil Nadu," with TNeGA responsible for issuing pricing instructions — but no such instructions or accompanying re-identification safeguards appear to have been separately published. The risk is sharpened by what TNDP treats as centrally poolable in the first place: the state's "family database," a form of critical master data, is meant to be stored centrally with de-identification techniques applied. This means the dataset with the highest commercial value is also the one where re-identification risk is highest — and TNDP does not specify who tests for that risk, or how often.</p>
            <p className="mt-4"><strong className="text-foreground">Recommendations:</strong> A separate pool for commercialisation, distinct from governance data used for other purposes, should sit alongside a standalone commercialisation framework defining pricing, rules, and permitted uses. Independent re-identification risk assessments — third-party testing with published findings — should precede any dataset release, and commercial licences should set clear limits and purpose prior to release.</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-foreground mb-4">Gap 4 — AI Inclusion and Algorithmic Governance</h2>
            <p>TNDP does not address the governance of AI and automated decision systems built on state data. Without rules for model documentation, bias testing, human oversight, and training-data governance, algorithmic systems built on this data risk unfair outcomes and opaque decision-making.</p>
            <p className="mt-4">This is less a missing clause than a structural blind spot created by timing: TNDP was finalised in March 2022, months before generative AI reshaped what "AI governance" needs to cover. The policy does describe an ambition to build a "data ecosystem for data-driven decision support system (DeTN)" — precisely the kind of system that would benefit most from the bias-testing and human-oversight standards the current draft lacks. Without that layer, a DeTN-style system risks informing decisions about welfare eligibility or service delivery with no documented standard for how the underlying model was trained, tested, or audited.</p>
            <p className="mt-4"><strong className="text-foreground">Recommendations:</strong> Training data and consent rules should prohibit using personal data for model training without a lawful basis; where aggregated data is used, re-identification testing and governance for synthetic data should be required. A dedicated AI governance section, built on accountability, transparency, fairness, safety, and human oversight, should be added rather than assumed to be covered by existing clauses.</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-foreground mb-4">Conclusion</h2>
            <p>TNDP has the right ambition but needs revision to align with the DPDP Act 2023 — to use data for public good, keep it safe for commercialisation, and make it ready for AI use. Because DPDP's core provisions only take full effect in May 2027, Tamil Nadu still has a working window to revise TNDP proactively, rather than being forced into a reactive scramble once the central framework is fully enforceable.</p>
            <p className="mt-4">TNeGA should lead a time-bound revision involving legal counsel, independent technical review, and public consultation — preserving the policy's good intent while protecting citizens and ensuring legal compliance.</p>
          </section>

          <section className="border-t border-border pt-8">
            <h2 className="font-serif text-xl text-foreground mb-4">References</h2>
            <ol className="space-y-2 text-sm list-decimal list-inside">
              <li>Tamil Nadu Data Policy, 2022. G.O. (Ms) No. 16, dated 10.03.2022. Tamil Nadu e-Governance Agency (TNeGA).</li>
              <li>Digital Personal Data Protection Act, 2023. Ministry of Electronics and Information Technology, Government of India.</li>
              <li>Digital Personal Data Protection Rules, 2025.</li>
              <li>Right to Information Act, 2005, Section 2(h). Government of India.</li>
              <li>"Tamil Nadu Data Policy 2022 Unveiled." Fox Mandal, 2022.</li>
              <li>"Summary: Tamil Nadu's data policy looks to create a single source of demographic data." MediaNama, 2022.</li>
            </ol>
          </section>

          <div className="border border-border/50 bg-secondary/20 p-4 text-xs text-muted-foreground text-center mt-12">
            © 2026 Manimala Chithamanan. All rights reserved. This work may not be reproduced, distributed, or transmitted in any form without prior written permission from the author.
          </div>
        </div>

        <CusdisComments
          pageId="tndp-2022-gaps-and-recommendations"
          pageUrl="https://manimalachithamanan.in/writing/tndp-2022-gaps-and-recommendations"
          pageTitle="Tamil Nadu Data Policy 2022: Gaps and Recommendations"
        />
      </article>
    </main>
  )
}
