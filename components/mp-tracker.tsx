"use client";

import { useState, useEffect, useRef } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Search, MapPin, User, TrendingUp, FileText } from "lucide-react";

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

// ── Party config ──────────────────────────────────────────────────────────────
const PARTY_CONFIG: Record<string, { bg: string; text: string; border: string; dot: string; mapColor: string }> = {
  "Dravida Munnetra Kazhagam":              { bg: "bg-red-500/15",    text: "text-red-400",    border: "border-red-500/30",    dot: "bg-red-500",    mapColor: "#ef4444" },
  "Indian National Congress":               { bg: "bg-blue-500/15",   text: "text-blue-400",   border: "border-blue-500/30",   dot: "bg-blue-500",   mapColor: "#3b82f6" },
  "Viduthalai Chiruthaigal Katchi":         { bg: "bg-violet-500/15", text: "text-violet-400", border: "border-violet-500/30", dot: "bg-violet-500", mapColor: "#8b5cf6" },
  "Communist Party of India (Marxist)":     { bg: "bg-rose-500/15",   text: "text-rose-400",   border: "border-rose-500/30",   dot: "bg-rose-500",   mapColor: "#f43f5e" },
  "Communist Party of India":               { bg: "bg-rose-500/15",   text: "text-rose-400",   border: "border-rose-500/30",   dot: "bg-rose-500",   mapColor: "#fb7185" },
  "Indian Union Muslim League":             { bg: "bg-emerald-500/15",text: "text-emerald-400",border: "border-emerald-500/30",dot: "bg-emerald-500",mapColor: "#10b981" },
  "Marumalarchi Dravida Munnetra Kazhagam": { bg: "bg-orange-500/15", text: "text-orange-400", border: "border-orange-500/30", dot: "bg-orange-500", mapColor: "#f97316" },
};
const DEFAULT_PARTY = { bg: "bg-slate-500/15", text: "text-slate-300", border: "border-slate-500/30", dot: "bg-slate-400", mapColor: "#94a3b8" };

function pc(party: string) { return PARTY_CONFIG[party] ?? DEFAULT_PARTY; }

// Constituency name normalizer — GeoJSON names may differ slightly
function normalize(s: string) {
  return s.toLowerCase().replace(/[^a-z]/g, "");
}

// ── Helpers ───────────────────────────────────────────────────────────────────
const STATE_AVG = { attendance: 79.2, questions_asked: 113, debates_participated: 24 };

function attendanceColor(v: number) {
  if (v >= 85) return "bg-emerald-500";
  if (v >= 70) return "bg-amber-400";
  return "bg-rose-500";
}

function MetricBar({ label, value, max, suffix = "", barClass = "bg-slate-400", note }: {
  label: string; value: number; max: number; suffix?: string; barClass?: string; note?: string;
}) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold tracking-widest uppercase text-slate-400">{label}</span>
        <span className="text-base font-bold text-white tabular-nums">{value}{suffix}</span>
      </div>
      <div className="h-2 w-full rounded-full bg-slate-700 overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-700 ${barClass}`} style={{ width: `${pct}%` }} />
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
      {value ? (
        <p className="text-sm leading-relaxed text-slate-300">{value}</p>
      ) : (
        <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 bg-slate-700/40 border border-slate-600/30 rounded-lg px-3 py-2 mt-1">
          📊 Analytics & Curation in Progress — Quantitative engine live; qualitative regional briefs scaling weekly.
        </span>
      )}
    </div>
  );
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-slate-800 border border-slate-600 rounded-lg shadow-xl px-4 py-3 text-sm">
      <p className="font-semibold text-white mb-1">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ color: p.fill }} className="tabular-nums">{p.name}: <strong>{p.value}</strong></p>
      ))}
    </div>
  );
}

