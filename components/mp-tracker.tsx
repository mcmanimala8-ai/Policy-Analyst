"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
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

// ── Constants ──────────────────────────────────────────────────────────────────

const STATE_AVERAGES = { attendance: 79.2, questions: 113, debates: 24 };

const PARTY_COLOURS: Record<string, string> = {
  "Dravida Munnetra Kazhagam": "#ef4444",
  "Indian National Congress": "#3b82f6",
  "Viduthalai Chiruthaigal Katchi": "#6366f1",
  "Communist Party of India (Marxist)": "#f43f5e",
  "Communist Party of India": "#f43f5e",
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

// Simplified TN constituency shapes as SVG paths
// viewBox: 0 0 400 600  (north at top, roughly geographic)
const CONSTITUENCY_PATHS: Record<string, string> = {
  "Chennai North":     "M195,28 L215,28 L220,45 L205,50 L190,45 Z",
  "Chennai Central":   "M205,45 L225,45 L228,60 L210,62 L200,58 Z",
  "Chennai South":     "M200,58 L228,60 L230,75 L208,78 L198,72 Z",
  "Sriperumbudur":     "M170,70 L200,68 L205,88 L175,90 L165,82 Z",
  "Kancheepuram":      "M170,90 L205,88 L208,108 L178,110 L165,102 Z",
  "Arakkonam":         "M148,55 L175,52 L178,72 L155,75 L142,67 Z",
  "Vellore":           "M148,72 L178,70 L180,90 L155,93 L142,85 Z",
  "Vaniambadi":        "M148,90 L178,88 L180,108 L155,110 L142,102 Z",
  "Tiruvannamalai":    "M178,108 L210,106 L212,128 L182,130 L172,122 Z",
  "Kallakurichi":      "M178,128 L212,126 L214,148 L182,150 L170,142 Z",
  "Villupuram":        "M178,148 L214,146 L215,168 L182,170 L170,162 Z",
  "Tindivanam":        "M210,165 L235,162 L236,182 L212,184 L205,177 Z",
  "Cuddalore":         "M215,182 L238,180 L238,200 L216,202 L208,195 Z",
  "Chidambaram":       "M215,200 L238,198 L237,220 L215,222 L207,215 Z",
  "Mayiladuthurai":    "M215,220 L237,218 L236,238 L215,240 L207,233 Z",
  "Nagapattinam":      "M215,238 L236,236 L234,256 L213,258 L207,250 Z",
  "Thanjavur":         "M185,225 L215,222 L215,245 L188,248 L178,240 Z",
  "Tiruchirappalli":   "M165,235 L195,232 L198,255 L168,258 L158,250 Z",
  "Perambalur":        "M165,210 L195,208 L198,232 L168,235 L158,227 Z",
  "Ariyalur":          "M165,185 L198,183 L200,208 L168,210 L158,203 Z",
  "Krishnagiri":       "M130,108 L165,105 L168,128 L135,130 L122,122 Z",
  "Dharmapuri":        "M130,128 L165,125 L168,148 L135,150 L122,142 Z",
  "Salem":             "M130,148 L168,145 L170,168 L135,170 L122,162 Z",
  "Namakkal":          "M135,168 L170,165 L172,188 L140,190 L128,182 Z",
  "Erode":             "M108,148 L135,145 L138,168 L112,170 L100,162 Z",
  "Tiruppur":          "M108,168 L140,165 L142,188 L115,190 L102,182 Z",
  "Coimbatore":        "M85,165 L118,162 L120,188 L90,192 L78,184 Z",
  "Pollachi":          "M85,188 L122,185 L124,210 L92,213 L78,205 Z",
  "Nilgiris":          "M75,145 L110,142 L112,165 L82,168 L68,160 Z",
  "Dindigul":          "M128,210 L165,207 L167,232 L135,235 L122,227 Z",
  "Karur":             "M140,188 L173,185 L175,210 L143,213 L130,205 Z",
  "Madurai":           "M130,252 L168,248 L170,275 L138,278 L122,270 Z",
  "Sivaganga":         "M168,255 L205,252 L207,277 L172,280 L160,272 Z",
  "Ramanathapuram":    "M170,278 L207,275 L208,300 L175,303 L162,295 Z",
  "Virudhunagar":      "M128,275 L168,272 L170,297 L135,300 L120,292 Z",
  "Tenkasi":           "M108,295 L145,292 L147,318 L115,320 L100,312 Z",
  "Tirunelveli":       "M125,315 L162,312 L163,338 L130,340 L118,333 Z",
  "Thoothukudi":       "M160,330 L195,327 L196,353 L163,356 L152,348 Z",
  "Theni":             "M95,272 L130,268 L132,295 L100,298 L85,290 Z",
  "Kanniyakumari":     "M130,338 L162,335 L160,360 L135,365 L122,355 Z",
};

// ── Helpers ────────────────────────────────────────────────────────────────────

function partyColour(party: string) {
  return PARTY_COLOURS[party] ?? "#64748b";
}
function partyShort(party: string) {
  return PARTY_SHORT[party] ?? party;
}

// ── MetricBar ──────────────────────────────────────────────────────────────────

function MetricBar({
  label, value, average, max, isPercent = false,
}: {
  label: string; value: number; average: number; max: number; isPercent?: boolean;
}) {
  const pct = Math.min((value / max) * 100, 100);
  const avgPct = Math.min((average / max) * 100, 100);
  return (
    <div className="mb-3">
      <div className="mb-1 flex justify-between text-xs">
        <span className="text-slate-400">{label}</span>
        <span className="font-semibold text-slate-100">
          {isPercent ? `${value}%` : value}
        </span>
      </div>
      <div className="relative h-2 w-full rounded-full bg-slate-700">
        <div
          className="absolute left-0 top-0 h-2 rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, backgroundColor: "#38bdf8" }}
        />
        <div
          className="absolute top-0 h-2 w-0.5 bg-amber-400"
          style={{ left: `${avgPct}%` }}
          title={`State avg: ${isPercent ? `${average}%` : average}`}
        />
      </div>
      <p className="mt-0.5 text-right text-xs text-slate-600">
        avg {isPercent ? `${average}%` : average}
      </p>
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
          <span
            className="rounded px-2 py-0.5 text-xs font-semibold text-white"
            style={{ backgroundColor: partyColour(mp.party) }}
          >
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
        <a
          href={briefUrl}
          className="mt-4 inline-flex items-center gap-1 rounded-lg bg-sky-600 px-4 py-2 text-xs font-medium text-white transition hover:bg-sky-500"
        >
          Read Full Legislative Brief →
        </a>
      )}
    </div>
  );
}

