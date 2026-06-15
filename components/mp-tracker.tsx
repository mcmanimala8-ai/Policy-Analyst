"use client";

import { useState, useEffect, useMemo } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, ReferenceLine, Legend,
} from "recharts";
import {
  Search, MapPin, User, TrendingUp, FileText,
  GitCompare, X, ArrowUpDown, ChevronDown, Info,
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────
interface MP {
  constituency: string;
  mp_name: string;
  party: string;
  term: string;
  attendance: number;
  questions_asked: number;
  debates_participated: number;
  private_member_bills: number;
  mplads_utilized: null | number;
  primary_spending_sector: null | string;
  policy_narrative: null | string;
}

// ── Constants ─────────────────────────────────────────────────────────────────
const STATE_AVG = {
  attendance: 78.8,
  questions_asked: 114,
  debates_participated: 25,
};

const PARTY_STYLES: Record<string, { bg: string; text: string; border: string; dot: string; hex: string }> = {
  "Dravida Munnetra Kazhagam": {
    bg: "bg-red-50", text: "text-red-800", border: "border-red-300", dot: "bg-red-600", hex: "#dc2626",
  },
  "Indian National Congress": {
    bg: "bg-blue-50", text: "text-blue-800", border: "border-blue-300", dot: "bg-blue-600", hex: "#2563eb",
  },
  "Viduthalai Chiruthaigal Katchi": {
    bg: "bg-indigo-50", text: "text-indigo-800", border: "border-indigo-300", dot: "bg-indigo-700", hex: "#4338ca",
  },
  "Communist Party of India (Marxist)": {
    bg: "bg-rose-50", text: "text-rose-900", border: "border-rose-300", dot: "bg-rose-700", hex: "#be123c",
  },
  "Communist Party of India": {
    bg: "bg-rose-50", text: "text-rose-900", border: "border-rose-300", dot: "bg-rose-700", hex: "#be123c",
  },
  "Indian Union Muslim League": {
    bg: "bg-green-50", text: "text-green-800", border: "border-green-300", dot: "bg-green-600", hex: "#16a34a",
  },
  "Marumalarchi Dravida Munnetra Kazhagam": {
    bg: "bg-orange-50", text: "text-orange-800", border: "border-orange-300", dot: "bg-orange-600", hex: "#ea580c",
  },
};
const DEFAULT_PARTY = { bg: "bg-slate-100", text: "text-slate-700", border: "border-slate-300", dot: "bg-slate-500", hex: "#64748b" };

function ps(party: string) { return PARTY_STYLES[party] ?? DEFAULT_PARTY; }

type ViewMode = "profile" | "table" | "compare";
type SortKey = "constituency" | "mp_name" | "party" | "attendance" | "questions_asked" | "debates_participated";

// ── Sub-components ─────────────────────────────────────────────────────────────
function PartyBadge({ party }: { party: string }) {
  const s = ps(party);
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${s.bg} ${s.text} ${s.border}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {party}
    </span>
  );
}

function MetricBar({ label, value, max, suffix = "", color, note }: {
  label: string; value: number; max: number; suffix?: string; color: string; note?: string;
}) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">{label}</span>
        <span className="text-sm font-bold tabular-nums text-foreground">{value}{suffix}</span>
      </div>
      <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
      {note && <p className="text-xs text-muted-foreground">{note}</p>}
    </div>
  );
}

