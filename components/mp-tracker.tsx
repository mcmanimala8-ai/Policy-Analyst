"use client";

import { useState, useEffect, useRef } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Search, MapPin, User, TrendingUp, FileText } from "lucide-react";

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

const TN_PATHS: { name: string; d: string }[] = [
  { name: "Tiruvallur",      d: "M305.7,40.3 L330.4,40.3 L347.0,56.5 L338.7,72.6 L313.9,72.6 L297.4,56.5 Z" },
  { name: "Chennai North",   d: "M347.0,44.4 L361.8,44.4 L361.8,60.5 L347.0,60.5 Z" },
  { name: "Chennai Central", d: "M347.0,60.5 L361.8,60.5 L361.8,72.6 L347.0,72.6 Z" },
  { name: "Chennai South",   d: "M334.6,64.5 L361.8,64.5 L361.8,84.7 L334.6,84.7 Z" },
  { name: "Sriperumbudur",   d: "M305.7,64.5 L334.6,64.5 L334.6,92.7 L309.8,96.8 L293.3,84.7 Z" },
  { name: "Kancheepuram",    d: "M289.1,84.7 L330.4,84.7 L330.4,108.9 L301.5,112.9 L280.9,100.8 Z" },
  { name: "Arakkonam",       d: "M235.4,32.3 L293.3,32.3 L293.3,56.5 L264.3,64.5 L235.4,56.5 Z" },
  { name: "Vellore",         d: "M239.6,60.5 L289.1,60.5 L289.1,84.7 L256.1,92.7 L239.6,80.6 Z" },
  { name: "Arani",           d: "M272.6,28.2 L309.8,28.2 L309.8,56.5 L293.3,56.5 L272.6,44.4 Z" },
  { name: "Tiruvannamalai",  d: "M218.9,84.7 L272.6,84.7 L272.6,129.0 L243.7,137.1 L218.9,121.0 Z" },
  { name: "Krishnagiri",     d: "M144.6,84.7 L214.8,84.7 L214.8,112.9 L185.9,129.0 L144.6,116.9 Z" },
  { name: "Dharmapuri",      d: "M128.0,104.8 L181.7,104.8 L181.7,145.2 L152.8,157.3 L128.0,145.2 Z" },
  { name: "Salem",           d: "M152.8,153.2 L210.7,153.2 L210.7,185.5 L177.6,193.5 L152.8,181.5 Z" },
  { name: "Namakkal",        d: "M136.3,181.5 L190.0,181.5 L190.0,217.7 L161.1,225.8 L136.3,213.7 Z" },
  { name: "Nilgiris",        d: "M37.2,173.4 L107.4,173.4 L107.4,201.6 L62.0,209.7 L37.2,193.5 Z" },
  { name: "Erode",           d: "M107.4,185.5 L161.1,185.5 L161.1,225.8 L128.0,233.9 L107.4,221.8 Z" },
  { name: "Tiruppur",        d: "M78.5,213.7 L128.0,213.7 L128.0,250.0 L103.3,258.1 L78.5,246.0 Z" },
  { name: "Coimbatore",      d: "M62.0,205.6 L107.4,205.6 L107.4,237.9 L82.6,246.0 L62.0,229.8 Z" },
  { name: "Pollachi",        d: "M70.2,229.8 L107.4,229.8 L107.4,274.2 L82.6,282.3 L66.1,266.1 Z" },
  { name: "Karur",           d: "M144.6,221.8 L194.1,221.8 L194.1,250.0 L165.2,258.1 L144.6,246.0 Z" },
  { name: "Tiruchirappalli", d: "M190.0,229.8 L235.4,229.8 L235.4,258.1 L206.5,266.1 L190.0,254.0 Z" },
  { name: "Perambalur",      d: "M227.2,205.6 L276.7,205.6 L276.7,237.9 L247.8,246.0 L227.2,229.8 Z" },
  { name: "Cuddalore",       d: "M276.7,157.3 L326.3,157.3 L326.3,189.5 L293.3,197.6 L276.7,181.5 Z" },
  { name: "Villuppuram",     d: "M260.2,141.1 L305.7,141.1 L305.7,173.4 L276.7,181.5 L260.2,165.3 Z" },
  { name: "Kallakurichi",    d: "M227.2,157.3 L276.7,157.3 L276.7,185.5 L247.8,193.5 L227.2,181.5 Z" },
  { name: "Chidambaram",     d: "M285.0,181.5 L326.3,181.5 L326.3,213.7 L297.4,221.8 L280.9,205.6 Z" },
  { name: "Nagapattinam",    d: "M301.5,237.9 L334.6,237.9 L334.6,270.2 L305.7,270.2 L297.4,254.0 Z" },
  { name: "Mayiladuthurai",  d: "M285.0,217.7 L322.2,217.7 L322.2,241.9 L297.4,250.0 L280.9,233.9 Z" },
  { name: "Thanjavur",       d: "M235.4,237.9 L285.0,237.9 L285.0,274.2 L256.1,282.3 L235.4,266.1 Z" },
  { name: "Sivaganga",       d: "M185.9,294.4 L252.0,294.4 L252.0,326.6 L218.9,334.7 L185.9,318.5 Z" },
  { name: "Madurai",         d: "M152.8,294.4 L202.4,294.4 L202.4,326.6 L173.5,334.7 L152.8,318.5 Z" },
  { name: "Dindigul",        d: "M128.0,262.1 L185.9,262.1 L185.9,302.4 L157.0,310.5 L128.0,298.4 Z" },
  { name: "Theni",           d: "M95.0,286.3 L144.6,286.3 L144.6,326.6 L115.7,334.7 L95.0,318.5 Z" },
  { name: "Virudhunagar",    d: "M128.0,326.6 L185.9,326.6 L185.9,371.0 L157.0,379.0 L128.0,358.9 Z" },
  { name: "Ramanathapuram",  d: "M194.1,342.7 L260.2,342.7 L260.2,383.1 L218.9,391.1 L194.1,375.0 Z" },
  { name: "Thoothukkudi",    d: "M169.3,383.1 L218.9,383.1 L218.9,423.4 L185.9,431.5 L165.2,407.3 Z" },
  { name: "Tirunelveli",     d: "M119.8,383.1 L169.3,383.1 L169.3,415.3 L136.3,423.4 L119.8,407.3 Z" },
  { name: "Tenkasi",         d: "M90.9,358.9 L128.0,358.9 L128.0,399.2 L103.3,407.3 L86.7,387.1 Z" },
  { name: "Kanniyakumari",   d: "M95.0,403.2 L128.0,403.2 L128.0,459.7 L107.4,467.7 L90.9,451.6 Z" },
];

