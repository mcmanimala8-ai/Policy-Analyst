"use client";

import { useEffect, useState } from "react";

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
  score: number;
  rank: number;
  tier: string;
  data_as_of: string;
}

interface GeoFeature {
  type: "Feature";
  properties: { pc_name: string; [key: string]: unknown };
  geometry: { type: string; coordinates: unknown };
}

// ── Constants ──────────────────────────────────────────────────────────────────

const STATE_AVERAGES = { attendance: 78.8, questions: 114, debates: 25 };

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

const TIER_STYLES: Record<string, { bg: string; text: string }> = {
  "High Performer": { bg: "#14532d", text: "#4ade80" },
  "Active":         { bg: "#1e3a5f", text: "#60a5fa" },
  "Below Average":  { bg: "#4a1942", text: "#f0abfc" },
};

const MP_BRIEFS: Record<string, string> = {
  Thoothukudi: "/tracker/kanimozhi-thoothukkudi",
};

function partyColour(party: string) { return PARTY_COLOURS[party] ?? "#64748b"; }
function partyShort(party: string) { return PARTY_SHORT[party] ?? party; }

// ── GeoJSON projection ─────────────────────────────────────────────────────────

const LNG_MIN = 76.2, LNG_MAX = 80.4, LAT_MIN = 8.0, LAT_MAX = 13.6;
const SVG_W = 340, SVG_H = 500, PAD = 12;

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
    return (geometry.coordinates as number[][][]).map(ringToPath).join(" ");
  }
  if (geometry.type === "MultiPolygon") {
    return (geometry.coordinates as number[][][][]).flatMap(p => p.map(ringToPath)).join(" ");
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

function ProfileCard({ mp, total }: { mp: MP; total: number }) {
  const briefUrl = MP_BRIEFS[mp.constituency];
  const tierStyle = TIER_STYLES[mp.tier] ?? TIER_STYLES["Active"];

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800 p-5">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-slate-100">{mp.mp_name}</h2>
            <p className="text-sm text-slate-400">{mp.constituency}</p>
          </div>
          {/* Score circle */}
          <div className="flex flex-col items-center rounded-lg border border-slate-700 px-3 py-1 text-center">
            <span className="text-xl font-bold text-slate-100">{mp.score}</span>
            <span className="text-xs text-slate-500">/100</span>
          </div>
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="rounded px-2 py-0.5 text-xs font-semibold text-white"
            style={{ backgroundColor: partyColour(mp.party) }}>
            {partyShort(mp.party)}
          </span>
          <span className="text-xs text-slate-500">{mp.term}</span>
          <span className="rounded px-2 py-0.5 text-xs font-semibold"
            style={{ backgroundColor: tierStyle.bg, color: tierStyle.text }}>
            {mp.tier}
          </span>
          <span className="text-xs text-slate-500">Rank #{mp.rank} of {total}</span>
        </div>
      </div>

      {/* Metrics */}
      <MetricBar label="Attendance" value={mp.attendance} average={STATE_AVERAGES.attendance} max={100} isPercent />
      <MetricBar label="Questions Asked" value={mp.questions_asked} average={STATE_AVERAGES.questions} max={300} />
      <MetricBar label="Debates" value={mp.debates_participated} average={STATE_AVERAGES.debates} max={80} />
      <MetricBar label="Private Member Bills" value={mp.private_member_bills} average={0} max={10} />

      {/* Details */}
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

      {/* Footer: data currency + brief link */}
      <div className="mt-4 flex items-center justify-between border-t border-slate-700 pt-3">
        <p className="text-xs text-slate-600">Data as of {mp.data_as_of}</p>
        {briefUrl && (
          <a href={briefUrl}
            className="inline-flex items-center gap-1 rounded-lg bg-sky-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-sky-500">
            Full Brief →
          </a>
        )}
      </div>
    </div>
  );
}

// ── Stats Bar ──────────────────────────────────────────────────────────────────

