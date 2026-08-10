import { Linkedin } from "lucide-react"
import Image from "next/image"

export function AboutSection() {
  return (
    <section id="about" className="py-24 border-b border-border">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
              About
            </p>
            <h2 className="font-serif text-3xl md:text-4xl tracking-tight mb-8">
              Independent Researcher — Tamil Nadu Politics, Policy & Governance
            </h2>
            <div className="relative w-48 h-48 md:w-full md:h-72 overflow-hidden border border-border">
              <Image
                src="/manimala-profile.jpg"
                alt="Manimala Chithamanan"
                fill
                className="object-cover object-[center_15%]"
              />
            </div>
          </div>

          <div className="md:col-span-8">
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground leading-relaxed mb-6">
                This is an independent research project on Tamil Nadu's governance — the space between what policy promises and what actually reaches people. I bring together public data, administrative context, and political analysis to try to make sense of that gap.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Based in Chennai, I previously supported a Government of Tamil Nadu programme working with school-level administrative data, which shaped how I think about implementation and delivery. I hold an MA in Politics & International Relations from Central University of Gujarat, and a BA in History from Stella Maris College.
              </p>

              <div className="flex flex-wrap items-center gap-3 mb-6">
                <a
                  href="/writing/tndp-2022-gaps-and-recommendations"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-accent text-accent-foreground text-sm font-medium hover:bg-accent/90 transition-colors"
                >
                  Start here: Tamil Nadu Data Policy 2022 →
                </a>
                <a
                  href="/data"
                  className="inline-flex items-center gap-2 px-5 py-3 border border-border text-sm font-medium hover:bg-secondary hover:border-accent transition-colors"
                >
                  Explore the Data Lab →
                </a>
                <a
                  href="/tracker"
                  className="inline-flex items-center gap-2 px-5 py-3 border border-border text-sm font-medium hover:bg-secondary hover:border-accent transition-colors"
                >
                  View MP Watch →
                </a>
              </div>

              <a 
                href="https://www.linkedin.com/in/manimala-c-29205b223/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-[#0A66C2] text-white text-sm font-medium hover:bg-[#004182] transition-colors"
              >
                <Linkedin className="w-5 h-5" />
                <span>View Profile</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}