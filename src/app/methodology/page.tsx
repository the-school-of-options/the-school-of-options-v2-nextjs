import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const MethodologyPage = () => {
  const pillars = [
    {
      title: "Teaching",
      description: "Structured, clear concepts from basics to advanced strategies. Knowledge that connects directly to market application.",
      bullets: [
        "Foundations: derivatives, options, greeks, IV/theta",
        "Strategy theory with payoff understanding",
        "Clarity first: no jargon, no shortcuts"
      ],
      icon: "📘"
    },
    {
      title: "Training",
      description: "Hands-on skill building through backtesting, paper trading, and guided exercises that simulate live markets.",
      bullets: [
        "Historical backtests for conviction",
        "Paper trading with templates & rules",
        "Skill retention via repetition and review"
      ],
      icon: "⚙️"
    },
    {
      title: "Mentorship",
      description: "Personalized guidance, realistic goals, and trading psychology - so discipline becomes a habit.",
      bullets: [
        "Weekly mentorship calls",
        "Trade journaling & feedback",
        "Mindset, routines, risk discipline"
      ],
      icon: "🧭"
    }
  ];

  return (
    <>
      {/* SEO Meta Tags */}
      <title>Our Methodology - Teaching, Training, and Mentorship | The School of Options</title>
      <meta 
        name="description" 
        content="See how The School of Options builds confident traders through teaching, training, and mentorship - all logic-driven, data-backed, and transparent." 
      />
      
      <div className="min-h-screen bg-white">
        <Header />
        
        <main>
          {/* Page Hero */}
          <section className="py-16 lg:py-24 relative overflow-hidden" style={{
            background: 'linear-gradient(180deg, #0A2540 0%, #071A30 100%)'
          }}>
            <div className="container mx-auto px-6">
              <div className="max-w-[1120px] mx-auto">
                <div className="max-w-4xl mx-auto text-center">
                  <h1 className="text-[clamp(32px,5vw,52px)] font-extrabold mb-6 text-white leading-[1.2]">
                    Our Methodology - Teaching, Training, and Mentorship
                  </h1>
                  <p className="text-[clamp(18px,2.2vw,22px)] text-[#E6ECF5] leading-relaxed max-w-3xl mx-auto">
                    Becoming a confident trader takes more than theory. It takes structured knowledge, practical training, and ongoing mentorship.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Three Pillars */}
          <section className="py-16 lg:py-24">
            <div className="container mx-auto px-6">
              <div className="max-w-[1120px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {pillars.map((pillar, index) => (
                    <Card key={index} className="bg-white border border-black/6 rounded-[14px] shadow-[0_10px_24px_rgba(0,0,0,0.06)]">
                      <CardContent className="p-8">
                        <div className="text-center mb-6">
                          <span className="text-5xl mb-4 block">{pillar.icon}</span>
                          <h2 className="text-2xl font-bold mb-4 text-[#0A2540]">{pillar.title}</h2>
                          <p className="text-base text-[#4A5568] leading-relaxed mb-6">
                            {pillar.description}
                          </p>
                        </div>
                        <ul className="space-y-3">
                          {pillar.bullets.map((bullet, bulletIndex) => (
                            <li key={bulletIndex} className="flex items-start">
                              <span className="text-[#FF7A00] mr-3 mt-1 text-sm">•</span>
                              <span className="text-sm text-[#1A202C] leading-relaxed">{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Methodology Explainer */}
          <section className="py-16 lg:py-24 bg-[#F7F9FB]">
            <div className="container mx-auto px-6">
              <div className="max-w-[1120px] mx-auto">
                <div className="max-w-4xl mx-auto text-center">
                  <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-[#0A2540]">
                    Why Combining All Three Works
                  </h2>
                  <div className="space-y-6 mb-12">
                    <p className="text-lg text-[#4A5568] leading-relaxed">
                      Teaching alone gives knowledge, but without practice it fades.
                    </p>
                    <p className="text-lg text-[#4A5568] leading-relaxed">
                      Training alone builds skill, but without guidance it can drift.
                    </p>
                    <p className="text-lg text-[#4A5568] leading-relaxed">
                      Mentorship alone inspires, but without knowledge and practice it doesn't stick.
                    </p>
                    <p className="text-xl font-semibold text-[#0A2540] leading-relaxed">
                      Together they create a complete trader's journey: Knowledge → Skill → Confidence.
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-8 border border-[rgba(255,122,0,0.2)] shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
                    <p className="text-xl font-bold text-[#FF7A00]">
                      All logic. All data. 100% transparency.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 lg:py-24 relative overflow-hidden" style={{
            background: 'linear-gradient(180deg, #0A2540 0%, #071A30 100%)'
          }}>
            <div className="container mx-auto px-6">
              <div className="max-w-[1120px] mx-auto">
                <div className="max-w-4xl mx-auto text-center">
                  <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-white">
                    Ready to Learn the Right Way?
                  </h2>
                  <p className="text-lg mb-8 text-[#E6ECF5] max-w-3xl mx-auto">
                    Explore the 6-Month Mentorship that puts this methodology into action.
                  </p>
                  {/* <Button 
                    className="bg-[#FF7A00] text-white font-bold py-[14px] px-[22px] rounded-xl shadow-[0_10px_24px_rgba(255,122,0,0.25)] hover:bg-[#FF8A1E] hover:scale-[1.02] transition-all duration-200" 
                    asChild
                  >
                    <a 
                      href="https://www.kundankishore.in/courses/package-six-months-mentorship-on-options-trading-by-kundan-kishore"
                      target="_blank"
                      rel="noopener"
                      aria-label="Open mentorship program in a new tab"
                    >
                      Explore Mentorship Program
                    </a>
                  </Button> */}
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default MethodologyPage;