function StatsBar({ mps }: { mps: MP[] }) {
  const topMp = mps.reduce((a, b) => a.score > b.score ? a : b);
  const hp = mps.filter(m => m.tier === "High Performer").length;
  const active = mps.filter(m => m.tier === "Active").length;
  const below = mps.filter(m => m.tier === "Below Average").length;

  return (
    <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
      {[
        { label: "State Avg Attendance", value: `${STATE_AVERAGES.attendance}%` },
        { label: "State Avg Questions", value: STATE_AVERAGES.questions },
        { label: "Top Performer", value: topMp.mp_name.split(" ").slice(-1)[0], sub: `Score ${topMp.score}` },
        { label: "Tier Breakdown", value: `${hp} / ${active} / ${below}`, sub: "High / Active / Below" },
      ].map(({ label, value, sub }) => (
        <div key={label} className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-3">
          <p className="text-xs text-slate-500">{label}</p>
          <p className="mt-1 text-base font-bold text-slate-100">{value}</p>
          {sub && <p className="text-xs text-slate-600">{sub}</p>}
        </div>
      ))}
    </div>
  );
}

// ── Leaderboard ────────────────────────────────────────────────────────────────

function Leaderboard({ mps, onSelect }: { mps: MP[]; onSelect: (c: string) => void }) {
  const sorted = [...mps].sort((a, b) => b.score - a.score);
  const top5 = sorted.slice(0, 5);
  const bot5 = sorted.slice(-5).reverse();

  const Row = ({ mp, highlight }: { mp: MP; highlight: "top" | "bottom" }) => (
    <button onClick={() => onSelect(mp.constituency)}
      className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left transition hover:bg-slate-700">
      <div className="flex items-center gap-2">
        <span className="w-5 text-xs text-slate-500">#{mp.rank}</span>
        <span className="text-xs text-slate-200">{mp.mp_name.split(" ").slice(-1)[0]}</span>
        <span className="text-xs" style={{ color: partyColour(mp.party) }}>{partyShort(mp.party)}</span>
      </div>
      <span className={`text-xs font-bold ${highlight === "top" ? "text-green-400" : "text-rose-400"}`}>
        {mp.score}
      </span>
    </button>
  );

  return (
    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="rounded-xl border border-slate-700 bg-slate-800 p-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-green-500">Top 5</p>
        {top5.map(mp => <Row key={mp.constituency} mp={mp} highlight="top" />)}
      </div>
      <div className="rounded-xl border border-slate-700 bg-slate-800 p-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-rose-500">Bottom 5</p>
        {bot5.map(mp => <Row key={mp.constituency} mp={mp} highlight="bottom" />)}
      </div>
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
        <div className="flex h-64 items-center justify-center text-xs text-slate-600">Loading map…</div>
      ) : (
        <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="w-full" style={{ maxHeight: "480px" }}>
          {features.map(feat => {
            const name = feat.properties.pc_name as string;
            const mp = mpByConstituency[name];
            const isSelected = name === selected;
            return (
              <g key={name} onClick={() => onSelect(name)} className="cursor-pointer">
                <path
                  d={featureToPath(feat.geometry)}
                  fill={isSelected ? "#f8fafc" : (mp ? partyColour(mp.party) : "#334155")}
                  fillOpacity={isSelected ? 1 : 0.75}
                  stroke="#0f172a"
                  strokeWidth={isSelected ? 1.5 : 0.6}
                />
                <title>{name}{mp ? ` — ${mp.mp_name} (${partyShort(mp.party)}) Score: ${mp.score}` : ""}</title>
              </g>
            );
          })}
        </svg>
      )}
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
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-100">Tamil Nadu MP Performance Tracker</h1>
          <p className="mt-1 text-sm text-slate-500">
            18th Lok Sabha · 39 constituencies · Source: PRS India &amp; Digital Sansad
          </p>
        </div>

        {/* Stats bar */}
        <StatsBar mps={mps} />

        {/* Dropdown */}
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
        <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <TNMap mps={mps} selected={selected} onSelect={setSelected} />
          {activeMp && <ProfileCard mp={activeMp} total={mps.length} />}
        </div>

        {/* Leaderboard */}
        <Leaderboard mps={mps} onSelect={setSelected} />

        <p className="mt-8 text-center text-xs text-slate-600">
          Score = Attendance (30%) + Questions (40%) + Debates (20%) + Bills (10%) · Amber marker = state average
        </p>
      </div>
    </div>
  );
}
