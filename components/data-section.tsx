"use client"

import { useState } from "react"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, ReferenceLine, Cell, Legend
} from "recharts"

// TFR Data by State — Source: NFHS-5 (2019-21), Ministry of Health & Family Welfare, GoI
const tfrData = [
  { state: "Bihar", tfr: 3.0, color: "#ef4444" },
  { state: "UP", tfr: 2.4, color: "#f97316" },
  { state: "Rajasthan", tfr: 2.0, color: "#eab308" },
  { state: "MP", tfr: 2.0, color: "#eab308" },
  { state: "India Avg", tfr: 2.0, color: "#6b7280" },
  { state: "Gujarat", tfr: 1.9, color: "#84cc16" },
  { state: "Karnataka", tfr: 1.7, color: "#22c55e" },
  { state: "Kerala", tfr: 1.8, color: "#10b981" },
  { state: "Tamil Nadu", tfr: 1.8, color: "#f59e0b" },
]

// Delimitation: Seats vs Population share
const delimData = [
  { state: "UP", population: 16.5, currentSeats: 14.7, fairSeats: 16.5 },
  { state: "Bihar", population: 8.6, currentSeats: 7.3, fairSeats: 8.6 },
  { state: "Maharashtra", population: 9.3, currentSeats: 9.3, fairSeats: 9.3 },
  { state: "Tamil Nadu", population: 6.0, currentSeats: 7.3, fairSeats: 6.0 },
  { state: "Kerala", population: 2.8, currentSeats: 3.6, fairSeats: 2.8 },
  { state: "Karnataka", population: 5.2, currentSeats: 5.5, fairSeats: 5.2 },
  { state: "AP+TS", population: 7.0, currentSeats: 8.5, fairSeats: 7.0 },
]

// TFR trend over time — Tamil Nadu vs India
// Source: NFHS Series 1-5, Sample Registration System (SRS), Registrar General of India
const tfrTrend = [
  { year: "1992", india: 3.4, tn: 2.5 },
  { year: "1998", india: 3.1, tn: 2.2 },
  { year: "2005", india: 2.7, tn: 1.9 },
  { year: "2010", india: 2.4, tn: 1.8 },
  { year: "2015", india: 2.2, tn: 1.7 },
  { year: "2019", india: 2.0, tn: 1.8 },
]