const PARTY_CONFIG: Record<string, { bg: string; text: string; border: string; dot: string; mapColor: string }> = {
  "Dravida Munnetra Kazhagam":              { bg: "bg-red-500/15",    text: "text-red-400",    border: "border-red-500/30",    dot: "bg-red-500",    mapColor: "#ef4444" },
  "Indian National Congress":               { bg: "bg-blue-500/15",   text: "text-blue-400",   border: "border-blue-500/30",   dot: "bg-blue-500",   mapColor: "#3b82f6" },
  "Viduthalai Chiruthaigal Katchi":         { bg: "bg-violet-500/15", text: "text-violet-400", border: "border-violet-500/30", dot: "bg-violet-500", mapColor: "#8b5cf6" },
  "Communist Party of India (Marxist)":     { bg: "bg-rose-500/15",   text: "text-rose-400",   border: "border-rose-500/30",   dot: "bg-rose-500",   mapColor: "#f43f5e" },
  "Communist Party of India":               { bg: "bg-rose-500/15",   text: "text-rose-400",   border: "border-rose-500/30",   dot: "bg-rose-500",   mapColor: "#fb7185" },
  "Indian Union Muslim League":             { bg: "bg-emerald-500/15",text: "text-emerald-400",border: "border-emerald-500/30",dot: "bg-emerald-500",mapColor: "#10b981" },
  "Marumalarchi Dravida Munnetra Kazhagam": { bg: "bg-orange-500/15", text: "text-orange-400", border: "border-orange-500/30", dot: "bg-orange-500", mapColor: "#f97316" },
};
const DP = { bg: "bg-slate-500/15", text: "text-slate-300", border: "border-slate-500/30", dot: "bg-slate-400", mapColor: "#94a3b8" };
const pc = (p: string) => PARTY_CONFIG[p] ?? DP;
const norm = (s: string) => s.toLowerCase().replace(/[^a-z]/g, "");
const STATE_AVG = { attendance: 79.2, questions_asked: 113, debates_participated: 24 };

