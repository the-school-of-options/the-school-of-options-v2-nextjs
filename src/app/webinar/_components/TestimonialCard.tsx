'use client';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
  style?: React.CSSProperties;
}

export default function TestimonialCard({ 
  testimonial, 
  className = '',
  style = {}
}: TestimonialCardProps) {
  return (
    <div
      className={`group relative ${className}`}
      style={style}
    >
      {/* Clean Card Design */}
      <div className="relative bg-[var(--primary-800)] border border-[var(--border-20)] rounded-3xl p-8 hover:border-[var(--accent-500)] transition-all duration-300 hover:shadow-xl hover:shadow-[var(--accent-500)]/10 h-full flex flex-col">
        {/* Quote Icon - Subtle */}
        <div className="absolute top-6 right-6 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
          <svg
            className="w-8 h-8 text-[var(--accent-500)]"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
          </svg>
        </div>
        
        {/* Testimonial Content */}
        <div className="relative z-10 flex flex-col flex-1">
          <blockquote className="text-[var(--text-100)] text-lg leading-relaxed mb-6 group-hover:text-[var(--accent-400)] transition-colors duration-300 flex-1">
            "{testimonial.quote}"
          </blockquote>
          
          {/* Author Info */}
          <div className="flex items-center gap-4 mt-auto">
            {/* Avatar Placeholder */}
            <div className="w-12 h-12 bg-gradient-to-br from-[var(--accent-500)] to-[var(--accent-400)] rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <span className="text-[var(--primary-900)] font-bold text-sm">
                {testimonial.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            
            <div>
              <div className="font-semibold text-[var(--text-100)] text-base">
                {testimonial.name}
              </div>
              <div className="text-[var(--text-60)] text-sm">
                {testimonial.role}
              </div>
            </div>
          </div>
        </div>
        
        {/* Hover Accent Line */}
        <div className="absolute bottom-0 left-8 right-8 h-1 bg-gradient-to-r from-[var(--accent-500)] to-[var(--accent-400)] rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
      </div>
    </div>
  );
}
