"use client";

import React, { useState, useEffect, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Search, MapPin, User, TrendingUp, FileText, Award, ArrowUp, ArrowDown, Minus } from "lucide-react";

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

interface ScoredMP extends MP {
  score: number;
  rank: number;
  tier: "High Performer" | "Active" | "Below Average";
  tierColor: string;
  verdict: string;
  attendanceRank: number;
  questionsRank: number;
}

// ── Scoring ────────────────────────────────────────────────────────────────────
const MAX = { attendance: 94.8, questions: 231, debates: 187, bills: 5 };

function computeScore(mp: MP): number {
  return Math.round(
    (mp.attendance / MAX.attendance) * 30 +
    (mp.questions_asked / MAX.questions) * 40 +
    (mp.debates_participated / MAX.debates) * 20 +
    (mp.private_member_bills / MAX.bills) * 10
  );
}

function computeTier(score: number): { tier: ScoredMP["tier"]; tierColor: string } {
  if (score >= 70) return { tier: "High Performer", tierColor: "emerald" };
  if (score >= 45) return { tier: "Active", tierColor: "amber" };
  return { tier: "Below Average", tierColor: "rose" };
}

function computeVerdict(mp: MP, rank: number, total: number, score: number): string {
  const rankStr = `Ranked #${rank} of ${total} TN MPs`;
  if (mp.attendance < 55) return `Attendance of ${mp.attendance}% is significantly below the state average — present for fewer than 6 in 10 sessions. ${rankStr}.`;
  if (mp.debates_participated > 100) return `Exceptional parliamentary engagement — ${mp.debates_participated} debate interventions, highest in Tamil Nadu. ${rankStr}.`;
  if (mp.questions_asked >= 200) return `Among the most prolific questioners in TN with ${mp.questions_asked} questions raised. ${rankStr}.`;
  if (mp.private_member_bills >= 3) return `Strong legislative initiative with ${mp.private_member_bills} private member bills — above state norm. ${rankStr}.`;
  if (score >= 70) return `Consistently above state average on attendance, questions, and debates. ${rankStr}.`;
  if (score >= 45) return `Solid parliamentary presence. ${mp.debates_participated < 15 ? "Debate participation is limited" : "Questions raised are below average"} — scope for stronger constituency advocacy. ${rankStr}.`;
  return `Below state average on most metrics. Low ${mp.attendance < 70 ? "attendance" : "question volume"} is the primary drag on performance. ${rankStr}.`;
}

function scoreAll(data: MP[]): ScoredMP[] {
  const scores = data.map(mp => ({ mp, score: computeScore(mp) }));
  const sorted = [...scores].sort((a, b) => b.score - a.score);
  const byAttendance = [...data].sort((a, b) => b.attendance - a.attendance);
  const byQuestions = [...data].sort((a, b) => b.questions_asked - a.questions_asked);

  return sorted.map((item, i) => {
    const { tier, tierColor } = computeTier(item.score);
    const rank = i + 1;
    return {
      ...item.mp,
      score: item.score,
      rank,
      tier,
      tierColor,
      verdict: computeVerdict(item.mp, rank, data.length, item.score),
      attendanceRank: byAttendance.findIndex(m => m.constituency === item.mp.constituency) + 1,
      questionsRank: byQuestions.findIndex(m => m.constituency === item.mp.constituency) + 1,
    };
  });
}

// ── Embedded TN SVG paths ─────────────────────────────────────────────────────

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
const DP = { bg: "bg-slate-500/15", text: "text-slate-300", border: "border-slate-500/30", dot: "bg-slate-400", mapColor: "#94a3b8" };
const pc = (p: string) => PARTY_CONFIG[p] ?? DP;

// ── MP Briefs — add slug when brief is published ──────────────────────────────
const MP_BRIEFS: Record<string, string> = {
  "Thoothukkudi": "/tracker/kanimozhi-thoothukkudi",
};


