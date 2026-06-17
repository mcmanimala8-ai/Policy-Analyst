"use client";

import { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from "recharts";

// ── Types ──────────────────────────────────────────────────────────────────────

interface MP {
  constituency: string;
  mp_name: string;
  party: string;
  term: string;
  attendance: number;
  questions_asked: number;
  debates_participated: number;
  private_member_bills: number;
  mplads_utilized: string | null;
  primary_spending_sector: string | null;
  policy_narrative: string | null;
}

interface GeoFeature {
  type: "Feature";
  properties: { pc_name: string; [key: string]: unknown };
  geometry: { type: string; coordinates: unknown };
}

// ── Constants ──────────────────────────────────────────────────────────────────

const STATE_AVERAGES = { attendance: 79.2, questions: 113, debates: 24 };

const PARTY_COLOURS: Record<string, string> = {
  "Dravida Munnetra Kazhagam": "#ef4444",
  "Indian National Congress": "#3b82f6",
  "Viduthalai Chiruthaigal Katchi": "#6366f1",
  "Communist Party of India (Marxist)": "#f43f5e",
  "Communist Party of India": "#fb7185",
  "Indian Union Muslim League": "#22c55e",
  "Marumalarchi Dravida Munnetra Kazhagam": "#f97316",
  "All India Anna Dravida Munnetra Kazhagam": "#94a3b8",
};

const PARTY_SHORT: Record<string, string> = {
  "Dravida Munnetra Kazhagam": "DMK",
  "Indian National Congress": "INC",
  "Viduthalai Chiruthaigal Katchi": "VCK",
  "Communist Party of India (Marxist)": "CPI(M)",
  "Communist Party of India": "CPI",
  "Indian Union Muslim League": "IUML",
  "Marumalarchi Dravida Munnetra Kazhagam": "MDMK",
  "All India Anna Dravida Munnetra Kazhagam": "AIADMK",
};

const MP_BRIEFS: Record<string, string> = {
  Thoothukudi: "/tracker/kanimozhi-thoothukkudi",
};

function partyColour(party: string) { return PARTY_COLOURS[party] ?? "#64748b"; }
function partyShort(party: string) { return PARTY_SHORT[party] ?? party; }

// ── GeoJSON → SVG path projection ─────────────────────────────────────────────
// Projects lng/lat to SVG x/y using a simple linear scale fitted to TN bounds
// TN approx bounds: lng 76.2–80.4, lat 8.0–13.6

const LNG_MIN = 76.2, LNG_MAX = 80.4;
const LAT_MIN = 8.0,  LAT_MAX = 13.6;
const SVG_W = 340, SVG_H = 500;
const PAD = 12;

function project(lng: number, lat: number): [number, number] {
  const x = PAD + ((lng - LNG_MIN) / (LNG_MAX - LNG_MIN)) * (SVG_W - 2 * PAD);
  const y = PAD + ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * (SVG_H - 2 * PAD);
  return [x, y];
}

function ringToPath(ring: number[][]): string {
  return ring.map(([lng, lat], i) => {
    const [x, y] = project(lng, lat);
    return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ") + " Z";
}

function featureToPath(geometry: GeoFeature["geometry"]): string {
  if (geometry.type === "Polygon") {
    const coords = geometry.coordinates as number[][][];
    return coords.map(ringToPath).join(" ");
  }
  if (geometry.type === "MultiPolygon") {
    const coords = geometry.coordinates as number[][][][];
    return coords.flatMap(poly => poly.map(ringToPath)).join(" ");
  }
  return "";
}

// ── MetricBar ──────────────────────────────────────────────────────────────────

function MetricBar({ label, value, average, max, isPercent = false }: {
  label: string; value: number; average: number; max: number; isPercent?: boolean;
}) {
  const pct = Math.min((value / max) * 100, 100);
  const avgPct = Math.min((average / max) * 100, 100);
  return (
    <div className="mb-3">
      <div className="mb-1 flex justify-between text-xs">
        <span className="text-slate-400">{label}</span>
        <span className="font-semibold text-slate-100">{isPercent ? `${value}%` : value}</span>
      </div>
      <div className="relative h-2 w-full rounded-full bg-slate-700">
        <div className="absolute left-0 top-0 h-2 rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, backgroundColor: "#38bdf8" }} />
        <div className="absolute top-0 h-2 w-0.5 bg-amber-400"
          style={{ left: `${avgPct}%` }}
          title={`State avg: ${isPercent ? `${average}%` : average}`} />
      </div>
      <p className="mt-0.5 text-right text-xs text-slate-600">avg {isPercent ? `${average}%` : average}</p>
    </div>
  );
}

// ── ProfileCard ────────────────────────────────────────────────────────────────

function ProfileCard({ mp }: { mp: MP }) {
  const briefUrl = MP_BRIEFS[mp.constituency];
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800 p-5">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-slate-100">{mp.mp_name}</h2>
        <p className="text-sm text-slate-400">{mp.constituency}</p>
        <div className="mt-2 flex items-center gap-2">
          <span className="rounded px-2 py-0.5 text-xs font-semibold text-white"
            style={{ backgroundColor: partyColour(mp.party) }}>
            {partyShort(mp.party)}
          </span>
          <span className="text-xs text-slate-500">{mp.term}</span>
        </div>
      </div>
      <MetricBar label="Attendance" value={mp.attendance} average={STATE_AVERAGES.attendance} max={100} isPercent />
      <MetricBar label="Questions Asked" value={mp.questions_asked} average={STATE_AVERAGES.questions} max={300} />
      <MetricBar label="Debates" value={mp.debates_participated} average={STATE_AVERAGES.debates} max={80} />
      <MetricBar label="Private Member Bills" value={mp.private_member_bills} average={0} max={10} />
      <div className="mt-4 space-y-3 border-t border-slate-700 pt-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">MPLADS</p>
          <p className="mt-0.5 text-xs text-slate-300">
            {mp.mplads_utilized ?? <span className="italic text-slate-600">Data not yet available</span>}
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Primary Sector</p>
          <p className="mt-0.5 text-xs text-slate-300">
            {mp.primary_spending_sector ?? <span className="italic text-slate-600">Not yet analysed</span>}
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Legislative Stance</p>
          <p className="mt-0.5 text-xs leading-relaxed text-slate-300">
            {mp.policy_narrative ?? <span className="italic text-slate-600">Full brief in progress — check back soon.</span>}
          </p>
        </div>
      </div>
      {briefUrl && (
        <a href={briefUrl}
          className="mt-4 inline-flex items-center gap-1 rounded-lg bg-sky-600 px-4 py-2 text-xs font-medium text-white transition hover:bg-sky-500">
          Read Full Legislative Brief →
        </a>
      )}
    </div>
  );
}

// ── TN Map ─────────────────────────────────────────────────────────────────────

function TNMap({ mps, selected, onSelect }: {
  mps: MP[]; selected: string; onSelect: (c: string) => void;
}) {
  const [features, setFeatures] = useState<GeoFeature[]>([]);

  useEffect(() => {
    fetch("/tn_constituencies.geojson")
      .then(r => r.json())
      .then(d => setFeatures(d.features ?? []))
      .catch(() => {});
  }, []);

  const mpByConstituency = Object.fromEntries(mps.map(m => [m.constituency, m]));

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800 p-3">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
        Tamil Nadu — 39 Constituencies
      </p>
      {features.length === 0 ? (
        <div className="flex h-64 items-center justify-center text-xs text-slate-600">
          Loading map…
        </div>
      ) : (
        <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="w-full" style={{ maxHeight: "480px" }}>
          {features.map(feat => {
            const name = feat.properties.pc_name as string;
            const mp = mpByConstituency[name];
            const isSelected = name === selected;
            const pathD = featureToPath(feat.geometry);
            return (
              <g key={name} onClick={() => onSelect(name)} className="cursor-pointer">
                <path
                  d={pathD}
                  fill={isSelected ? "#f8fafc" : (mp ? partyColour(mp.party) : "#334155")}
                  fillOpacity={isSelected ? 1 : 0.75}
                  stroke="#0f172a"
                  strokeWidth={isSelected ? 1.5 : 0.6}
                />
                <title>{name}{mp ? ` — ${mp.mp_name} (${partyShort(mp.party)})` : ""}</title>
              </g>
            );
          })}
        </svg>
      )}
      {/* Party legend */}
      <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
        {Object.entries(PARTY_SHORT).map(([full, short]) => (
          <div key={short} className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: PARTY_COLOURS[full] }} />
            <span className="text-xs text-slate-500">{short}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Comparison Chart ───────────────────────────────────────────────────────────

function ComparisonChart({ mps }: { mps: MP[] }) {
  const data = mps.map(mp => ({
    name: mp.mp_name.split(" ").slice(-1)[0],
    Attendance: mp.attendance,
    Questions: mp.questions_asked,
    Debates: mp.debates_participated,
  }));
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800 p-5">
      <h2 className="mb-4 text-sm font-bold text-slate-300">All-MP Comparison</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 4, right: 8, left: -10, bottom: 50 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis dataKey="name" tick={{ fontSize: 9, fill: "#64748b" }}
            angle={-45} textAnchor="end" interval={0} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 10, fill: "#64748b" }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px", fontSize: "11px" }}
            labelStyle={{ color: "#cbd5e1" }} />
          <Legend iconType="circle" iconSize={7}
            wrapperStyle={{ fontSize: "11px", color: "#94a3b8", paddingTop: "8px" }} />
          <Bar dataKey="Attendance" fill="#38bdf8" radius={[2, 2, 0, 0]} />
          <Bar dataKey="Questions" fill="#818cf8" radius={[2, 2, 0, 0]} />
          <Bar dataKey="Debates" fill="#fbbf24" radius={[2, 2, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────────

export default function MPTracker() {
  const [mps, setMps] = useState<MP[]>([]);
  const [selected, setSelected] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/data.json")
      .then(res => { if (!res.ok) throw new Error(`HTTP ${res.status}`); return res.json(); })
      .then((json: MP[]) => {
        const list = Array.isArray(json) ? json : [];
        setMps(list);
        if (list.length > 0) setSelected(list[0].constituency);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const activeMp = mps.find(mp => mp.constituency === selected) ?? null;

  if (loading) return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 text-slate-400">Loading data…</div>
  );
  if (error) return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 text-red-400">Failed to load: {error}</div>
  );
  if (mps.length === 0) return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 text-slate-400">No MP data found.</div>
  );

  return (
    <div className="min-h-screen bg-slate-900 px-4 py-10 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-100">Tamil Nadu MP Performance Tracker</h1>
          <p className="mt-1 text-sm text-slate-500">
            18th Lok Sabha · 39 constituencies · Digital Sansad &amp; Parliamentary records
          </p>
        </div>

        {/* Single dropdown */}
        <div className="mb-6">
          <select
            value={selected}
            onChange={e => setSelected(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-slate-200 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 sm:max-w-xs"
          >
            {mps.map(mp => (
              <option key={mp.constituency} value={mp.constituency}>
                {mp.constituency} — {mp.mp_name}
              </option>
            ))}
          </select>
        </div>

        {/* Map + Profile */}
        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <TNMap mps={mps} selected={selected} onSelect={setSelected} />
          {activeMp && <ProfileCard mp={activeMp} />}
        </div>

        {/* Chart */}
        <ComparisonChart mps={mps} />

        <p className="mt-6 text-center text-xs text-slate-600">
          State averages — Attendance: {STATE_AVERAGES.attendance}% · Questions: {STATE_AVERAGES.questions} · Debates: {STATE_AVERAGES.debates} · Amber marker = state average
        </p>
      </div>
    </div>
  );
}
