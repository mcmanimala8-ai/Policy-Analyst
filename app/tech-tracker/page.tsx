"use client"

import { useMemo, useState } from "react"
import { Navigation } from "@/components/navigation"

type PolicyItem = {
  date: string
  sector: string
  title: string
  institution: string
  status: string
  problem: string
  intervention: string
  stakeholders: string
  implication: string
  source: string
}

const items: PolicyItem[] = [
  {
    date: "2026-07-15",
    sector: "Semiconductors",
    title: "Semicon 2.0 approved",
    institution: "Ministry of Electronics & IT / Union Cabinet",
    status: "Approved",
    problem: "India needs deeper domestic semiconductor design and manufacturing capability.",
    intervention: "Long-term policy support across design, materials and machines, fabs, ATMP, R&D and talent.",
    stakeholders: "Government, semiconductor firms, design companies, universities, investors",
    implication: "Moves policy from initial capacity creation toward a broader semiconductor ecosystem and strategic technology resilience.",
    source: "PIB, 15 Jul 2026",
  },
  {
    date: "2026-09-18",
    sector: "Semiconductors",
    title: "ISM 2.0 focus shifts toward scaling the semiconductor ecosystem",
    institution: "Ministry of Electronics & IT",
    status: "Implementation",
    problem: "A manufacturing ecosystem requires capabilities beyond initial fabs and packaging projects.",
    intervention: "Focus on design, materials and machines, additional fabs, ATMP, R&D and talent.",
    stakeholders: "Semiconductor industry, engineering colleges, startups, state governments",
    implication: "The policy challenge increasingly becomes ecosystem depth, skills and value capture rather than project approvals alone.",
    source: "PIB, 18 Sep 2026",
  },
  {
    date: "2026-04-16",
    sector: "AI Governance",
    title: "AI Governance and Economic Group constituted",
    institution: "Ministry of Electronics & IT",
    status: "Constituted",
    problem: "AI governance requires coordination across ministries, regulators and policy institutions.",
    intervention: "Created a high-level inter-ministerial group to coordinate India's national AI governance strategy.",
    stakeholders: "MeitY, ministries, regulators, industry, researchers",
    implication: "Signals a whole-of-government institutional approach to AI governance rather than relying only on sector-specific regulation.",
    source: "PIB, 16 Apr 2026",
  },
  {
    date: "2026-04-18",
    sector: "AI Governance",
    title: "Technology and Policy Expert Committee constituted",
    institution: "Ministry of Electronics & IT",
    status: "Constituted",
    problem: "AI policy decisions require technical, legal and policy expertise.",
    intervention: "Created an expert advisory body to support the AI Governance and Economic Group.",
    stakeholders: "Technical experts, policy researchers, legal experts, government",
    implication: "Creates an institutional bridge between technical AI developments and policy/regulatory decision-making.",
    source: "PIB, 18 Apr 2026",
  },
  {
    date: "2026-02-15",
    sector: "AI Governance",
    title: "India AI Governance Guidelines released",
    institution: "Government of India",
    status: "Guidelines",
    problem: "India needs a governance framework that manages AI risks while supporting innovation and inclusion.",
    intervention: "Principle-based framework anchored in seven Sutras, with proposed institutions for AI governance and safety.",
    stakeholders: "Government, regulators, technology firms, civil society, researchers",
    implication: "Establishes a policy baseline for responsible AI while favouring a principles-based approach over broad ex-ante restrictions.",
    source: "PIB, 15 Feb 2026",
  },
  {
    date: "2026-08-06",
    sector: "AI Infrastructure",
    title: "Sovereign AI infrastructure expanded",
    institution: "Government of India",
    status: "Implementation",
    problem: "Dependence on external compute, models and semiconductor capacity creates strategic vulnerabilities.",
    intervention: "Expanded IndiaAI and semiconductor initiatives covering indigenous foundation models, compute capacity and technological self-reliance.",
    stakeholders: "IndiaAI, startups, researchers, cloud/compute providers, semiconductor industry",
    implication: "Links AI governance with industrial policy, compute access and technological sovereignty.",
    source: "PIB, 6 Aug 2026",
  },
  {
    date: "2026-05-26",
    sector: "Semiconductors",
    title: "ISM Investors Support portal launched",
    institution: "India Semiconductor Mission / MeitY",
    status: "Operational",
    problem: "Investors need clearer information on schemes, approved projects and regulatory requirements.",
    intervention: "Launched a portal consolidating semiconductor investment and policy information.",
    stakeholders: "Investors, semiconductor firms, government agencies",
    implication: "Reduces information friction and supports investor coordination around India's semiconductor policy ecosystem.",
    source: "PIB, 26 May 2026",
  },
  {
    date: "2026-05-29",
    sector: "Semiconductors",
    title: "NITI Aayog semiconductor roadmap released",
    institution: "NITI Aayog Frontier Tech Hub",
    status: "Roadmap",
    problem: "India needs a long-term strategy to move from a large semiconductor market toward a stronger global value-chain position.",
    intervention: "Published a 10-year roadmap addressing supply chains, strategic capacity and semiconductor competitiveness.",
    stakeholders: "NITI Aayog, industry, states, investors, global technology partners",
    implication: "Frames semiconductors as an issue of national security, economic resilience, digital sovereignty and technological competitiveness.",
    source: "PIB, 29 May 2026",
  },
  {
    date: "2026-05-05",
    sector: "Electronics Manufacturing",
    title: "Two additional semiconductor manufacturing projects approved",
    institution: "Union Cabinet / India Semiconductor Mission",
    status: "Approved",
    problem: "India needs diversified semiconductor and display manufacturing capacity.",
    intervention: "Approved two Gujarat projects covering compound semiconductor fabrication, ATMP and Mini/Micro-LED display manufacturing.",
    stakeholders: "Government, semiconductor manufacturers, electronics industry, skilled workers",
    implication: "Broadens India's semiconductor strategy beyond conventional silicon fabs into compound semiconductors and display technologies.",
    source: "PIB, 5 May 2026",
  },
  {
    date: "2026-02-01",
    sector: "Semiconductors",
    title: "Budget 2026-27 announced India Semiconductor Mission 2.0",
    institution: "Ministry of Finance / Government of India",
    status: "Budget announcement",
    problem: "India needs domestic capability in semiconductor equipment, materials, IP and supply chains.",
    intervention: "Announced ISM 2.0 with a FY2026-27 provision of ₹1,000 crore and emphasis on industry-led research and training centres.",
    stakeholders: "Government, industry, R&D institutions, workforce",
    implication: "Connects semiconductor industrial policy with research, skills and supply-chain resilience.",
    source: "PIB, 1 Feb 2026",
  },
]

