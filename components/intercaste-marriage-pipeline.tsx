"use client"

import { useState } from "react"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, ScatterChart, Scatter,
  Legend, Cell
} from "recharts"

// State-level intercaste marriage data from IHDS
const stateComparisonData = [
  { state: "Tamil Nadu", sameCaste: 97.4, intercaste: 2.6, downCaste: 1.3, upCaste: 1.2, sample: 2991 },
  { state: "Andhra Pradesh", sameCaste: 92.4, intercaste: 7.6, downCaste: 3.3, upCaste: 4.4, sample: 3487 },
  { state: "Karnataka", sameCaste: 83.5, intercaste: 16.5, downCaste: 9.8, upCaste: 6.7, sample: 2138 },
  { state: "Kerala", sameCaste: 78.7, intercaste: 21.3, downCaste: 14.6, upCaste: 6.7, sample: 356 },
  { state: "India Avg", sameCaste: 90.1, intercaste: 9.9, downCaste: 5.1, upCaste: 4.8, sample: 30601 },
]

// Direction of marriage data
const marriageDirectionData = [
  { state: "Tamil Nadu", "Down-Caste": 1.3, "Up-Caste": 1.2, "Same-Caste": 97.4 },
  { state: "India Avg", "Down-Caste": 5.1, "Up-Caste": 4.8, "Same-Caste": 90.1 },
  { state: "Kerala", "Down-Caste": 14.6, "Up-Caste": 6.7, "Same-Caste": 78.7 },
]

// What ideological promise would suggest
const promiseVsRealityData = [
  { metric: "Same-Caste Marriage Rate", TN: 97.4, "South India Avg": 89.2, "India Avg": 90.1 },
  { metric: "Intercaste Rate", TN: 2.6, "South India Avg": 11.8, "India Avg": 9.9 },
]

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border p-3 text-sm shadow-lg">
        {payload.map((entry: any, i: number) => (
          <p key={i} style={{ color: entry.color }}>
            {entry.name}: {entry.value}%
          </p>
        ))}
      </div>
    )
  }
  return null
}

