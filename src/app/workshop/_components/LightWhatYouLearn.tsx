'use client'
import { TrendingUp, Brain, Trophy } from "lucide-react";
import { useEffect, useState } from "react";

export const LightWhatYouLearn = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const learnings = [
    {
      icon: Brain,
      title: "Call & Put Basics",
      description: "Understanding options fundamentals without complex jargon.",
    },
    {
      icon: TrendingUp,
      title: "Why Traders Fail",
      description: "Common mistakes that lead to losses and how to avoid them.",
    },
    {
      icon: Trophy,
      title: "Delta Mastery",
      description: "Using probability to make informed trading decisions.",
    }
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">
            What You'll Learn in{" "}
            <span className="text-gradient-orange">3 Hours</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Practical insights that transform your trading approach
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {learnings.map((item, index) => (
            <div 
              key={index} 
              className="bg-card p-6 md:p-8 rounded-2xl shadow-lg border border-border hover:shadow-xl transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-orange flex items-center justify-center mb-6 shadow-orange">
                <item.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">
                {item.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Interactive Learning Highlight - Gold card */}
        <div className="mt-12 bg-white p-10 md:p-12 rounded-[28px] shadow-[0_24px_60px_-24px_rgba(0,0,0,0.25)] border border-black/5 text-center">
          <div className="inline-block bg-gradient-gold px-5 py-2.5 rounded-full text-sm font-bold mb-5 text-black shadow-gold">
            🎁 Interactive Learning
          </div>
          <h3 className="text-3xl md:text-4xl font-extrabold mb-4">
            <span className="text-gradient-gold">10 Real Exercises</span> <span className="text-black"> + Prizes</span>
          </h3>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Test your knowledge with practical scenarios and win exciting rewards for correct answers.
          </p>
        </div>
      </div>
    </section>
  );
};