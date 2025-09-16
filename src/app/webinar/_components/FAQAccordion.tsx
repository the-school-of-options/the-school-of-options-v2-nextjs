'use client';

import { useState } from 'react';

interface FAQItem {
  q: string;
  a: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  className?: string;
}

export default function FAQAccordion({ items, className = '' }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {items.map((item, index) => (
        <div
          key={index}
          className="bg-gradient-to-br from-[var(--ink-800)] to-[var(--ink-700)] rounded-2xl border border-[var(--border-30)] overflow-hidden hover-lift"
        >
          <button
            onClick={() => handleToggle(index)}
            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-[var(--ink-700)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--acc-500)] focus:ring-inset"
            aria-expanded={openIndex === index}
            aria-controls={`faq-answer-${index}`}
          >
            <span className="font-medium text-[var(--text-100)] pr-4">
              {item.q}
            </span>
            <svg
              className={`w-5 h-5 text-[var(--text-70)] transition-transform duration-200 flex-shrink-0 ${
                openIndex === index ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <div
            id={`faq-answer-${index}`}
            className={`overflow-hidden transition-all duration-200 ${
              openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
            aria-hidden={openIndex !== index}
          >
            <div className="px-6 pb-4">
              <p className="text-[var(--text-70)] leading-relaxed">
                {item.a}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
