'use client'
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

type FAQ = { q: string; a: string };

const faqs: FAQ[] = [
  { q: "Is this webinar really free?", a: "Yes, it's a free 3-hour live masterclass." },
  { q: "Do I need prior knowledge about trading or investing?", a: "No prior experience required. We start with essentials and build up." },
  { q: "Will I get a recording if I can't attend live?", a: "We recommend attending live to benefit from the Q&A. Recording availability may vary." },
  { q: "What will I learn in this masterclass?", a: "Options basics, why traders fail, Delta and probabilities, and risk management." },
  { q: "How long is the masterclass?", a: "Approximately 3 hours including interactive exercises and Q&A." },
  { q: "Can I ask questions during the webinar?", a: "Yes, there is a live Q&A segment to take your questions." },
  { q: "What do I need to join the webinar?", a: "A stable internet connection and your email for the meeting link." },
  { q: "Is this suitable for someone with a full-time job?", a: "Absolutely. The session is designed to be practical and beginner-friendly." },
];

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 px-4 bg-white">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-black">
            Frequently Asked <span className="text-gradient-orange">Questions</span>
          </h2>
          <p className="text-muted-foreground mt-3">Find answers to common questions about the masterclass</p>
        </div>

        {/* Card */}
        <div className="rounded-3xl bg-white border border-black/5 shadow-[0_20px_40px_-18px_rgba(0,0,0,0.25)] overflow-hidden">
          {faqs.map((item, idx) => {
            const isOpen = openIndex === idx;
            const sectionId = `faq-panel-${idx}`;
            return (
              <div key={idx} className={`border-t ${idx === 0 ? 'border-t-0' : 'border-black/5'}`}>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left px-7 md:px-8 py-5 md:py-6 flex items-center justify-between hover:bg-black/[0.02] transition-colors"
                  aria-expanded={isOpen}
                  aria-controls={sectionId}
                >
                  <span className="text-base md:text-lg font-semibold text-black">{item.q}</span>
                  <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div id={sectionId} className="px-7 md:px-8 pb-6 -mt-2 text-muted-foreground text-sm md:text-base">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center mt-8 text-sm">
          <p className="text-muted-foreground">Still have questions? Don't worry!</p>
          <p className="text-black/70">Register now and ask your questions directly during the live Q&A session</p>
        </div>
      </div>
    </section>
  );
};


