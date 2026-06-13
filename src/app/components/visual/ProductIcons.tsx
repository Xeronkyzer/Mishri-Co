/**
 * Line-art SVG icons for the four products:
 * 1. GheeIcon: traditional clay pot with a dotted vertical line
 * 2. SarsoIcon: cold-pressed oil bottle with mustard drops/leaves
 * 3. HoneyIcon: forest honey box with a dipper stick
 * 4. MakhanaIcon: bowl of roasted lotus seeds
 */

export function GheeIcon({ className = "size-28" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Clay Matka Pot */}
      <path
        d="M 50 82 C 28 82, 22 66, 22 54 C 22 38, 38 34, 50 34 C 62 34, 78 38, 78 54 C 78 66, 72 82, 50 82 Z"
        stroke="var(--mishri-text)"
        strokeWidth="1.5"
        fill="var(--mishri-surface)"
      />
      {/* Collar/Neck */}
      <path
        d="M 36 34 C 36 30, 64 30, 64 34"
        stroke="var(--mishri-text)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Lid */}
      <path
        d="M 38 29 C 38 29, 50 24, 62 29"
        stroke="var(--mishri-text)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Gold details / dotted vertical line inside */}
      <path
        d="M 50 38 L 50 78"
        stroke="oklch(0.75 0.12 90)"
        strokeWidth="1.8"
        strokeDasharray="2 6"
        strokeLinecap="round"
      />
      {/* Ring string around pot neck */}
      <path
        d="M 35 37 Q 50 40, 65 37"
        stroke="oklch(0.75 0.12 90)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SarsoIcon({ className = "size-28" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Bottle Outline */}
      <path
        d="M 35 34 L 65 34 C 67 34, 69 36, 69 39 L 69 80 C 69 83, 67 85, 65 85 L 35 85 C 33 85, 31 83, 31 80 L 31 39 C 31 36, 33 34, 35 34 Z"
        stroke="var(--mishri-text)"
        strokeWidth="1.5"
        fill="var(--mishri-surface)"
      />
      {/* Cap & neck */}
      <path
        d="M 44 34 L 44 26 C 44 25, 46 24, 50 24 C 54 24, 56 25, 56 26 L 56 34"
        stroke="var(--mishri-text)"
        strokeWidth="1.5"
      />
      {/* Cap grooves */}
      <path d="M 47 28 L 53 28" stroke="var(--mishri-text)" strokeWidth="1" />
      <path d="M 47 31 L 53 31" stroke="var(--mishri-text)" strokeWidth="1" />

      {/* Yellow label circle in the center */}
      <circle cx="50" cy="60" r="8" fill="oklch(0.75 0.12 90 / 0.2)" stroke="oklch(0.75 0.12 90)" strokeWidth="1.2" />

      {/* Leaves/Drops flanking the bottle */}
      <g transform="translate(20, 42)">
        <path d="M 5 10 C 1 4, -2 8, 5 10 Z" fill="oklch(0.75 0.12 90)" stroke="var(--mishri-text)" strokeWidth="1" />
        <path d="M 5 10 C 9 4, 12 8, 5 10 Z" fill="oklch(0.75 0.12 90)" stroke="var(--mishri-text)" strokeWidth="1" />
      </g>
      <g transform="translate(68, 42) scale(-1, 1)">
        <path d="M 5 10 C 1 4, -2 8, 5 10 Z" fill="oklch(0.75 0.12 90)" stroke="var(--mishri-text)" strokeWidth="1" />
        <path d="M 5 10 C 9 4, 12 8, 5 10 Z" fill="oklch(0.75 0.12 90)" stroke="var(--mishri-text)" strokeWidth="1" />
      </g>
    </svg>
  );
}

export function HoneyIcon({ className = "size-28" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Open honey box */}
      <path
        d="M 24 40 L 50 25 L 76 40 L 76 75 L 50 88 L 24 75 Z"
        stroke="var(--mishri-text)"
        strokeWidth="1.5"
        fill="var(--mishri-surface)"
      />
      {/* Front faces boundary */}
      <path
        d="M 50 88 L 50 56 M 24 40 L 50 56 L 76 40"
        stroke="var(--mishri-text)"
        strokeWidth="1.2"
      />
      
      {/* Honey dipper stick extending out */}
      <path
        d="M 50 56 L 68 22"
        stroke="var(--mishri-text)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {/* Dipper head */}
      <g transform="translate(68, 22) rotate(-60)">
        <rect x="-4" y="-8" width="8" height="12" rx="2" fill="oklch(0.75 0.12 90)" stroke="var(--mishri-text)" strokeWidth="1.2" />
        <line x1="-4" y1="-5" x2="4" y2="-5" stroke="var(--mishri-text)" strokeWidth="1" />
        <line x1="-4" y1="-2" x2="4" y2="-2" stroke="var(--mishri-text)" strokeWidth="1" />
        <line x1="-4" y1="1" x2="4" y2="1" stroke="var(--mishri-text)" strokeWidth="1" />
      </g>

      {/* Gold highlight hexagon */}
      <polygon
        points="50,42 56,45.5 56,52.5 50,56 44,52.5 44,45.5"
        fill="oklch(0.75 0.12 90 / 0.25)"
        stroke="oklch(0.75 0.12 90)"
        strokeWidth="1.2"
      />
    </svg>
  );
}

export function MakhanaIcon({ className = "size-28" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Wooden Bowl */}
      <path
        d="M 18 55 C 18 80, 82 80, 82 55 Z"
        stroke="var(--mishri-text)"
        strokeWidth="1.5"
        fill="var(--mishri-surface)"
      />
      {/* Top rim of bowl */}
      <ellipse cx="50" cy="55" rx="32" ry="5" stroke="var(--mishri-text)" strokeWidth="1.5" fill="var(--mishri-surface)" />

      {/* Makhana Seeds (Lotus Seeds) */}
      <circle cx="38" cy="48" r="7" stroke="var(--mishri-text)" strokeWidth="1.2" fill="oklch(0.975 0.008 88)" />
      <path d="M 36 46 Q 38 48, 40 46" stroke="var(--mishri-text)" strokeWidth="1" strokeLinecap="round" />
      
      <circle cx="50" cy="44" r="8" stroke="var(--mishri-text)" strokeWidth="1.2" fill="oklch(0.975 0.008 88)" />
      <path d="M 47 41 Q 50 44, 53 41" stroke="var(--mishri-text)" strokeWidth="1" strokeLinecap="round" />
      
      <circle cx="62" cy="49" r="7" stroke="var(--mishri-text)" strokeWidth="1.2" fill="oklch(0.975 0.008 88)" />
      <path d="M 60 47 Q 62 49, 64 47" stroke="var(--mishri-text)" strokeWidth="1" strokeLinecap="round" />

      <circle cx="44" cy="53" r="6" stroke="var(--mishri-text)" strokeWidth="1.2" fill="oklch(0.975 0.008 88)" />
      <path d="M 42 51 Q 44 53, 46 51" stroke="var(--mishri-text)" strokeWidth="1" strokeLinecap="round" />

      <circle cx="56" cy="52" r="6.5" stroke="var(--mishri-text)" strokeWidth="1.2" fill="oklch(0.975 0.008 88)" />
      <path d="M 54 50 Q 56 52, 58 50" stroke="var(--mishri-text)" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}
