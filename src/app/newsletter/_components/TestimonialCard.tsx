interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
}

export default function TestimonialCard({ quote, name, role }: TestimonialCardProps) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <blockquote className="text-foreground mb-4">
        <p className="text-base leading-relaxed">"{quote}"</p>
      </blockquote>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
          <span className="text-accent font-semibold text-sm">
            {name.split(' ').map(n => n[0]).join('')}
          </span>
        </div>
        <div>
          <div className="font-semibold text-foreground text-sm">{name}</div>
          <div className="text-muted-foreground text-xs">{role}</div>
        </div>
      </div>
    </div>
  );
}