// ── Choropleth Map ────────────────────────────────────────────────────────────
function TNMap({ data, selected, onSelect }: {
  data: MP[];
  selected: MP | null;
  onSelect: (mp: MP) => void;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [geo, setGeo] = useState<any>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; text: string } | null>(null);
  const [projected, setProjected] = useState<{ id: string; path: string; mp: MP | null }[]>([]);

  // Fetch GeoJSON
  useEffect(() => {
    fetch("https://raw.githubusercontent.com/datta07/INDIAN-SHAPEFILES/master/STATES/TAMIL%20NADU/TAMIL%20NADU_PC.geojson")
      .then(r => r.json())
      .then(setGeo)
      .catch(() => {
        // fallback: try alternative source
        fetch("https://raw.githubusercontent.com/datta07/INDIAN-SHAPEFILES/master/INDIA/INDIA_PC.geojson")
          .then(r => r.json())
          .then((d: any) => {
            const tn = { ...d, features: d.features.filter((f: any) => f.properties?.ST_NAME === "TAMIL NADU" || f.properties?.state === "Tamil Nadu") };
            setGeo(tn);
          })
          .catch(console.error);
      });
  }, []);

  // Project GeoJSON to SVG paths
  useEffect(() => {
    if (!geo?.features?.length || !data.length) return;

    // Manual mercator projection scaled to TN bbox
    // TN approximate bounds: lon 76.2–80.4, lat 8.0–13.6
    const W = 380, H = 480;
    const lonMin = 76.2, lonMax = 80.4, latMin = 7.8, latMax = 13.7;

    function project(lon: number, lat: number): [number, number] {
      const x = ((lon - lonMin) / (lonMax - lonMin)) * W;
      const y = H - ((lat - latMin) / (latMax - latMin)) * H;
      return [x, y];
    }

    function coordsToPath(coords: number[][][]): string {
      return coords.map(ring =>
        ring.map((pt, i) => {
          const [x, y] = project(pt[0], pt[1]);
          return `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
        }).join(" ") + " Z"
      ).join(" ");
    }

    function featureToPath(feature: any): string {
      const geom = feature.geometry;
      if (!geom) return "";
      if (geom.type === "Polygon") return coordsToPath(geom.coordinates);
      if (geom.type === "MultiPolygon") return geom.coordinates.map((p: number[][][]) => coordsToPath(p)).join(" ");
      return "";
    }

    const paths = geo.features.map((feature: any) => {
      const name: string = feature.properties?.PC_NAME || feature.properties?.CONSTITUENCY || feature.properties?.NAME || "";
      const mp = data.find(m => normalize(m.constituency) === normalize(name)) ?? null;
      return { id: name, path: featureToPath(feature), mp };
    }).filter((p: any) => p.path);

    setProjected(paths);
  }, [geo, data]);

  if (!projected.length) {
    return (
      <div className="flex items-center justify-center h-64 rounded-2xl border border-slate-700 bg-slate-800/40">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-slate-500 border-t-slate-300 rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-slate-400">Loading constituency map…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative rounded-2xl border border-slate-700 bg-slate-800/40 overflow-hidden">
      <div className="p-4 border-b border-slate-700/50">
        <p className="text-xs font-semibold tracking-widest uppercase text-slate-400">Tamil Nadu — 39 Lok Sabha Constituencies</p>
        <p className="text-xs text-slate-500 mt-0.5">Click any constituency to load MP profile</p>
      </div>
      <div className="relative overflow-auto">
        <svg
          ref={svgRef}
          viewBox="0 0 380 480"
          className="w-full max-h-[480px]"
          style={{ display: "block" }}
        >
          {projected.map(({ id, path, mp }) => {
            const isSelected = selected?.constituency && mp?.constituency === selected.constituency;
            const fillColor = mp ? pc(mp.party).mapColor : "#334155";
            return (
              <path
                key={id}
                d={path}
                fill={fillColor}
                fillOpacity={isSelected ? 1 : 0.6}
                stroke={isSelected ? "#fff" : "#1e293b"}
                strokeWidth={isSelected ? 1.5 : 0.5}
                className="cursor-pointer transition-all duration-150"
                style={{ filter: isSelected ? "brightness(1.2)" : undefined }}
                onMouseEnter={(e) => {
                  const rect = svgRef.current?.getBoundingClientRect();
                  if (rect) {
                    setTooltip({
                      x: e.clientX - rect.left,
                      y: e.clientY - rect.top - 12,
                      text: mp ? `${mp.constituency} — ${mp.mp_name}` : id,
                    });
                  }
                }}
                onMouseLeave={() => setTooltip(null)}
                onClick={() => mp && onSelect(mp)}
              />
            );
          })}
        </svg>
        {tooltip && (
          <div
            className="pointer-events-none absolute z-10 bg-slate-900 border border-slate-600 text-white text-xs rounded-lg px-3 py-2 shadow-xl whitespace-nowrap"
            style={{ left: tooltip.x + 8, top: tooltip.y }}
          >
            {tooltip.text}
          </div>
        )}
      </div>
      {/* Legend */}
      <div className="px-4 py-3 border-t border-slate-700/50 flex flex-wrap gap-3">
        {Object.entries(PARTY_CONFIG).map(([party, cfg]) => (
          <div key={party} className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm inline-block flex-shrink-0" style={{ backgroundColor: cfg.mapColor }} />
            <span className="text-xs text-slate-400 leading-none">{party.split(" ").map(w => w[0]).join("").slice(0, 4)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
export function MPTracker() {
  const [data, setData] = useState<MP[]>([]);
  const [selected, setSelected] = useState<MP | null>(null);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [cmpA, setCmpA] = useState("");
  const [cmpB, setCmpB] = useState("");

  useEffect(() => {
    fetch("/data.json")
      .then(r => r.json())
      .then((d: MP[]) => {
        const sorted = [...d].sort((a, b) => a.constituency.localeCompare(b.constituency));
        setData(sorted);
        setSelected(sorted[0]);
        setCmpA(sorted[0]?.constituency ?? "");
        setCmpB(sorted[1]?.constituency ?? "");
      })
      .catch(console.error);
  }, []);

  const filtered = data.filter(m =>
    m.constituency.toLowerCase().includes(search.toLowerCase()) ||
    m.mp_name.toLowerCase().includes(search.toLowerCase())
  );

  const mpA = data.find(m => m.constituency === cmpA);
  const mpB = data.find(m => m.constituency === cmpB);
  const nameA = mpA?.mp_name.split(" ")[0] ?? "";
  const nameB = mpB?.mp_name.split(" ")[0] ?? "";

  const comparisonData = mpA && mpB ? [
    { metric: "Attendance", [nameA]: mpA.attendance, [nameB]: mpB.attendance },
    { metric: "Questions",  [nameA]: mpA.questions_asked, [nameB]: mpB.questions_asked },
    { metric: "Debates",    [nameA]: mpA.debates_participated, [nameB]: mpB.debates_participated },
  ] : [];

  if (!data.length) {
    return (
      <section className="py-20 text-center">
        <div className="w-8 h-8 border-2 border-slate-600 border-t-slate-300 rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm text-slate-400">Loading legislative data…</p>
      </section>
    );
  }

  return (
    <section className="bg-slate-900 min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-semibold tracking-widest uppercase text-slate-400 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
            Independent Legislative Analytics
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
            Tamil Nadu MP Performance Tracker
          </h1>
          <p className="text-slate-400 text-sm max-w-xl">
            Live legislative metrics for all 39 Lok Sabha constituencies — 18th Lok Sabha, sourced from PRS India.
          </p>
        </div>

        {/* Map + Selector row */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Map */}
          <div className="lg:col-span-3">
            <TNMap data={data} selected={selected} onSelect={(mp) => { setSelected(mp); setSearch(""); }} />
          </div>

          {/* Selector + quick stats */}
          <div className="lg:col-span-2 space-y-4">
            {/* Search dropdown */}
            <div className="relative">
              <div
                className="flex items-center gap-3 px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl cursor-pointer hover:border-slate-500 transition-colors"
                onClick={() => setOpen(o => !o)}
              >
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="flex-1 text-sm font-medium text-slate-200 truncate">
                  {selected ? `${selected.constituency} — ${selected.mp_name}` : "Select constituency…"}
                </span>
                <Search className="w-4 h-4 text-slate-400 shrink-0" />
              </div>
              {open && (
                <div className="absolute z-20 top-full mt-1 w-full bg-slate-800 border border-slate-700 rounded-xl shadow-2xl overflow-hidden">
                  <div className="p-2 border-b border-slate-700">
                    <input
                      autoFocus
                      className="w-full px-3 py-2 text-sm bg-slate-700 rounded-lg outline-none placeholder:text-slate-500 text-slate-100"
                      placeholder="Search constituency or MP…"
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                    />
                  </div>
                  <ul className="max-h-64 overflow-y-auto divide-y divide-slate-700/50">
                    {filtered.map(mp => (
                      <li
                        key={mp.constituency}
                        onClick={() => { setSelected(mp); setOpen(false); setSearch(""); }}
                        className={`px-4 py-2.5 cursor-pointer hover:bg-slate-700 transition-colors flex items-center justify-between ${selected?.constituency === mp.constituency ? "bg-slate-700/50" : ""}`}
                      >
                        <div>
                          <p className="text-sm font-medium text-slate-200">{mp.constituency}</p>
                          <p className="text-xs text-slate-400">{mp.mp_name}</p>
                        </div>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-semibold border ${pc(mp.party).bg} ${pc(mp.party).text} ${pc(mp.party).border}`}>
                          {mp.party.split(" ").map(w => w[0]).join("").slice(0, 4)}
                        </span>
                      </li>
                    ))}
                    {filtered.length === 0 && <li className="px-4 py-6 text-center text-sm text-slate-400">No results</li>}
                  </ul>
                </div>
              )}
            </div>

            {/* Quick party distribution */}
            <div className="rounded-2xl border border-slate-700 bg-slate-800/40 p-4">
              <p className="text-xs font-semibold tracking-widest uppercase text-slate-400 mb-3">Party Distribution</p>
              {Object.entries(
                data.reduce((acc, mp) => {
                  acc[mp.party] = (acc[mp.party] || 0) + 1;
                  return acc;
                }, {} as Record<string, number>)
              )
                .sort((a, b) => b[1] - a[1])
                .map(([party, count]) => (
                  <div key={party} className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: pc(party).mapColor }} />
                    <span className="text-xs text-slate-300 flex-1 truncate">{party}</span>
                    <span className="text-xs font-bold text-white tabular-nums">{count}</span>
                  </div>
                ))
              }
            </div>
          </div>
        </div>

        {/* MP Profile Scorecard */}
        {selected && (
          <div className="space-y-4">
            {/* Identity + metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Identity */}
              <div className="lg:col-span-1 rounded-2xl border border-slate-700 bg-gradient-to-br from-slate-800 to-slate-900 p-6 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-slate-700 flex items-center justify-center mb-4">
                    <User className="w-6 h-6 text-slate-300" />
                  </div>
                  <h2 className="text-xl font-bold text-white leading-tight mb-1">{selected.mp_name}</h2>
                  <p className="text-slate-400 text-sm mb-4">{selected.constituency} Constituency</p>
                  <PartyBadge party={selected.party} />
                </div>
                <div className="mt-6 pt-5 border-t border-slate-700 space-y-1">
                  <p className="text-xs font-semibold tracking-widest uppercase text-slate-400">Parliamentary Tenure</p>
                  <p className="text-sm font-bold text-slate-200">{selected.term}</p>
                </div>
              </div>

              {/* Metrics */}
              <div className="lg:col-span-2 rounded-2xl border border-slate-700 bg-slate-800/60 p-6 space-y-6">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-slate-400" />
                  <span className="text-xs font-semibold tracking-widest uppercase text-slate-400">Legislative Performance</span>
                </div>
                <MetricBar label="Attendance" value={selected.attendance} max={100} suffix="%" barClass={attendanceColor(selected.attendance)} note={`State avg: ${STATE_AVG.attendance}%`} />
                <MetricBar label="Questions Asked" value={selected.questions_asked} max={300} barClass="bg-slate-400" note={`State avg: ${STATE_AVG.questions_asked}`} />
                <MetricBar label="Debates Participated" value={selected.debates_participated} max={200} barClass="bg-indigo-400" note={`State avg: ${STATE_AVG.debates_participated}`} />
                <MetricBar label="Private Member Bills" value={selected.private_member_bills} max={10} barClass="bg-amber-400" />
              </div>
            </div>

            {/* Qualitative blocks */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <WIPBlock label="MPLADS Fund Utilization (%)" value={selected.mplads_utilized} />
              <WIPBlock label="Primary Spending Sector" value={selected.primary_spending_sector} />
              <WIPBlock label="Policy & Regional Development Narrative" value={selected.policy_narrative} />
            </div>
          </div>
        )}

        {/* Comparison */}
        <div className="rounded-2xl border border-slate-700 bg-slate-800/40 p-6">
          <div className="flex items-center gap-2 mb-6">
            <FileText className="w-4 h-4 text-slate-400" />
            <h3 className="text-sm font-semibold tracking-widest uppercase text-slate-400">Compare MPs Side by Side</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {[{ val: cmpA, set: setCmpA, label: "MP One" }, { val: cmpB, set: setCmpB, label: "MP Two" }].map(({ val, set, label }) => (
              <div key={label}>
                <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">{label}</label>
                <select
                  value={val}
                  onChange={e => set(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm bg-slate-700 border border-slate-600 rounded-xl text-slate-200 outline-none focus:border-slate-400 transition-colors appearance-none cursor-pointer"
                >
                  {data.map(mp => (
                    <option key={mp.constituency} value={mp.constituency}>{mp.constituency} — {mp.mp_name}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          {mpA && mpB && (
            <>
              <div className="flex flex-wrap gap-3 mb-6">
                {[{ mp: mpA, color: "bg-slate-400" }, { mp: mpB, color: "bg-indigo-400" }].map(({ mp, color }) => (
                  <div key={mp.constituency} className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-sm inline-block ${color}`} />
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
