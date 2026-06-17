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
  mplads_utilized: string | null;
  primary_spending_sector: string | null;
  policy_narrative: string | null;
}

// ── Constants ──────────────────────────────────────────────────────────────────

const STATE_AVERAGES = {
  attendance: 79.2,
  questions: 113,
  debates: 24,
};

const PARTY_COLOURS: Record<string, string> = {
  "Dravida Munnetra Kazhagam": "#dc2626",
  "Indian National Congress": "#2563eb",
  "Viduthalai Chiruthaigal Katchi": "#4338ca",
  "Communist Party of India (Marxist)": "#f43f5e",
  "Communist Party of India": "#f43f5e",
  "Indian Union Muslim League": "#16a34a",
  "Marumalarchi Dravida Munnetra Kazhagam": "#ea580c",
  "All India Anna Dravida Munnetra Kazhagam": "#6b7280",
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

// Brief links keyed by constituency name as it appears in data.json
const MP_BRIEFS: Record<string, string> = {
  Thoothukudi: "/tracker/kanimozhi-thoothukkudi",
};

function partyColour(party: string): string {
  return PARTY_COLOURS[party] ?? "#64748b";
}

function partyShort(party: string): string {
  return PARTY_SHORT[party] ?? party;
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function PartyBadge({ party }: { party: string }) {
  return (
    <span
      className="inline-block rounded px-2 py-0.5 text-xs font-semibold text-white"
      style={{ backgroundColor: partyColour(party) }}
    >
      {partyShort(party)}
    </span>
  );
}

function MetricBar({
  label,
  value,
  average,
  max,
  isPercent = false,
}: {
  label: string;
  value: number;
  average: number;
  max: number;
  isPercent?: boolean;
}) {
  const pct = Math.min((value / max) * 100, 100);
  const avgPct = Math.min((average / max) * 100, 100);

  return (
    <div className="mb-4">
      <div className="mb-1 flex items-center justify-between text-sm">
        <span className="font-medium text-slate-700">{label}</span>
        <span className="font-semibold text-slate-900">
          {isPercent ? `${value}%` : value}
        </span>
      </div>
      <div className="relative h-3 w-full rounded-full bg-slate-100">
        <div
          className="absolute left-0 top-0 h-3 rounded-full bg-slate-700 transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
        <div
          className="absolute top-0 h-3 w-0.5 bg-amber-400"
          style={{ left: `${avgPct}%` }}
          title={`State avg: ${isPercent ? `${average}%` : average}`}
        />
      </div>
      <p className="mt-0.5 text-right text-xs text-slate-400">
        State avg: {isPercent ? `${average}%` : average}
      </p>
    </div>
  );
}

function ProfileCard({ mp }: { mp: MP }) {
  const briefUrl = MP_BRIEFS[mp.constituency];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">{mp.mp_name}</h2>
          <p className="mt-0.5 text-sm text-slate-500">{mp.constituency}</p>
          <div className="mt-2 flex items-center gap-2">
            <PartyBadge party={mp.party} />
            <span className="text-xs text-slate-400">{mp.term}</span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <MetricBar
          label="Attendance"
          value={mp.attendance}
          average={STATE_AVERAGES.attendance}
          max={100}
          isPercent
        />
        <MetricBar
          label="Questions Asked"
          value={mp.questions_asked}
          average={STATE_AVERAGES.questions}
          max={300}
        />
        <MetricBar
          label="Debates Participated"
          value={mp.debates_participated}
          average={STATE_AVERAGES.debates}
          max={80}
        />
        <MetricBar
          label="Private Member Bills"
          value={mp.private_member_bills}
          average={0}
          max={10}
        />
      </div>

      <div className="mb-4">
        <h3 className="mb-1 text-sm font-semibold uppercase tracking-wide text-slate-400">
          MPLADS Utilisation
        </h3>
        <p className="text-sm text-slate-700">
          {mp.mplads_utilized ?? (
            <span className="italic text-slate-400">Data not yet available</span>
          )}
        </p>
      </div>

      <div className="mb-4">
        <h3 className="mb-1 text-sm font-semibold uppercase tracking-wide text-slate-400">
          Primary Sector Focus
        </h3>
        <p className="text-sm text-slate-700">
          {mp.primary_spending_sector ?? (
            <span className="italic text-slate-400">Not yet analysed</span>
          )}
        </p>
      </div>

      <div className="mb-6">
        <h3 className="mb-1 text-sm font-semibold uppercase tracking-wide text-slate-400">
          Legislative Stance
        </h3>
        <p className="text-sm leading-relaxed text-slate-700">
          {mp.policy_narrative ?? (
            <span className="italic text-slate-400">
              Full brief in progress — check back soon.
            </span>
          )}
        </p>
      </div>

      {briefUrl && (
        <a
          href={briefUrl}
          className="inline-flex items-center gap-1 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
        >
          Read Full Legislative Brief →
        </a>
      )}
    </div>
  );
}

function ComparisonChart({ mps }: { mps: MP[] }) {
  const data = mps.map((mp) => ({
    name: mp.mp_name.split(" ").slice(-1)[0],
    Attendance: mp.attendance,
    Questions: mp.questions_asked,
    Debates: mp.debates_participated,
  }));

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-bold text-slate-900">
        MP Performance Comparison
      </h2>
      <ResponsiveContainer width="100%" height={340}>
        <BarChart data={data} margin={{ top: 4, right: 16, left: 0, bottom: 40 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 10, fill: "#64748b" }}
            angle={-45}
            textAnchor="end"
            interval={0}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#64748b" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              borderRadius: "8px",
              border: "1px solid #e2e8f0",
              fontSize: "12px",
            }}
          />
          <Legend
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: "12px" }}
            verticalAlign="top"
          />
          <Bar dataKey="Attendance" fill="#475569" radius={[3, 3, 0, 0]} />
          <Bar dataKey="Questions" fill="#0ea5e9" radius={[3, 3, 0, 0]} />
          <Bar dataKey="Debates" fill="#f59e0b" radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

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
      <div className="flex min-h-[40vh] items-center justify-center text-slate-400">
        Loading data…
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-red-500">
        Failed to load data: {error}
      </div>
    );
  }

  if (mps.length === 0) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-slate-400">
        No MP data found in /data.json
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-4 py-10 text-slate-800 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Tamil Nadu MP Performance Tracker
          </h1>
          <p className="mt-2 text-slate-500">
            18th Lok Sabha · 39 constituencies · Data sourced from Digital
            Sansad &amp; Parliamentary records
          </p>
        </div>

        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            type="text"
            placeholder="Search constituency or MP name…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 shadow-sm outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-300 sm:max-w-xs"
          />
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-800 shadow-sm outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-300 sm:max-w-xs"
          >
            {filtered.map((mp) => (
              <option key={mp.constituency} value={mp.constituency}>
                {mp.constituency} — {mp.mp_name}
              </option>
            ))}
          </select>
        </div>

        {activeMp && (
          <div className="mb-10">
            <ProfileCard mp={activeMp} />
          </div>
        )}

        <ComparisonChart mps={mps} />

        <p className="mt-8 text-center text-xs text-slate-400">
          State averages — Attendance: {STATE_AVERAGES.attendance}% · Questions:{" "}
          {STATE_AVERAGES.questions} · Debates: {STATE_AVERAGES.debates} · Amber
          marker on each bar indicates state average.
        </p>
      </div>
    </div>
  );
}
