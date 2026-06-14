"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, Cell
} from "recharts"
import {
  Search, SlidersHorizontal, ArrowUpDown, GitCompare,
  X, ChevronDown, ChevronUp, Info, AlertCircle
} from "lucide-react"
import { MPs, PARTY_COLORS, getPartyBreakdown, type MP, type Party } from "@/lib/mp-data"

type SortKey = "name" | "constituency" | "party" | "attendance" | "questionsAsked" | "mpladsUtilised" | "winMargin"
type ViewMode = "table" | "compare" | "overview"

const METRIC_LABELS: Record<string, string> = {
  attendance: "Attendance %",
  questionsAsked: "Questions Asked",
  debatesParticipated: "Debates",
  mpladsUtilised: "MPLADS Utilised %",
  winMargin: "Win Margin",
}

export function TrackerDashboard() {
  const [search, setSearch] = useState("")
  const [partyFilter, setPartyFilter] = useState<Party | "all">("all")
  const [allianceFilter, setAllianceFilter] = useState<"all" | "INDIA" | "NDA">("all")
  const [genderFilter, setGenderFilter] = useState<"all" | "M" | "F">("all")
  const [sortKey, setSortKey] = useState<SortKey>("constituency")
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc")
  const [viewMode, setViewMode] = useState<ViewMode>("table")
  const [compareList, setCompareList] = useState<string[]>([])
  const [expandedMP, setExpandedMP] = useState<string | null>(null)
  const [compareMetric, setCompareMetric] = useState<"questionsAsked" | "attendance" | "mpladsUtilised">("questionsAsked")

  const partyBreakdown = getPartyBreakdown()

  const filtered = useMemo(() => {
    let list = MPs.filter((mp) => {
      const matchSearch =
        mp.name.toLowerCase().includes(search.toLowerCase()) ||
        mp.constituency.toLowerCase().includes(search.toLowerCase())
      const matchParty = partyFilter === "all" || mp.party === partyFilter
      const matchAlliance = allianceFilter === "all" || mp.alliance === allianceFilter
      const matchGender = genderFilter === "all" || mp.gender === genderFilter
      return matchSearch && matchParty && matchAlliance && matchGender
    })

    list = list.sort((a, b) => {
      const aVal = a[sortKey as keyof MP]
      const bVal = b[sortKey as keyof MP]
      if (aVal === null) return 1
      if (bVal === null) return -1
      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortDir === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal)
      }
      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortDir === "asc" ? aVal - bVal : bVal - aVal
      }
      return 0
    })

    return list
  }, [search, partyFilter, allianceFilter, genderFilter, sortKey, sortDir])

  const compareData = useMemo(() => {
    return MPs.filter((mp) => compareList.includes(mp.id))
  }, [compareList])

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc")
    } else {
      setSortKey(key)
      setSortDir("asc")
    }
  }

  const toggleCompare = (id: string) => {
    setCompareList((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : prev.length < 4
        ? [...prev, id]
        : prev
    )
  }

  const dataAvailable = MPs.some((mp) => mp.attendance !== null)

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-6">

        {/* Data status notice */}
        {!dataAvailable && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-start gap-3 border border-accent/30 bg-accent/5 p-4 mb-10"
          >
            <AlertCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">Performance data pending first update</p>
              <p className="text-xs text-muted-foreground mt-1">
                The 19th Lok Sabha convened in June 2024. Attendance, questions, and MPLADS data will be populated
                after the first parliamentary session data is published by Lok Sabha Secretariat. Constituency and
                election data is live.
              </p>
            </div>
          </motion.div>
        )}

        {/* View mode tabs */}
        <div className="flex items-center gap-1 mb-8 border-b border-border pb-4">
          {(["table", "compare", "overview"] as ViewMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-4 py-2 text-sm capitalize transition-colors ${
                viewMode === mode
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {mode === "compare" ? "Compare MPs" : mode === "overview" ? "Party Overview" : "All MPs"}
            </button>
          ))}
          {compareList.length > 0 && (
            <span className="ml-auto flex items-center gap-2 text-xs text-accent">
              <GitCompare className="w-3 h-3" />
              {compareList.length} selected for comparison
            </span>
          )}
        </div>

        {/* TABLE VIEW */}
        {viewMode === "table" && (
          <div>
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search MP or constituency..."
                  className="w-full bg-secondary border border-border pl-10 pr-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-accent"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {/* Party filter */}
                <select
                  value={partyFilter}
                  onChange={(e) => setPartyFilter(e.target.value as Party | "all")}
                  className="bg-secondary border border-border px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-accent"
                >
                  <option value="all">All Parties</option>
                  {partyBreakdown.map(({ party }) => (
                    <option key={party} value={party}>{party}</option>
                  ))}
                </select>
                {/* Alliance filter */}
                <select
                  value={allianceFilter}
                  onChange={(e) => setAllianceFilter(e.target.value as "all" | "INDIA" | "NDA")}
                  className="bg-secondary border border-border px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-accent"
                >
                  <option value="all">All Alliances</option>
                  <option value="INDIA">INDIA Alliance</option>
                  <option value="NDA">NDA</option>
                </select>
                {/* Gender filter */}
                <select
                  value={genderFilter}
                  onChange={(e) => setGenderFilter(e.target.value as "all" | "M" | "F")}
                  className="bg-secondary border border-border px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-accent"
                >
                  <option value="all">All</option>
                  <option value="F">Women MPs</option>
                  <option value="M">Male MPs</option>
                </select>
              </div>
            </div>

            <p className="text-xs text-muted-foreground mb-4">
              Showing {filtered.length} of {MPs.length} MPs
              {compareList.length > 0 && " · Click row to add to compare"}
            </p>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    {[
                      { key: "constituency" as SortKey, label: "Constituency" },
                      { key: "name" as SortKey, label: "MP" },
                      { key: "party" as SortKey, label: "Party" },
                      { key: "attendance" as SortKey, label: "Attendance %" },
                      { key: "questionsAsked" as SortKey, label: "Questions" },
                      { key: "mpladsUtilised" as SortKey, label: "MPLADS %" },
                      { key: "winMargin" as SortKey, label: "Win Margin" },
                    ].map(({ key, label }) => (
                      <th
                        key={key}
                        onClick={() => toggleSort(key)}
                        className="text-left py-3 px-3 text-xs uppercase tracking-wider text-muted-foreground cursor-pointer hover:text-foreground transition-colors select-none"
                      >
                        <span className="flex items-center gap-1">
                          {label}
                          <ArrowUpDown className="w-3 h-3 opacity-40" />
                          {sortKey === key && (
                            <span className="text-accent text-xs">{sortDir === "asc" ? "↑" : "↓"}</span>
                          )}
                        </span>
                      </th>
                    ))}
                    <th className="py-3 px-3 text-xs uppercase tracking-wider text-muted-foreground text-right">
                      Compare
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {filtered.map((mp) => (
                    <>
                      <motion.tr
                        key={mp.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onClick={() => setExpandedMP(expandedMP === mp.id ? null : mp.id)}
                        className={`cursor-pointer transition-colors hover:bg-secondary/50 ${
                          compareList.includes(mp.id) ? "bg-accent/5" : ""
                        }`}
                      >
                        <td className="py-4 px-3 font-medium">{mp.constituency}</td>
                        <td className="py-4 px-3">
                          <div>
                            <span className="font-medium">{mp.name}</span>
                            <span className="text-xs text-muted-foreground ml-2">
                              {mp.gender === "F" ? "· She/Her" : ""}
                              {mp.term === "first" ? "· First term" : mp.term === "second" ? "· 2nd term" : "· Veteran"}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-3">
                          <span
                            className="inline-block px-2 py-0.5 text-xs font-medium"
                            style={{
                              backgroundColor: PARTY_COLORS[mp.party] + "22",
                              color: PARTY_COLORS[mp.party],
                              border: `1px solid ${PARTY_COLORS[mp.party]}44`,
                            }}
                          >
                            {mp.party}
                          </span>
                        </td>
                        <td className="py-4 px-3">
                          {mp.attendance !== null ? (
                            <MetricBar value={mp.attendance} max={100} suffix="%" color="accent" />
                          ) : (
                            <span className="text-xs text-muted-foreground">—</span>
                          )}
                        </td>
                        <td className="py-4 px-3 text-center">
                          {mp.questionsAsked !== null ? (
                            <span className="font-mono">{mp.questionsAsked}</span>
                          ) : (
                            <span className="text-xs text-muted-foreground">—</span>
                          )}
                        </td>
                        <td className="py-4 px-3">
                          {mp.mpladsUtilised !== null ? (
                            <MetricBar value={mp.mpladsUtilised} max={100} suffix="%" color="green" />
                          ) : (
                            <span className="text-xs text-muted-foreground">—</span>
                          )}
                        </td>
                        <td className="py-4 px-3 font-mono text-sm">
                          {mp.winMargin.toLocaleString("en-IN")}
                        </td>
                        <td className="py-4 px-3 text-right">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleCompare(mp.id)
                            }}
                            className={`w-7 h-7 flex items-center justify-center transition-colors ${
                              compareList.includes(mp.id)
                                ? "bg-accent text-accent-foreground"
                                : "border border-border text-muted-foreground hover:border-accent hover:text-accent"
                            }`}
                          >
                            {compareList.includes(mp.id) ? (
                              <X className="w-3 h-3" />
                            ) : (
                              <span className="text-xs font-bold">+</span>
                            )}
                          </button>
                        </td>
                      </motion.tr>

                      {/* Expanded row */}
                      <AnimatePresence>
                        {expandedMP === mp.id && (
                          <tr key={`${mp.id}-expanded`}>
                            <td colSpan={8} className="p-0">
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="bg-secondary/30 border-b border-border px-6 py-5 grid md:grid-cols-3 gap-6">
                                  <div>
                                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Focus Areas</p>
                                    <div className="flex flex-wrap gap-2">
                                      {mp.focusAreas.map((area) => (
                                        <span
                                          key={area}
                                          className="text-xs px-2.5 py-1 bg-secondary border border-border"
                                        >
                                          {area}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                  <div>
                                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">2024 Election</p>
                                    <div className="space-y-1">
                                      <p className="text-sm">
                                        <span className="text-muted-foreground">Vote share: </span>
                                        <span className="font-mono">{mp.votesPolled}%</span>
                                      </p>
                                      <p className="text-sm">
                                        <span className="text-muted-foreground">Win margin: </span>
                                        <span className="font-mono">{mp.winMargin.toLocaleString("en-IN")} votes</span>
                                      </p>
                                      <p className="text-sm">
                                        <span className="text-muted-foreground">Alliance: </span>
                                        <span>{mp.alliance}</span>
                                      </p>
                                    </div>
                                  </div>
                                  <div>
                                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Analyst Note</p>
                                    {mp.profileNote ? (
                                      <p className="text-sm text-muted-foreground">{mp.profileNote}</p>
                                    ) : (
                                      <p className="text-xs text-muted-foreground italic">No analysis added yet.</p>
                                    )}
                                  </div>
                                </div>
                              </motion.div>
                            </td>
                          </tr>
                        )}
                      </AnimatePresence>
                    </>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Compare CTA if items selected */}
            {compareList.length >= 2 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 flex items-center justify-between border border-accent/40 bg-accent/5 p-4"
              >
                <span className="text-sm">
                  <span className="text-accent font-medium">{compareList.length} MPs selected.</span>{" "}
                  Switch to Compare view to see side-by-side analysis.
                </span>
                <button
                  onClick={() => setViewMode("compare")}
                  className="px-4 py-2 bg-accent text-accent-foreground text-sm font-medium"
                >
                  Compare Now →
                </button>
              </motion.div>
            )}
          </div>
        )}

        {/* COMPARE VIEW */}
        {viewMode === "compare" && (
          <div>
            {compareList.length < 2 ? (
              <div className="text-center py-20 border border-border">
                <GitCompare className="w-8 h-8 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-2">Select 2–4 MPs from the table to compare</p>
                <button
                  onClick={() => setViewMode("table")}
                  className="text-accent text-sm hover:underline"
                >
                  ← Go to MP Table
                </button>
              </div>
            ) : (
              <div>
                {/* Metric selector */}
                <div className="flex flex-wrap items-center gap-3 mb-8">
                  <span className="text-sm text-muted-foreground">Compare by:</span>
                  {(["questionsAsked", "attendance", "mpladsUtilised"] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => setCompareMetric(m)}
                      className={`px-3 py-1.5 text-sm transition-colors ${
                        compareMetric === m
                          ? "bg-primary text-primary-foreground"
                          : "border border-border text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {METRIC_LABELS[m]}
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      setCompareList([])
                      setViewMode("table")
                    }}
                    className="ml-auto text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
                  >
                    <X className="w-3 h-3" /> Clear all
                  </button>
                </div>

                {/* Compare cards */}
                <div className={`grid gap-4 mb-10 ${compareData.length === 2 ? "md:grid-cols-2" : compareData.length === 3 ? "md:grid-cols-3" : "md:grid-cols-4"}`}>
                  {compareData.map((mp) => (
                    <motion.div
                      key={mp.id}
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="border border-border p-6 relative"
                    >
                      <button
                        onClick={() => toggleCompare(mp.id)}
                        className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                      <span
                        className="inline-block px-2 py-0.5 text-xs font-medium mb-3"
                        style={{
                          backgroundColor: PARTY_COLORS[mp.party] + "22",
                          color: PARTY_COLORS[mp.party],
                          border: `1px solid ${PARTY_COLORS[mp.party]}44`,
                        }}
                      >
                        {mp.party}
                      </span>
                      <h3 className="font-serif text-lg mb-0.5">{mp.name}</h3>
                      <p className="text-xs text-muted-foreground mb-5">{mp.constituency}</p>

                      <div className="space-y-4">
                        <StatRow label="Attendance" value={mp.attendance} suffix="%" />
                        <StatRow label="Questions" value={mp.questionsAsked} />
                        <StatRow label="Debates" value={mp.debatesParticipated} />
                        <StatRow label="MPLADS %" value={mp.mpladsUtilised} suffix="%" />
                        <StatRow label="Win Margin" value={mp.winMargin} format="lakhs" />
                      </div>

                      <div className="mt-5 pt-4 border-t border-border">
                        <p className="text-xs text-muted-foreground mb-2">Focus Areas</p>
                        <div className="flex flex-wrap gap-1">
                          {mp.focusAreas.slice(0, 3).map((f) => (
                            <span key={f} className="text-xs px-2 py-0.5 bg-secondary border border-border">{f}</span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Bar chart comparison */}
                {!dataAvailable ? (
                  <div className="border border-border/50 p-8 text-center">
                    <p className="text-muted-foreground text-sm">Chart comparison available once performance data is updated.</p>
                  </div>
                ) : (
                  <div className="border border-border p-6">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-6">
                      {METRIC_LABELS[compareMetric]} — Side by Side
                    </p>
                    <ResponsiveContainer width="100%" height={280}>
                      <BarChart
                        data={compareData.map((mp) => ({
                          name: mp.name.split(" ").slice(-1)[0],
                          value: mp[compareMetric] ?? 0,
                          party: mp.party,
                        }))}
                        margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.30 0.04 250)" />
                        <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="oklch(0.70 0.02 90)" />
                        <YAxis tick={{ fontSize: 11 }} stroke="oklch(0.70 0.02 90)" />
                        <Tooltip
                          contentStyle={{
                            background: "oklch(0.22 0.05 250)",
                            border: "1px solid oklch(0.30 0.04 250)",
                            borderRadius: "0",
                            fontSize: "12px",
                          }}
                        />
                        <Bar dataKey="value" radius={0}>
                          {compareData.map((mp) => (
                            <Cell key={mp.id} fill={PARTY_COLORS[mp.party]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* OVERVIEW VIEW */}
        {viewMode === "overview" && (
          <div className="space-y-10">
            {/* Party breakdown */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="border border-border p-6">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-6">Party Breakdown — TN Lok Sabha 2024</p>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart
                    data={partyBreakdown.map(({ party, count }) => ({ party, count }))}
                    layout="vertical"
                    margin={{ top: 0, right: 20, left: 40, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.30 0.04 250)" horizontal={false} />
                    <XAxis type="number" tick={{ fontSize: 11 }} stroke="oklch(0.70 0.02 90)" />
                    <YAxis dataKey="party" type="category" tick={{ fontSize: 11 }} stroke="oklch(0.70 0.02 90)" />
                    <Tooltip
                      contentStyle={{
                        background: "oklch(0.22 0.05 250)",
                        border: "1px solid oklch(0.30 0.04 250)",
                        fontSize: "12px",
                      }}
                      formatter={(v) => [`${v} seats`, "Seats"]}
                    />
                    <Bar dataKey="count" radius={0}>
                      {partyBreakdown.map(({ party }) => (
                        <Cell
                          key={party}
                          fill={PARTY_COLORS[party as Party] || "#6B7280"}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Alliance vs gender breakdown */}
              <div className="border border-border p-6 flex flex-col gap-6">
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-4">Alliance Split</p>
                  <div className="space-y-3">
                    {[
                      { label: "INDIA Alliance", count: MPs.filter(m => m.alliance === "INDIA").length, color: "#2A9D8F" },
                      { label: "NDA", count: MPs.filter(m => m.alliance === "NDA").length, color: "#F4A261" },
                    ].map(({ label, count, color }) => (
                      <div key={label} className="flex items-center gap-3">
                        <div className="flex-1">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-muted-foreground">{label}</span>
                            <span className="font-mono">{count} MPs</span>
                          </div>
                          <div className="h-1.5 bg-secondary">
                            <div
                              className="h-full transition-all"
                              style={{ width: `${(count / MPs.length) * 100}%`, backgroundColor: color }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-border pt-5">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-4">Women MPs</p>
                  <div className="flex items-end gap-3">
                    <p className="text-4xl font-serif text-accent">
                      {MPs.filter(m => m.gender === "F").length}
                    </p>
                    <p className="text-muted-foreground text-sm pb-1">
                      of {MPs.length} MPs ({Math.round((MPs.filter(m => m.gender === "F").length / MPs.length) * 100)}%)
                    </p>
                  </div>
                </div>

                <div className="border-t border-border pt-5">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-4">First-term MPs</p>
                  <div className="flex items-end gap-3">
                    <p className="text-4xl font-serif text-accent">
                      {MPs.filter(m => m.term === "first").length}
                    </p>
                    <p className="text-muted-foreground text-sm pb-1">
                      new faces in 19th Lok Sabha
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Win margin chart */}
            <div className="border border-border p-6">
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-6">
                2024 Win Margins — All TN Constituencies
              </p>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={[...MPs].sort((a, b) => b.winMargin - a.winMargin).map((mp) => ({
                    name: mp.constituency.split(" ")[0],
                    margin: Math.round(mp.winMargin / 1000),
                    party: mp.party,
                  }))}
                  margin={{ top: 5, right: 10, left: 0, bottom: 40 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.30 0.04 250)" />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 9 }}
                    stroke="oklch(0.70 0.02 90)"
                    angle={-45}
                    textAnchor="end"
                    interval={0}
                  />
                  <YAxis
                    tick={{ fontSize: 10 }}
                    stroke="oklch(0.70 0.02 90)"
                    label={{ value: "000s votes", angle: -90, position: "insideLeft", fontSize: 10 }}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "oklch(0.22 0.05 250)",
                      border: "1px solid oklch(0.30 0.04 250)",
                      fontSize: "11px",
                    }}
                    formatter={(v) => [`${v}K votes`, "Win Margin"]}
                  />
                  <Bar dataKey="margin" radius={0}>
                    {[...MPs].sort((a, b) => b.winMargin - a.winMargin).map((mp) => (
                      <Cell key={mp.id} fill={PARTY_COLORS[mp.party] || "#6B7280"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <p className="text-xs text-muted-foreground mt-3">Source: Election Commission of India, June 2024</p>
            </div>

            {/* Data update roadmap */}
            <div className="border border-border p-6">
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-6">Update Roadmap</p>
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { quarter: "Q1 2025", label: "Session data", status: "pending", detail: "Attendance & questions from Budget Session" },
                  { quarter: "Q2 2025", label: "MPLADS update", status: "pending", detail: "Fund utilisation data from Ministry portal" },
                  { quarter: "Q3 2025", label: "Mid-term review", status: "upcoming", detail: "Analyst commentary added to each MP profile" },
                  { quarter: "2029", label: "Election scorecard", status: "planned", detail: "Full-term performance card for each MP" },
                ].map(({ quarter, label, status, detail }) => (
                  <div key={quarter} className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        status === "pending" ? "bg-accent" :
                        status === "upcoming" ? "bg-yellow-500" : "bg-muted-foreground"
                      }`} />
                      <span className="text-xs font-mono text-muted-foreground">{quarter}</span>
                    </div>
                    <p className="text-sm font-medium">{label}</p>
                    <p className="text-xs text-muted-foreground">{detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Methodology note */}
        <div className="mt-16 pt-8 border-t border-border">
          <div className="flex items-start gap-3">
            <Info className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
            <div className="text-xs text-muted-foreground space-y-1">
              <p><span className="text-foreground font-medium">Methodology.</span> Performance data is sourced from Lok Sabha Secretariat records, PRS Legislative Research, and the MPLADS portal (Ministry of Statistics & PI). All data is manually verified before publication. Constituency and election data reflects ECI results from June 2024.</p>
              <p>This tracker is maintained by Manimala Chithamanan, Tamil Nadu Governance Desk. Last reviewed: June 2025.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Helper components
function MetricBar({ value, max, suffix = "", color }: { value: number; max: number; suffix?: string; color: string }) {
  const pct = Math.min((value / max) * 100, 100)
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-secondary max-w-[80px]">
        <div
          className="h-full"
          style={{
            width: `${pct}%`,
            backgroundColor: color === "accent" ? "oklch(0.80 0.14 85)" : "#22c55e",
          }}
        />
      </div>
      <span className="text-xs font-mono tabular-nums">{value}{suffix}</span>
    </div>
  )
}

function StatRow({
  label, value, suffix = "", format
}: {
  label: string
  value: number | null
  suffix?: string
  format?: string
}) {
  const display =
    value === null
      ? "—"
      : format === "lakhs"
      ? `${(value / 100000).toFixed(1)}L`
      : `${value}${suffix}`
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-muted-foreground text-xs">{label}</span>
      <span className={`font-mono text-xs ${value === null ? "text-muted-foreground" : "text-foreground"}`}>
        {display}
      </span>
    </div>
  )
}
