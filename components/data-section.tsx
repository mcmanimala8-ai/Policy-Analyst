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

const tfrTrend = [
  { year: "1992", india: 3.4, tn: 2.5 },
  { year: "1998", india: 3.1, tn: 2.2 },
  { year: "2005", india: 2.7, tn: 1.9 },
  { year: "2010", india: 2.4, tn: 1.8 },
  { year: "2015", india: 2.2, tn: 1.7 },
  { year: "2019", india: 2.0, tn: 1.8 },
]

// ASER 2024: Tamil Nadu vs Key States - Learning Outcomes
const aserReadingData = [
  { state: "Tamil Nadu", std3: 12.0, std5: 35.6, std8: 62.2 },
  { state: "Kerala", std3: 44.4, std5: 58.2, std8: 82.0 },
  { state: "Karnataka", std3: 15.9, std5: 34.0, std8: 62.1 },
  { state: "Andhra", std3: 14.7, std5: 37.5, std8: 53.0 },
  { state: "Himachal", std3: 49.7, std5: 70.1, std8: 87.7 },
  { state: "All India", std3: 27.0, std5: 48.8, std8: 71.1 },
]

// ASER Tamil Nadu Trends: % children reading at Std II level - Std III
// ASER Tamil Nadu: % Std V children reading at Std II level
const aserStd5TrendData = [
  { year: "2014", govt: 49.9, pvt: 40.2, all: 46.9 },
  { year: "2016", govt: 49.4, pvt: 37.0, all: 45.3 },
  { year: "2018", govt: 46.3, pvt: 28.8, all: 40.8 },
  { year: "2022", govt: 26.0, pvt: 22.4, all: 25.2 },
  { year: "2024", govt: 37.0, pvt: 32.3, all: 35.6 },
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

const charts = ["ASER: TN vs States", "ASER: TN Trends", "TFR by State", "TFR Trend"]


function AccessibleDataTable({ chart }: { chart: string }) {
  if (chart === "TFR by State") {
    return (
      <table className="w-full text-sm text-left">
        <caption className="sr-only">Total fertility rate by state, 2019–21</caption>
        <thead><tr><th scope="col" className="px-3 py-2">State</th><th scope="col" className="px-3 py-2">TFR</th></tr></thead>
        <tbody>{tfrData.map((row) => (
          <tr key={row.state} className="border-t border-border"><th scope="row" className="px-3 py-2 font-medium">{row.state}</th><td className="px-3 py-2">{row.tfr}</td></tr>
        ))}</tbody>
      </table>
    )
  }

  if (chart === "TFR Trend") {
    return (
      <table className="w-full text-sm text-left">
        <caption className="sr-only">Tamil Nadu and India total fertility rate trend</caption>
        <thead><tr><th scope="col" className="px-3 py-2">Year</th><th scope="col" className="px-3 py-2">India</th><th scope="col" className="px-3 py-2">Tamil Nadu</th></tr></thead>
        <tbody>{tfrTrend.map((row) => (
          <tr key={row.year} className="border-t border-border"><th scope="row" className="px-3 py-2 font-medium">{row.year}</th><td className="px-3 py-2">{row.india}</td><td className="px-3 py-2">{row.tn}</td></tr>
        ))}</tbody>
      </table>
    )
  }

  if (chart === "ASER: TN Trends") {
    return (
      <table className="w-full text-sm text-left">
        <caption className="sr-only">ASER Tamil Nadu learning trend data</caption>
        <thead><tr><th scope="col" className="px-3 py-2">Year</th><th scope="col" className="px-3 py-2">Government</th><th scope="col" className="px-3 py-2">Private</th><th scope="col" className="px-3 py-2">All</th></tr></thead>
        <tbody>{aserStd5TrendData.map((row) => (
          <tr key={row.year} className="border-t border-border"><th scope="row" className="px-3 py-2 font-medium">{row.year}</th><td className="px-3 py-2">{row.govt}%</td><td className="px-3 py-2">{row.pvt}%</td><td className="px-3 py-2">{row.all}%</td></tr>
        ))}</tbody>
      </table>
    )
  }

  return (
    <table className="w-full text-sm text-left">
      <caption className="sr-only">ASER 2024 learning levels by state</caption>
      <thead><tr><th scope="col" className="px-3 py-2">State</th><th scope="col" className="px-3 py-2">Std III</th><th scope="col" className="px-3 py-2">Std V</th><th scope="col" className="px-3 py-2">Std VIII</th></tr></thead>
      <tbody>{aserReadingData.map((row) => (
        <tr key={row.state} className="border-t border-border"><th scope="row" className="px-3 py-2 font-medium">{row.state}</th><td className="px-3 py-2">{row.std3}%</td><td className="px-3 py-2">{row.std5}%</td><td className="px-3 py-2">{row.std8}%</td></tr>
      ))}</tbody>
    </table>
  )
}

export function DataSection() {
  const [activeChart, setActiveChart] = useState("ASER: TN vs States")

  return (
    <section id="data" className="py-24 border-b border-border">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12 pt-8 border-b border-border pb-10">
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
            Tamil Nadu Governance Desk
          </p>
          <h1 className="font-serif text-4xl md:text-5xl tracking-tight mb-4">
            Data Lab
          </h1>
          <p className="text-muted-foreground max-w-xl leading-relaxed">
            Tamil Nadu in numbers — education and demographics. Sources are listed with each chart.
          </p>
        </div>

        {/* Chart Tabs */}
        <div className="flex flex-wrap gap-2 mb-8" role="tablist" aria-label="Data Lab charts">
          {charts.map((chart) => (
            <button
              key={chart}
              id={"tab-" + chart.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
              role="tab"
              aria-selected={activeChart === chart}
              aria-controls="data-chart-panel"
              tabIndex={activeChart === chart ? 0 : -1}
              onClick={() => setActiveChart(chart)}
              onKeyDown={(event) => {
                const currentIndex = charts.indexOf(chart)
                if (event.key === "ArrowRight") {
                  event.preventDefault()
                  setActiveChart(charts[(currentIndex + 1) % charts.length])
                } else if (event.key === "ArrowLeft") {
                  event.preventDefault()
                  setActiveChart(charts[(currentIndex - 1 + charts.length) % charts.length])
                }
              }}
              className={"px-4 py-2 text-sm font-medium transition-all border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent " +
                (activeChart === chart
                  ? "bg-accent text-accent-foreground border-accent"
                  : "bg-secondary text-secondary-foreground border-border hover:border-accent")}
            >
              {chart}
            </button>
          ))}
        </div>

        {/* Chart Area */}
        <div id="data-chart-panel" role="tabpanel" tabIndex={0} aria-labelledby={"tab-" + activeChart.toLowerCase().replace(/[^a-z0-9]+/g, "-")} className="bg-card border border-border p-6 md:p-8">

          {activeChart === "TFR by State" && (
            <div>
              <h3 className="font-serif text-xl mb-2">Total Fertility Rate by State (2019–21)</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Tamil Nadu and Kerala recorded TFR of 1.8 in NFHS-5, below the replacement level of 2.1.
              </p>
              <ResponsiveContainer width="100%" height={380}>
                <BarChart data={tfrData} margin={{ top: 10, right: 20, left: 0, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="state" tick={{ fill: "#94a3b8", fontSize: 12 }} angle={-35} textAnchor="end" interval={0} />
                  <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} domain={[0, 3.5]} label={{ value: "TFR", angle: -90, position: "insideLeft", fill: "#94a3b8", fontSize: 12 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <ReferenceLine y={2.1} stroke="#f59e0b" strokeDasharray="6 3" label={{ value: "Replacement Level (2.1)", fill: "#f59e0b", fontSize: 11, position: "insideTopRight" }} />
                  <Bar dataKey="tfr" name="TFR" radius={[3, 3, 0, 0]}>
                    {tfrData.map((entry, index) => (<Cell key={index} fill={entry.color} />))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <p className="text-xs text-muted-foreground mt-4">Source: NFHS-5 (2019–21), National Family Health Survey</p>
            </div>
          )}

          {activeChart === "TFR Trend" && (
            <div>
              <h3 className="font-serif text-xl mb-2">Tamil Nadu vs India: TFR Decline (1992–2019)</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Tamil Nadu reached replacement-level fertility earlier than the national average.
              </p>
              <ResponsiveContainer width="100%" height={380}>
                <LineChart data={tfrTrend} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="year" tick={{ fill: "#94a3b8", fontSize: 12 }} />
                  <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} domain={[1, 4]} label={{ value: "TFR", angle: -90, position: "insideLeft", fill: "#94a3b8", fontSize: 12 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ color: "#94a3b8", fontSize: 12, paddingTop: 16 }} />
                  <ReferenceLine y={2.1} stroke="#f59e0b" strokeDasharray="6 3" label={{ value: "Replacement Level", fill: "#f59e0b", fontSize: 11, position: "insideTopRight" }} />
                  <Line type="monotone" dataKey="india" name="India Average" stroke="#6b7280" strokeWidth={2} dot={{ fill: "#6b7280", r: 4 }} />
                  <Line type="monotone" dataKey="tn" name="Tamil Nadu" stroke="#f59e0b" strokeWidth={3} dot={{ fill: "#f59e0b", r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
              <p className="text-xs text-muted-foreground mt-4">Source: NFHS Series (1992–2021), SRS Statistical Reports</p>
            </div>
          )}

          {activeChart === "ASER: TN vs States" && (
            <div>
              <h3 className="font-serif text-xl mb-2">Learning Levels: Tamil Nadu vs. Southern &amp; Major States</h3>
              <p className="text-sm text-muted-foreground mb-2">ASER 2024 — foundation literacy comparison across states.</p>
              <p className="text-xs text-muted-foreground mb-6 italic">Source: ASER 2024 Report, Rural India</p>
              <ResponsiveContainer width="100%" height={340}>
                <BarChart data={aserReadingData} margin={{ top: 10, right: 10, left: -10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="state" tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} />
                  <YAxis tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} domain={[0, 100]} unit="%" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ color: "var(--muted-foreground)", fontSize: 12, paddingTop: 16 }} />
                  <Bar dataKey="std3" name="Std III" fill="#c0392b" radius={[2,2,0,0]} />
                  <Bar dataKey="std5" name="Std V" fill="#e67e22" radius={[2,2,0,0]} />
                  <Bar dataKey="std8" name="Std VIII" fill="#f39c12" radius={[2,2,0,0]} />
                </BarChart>
              </ResponsiveContainer>
              <p className="text-xs text-muted-foreground mt-4">In this comparison, Tamil Nadu is below Kerala and the all-India figures at Std III and Std V.</p>
            </div>
          )}

          {activeChart === "ASER: TN Trends" && (
            <div>
              <h3 className="font-serif text-xl mb-2">The Decadal Trajectory: Foundation Skills Fluctuations in TN</h3>
              <p className="text-sm text-muted-foreground mb-2">Mapping school learning trends from 2014 through 2024 in rural Tamil Nadu.</p>
              <p className="text-xs text-muted-foreground mb-6 italic">Source: ASER 2024 Report, Rural Tamil Nadu</p>
              <ResponsiveContainer width="100%" height={320}>
                <LineChart data={aserStd5TrendData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="year" tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
                  <YAxis tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} domain={[0, 60]} unit="%" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ color: "var(--muted-foreground)", fontSize: 12, paddingTop: 16 }} />
                  <Line type="monotone" dataKey="govt" name="Govt Schools" stroke="#c0392b" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="pvt" name="Private Schools" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="all" name="All Children" stroke="#f39c12" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
              <p className="text-xs text-muted-foreground mt-4">The series falls in 2022 and partially recovers by 2024.</p>
            </div>
          )}

        </div>

        <details className="mt-4 border border-border bg-secondary/20">
          <summary className="cursor-pointer px-4 py-3 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
            View data table
          </summary>
          <div className="overflow-x-auto px-4 pb-4 pt-2">
            <AccessibleDataTable chart={activeChart} />
          </div>
        </details>

        {/* Bottom note */}
        <div className="mt-6 p-4 border border-border bg-secondary/30">
          <p className="text-sm text-muted-foreground">
            <span className="text-accent font-medium">Note: </span>
            This is an expanding data lab. Sources are identified for each chart and dataset.
          </p>
        </div>
      </div>
    </section>
  )
}
