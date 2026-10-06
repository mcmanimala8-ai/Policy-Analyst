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
  sourceType: string
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
  {
    date: "2026-09-30", sector: "AI Governance", title: "AI diffusion and public-sector adoption", institution: "Takshashila Institution", status: "Research",
    problem: "India needs to move from AI experimentation toward broad adoption across firms and public institutions.", intervention: "Policy analysis on accelerating AI diffusion, including public-service delivery and enterprise adoption.", stakeholders: "Government, firms, public institutions, AI ecosystem", implication: "Adds an implementation and productivity lens to the AI governance debate.",
    source: "Takshashila Institution, 30 Sep 2026", sourceType: "Think tank"
  },
  {
    date: "2026-07-20", sector: "Telecom & Infrastructure", title: "India's subsea cable governance gaps", institution: "Takshashila Institution", status: "Research",
    problem: "India's subsea cable ecosystem faces regulatory, procurement and commercial barriers.", intervention: "Research identifies governance and infrastructure constraints affecting landing stations, repair and manufacturing.", stakeholders: "DoT, telecom operators, cable operators, infrastructure providers", implication: "Adds critical digital infrastructure and resilience to the telecom category.",
    source: "Takshashila Institution, 20 Jul 2026", sourceType: "Think tank"
  },
  {
    date: "2026-06-20", sector: "AI Governance", title: "Draft regulations for AI use in courts", institution: "CCG / NLU Delhi / UNESCO", status: "Consultation",
    problem: "Judicial use of AI raises questions of accuracy, accountability, privacy and procedural fairness.", intervention: "Consultation-based analysis of proposed regulation for AI use in courts.", stakeholders: "Judiciary, lawyers, litigants, AI developers, regulators", implication: "Creates a concrete public-sector AI use case for the tracker.",
    source: "CCG, 20 Jun 2026", sourceType: "Civil society / academia"
  },
  {
    date: "2026-05-07", sector: "Platform Governance", title: "Written submission on proposed IT Rules amendments", institution: "CCG-NLUD", status: "Consultation",
    problem: "Proposed intermediary-rule changes affect platform duties, content governance and digital rights.", intervention: "Formal stakeholder submission analysing the proposed 2026 amendments.", stakeholders: "MeitY, platforms, users, civil society, courts", implication: "Shows how policy proposals generate competing legal and rights-based interpretations.",
    source: "CCG-NLUD, 7 May 2026", sourceType: "Civil society / academia"
  },
  {
    date: "2026-05-20", sector: "AI Governance", title: "Assessment of gaps in India's AI governance framework", institution: "Internet Freedom Foundation", status: "Analysis",
    problem: "AI governance needs enforceable accountability, safety testing and transparency safeguards.", intervention: "Civil-society analysis of India's emerging AI governance framework.", stakeholders: "Government, AI developers, platforms, affected users", implication: "Adds an independent accountability lens alongside official AI governance developments.",
    source: "IFF, 20 May 2026", sourceType: "Civil society"
  },
  {
    date: "2026-05-14", sector: "Telecom & Infrastructure", title: "Public Wi-Fi consultation response", institution: "Internet Freedom Foundation / TRAI", status: "Consultation",
    problem: "Expansion of public Wi-Fi raises questions around access, regulation and user rights.", intervention: "IFF submitted comments to TRAI's consultation on proliferation of public Wi-Fi networks.", stakeholders: "TRAI, ISPs, public Wi-Fi providers, users", implication: "Connects connectivity policy with affordability, access and digital rights.",
    source: "IFF, 14 May 2026", sourceType: "Civil society"
  },
  {
    date: "2026-09-14", sector: "Platform Governance", title: "Children's digital safety legal framework", institution: "Vidhi Centre for Legal Policy", status: "Research",
    problem: "Children face digital harms spanning privacy, safety, platform design and enforcement.", intervention: "Review of India's legal framework for children's digital safety and principles for future regulation.", stakeholders: "Children, parents, platforms, regulators, civil society", implication: "Adds child safety and age-appropriate digital governance to platform policy coverage.",
    source: "Vidhi Centre, 14 Sep 2026", sourceType: "Legal policy research"
  },
  {
    date: "2026-08-24", sector: "AI & Labour", title: "Global South labour in the AI economy", institution: "Observer Research Foundation", status: "Research",
    problem: "AI value chains depend on labour whose visibility, compensation and protections are uneven.", intervention: "Research examines labour dimensions of the modern AI economy and implications for Global South countries.", stakeholders: "Workers, AI firms, policymakers, Global South economies", implication: "Extends AI governance to labour, value distribution and development.",
    source: "ORF, 24 Aug 2026", sourceType: "Think tank"
  },
  {
    date: "2026-04-14", sector: "AI & Geopolitics", title: "Strategic approach to AI sovereignty", institution: "Observer Research Foundation", status: "Research",
    problem: "India faces trade-offs between technological autonomy and dependence on global AI supply chains.", intervention: "Analysis of sovereignty across chips, compute, models and applications.", stakeholders: "Government, technology firms, global partners, researchers", implication: "Links AI policy to strategic autonomy and technology geopolitics.",
    source: "ORF, 14 Apr 2026", sourceType: "Think tank"
  },
  {
    date: "2026-06-03", sector: "Semiconductors", title: "India's chip ecosystem and technology statecraft", institution: "Observer Research Foundation", status: "Analysis",
    problem: "India's semiconductor strategy has implications for global technology supply chains and strategic partnerships.", intervention: "Analysis of India's chip ecosystem and international technology partnerships.", stakeholders: "India, semiconductor firms, foreign technology partners", implication: "Adds geopolitics and international partnerships to semiconductor tracking.",
    source: "ORF, 3 Jun 2026", sourceType: "Think tank"
  },
  {
    date: "2026-09-01", sector: "AI & Labour", title: "Algorithmic management and platform work", institution: "IT for Change / Centre for Labour Studies, NLSIU", status: "Research",
    problem: "Platform workers are governed through ratings, surveillance and automated management systems.", intervention: "Empirical research examines algorithmic management through workers' and organisers' experiences.", stakeholders: "Platform workers, unions, platforms, labour policymakers", implication: "Deepens the platform-economy focus with algorithmic management and worker rights.",
    source: "IT for Change, 2025-26 research", sourceType: "Civil society / research"
  },
  {
    date: "2026-09-25", sector: "Cybersecurity", title: "AI security and enterprise control", institution: "Data Security Council of India", status: "Research",
    problem: "AI adoption creates new exposure across data, identities, credentials and applications.", intervention: "Research on security controls required as AI scales across enterprises.", stakeholders: "Enterprises, cybersecurity providers, regulators, users", implication: "Adds AI security and operational governance to the AI policy stack.",
    source: "DSCI, 25 Sep 2026", sourceType: "Industry body"
  },
  {
    date: "2026-07-01", sector: "Web3 & Fintech", title: "VDA compliance and consumer-protection framework", institution: "Bharat Web3 Association", status: "Industry guidance",
    problem: "Virtual digital asset platforms need clearer compliance and consumer-protection practices.", intervention: "Guidelines covering PMLA compliance, consumer protection, VDA listing and cybersecurity.", stakeholders: "VDA service providers, consumers, regulators, exchanges", implication: "Adds Web3/VDA policy to the fintech and digital-economy layer.",
    source: "BWA, 2026", sourceType: "Industry body"
  },
  {
    date: "2026-04-27", sector: "DPI", title: "DPI@2047 roadmap", institution: "NITI Aayog", status: "Roadmap",
    problem: "India needs the next phase of digital public infrastructure to support productivity and inclusive growth.", intervention: "Roadmap for DPI as a driver of population-scale digital services and economic productivity.", stakeholders: "Government, technology providers, citizens, businesses", implication: "Adds DPI strategy beyond individual platforms.",
    source: "NITI Aayog / PIB, 27 Apr 2026", sourceType: "Government"
  },
  {
    date: "2026-05-22", sector: "Data Governance", title: "National Data Governance Framework", institution: "MeitY / National e-Governance Division", status: "Implementation",
    problem: "Government data remains fragmented across institutional silos.", intervention: "National framework based on Policies, Standards, Platforms and Governance, with state-level guidance.", stakeholders: "Central/state governments, data users, citizens, AI ecosystem", implication: "Connects data sharing, interoperability and AI with public-sector governance.",
    source: "NeGD, 22 May 2026", sourceType: "Government"
  },
  {
    date: "2026-08-31", sector: "Digital Markets", title: "Digital-market antitrust enforcement", institution: "Competition Commission of India", status: "Enforcement",
    problem: "Digital markets create competition issues involving network effects, platform power and data.", intervention: "CCI continues antitrust proceedings and market analysis involving digital-sector firms.", stakeholders: "Platforms, businesses, consumers, CCI, MeitY", implication: "Tracker should follow enforcement cases, not only proposed legislation.",
    source: "CCI, 31 Aug 2026", sourceType: "Regulator"
  },
  {
    date: "2025-08-28", sector: "Digital Markets", title: "CCI-MeitY coordination on data protection and competition", institution: "CCI / MeitY", status: "Regulatory coordination",
    problem: "Data protection and competition principles increasingly overlap in digital markets.", intervention: "Inter-agency discussion on the interface between DPDP and competition law.", stakeholders: "CCI, MeitY, platforms, businesses, consumers", implication: "Creates a cross-regulator policy theme worth tracking.",
    source: "CCI, 28 Aug 2025", sourceType: "Government / regulator"
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
            A working tracker of Indian technology-policy developments and the research ecosystem around them, with emphasis on AI governance,
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
                  <td className="p-4 text-xs text-muted-foreground min-w-[180px]"><div>{item.source}</div><div className="mt-1 text-[10px] uppercase tracking-wide text-accent">{item.sourceType}</div></td>
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