function PlaceholderBlock({ label }: { label: string }) {
  return (
    <div className="rounded-none border border-dashed border-border bg-secondary/30 p-5 flex flex-col gap-3">
      <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">{label}</span>
      <div className="space-y-2">
        <div className="h-2.5 rounded bg-border w-3/4" />
        <div className="h-2.5 rounded bg-border/60 w-1/2" />
      </div>
      <p className="text-xs text-muted-foreground italic">Data forthcoming</p>
    </div>
  );
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border p-3 text-xs shadow-lg">
      <p className="font-semibold text-foreground mb-1">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ color: p.color || p.fill }}>{p.name}: <strong>{p.value}</strong></p>
      ))}
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
export function MPTracker() {
  const [data, setData] = useState<MP[]>([]);
  const [selected, setSelected] = useState<MP | null>(null);
  const [search, setSearch] = useState("");
  const [dropOpen, setDropOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("profile");
  const [sortKey, setSortKey] = useState<SortKey>("constituency");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [tableSearch, setTableSearch] = useState("");
  const [partyFilter, setPartyFilter] = useState("all");
  const [compareA, setCompareA] = useState("");
  const [compareB, setCompareB] = useState("");
  const [compareMetric, setCompareMetric] = useState<"attendance" | "questions_asked" | "debates_participated">("attendance");

  useEffect(() => {
    fetch("/data.json")
      .then((r) => r.json())
      .then((d: MP[]) => {
        const sorted = [...d].sort((a, b) => a.constituency.localeCompare(b.constituency));
        setData(sorted);
        setSelected(sorted[0]);
        setCompareA(sorted[0]?.constituency ?? "");
        setCompareB(sorted[1]?.constituency ?? "");
      })
      .catch(console.error);
  }, []);

  const parties = useMemo(() => Array.from(new Set(data.map((m) => m.party))).sort(), [data]);

  const dropFiltered = data.filter(
    (m) =>
      m.constituency.toLowerCase().includes(search.toLowerCase()) ||
      m.mp_name.toLowerCase().includes(search.toLowerCase())
  );

  const tableFiltered = useMemo(() => {
    let list = data.filter((m) => {
      const q = tableSearch.toLowerCase();
      const matchQ = m.constituency.toLowerCase().includes(q) || m.mp_name.toLowerCase().includes(q);
      const matchP = partyFilter === "all" || m.party === partyFilter;
      return matchQ && matchP;
    });
    list = [...list].sort((a, b) => {
      const av = a[sortKey as keyof MP] as any;
      const bv = b[sortKey as keyof MP] as any;
      if (typeof av === "string") return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
      return sortDir === "asc" ? av - bv : bv - av;
    });
    return list;
  }, [data, tableSearch, partyFilter, sortKey, sortDir]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("asc"); }
  };

  const mpA = data.find((m) => m.constituency === compareA);
  const mpB = data.find((m) => m.constituency === compareB);

  const partyBreakdown = useMemo(() => {
    const counts: Record<string, number> = {};
    data.forEach((m) => { counts[m.party] = (counts[m.party] || 0) + 1; });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).map(([party, count]) => ({ party, count }));
  }, [data]);

  const attendanceColor = (v: number) => v >= 85 ? "#22c55e" : v >= 70 ? "#f59e0b" : "#ef4444";

  const allMPsChartData = useMemo(() =>
    [...data]
      .sort((a, b) => b[compareMetric] - a[compareMetric])
      .map((m) => ({ name: m.constituency.split(" ")[0], value: m[compareMetric], party: m.party }))
  , [data, compareMetric]);

  if (!data.length) {
    return (
      <section className="py-20 text-center text-muted-foreground text-sm">
        Loading legislative data…
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-6">

        {/* ── Header ── */}
        <div className="mb-12 pt-8 border-b border-border pb-10">
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
            Tamil Nadu Governance Desk
          </p>
          <h1 className="font-serif text-4xl md:text-5xl tracking-tight mb-4">
            MP Watch
          </h1>
          <p className="text-muted-foreground max-w-xl leading-relaxed mb-4">
            Live legislative metrics for all 39 Tamil Nadu Lok Sabha MPs — 18th Lok Sabha, sourced from PRS India & Lok Sabha Secretariat.
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-border text-xs font-semibold tracking-widest uppercase text-muted-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            Independent Legislative Analytics
          </div>
        </div>

        {/* ── View Tabs ── */}
        <div className="flex items-center gap-1 mb-10 border-b border-border pb-4">
          {(["profile", "table", "compare"] as ViewMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-4 py-2 text-sm font-medium capitalize transition-colors ${
                viewMode === mode ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {mode === "profile" ? "MP Profile" : mode === "compare" ? "Compare MPs" : "All MPs"}
            </button>
          ))}
        </div>

        {/* ══════════════ PROFILE VIEW ══════════════ */}
        {viewMode === "profile" && (
          <div>
            {/* Constituency Selector */}
            <div className="relative mb-10 max-w-lg">
              <div
                className="flex items-center gap-3 px-4 py-3 bg-card border border-border cursor-pointer hover:border-accent transition-colors"
                onClick={() => setDropOpen((o) => !o)}
              >
                <MapPin className="w-4 h-4 text-muted-foreground shrink-0" />
                <span className="flex-1 text-sm font-medium truncate">
                  {selected ? `${selected.constituency} — ${selected.mp_name}` : "Select constituency…"}
                </span>
                <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${dropOpen ? "rotate-180" : ""}`} />
              </div>

              {dropOpen && (
                <div className="absolute z-20 top-full w-full bg-card border border-border shadow-xl overflow-hidden">
                  <div className="p-2 border-b border-border">
                    <input
                      autoFocus
                      className="w-full px-3 py-2 text-sm bg-secondary border border-border outline-none placeholder:text-muted-foreground focus:border-accent"
                      placeholder="Search constituency or MP name…"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                  <ul className="max-h-64 overflow-y-auto divide-y divide-border/40">
                    {dropFiltered.map((mp) => (
                      <li
                        key={mp.constituency}
                        onClick={() => { setSelected(mp); setDropOpen(false); setSearch(""); }}
                        className={`px-4 py-2.5 cursor-pointer hover:bg-secondary transition-colors flex items-center justify-between ${
                          selected?.constituency === mp.constituency ? "bg-secondary" : ""
                        }`}
                      >
                        <div>
                          <p className="text-sm font-medium">{mp.constituency}</p>
                          <p className="text-xs text-muted-foreground">{mp.mp_name}</p>
                        </div>
                        <span
                          className="text-xs px-2 py-0.5 font-medium border"
                          style={{ color: ps(mp.party).hex, borderColor: ps(mp.party).hex + "44", backgroundColor: ps(mp.party).hex + "11" }}
                        >
                          {mp.party.split(" ").map((w) => w[0]).join("").slice(0, 5)}
                        </span>
                      </li>
                    ))}
                    {!dropFiltered.length && (
                      <li className="px-4 py-6 text-center text-sm text-muted-foreground">No results</li>
                    )}
                  </ul>
                </div>
              )}
            </div>

            {/* MP Profile Card */}
            {selected && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">

                {/* Identity */}
                <div className="lg:col-span-1 bg-primary text-primary-foreground p-6 flex flex-col justify-between">
                  <div>
                    <div className="w-11 h-11 rounded-full bg-primary-foreground/10 flex items-center justify-center mb-5">
                      <User className="w-5 h-5 text-primary-foreground/70" />
                    </div>
                    <h2 className="text-2xl font-serif font-bold leading-tight mb-1">{selected.mp_name}</h2>
                    <p className="text-primary-foreground/60 text-sm mb-5">{selected.constituency} Constituency</p>
                    <PartyBadge party={selected.party} />
                  </div>
                  <div className="mt-8 pt-5 border-t border-primary-foreground/10">
                    <p className="text-xs uppercase tracking-widest text-primary-foreground/50 mb-1">Parliamentary Tenure</p>
                    <p className="text-sm font-semibold">{selected.term}</p>
                  </div>
                </div>

                {/* Metrics */}
                <div className="lg:col-span-2 border border-border bg-card p-6 space-y-7">
                  <div className="flex items-center gap-2 pb-3 border-b border-border">
                    <TrendingUp className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">Legislative Performance — 18th Lok Sabha</span>
                  </div>

                  <MetricBar
                    label="Attendance"
                    value={selected.attendance}
                    max={100}
                    suffix="%"
                    color={attendanceColor(selected.attendance)}
                    note={`State average: ${STATE_AVG.attendance}%`}
                  />
                  <MetricBar
                    label="Questions Asked"
                    value={selected.questions_asked}
                    max={250}
                    color="#6366f1"
                    note={`State average: ${STATE_AVG.questions_asked}`}
                  />
                  <MetricBar
                    label="Debates Participated"
                    value={selected.debates_participated}
                    max={200}
                    color="#0ea5e9"
                    note={`State average: ${STATE_AVG.debates_participated}`}
                  />
                  <MetricBar
                    label="Private Member Bills"
                    value={selected.private_member_bills}
                    max={10}
                    color="#f59e0b"
                  />
                </div>

                {/* Placeholder blocks */}
                <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <PlaceholderBlock label="MPLADS Fund Utilization (%)" />
                  <PlaceholderBlock label="Primary Spending Sector" />
                  <div className="border border-dashed border-border bg-secondary/30 p-5 flex flex-col gap-3 sm:col-span-1">
                    <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">Policy & Regional Development Narrative</span>
                    <div className="space-y-2">
                      {[100, 80, 90, 65].map((w, i) => (
                        <div key={i} className="h-2.5 rounded bg-border" style={{ width: `${w}%`, opacity: 1 - i * 0.1 }} />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground italic">Qualitative analysis forthcoming</p>
                  </div>
                </div>
              </div>
            )}

            {/* Party Overview Charts */}
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="border border-border bg-card p-6">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6">Party Representation — TN Lok Sabha</p>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={partyBreakdown} layout="vertical" margin={{ top: 0, right: 20, left: 10, bottom: 0 }}>
                    <XAxis type="number" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                    <YAxis
                      dataKey="party"
                      type="category"
                      tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
                      width={40}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(v) => v.split(" ").map((w: string) => w[0]).join("").slice(0, 5)}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--secondary)" }} />
                    <Bar dataKey="count" name="MPs" radius={0}>
                      {partyBreakdown.map(({ party }) => (
                        <Cell key={party} fill={ps(party).hex} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="border border-border bg-card p-6">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6">Attendance Distribution — All 39 MPs</p>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart
                    data={[...data].sort((a, b) => b.attendance - a.attendance).map((m) => ({
                      name: m.constituency.split(" ")[0],
                      attendance: m.attendance,
                      party: m.party,
                    }))}
                    margin={{ top: 5, right: 10, left: -20, bottom: 30 }}
                  >
                    <XAxis dataKey="name" tick={{ fontSize: 8, fill: "var(--muted-foreground)" }} angle={-45} textAnchor="end" interval={0} axisLine={false} tickLine={false} />
                    <YAxis domain={[50, 100]} tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--secondary)" }} />
                    <ReferenceLine y={STATE_AVG.attendance} stroke="#f59e0b" strokeDasharray="4 2"
                      label={{ value: `Avg ${STATE_AVG.attendance}%`, fill: "#f59e0b", fontSize: 9, position: "insideTopRight" }} />
                    <Bar dataKey="attendance" name="Attendance %" radius={0}>
                      {[...data].sort((a, b) => b.attendance - a.attendance).map((m) => (
                        <Cell key={m.constituency} fill={attendanceColor(m.attendance)} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════ TABLE VIEW ══════════════ */}
        {viewMode === "table" && (
          <div>
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  value={tableSearch}
                  onChange={(e) => setTableSearch(e.target.value)}
                  placeholder="Search MP or constituency…"
                  className="w-full bg-secondary border border-border pl-10 pr-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-accent"
                />
              </div>
              <select
                value={partyFilter}
                onChange={(e) => setPartyFilter(e.target.value)}
                className="bg-secondary border border-border px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-accent"
              >
                <option value="all">All Parties</option>
                {parties.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>

            <p className="text-xs text-muted-foreground mb-4">Showing {tableFiltered.length} of {data.length} MPs</p>

            <div className="overflow-x-auto border border-border">
              <table className="w-full text-sm">
                <thead className="border-b border-border bg-secondary">
                  <tr>
                    {[
                      { key: "constituency", label: "Constituency" },
                      { key: "mp_name", label: "MP" },
                      { key: "party", label: "Party" },
                      { key: "attendance", label: "Attendance %" },
                      { key: "questions_asked", label: "Questions" },
                      { key: "debates_participated", label: "Debates" },
                    ].map(({ key, label }) => (
                      <th
                        key={key}
                        onClick={() => toggleSort(key as SortKey)}
                        className="text-left py-3 px-4 text-xs uppercase tracking-wider text-muted-foreground cursor-pointer hover:text-foreground select-none"
                      >
                        <span className="flex items-center gap-1">
                          {label}
                          <ArrowUpDown className="w-3 h-3 opacity-40" />
                          {sortKey === key && <span className="text-accent">{sortDir === "asc" ? "↑" : "↓"}</span>}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {tableFiltered.map((mp) => (
                    <tr
                      key={mp.constituency}
                      onClick={() => { setSelected(mp); setViewMode("profile"); }}
                      className="cursor-pointer hover:bg-secondary/50 transition-colors"
                    >
                      <td className="py-3 px-4 font-medium">{mp.constituency}</td>
                      <td className="py-3 px-4">{mp.mp_name}</td>
                      <td className="py-3 px-4">
                        <span
                          className="inline-block px-2 py-0.5 text-xs font-medium border"
                          style={{ color: ps(mp.party).hex, borderColor: ps(mp.party).hex + "44", backgroundColor: ps(mp.party).hex + "11" }}
                        >
                          {mp.party.split(" ").map((w) => w[0]).join("").slice(0, 5)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-secondary rounded-full overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${mp.attendance}%`, backgroundColor: attendanceColor(mp.attendance) }} />
                          </div>
                          <span className="text-xs font-mono tabular-nums">{mp.attendance}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-mono text-sm tabular-nums">{mp.questions_asked}</td>
                      <td className="py-3 px-4 font-mono text-sm tabular-nums">{mp.debates_participated}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-3 text-right">Click a row to view full MP profile</p>
          </div>
        )}

        {/* ══════════════ COMPARE VIEW ══════════════ */}
        {viewMode === "compare" && (
          <div>
            {/* Metric tabs */}
            <div className="flex flex-wrap items-center gap-2 mb-8">
              <span className="text-sm text-muted-foreground">Compare by:</span>
              {([
                { k: "attendance" as const, l: "Attendance %" },
                { k: "questions_asked" as const, l: "Questions Asked" },
                { k: "debates_participated" as const, l: "Debates" },
              ]).map(({ k, l }) => (
                <button
                  key={k}
                  onClick={() => setCompareMetric(k)}
                  className={`px-3 py-1.5 text-sm transition-colors ${
                    compareMetric === k ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            {/* Two-MP head-to-head */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {([{ val: compareA, set: setCompareA, label: "MP One" }, { val: compareB, set: setCompareB, label: "MP Two" }]).map(({ val, set, label }) => (
                <div key={label}>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">{label}</label>
                  <select
                    value={val}
                    onChange={(e) => set(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm bg-secondary border border-border text-foreground outline-none focus:border-accent cursor-pointer"
                  >
                    {data.map((m) => (
                      <option key={m.constituency} value={m.constituency}>{m.constituency} — {m.mp_name}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            {/* Head-to-head cards */}
            {mpA && mpB && (
              <div className="grid sm:grid-cols-2 gap-6 mb-10">
                {[mpA, mpB].map((mp) => (
                  <div key={mp.constituency} className="border border-border bg-card p-6">
                    <PartyBadge party={mp.party} />
                    <h3 className="font-serif text-xl mt-3 mb-0.5">{mp.mp_name}</h3>
                    <p className="text-xs text-muted-foreground mb-6">{mp.constituency} · {mp.term}</p>
                    <div className="space-y-5">
                      <MetricBar label="Attendance" value={mp.attendance} max={100} suffix="%" color={attendanceColor(mp.attendance)} />
                      <MetricBar label="Questions" value={mp.questions_asked} max={250} color="#6366f1" />
                      <MetricBar label="Debates" value={mp.debates_participated} max={200} color="#0ea5e9" />
                      <MetricBar label="Private Bills" value={mp.private_member_bills} max={10} color="#f59e0b" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Head-to-head bar chart */}
            {mpA && mpB && (
              <div className="border border-border bg-card p-6 mb-10">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-6">Side-by-Side Chart</p>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart
                    data={[
                      { metric: "Attendance %", [mpA.mp_name.split(" ")[0]]: mpA.attendance, [mpB.mp_name.split(" ")[0]]: mpB.attendance },
                      { metric: "Questions", [mpA.mp_name.split(" ")[0]]: mpA.questions_asked, [mpB.mp_name.split(" ")[0]]: mpB.questions_asked },
                      { metric: "Debates", [mpA.mp_name.split(" ")[0]]: mpA.debates_participated, [mpB.mp_name.split(" ")[0]]: mpB.debates_participated },
                    ]}
                    margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                    barCategoryGap="30%"
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="metric" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--secondary)" }} />
                    <Legend wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
                    <Bar dataKey={mpA.mp_name.split(" ")[0]} fill={ps(mpA.party).hex} radius={[2, 2, 0, 0]} maxBarSize={56} />
                    <Bar dataKey={mpB.mp_name.split(" ")[0]} fill={ps(mpB.party).hex} radius={[2, 2, 0, 0]} maxBarSize={56} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* All-MPs ranking chart */}
            <div className="border border-border bg-card p-6">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6">
                All 39 MPs — Ranked by {compareMetric === "attendance" ? "Attendance %" : compareMetric === "questions_asked" ? "Questions Asked" : "Debates"}
              </p>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart
                  data={allMPsChartData}
                  margin={{ top: 5, right: 10, left: -20, bottom: 50 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="name" tick={{ fontSize: 8, fill: "var(--muted-foreground)" }} angle={-45} textAnchor="end" interval={0} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--secondary)" }} />
                  {compareMetric === "attendance" && (
                    <ReferenceLine y={STATE_AVG.attendance} stroke="#f59e0b" strokeDasharray="4 2"
                      label={{ value: `State avg`, fill: "#f59e0b", fontSize: 9, position: "insideTopRight" }} />
                  )}
                  {compareMetric === "questions_asked" && (
                    <ReferenceLine y={STATE_AVG.questions_asked} stroke="#f59e0b" strokeDasharray="4 2"
                      label={{ value: `State avg`, fill: "#f59e0b", fontSize: 9, position: "insideTopRight" }} />
                  )}
                  <Bar dataKey="value" name={compareMetric.replace("_", " ")} radius={0}>
                    {allMPsChartData.map((d) => (
                      <Cell key={d.name} fill={ps(d.party).hex} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* ── Footer note ── */}
        <div className="mt-16 pt-8 border-t border-border">
          <div className="flex items-start gap-3">
            <Info className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              <span className="text-foreground font-medium">Methodology.</span>{" "}
              Performance data sourced from PRS India and Lok Sabha Secretariat records — 18th Lok Sabha (June 2024–present).
              Attendance reflects sessions attended as a percentage of total sessions. Questions include starred and unstarred questions raised on the floor.
              MPLADS utilisation and policy narratives will be added quarterly.
              Maintained by Manimala Chithamanan, Tamil Nadu Governance Desk. Last updated: June 2026.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
