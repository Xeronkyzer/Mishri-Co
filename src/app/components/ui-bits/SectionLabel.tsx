export function SectionLabel({ children, color = 'var(--mishri-text-muted)' }: { children: React.ReactNode; color?: string }) {
  return (
    <div className="inline-flex items-center gap-3" style={{ color }}>
      <span className="h-px w-8" style={{ background: 'currentColor', opacity: 0.5 }} />
      <span className="text-[11px] tracking-[0.28em] uppercase font-medium">{children}</span>
    </div>
  );
}
