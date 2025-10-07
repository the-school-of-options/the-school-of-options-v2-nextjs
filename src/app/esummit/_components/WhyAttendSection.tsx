'use client'
import { CheckCircle2, XCircle, Target } from "lucide-react";

export const WhyAttendSection = () => {
  const problems = [
    "90% traders lose money consistently",
    "Trading without understanding fundamentals",
    "Following tips instead of strategy",
    "No proper risk management",
  ];

  const outcomes = [
    "Make informed trading decisions",
    "Understand probability of success",
    "Use Delta for better entries",
    "Implement proper risk management",
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-black">
            Why You <span className="text-gradient-orange">Must Attend</span>
          </h2>
          <p className="text-muted-foreground mt-2">
            Transform from random trading to strategic investing
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {/* Problems */}
          <div className="bg-card rounded-2xl border border-border p-5">
            <div className="flex items-center gap-2 mb-4">
              <XCircle className="w-5 h-5 text-destructive" />
              <h3 className="font-bold text-black">Common Problems</h3>
            </div>
            <div className="space-y-3">
              {problems.map((p, i) => (
                <div key={i} className="flex items-center gap-3 bg-destructive/10 text-black rounded-xl px-3 py-3">
                  <XCircle className="w-4 h-4 text-destructive flex-shrink-0" />
                  <span className="text-sm">{p}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Outcomes */}
          <div className="bg-card rounded-2xl border border-border p-5">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <h3 className="font-bold text-black">After This Session</h3>
            </div>
            <div className="space-y-3">
              {outcomes.map((o, i) => (
                <div key={i} className="flex items-center gap-3 bg-green-100 rounded-xl px-3 py-3">
                  <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span className="text-sm text-black">{o}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Callout Banner */}
        <div className="rounded-2xl bg-gradient-orange shadow-orange p-8 text-center">
          <div className="mx-auto mb-3 w-10 h-10 rounded-full bg-white/70 flex items-center justify-center">
            <Target className="w-6 h-6 text-black" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white/95">
            Trading with Knowledge is Strategy
          </h3>
          <p className="text-white/90 mt-2">
            Stop gambling, start strategizing with probability-based decisions
          </p>
        </div>
      </div>
    </section>
  );
};


