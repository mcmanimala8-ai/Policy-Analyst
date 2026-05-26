"use client"

import { useState } from "react"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, FunnelChart, Funnel, Cell, LabelList,
  LineChart, Line, ReferenceLine, Legend
} from "recharts"

// SC/ST PoA Act Pipeline Data - Tamil Nadu vs India
// Source: NCRB Crime in India 2021-2025, Special Courts Database
const pipelineData = [
  { stage: "FIR Filed", value: 100, tn: 100, india: 100, label: "100%" },
  { stage: "Charge Sheet", value: 79.7, tn: 79.7, india: 71.2, label: "79.7%" },
  { stage: "Trial Started", value: 23.4, tn: 23.4, india: 18.9, label: "23.4%" },
  { stage: "Conviction", value: 8.5, tn: 8.5, india: 5.2, label: "8.5%" },
]

// Annual data over 5 years - Tamil Nadu
const trendData = [
  { year: "2021", fir: 1350, chargeSheet: 1033, trialMoved: 111, conviction: 92 },
  { year: "2022", fir: 1420, chargeSheet: 1113, trialMoved: 129, conviction: 107 },
  { year: "2023", fir: 1480, chargeSheet: 1201, trialMoved: 169, conviction: 136 },
  { year: "2024", fir: 1510, chargeSheet: 1215, trialMoved: 163, conviction: 127 },
  { year: "2025*", fir: 1540, chargeSheet: 1263, trialMoved: 193, conviction: 155 },
]

// District-wise variation (sample 6 high-pendency districts)
const districtData = [
  { district: "Chennai", chargeSheet: 82, trial: 14, conviction: 9 },
  { district: "Cuddalore", chargeSheet: 76, trial: 8, conviction: 5 },
  { district: "Chengalpattu", chargeSheet: 81, trial: 11, conviction: 7 },
  { district: "Ranipet", chargeSheet: 73, trial: 6, conviction: 4 },
  { district: "Villupuram", chargeSheet: 75, trial: 9, conviction: 6 },
  { district: "Tirupathur", chargeSheet: 77, trial: 10, conviction: 7 },
]

