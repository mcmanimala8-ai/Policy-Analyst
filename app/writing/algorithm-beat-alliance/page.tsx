"use client"

import Link from "next/link"
import { ArrowLeft, Heart, Share2, MessageCircle, Linkedin } from "lucide-react"
import { useEffect } from "react"
import React from "react"


function LikeButton() {
  const [liked, setLiked] = React.useState(false)
  const [count, setCount] = React.useState(0)

  const handleLike = () => {
    if (!liked) {
      setLiked(true)
      setCount(c => c + 1)
    } else {
      setLiked(false)
      setCount(c => c - 1)
    }
  }

  return (
    <button
      onClick={handleLike}
      className={`inline-flex items-center gap-2 px-4 py-2 border text-sm transition-colors ${
        liked
          ? "border-accent text-accent bg-accent/10"
          : "border-border text-muted-foreground hover:text-foreground hover:border-accent"
      }`}
    >
      <Heart className={`w-4 h-4 ${liked ? "fill-accent" : ""}`} />
      {liked ? "Liked" : "Like"} {count > 0 && <span className="text-xs">{count}</span>}
    </button>
  )
}



function CusdisComments({ pageId, pageUrl, pageTitle }: { pageId: string, pageUrl: string, pageTitle: string }) {
  useEffect(() => {
    // Load Cusdis script
    const script = document.createElement('script')
    script.src = 'https://cusdis.com/js/cusdis.es.js'
    script.async = true
    script.defer = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <div className="mt-16 pt-8 border-t border-border">
      <h3 className="font-serif text-xl text-foreground mb-6">Comments</h3>
      <div
        id="cusdis_thread"
        data-host="https://cusdis.com"
        data-app-id="0e0f2871-7f53-4458-ba1e-2c2b3ce8126b"
        data-page-id={pageId}
        data-page-url={pageUrl}
        data-page-title={pageTitle}
      />
    </div>
  )
}

export default function AlgorithmBeatAlliancePage() {
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => e.preventDefault()
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === "c" || e.key === "p" || e.key === "s")) {
        e.preventDefault()
      }
    }
    document.addEventListener("contextmenu", handleContextMenu)
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  return (
    <main className="min-h-screen bg-background select-none">
      <div className="border-b border-border py-4 px-6">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/#writing" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Writing
          </Link>
          <span className="text-xs text-muted-foreground">© 2026 Manimala Chithamanan</span>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-6 py-16">
        <div className="flex flex-wrap gap-3 mb-8">
          <span className="text-xs uppercase tracking-widest text-accent font-medium">Political Analysis</span>
          <span className="text-xs text-muted-foreground">Tamil Nadu Elections</span>
          <span className="text-xs text-muted-foreground">May 2026</span>
        </div>

        <h1 className="font-serif text-3xl md:text-5xl leading-tight tracking-tight mb-6">
          When the Algorithm Beat the Alliance: Tamil Nadu 2026
        </h1>
        <p className="text-muted-foreground text-lg mb-4">By Manimala Chithamanan</p>
        <p className="text-muted-foreground text-sm italic mb-12">On anti-incumbency, digital campaigns, and what the left missed</p>

        <div className="space-y-6 text-muted-foreground leading-relaxed">

          <p>The 2026 election results shocked a lot of people in Tamil Nadu. A strong anti-incumbency wave overturned what many believed was politically impossible: a government with welfare delivery, administrative resources, and five full years in power still suffered a major collapse.</p>
          <p>What happened was not simply a defeat. It was a communication failure as much as a political one.</p>
          <p>The DMK government believed governance performance would naturally translate into votes. That assumption was not entirely wrong. But in today's digital political environment, performance alone is no longer enough. Narrative matters just as much, and sometimes even more. The DMK was busy building the state's plumbing. They forgot to write the state's story.</p>
          <p>The numbers tell the story clearly. DMK fell from 159 seats in 2021 to just 59 in 2026. Fifteen ministers lost their constituencies. Nowhere was this more visible than in Chennai, historically an impenetrable DMK fortress. Out of the 16 core constituencies within Chennai district, TVK swept 14. The only exceptions were Harbour, shielded by P.K. Sekarbabu, and Chepauk-Thiruvallikeni, where Deputy Chief Minister Udhayanidhi Stalin managed to hold on. The ultimate symbol came at the top: then-Chief Minister MK Stalin lost Kolathur, a seat he had held since 2011, to TVK's V.S. Babu by over 9,000 votes.</p>

          <div className="border border-border bg-secondary/20 p-6 my-8">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Tamil Nadu 2026: The Final Tally</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <span className="text-foreground font-medium">TVK</span><span>108 seats</span>
              <span className="text-foreground font-medium">DMK</span><span>59 seats</span>
              <span className="text-foreground font-medium">AIADMK</span><span>47 seats</span>
              <span className="text-foreground font-medium">INC</span><span>5 seats</span>
              <span className="text-foreground font-medium">VCK / Left / Others</span><span>11 seats</span>
              <span className="text-foreground font-medium">NDA</span><span>53 seats</span>
            </div>
            <p className="text-xs text-muted-foreground mt-4">Majority mark: 118. TVK fell 10 seats short.</p>
          </div>

          <p>Voter turnout rose dramatically too, from 72.7% in 2021 to a historic 85.1% in 2026. What makes this number even more significant is what happened beneath it. The Election Commission compressed the total registered voting base from 6.29 crore down to 5.73 crore through intensive electoral roll revisions. Yet the absolute number of people who walked to the booths still surged by over 27 lakh compared to 2021. Such a surge does not signal quiet satisfaction. It signals intense emotional mobilisation. People were not only voting for governance. Many were voting for a structural break.</p>
          <p>Tamil Nadu's economy had continued to grow. Manufacturing expanded. Welfare schemes continued. But governance statistics did not become political sentiment. Programmes like PEN struggled because they were built for a one-way communication model at a time when politics had already become interactive, emotional, and algorithm-driven. Traditional campaign structures were reacting slowly while social media narratives moved faster every day.</p>

          <section>
            <h2 className="font-serif text-2xl text-foreground mb-4 mt-10">The Campaign That Functioned Like a Startup</h2>
            <p>TVK's campaign did not operate like a traditional political party. It functioned more like a fast-growing digital startup, what we can rightly call an algorithmic insurgency.</p>
            <p className="mt-4">From late 2025 onwards, TVK built 34,000+ WhatsApp communities coordinated by digitally active young volunteers aged 19 to 35, trained in content sharing, emotional messaging, and fact-checking protocols. Their digital war room produced 120 to 150 pieces of vernacular video content daily, optimised for different platforms and demographic segments. They hired engineers and data scientists poached from Swiggy and PhonePe's growth teams to build proprietary sentiment tracking tools.</p>
            <p className="mt-4">But TVK did not just have a digital machine. It had an entire ecosystem of allied organisations doing different jobs simultaneously. Route Mafia built street-level presence. Voice of Commons built credibility with educated urban voters. The production company handled the content machine. DMK had PEN. TVK had an ecosystem. That difference is underreported.</p>
            <p className="mt-4">The algorithmic precision yielded micro-level results that tell the full story. In Tiruppattur, TVK's Seenivasa Sethupathy unseated DMK heavyweight K.R. Periyakaruppan, who had held the seat for 20 years, by a margin of exactly one single vote: 83,365 to 83,364. When a historical stronghold is dismantled by one ballot, the optimisation of an algorithm is no longer a metaphor. It is the definitive margin of victory.</p>
            <p className="mt-4">The UI was Vijay, the celebrity, the face, the parasocial connection. The UX was the 34,000 WhatsApp communities, the daily content machine, the sentiment tracking. DMK had the UI/UX gap: their governance delivery was real, but the user experience of being a DMK voter in 2026 had broken down completely.</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-foreground mb-4 mt-10">What DMK Missed While It Was Not Looking</h2>
            <p>One of the biggest strategic failures of this election has received almost no attention: DMK campaigned against AIADMK, not TVK.</p>
            <p className="mt-4">DMK's entire campaign machinery was calibrated to fight the opponent they knew. They kept attacking AIADMK's record, Edappadi's credibility, the ten-year AIADMK government. Meanwhile TVK was quietly eating into DMK's own vote bank and DMK barely responded. By the time they took TVK seriously, the narrative had already shifted. It is like preparing for the last war while a completely different battle was happening.</p>
            <p className="mt-4">Breaking the binary was also structurally easier than people acknowledge, and Vijay's hero image is the reason why. In Tamil cinema, the hero always stands outside the corrupt system and defeats it. Vijay had spent over 20 years playing exactly that character. When he entered politics, voters did not need to be convinced he was different. They had already watched him be different 30 times in a theatre. The political persona was pre-built through storytelling over two decades.</p>
            <p className="mt-4">Beneath this lies an ideological contradiction that few are willing to voice openly. TVK campaigned on Dravidian ideology, Periyar references, Ambedkarite politics, social justice. But during the campaign, TVK voices also told voters they do not need welfare, that they want dignity not handouts, targeting the very welfare model that Dravidian politics built its legitimacy on. The Dravidian welfare state exists precisely because the state intervened to lift marginalised communities. TVK campaigned against that intervention while claiming the ideology that justified it. As TVK assumes governance, they confront a welfare architecture they cannot dismantle. They are bound to continue it quietly, letting the no-freebies campaign rhetoric fade into institutional reality.</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-foreground mb-4 mt-10">Why TAPS Did Not Fully Work Politically</h2>
            <p>The Tamil Nadu Assured Pension Scheme (TAPS) became one of the most discussed welfare announcements before the election. Announced on January 3, 2026, just months before polling, TAPS guaranteed government employees 50% of their last drawn salary as pension, with a 10% employee contribution. Union leaders called it the end of a 23-year struggle. The cost to the state: Rs.13,000 crore upfront and Rs.11,000 crore annually, into a state already running a revenue deficit of over Rs.40,000 crore.</p>
            <p className="mt-4">And yet government employees still leaned toward anti-incumbency.</p>
            <p className="mt-4">The 10% employee contribution was not experienced as a reasonable pension design. It was felt as a penalty for stability, a signal that security would come but at a personal cost after decades of waiting. The DMK treated TAPS as a closing argument. Employees experienced it as a legacy debt finally, partially, reluctantly paid. The postal ballots, the votes of the very people who administer elections, were the first signal of this shift on counting day. When the people who run Tamil Nadu's 37,000 government schools and staff its hospitals vote against you after you gave them a pension scheme, the problem is not the Reels. It is the User Experience of governance itself.</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-foreground mb-4 mt-10">The Anti-Caste Party That Lost the Anti-Caste Vote</h2>
            <p>This is the contradiction that cuts deepest, because it strikes at the core of what DMK claims to be.</p>
            <p className="mt-4">DMK built its entire legitimacy on Periyar's self-respect movement, Ambedkarite politics, anti-Brahminism. That is not just ideology. It is the founding reason the party exists. But in five years of governance, caste atrocities continued. Working class economic anxiety was not addressed despite GDP growth. The gap between anti-caste rhetoric in speeches and anti-caste action in administration became too visible to ignore.</p>
            <p className="mt-4">This time, DMK lost the working class and Dalit vote to TVK. These are not historically swing voters. These are communities that voted Dravidian for generations because the Dravidian state was the only institutional protection they had. When they shift, it does not mean they stopped believing in social justice. It means they stopped believing DMK still delivers it.</p>
            <p className="mt-4">TVK, a party with no proven anti-caste track record, captured that vote by simply being new and being present. They did not win those votes on ideology. They won them on disappointment. And the dangerous question nobody is asking: if TVK does not deliver for Dalit and working class communities either, where does that vote go in 2031? That community could become permanently politically homeless.</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-foreground mb-4 mt-10">TVK: New Party, Real Contradictions</h2>
            <p>TVK is largely a party of new people. First-time politicians, young candidates, no prior party affiliation, people from outside the traditional political class. That is real and it matters.</p>
            <p className="mt-4">But there are exceptions. Some elected members came with criminal records. Some had held right-wing ideological positions before joining TVK, views that directly contradict the Dravidian social justice politics TVK campaigns on. These exceptions are a minority. But they are a visible and damaging minority, precisely because they contradict the new politics brand so sharply.</p>
            <p className="mt-4">The question is not whether TVK is simply old politics repackaged. Clearly it is not entirely. The question is whether Vijay has the political discipline to hold the new people to the ideology while managing the exceptions. New people with no governance experience, surrounded by a minority of old-network politicians who know how the system works. Who ends up teaching whom how things get done?</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-foreground mb-4 mt-10">The Debate Within the Secular and Left Space</h2>
            <p>After the results, divisions emerged among supporters of the secular alliance and left-leaning circles. Some blamed the DMK government. Others argued the focus should remain on protecting Tamil Nadu from national majoritarian politics. Another section responded by criticising voters directly, using words like "Tharkuri" and "Reels-knowledge" to belittle those who chose TVK. That reaction may become politically dangerous. Dismissing voters rarely helps rebuild political trust, raising a deeper systemic question:</p>

            <div className="border-l-2 border-accent pl-6 my-8">
              <p className="text-foreground italic">"When does a Secular Alliance stop being a coalition of values and start being a life jacket for parties the algorithm left behind?"</p>
            </div>

            <p>Another question rising within the left concerns Kanimozhi Karunanidhi's role, which was not projected well this time. The DMK cadre hopes to see Kanimozhi as the next leader of the party. Why, then, have senior leaders remained silent on succession? The silence is not just a party management question. It is a legitimacy gap. In a moment when DMK needs to rebuild its identity and its base, the absence of a clear next-generation narrative is itself a political choice, and not a neutral one.</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-foreground mb-4 mt-10">What DMK Needs to Understand Before 2031</h2>
            <p>For DMK, the lesson is not that social media alone wins elections. But ignoring digital political culture is no longer possible. The future belongs to hybrid politics.</p>
            <p className="mt-4">Former Chief Minister Stalin recently launched a public feedback initiative inviting citizens to share suggestions for party improvement through a dedicated website. The intent signals some acknowledgment that the party needs to listen differently. But a website consultation risks becoming another one-way communication exercise dressed in digital clothing. The real test is whether the feedback actually changes internal party behaviour, candidate selection, and ground presence between elections, not just before them.</p>
            <p className="mt-4">Compounding this challenge is the growing spread of fake news targeting the current government's welfare schemes. Misinformation about scheme eligibility and implementation is circulating actively on the same platforms that TVK used so effectively. DMK must now govern under constant narrative attack while rebuilding public trust. Managing this requires a proactive content strategy that reaches people before the misinformation does.</p>
            <p className="mt-4">There is also a question worth asking about why Modi's strategy, which TVK essentially borrowed and localised, has never worked directly in Tamil Nadu. The BJP has tried for decades and consistently failed. Language and cultural identity run too deep. Vijay succeeded where Modi could not precisely because Vijay is Tamil first, entirely rooted in Tamil culture, cinema, and language. TVK used Modi's playbook to build a wall against Modi in Tamil Nadu. The algorithmic insurgency that BJP perfected nationally got turned into a specifically Tamil, culturally grounded tool.</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-foreground mb-4 mt-10">Representation Still Remains Weak</h2>
            <p>Women remained underrepresented across parties, and transgender representation was nearly absent from the election landscape. For a state that often presents itself as socially progressive, this remains a significant contradiction. Digital campaigning may improve outreach, but representation still depends on political willingness. In the age of identity-driven social media politics, representation is not only a moral question. It is a strategic one too.</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-foreground mb-4 mt-10">What Should Return to Tamil Nadu Politics</h2>
            <p>One important lesson from 2026 is that politics cannot survive only through algorithms and content cycles. Grassroots activism still matters. But being specific about what that means matters too, because "grassroots" has become a word politicians use when they mean nothing in particular.</p>
            <p className="mt-4">Trust has to come first. It is not rebuilt through manifesto launches or pre-election announcements. It is rebuilt through consistent, unglamorous presence at the constituency level. Showing up when there is no camera. Solving the problems that will never trend.</p>
            <p className="mt-4">Law and order was a real and legitimate grievance that TVK exploited and DMK never adequately addressed. A government that delivers welfare but cannot deliver safety has only solved half the problem.</p>
            <p className="mt-4">Student unions in colleges are the most urgent piece of all. Tamil Nadu's college campuses are where the next political generation should be formed. But student union elections have largely disappeared from the state's colleges and universities. The decline began under MGR, whose administration systematically suppressed student movements through the late 1970s and into the 1980s, with institutional bans on campus unions solidifying into entrenched policy. While the Supreme Court mandated implementation of the Lyngdoh Committee recommendations nationwide, Tamil Nadu institutions largely do not comply <em>(Frontline, 2024)</em>. The result is no elected student bodies, no institutional representation, and no formal pipeline for developing future political leaders on campus.</p>
            <p className="mt-4">DMK-affiliated student wings have become increasingly hollow, present on paper and absent in practice. It is a policy failure that the DMK government itself could have addressed in five years and chose not to. Content without organisation produces consumers of politics, not practitioners of it. If the Dravidian movement truly believes in its own model, that belief has to be transmitted somewhere. It used to be transmitted on campuses. If DMK's student wings are not doing that work, TVK's content machine will continue to fill the vacuum. And the next generation of Dravidian voters will have no memory of what the movement actually stood for.</p>
          </section>

          <section className="border-t border-border pt-8 mt-10">
            <p>TVK won in 2026 with digital infrastructure. But digital infrastructure without ground presence is brittle. The algorithm defeated the alliance this time.</p>
            <p className="mt-4">The question for 2031 is not whether DMK will build a better algorithm. It is whether any party will build a politics worthy of the 85.1% who showed up. And whether the Dravidian movement will find its next generation in a classroom or a comment section.</p>
          </section>

          <section className="border-t border-border pt-8 mt-8">
            <h2 className="font-serif text-xl text-foreground mb-4">References</h2>
            <ol className="space-y-2 text-sm list-decimal list-inside">
              <li>Election Commission of India, Tamil Nadu 2026 General Assembly Results</li>
              <li>Frontline, "Student Unions in Tamil Nadu," 2024</li>
              <li>JACTTO-GEO Statement on TAPS, January 2026</li>
              <li>Periodic Labour Force Survey (PLFS), National Statistical Office</li>
            </ol>
          </section>

          <div className="border border-border/50 bg-secondary/20 p-4 text-xs text-muted-foreground text-center mt-12">
            © 2026 Manimala Chithamanan. All rights reserved. This work may not be reproduced, distributed, or transmitted in any form without prior written permission from the author.
          </div>

        </div>

        {/* Engagement Bar */}
        <div className="border-t border-border mt-16 pt-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <LikeButton />
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: "When the Algorithm Beat the Alliance: Tamil Nadu 2026",
                      url: window.location.href,
                    })
                  } else {
                    navigator.clipboard.writeText(window.location.href)
                    alert("Link copied to clipboard!")
                  }
                }}
                className="inline-flex items-center gap-2 px-4 py-2 border border-border text-sm text-muted-foreground hover:text-foreground hover:border-accent transition-colors"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
              <a
                href="https://www.linkedin.com/in/manimala-c-29205b223/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border border-border text-sm text-muted-foreground hover:text-foreground hover:border-accent transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                Follow
              </a>
            </div>
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground text-sm font-medium hover:bg-accent/90 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Discuss this piece
            </a>
          </div>
        </div>

        <CusdisComments
          pageId="algorithm-beat-alliance"
          pageUrl="https://manimalachithamanan.in/writing/algorithm-beat-alliance"
          pageTitle="When the Algorithm Beat the Alliance: Tamil Nadu 2026"
        />
      </article>
    </main>
  )
}
