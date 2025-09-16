'use client';

interface StatChipProps {
  stat: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function StatChip({ 
  stat, 
  className = '',
  style = {}
}: StatChipProps) {
  return (
    <div
      className={`inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[var(--ink-700)] to-[var(--ink-600)] border border-[var(--border-30)] text-[var(--text-100)] text-sm font-medium hover-lift ${className}`}
      style={style}
    >
      <div className="w-2 h-2 bg-[var(--acc-500)] rounded-full mr-2 flex-shrink-0" />
      {stat}
    </div>
  );
}
