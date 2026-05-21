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

export default function PlatformEconomyPage() {
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
          <span className="text-xs uppercase tracking-widest text-accent font-medium">Essay</span>
          <span className="text-xs text-muted-foreground">Policy Commentary</span>
          <span className="text-xs text-muted-foreground">March 2026</span>
        </div>

        <h1 className="font-serif text-3xl md:text-5xl leading-tight tracking-tight mb-6">
          Platform Economy and Youth Employment: Structural Gaps in India's Development Model
        </h1>
        <p className="text-muted-foreground text-lg mb-12">By Manimala Chithamanan</p>

        <div className="border-l-2 border-accent pl-6 mb-12">
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-3">Abstract</p>
          <p className="text-muted-foreground leading-relaxed">
            This policy commentary examines the structural challenges facing India's educated youth in the context of gig work and service sector-led development. Drawing on ground-level observations from Tamil Nadu's industrial ecosystem, this piece analyses how regulatory gaps, labour market structures, and development priorities shape employment outcomes. The analysis highlights the disconnect between education outputs and economic opportunities, exploring implications for policy approaches to youth employment and MSME development.
          </p>
        </div>

        <div 
        {/* Hero Illustration */}
        <div className="w-full my-8 border border-border overflow-hidden" style={{height: "280px", background: "linear-gradient(135deg, #0a0a1a 0%, #1a0a0a 50%, #0a1a1a 100%)"}}>
          <svg width="100%" height="100%" viewBox="0 0 800 280" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            {/* Gig worker represented as isolated node */}
            <circle cx="400" cy="140" r="20" fill="none" stroke="#c0392b" strokeWidth="1.5" opacity="0.8"/>
            <circle cx="400" cy="140" r="6" fill="#c0392b" opacity="0.8"/>

            {/* Platform nodes above - connected */}
            {[200, 320, 480, 600].map((x, i) => (
              <g key={i}>
                <rect x={x-25} y="30" width="50" height="30" fill="none" stroke="#888" strokeWidth="1" opacity="0.5"/>
                <line x1={x} y1="60" x2="400" y2="120" stroke="#666" strokeWidth="0.5" strokeDasharray="3,5" opacity="0.3"/>
                <text x={x} y="49" fill="#666" fontSize="7" fontFamily="Arial" textAnchor="middle">PLATFORM</text>
              </g>
            ))}

            {/* Worker nodes below - disconnected */}
            {[150, 280, 400, 520, 650].map((x, i) => (
              <g key={i}>
                <circle cx={x} cy="220" r="8" fill="none" stroke="#444" strokeWidth="1" opacity="0.5"/>
                <circle cx={x} cy="220" r="2.5" fill="#444" opacity="0.4"/>
              </g>
            ))}

            {/* Gap line */}
            <line x1="80" y1="155" x2="720" y2="155" stroke="#333" strokeWidth="0.5" strokeDasharray="6,4" opacity="0.5"/>
            <text x="90" y="150" fill="#555" fontSize="7" fontFamily="Arial" opacity="0.6">PROTECTION GAP</text>

            {/* Labels */}
            <text x="400" y="22" fill="#888" fontSize="9" fontFamily="Arial" textAnchor="middle" letterSpacing="3" opacity="0.6">PLATFORM ECONOMY</text>
            <text x="400" y="268" fill="#444" fontSize="8" fontFamily="Arial" textAnchor="middle" letterSpacing="2">YOUTH · LABOUR · INDIA</text>
          </svg>
        </div>

        className="space-y-10 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="font-serif text-2xl text-foreground mb-4">Introduction</h2>
            <p>India's economic transformation over the past three decades has fundamentally altered employment patterns for educated youth. The shift towards service sector-led growth, combined with rapid expansion of platform-based work, has created new forms of economic participation — but also new vulnerabilities. Understanding these changes requires examining not just macroeconomic indicators, but the lived realities of communities navigating this transformation.</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-foreground mb-4">The Rise of the Gig Economy</h2>
            <p>My neighbourhood is known for its industrial ecosystem — home to companies like TVS and Britannia, as well as several MSMEs. Today, we see a decline and shutdown of many of these small and large-scale industries that employed large numbers of youth. The shift from manufacturing clusters to gig-based service provision reveals several critical policy dynamics.</p>
            <p className="mt-4">Though the government is investing in ITIs across the country, vacancies in trainers persist. Youth increasingly choose immediate income over skill-based training and employment opportunities. This reflects deeper structural issues: the education system produces around 1 crore graduates annually, but formal sector job creation has not kept pace. Gig work fills this gap — but without social security or progression opportunities associated with traditional employment.</p>
            <p className="mt-4">The Social Security Code 2020 promised protection for gig workers, but implementation is stalled. Workers operate without employment contracts, social security benefits, or collective bargaining mechanisms — creating precarity even as platform companies scale rapidly.</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-foreground mb-4">Structural Changes in Development Policy</h2>
            <p><strong className="text-foreground">Service sector growth without manufacturing depth:</strong> Unlike East Asian development models that built on manufacturing employment before transitioning to services, India's growth has been predominantly service-led. According to the NSO, the share of manufacturing value declined from 17.4% in 2011–12 to 14.7% in 2022–23. This creates limited pathways to absorb educated and skilled youth into stable employment.</p>
            <p className="mt-4"><strong className="text-foreground">MSME Struggles:</strong> Small and medium-sized enterprises face infrastructure deficits, credit constraints, and regulatory complexity. Rather than strengthening this critical employment base, policy emphasis has shifted toward attracting large-scale investment and supporting gig work.</p>
            <p className="mt-4"><strong className="text-foreground">Education–Employment mismatch:</strong> Higher education expansion has not been matched by skill development aligned with labour market needs. Graduates possess credentials but often lack the specialised skills employers seek, while vocational training remains stigmatised and undersupplied.</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-foreground mb-4">Policy Implications</h2>
            <p><strong className="text-foreground">Platform work regulation:</strong> Implementing the Social Security Code's provisions — including mandating platform companies to contribute to social security funds, ensuring minimum wage protections, and establishing grievance redressal mechanisms.</p>
            <p className="mt-4"><strong className="text-foreground">MSME ecosystem strengthening:</strong> Prioritise infrastructure, credit access, and regulatory simplification for small enterprises — including cluster development, technology adoption support, and market linkage facilitation.</p>
            <p className="mt-4"><strong className="text-foreground">Skill development alignment:</strong> Stronger industry-education linkages and improved ITI placements, including stipend-linked employment programmes.</p>
            <p className="mt-4"><strong className="text-foreground">Labour market flexibility with protection:</strong> Models that provide core protections while allowing employment flexibility — relevant for both formal sector reforms and platform work regulation.</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-foreground mb-4">Conclusion</h2>
            <p>India's youth employment challenge is not simply about creating more jobs — it is about ensuring those jobs provide dignity, social security, and opportunity for progression. The platform economy's rapid growth highlights both the urgency of this challenge and the inadequacy of current policy frameworks.</p>
            <p className="mt-4">Without comprehensive approaches combining manufacturing development, MSME strengthening, and platform work regulation, India risks creating a bifurcated economy: a small formal sector for the privileged few, and precarious platform-based work for the many. The question is not whether platform work will grow — it will. The question is whether policy will ensure this growth creates genuine opportunity rather than new forms of precarity.</p>
          </section>

          <section className="border-t border-border pt-8">
            <h2 className="font-serif text-xl text-foreground mb-4">References</h2>
            <ol className="space-y-2 text-sm list-decimal list-inside">
              <li>Periodic Labour Force Survey (PLFS), National Statistical Office, Government of India.</li>
              <li>Social Security Code, 2020. Ministry of Labour and Employment, Government of India.</li>
              <li>Economic Survey 2023–24, Ministry of Finance, Government of India.</li>
            </ol>
          </section>

          <div className="border border-border/50 bg-secondary/20 p-4 text-xs text-muted-foreground text-center mt-12">
            © 2026 Manimala Chithamanan. All rights reserved. This work may not be reproduced, distributed, or transmitted in any form without prior written permission from the author.
          </div>
        </div>

        <CusdisComments
          pageId="platform-economy"
          pageUrl="https://manimalachithamanan.in/writing/platform-economy"
          pageTitle="Platform Economy and Youth Employment"
        />
      </article>
    </main>
  )
}
