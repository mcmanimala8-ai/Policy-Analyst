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
              Founder & Principal Analyst at Manimalachithamanan.in
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
                I run Manimalachithamanan.in as an independent Tamil Nadu governance desk focused on sub-national public sector operations, department-level execution, and political risk strategy. The work combines clean public data, field-level administrative understanding, and institutional writing.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                My focus is the space between policy announcement and public outcome: fiscal flows, district implementation, school and welfare delivery systems, and the operational bottlenecks that shape political trust. The aim is to produce technical briefs that are useful to think tanks, public sector professionals, journalists, and political consultancy teams.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                I am an IMPRI Data Analytics Fellow (2026), based in Chennai, with experience inside a Government of Tamil Nadu programme coordinating across 37,000+ school units. MA in Politics & International Relations, Central University of Gujarat. BA in History, Stella Maris College.
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