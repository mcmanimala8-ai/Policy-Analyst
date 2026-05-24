"use client"

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

type ChartType = "fertility" | "delimitation" | "education-reading" | "education-facilities"

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

const delimitationData = [
  { state: "UP", population: 16.5, currentSeats: 14.7 },
  { state: "Bihar", population: 8.6, currentSeats: 7.3 },
  { state: "Maharashtra", population: 9.3, currentSeats: 9.3 },
  { state: "Tamil Nadu", population: 6.0, currentSeats: 7.3 },
  { state: "Kerala", population: 2.8, currentSeats: 3.6 },
  { state: "Karnataka", population: 5.2, currentSeats: 5.5 },
  { state: "AP+TS", population: 7.0, currentSeats: 8.5 },
]

const educationReadingData = [
  { year: "2014", govt: 16.8, pvt: 14.4, all: 15.9 },
  { year: "2016", govt: 20.2, pvt: 13.5, all: 17.7 },
  { year: "2018", govt: 11.6, pvt: 7.6, all: 10.2 },
  { year: "2022", govt: 4.7, pvt: 5.0, all: 4.8 },
  { year: "2024", govt: 13.2, pvt: 9.4, all: 12.0 },
]

const educationFacilitiesData = [
  { indicator: "Mid-day meal", value: 99.2 },
  { indicator: "Kitchen/shed", value: 96.6 },
  { indicator: "Drinking water", value: 77.7 },
  { indicator: "Usable toilet", value: 81.4 },
  { indicator: "Girls toilet", value: 77.5 },
  { indicator: "Library use", value: 64.3 },
  { indicator: "Computer use", value: 28.5 },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null

  return (
    <div className="bg-card border border-border p-3 text-sm shadow-lg">
      <p className="font-medium text-foreground mb-1">{label}</p>
      {payload.map((entry: any, index: number) => (
        <p key={`${entry.name}-${index}`} style={{ color: entry.color || "#f59e0b" }}>
          {entry.name}: {entry.value}
          {entry.unit || ""}
        </p>
      ))}
    </div>
  )
}

export function DataTopicChart({ type }: { type: ChartType }) {
  if (type === "fertility") {
    return (
      <div className="mt-6 border border-border bg-background p-4 md:p-5">
        <h3 className="font-serif text-xl mb-2">Total fertility rate by state</h3>
        <p className="text-sm text-muted-foreground mb-5">NFHS-5, 2019-21. Replacement level marked at 2.1.</p>
        <ResponsiveContainer width="100%" height={340}>
          <BarChart data={tfrData} margin={{ top: 10, right: 10, left: -10, bottom: 55 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
            <XAxis dataKey="state" tick={{ fill: "#94a3b8", fontSize: 11 }} angle={-35} textAnchor="end" interval={0} />
            <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} domain={[0, 3.5]} />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={2.1} stroke="#f59e0b" strokeDasharray="6 3" />
            <Bar dataKey="tfr" name="TFR" radius={[3, 3, 0, 0]}>
              {tfrData.map((entry) => (
                <Cell key={entry.state} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }

  if (type === "delimitation") {
    return (
      <div className="mt-6 border border-border bg-background p-4 md:p-5">
        <h3 className="font-serif text-xl mb-2">Current seat share vs population share</h3>
        <p className="text-sm text-muted-foreground mb-5">A simple way to see the representation tension behind delimitation.</p>
        <ResponsiveContainer width="100%" height={340}>
          <BarChart data={delimitationData} margin={{ top: 10, right: 10, left: -10, bottom: 55 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
            <XAxis dataKey="state" tick={{ fill: "#94a3b8", fontSize: 11 }} angle={-35} textAnchor="end" interval={0} />
            <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ color: "#94a3b8", fontSize: 12, paddingTop: 12 }} />
            <Bar dataKey="currentSeats" name="Current seat share %" fill="#f59e0b" radius={[3, 3, 0, 0]} />
            <Bar dataKey="population" name="Population share %" fill="#6b7280" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }

  if (type === "education-reading") {
    return (
      <div className="mt-8 border border-border bg-background p-4 md:p-5">
        <h3 className="font-serif text-xl mb-2">Tamil Nadu Std III reading trend</h3>
        <p className="text-sm text-muted-foreground mb-5">Percent of children who can read Std II level text, ASER rural Tamil Nadu.</p>
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={educationReadingData} margin={{ top: 10, right: 15, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
            <XAxis dataKey="year" tick={{ fill: "#94a3b8", fontSize: 12 }} />
            <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} domain={[0, 25]} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ color: "#94a3b8", fontSize: 12, paddingTop: 12 }} />
            <Line type="monotone" dataKey="govt" name="Govt schools" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="pvt" name="Private schools" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="all" name="All children" stroke="#e5e7eb" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    )
  }

  return (
    <div className="mt-6 border border-border bg-background p-4 md:p-5">
      <h3 className="font-serif text-xl mb-2">Tamil Nadu school delivery indicators</h3>
      <p className="text-sm text-muted-foreground mb-5">Selected ASER 2024 surveyed-school indicators, rural Tamil Nadu.</p>
      <ResponsiveContainer width="100%" height={340}>
        <BarChart data={educationFacilitiesData} layout="vertical" margin={{ top: 10, right: 15, left: 75, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
          <XAxis type="number" tick={{ fill: "#94a3b8", fontSize: 11 }} domain={[0, 100]} />
          <YAxis type="category" dataKey="indicator" tick={{ fill: "#94a3b8", fontSize: 11 }} width={90} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="value" name="Percent" fill="#f59e0b" radius={[0, 3, 3, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