// ── TN Map ─────────────────────────────────────────────────────────────────────

function TNMap({
  mps,
  selected,
  onSelect,
}: {
  mps: MP[];
  selected: string;
  onSelect: (c: string) => void;
}) {
  const mpByConstituency = Object.fromEntries(mps.map((m) => [m.constituency, m]));

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800 p-3">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
        Tamil Nadu — 39 Constituencies
      </p>
      <svg
        viewBox="0 0 400 390"
        className="w-full"
        style={{ maxHeight: "480px" }}
      >
        {Object.entries(CONSTITUENCY_PATHS).map(([name, d]) => {
          const mp = mpByConstituency[name];
          const isSelected = name === selected;
          const fill = mp ? partyColour(mp.party) : "#334155";
          return (
            <g key={name} onClick={() => onSelect(name)} className="cursor-pointer">
              <path
                d={d}
                fill={isSelected ? "#f8fafc" : fill}
                fillOpacity={isSelected ? 1 : 0.7}
                stroke="#0f172a"
                strokeWidth={isSelected ? 2 : 0.8}
              />
              {/* Tooltip on hover via title */}
              <title>{name}{mp ? ` — ${mp.mp_name} (${partyShort(mp.party)})` : ""}</title>
            </g>
          );
        })}
      </svg>

      {/* Party legend */}
      <div className="mt-3 flex flex-wrap gap-2">
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
  const data = mps.map((mp) => ({
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
          <XAxis
            dataKey="name"
            tick={{ fontSize: 9, fill: "#64748b" }}
            angle={-45}
            textAnchor="end"
            interval={0}
            axisLine={false}
            tickLine={false}
          />
          <YAxis tick={{ fontSize: 10, fill: "#64748b" }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px", fontSize: "11px" }}
            labelStyle={{ color: "#cbd5e1" }}
          />
          <Legend iconType="circle" iconSize={7} wrapperStyle={{ fontSize: "11px", color: "#94a3b8", paddingTop: "8px" }} />
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
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json: MP[]) => {
        const list = Array.isArray(json) ? json : [];
        setMps(list);
        if (list.length > 0) setSelected(list[0].constituency);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = mps.filter(
    (mp) =>
      mp.constituency.toLowerCase().includes(search.toLowerCase()) ||
      mp.mp_name.toLowerCase().includes(search.toLowerCase())
  );

  const activeMp = mps.find((mp) => mp.constituency === selected) ?? null;

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-900 text-slate-400">
        Loading data…
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-900 text-red-400">
        Failed to load: {error}
      </div>
    );
  }

  if (mps.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-900 text-slate-400">
        No MP data found in /data.json
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 px-4 py-10 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-100">
            Tamil Nadu MP Performance Tracker
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            18th Lok Sabha · 39 constituencies · Digital Sansad &amp; Parliamentary records
          </p>
        </div>

        {/* Search + dropdown */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            type="text"
            placeholder="Search constituency or MP…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 sm:max-w-xs"
          />
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-slate-200 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 sm:max-w-xs"
          >
            {filtered.map((mp) => (
              <option key={mp.constituency} value={mp.constituency}>
                {mp.constituency} — {mp.mp_name}
              </option>
            ))}
          </select>
        </div>

        {/* Map + Profile side by side */}
        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <TNMap mps={mps} selected={selected} onSelect={setSelected} />
          {activeMp && <ProfileCard mp={activeMp} />}
        </div>

        {/* Comparison chart */}
        <ComparisonChart mps={mps} />

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-slate-600">
          State averages — Attendance: {STATE_AVERAGES.attendance}% · Questions: {STATE_AVERAGES.questions} · Debates: {STATE_AVERAGES.debates} · Amber marker = state average
        </p>
      </div>
    </div>
  );
}
