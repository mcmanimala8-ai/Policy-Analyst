import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Kanimozhi Karunanidhi — Thoothukkudi | MP Brief | Manimala Chithamanan",
  description: "Legislative intelligence brief on Kanimozhi Karunanidhi, MP for Thoothukkudi — 18th Lok Sabha. Performance score, parliamentary record, and policy analysis.",
}

export default function KanimozhiBriefPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />
      <div className="pt-20 max-w-3xl mx-auto px-6 py-16">

        {/* Breadcrumb */}
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-8">
          <a href="/tracker" className="hover:text-foreground transition-colors">MP Watch</a>
          <span className="mx-2">→</span>
          Legislative Intelligence
        </p>

        {/* Header */}
        <div className="border-b border-border pb-10 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-xs font-semibold tracking-widest uppercase text-red-400 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
            Dravida Munnetra Kazhagam
          </div>
          <h1 className="font-serif text-4xl md:text-5xl tracking-tight mb-3">
            Kanimozhi Karunanidhi
          </h1>
          <p className="text-xl text-muted-foreground mb-6">Thoothukkudi · Second Term · 18th Lok Sabha</p>

          {/* Score card */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            {[
              { label: "Performance Score", value: "44/100", note: "Active tier" },
              { label: "Rank", value: "#28", note: "of 39 TN MPs" },
              { label: "Attendance", value: "69.6%", note: "State avg: 79.2%" },
              { label: "Debates", value: "28", note: "State avg: 24" },
            ].map(({ label, value, note }) => (
              <div key={label} className="border border-border rounded-xl p-4 bg-card">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">{label}</p>
                <p className="text-2xl font-bold text-foreground">{value}</p>
                <p className="text-xs text-muted-foreground mt-1">{note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Body */}
        <article className="max-w-none space-y-0">

          <h2 className="font-serif text-2xl font-bold text-foreground mt-12 mb-4 pb-3 border-b border-border">The Gap</h2>
          <p className="text-muted-foreground leading-relaxed mb-5">
            Kanimozhi Karunanidhi has been a national voice for two decades — first in the Rajya Sabha, now in her second term in the Lok Sabha. She arrived with a reputation built on Tamil identity politics and Opposition advocacy. Her parliamentary record in the 18th Lok Sabha tells a more layered story: a legislator moving between constituency basics, civilisational politics, and national debates — sometimes in the same week.
          </p>

          <h2 className="font-serif text-2xl font-bold text-foreground mt-12 mb-4 pb-3 border-b border-border">Thoothukkudi</h2>
          <p className="text-muted-foreground leading-relaxed mb-5">
            Thoothukkudi is Tamil Nadu's southern port city — a coastal economy built on fishing, salt pans, and maritime trade. Kanimozhi's vision for this term is straightforward: Thoothukkudi people should not have to go to Chennai for jobs, IT infrastructure, or a better life. That one sentence explains every infrastructure question she has raised in Parliament — the railway connectivity, the gas pipeline, the semiconductor units, the highway maintenance. It is a development argument dressed as constituency service.
          </p>

          <h2 className="font-serif text-2xl font-bold text-foreground mt-12 mb-4 pb-3 border-b border-border">The Numbers</h2>
          <div className="overflow-x-auto my-8"><table className="w-full text-sm border-collapse">
            <thead className="bg-muted">
              <tr>
                <th className="border border-border px-4 py-2 text-left font-semibold text-foreground">Metric</th>
                <th className="border border-border px-4 py-2 text-left font-semibold text-foreground">Kanimozhi</th>
                <th className="border border-border px-4 py-2 text-left font-semibold text-foreground">State Average</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-border px-4 py-2 text-muted-foreground">Attendance</td><td className="border border-border px-4 py-2 text-muted-foreground">69.6%</td><td className="border border-border px-4 py-2 text-muted-foreground">79.2%</td></tr>
              <tr><td className="border border-border px-4 py-2 text-muted-foreground">Questions Asked</td><td className="border border-border px-4 py-2 text-muted-foreground">93</td><td className="border border-border px-4 py-2 text-muted-foreground">113</td></tr>
              <tr><td className="border border-border px-4 py-2 text-muted-foreground">Debates Participated</td><td className="border border-border px-4 py-2 text-muted-foreground">28</td><td className="border border-border px-4 py-2 text-muted-foreground">24</td></tr>
              <tr><td className="border border-border px-4 py-2 text-muted-foreground">Private Member Bills</td><td className="border border-border px-4 py-2 text-muted-foreground">3</td><td className="border border-border px-4 py-2 text-muted-foreground">0.2</td></tr>
              <tr><td className="border border-border px-4 py-2 text-muted-foreground">Performance Score</td><td className="border border-border px-4 py-2 text-muted-foreground">44/100</td><td className="border border-border px-4 py-2 text-muted-foreground">—</td></tr>
            </tbody>
          </table></div>
          <p className="text-muted-foreground leading-relaxed mb-5">
            Her interventions across seven sessions cover a consistent thematic range — environmental protection, minority rights, and the structural inequities baked into Centre-state relations. On delimitation, education grants under the concurrent list, and the recurring crisis of Tamil fishermen in Sri Lankan waters, she has been both early and persistent. A composite score of 44 out of 100 does not capture any of this. It is a starting point, not a verdict — and her record is one that deserves to be read carefully by anyone serious about understanding Tamil Nadu's representation in Parliament.
          </p>

          <h2 className="font-serif text-2xl font-bold text-foreground mt-12 mb-4 pb-3 border-b border-border">What the Numbers Miss</h2>

          <h3 className="text-base font-bold uppercase tracking-widest text-accent mt-10 mb-3">Fishermen</h3>
          <p className="text-muted-foreground leading-relaxed mb-5">
            Fishing is a major economic sector in Thoothukkudi — both mechanised and motorised, with well-developed socio-economic conditions for the community. The scale of the crisis is significant: between 2015 and 2025, 2,870 Tamil Nadu fishermen were arrested by Sri Lankan authorities. In 2024 alone, 526 were arrested — the highest in a decade. As of March 2025, 86 fishermen remain in Sri Lankan custody and 225 boats have not been returned. The Joint Working Group on Fisheries — the bilateral mechanism meant to resolve this — has met only six times in nine years.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-5">
            Kanimozhi returned to Parliament three times across three sessions, each time responding to fresh incidents. When Zero Hour interventions were not enough, she escalated to a Rule 197 Calling Attention Motion — forcing a public ministerial response on the floor of the House.
          </p>
          <p className="text-xs text-muted-foreground mt-2 mb-6 italic"><em>Source: Unstarred Question No. 4809, Ministry of External Affairs, answered 28 March 2025; Zero Hour interventions 6 August 2024 and 7 February 2025; Calling Attention Rule 197, 1 April 2025.</em></p>

          <h3 className="text-base font-bold uppercase tracking-widest text-accent mt-10 mb-3">Three Bills, One Day</h3>
          <p className="text-muted-foreground leading-relaxed mb-5">
            On 5th December 2025, Kanimozhi introduced three private member bills in a single day — the Salt Workers Welfare Bill, the Death Penalty Abolition Bill, and the Climate Change (Mitigation and Adaptation) Bill. The Salt Workers bill speaks directly to the coastal working communities of Thoothukkudi — the salt pan workers who remain among the most economically vulnerable in the constituency. The other two signal a legislator with national ambitions beyond her constituency — using Parliament not just to serve Thoothukkudi but to shape the country's conscience on justice and the environment.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-5">
            Private member bills almost never pass. She knows that. Introduction itself is the political act — a documented parliamentary position that says: this is where I stood, this is what I argued, this is the evidence I put before the House.
          </p>

          <h3 className="text-base font-bold uppercase tracking-widest text-accent mt-10 mb-3">Tamil Identity</h3>
          <p className="text-muted-foreground leading-relaxed mb-5">
            The Keezhadi excavation revealed an urban, literate settlement — evidence that Tamil civilisation's depth extends far beyond what official histories have acknowledged. Kanimozhi asked why the excavation report had still not been published, citing carbon dating verified by international laboratories including the US-based Beta Analytic Labs. The government's response was telling. ASI cited "deficiencies in methodology" in a report backed by international science. The question of whether Keezhadi has been recognised as a site of National Importance went unanswered — and that non-answer is itself a political statement.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-5">
            Her question on the three-language formula revealed a sharper asymmetry: Kendriya Vidyalayas in Tamil Nadu employ 86 Hindi teachers and 65 Sanskrit teachers — but only 24 Tamil teachers. That number, placed on parliamentary record, changes how a policy debate is framed.
          </p>
          <p className="text-xs text-muted-foreground mt-2 mb-6 italic"><em>Source: Unstarred Question No. 3655, Ministry of Culture, answered 11 August 2025; Unstarred Question No. 3785, Ministry of Education, answered 24 March 2025.</em></p>

          <h3 className="text-base font-bold uppercase tracking-widest text-accent mt-10 mb-3">Constituency Infrastructure</h3>
          <p className="text-muted-foreground leading-relaxed mb-5">
            Alongside her national advocacy, Kanimozhi has consistently raised constituency infrastructure in Parliament — railway connectivity, highway maintenance, the Kochi-Kanyakumari-Thoothukkudi gas pipeline, and Amrit Bharat station upgrades for Tiruchendur, Kovilpatti, and Tuticorin. She also pushed for a Greenfield airport in Tamil Nadu — a question that revealed the state government had not yet filed the necessary proposal with the Centre. These are not glamorous interventions. But they are the building blocks of her stated vision — that Thoothukkudi people should not have to travel to Chennai for what their own city should provide.
          </p>

          <h3 className="text-base font-bold uppercase tracking-widest text-accent mt-10 mb-3">Where the Money Goes</h3>
          <p className="text-muted-foreground leading-relaxed mb-5">
            Every MP receives ₹5 crore annually under MPLADS to spend on constituency development. The data shows Kanimozhi has disbursed ₹3.61 crore across 20 works in Thoothukkudi — community centres, crèches, anganwadis, school rooms, and water tanks. No vanity projects. No named infrastructure. The spending pattern mirrors her parliamentary priorities — coastal and working-class communities, women and child welfare, basic civic infrastructure.
          </p>
          <p className="text-xs text-muted-foreground mt-2 mb-6 italic"><em>Source: MPLADS Expenditure Data, Empowered Indian / Ministry of Statistics portal.</em></p>

          <h3 className="text-base font-bold uppercase tracking-widest text-accent mt-10 mb-3">National Consumer and Rights Advocacy</h3>
          <p className="text-muted-foreground leading-relaxed mb-5">
            Her parliamentary record extends beyond Tamil Nadu into national rights advocacy. A Starred Question on added sugar in Nestlé's Cerelac baby food questioned why the same product sold in India contains 2.7 grams of added sugar per serving while the UK and Germany versions contain none. A question on gender pay gap in Indian sports pushed for legislative change on equal pay for women athletes. A question on MBBS seat caps challenged the NMC's population-based formula that disadvantages states like Tamil Nadu. These are national issues she chose to raise — using her parliamentary access to widen the scope of what gets questioned.
          </p>

          <h2 className="font-serif text-2xl font-bold text-foreground mt-12 mb-4 pb-3 border-b border-border">What Kind of Parliamentarian</h2>
          <p className="text-muted-foreground leading-relaxed mb-5">
            Kanimozhi is a <strong className="text-foreground font-semibold">structural critic</strong> — a parliamentarian who uses questions, bills, and debates not primarily to solve immediate problems but to construct and contest narratives in the public record. She operates on three distinct policy registers simultaneously.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-5">
            The first is <strong className="text-foreground font-semibold">federal equity</strong> — delimitation, concurrent list education grants, centrally sponsored scheme fund release, MBBS seat caps, semiconductor allocation to Tamil Nadu. Every one of these is an argument that the Centre's policies structurally disadvantage states that performed well on development indicators. The second is <strong className="text-foreground font-semibold">civilisational sovereignty</strong> — Keezhadi, manuscripts, three-language formula, Waqf Bill opposition. She uses Parliament to contest the dominant cultural narrative with a counter-narrative rooted in Tamil civilisational depth. The third is <strong className="text-foreground font-semibold">rights-based advocacy</strong> — death penalty abolition, climate change, salt workers welfare, gender pay gap, baby food regulation, SC/ST scholarship income ceiling.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-5">
            Her record suggests a legislator who is comfortable being early and unpopular on an issue. Tamil Nadu raised the delimitation alarm two years before it became a national debate. She questioned the three-language formula when it was not yet politically fashionable. She raised Keezhadi when the report was being quietly buried. This is the posture of someone who trusts their own reading of a situation — not someone who waits for political consensus before speaking.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-5">
            The honest critique: raising issues matters. But a complete policy lens also asks — what changed because she raised it? The fishermen issue, despite three parliamentary interventions, still shows 86 people in custody and 225 boats confiscated. The Keezhadi report remains unpublished. The three-language asymmetry in Kendriya Vidyalayas remains unchanged.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-5">
            One detail worth noting: Kanimozhi was elevated to Deputy General Secretary of DMK during this term. Her parliamentary behaviour after the elevation shows no visible shift — the same constituency questions, the same fishermen interventions, the same Tamil identity advocacy. That consistency is either a sign of discipline — that party position has not diluted her focus — or it raises a question worth watching: as a senior party leader, should her legislative footprint be larger than what a score of 44 reflects?
          </p>

          <h2 className="font-serif text-2xl font-bold text-foreground mt-12 mb-4 pb-3 border-b border-border">The Question Worth Asking</h2>
          <p className="text-muted-foreground leading-relaxed mb-5">
            Parliamentary work disappears. A Chief Minister's decisions make front pages. An MLA's constituency work travels through local networks. But what an MP does in the Lok Sabha — the questions raised, the bills introduced, the Ministers confronted — rarely reaches the people who elected them. Kanimozhi's record is a case in point. A score of 44 out of 100 is what most people will see. What they will not see is three years of consistent pressure on fishermen's rights, a civilisational argument made on the floor of Parliament, three private member bills introduced in a single day, and a Greenfield airport question that exposed a gap in the state government's own planning.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-5">
            This platform exists to close that gap — to make Parliament visible to the people it represents, and to give every Tamil Nadu MP the scrutiny and recognition their work deserves.
          </p>

          <hr className="border-border my-10" />

          <p className="text-center italic text-lg text-foreground border-l-4 border-accent pl-6 my-10 text-xl">
            "For an MP caught between a dynasty's expectations and a constituency's needs, Kanimozhi Karunanidhi has found her own register — and the balance, it turns out, is the work."
          </p>

          <hr className="border-border my-10" />

          <h2 className="font-serif text-2xl font-bold text-foreground mt-12 mb-4 pb-3 border-b border-border">Sources</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6 text-sm">
            <li>PRS India — 18th Lok Sabha MP Tracker</li>
            <li>Sansad.in — Debate and Question records</li>
            <li>Lok Sabha Unstarred Questions: No. 95, 562, 646, 1575, 1658, 1793, 1976, 3655, 3785, 4809, 5149</li>
            <li>Lok Sabha Starred Questions: No. 274, 3846</li>
            <li>MPLADS Expenditure Portal — Empowered Indian / Ministry of Statistics</li>
            <li>Digital Sansad — Debate video records</li>
            <li>Rule 377 submissions and Zero Hour interventions, 18th Lok Sabha</li>
          </ul>

          <p className="text-xs text-muted-foreground mt-8">
            Published by Tamil Nadu Governance Desk · manimalachithamanan.in · June 2026<br />
            Data as of Session 7 — Budget 2026
          </p>

        </article>
      </div>
      <Footer />
    </main>
  )
}
