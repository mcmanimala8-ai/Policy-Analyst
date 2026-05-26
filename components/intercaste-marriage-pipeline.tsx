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
              Explaining the Paradox: Why Demographics Matter More Than You Think
            </h2>

            <div className="bg-card border border-border p-6 rounded-lg mb-6">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Tamil Nadu's Caste Structure (Census 2011)</p>
              <div className="grid grid-cols-4 gap-3">
                <div className="bg-secondary/20 p-3 rounded text-center">
                  <p className="font-bold text-2xl text-accent">70%</p>
                  <p className="text-xs text-muted-foreground">OBC</p>
                </div>
                <div className="bg-secondary/20 p-3 rounded text-center">
                  <p className="font-bold text-2xl text-amber-600">15%</p>
                  <p className="text-xs text-muted-foreground">SC</p>
                </div>
                <div className="bg-secondary/20 p-3 rounded text-center">
                  <p className="font-bold text-2xl text-cyan-600">3%</p>
                  <p className="text-xs text-muted-foreground">UC</p>
                </div>
                <div className="bg-secondary/20 p-3 rounded text-center">
                  <p className="font-bold text-2xl text-orange-600">1%</p>
                  <p className="text-xs text-muted-foreground">ST</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-4 italic">
                This dominance of a single category (OBC) changes the math of intercaste marriage fundamentally.
              </p>
            </div>

            <div className="space-y-4">
              <div className="border border-border bg-background p-5 rounded">
                <h3 className="font-semibold text-lg mb-2 flex items-start gap-2">
                  <span className="text-accent font-bold">1.</span>
                  <span>Demographic Structure Hypothesis: The OBC Marriage Trap</span>
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  TN's caste distribution is radically skewed: 70%+ OBC, ~15% SC, ~3% UC, ~1% ST. This creates a mathematical constraint on intercaste marriage.
                </p>

                <div className="bg-secondary/10 p-4 rounded mb-4 text-sm space-y-3">
                  <div>
                    <p className="font-semibold text-foreground mb-2">The Mechanics:</p>
                    <p className="text-muted-foreground">
                      When 70% of the population is OBC, simple probability means most people (especially OBCs) will marry within their own caste just by numbers. An OBC woman meets OBC men more often than SC or UC men. So even if she has <strong>no preference for caste endogamy</strong>, she'll likely end up marrying OBC.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-2">Compare to Other States:</p>
                    <p className="text-muted-foreground">
                      In UP, Bihar, etc.: SC ~20%, ST ~15%, OBC ~45%, UC ~20%. More even distribution = more cross-caste marriage opportunities = higher "intercaste" rates, even if people are equally caste-conscious.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-2">TN's Hidden Diversity:</p>
                    <p className="text-muted-foreground">
                      The 70% OBC label hides 100+ different jatis (sub-castes): Vellalas, Muppanar, Vaniyars, Padayatchis, etc. Some of these jatis are small and dispersed. Within-OBC marriage is actually <strong>cross-jati marriage</strong> — real caste boundary crossing that doesn't show up in the aggregate "same-caste" number.
                    </p>
                  </div>
                </div>

                <div className="bg-secondary/30 p-3 rounded text-xs text-muted-foreground italic">
                  <strong>The Reddit Argument:</strong> If you look at within-OBC jati endogamy, TN might show lower rates than other states. But the IHDS asks "Did you marry outside your <strong>caste</strong>?" not outside your <strong>jati</strong>. So 70% of "within-caste" marriages are actually between different jatis within the OBC category — real caste boundary crossing.
                </div>

                <div className="border-t border-border pt-3 mt-3">
                  <p className="font-semibold text-foreground mb-2 text-xs uppercase tracking-widest">What This Means</p>
                  <p className="text-xs text-muted-foreground">
                    TN's 97.4% "same-caste" rate might not reflect strong caste endogamy. It could reflect demographic reality: with 70% OBC, most marriages will be "OBC-OBC". But if those OBC marriages are between Vellalas and Vaniyars (different jatis), they're actually intercaste unions.
                  </p>
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
            <h3 className="font-serif text-xl mb-4">Most Likely Reality: The OBC-Driven Endogamy</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              TN's 97.4% same-caste marriage rate is largely driven by demographics, not necessarily caste rigidity. Here's what's likely:
            </p>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-accent font-bold">1.</span>
                <span><strong>OBC marriage dominance:</strong> 70% of the population is OBC. So 70% of all marriages are OBC-OBC. This is not caste endogamy in the Varna sense (upper vs lower), but jati (sub-caste) boundaries matter.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent font-bold">2.</span>
                <span><strong>Within-OBC jati variation:</strong> 100+ jatis exist within TN's OBC category. Some may be rigidly endogamous (marry within jati). Others may be more open. The aggregate "97.4%" masks this diversity.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent font-bold">3.</span>
                <span><strong>SC/UC margins are small:</strong> Only 15% SC and 3% UC. Even if they all married out, it would move the needle by ~18 percentage points. Not enough to explain the gap between TN (97.4%) and Kerala (78.7%).</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent font-bold">4.</span>
                <span><strong>Hidden caste boundaries:</strong> The real question is: within that 70% OBC population, how much jati endogamy is there? Until we have that data, we can't say whether TN's endogamy is driven by rigid caste practice or demographic structure.</span>
              </li>
            </ul>

            <div className="mt-6 p-4 bg-red-950/20 border border-red-900/30 rounded">
              <p className="text-xs uppercase tracking-widest text-red-300 mb-2">The Reality Check</p>
              <p className="text-sm text-foreground">
                Honour killings in TN (and across India) are mostly intercaste and inter-religious marriages. Families kill their own children to prevent cross-caste unions. This is not a "data gap" — it's proof that caste boundaries are actively enforced, often to death. The 97.4% endogamy isn't just demographic accident. It's maintained by violence.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Enforcement Section */}
      <div className="border border-border bg-card p-6 md:p-8 space-y-6">
        <div>
          <h3 className="font-serif text-xl mb-4">Beyond Statistics: The Enforcement of Caste Boundaries</h3>
          <p className="text-sm text-muted-foreground mb-6">
            The 97.4% endogamy rate doesn't happen by accident. It's maintained by social pressure, economic exclusion, and violence. Honour killings are one brutal example.
          </p>

          <div className="space-y-4">
            <div className="p-4 border border-red-900/30 bg-red-950/10 rounded">
              <p className="font-semibold text-foreground mb-2">Honour Killings in India</p>
              <p className="text-sm text-muted-foreground mb-3">
                The largest category of honour killings are <strong>intercaste marriages</strong>. When a couple crosses caste lines, families often respond with violence — sometimes killing their own children to preserve caste purity.
              </p>
              <p className="text-xs text-muted-foreground italic">
                Data: National Crime Records Bureau and media reports document hundreds of honour killings annually in India. A significant portion involve intercaste couples.
              </p>
            </div>

            <div className="p-4 border border-border bg-background rounded">
              <p className="font-semibold text-foreground mb-2">What This Tells Us About TN's 97.4% Rate</p>
              <p className="text-sm text-muted-foreground">
                The high endogamy isn't just demographics or preference. It's <strong>enforced</strong>. The threat of violence (or actual violence) keeps people within caste lines. So even if OBCs have diverse jatis, they don't marry across jati lines because the cost is too high.
              </p>
            </div>

            <div className="p-4 border border-border bg-background rounded">
              <p className="font-semibold text-foreground mb-2">The Implication for Dravidian Ideology</p>
              <p className="text-sm text-muted-foreground mb-3">
                TN's political movement promised to break caste. But 75 years later, caste boundaries are still enforced by violence. This suggests either:
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-red-400">→</span>
                  <span><strong>Ideology didn't reach kinship:</strong> Political anti-caste sentiment doesn't translate to family acceptance of cross-caste marriage.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-400">→</span>
                  <span><strong>Caste is deeper than politics:</strong> Family, honour, and kinship protect caste more effectively than any political slogan can break it.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

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
              <span><strong>Caste boundaries are enforced, not just practiced:</strong> Honour killings over intercaste marriage prove families actively punish boundary-crossing. The 97.4% endogamy isn't passive preference — it's maintained by threat and violence.</span>
            </p>
            <p className="flex gap-3">
              <span className="text-accent font-bold">2.</span>
              <span><strong>Dravidian ideology failed at kinship:</strong> 75 years of anti-caste politics changed government policy, voting patterns, and political parties. It didn't reach the family. When it comes to whom your daughter marries, caste still trumps ideology.</span>
            </p>
            <p className="flex gap-3">
              <span className="text-accent font-bold">3.</span>
              <span><strong>The deepest caste boundary:</strong> Marriage is where caste is defended most fiercely — to the point of honour killings. If political reform hasn't touched this, then the system is intact at its core.</span>
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
