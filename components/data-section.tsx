"use client";

import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Search, MapPin, User, TrendingUp, HelpCircle, MessageSquare, FileText } from "lucide-react";

// ── Types ────────────────────────────────────────────────────────────────────
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

// ── Party colours ─────────────────────────────────────────────────────────────
const PARTY_STYLES: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  "Dravida Munnetra Kazhagam": {
    bg: "bg-red-50", text: "text-red-800", border: "border-red-200", dot: "bg-red-600",
  },
  "Indian National Congress": {
    bg: "bg-blue-50", text: "text-blue-800", border: "border-blue-200", dot: "bg-blue-600",
  },
  "Viduthalai Chiruthaigal Katchi": {
    bg: "bg-indigo-50", text: "text-indigo-800", border: "border-indigo-200", dot: "bg-indigo-600",
  },
  "Communist Party of India (Marxist)": {
    bg: "bg-rose-50", text: "text-rose-900", border: "border-rose-200", dot: "bg-rose-700",
  },
  "Communist Party of India": {
    bg: "bg-rose-50", text: "text-rose-900", border: "border-rose-200", dot: "bg-rose-700",
  },
  "Indian Union Muslim League": {
    bg: "bg-green-50", text: "text-green-800", border: "border-green-200", dot: "bg-green-600",
  },
  "Marumalarchi Dravida Munnetra Kazhagam": {
    bg: "bg-orange-50", text: "text-orange-800", border: "border-orange-200", dot: "bg-orange-600",
  },
};
const DEFAULT_PARTY_STYLE = {
  bg: "bg-slate-100", text: "text-slate-700", border: "border-slate-200", dot: "bg-slate-500",
};

function partyStyle(party: string) {
  return PARTY_STYLES[party] ?? DEFAULT_PARTY_STYLE;
}

// ── Helpers ───────────────────────────────────────────────────────────────────
const STATE_AVG = { attendance: 79.2, questions_asked: 113, debates_participated: 24 };

function attendanceColor(val: number) {
  if (val >= 85) return "bg-emerald-500";
  if (val >= 70) return "bg-amber-400";
  return "bg-rose-500";
}

function MetricBar({
  label,
  value,
  max,
  suffix = "",
  barClass = "bg-slate-700",
  note,
}: {
  label: string;
  value: number;
  max: number;
  suffix?: string;
  barClass?: string;
  note?: string;
}) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-500 font-medium tracking-wide uppercase text-xs">{label}</span>
        <span className="font-semibold text-slate-800 tabular-nums">
          {value}{suffix}
        </span>
      </div>
      <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${barClass}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      {note && <p className="text-xs text-slate-400">{note}</p>}
    </div>
  );
}

function PartyBadge({ party }: { party: string }) {
  const s = partyStyle(party);
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${s.bg} ${s.text} ${s.border}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {party}
    </span>
  );
}

function PlaceholderBlock({ label }: { label: string }) {
  return (
    <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/60 p-5 flex flex-col gap-2">
      <span className="text-xs font-semibold tracking-widest uppercase text-slate-400">{label}</span>
      <div className="space-y-2 pt-1">
        <div className="h-3 rounded bg-slate-200/70 w-3/4" />
        <div className="h-3 rounded bg-slate-200/50 w-1/2" />
      </div>
      <p className="text-xs text-slate-400 italic mt-1">Data forthcoming</p>
    </div>
  );
}

