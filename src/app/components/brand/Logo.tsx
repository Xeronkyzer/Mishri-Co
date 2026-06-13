/**
 * Aaharvedik logo — renders the official extracted transparent brand logo image.
 * Supports a variant for inverse rendering on dark backgrounds (like the footer).
 */
export function Logo({ size = 28, variant = 'default' }: { size?: number; variant?: 'default' | 'inverse' }) {
  const width = Math.round(size * 5.9875);
  const filter = variant === 'inverse' ? 'brightness(0) invert(0.95)' : undefined;

  return (
    <img
      src="/logo-aaharvedik.png"
      alt="Aaharvedik Logo"
      style={{
        height: size,
        width: width,
        objectFit: 'contain',
        filter: filter,
      }}
      className="select-none inline-block align-middle"
    />
  );
}