const sectors = ["All", ...Array.from(new Set(items.map((item) => item.sector)))]

export default function TechnologyPolicyTracker() {
  const [sector, setSector] = useState("All")
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return items.filter((item) => {
      const sectorMatch = sector === "All" || item.sector === sector
      const text = Object.values(item).join(" ").toLowerCase()
      return sectorMatch && (!q || text.includes(q))
    })
  }, [sector, query])

  const counts = useMemo(() => {
    return sectors.slice(1).map((name) => ({
      name,
      count: items.filter((item) => item.sector === name).length,
    }))
  }, [])

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="max-w-3xl mb-10">
          <p className="text-sm uppercase tracking-[0.2em] text-accent mb-3">Technology Policy</p>
          <h1 className="font-serif text-4xl md:text-5xl tracking-tight mb-4">
            India Technology Policy Tracker
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            A working tracker of Indian technology-policy developments, with emphasis on AI governance,
            semiconductors and digital-economy policy. Each entry separates the policy intervention from
            its broader implication.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <div className="border border-border p-4">
            <div className="text-2xl font-semibold">{items.length}</div>
            <div className="text-xs text-muted-foreground mt-1">Developments tracked</div>
          </div>
          <div className="border border-border p-4">
            <div className="text-2xl font-semibold">{sectors.length - 1}</div>
            <div className="text-xs text-muted-foreground mt-1">Policy sectors</div>
          </div>
          <div className="border border-border p-4">
            <div className="text-2xl font-semibold">{new Set(items.map((i) => i.institution)).size}</div>
            <div className="text-xs text-muted-foreground mt-1">Institutions / actors</div>
          </div>
          <div className="border border-border p-4">
            <div className="text-2xl font-semibold">2026</div>
            <div className="text-xs text-muted-foreground mt-1">Current coverage</div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-3 mb-8">
          {counts.map((item) => (
            <button
              key={item.name}
              onClick={() => setSector(item.name)}
              className="border border-border p-4 text-left hover:border-accent transition-colors"
            >
              <div className="text-sm font-medium">{item.name}</div>
              <div className="text-2xl font-semibold mt-1">{item.count}</div>
            </button>
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search policies, institutions, sectors..."
            className="flex-1 border border-border bg-transparent px-4 py-3 text-sm outline-none focus:border-accent"
          />
          <select
            value={sector}
            onChange={(e) => setSector(e.target.value)}
            className="border border-border bg-background px-4 py-3 text-sm"
          >
            {sectors.map((name) => <option key={name}>{name}</option>)}
          </select>
        </div>

        <div className="border border-border overflow-x-auto">
          <table className="w-full min-w-[1100px] text-left">
            <thead className="border-b border-border bg-muted/30">
              <tr>
                <th className="p-4 text-xs uppercase tracking-wide">Date</th>
                <th className="p-4 text-xs uppercase tracking-wide">Sector</th>
                <th className="p-4 text-xs uppercase tracking-wide">Development</th>
                <th className="p-4 text-xs uppercase tracking-wide">Institution</th>
                <th className="p-4 text-xs uppercase tracking-wide">Status</th>
                <th className="p-4 text-xs uppercase tracking-wide">Policy implication</th>
                <th className="p-4 text-xs uppercase tracking-wide">Source</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.date + item.title} className="border-b border-border align-top hover:bg-muted/20">
                  <td className="p-4 text-sm whitespace-nowrap">{item.date}</td>
                  <td className="p-4 text-sm whitespace-nowrap">{item.sector}</td>
                  <td className="p-4 min-w-[260px]">
                    <div className="font-medium">{item.title}</div>
                    <div className="text-xs text-muted-foreground mt-2">{item.problem}</div>
                    <div className="text-xs mt-2"><span className="font-medium">Intervention:</span> {item.intervention}</div>
                  </td>
                  <td className="p-4 text-sm min-w-[190px]">{item.institution}</td>
                  <td className="p-4 text-sm whitespace-nowrap">{item.status}</td>
                  <td className="p-4 text-sm min-w-[280px]">{item.implication}</td>
                  <td className="p-4 text-xs text-muted-foreground min-w-[150px]">{item.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="p-10 text-center text-muted-foreground">No matching developments.</div>
          )}
        </div>

        <p className="text-xs text-muted-foreground mt-5">
          Initial dataset assembled from Government of India / PIB releases. This is a research tracker,
          not a comprehensive regulatory database.
        </p>
      </div>
    </main>
  )
}