export function IntercasteMarriagePipeline() {
  const [activeChart, setActiveChart] = useState("comparison")

  return (
    <section className="py-16 space-y-12">
      <div className="space-y-4">
        <p className="text-sm uppercase tracking-widest text-muted-foreground">
          Social Justice Domain
        </p>
        <h1 className="font-serif text-4xl md:text-5xl tracking-tight">
          Caste and Marriage: The Dravidian Paradox
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
          Tamil Nadu claims to be the birthplace of anti-caste politics. Yet IHDS data shows TN has the strongest caste boundaries in Indian marriage — lowest intercaste rates, virtually no cross-caste unions. This is the story of that gap.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-border pb-4">
        {[
          { id: "comparison", label: "State Comparison" },
          { id: "direction", label: "Direction of Marriage" },
          { id: "paradox", label: "The Paradox Explained" },
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

      {/* State Comparison Chart */}
      {activeChart === "comparison" && (
        <div className="border border-border bg-card p-6 md:p-8">
          <h2 className="font-serif text-2xl mb-2">
            Same-Caste Marriage Rates: TN at the Top
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            Tamil Nadu has the highest same-caste marriage rate (97.4%) in India — even higher than the national average (90.1%). Among southern states, only AP is close. Kerala, by contrast, shows 21.3% intercaste marriages. The question: Why?
          </p>

          <ResponsiveContainer width="100%" height={380}>
            <BarChart data={stateComparisonData} margin={{ top: 20, right: 30, left: 0, bottom: 80 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
                dataKey="state"
                tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                angle={-35}
                textAnchor="end"
                height={100}
              />
              <YAxis
                tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                domain={[0, 105]}
                unit="%"
                label={{ value: "% of Marriages", angle: -90, position: "insideLeft", fill: "var(--muted-foreground)" }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="sameCaste" name="Same-Caste %" fill="#ef4444" radius={[4, 4, 0, 0]} />
              <Bar dataKey="intercaste" name="Intercaste %" fill="#84cc16" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>

          <div className="mt-8 space-y-4 border-t border-border pt-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-red-950/20 p-4 rounded border border-red-900/30">
                <p className="text-xs uppercase tracking-widest text-red-300 mb-2">The Finding</p>
                <p className="text-sm text-foreground">TN shows the <strong>strongest caste boundaries</strong> in India. 97.4% same-caste marriage. Only 2.6% intercaste. This is worse than the national average.</p>
              </div>
              <div className="bg-background border border-border p-4 rounded">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">The Question</p>
                <p className="text-sm text-foreground">TN's Dravidian movement explicitly challenged caste hierarchy. Yet marriage patterns show the opposite. Why is ideology not translating to behavior?</p>
              </div>
            </div>
            <div className="p-4 bg-secondary/30 rounded">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Comparison Context</p>
              <p className="text-sm text-muted-foreground">
                Kerala (78.7% same-caste, 21.3% intercaste) and Karnataka (83.5% same-caste, 16.5% intercaste) both show more openness to cross-caste marriage than TN — despite TN's reputation for social progressivism.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Direction of Marriage */}
      {activeChart === "direction" && (
        <div className="border border-border bg-card p-6 md:p-8">
          <h2 className="font-serif text-2xl mb-2">
            Marriage Across Caste Hierarchy: Almost Zero in TN
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            When intercaste marriages do happen in India, they usually go "down" the caste hierarchy (women marry men of lower caste). In TN, even this is rare: 1.3% marry down vs 5.1% nationally. Marrying "up" (women marry higher caste): 1.2% in TN vs 4.8% nationally.
          </p>

          <ResponsiveContainer width="100%" height={340}>
            <BarChart data={marriageDirectionData} margin={{ top: 10, right: 30, left: -10, bottom: 40 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
                dataKey="state"
                tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                angle={-20}
                textAnchor="end"
                height={60}
              />
              <YAxis
                tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                domain={[0, 100]}
                unit="%"
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ color: "var(--muted-foreground)", paddingTop: 16 }} />
              <Bar dataKey="Down-Caste" fill="#ef4444" radius={[2, 2, 0, 0]} />
              <Bar dataKey="Up-Caste" fill="#f97316" radius={[2, 2, 0, 0]} />
              <Bar dataKey="Same-Caste" fill="#6b7280" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>

          <div className="mt-6 space-y-3">
            <div className="p-4 bg-background border border-border rounded">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">What This Means</p>
              <p className="text-sm text-foreground">
                In Kerala, 14.6% of women marry men of lower caste. In TN, only 1.3%. This suggests not just caste endogamy, but <strong>strict caste hierarchy enforcement</strong>. Even when people move across caste lines, TN shows more reluctance than other states.
              </p>
            </div>
            <div className="p-4 bg-red-950/20 border border-red-900/30 rounded">
              <p className="text-xs uppercase tracking-widest text-red-300 mb-2">The Implication</p>
              <p className="text-sm text-foreground">
                TN's low cross-caste marriage rates (both directions) suggest that caste boundaries are <strong>reinforced, not dissolved</strong>. If Dravidian ideology had taken root at the marriage level, we'd expect higher rates of both down-caste and up-caste unions.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* The Paradox */}
      {activeChart === "paradox" && (
        <div className="border border-border bg-card p-6 md:p-8 space-y-6">
          <div>
            <h2 className="font-serif text-2xl mb-4">
              Explaining the Paradox: Three Hypotheses
            </h2>

            <div className="space-y-4">
              <div className="border border-border bg-background p-5 rounded">
                <h3 className="font-semibold text-lg mb-2 flex items-start gap-2">
                  <span className="text-accent font-bold">1.</span>
                  <span>Demographic Structure Hypothesis</span>
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  TN is 70%+ OBC, only ~15% SC, ~3% UC, ~1% ST. With such skewed distribution, most "within-caste" marriages are between OBCs. The "low within-caste rate" at sub-caste level might be hidden.
                </p>
                <div className="bg-secondary/30 p-3 rounded text-xs text-muted-foreground italic">
                  <strong>Need to test:</strong> Sub-caste/jati endogamy rates in TN. Do OBCs marry within their own jati? Are there hidden caste boundaries within the OBC category?
                </div>
              </div>

              <div className="border border-border bg-background p-5 rounded">
                <h3 className="font-semibold text-lg mb-2 flex items-start gap-2">
                  <span className="text-accent font-bold">2.</span>
                  <span>Ideology-Behavior Gap Hypothesis</span>
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Dravidian political ideology (anti-caste rhetoric) is real. But it hasn't translated into changed marriage practices. TN voters support anti-caste parties while still practicing caste endogamy.
                </p>
                <div className="bg-secondary/30 p-3 rounded text-xs text-muted-foreground italic">
                  <strong>Interpretation:</strong> TN broke caste in politics and language, but not in kinship. Marriage remains the last frontier of caste practice — harder to change than voting or policy.
                </div>
              </div>

              <div className="border border-border bg-background p-5 rounded">
                <h3 className="font-semibold text-lg mb-2 flex items-start gap-2">
                  <span className="text-accent font-bold">3.</span>
                  <span>Measurement Caveat Hypothesis</span>
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  IHDS asks: "Did you marry outside your caste?" This is a broad category. If TN and other states define "caste" differently (varna vs jati vs clan), comparability breaks down.
                </p>
                <div className="bg-secondary/30 p-3 rounded text-xs text-muted-foreground italic">
                  <strong>Note:</strong> This is a data quality problem, not a TN problem. But it means the chart might not be comparing the same thing across states.
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-6">
            <h3 className="font-serif text-xl mb-4">Most Likely Reality</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              All three factors are probably at play. TN's 97.4% same-caste marriage rate reflects:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-accent">•</span>
                <span><strong>Real caste endogamy:</strong> People still prefer marrying within caste, even if they vote for anti-caste parties.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent">•</span>
                <span><strong>Hidden sub-caste boundaries:</strong> The 70% OBC population may have strong jati (sub-caste) boundaries that function like caste.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent">•</span>
                <span><strong>Measurement issues:</strong> The way the question is asked might make TN look worse than it is.</span>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Bottom Analysis */}
      <div className="border border-border bg-card p-6 md:p-8 space-y-6">
        <div>
          <h3 className="font-serif text-xl mb-3">Promise vs Reality</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-secondary/20 border border-border rounded">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">What Dravidian Ideology Promised</p>
              <p className="text-sm text-foreground">
                Break caste hierarchies. End discrimination. Create a society where caste doesn't determine your opportunities, especially not whom you marry.
              </p>
            </div>
            <div className="p-4 bg-red-950/20 border border-red-900/30 rounded">
              <p className="text-xs uppercase tracking-widest text-red-300 mb-2">What the Data Shows</p>
              <p className="text-sm text-foreground">
                TN has the highest caste endogamy in India. Marriage boundaries are stronger than almost anywhere else. Ideology and behavior are completely disconnected.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-serif text-xl mb-3">What This Tells Us About Social Justice in TN</h3>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p className="flex gap-3">
              <span className="text-accent font-bold">1.</span>
              <span><strong>Two-tier change:</strong> TN changed caste in the political sphere (anti-caste rhetoric, SC welfare, etc.). But didn't change caste in the kinship sphere (marriage, family).</span>
            </p>
            <p className="flex gap-3">
              <span className="text-accent font-bold">2.</span>
              <span><strong>Limits of state power:</strong> Government can't legislate whom people marry. The SC/ST PoA Act failed to convict; the anti-caste movement failed to change marriage practices.</span>
            </p>
            <p className="flex gap-3">
              <span className="text-accent font-bold">3.</span>
              <span><strong>Deepest caste boundary:</strong> If marriage is where caste is most strongly maintained, then neither legal action nor political ideology has touched the core of the system.</span>
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <h3 className="font-serif text-xl mb-3">Data Gaps</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div className="p-4 bg-background border border-border rounded">
              <p className="font-semibold mb-2">Have:</p>
              <ul className="space-y-1">
                <li>✓ State-level caste endogamy rates (IHDS)</li>
                <li>✓ Direction of marriage (up/down caste)</li>
                <li>✓ Sample sizes (2,991 for TN)</li>
              </ul>
            </div>
            <div className="p-4 bg-background border border-border rounded">
              <p className="font-semibold mb-2">Need:</p>
              <ul className="space-y-1">
                <li>✗ TN jati/sub-caste endogamy rates</li>
                <li>✗ TN caste distribution (Census 2011)</li>
                <li>✗ How "caste" is defined by state</li>
                <li>✗ Time trend: has this changed 2005 to 2012?</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border pt-8">
        <p className="text-xs text-muted-foreground">
          <strong>Data source:</strong> India Human Development Survey (IHDS), 2004-05 and 2011-12, based on 35,145 ever-married women ages 15-49. State-level aggregates from IHDS Research Brief No. 2 (Sonalde Desai, NCAER and Univ. of Maryland).
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          <strong>Methodology note:</strong> This analysis uses IHDS data on "same-caste marriage" as a proxy for caste endogamy. It does not account for sub-caste (jati) endogamy, which may be significant in TN. The Reddit discussion (r/kuttichevuru) raises important caveats about demographic structure and measurement — these are genuine unknowns until TN-specific sub-caste data is available.
        </p>
      </div>
    </section>
  )
}