const STATE_AVG = { attendance: 79.2, questions_asked: 113, debates_participated: 24 };

// ── Sub-components ────────────────────────────────────────────────────────────
function TierBadge({ tier, color }: { tier: string; color: string }) {
  const styles: Record<string, string> = {
    emerald: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    amber:   "bg-amber-500/15 text-amber-400 border-amber-500/30",
    rose:    "bg-rose-500/15 text-rose-400 border-rose-500/30",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${styles[color]}`}>
      <Award className="w-3 h-3" />{tier}
    </span>
  );
}

function ScoreRing({ score, color }: { score: number; color: string }) {
  const r = 28, circ = 2 * Math.PI * r;
  const fill = (score / 100) * circ;
  const colors: Record<string, string> = { emerald: "#10b981", amber: "#f59e0b", rose: "#f43f5e" };
  return (
    <div className="relative w-20 h-20 flex items-center justify-center">
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 72 72">
        <circle cx="36" cy="36" r={r} fill="none" stroke="#1e293b" strokeWidth="5" />
        <circle cx="36" cy="36" r={r} fill="none" stroke={colors[color]} strokeWidth="5"
          strokeDasharray={`${fill} ${circ}`} strokeLinecap="round" className="transition-all duration-700" />
      </svg>
      <div className="text-center z-10">
        <div className="text-xl font-bold text-white leading-none">{score}</div>
        <div className="text-xs text-slate-500 leading-none">/100</div>
      </div>
    </div>
  );
}

function RankIndicator({ rank, total, label }: { rank: number; total: number; label: string }) {
  const pct = rank / total;
  const isTop = pct <= 0.25;
  const isBottom = pct >= 0.75;
  return (
    <div className="flex items-center gap-2">
      {isTop ? <ArrowUp className="w-3 h-3 text-emerald-400" /> : isBottom ? <ArrowDown className="w-3 h-3 text-rose-400" /> : <Minus className="w-3 h-3 text-slate-400" />}
      <span className="text-xs text-slate-400">{label}: <span className="text-white font-semibold">#{rank}</span> of {total}</span>
    </div>
  );
}

function MetricBar({ label, value, max, suffix = "", barClass = "bg-slate-400", note, avgLine }: {
  label: string; value: number; max: number; suffix?: string; barClass?: string; note?: string; avgLine?: number;
}) {
  const pct = Math.min((value / max) * 100, 100);
  const avgPct = avgLine ? Math.min((avgLine / max) * 100, 100) : null;
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold tracking-widest uppercase text-slate-400">{label}</span>
        <span className="text-base font-bold text-white tabular-nums">{value}{suffix}</span>
      </div>
      <div className="relative h-2 w-full rounded-full bg-slate-700 overflow-visible">
        <div className={`h-full rounded-full transition-all duration-700 ${barClass}`} style={{ width: `${pct}%` }} />
        {avgPct !== null && (
          <div className="absolute top-1/2 -translate-y-1/2 w-0.5 h-4 bg-slate-400/60 rounded" style={{ left: `${avgPct}%` }} title={`State avg: ${avgLine}`} />
        )}
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
        : <span className="text-xs text-slate-500 bg-slate-700/40 border border-slate-600/30 rounded-lg px-3 py-2 mt-1">
            📊 Qualitative briefs in preparation — quantitative data live.
          </span>
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

// ── Map ───────────────────────────────────────────────────────────────────────
// ── Main ──────────────────────────────────────────────────────────────────────
const STATIC_DATA: MP[] = [{"constituency":"Krishnagiri","mp_name":"K Gopinath","party":"Indian National Congress","term":"First Term","attendance":74.8,"questions_asked":57,"debates_participated":6,"private_member_bills":0,"mplads_utilized":null,"primary_spending_sector":null,"policy_narrative":null},{"constituency":"Tiruvannamalai","mp_name":"C N Annadurai","party":"Dravida Munnetra Kazhagam","term":"Second Term","attendance":70.4,"questions_asked":231,"debates_participated":37,"private_member_bills":3,"mplads_utilized":null,"primary_spending_sector":null,"policy_narrative":null},{"constituency":"Vellore","mp_name":"D M Kathir Anand","party":"Dravida Munnetra Kazhagam","term":"Second Term","attendance":78.5,"questions_asked":144,"debates_participated":43,"private_member_bills":3,"mplads_utilized":null,"primary_spending_sector":null,"policy_narrative":null},{"constituency":"Thoothukkudi","mp_name":"Kanimozhi Karunanidhi","party":"Dravida Munnetra Kazhagam","term":"Second Term","attendance":69.6,"questions_asked":93,"debates_participated":28,"private_member_bills":3,"mplads_utilized":36,"primary_spending_sector":"Community infrastructure — crèches, anganwadis, community centres, school rooms, water tanks","policy_narrative":"Spending concentrated on coastal and working-class community infrastructure. No vanity projects. Pattern reflects parliamentary priorities — women and child welfare, civic basics for Thoothukkudi's fishing and salt worker communities. Private Member Bills introduced (5 Dec 2025): Salt Workers Welfare Bill, Death Penalty Abolition Bill, and Climate Change (Mitigation and Adaptation) Bill — reflecting both constituency-specific and national rights advocacy."},{"constituency":"Virudhunagar","mp_name":"Manickam Tagore B","party":"Indian National Congress","term":"Third Term","attendance":88.9,"questions_asked":148,"debates_participated":47,"private_member_bills":3,"mplads_utilized":null,"primary_spending_sector":null,"policy_narrative":null},{"constituency":"Ramanathapuram","mp_name":"Navaskani K","party":"Indian Union Muslim League","term":"Second Term","attendance":83.0,"questions_asked":203,"debates_participated":187,"private_member_bills":3,"mplads_utilized":null,"primary_spending_sector":null,"policy_narrative":null},{"constituency":"Karur","mp_name":"S Jothimani","party":"Indian National Congress","term":"Second Term","attendance":94.8,"questions_asked":139,"debates_participated":42,"private_member_bills":3,"mplads_utilized":null,"primary_spending_sector":null,"policy_narrative":null},{"constituency":"Chennai South","mp_name":"T Sumathy Alias Thamizhachi Thangapandian","party":"Dravida Munnetra Kazhagam","term":"Second Term","attendance":81.5,"questions_asked":149,"debates_participated":65,"private_member_bills":5,"mplads_utilized":null,"primary_spending_sector":null,"policy_narrative":null},{"constituency":"Chennai North","mp_name":"Kalanidhi Veeraswamy","party":"Dravida Munnetra Kazhagam","term":"Second Term","attendance":85.2,"questions_asked":131,"debates_participated":21,"private_member_bills":1,"mplads_utilized":null,"primary_spending_sector":null,"policy_narrative":null},{"constituency":"Arani","mp_name":"Tharaniventhan M S","party":"Dravida Munnetra Kazhagam","term":"First Term","attendance":68.1,"questions_asked":110,"debates_participated":7,"private_member_bills":0,"mplads_utilized":null,"primary_spending_sector":null,"policy_narrative":null},{"constituency":"Nilgiris","mp_name":"Raja A","party":"Dravida Munnetra Kazhagam","term":"Sixth Term","attendance":68.9,"questions_asked":124,"debates_participated":7,"private_member_bills":0,"mplads_utilized":null,"primary_spending_sector":null,"policy_narrative":null},{"constituency":"Perambalur","mp_name":"Arun Nehru","party":"Dravida Munnetra Kazhagam","term":"First Term","attendance":83.0,"questions_asked":71,"debates_participated":30,"private_member_bills":0,"mplads_utilized":null,"primary_spending_sector":null,"policy_narrative":null},{"constituency":"Viluppuram","mp_name":"D Ravi Kumar","party":"Viduthalai Chiruthaigal Katchi","term":"Second Term","attendance":58.5,"questions_asked":115,"debates_participated":18,"private_member_bills":0,"mplads_utilized":null,"primary_spending_sector":null,"policy_narrative":null},{"constituency":"Chennai Central","mp_name":"Dayanidhi Maran","party":"Dravida Munnetra Kazhagam","term":"Fourth Term","attendance":67.4,"questions_asked":87,"debates_participated":5,"private_member_bills":0,"mplads_utilized":null,"primary_spending_sector":null,"policy_narrative":null},{"constituency":"Tenkasi","mp_name":"Rani Srikumar","party":"Dravida Munnetra Kazhagam","term":"First Term","attendance":90.4,"questions_asked":39,"debates_participated":19,"private_member_bills":0,"mplads_utilized":36,"primary_spending_sector":"Community infrastructure \u2014 cr\u00e8ches, anganwadis, community centres, school rooms, water tanks","policy_narrative":"Spending concentrated on coastal and working-class community infrastructure. No vanity projects. Pattern reflects parliamentary priorities \u2014 women and child welfare, civic basics for Thoothukkudi's fishing and salt worker communities. Private Member Bills introduced (5 Dec 2025): Salt Workers Welfare Bill, Death Penalty Abolition Bill, and Climate Change (Mitigation and Adaptation) Bill \u2014 reflecting both constituency-specific and national rights advocacy."},{"constituency":"Tiruchirappalli","mp_name":"Durai Vaiko","party":"Marumalarchi Dravida Munnetra Kazhagam","term":"First Term","attendance":83.0,"questions_asked":87,"debates_participated":23,"private_member_bills":0,"mplads_utilized":null,"primary_spending_sector":null,"policy_narrative":null},{"constituency":"Pollachi","mp_name":"Eswarasamy K","party":"Dravida Munnetra Kazhagam","term":"First Term","attendance":81.5,"questions_asked":123,"debates_participated":19,"private_member_bills":0,"mplads_utilized":null,"primary_spending_sector":null,"policy_narrative":null},{"constituency":"Kancheepuram","mp_name":"Selvam G","party":"Dravida Munnetra Kazhagam","term":"Second Term","attendance":93.3,"questions_asked":224,"debates_participated":16,"private_member_bills":0,"mplads_utilized":null,"primary_spending_sector":null,"policy_narrative":null},{"constituency":"Coimbatore","mp_name":"Ganapathy Rajkumar P","party":"Dravida Munnetra Kazhagam","term":"First Term","attendance":89.6,"questions_asked":112,"debates_participated":14,"private_member_bills":0,"mplads_utilized":null,"primary_spending_sector":null,"policy_narrative":null},{"constituency":"Erode","mp_name":"K E Prakash","party":"Dravida Munnetra Kazhagam","term":"First Term","attendance":88.1,"questions_asked":85,"debates_participated":17,"private_member_bills":0,"mplads_utilized":null,"primary_spending_sector":null,"policy_narrative":null},{"constituency":"Tiruppur","mp_name":"Subbarayan K","party":"Communist Party of India","term":"Third Term","attendance":58.5,"questions_asked":121,"debates_participated":22,"private_member_bills":0,"mplads_utilized":null,"primary_spending_sector":null,"policy_narrative":null},{"constituency":"Sivaganga","mp_name":"Karti P Chidambaram","party":"Indian National Congress","term":"Second Term","attendance":85.2,"questions_asked":64,"debates_participated":13,"private_member_bills":0,"mplads_utilized":null,"primary_spending_sector":null,"policy_narrative":null},{"constituency":"Cuddalore","mp_name":"M K Vishnu Prasad","party":"Indian National Congress","term":"Second Term","attendance":88.9,"questions_asked":123,"debates_participated":18,"private_member_bills":0,"mplads_utilized":null,"primary_spending_sector":null,"policy_narrative":null},{"constituency":"Kallakurichi","mp_name":"Malaiyarasan D","party":"Dravida Munnetra Kazhagam","term":"First Term","attendance":88.9,"questions_asked":124,"debates_participated":14,"private_member_bills":0,"mplads_utilized":null,"primary_spending_sector":null,"policy_narrative":null},{"constituency":"Dharmapuri","mp_name":"Mani A","party":"Dravida Munnetra Kazhagam","term":"First Term","attendance":48.9,"questions_asked":110,"debates_participated":4,"private_member_bills":0,"mplads_utilized":null,"primary_spending_sector":null,"policy_narrative":null},{"constituency":"Namakkal","mp_name":"Matheswaran V S","party":"Dravida Munnetra Kazhagam","term":"First Term","attendance":70.4,"questions_asked":95,"debates_participated":7,"private_member_bills":0,"mplads_utilized":null,"primary_spending_sector":null,"policy_narrative":null},{"constituency":"Thanjavur","mp_name":"Murasoli S","party":"Dravida Munnetra Kazhagam","term":"First Term","attendance":86.7,"questions_asked":46,"debates_participated":12,"private_member_bills":0,"mplads_utilized":null,"primary_spending_sector":null,"policy_narrative":null},{"constituency":"Tirunelveli","mp_name":"Robert Bruce C","party":"Indian National Congress","term":"First Term","attendance":93.3,"questions_asked":51,"debates_participated":17,"private_member_bills":0,"mplads_utilized":null,"primary_spending_sector":null,"policy_narrative":null},{"constituency":"Arakkonam","mp_name":"S Jagathratchakan","party":"Dravida Munnetra Kazhagam","term":"Fifth Term","attendance":43.0,"questions_asked":141,"debates_participated":8,"private_member_bills":0,"mplads_utilized":null,"primary_spending_sector":null,"policy_narrative":null},{"constituency":"Madurai","mp_name":"S Venkatesan","party":"Communist Party of India (Marxist)","term":"Second Term","attendance":65.9,"questions_asked":99,"debates_participated":13,"private_member_bills":0,"mplads_utilized":null,"primary_spending_sector":null,"policy_narrative":null},{"constituency":"Dindigul","mp_name":"Sachithanantham R","party":"Communist Party of India (Marxist)","term":"First Term","attendance":91.9,"questions_asked":96,"debates_participated":22,"private_member_bills":0,"mplads_utilized":null,"primary_spending_sector":null,"policy_narrative":null},{"constituency":"Tiruvallur","mp_name":"Sasikanth Senthil","party":"Indian National Congress","term":"First Term","attendance":86.7,"questions_asked":95,"debates_participated":14,"private_member_bills":0,"mplads_utilized":null,"primary_spending_sector":null,"policy_narrative":null},{"constituency":"Nagapattinam","mp_name":"Selvaraj V","party":"Communist Party of India","term":"First Term","attendance":85.9,"questions_asked":126,"debates_participated":16,"private_member_bills":0,"mplads_utilized":null,"primary_spending_sector":null,"policy_narrative":null},{"constituency":"Mayiladuthurai","mp_name":"Sudha R","party":"Indian National Congress","term":"First Term","attendance":93.3,"questions_asked":88,"debates_participated":19,"private_member_bills":0,"mplads_utilized":null,"primary_spending_sector":null,"policy_narrative":null},{"constituency":"Salem","mp_name":"Selvaganapathi T.M.","party":"Dravida Munnetra Kazhagam","term":"Second Term","attendance":77.0,"questions_asked":145,"debates_participated":19,"private_member_bills":0,"mplads_utilized":null,"primary_spending_sector":null,"policy_narrative":null},{"constituency":"Sriperumbudur","mp_name":"T R Baalu","party":"Dravida Munnetra Kazhagam","term":"Seventh Term","attendance":74.8,"questions_asked":89,"debates_participated":15,"private_member_bills":0,"mplads_utilized":null,"primary_spending_sector":null,"policy_narrative":null},{"constituency":"Theni","mp_name":"Tamilselvan Thanga","party":"Dravida Munnetra Kazhagam","term":"First Term","attendance":80.0,"questions_asked":86,"debates_participated":26,"private_member_bills":0,"mplads_utilized":null,"primary_spending_sector":null,"policy_narrative":null},{"constituency":"Chidambaram","mp_name":"Thirumaavalavan Tholkappiyan","party":"Viduthalai Chiruthaigal Katchi","term":"Third Term","attendance":64.4,"questions_asked":115,"debates_participated":16,"private_member_bills":0,"mplads_utilized":null,"primary_spending_sector":null,"policy_narrative":null},{"constituency":"Kanniyakumari","mp_name":"Vijayakumar Alias Vijay Vasanth","party":"Indian National Congress","term":"Second Term","attendance":91.1,"questions_asked":172,"debates_participated":29,"private_member_bills":0,"mplads_utilized":null,"primary_spending_sector":null,"policy_narrative":null}];

export function MPTracker() {
  const [raw, setRaw] = useState<MP[]>([]);
  const [selected, setSelected] = useState<ScoredMP | null>(null);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [cmpA, setCmpA] = useState("");
  const [cmpB, setCmpB] = useState("");
  const [view, setView] = useState<"profile" | "leaderboard">("profile");

  const data: ScoredMP[] = useMemo(() => scoreAll(raw), [raw]);

  useEffect(() => {
    setRaw(STATIC_DATA);
  }, []);

  useEffect(() => {
    if (data.length && !selected) {
      const sorted = [...data].sort((a, b) => a.constituency.localeCompare(b.constituency));
      setSelected(sorted[0]);
      setCmpA(sorted[0]?.constituency ?? "");
      setCmpB(sorted[1]?.constituency ?? "");
    }
  }, [data]);

  const alphabetical = useMemo(() => [...data].sort((a, b) => a.constituency.localeCompare(b.constituency)), [data]);
  const filtered = alphabetical.filter(m =>
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
    { metric: "Score",      [nameA]: mpA.score, [nameB]: mpB.score },
  ] : [];

  if (!data.length) return (
    <section className="bg-slate-900 min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-slate-600 border-t-slate-300 rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm text-slate-400">Loading legislative data…</p>
      </div>
    </section>
  );

  return (
    <section className="bg-slate-900 min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-semibold tracking-widest uppercase text-slate-400 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />Independent Legislative Analytics
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Tamil Nadu MP Performance Tracker</h1>
          <p className="text-slate-400 text-sm max-w-xl">Legislative metrics for all 39 Lok Sabha MPs — 18th Lok Sabha. Score = attendance (30%) + questions (40%) + debates (20%) + bills (10%).</p>
        </div>

        {/* View toggle */}
        <div className="flex gap-2">
          {(["profile", "leaderboard"] as const).map(v => (
            <button key={v} onClick={() => setView(v)}
              className={`px-4 py-2 text-sm font-medium rounded-xl border transition-colors capitalize ${view === v ? "bg-slate-700 border-slate-500 text-white" : "bg-slate-800/40 border-slate-700 text-slate-400 hover:border-slate-500"}`}>
              {v === "profile" ? "MP Profile" : "Leaderboard"}
            </button>
          ))}
        </div>

        {/* Leaderboard view */}
        {view === "leaderboard" && (
          <div className="rounded-2xl border border-slate-700 bg-slate-800/40 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-700/50">
              <p className="text-xs font-semibold tracking-widest uppercase text-slate-400">All 39 TN MPs — Ranked by Performance Score</p>
            </div>
            <div className="divide-y divide-slate-700/30">
              {data.map((mp, i) => (
                <div key={mp.constituency}
                  onClick={() => { setSelected(mp); setView("profile"); }}
                  className="flex items-center gap-4 px-5 py-3 hover:bg-slate-700/30 cursor-pointer transition-colors">
                  <span className={`text-sm font-bold tabular-nums w-6 text-right ${i < 3 ? "text-amber-400" : "text-slate-500"}`}>{mp.rank}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-200 truncate">{mp.mp_name}</p>
                    <p className="text-xs text-slate-500 truncate">{mp.constituency}</p>
                  </div>
                  <PartyBadge party={mp.party} />
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="w-20 h-1.5 rounded-full bg-slate-700 overflow-hidden">
                      <div className={`h-full rounded-full bg-${mp.tierColor}-500`} style={{ width: `${mp.score}%` }} />
                    </div>
                    <span className="text-sm font-bold text-white tabular-nums w-8">{mp.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Profile view */}
        {view === "profile" && (
          <>
            {/* Selector */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              <div className="lg:col-span-5 space-y-4">
                <div className="relative">
                  <div className="flex items-center gap-3 px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl cursor-pointer hover:border-slate-500 transition-colors" onClick={() => setOpen(o => !o)}>
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="flex-1 text-sm font-medium text-slate-200 truncate">{selected ? `${selected.constituency} — ${selected.mp_name}` : "Select constituency…"}</span>
                    <Search className="w-4 h-4 text-slate-400 shrink-0" />
                  </div>
                  {open && (
                    <div className="absolute z-20 top-full mt-1 w-full bg-slate-800 border border-slate-700 rounded-xl shadow-2xl overflow-hidden">
                      <div className="p-2 border-b border-slate-700">
                        <input autoFocus className="w-full px-3 py-2 text-sm bg-slate-700 rounded-lg outline-none placeholder:text-slate-500 text-slate-100" placeholder="Search constituency or MP…" value={search} onChange={e => setSearch(e.target.value)} />
                      </div>
                      <ul className="max-h-64 overflow-y-auto divide-y divide-slate-700/50">
                        {filtered.map(mp => (
                          <li key={mp.constituency} onClick={() => { setSelected(mp); setOpen(false); setSearch(""); }}
                            className={`px-4 py-2.5 cursor-pointer hover:bg-slate-700 transition-colors flex items-center justify-between ${selected?.constituency === mp.constituency ? "bg-slate-700/50" : ""}`}>
                            <div>
                              <p className="text-sm font-medium text-slate-200">{mp.constituency}</p>
                              <p className="text-xs text-slate-400">{mp.mp_name}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`text-xs font-bold text-${mp.tierColor}-400`}>{mp.score}</span>
                              <span className={`text-xs px-2 py-0.5 rounded-full font-semibold border ${pc(mp.party).bg} ${pc(mp.party).text} ${pc(mp.party).border}`}>{mp.party.split(" ").map(w => w[0]).join("").slice(0, 4)}</span>
                            </div>
                          </li>
                        ))}
                        {!filtered.length && <li className="px-4 py-6 text-center text-sm text-slate-400">No results</li>}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Seat distribution */}
                <div className="rounded-2xl border border-slate-700 bg-slate-800/40 p-4">
                  <p className="text-xs font-semibold tracking-widest uppercase text-slate-400 mb-3">Seat Distribution</p>
                  {Object.entries(raw.reduce((a, m) => { a[m.party] = (a[m.party] || 0) + 1; return a; }, {} as Record<string, number>)).sort((a, b) => b[1] - a[1]).map(([party, count]) => (
                    <div key={party} className="flex items-center gap-2 mb-2 last:mb-0">
                      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: pc(party).mapColor }} />
                      <span className="text-xs text-slate-300 flex-1 truncate">{party}</span>
                      <span className="text-xs font-bold text-white tabular-nums">{count}</span>
                    </div>
                  ))}
                </div>
            </div>

            {/* MP Profile Scorecard */}
            {selected && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {/* Identity + Score */}
                  <div className="rounded-2xl border border-slate-700 bg-gradient-to-br from-slate-800 to-slate-900 p-6 flex flex-col justify-between">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex-1 min-w-0">
                        <div className="w-16 h-16 rounded-xl bg-slate-700 flex items-center justify-center mb-3">
                            <User className="w-7 h-7 text-slate-300" />
                          </div>
                        <h2 className="text-xl font-bold text-white leading-tight mb-1">{selected.mp_name}</h2>
                        <p className="text-slate-400 text-sm mb-3">{selected.constituency} Constituency</p>
                        <PartyBadge party={selected.party} />
                      </div>
                      <ScoreRing score={selected.score} color={selected.tierColor} />
                    </div>
                    <div className="space-y-2 mb-4">
                      <TierBadge tier={selected.tier} color={selected.tierColor} />
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed italic border-l-2 border-slate-600 pl-3">{selected.verdict}</p>
                    <div className="mt-4 pt-4 border-t border-slate-700 space-y-1.5">
                      <RankIndicator rank={selected.rank} total={data.length} label="Overall rank" />
                      <RankIndicator rank={selected.attendanceRank} total={data.length} label="Attendance rank" />
                      <RankIndicator rank={selected.questionsRank} total={data.length} label="Questions rank" />
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-700">
                      <p className="text-xs font-semibold tracking-widest uppercase text-slate-400 mb-1">Parliamentary Tenure</p>
                      <p className="text-sm font-bold text-slate-200">{selected.term}</p>
                    </div>
                    {/* Brief link — shown only when brief exists */}
                    {MP_BRIEFS[selected.constituency] && (
                      <a
                        href={MP_BRIEFS[selected.constituency]}
                        className="mt-4 flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 text-xs font-semibold tracking-wide hover:bg-indigo-500/25 transition-colors"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        Read Full Legislative Brief →
                      </a>
                    )}
                  </div>

                  {/* Metrics */}
                  <div className="lg:col-span-2 rounded-2xl border border-slate-700 bg-slate-800/60 p-6 space-y-6">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-slate-400" />
                      <span className="text-xs font-semibold tracking-widest uppercase text-slate-400">Legislative Performance</span>
                      <span className="ml-auto text-xs text-slate-500">Vertical line = state average</span>
                    </div>
                    <MetricBar label="Attendance" value={selected.attendance} max={100} suffix="%" barClass={selected.attendance >= 85 ? "bg-emerald-500" : selected.attendance >= 70 ? "bg-amber-400" : "bg-rose-500"} note={`State avg: ${STATE_AVG.attendance}%`} avgLine={STATE_AVG.attendance} />
                    <MetricBar label="Questions Asked" value={selected.questions_asked} max={250} barClass="bg-slate-400" note={`State avg: ${STATE_AVG.questions_asked}`} avgLine={STATE_AVG.questions_asked} />
                    <MetricBar label="Debates Participated" value={selected.debates_participated} max={200} barClass="bg-indigo-400" note={`State avg: ${STATE_AVG.debates_participated}`} avgLine={STATE_AVG.debates_participated} />
                    <MetricBar label="Private Member Bills" value={selected.private_member_bills} max={6} barClass="bg-amber-400" note="Max in TN: 5 bills" />
                  </div>
                </div>

                {/* Qualitative */}
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
                    <select value={val} onChange={e => set(e.target.value)} className="w-full px-3 py-2.5 text-sm bg-slate-700 border border-slate-600 rounded-xl text-slate-200 outline-none focus:border-slate-400 transition-colors appearance-none cursor-pointer">
                      {alphabetical.map(mp => <option key={mp.constituency} value={mp.constituency}>{mp.constituency} — {mp.mp_name} ({mp.score}/100)</option>)}
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
                        <TierBadge tier={mp.tier} color={mp.tierColor} />
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
          </>
        )}

        <p className="text-xs text-slate-500 text-right">Source: PRS India · 18th Lok Sabha · Data as of June 2026</p>
      </div>
    </section>
  );
}