// 2026 TN Election: Seat swing from 2021 to 2026
const electionSwingData = [
  { party: "TVK", seats2021: 0, seats2026: 108 },
  { party: "DMK", seats2021: 133, seats2026: 59 },
  { party: "AIADMK", seats2021: 66, seats2026: 47 },
  { party: "INC", seats2021: 18, seats2026: 5 },
  { party: "PMK", seats2021: 5, seats2026: 4 },
  { party: "Others", seats2021: 12, seats2026: 11 },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border p-3 text-sm shadow-lg">
        <p className="font-medium text-foreground mb-1">{label}</p>
        {payload.map((entry: any, i: number) => (
          <p key={i} style={{ color: entry.color || "#f59e0b" }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

const charts = ["TFR by State", "TFR Trend", "Delimitation Impact", "2026 Election Swing"]

export function DataSection() {
  const [activeChart, setActiveChart] = useState("TFR by State")

  return (
    <section id="data" className="py-24 border-b border-border">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
            Data Lab
          </p>
          <h2 className="font-serif text-3xl md:text-4xl tracking-tight mb-4">
            Policy in Numbers
          </h2>
          <p className="text-muted-foreground max-w-xl leading-relaxed">
            Visualising the data behind India's most pressing governance debates —
            delimitation, demographic dividend, and federal equity.
          </p>
        </div>

        {/* Chart Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {charts.map((chart) => (
            <button
              key={chart}
              onClick={() => setActiveChart(chart)}
              className={`px-4 py-2 text-sm font-medium transition-all border ${
                activeChart === chart
                  ? "bg-accent text-accent-foreground border-accent"
                  : "bg-secondary text-secondary-foreground border-border hover:border-accent"
              }`}
            >
              {chart}
            </button>
          ))}
        </div>

        {/* Chart Area */}
        <div className="bg-card border border-border p-6 md:p-8">

          {/* Chart 1: TFR by State */}
          {activeChart === "TFR by State" && (
            <div>
              <h3 className="font-serif text-xl mb-2">
                Total Fertility Rate by State (2019–21)
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
              Tamil Nadu and Kerala have achieved TFR of 1.8 — well under the 2.1 replacement level, a milestone reached decades ahead of most Indian states. Yet this success may cost them seats in Parliament under Delimitation 2026.
              </p>
              <ResponsiveContainer width="100%" height={380}>
                <BarChart data={tfrData} margin={{ top: 10, right: 20, left: 0, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis
                    dataKey="state"
                    tick={{ fill: "#94a3b8", fontSize: 12 }}
                    angle={-35}
                    textAnchor="end"
                    interval={0}
                  />
                  <YAxis
                    tick={{ fill: "#94a3b8", fontSize: 12 }}
                    domain={[0, 3.5]}
                    label={{ value: "TFR", angle: -90, position: "insideLeft", fill: "#94a3b8", fontSize: 12 }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <ReferenceLine y={2.1} stroke="#f59e0b" strokeDasharray="6 3"
                    label={{ value: "Replacement Level (2.1)", fill: "#f59e0b", fontSize: 11, position: "insideTopRight" }}
                  />
                  <Bar dataKey="tfr" name="TFR" radius={[3, 3, 0, 0]}>
                    {tfrData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <p className="text-xs text-muted-foreground mt-4">
                Source: NFHS-5 (2019–21), National Family Health Survey
              </p>
            </div>
          )}

          {/* Chart 2: TFR Trend */}
          {activeChart === "TFR Trend" && (
            <div>
              <h3 className="font-serif text-xl mb-2">
                Tamil Nadu vs India: TFR Decline (1992–2023)
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Tamil Nadu reached replacement level (2.1) by the late 1990s — nearly two decades ahead of the national average. This demographic transition, achieved through investment in health and education, is now the source of its political vulnerability.
              </p>
              <ResponsiveContainer width="100%" height={380}>
                <LineChart data={tfrTrend} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="year" tick={{ fill: "#94a3b8", fontSize: 12 }} />
                  <YAxis
                    tick={{ fill: "#94a3b8", fontSize: 12 }}
                    domain={[1, 4]}
                    label={{ value: "TFR", angle: -90, position: "insideLeft", fill: "#94a3b8", fontSize: 12 }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ color: "#94a3b8", fontSize: 12, paddingTop: 16 }} />
                  <ReferenceLine y={2.1} stroke="#f59e0b" strokeDasharray="6 3"
                    label={{ value: "Replacement Level", fill: "#f59e0b", fontSize: 11, position: "insideTopRight" }}
                  />
                  <Line type="monotone" dataKey="india" name="India Average"
                    stroke="#6b7280" strokeWidth={2} dot={{ fill: "#6b7280", r: 4 }} />
                  <Line type="monotone" dataKey="tn" name="Tamil Nadu"
                    stroke="#f59e0b" strokeWidth={3} dot={{ fill: "#f59e0b", r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
              <p className="text-xs text-muted-foreground mt-4">
                Source: NFHS Series (1992–2021), SRS Statistical Reports
              </p>
            </div>
          )}

          {/* Chart 3: Delimitation Impact */}
          {activeChart === "2026 Election Swing" && (
            <div>
              <p className="text-sm text-muted-foreground mb-6">Seat count comparison: 2021 vs 2026 Tamil Nadu Assembly Elections. TVK did not contest in 2021.</p>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={electionSwingData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="party" tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
                  <YAxis tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="seats2021" name="2021" fill="#6b7280" radius={[2,2,0,0]} />
                  <Bar dataKey="seats2026" name="2026" fill="var(--accent)" radius={[2,2,0,0]} />
                </BarChart>
              </ResponsiveContainer>
              <p className="text-xs text-muted-foreground mt-4">Source: Election Commission of India, Tamil Nadu 2021 & 2026 General Assembly Results</p>
            </div>
          )}

          {activeChart === "Delimitation Impact" && (
            <div>
              <h3 className="font-serif text-xl mb-2">
                Delimitation 2026: Who Gains, Who Loses?
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                If seats are redrawn purely on population, southern states that controlled their fertility rates stand to lose representation. The chart below compares current seat share vs population share — revealing the "performance tax" on development.
              </p>
              <ResponsiveContainer width="100%" height={380}>
                <BarChart data={delimData} margin={{ top: 10, right: 20, left: 0, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis
                    dataKey="state"
                    tick={{ fill: "#94a3b8", fontSize: 12 }}
                    angle={-35}
                    textAnchor="end"
                    interval={0}
                  />
                  <YAxis
                    tick={{ fill: "#94a3b8", fontSize: 12 }}
                    label={{ value: "% Share", angle: -90, position: "insideLeft", fill: "#94a3b8", fontSize: 12 }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ color: "#94a3b8", fontSize: 12, paddingTop: 16 }} />
                  <Bar dataKey="currentSeats" name="Current Seat Share (%)" fill="#f59e0b" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="population" name="Population Share (%)" fill="#6b7280" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <p className="text-xs text-muted-foreground mt-4">
                Source: Delimitation Commission Reports, Census 2011, Population projections 2026
              </p>
            </div>
          )}
        </div>

        {/* Bottom note */}
        <div className="mt-6 p-4 border border-border bg-secondary/30">
          <p className="text-sm text-muted-foreground">
            <span className="text-accent font-medium">Note: </span>
            This is a growing data lab. Charts are updated as I learn new visualisation techniques and as new data becomes available. All data is sourced from official government publications and peer-reviewed research.
          </p>
        </div>
      </div>
    </section>
  )
}
