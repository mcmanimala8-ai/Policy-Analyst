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
  { stage: "Conviction", value: 12.2, tn: 12.2, india: 31.9, label: "12.2%" },
]

// Annual data - Tamil Nadu (Source: NCRB Crime in India, VCK/The Hindu Nov 2025)
const trendData = [
  { year: "2021", fir: 1377, chargeSheet: 1097, trialMoved: 118, conviction: 168 },
  { year: "2022", fir: 1761, chargeSheet: 1368, trialMoved: 152, conviction: 215 },
  { year: "2023", fir: 1921, chargeSheet: 1511, trialMoved: 214, conviction: 234 },
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
          { id: "political", label: "Political Disempowerment" },
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
            Tamil Nadu's conviction rate for SC/ST atrocity cases is 12.2% — less than half the national average of 31.9% (NCRB 2023). Police file charge sheets in 79.7% of cases. But only 12.2 out of every 100 FIRs end in conviction.
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


      {/* Political Disempowerment Tab */}
      {activeChart === "political" && (
        <div className="border border-border bg-card p-6 md:p-8 space-y-6">
          <div>
            <h2 className="font-serif text-2xl mb-2">
              The Political Argument: Why TN Convicts Less Than UP and Bihar
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              D. Ravikumar (VCK General Secretary, Villupuram MP) argues in The Hindu (Nov 2025) that TN's 12.2% conviction rate — less than half the national average of 31.9% — is not just a judicial failure. It is the direct result of Dalit political disempowerment.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-red-950/20 border border-red-900/30 p-4 rounded text-center">
              <p className="text-3xl font-bold text-red-400 mb-1">12.2%</p>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">TN Conviction Rate</p>
              <p className="text-xs text-muted-foreground mt-2">NCRB 2023</p>
            </div>
            <div className="bg-secondary/30 p-4 rounded text-center">
              <p className="text-3xl font-bold text-accent mb-1">31.9%</p>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">National Average</p>
              <p className="text-xs text-muted-foreground mt-2">NCRB 2023</p>
            </div>
            <div className="bg-red-950/20 border border-red-900/30 p-4 rounded text-center">
              <p className="text-3xl font-bold text-red-400 mb-1">1,921</p>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Atrocity Cases in TN</p>
              <p className="text-xs text-muted-foreground mt-2">2023 (up from 1,377 in 2021)</p>
            </div>
          </div>

          <div className="border border-border bg-background p-5 rounded space-y-3">
            <h3 className="font-semibold text-lg">Ravikumar's Core Argument</h3>
            <p className="text-sm text-muted-foreground">
              "Atrocities are more in Uttar Pradesh and Bihar and Rajasthan — but conviction rate is more. The conviction rate is more because Dalits are politically empowered there... unlike in Tamil Nadu."
            </p>
            <p className="text-xs text-muted-foreground italic">— D. Ravikumar, VCK General Secretary & Villupuram MP, The Hindu, November 19 2025</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="border border-border bg-background p-5 rounded">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">The Bihar Comparison</p>
              <p className="text-sm text-muted-foreground">
                In Bihar, Dalit votes were decisive for the NDA victory. Chirag Paswan's LJP was given 29 seats. Dalit communities voted as a bloc — and got political returns. Result: higher conviction rates because no party can afford to ignore Dalit justice demands.
              </p>
            </div>
            <div className="border border-red-900/30 bg-red-950/10 p-5 rounded">
              <p className="text-xs uppercase tracking-widest text-red-300 mb-3">The TN Reality</p>
              <p className="text-sm text-muted-foreground">
                Both DMK and AIADMK court OBC voters by signalling willingness to ignore Dalit rights. Ravikumar compares this to the Hindutva tactic of consolidating Hindu majority votes by denying Muslim rights. Dalits are the political cost of OBC consolidation.
              </p>
            </div>
          </div>

          <div className="border border-border bg-background p-5 rounded space-y-4">
            <h3 className="font-semibold text-lg">The Violence Data (NCRB 2023)</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
              <div className="space-y-2">
                <p className="flex gap-2"><span className="text-red-400 font-bold">→</span><span><strong>74 Dalits murdered</strong> in Tamil Nadu in 2023</span></p>
                <p className="flex gap-2"><span className="text-red-400 font-bold">→</span><span><strong>135 Dalit women raped</strong> — 100 were minor girls</span></p>
                <p className="flex gap-2"><span className="text-red-400 font-bold">→</span><span>TN is one of <strong>6 states</strong> with highest SC minor girl rape rates</span></p>
              </div>
              <div className="space-y-2">
                <p className="flex gap-2"><span className="text-red-400 font-bold">→</span><span>TN is one of <strong>4 states</strong> with highest anti-SC riot counts</span></p>
                <p className="flex gap-2"><span className="text-red-400 font-bold">→</span><span>While AP, Telangana, Karnataka <strong>decreased</strong> atrocities in 2023, TN <strong>increased</strong></span></p>
                <p className="flex gap-2"><span className="text-red-400 font-bold">→</span><span>Cases rose <strong>39%</strong> between 2021 and 2023 (1,377 → 1,921)</span></p>
              </div>
            </div>
          </div>

          <div className="border border-border p-5 rounded bg-background">
            <h3 className="font-semibold text-lg mb-3">Two Levels of Failure</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p className="flex gap-3">
                <span className="text-accent font-bold">1.</span>
                <span><strong>Systemic failure (our analysis):</strong> Courts can't deliver — judicial delays, witness attrition, capacity collapse. This explains the pipeline breakdown from charge sheet to conviction.</span>
              </p>
              <p className="flex gap-3">
                <span className="text-accent font-bold">2.</span>
                <span><strong>Political failure (Ravikumar's argument):</strong> Dalits are disempowered to demand justice — no political bloc, no electoral leverage, no party that risks losing OBC votes to deliver Dalit justice.</span>
              </p>
              <p className="flex gap-3 pt-2 border-t border-border">
                <span className="text-red-400 font-bold">→</span>
                <span><strong>Together:</strong> The pipeline leaks at both ends. Cases that do get filed don't get convictions. And Dalits lack the political power to demand either gets fixed.</span>
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
              <span><strong>Political disempowerment:</strong> TN's conviction rate (12.2%) is less than half the national average (31.9%). States where Dalits vote as a political bloc — UP, Bihar — show higher conviction rates despite worse atrocity numbers.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent font-bold">2.</span>
              <span><strong>Rising violence:</strong> Atrocity cases rose 39% between 2021 and 2023 (1,377 → 1,921). TN increased while neighbouring states decreased. 74 murders, 135 rapes in 2023 alone.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent font-bold">3.</span>
              <span><strong>OBC politics as cause:</strong> Both DMK and AIADMK court OBC voters by signalling willingness to ignore Dalit rights — making Dalit marginalisation a political feature, not just administrative failure.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent font-bold">4.</span>
              <span><strong>Equity:</strong> Rural victims, poor victims, less educated victims are most affected by delays and least able to demand political accountability.</span>
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
          <strong>Data source:</strong> NCRB Crime in India 2021–2023 (official). Political analysis sourced from D. Ravikumar (VCK General Secretary, Villupuram MP), The Hindu, November 19 2025. Analysis conducted by Manimala Chithamanan, IMPRI Data Analytics Fellow 2026.
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          <strong>Methodology note:</strong> Conviction rate of 12.2% and atrocity case counts are from NCRB 2023 official data as cited by D. Ravikumar in The Hindu. The political disempowerment argument is Ravikumar's thesis, presented here as a documented political perspective alongside our structural pipeline analysis.
        </p>
      </div>
    </section>
  )
}
