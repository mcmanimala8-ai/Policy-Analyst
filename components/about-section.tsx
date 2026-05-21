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
              Policy Researcher · Political Analyst · Tamil Nadu
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
                I work on the unglamorous part of governance — the structures that decide whether a scheme actually reaches someone or quietly disappears in transit. Fiscal federalism, platform economy, last-mile delivery, state capacity. That's my space.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                I'm an IMPRI Data Analytics Fellow (2026), based in Chennai. I've spent time inside a Government of Tamil Nadu programme managing coordination across 37,000+ school units, which gave me a ground-level education in how policy actually works — or doesn't. I also write. Political analysis, governance commentary, the occasional provocation.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                MA in Politics & International Relations, Central University of Gujarat. BA in History, Stella Maris College.
              </p>

              
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