function MetricBar({ label, value, max, suffix = "", barClass = "bg-slate-400", note }: { label: string; value: number; max: number; suffix?: string; barClass?: string; note?: string }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold tracking-widest uppercase text-slate-400">{label}</span>
        <span className="text-base font-bold text-white tabular-nums">{value}{suffix}</span>
      </div>
      <div className="h-2 w-full rounded-full bg-slate-700 overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-700 ${barClass}`} style={{ width: `${Math.min((value / max) * 100, 100)}%` }} />
      </div>
      {note && <p className="text-xs text-slate-300">{note}</p>}
    </div>
  );
}

function PartyBadge({ party }: { party: string }) {
  const s = pc(party);
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${s.bg} ${s.text} ${s.border}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {party}
    </span>
  );
}

function WIPBlock({ label, value }: { label: string; value: string | number | null }) {
  return (
    <div className="rounded-xl border border-slate-700/60 bg-slate-800/40 p-5 flex flex-col gap-2">
      <span className="text-xs font-semibold tracking-widest uppercase text-slate-400">{label}</span>
      {value
        ? <p className="text-sm leading-relaxed text-slate-300">{value}</p>
        : <span className="text-xs text-slate-500 bg-slate-700/40 border border-slate-600/30 rounded-lg px-3 py-2 mt-1">📊 Analytics & Curation in Progress — Quantitative engine live; qualitative regional briefs scaling weekly.</span>
      }
    </div>
  );
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-slate-800 border border-slate-600 rounded-lg shadow-xl px-4 py-3 text-sm">
      <p className="font-semibold text-white mb-1">{label}</p>
      {payload.map((p: any, i: number) => <p key={i} style={{ color: p.fill }} className="tabular-nums">{p.name}: <strong>{p.value}</strong></p>)}
    </div>
  );
}

