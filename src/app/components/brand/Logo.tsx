export function Logo({ size = 28, withWordmark = true }: { size?: number; withWordmark?: boolean }) {
  return (
    <div className="flex items-center gap-2.5 select-none">
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
        <path d="M8 22 C8 16, 14 12, 20 12 C26 12, 32 16, 32 22 L30 34 C30 36, 28 37, 26 37 L14 37 C12 37, 10 36, 10 34 Z"
          stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round"/>
        <path d="M8 20 Q4 19, 5 16" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
        <path d="M32 20 Q36 19, 35 16" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
        <path d="M20 2 C20 2, 16 7, 16 10 A4 4 0 0 0 24 10 C24 7, 20 2, 20 2 Z"
          fill="var(--mishri-gold)"/>
      </svg>
      {withWordmark && (
        <span className="font-display text-[22px] leading-none tracking-tight" style={{ color: 'var(--mishri-text)' }}>
          Mishri
          <span className="font-display italic text-[13px] ml-1" style={{ color: 'var(--mishri-gold)' }}>&amp; Co.</span>
        </span>
      )}
    </div>
  );
}
