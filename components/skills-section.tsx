"use client"

import { motion } from "framer-motion"

interface Skill {
  name: string
  category: "technical" | "domain" | "tools"
}

const skills: Skill[] = [
  // Technical Skills
  { name: "R Programming", category: "technical" },
  { name: "Stata", category: "technical" },
  { name: "Data Analytics", category: "technical" },
  { name: "Quantitative Modeling", category: "technical" },
  { name: "Statistical Analysis", category: "technical" },
  // Domain Expertise
  { name: "Policy Research", category: "domain" },
  { name: "State Planning", category: "domain" },
  { name: "Governance", category: "domain" },
  { name: "Program Management", category: "domain" },
  { name: "Stakeholder Coordination", category: "domain" },
  { name: "Federal Equity", category: "domain" },
  // Tools
  { name: "MS Office", category: "tools" },
  { name: "Research Design", category: "tools" },
  { name: "Report Writing", category: "tools" },
]

const categoryLabels = {
  technical: "Technical Skills",
  domain: "Domain Expertise", 
  tools: "Tools & Methods"
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  }
}

export function SkillsSection() {
  const categories = ["technical", "domain", "tools"] as const

  return (
    <section id="skills" className="py-24 border-b border-border">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
            Expertise
          </p>
          <h2 className="font-serif text-3xl md:text-4xl tracking-tight">
            Skills & Competencies
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {categories.map((category) => (
            <div key={category}>
              <h3 className="text-sm uppercase tracking-wider text-accent mb-6">
                {categoryLabels[category]}
              </h3>
              <motion.div 
                className="flex flex-wrap gap-2"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {skills
                  .filter(skill => skill.category === category)
                  .map((skill) => (
                    <motion.span
                      key={skill.name}
                      variants={itemVariants}
                      whileHover={{ 
                        scale: 1.05,
                        backgroundColor: "var(--accent)",
                        color: "var(--accent-foreground)"
                      }}
                      className="px-3 py-1.5 text-sm bg-secondary text-secondary-foreground border border-border cursor-default transition-colors"
                    >
                      {skill.name}
                    </motion.span>
                  ))}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