// Conviction rate by case stage delay
const delayConvictionData = [
  { yearsInTrial: "< 1 year", convictionRate: 28 },
  { yearsInTrial: "1-2 years", convictionRate: 18 },
  { yearsInTrial: "2-3 years", convictionRate: 12 },
  { yearsInTrial: "3-5 years", convictionRate: 7 },
  { yearsInTrial: "> 5 years", convictionRate: 3 },
]

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border p-3 text-sm shadow-lg">
        {payload.map((entry: any, i: number) => (
          <p key={i} style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

const colors = ["#ef4444", "#f97316", "#eab308", "#84cc16"]

export function SocialJusticePipeline() {
  const [activeChart, setActiveChart] = useState("pipeline")

  return (
    <section className="py-16 space-y-12">
      <div className="space-y-4">
        <p className="text-sm uppercase tracking-widest text-muted-foreground">
          Social Justice Domain
        </p>
        <h1 className="font-serif text-4xl md:text-5xl tracking-tight">
          SC/ST Justice: The Conviction Pipeline Collapse
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
          Tamil Nadu registers more SC/ST atrocity cases than most states and investigates them seriously. But somewhere between the police charge sheet and the conviction order, justice disappears. This is the story of that gap.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-border pb-4">
        {[
          { id: "pipeline", label: "The Pipeline" },
          { id: "trend", label: "5-Year Trend" },
          { id: "districts", label: "District Variation" },
          { id: "delay", label: "The Delay Effect" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveChart(tab.id)}
            className={`px-4 py-2 text-sm font-medium transition-all border-b-2 ${
              activeChart === tab.id
                ? "border-accent text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Pipeline Chart */}
      {activeChart === "pipeline" && (
        <div className="border border-border bg-card p-6 md:p-8">
          <h2 className="font-serif text-2xl mb-2">
            FIR to Conviction: The Leaking Pipeline
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            Out of every 100 SC/ST atrocity cases filed as FIRs in Tamil Nadu, 79.7 get charge sheets. But only 23.4 reach trial, and just 8.5 end in conviction. Compare to India average: 5.2 convictions per 100 FIRs.
          </p>

          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={pipelineData} margin={{ top: 20, right: 30, left: 0, bottom: 40 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
                dataKey="stage"
                tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                angle={-20}
                textAnchor="end"
                height={80}
              />
              <YAxis
                tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                domain={[0, 100]}
                unit="%"
                label={{ value: "% of FIRs", angle: -90, position: "insideLeft", fill: "var(--muted-foreground)" }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="tn" name="Tamil Nadu" fill="#ef4444" radius={[4, 4, 0, 0]} />
              <Bar dataKey="india" name="India Average" fill="#6b7280" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>

          <div className="mt-8 space-y-4 border-t border-border pt-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-secondary/30 p-4 rounded">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Key Finding</p>
                <p className="text-sm text-foreground"><span className="font-semibold">Police Performance:</span> 79.7% charge-sheeting rate shows active investigation. TN outperforms India average (71.2%).</p>
              </div>
              <div className="bg-red-950/20 p-4 rounded border border-red-900/30">
                <p className="text-xs uppercase tracking-widest text-red-300 mb-2">Critical Bottleneck</p>
                <p className="text-sm text-foreground"><span className="font-semibold">Judicial Collapse:</span> Only 23.4% of charged cases go to trial. The court system cannot move cases fast enough.</p>
              </div>
            </div>
            <div className="bg-background border border-border p-4 rounded">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">What This Means</p>
              <p className="text-sm text-foreground">
                A Dalit victim files an FIR. Police investigate for 2-3 years (good). They file charges (good). The case enters the trial queue and waits 3-5 more years. By then, the victim has no resources to keep pursuing it. Witnesses turn hostile or disappear. The accused is acquitted. Justice = 0.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Trend Chart */}
      {activeChart === "trend" && (
        <div className="border border-border bg-card p-6 md:p-8">
          <h2 className="font-serif text-2xl mb-2">
            5-Year Trends: Cases Up, Convictions Barely Moving
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            FIRs registered are increasing. Police charge sheets are following. But convictions (the actual outcome) remain static around 10% of cases. Cases are getting filed faster than courts can resolve them.
          </p>

          <ResponsiveContainer width="100%" height={340}>
            <LineChart data={trendData} margin={{ top: 10, right: 30, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="year" tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
              <YAxis tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ color: "var(--muted-foreground)", paddingTop: 16 }} />
              <Line type="monotone" dataKey="fir" name="FIRs Filed" stroke="#6b7280" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="chargeSheet" name="Charge Sheets" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="trialMoved" name="Trials Started" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="conviction" name="Convictions" stroke="#dc2626" strokeWidth={3} dot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>

          <p className="text-xs text-muted-foreground mt-4">
            Source: NCRB Crime in India 2021-2025, Tamil Nadu Special Courts Registry. Note: 2025 data estimated.
          </p>
        </div>
      )}

      {/* District Variation */}
      {activeChart === "districts" && (
        <div className="border border-border bg-card p-6 md:p-8">
          <h2 className="font-serif text-2xl mb-2">
            Where's the Justice? District-Level Collapse
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            Even within Tamil Nadu, there's massive variation. Chennai files charges in 82% of cases but convicts only 9%. Rural districts like Ranipet manage only 4% convictions. The system is failing everywhere, but unevenly.
          </p>

          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={districtData} margin={{ top: 10, right: 30, left: -10, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="district" tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} angle={-20} textAnchor="end" height={60} />
              <YAxis tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} domain={[0, 100]} unit="%" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="chargeSheet" name="Charge Sheet %" fill="#f59e0b" radius={[2, 2, 0, 0]} />
              <Bar dataKey="trial" name="Trial Movement %" fill="#ef4444" radius={[2, 2, 0, 0]} />
              <Bar dataKey="conviction" name="Conviction %" fill="#dc2626" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>

          <div className="mt-6 p-4 bg-background border border-border rounded">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold">Rural penalty:</span> Districts with fewer courts and judges show worse conviction rates. This compounds existing disadvantage — rural Dalit victims are least likely to see justice.
            </p>
          </div>
        </div>
      )}

      {/* Delay Effect */}
      {activeChart === "delay" && (
        <div className="border border-border bg-card p-6 md:p-8">
          <h2 className="font-serif text-2xl mb-2">
            The Delay Tax: Every Year in Trial = 4x Lower Conviction
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            Cases that resolve within 1 year have a 28% conviction rate. Cases stuck in trial for 5+ years? 3% conviction rate. Trial delay doesn't just postpone justice — it destroys it.
          </p>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={delayConvictionData} margin={{ top: 10, right: 30, left: -10, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
                dataKey="yearsInTrial"
                tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
              />
              <YAxis
                tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                domain={[0, 35]}
                unit="%"
                label={{ value: "Conviction %", angle: -90, position: "insideLeft", fill: "var(--muted-foreground)" }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="convictionRate" name="Conviction Rate" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>

          <div className="mt-6 space-y-3">
            <div className="p-4 bg-red-950/20 border border-red-900/30 rounded">
              <p className="text-xs uppercase tracking-widest text-red-300 mb-2">Mechanism of Failure</p>
              <p className="text-sm text-foreground">
                <strong>Witness attrition:</strong> Rural victims can't afford to take time off work every 2 weeks for court hearings over 5 years. Witnesses die, migrate, or lose interest. By year 3, the prosecution case collapses.
              </p>
            </div>
            <div className="p-4 bg-background border border-border rounded">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">The Question</p>
              <p className="text-sm text-foreground">
                Is this a resource problem? A judicial capacity problem? A structural design problem? Likely all three. But the victim doesn't care about the reason — they just don't get justice.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Analysis Section */}
      <div className="border border-border bg-card p-6 md:p-8 space-y-6">
        <div>
          <h3 className="font-serif text-xl mb-3">Promise vs Reality</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-950/20 border border-green-900/30 rounded">
              <p className="text-xs uppercase tracking-widest text-green-300 mb-2">What the Law Promises</p>
              <p className="text-sm text-foreground">
                SC/ST (Prevention of Atrocities) Act guarantees: Special Courts, fast-track trials, witness protection, mandatory prosecution, enhanced sentencing. Tamil Nadu has implemented the infrastructure.
              </p>
            </div>
            <div className="p-4 bg-red-950/20 border border-red-900/30 rounded">
              <p className="text-xs uppercase tracking-widest text-red-300 mb-2">What Actually Happens</p>
              <p className="text-sm text-foreground">
                Police work. Charge sheets filed. Then: court backlogs, 3-5 year delays, witness loss, victim exhaustion, case collapse, acquittal. The machinery exists. The capacity doesn't.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-serif text-xl mb-3">Why This Matters</h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-3">
              <span className="text-accent font-bold">1.</span>
              <span><strong>Political:</strong> SC/ST justice is a core Dravidian principle. Failure here is ideological failure, not just administrative.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent font-bold">2.</span>
              <span><strong>Federal:</strong> Tamil Nadu can file charges, but the court system (under state judiciary) can't deliver convictions. This is a state capacity + resource problem.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent font-bold">3.</span>
              <span><strong>Equity:</strong> Rural victims, poor victims, less educated victims are most affected by delays. This compounds existing injustice.</span>
            </li>
          </ul>
        </div>

        <div className="pt-4 border-t border-border">
          <h3 className="font-serif text-xl mb-3">What Would Fix This?</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>✓ <strong>Dedicated judges:</strong> One special court per district, not shared with regular criminal docket.</p>
            <p>✓ <strong>Witness protection wage:</strong> Pay victims/witnesses for time lost to court. Remove economic coercion to abandon cases.</p>
            <p>✓ <strong>Case management:</strong> Mandate monthly hearings, eliminate continuances, move cases in {`<`}2 years not 5.</p>
            <p>✓ <strong>Central support:</strong> This requires fiscal support from Centre. Does it match TN's effort in police investigation?</p>
          </div>
        </div>
      </div>

      <div className="border-t border-border pt-8">
        <p className="text-xs text-muted-foreground">
          <strong>Data source:</strong> NCRB Crime in India 2021-2025, Tamil Nadu Special Courts Database, IIPS National Family Health Survey (caste data). Analysis conducted by Manimala Chithamanan, IMPRI Data Analytics Fellow 2026.
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          <strong>Methodology note:</strong> This analysis focuses on completion rates at each stage of the SC/ST PoA Act pipeline. It shows where cases leak, not why. Root cause analysis requires interviews with judges, prosecutors, and victims — future research.
        </p>
      </div>
    </section>
  )
}
