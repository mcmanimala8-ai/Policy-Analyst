"use client"

import { useState } from "react"

const questions = [
  {
    id: 1,
    question: "When was the last delimitation of Lok Sabha constituencies carried out in India?",
    options: ["1971", "1991", "2001", "2008"],
    correct: 3,
    explanation: "The last delimitation was carried out by the Delimitation Commission in 2008, based on the 2001 census. The 1976 constitutional freeze (extended by the 84th Amendment) prevented earlier revisions based on population growth.",
  },
  {
    id: 2,
    question: "Which of these states has the LOWEST Total Fertility Rate (TFR) according to NFHS-5 (2019-21)?",
    options: ["Andhra Pradesh", "Tamil Nadu", "West Bengal", "Punjab"],
    correct: 1,
    explanation: "Tamil Nadu has a TFR of 1.8 — one of the lowest in India, well below the replacement level of 2.1. This is a result of decades of investment in health and education, which is now paradoxically working against it in the delimitation debate.",
  },
  {
    id: 3,
    question: "What does the 16th Finance Commission determine?",
    options: [
      "India's foreign exchange reserves",
      "Tax sharing formula between Centre and States for 2026-31",
      "Number of Lok Sabha seats per state",
      "RBI's monetary policy framework"
    ],
    correct: 1,
    explanation: "The Finance Commission determines how central taxes are shared between the Union and States. The 16th Finance Commission is deciding the formula for 2026-31 — and its weighting of population metrics is a key concern for high-performing southern states.",
  },
  {
    id: 4,
    question: "The Social Security Code 2020 was passed to protect which category of workers?",
    options: ["Government employees", "Agricultural workers", "Gig and platform workers", "Factory workers only"],
    correct: 2,
    explanation: "The Social Security Code 2020 promised protections for gig and platform workers — including social security benefits and grievance mechanisms. However, implementation remains stalled, leaving millions of delivery workers, drivers, and freelancers without protection.",
  },
  {
    id: 5,
    question: "What is 'Subsidiarity' in governance?",
    options: [
      "A tax subsidy for small businesses",
      "The principle that decisions should be made by the authority closest to the citizen",
      "A constitutional amendment process",
      "A type of federal grant"
    ],
    correct: 1,
    explanation: "Subsidiarity means decisions should be made at the most local level possible — empowering Panchayats and Municipalities rather than centralising power at the Union level. It is the core argument for strengthening local bodies in Tamil Nadu's governance reform debate.",
  },
]

export function QuizSection() {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)

  const q = questions[current]

  const handleSelect = (index: number) => {
    if (answered) return
    setSelected(index)
    setAnswered(true)
    setShowExplanation(true)
    if (index === q.correct) setScore(s => s + 1)
  }

  const handleNext = () => {
    if (current + 1 < questions.length) {
      setCurrent(c => c + 1)
      setSelected(null)
      setAnswered(false)
      setShowExplanation(false)
    } else {
      setFinished(true)
    }
  }

  const handleRestart = () => {
    setCurrent(0)
    setSelected(null)
    setAnswered(false)
    setScore(0)
    setFinished(false)
    setShowExplanation(false)
  }

  const getScoreMessage = () => {
    if (score === 5) return "Perfect score! You think like a policy researcher. 🎯"
    if (score >= 3) return "Strong grasp of Indian governance. Keep reading! 📚"
    if (score >= 1) return "Good start — the systems are complex. Explore more! 🔍"
    return "Policy is tricky — but now you know more than before! 💡"
  }

  return (
    <section id="quiz" className="py-24 border-b border-border">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
            Interactive
          </p>
          <h2 className="font-serif text-3xl md:text-4xl tracking-tight mb-4">
            Policy Quiz
          </h2>
          <p className="text-muted-foreground max-w-xl leading-relaxed">
            How well do you understand India's governance systems? Test yourself on federalism, delimitation, and labour policy.
          </p>
        </div>

        {!finished ? (
          <div className="max-w-2xl">
            {/* Progress */}
            <div className="flex items-center gap-3 mb-8">
              {questions.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 transition-all duration-300 ${
                    i < current ? "bg-accent" :
                    i === current ? "bg-accent/50" :
                    "bg-border"
                  }`}
                />
              ))}
            </div>

            <p className="text-xs text-muted-foreground mb-4 uppercase tracking-widest">
              Question {current + 1} of {questions.length}
            </p>

            <h3 className="font-serif text-xl md:text-2xl text-foreground mb-8 leading-snug">
              {q.question}
            </h3>

            <div className="space-y-3 mb-6">
              {q.options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  className={`w-full text-left px-5 py-4 border text-sm transition-all duration-200 ${
                    !answered
                      ? "border-border hover:border-accent hover:bg-secondary/30 text-foreground"
                      : i === q.correct
                        ? "border-green-500 bg-green-500/10 text-green-400"
                        : i === selected && selected !== q.correct
                          ? "border-red-500 bg-red-500/10 text-red-400"
                          : "border-border text-muted-foreground opacity-50"
                  }`}
                >
                  <span className="font-medium mr-3 text-accent">
                    {String.fromCharCode(65 + i)}.
                  </span>
                  {option}
                </button>
              ))}
            </div>

            {showExplanation && (
              <div className="border-l-2 border-accent pl-4 mb-6 bg-secondary/20 p-4">
                <p className="text-xs uppercase tracking-widest text-accent mb-2">
                  {selected === q.correct ? "✓ Correct!" : "✗ Not quite —"}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {q.explanation}
                </p>
              </div>
            )}

            {answered && (
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                {current + 1 < questions.length ? "Next Question →" : "See Results →"}
              </button>
            )}
          </div>
        ) : (
          <div className="max-w-2xl">
            <div className="border border-border p-8 text-center">
              <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">Your Score</p>
              <p className="font-serif text-6xl text-accent mb-2">{score}/{questions.length}</p>
              <p className="text-muted-foreground mb-8">{getScoreMessage()}</p>
              <div className="flex flex-wrap gap-4 justify-center">
                <button
                  onClick={handleRestart}
                  className="px-6 py-3 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  Try Again
                </button>
                <a
                  href="/#writing"
                  className="px-6 py-3 border border-border text-sm font-medium hover:border-accent transition-colors"
                >
                  Read My Articles
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
