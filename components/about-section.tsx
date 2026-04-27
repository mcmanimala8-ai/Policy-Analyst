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
              Policy Research & Analysis
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
                I research the governance structures that decide whether policy actually reaches people — or disappears somewhere between a Union scheme and a Panchayat.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Currently an IMPRI Data Analytics Fellow (2026), I work at the intersection of fiscal federalism, platform economy regulation, and state-level program delivery. I've managed government programs across 37,000+ units in Tamil Nadu — which taught me that the gap between policy design and last-mile execution is where most good intentions go to die.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                MA in Politics & International Relations, Central University of Gujarat. BA in History & Tourism, Stella Maris College, Chennai.
              </p>
              
              <a 
                href="https://www.linkedin.com/in/manimala-c-29205b223/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
                <span>Connect on LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