function TNMap({ data, selected, onSelect }: { data: MP[]; selected: MP | null; onSelect: (mp: MP) => void }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; text: string } | null>(null);
  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-800/40 overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-700/50">
        <p className="text-xs font-semibold tracking-widest uppercase text-slate-400">Tamil Nadu — 39 Lok Sabha Constituencies</p>
        <p className="text-xs text-slate-500 mt-0.5">Click any region to load MP profile</p>
      </div>
      <div className="relative p-2">
        <svg ref={svgRef} viewBox="0 0 400 500" className="w-full" style={{ maxHeight: 480 }}>
          {TN_PATHS.map(({ name, d }) => {
            const mp = data.find(m => norm(m.constituency) === norm(name));
            const isSelected = mp && selected?.constituency === mp.constituency;
            return (
              <path
                key={name} d={d}
                fill={mp ? pc(mp.party).mapColor : "#334155"}
                fillOpacity={isSelected ? 1 : 0.55}
                stroke={isSelected ? "#fff" : "#0f172a"}
                strokeWidth={isSelected ? 1.5 : 0.6}
                className="cursor-pointer transition-all duration-150"
                onMouseEnter={e => {
                  const r = svgRef.current?.getBoundingClientRect();
                  if (r) setTooltip({ x: e.clientX - r.left + 8, y: e.clientY - r.top - 32, text: mp ? `${mp.constituency} — ${mp.mp_name}` : name });
                }}
                onMouseLeave={() => setTooltip(null)}
                onClick={() => mp && onSelect(mp)}
              />
            );
          })}
        </svg>
        {tooltip && (
          <div className="pointer-events-none absolute z-10 bg-slate-900 border border-slate-600 text-white text-xs rounded-lg px-3 py-2 shadow-xl whitespace-nowrap" style={{ left: tooltip.x, top: tooltip.y }}>
            {tooltip.text}
          </div>
        )}
      </div>
      <div className="px-4 py-3 border-t border-slate-700/50 flex flex-wrap gap-x-4 gap-y-1.5">
        {Object.entries(PARTY_CONFIG).map(([party, cfg]) => (
          <div key={party} className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ backgroundColor: cfg.mapColor }} />
            <span className="text-xs text-slate-400">{party.split(" ").map(w => w[0]).join("").slice(0, 5)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MPTracker() {
  const [data, setData] = useState<MP[]>([]);
  const [selected, setSelected] = useState<MP | null>(null);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [cmpA, setCmpA] = useState("");
  const [cmpB, setCmpB] = useState("");

  useEffect(() => {
    fetch("/data.json").then(r => r.json()).then((d: MP[]) => {
      const s = [...d].sort((a, b) => a.constituency.localeCompare(b.constituency));
      setData(s); setSelected(s[0]); setCmpA(s[0]?.constituency ?? ""); setCmpB(s[1]?.constituency ?? "");
    }).catch(console.error);
  }, []);

  const filtered = data.filter(m => m.constituency.toLowerCase().includes(search.toLowerCase()) || m.mp_name.toLowerCase().includes(search.toLowerCase()));
  const mpA = data.find(m => m.constituency === cmpA);
  const mpB = data.find(m => m.constituency === cmpB);
  const nameA = mpA?.mp_name.split(" ")[0] ?? "";
  const nameB = mpB?.mp_name.split(" ")[0] ?? "";
  const comparisonData = mpA && mpB ? [
    { metric: "Attendance", [nameA]: mpA.attendance, [nameB]: mpB.attendance },
    { metric: "Questions",  [nameA]: mpA.questions_asked, [nameB]: mpB.questions_asked },
    { metric: "Debates",    [nameA]: mpA.debates_participated, [nameB]: mpB.debates_participated },
  ] : [];

  if (!data.length) return (
    <section className="bg-slate-900 min-h-screen flex items-center justify-center">
      <div className="text-center"><div className="w-8 h-8 border-2 border-slate-600 border-t-slate-300 rounded-full animate-spin mx-auto mb-3" /><p className="text-sm text-slate-400">Loading…</p></div>
    </section>
  );

  return (
    <section className="bg-slate-900 min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto space-y-10">

        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-semibold tracking-widest uppercase text-slate-400 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />Independent Legislative Analytics
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Tamil Nadu MP Performance Tracker</h1>
          <p className="text-slate-400 text-sm max-w-xl">Live legislative metrics for all 39 Lok Sabha constituencies — 18th Lok Sabha, sourced from PRS India.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <TNMap data={data} selected={selected} onSelect={mp => { setSelected(mp); setSearch(""); }} />
          </div>
          <div className="lg:col-span-2 space-y-4">
            <div className="relative">
              <div className="flex items-center gap-3 px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl cursor-pointer hover:border-slate-500 transition-colors" onClick={() => setOpen(o => !o)}>
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="flex-1 text-sm font-medium text-slate-200 truncate">{selected ? `${selected.constituency} — ${selected.mp_name}` : "Select constituency…"}</span>
                <Search className="w-4 h-4 text-slate-400 shrink-0" />
              </div>
              {open && (
                <div className="absolute z-20 top-full mt-1 w-full bg-slate-800 border border-slate-700 rounded-xl shadow-2xl overflow-hidden">
                  <div className="p-2 border-b border-slate-700">
                    <input autoFocus className="w-full px-3 py-2 text-sm bg-slate-700 rounded-lg outline-none placeholder:text-slate-500 text-slate-100" placeholder="Search…" value={search} onChange={e => setSearch(e.target.value)} />
                  </div>
                  <ul className="max-h-64 overflow-y-auto divide-y divide-slate-700/50">
                    {filtered.map(mp => (
                      <li key={mp.constituency} onClick={() => { setSelected(mp); setOpen(false); setSearch(""); }} className={`px-4 py-2.5 cursor-pointer hover:bg-slate-700 transition-colors flex items-center justify-between ${selected?.constituency === mp.constituency ? "bg-slate-700/50" : ""}`}>
                        <div><p className="text-sm font-medium text-slate-200">{mp.constituency}</p><p className="text-xs text-slate-400">{mp.mp_name}</p></div>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-semibold border ${pc(mp.party).bg} ${pc(mp.party).text} ${pc(mp.party).border}`}>{mp.party.split(" ").map(w => w[0]).join("").slice(0, 4)}</span>
                      </li>
                    ))}
                    {!filtered.length && <li className="px-4 py-6 text-center text-sm text-slate-400">No results</li>}
                  </ul>
                </div>
              )}
            </div>
            <div className="rounded-2xl border border-slate-700 bg-slate-800/40 p-4">
              <p className="text-xs font-semibold tracking-widest uppercase text-slate-400 mb-3">Seat Distribution</p>
              {Object.entries(data.reduce((a, m) => { a[m.party] = (a[m.party] || 0) + 1; return a; }, {} as Record<string, number>)).sort((a, b) => b[1] - a[1]).map(([party, count]) => (
                <div key={party} className="flex items-center gap-2 mb-2 last:mb-0">
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: pc(party).mapColor }} />
                  <span className="text-xs text-slate-300 flex-1 truncate">{party}</span>
                  <span className="text-xs font-bold text-white tabular-nums">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {selected && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-slate-700 bg-gradient-to-br from-slate-800 to-slate-900 p-6 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-slate-700 flex items-center justify-center mb-4"><User className="w-6 h-6 text-slate-300" /></div>
                  <h2 className="text-xl font-bold text-white leading-tight mb-1">{selected.mp_name}</h2>
                  <p className="text-slate-400 text-sm mb-4">{selected.constituency} Constituency</p>
                  <PartyBadge party={selected.party} />
                </div>
                <div className="mt-6 pt-5 border-t border-slate-700">
                  <p className="text-xs font-semibold tracking-widest uppercase text-slate-400 mb-1">Parliamentary Tenure</p>
                  <p className="text-sm font-bold text-slate-200">{selected.term}</p>
                </div>
              </div>
              <div className="lg:col-span-2 rounded-2xl border border-slate-700 bg-slate-800/60 p-6 space-y-6">
                <div className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-slate-400" /><span className="text-xs font-semibold tracking-widest uppercase text-slate-400">Legislative Performance</span></div>
                <MetricBar label="Attendance" value={selected.attendance} max={100} suffix="%" barClass={selected.attendance >= 85 ? "bg-emerald-500" : selected.attendance >= 70 ? "bg-amber-400" : "bg-rose-500"} note={`State avg: ${STATE_AVG.attendance}%`} />
                <MetricBar label="Questions Asked" value={selected.questions_asked} max={300} barClass="bg-slate-400" note={`State avg: ${STATE_AVG.questions_asked}`} />
                <MetricBar label="Debates Participated" value={selected.debates_participated} max={200} barClass="bg-indigo-400" note={`State avg: ${STATE_AVG.debates_participated}`} />
                <MetricBar label="Private Member Bills" value={selected.private_member_bills} max={10} barClass="bg-amber-400" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <WIPBlock label="MPLADS Fund Utilization (%)" value={selected.mplads_utilized} />
              <WIPBlock label="Primary Spending Sector" value={selected.primary_spending_sector} />
              <WIPBlock label="Policy & Regional Development Narrative" value={selected.policy_narrative} />
            </div>
          </div>
        )}

        <div className="rounded-2xl border border-slate-700 bg-slate-800/40 p-6">
          <div className="flex items-center gap-2 mb-6"><FileText className="w-4 h-4 text-slate-400" /><h3 className="text-sm font-semibold tracking-widest uppercase text-slate-400">Compare MPs Side by Side</h3></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {[{ val: cmpA, set: setCmpA, label: "MP One" }, { val: cmpB, set: setCmpB, label: "MP Two" }].map(({ val, set, label }) => (
              <div key={label}>
                <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">{label}</label>
                <select value={val} onChange={e => set(e.target.value)} className="w-full px-3 py-2.5 text-sm bg-slate-700 border border-slate-600 rounded-xl text-slate-200 outline-none focus:border-slate-400 transition-colors appearance-none cursor-pointer">
                  {data.map(mp => <option key={mp.constituency} value={mp.constituency}>{mp.constituency} — {mp.mp_name}</option>)}
                </select>
              </div>
            ))}
          </div>
          {mpA && mpB && (
            <>
              <div className="flex flex-wrap gap-3 mb-6">
                {[{ mp: mpA, color: "#94a3b8" }, { mp: mpB, color: "#818cf8" }].map(({ mp, color }) => (
                  <div key={mp.constituency} className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-sm inline-block flex-shrink-0" style={{ backgroundColor: color }} />
                    <span className="text-xs text-slate-300 font-medium">{mp.mp_name}</span>
                    <PartyBadge party={mp.party} />
                  </div>
                ))}
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={comparisonData} barCategoryGap="30%" barGap={4} margin={{ top: 4, right: 16, left: 0, bottom: 4 }}>
                  <XAxis dataKey="metric" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} width={36} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: "#1e293b" }} />
                  <Bar dataKey={nameA} fill="#94a3b8" radius={[4, 4, 0, 0]} maxBarSize={48} />
                  <Bar dataKey={nameB} fill="#818cf8" radius={[4, 4, 0, 0]} maxBarSize={48} />
                </BarChart>
              </ResponsiveContainer>
            </>
          )}
        </div>

        <p className="text-xs text-slate-500 text-right">Source: PRS India · 18th Lok Sabha · Data as of June 2026</p>
      </div>
    </section>
  );
}
