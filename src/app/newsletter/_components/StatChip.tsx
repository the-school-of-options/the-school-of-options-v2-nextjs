interface StatChipProps {
  children: string;
}

export default function StatChip({ children }: StatChipProps) {
  return (
    <div className="inline-flex items-center px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium border border-accent/20">
      {children}
    </div>
  );
}
