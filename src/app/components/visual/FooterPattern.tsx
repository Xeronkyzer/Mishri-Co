export function FooterPattern({ className = "opacity-40" }: { className?: string }) {
  return (
    <div className={`absolute inset-x-0 bottom-4 pointer-events-none select-none flex items-end justify-center overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 1200 300"
        className="w-full max-w-[1600px] h-[180px] sm:h-[240px]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMax meet"
      >
        {/* === Background Layer: The Rising Sun === */}
        <circle cx="600" cy="220" r="100" stroke="currentColor" strokeWidth="1" strokeDasharray="4 6" opacity="0.5" />
        <circle cx="600" cy="220" r="140" stroke="currentColor" strokeWidth="0.8" strokeDasharray="1 8" opacity="0.3" />
        
        {/* === Layer 1: Distant Rolling Hills === */}
        <path d="M -100 220 Q 200 160, 500 200 T 1300 180" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
        <path d="M 100 260 Q 400 190, 800 240 T 1300 210" stroke="currentColor" strokeWidth="1" opacity="0.8" />
        
        {/* === Layer 2: Foreground Hill === */}
        <path d="M -50 280 Q 300 230, 600 270 T 1250 250" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />

        {/* === Native Flora / Nature Elements === */}
        {/* Left Tree / Plant */}
        <g transform="translate(180, 160) scale(1.2)" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 0 90 Q 5 40, 0 0" />
          <path d="M 2 70 Q 20 60, 25 40 Q 10 45, 2 70 Z" />
          <path d="M -1 50 Q -25 40, -30 20 Q -15 25, -1 50 Z" />
          <path d="M 1 30 Q 15 20, 20 0 Q 5 5, 1 30 Z" />
        </g>
        
        {/* Right Tall Grass / Herbs */}
        <g transform="translate(1000, 190)" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
          <path d="M 0 80 Q -10 40, -20 10" />
          <path d="M 10 80 Q 20 40, 30 15" />
          <path d="M 5 80 Q 5 40, 0 0" />
          {/* Herb Leaves */}
          <circle cx="-20" cy="10" r="2" fill="currentColor" />
          <circle cx="30" cy="15" r="2" fill="currentColor" />
          <circle cx="0" cy="0" r="2" fill="currentColor" />
        </g>

        {/* === The Authenticity Core: Bilona Pot (No Preservatives, Traditional) === */}
        <g transform="translate(380, 175) scale(0.9)">
          <path d="M 15 60 C 5 50, 0 35, 0 25 C 0 10, 15 8, 30 8 C 45 8, 60 10, 60 25 C 60 35, 55 50, 45 60 Z" stroke="currentColor" strokeWidth="1.5" />
          <path d="M 20 8 L 40 8" stroke="currentColor" strokeWidth="1.5" />
          <path d="M 30 0 L 30 8" stroke="currentColor" strokeWidth="1.5" />
          <path d="M 24 3 L 36 3" stroke="currentColor" strokeWidth="1.5" />
          {/* Churning Rope/Stick */}
          <path d="M 30 -20 L 30 0" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
          <path d="M 10 30 Q 30 35, 50 30" stroke="currentColor" strokeWidth="1" opacity="0.5" />
          <path d="M 12 40 Q 30 45, 48 40" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        </g>

        {/* === The Farmer (Symbolizing hard work and natural tending) === */}
        <g transform="translate(300, 160) scale(0.85)" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Traditional Hat */}
          <path d="M 0 15 C 10 5, 30 5, 40 15 L 50 18 L -10 18 Z" fill="var(--mishri-bg)" />
          <circle cx="20" cy="28" r="8" />
          {/* Bending Body */}
          <path d="M 20 36 C 35 40, 45 50, 45 70 L 45 95" />
          <path d="M 45 70 L 30 95" />
          {/* Arm and tool */}
          <path d="M 25 45 L 5 55 L -10 70" />
          <path d="M 35 30 L -15 80" strokeWidth="1.2" />
          <path d="M -15 80 L -25 95 L -15 95" strokeWidth="1.2" />
        </g>

        {/* === Grazing Cow (Ethical Sourcing) === */}
        <g transform="translate(680, 165) scale(1)">
          {/* Cow Body */}
          <path d="M 40 25 C 40 10, 30 10, 15 10 C 5 10, 0 18, 0 25 C 0 38, 5 45, 15 45 C 35 45, 40 40, 40 25 Z" stroke="currentColor" strokeWidth="1.5" fill="var(--mishri-bg)" />
          {/* Cow Head grazing down */}
          <path d="M 10 20 L -8 38 C -10 42, -12 40, -12 45 C -12 50, -6 50, -4 48 L 5 35 Z" stroke="currentColor" strokeWidth="1.5" fill="var(--mishri-bg)" />
          <path d="M -8 38 Q -12 32, -10 34" stroke="currentColor" strokeWidth="1.5" />
          <path d="M -4 25 Q -10 22, -12 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="0" cy="24" r="2" fill="currentColor" stroke="none" />
          {/* Legs */}
          <path d="M 8 45 L 8 60 M 14 45 L 14 62" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 30 42 L 30 60 M 36 38 L 36 62" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 40 20 Q 48 30, 45 45" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        {/* === Flying Bees & Birds === */}
        <g stroke="currentColor">
          <path d="M 200 80 Q 210 70, 220 80 Q 230 70, 240 80" strokeWidth="1.2" fill="none" strokeLinecap="round" />
          <path d="M 800 60 Q 805 55, 810 60 Q 815 55, 820 60" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.7" />
          
          {/* Bee 1 */}
          <g transform="translate(550, 110)">
            <ellipse cx="0" cy="0" rx="3" ry="2" fill="currentColor" />
            <path d="M 0 -2 C 2 -6, 5 -4, 2 0" strokeWidth="0.8" />
            <path d="M 0 -2 C -2 -6, -5 -4, -2 0" strokeWidth="0.8" />
            <path d="M -20 10 Q -10 20, -5 5" strokeWidth="0.8" strokeDasharray="2 2" fill="none" opacity="0.4" />
          </g>
          
          {/* Bee 2 */}
          <g transform="translate(850, 130) scale(0.8)">
            <ellipse cx="0" cy="0" rx="3" ry="2" fill="currentColor" />
            <path d="M 0 -2 C 2 -6, 5 -4, 2 0" strokeWidth="0.8" />
            <path d="M 0 -2 C -2 -6, -5 -4, -2 0" strokeWidth="0.8" />
            <path d="M 15 15 Q 10 5, 2 5" strokeWidth="0.8" strokeDasharray="2 2" fill="none" opacity="0.4" />
          </g>
        </g>

      </svg>
    </div>
  );
}
