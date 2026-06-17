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

// ── Types ────────────────────────────────────────────────────────────────────

interface MP {
  id: string;
  name: string;
  constituency: string;
  party: string;
  term: string;
  attendance: number;
  questions: number;
  debates: number;
  bills: number;
  mplads: string | null;
  primary_sector: string | null;
  policy_narrative: string | null;
}

// ── Constants ────────────────────────────────────────────────────────────────

const STATE_AVERAGES = {
  attendance: 79.2,
  questions: 113,
  debates: 24,
};

const PARTY_COLOURS: Record<string, string> = {
  DMK: "#dc2626",
  INC: "#2563eb",
  VCK: "#4338ca",
  "CPI(M)": "#f43f5e",
  CPI: "#f43f5e",
  IUML: "#16a34a",
  MDMK: "#ea580c",
};

const MP_BRIEFS: Record<string, string> = {
  Thoothukkudi: "/tracker/kanimozhi-thoothukkudi",
};

function partyColour(party: string): string {
  return PARTY_COLOURS[party] ?? "#64748b";
}

// ── Sub-components ───────────────────────────────────────────────────────────

function PartyBadge({ party }: { party: string }) {
  return (
    <span
      className="inline-block rounded px-2 py-0.5 text-xs font-semibold text-white"
      style={{ backgroundColor: partyColour(party) }}
    >
      {party}
    </span>
  );
}

function MetricBar({
  label,
  value,
  average,
  max,
  unit = "",
}: {
  label: string;
  value: number;
  average: number;
  max: number;
  unit?: string;
}) {
  const pct = Math.min((value / max) * 100, 100);
  const avgPct = Math.min((average / max) * 100, 100);

  return (
    <div className="mb-4">
      <div className="mb-1 flex items-center justify-between text-sm">
        <span className="font-medium text-slate-700">{label}</span>
        <span className="text-slate-900 font-semibold">
          {unit === "%" ? `${value}%` : value}
        </span>
      </div>
      <div className="relative h-3 w-full rounded-full bg-slate-100">
        {/* MP bar */}
        <div
          className="absolute left-0 top-0 h-3 rounded-full bg-slate-700 transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
        {/* State average marker */}
        <div
          className="absolute top-0 h-3 w-0.5 bg-amber-400"
          style={{ left: `${avgPct}%` }}
          title={`State avg: ${unit === "%" ? `${average}%` : average}`}
        />
      </div>
      <p className="mt-0.5 text-right text-xs text-slate-400">
        State avg: {unit === "%" ? `${average}%` : average}
        {unit === "%" ? "" : ""}
      </p>
    </div>
  );
}

function ProfileCard({ mp }: { mp: MP }) {
  const briefUrl = MP_BRIEFS[mp.constituency];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">{mp.name}</h2>
          <p className="mt-0.5 text-sm text-slate-500">{mp.constituency}</p>
          <div className="mt-2 flex items-center gap-2">
            <PartyBadge party={mp.party} />
            <span className="text-xs text-slate-400">{mp.term}</span>
          </div>
        </div>
      </div>

      {/* Metric bars */}
      <div className="mb-6">
        <MetricBar
          label="Attendance"
          value={mp.attendance}
          average={STATE_AVERAGES.attendance}
          max={100}
          unit="%"
        />
        <MetricBar
          label="Questions"
          value={mp.questions}
          average={STATE_AVERAGES.questions}
          max={300}
        />
        <MetricBar
          label="Debates"
          value={mp.debates}
          average={STATE_AVERAGES.debates}
          max={80}
        />
        <MetricBar
          label="Bills Introduced"
          value={mp.bills}
          average={0}
          max={10}
        />
      </div>

      {/* MPLADS */}
      <div className="mb-4">
        <h3 className="mb-1 text-sm font-semibold uppercase tracking-wide text-slate-400">
          MPLADS Utilisation
        </h3>
        <p className="text-sm text-slate-700">
          {mp.mplads ?? (
            <span className="italic text-slate-400">Data not yet available</span>
          )}
        </p>
      </div>

      {/* Primary Sector */}
      <div className="mb-4">
        <h3 className="mb-1 text-sm font-semibold uppercase tracking-wide text-slate-400">
          Primary Sector Focus
        </h3>
        <p className="text-sm text-slate-700">
          {mp.primary_sector ?? (
            <span className="italic text-slate-400">Not yet analysed</span>
          )}
        </p>
      </div>

      {/* Policy Narrative */}
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

      {/* Brief link — only for MPs that have one */}
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
    name: mp.name.split(" ").slice(-1)[0], // last name only for axis legibility
    Attendance: mp.attendance,
    Questions: mp.questions,
    Debates: mp.debates,
  }));

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-bold text-slate-900">
        MP Performance Comparison
      </h2>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data} margin={{ top: 4, right: 16, left: 0, bottom: 4 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11, fill: "#64748b" }}
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
          />
          <Bar dataKey="Attendance" fill="#475569" radius={[3, 3, 0, 0]} />
          <Bar dataKey="Questions" fill="#0ea5e9" radius={[3, 3, 0, 0]} />
          <Bar dataKey="Debates" fill="#f59e0b" radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

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
      .then((json) => {
        const list: MP[] = Array.isArray(json) ? json : json.mps ?? [];
        setMps(list);
        if (list.length > 0) setSelected(list[0].id);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = mps.filter((mp) =>
    mp.constituency.toLowerCase().includes(search.toLowerCase()) ||
    mp.name.toLowerCase().includes(search.toLowerCase())
  );

  const activeMp = mps.find((mp) => mp.id === selected) ?? null;

  // ── Render states ──

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

  // ── Main render ──

  return (
    <div className="min-h-screen bg-white px-4 py-10 text-slate-800 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Tamil Nadu MP Performance Tracker
          </h1>
          <p className="mt-2 text-slate-500">
            18th Lok Sabha · 39 constituencies · Data sourced from Digital
            Sansad & Parliamentary records
          </p>
        </div>

        {/* Constituency search + dropdown */}
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
              <option key={mp.id} value={mp.id}>
                {mp.constituency} — {mp.name}
              </option>
            ))}
          </select>
        </div>

        {/* Profile card */}
        {activeMp && (
          <div className="mb-10">
            <ProfileCard mp={activeMp} />
          </div>
        )}

        {/* Comparison chart — show all MPs (or filtered set if small) */}
        <ComparisonChart mps={mps.slice(0, 20)} />

        {/* Footer note */}
        <p className="mt-8 text-center text-xs text-slate-400">
          State averages — Attendance: {STATE_AVERAGES.attendance}% · Questions:{" "}
          {STATE_AVERAGES.questions} · Debates: {STATE_AVERAGES.debates} ·
          Amber marker (|) on each bar indicates state average.
        </p>
      </div>
    </div>
  );
}
