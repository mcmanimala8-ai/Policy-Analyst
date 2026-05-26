import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Link from "next/link"

export const metadata = {
  title: "Social Justice in Tamil Nadu | Tamil Nadu Governance Desk",
  description: "Two case studies on social justice in Tamil Nadu: SC/ST convictions and intercaste marriage. Where ideology meets reality.",
}

export default function SocialJusticeHubPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />
      <div className="pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-6">
          <section className="py-16 space-y-16">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-widest text-muted-foreground">
                Tamil Nadu Governance Desk
              </p>
              <h1 className="font-serif text-4xl md:text-5xl tracking-tight">
                Social Justice: Where Ideology Meets Reality
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
                Tamil Nadu's Dravidian movement promised to break caste boundaries and deliver justice to the oppressed. These two case studies show what actually happened — the gaps, the failures, and what they tell us about the limits of political reform.
              </p>
            </div>

            {/* Case Study 1: Convictions */}
            <Link href="/social-justice" className="group">
              <div className="border border-border bg-card hover:border-accent transition-colors p-8 rounded-lg space-y-4">
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Case Study 1</p>
                  <h2 className="font-serif text-3xl group-hover:text-accent transition-colors">
                    SC/ST Justice: The Conviction Pipeline Collapse
                  </h2>
                </div>
                
                <p className="text-muted-foreground">
                  Tamil Nadu registers more SC/ST atrocity cases than most states. Police investigate seriously. Charge sheets are filed. But somewhere between the courtroom and the conviction order, justice disappears. Only 8.5% of cases end in conviction — the rest vanish into judicial limbo.
                </p>

                <div className="grid md:grid-cols-3 gap-4 pt-4 border-t border-border">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Key Finding</p>
                    <p className="font-semibold text-lg">8.5%</p>
                    <p className="text-xs text-muted-foreground">Conviction rate from FIR</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Bottleneck</p>
                    <p className="font-semibold text-lg">23.4%</p>
                    <p className="text-xs text-muted-foreground">Cases reach trial stage</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Delay Effect</p>
                    <p className="font-semibold text-lg">4x</p>
                    <p className="text-xs text-muted-foreground">Conviction drop per 5 years</p>
                  </div>
                </div>

                <div className="pt-4">
                  <p className="text-sm font-semibold text-accent group-hover:underline">
                    Explore the full analysis →
                  </p>
                </div>
              </div>
            </Link>

            {/* Case Study 2: Marriage */}
            <Link href="/intercaste-marriage" className="group">
              <div className="border border-border bg-card hover:border-accent transition-colors p-8 rounded-lg space-y-4">
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Case Study 2</p>
                  <h2 className="font-serif text-3xl group-hover:text-accent transition-colors">
                    Caste and Marriage: The Dravidian Paradox
                  </h2>
                </div>
                
                <p className="text-muted-foreground">
                  Tamil Nadu claims to be the birthplace of anti-caste politics. Yet IHDS data shows TN has the strongest caste boundaries in Indian marriage — the lowest intercaste rates, virtually no cross-caste unions. The ideology of breaking caste hasn't translated to marriage, the deepest kinship practice.
                </p>

                <div className="grid md:grid-cols-3 gap-4 pt-4 border-t border-border">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Same-Caste Marriage</p>
                    <p className="font-semibold text-lg">97.4%</p>
                    <p className="text-xs text-muted-foreground">Highest in India</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Intercaste Rate</p>
                    <p className="font-semibold text-lg">2.6%</p>
                    <p className="text-xs text-muted-foreground">Lowest in India</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">National Comparison</p>
                    <p className="font-semibold text-lg">TN vs 9.9%</p>
                    <p className="text-xs text-muted-foreground">India average</p>
                  </div>
                </div>

                <div className="pt-4">
                  <p className="text-sm font-semibold text-accent group-hover:underline">
                    Explore the full analysis →
                  </p>
                </div>
              </div>
            </Link>

            {/* What This Means */}
            <div className="border border-border bg-card p-8 rounded-lg space-y-6">
              <div>
                <h3 className="font-serif text-2xl mb-4">What These Two Cases Tell Us</h3>
                <div className="space-y-4 text-sm text-muted-foreground">
                  <p>
                    <span className="text-accent font-semibold">1. Vertical Justice Failed:</span> The SC/ST PoA Act promises to protect Dalits from violence. But the courts can't deliver. Not because the law is weak, but because the judicial system has no capacity to try cases fast. Cases wait 5+ years, witnesses disappear, victims give up.
                  </p>
                  <p>
                    <span className="text-accent font-semibold">2. Horizontal Justice Stalled:</span> Dravidian ideology promised to break caste at the deepest level — kinship and marriage. But 97.4% of TN marriages are still within caste. Ideology changed politics. It didn't change behavior.
                  </p>
                  <p>
                    <span className="text-accent font-semibold">3. The Limits of Reform:</span> TN shows what 75 years of anti-caste politics can achieve: language policy, welfare delivery, electoral representation. But it also shows what it can't achieve: judicial speed and marriage customs. Some boundaries are deeper than politics.
                  </p>
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <h4 className="font-semibold mb-3">Data Integrity</h4>
                <p className="text-xs text-muted-foreground">
                  These case studies are built on official government data (NCRB, IHDS). We're not advocating for TN or against it. We're showing what the numbers actually say — and where they have gaps. The conviction pipeline data is solid. The marriage data has important caveats (demographic structure, measurement differences across states). Both are noted explicitly in each analysis.
                </p>
              </div>
            </div>

            {/* Next Steps */}
            <div className="border border-border bg-secondary/10 p-8 rounded-lg">
              <h3 className="font-serif text-xl mb-4">What's Next</h3>
              <p className="text-sm text-muted-foreground mb-4">
                The Social Justice domain will expand to include:
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-accent">→</span>
                  <span><strong>Intercaste Marriage Trends:</strong> Has the rate changed over time? Are younger cohorts marrying out more?</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-accent">→</span>
                  <span><strong>Caste-Wise Conviction Rates:</strong> Do SC victims see higher conviction rates than OBCs? Which castes see justice?</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-accent">→</span>
                  <span><strong>Women's Safety:</strong> Are cases involving violence against SC/ST women treated differently than against SC/ST men?</span>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  )
}