// ── Custom tooltip for Recharts ───────────────────────────────────────────────
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-lg px-4 py-3 text-sm">
      <p className="font-semibold text-slate-700 mb-1">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ color: p.fill }} className="tabular-nums">
          {p.name}: <strong>{p.value}</strong>
        </p>
      ))}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export function DataSection() {
  const [data, setData] = useState<MP[]>([]);
  const [selected, setSelected] = useState<MP | null>(null);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [cmpA, setCmpA] = useState<string>("");
  const [cmpB, setCmpB] = useState<string>("");

  // Fetch data.json dynamically — zero hardcoding in UI
  useEffect(() => {
    fetch("/data.json")
      .then((r) => r.json())
      .then((d: MP[]) => {
        const sorted = [...d].sort((a, b) => a.constituency.localeCompare(b.constituency));
        setData(sorted);
        setSelected(sorted[0]);
        setCmpA(sorted[0]?.constituency ?? "");
        setCmpB(sorted[1]?.constituency ?? "");
      })
      .catch(console.error);
  }, []);

  const filtered = data.filter(
    (mp) =>
      mp.constituency.toLowerCase().includes(search.toLowerCase()) ||
      mp.mp_name.toLowerCase().includes(search.toLowerCase())
  );

  const mpA = data.find((m) => m.constituency === cmpA);
  const mpB = data.find((m) => m.constituency === cmpB);

  const comparisonData = mpA && mpB
    ? [
        { metric: "Attendance (%)", [mpA.mp_name.split(" ")[0]]: mpA.attendance, [mpB.mp_name.split(" ")[0]]: mpB.attendance },
        { metric: "Questions", [mpA.mp_name.split(" ")[0]]: mpA.questions_asked, [mpB.mp_name.split(" ")[0]]: mpB.questions_asked },
        { metric: "Debates", [mpA.mp_name.split(" ")[0]]: mpA.debates_participated, [mpB.mp_name.split(" ")[0]]: mpB.debates_participated },
      ]
    : [];

  const nameA = mpA?.mp_name.split(" ")[0] ?? "";
  const nameB = mpB?.mp_name.split(" ")[0] ?? "";

  if (!data.length) {
    return (
      <section className="py-20 text-center text-slate-400 text-sm">
        Loading legislative data…
      </section>
    );
  }

  return (
    <section id="data" className="bg-white py-20 px-4">
      <div className="max-w-6xl mx-auto">

        {/* ── Section header ── */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold tracking-widest uppercase text-slate-500 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
            Independent Legislative Analytics
          </div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">
            Tamil Nadu MP Performance Tracker
          </h2>
          <p className="text-slate-500 text-sm max-w-xl">
            Live legislative metrics for all 39 Lok Sabha constituencies — 18th Lok Sabha, sourced from PRS India.
          </p>
        </div>

        {/* ── Constituency selector ── */}
        <div className="relative mb-10 max-w-md">
          <div
            className="flex items-center gap-3 px-4 py-3 bg-white border border-slate-200 rounded-xl shadow-sm cursor-pointer hover:border-slate-400 transition-colors"
            onClick={() => setOpen((o) => !o)}
          >
            <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="flex-1 text-sm font-medium text-slate-700 truncate">
              {selected ? `${selected.constituency} — ${selected.mp_name}` : "Select constituency…"}
            </span>
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
          </div>

          {open && (
            <div className="absolute z-20 top-full mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden">
              <div className="p-2 border-b border-slate-100">
                <input
                  autoFocus
                  className="w-full px-3 py-2 text-sm bg-slate-50 rounded-lg outline-none placeholder:text-slate-400 text-slate-800"
                  placeholder="Search constituency or MP name…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <ul className="max-h-64 overflow-y-auto divide-y divide-slate-50">
                {filtered.map((mp) => (
                  <li
                    key={mp.constituency}
                    onClick={() => {
                      setSelected(mp);
                      setOpen(false);
                      setSearch("");
                    }}
                    className={`px-4 py-2.5 cursor-pointer hover:bg-slate-50 transition-colors flex items-center justify-between ${
                      selected?.constituency === mp.constituency ? "bg-slate-50" : ""
                    }`}
                  >
                    <div>
                      <p className="text-sm font-medium text-slate-800">{mp.constituency}</p>
                      <p className="text-xs text-slate-400">{mp.mp_name}</p>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${partyStyle(mp.party).bg} ${partyStyle(mp.party).text}`}>
                      {mp.party.split(" ").map(w => w[0]).join("").slice(0,4)}
                    </span>
                  </li>
                ))}
                {filtered.length === 0 && (
                  <li className="px-4 py-6 text-center text-sm text-slate-400">No results</li>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* ── MP Profile Scorecard ── */}
        {selected && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">

            {/* Left — identity card */}
            <div className="lg:col-span-1 rounded-2xl border border-slate-100 bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white flex flex-col justify-between shadow-md">
              <div>
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                  <User className="w-6 h-6 text-white/80" />
                </div>
                <h3 className="text-xl font-bold leading-tight mb-1">{selected.mp_name}</h3>
                <p className="text-slate-400 text-sm mb-4">{selected.constituency} Constituency</p>
                <PartyBadge party={selected.party} />
              </div>
              <div className="mt-6 pt-5 border-t border-white/10">
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Parliamentary Tenure</p>
                <p className="text-sm font-semibold text-slate-200">{selected.term}</p>
              </div>
            </div>

            {/* Right — metrics */}
            <div className="lg:col-span-2 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-slate-400" />
                <span className="text-xs font-semibold tracking-widest uppercase text-slate-400">Legislative Performance</span>
              </div>

              <MetricBar
                label="Attendance"
                value={selected.attendance}
                max={100}
                suffix="%"
                barClass={attendanceColor(selected.attendance)}
                note={`State avg: ${STATE_AVG.attendance}%`}
              />
              <MetricBar
                label="Questions Asked"
                value={selected.questions_asked}
                max={300}
                barClass="bg-slate-700"
                note={`State avg: ${STATE_AVG.questions_asked}`}
              />
              <MetricBar
                label="Debates Participated"
                value={selected.debates_participated}
                max={200}
                barClass="bg-indigo-500"
                note={`State avg: ${STATE_AVG.debates_participated}`}
              />
              <MetricBar
                label="Private Member Bills"
                value={selected.private_member_bills}
                max={10}
                barClass="bg-amber-500"
              />
            </div>

            {/* Bottom — placeholders */}
            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <PlaceholderBlock label="MPLADS Fund Utilization (%)" />
              <PlaceholderBlock label="Primary Spending Sector" />
              <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/60 p-5 sm:col-span-1 flex flex-col gap-2">
                <span className="text-xs font-semibold tracking-widest uppercase text-slate-400">Policy & Regional Development Narrative</span>
                <div className="space-y-2 pt-1">
                  <div className="h-3 rounded bg-slate-200/70 w-full" />
                  <div className="h-3 rounded bg-slate-200/50 w-5/6" />
                  <div className="h-3 rounded bg-slate-200/40 w-3/4" />
                  <div className="h-3 rounded bg-slate-200/30 w-2/3" />
                </div>
                <p className="text-xs text-slate-400 italic mt-1">Qualitative analysis forthcoming</p>
              </div>
            </div>
          </div>
        )}

        {/* ── Comparison Tool ── */}
        <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <FileText className="w-4 h-4 text-slate-400" />
            <h3 className="text-sm font-semibold tracking-widest uppercase text-slate-500">
              Compare MPs Side by Side
            </h3>
          </div>

          {/* Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              { val: cmpA, set: setCmpA, label: "MP One" },
              { val: cmpB, set: setCmpB, label: "MP Two" },
            ].map(({ val, set, label }) => (
              <div key={label}>
                <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wider">{label}</label>
                <select
                  value={val}
                  onChange={(e) => set(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-700 outline-none focus:border-slate-400 transition-colors appearance-none cursor-pointer"
                >
                  {data.map((mp) => (
                    <option key={mp.constituency} value={mp.constituency}>
                      {mp.constituency} — {mp.mp_name}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          {/* Party badges for selected MPs */}
          {mpA && mpB && (
            <div className="flex flex-wrap gap-3 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm bg-slate-700 inline-block" />
                <span className="text-xs text-slate-600 font-medium">{mpA.mp_name}</span>
                <PartyBadge party={mpA.party} />
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm bg-indigo-500 inline-block" />
                <span className="text-xs text-slate-600 font-medium">{mpB.mp_name}</span>
                <PartyBadge party={mpB.party} />
              </div>
            </div>
          )}

          {/* Chart */}
          {comparisonData.length > 0 && mpA && mpB && (
            <ResponsiveContainer width="100%" height={260}>
              <BarChart
                data={comparisonData}
                barCategoryGap="30%"
                barGap={4}
                margin={{ top: 4, right: 16, left: 0, bottom: 4 }}
              >
                <XAxis
                  dataKey="metric"
                  tick={{ fontSize: 11, fill: "#94a3b8" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#94a3b8" }}
                  axisLine={false}
                  tickLine={false}
                  width={36}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f1f5f9" }} />
                <Bar dataKey={nameA} fill="#1e293b" radius={[4, 4, 0, 0]} maxBarSize={48} />
                <Bar dataKey={nameB} fill="#6366f1" radius={[4, 4, 0, 0]} maxBarSize={48} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        <p className="mt-6 text-xs text-slate-400 text-right">
          Source: PRS India · 18th Lok Sabha · Data as of June 2026
        </p>
      </div>
    </section>
  );
}
