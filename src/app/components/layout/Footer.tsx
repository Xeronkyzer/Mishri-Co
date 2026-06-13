import { Link } from 'react-router';
import { Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { Logo } from '../brand/Logo';
import { FooterPattern } from '../visual/FooterPattern';

// ─── Business contact constants ──────────────────────────────────────────────
const EMAIL = 'dairyscoop.India@gmail.com';
const PHONE = '+91 96259 80156';
const ADDRESS = 'A-7 (P-IIb), MIP Bihta, Patna, Bihar';

const shopLinks: [string, string][] = [
  ['All Products', '/products'],
  ['A2 Bilona Ghee', '/products'],
  ['Kachi Ghani Sarso', '/products'],
  ['Forest Raw Honey', '/products'],
  ['Fresh Makhana', '/products'],
];

const brandLinks: [string, string][] = [
  ['About Us', '/story'],
  ['Our Process', '/story'],
  ['Contact', '/contact'],
];

const helpLinks: [string, string][] = [
  ['Contact Us', '/contact'],
];

const socials = [
  { Icon: Instagram, label: 'Instagram', href: '#' },
  { Icon: Youtube, label: 'YouTube', href: '#' },
  { Icon: Mail, label: 'Email', href: `mailto:${EMAIL}` },
];

export function Footer() {
  return (
    <div className="w-full mt-20 lg:mt-32">
      {/* SVG Pattern sitting on white background above the footer */}
      <div className="w-full relative h-[140px] sm:h-[180px] overflow-hidden" style={{ color: 'var(--mishri-gold)' }}>
        <FooterPattern className="opacity-60 mix-blend-multiply text-[var(--mishri-gold)]" />
      </div>

      <footer
        className="relative overflow-hidden"
      style={{ background: 'var(--mishri-gold)', color: 'var(--mishri-text-inverse)' }}
    >
      {/* Top line border */}
      <div
        className="absolute inset-x-0 top-0 h-px z-10"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1480px] mx-auto px-5 lg:px-10 pt-14 lg:pt-20 pb-8 lg:pb-10">
        <div className="grid grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] gap-8 lg:gap-16">
          {/* Brand column */}
          <div className="col-span-2 lg:col-span-1">
            <Logo variant="inverse" size={30} />

            <p className="mt-3 text-[13px] leading-relaxed opacity-60 max-w-sm">
              Pure dairy, the way nature intended — that's the Aaharvedik promise.
            </p>

            {/* Contact quick-info */}
            <div className="mt-5 space-y-2">
              <a href={`mailto:${EMAIL}`}
                className="flex items-center gap-2 text-[12px] opacity-70 hover:opacity-100 transition-all"
              >
                <Mail className="size-3.5 shrink-0" />{EMAIL}
              </a>
              <a href="tel:+919625980156"
                className="flex items-center gap-2 text-[12px] opacity-70 hover:opacity-100 transition-all"
              >
                <Phone className="size-3.5 shrink-0" />{PHONE}
              </a>
              <div className="flex items-start gap-2 text-[12px] opacity-60">
                <MapPin className="size-3.5 shrink-0 mt-0.5" />
                <span>{ADDRESS}</span>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              {socials.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  rel="noopener noreferrer"
                  className="size-10 rounded-full border border-white/15 grid place-items-center hover:border-white hover:bg-white/10 transition-colors"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <FooterCol title="Shop" links={shopLinks} />
          <FooterCol title="Aaharvedik" links={brandLinks} />
          <FooterCol title="Help" links={helpLinks} />
        </div>

        {/* Bottom bar */}
        <div className="mt-12 lg:mt-16 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between text-[12px] opacity-60">
          <div>© 2026 Aaharvedik · Pure Dairy, Naturally · All rights reserved</div>
          <div className="flex items-center gap-4 flex-wrap">
            <a href="tel:+919625980156" className="hover:opacity-100 transition-opacity">+91 96259 80156</a>
            <span aria-hidden="true">·</span>
            <a href={`mailto:${EMAIL}`} className="hover:opacity-100 transition-opacity">
              {EMAIL}
            </a>
          </div>
        </div>
      </div>
    </footer>
    </div>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h4 className="font-body text-[11px] tracking-[0.22em] uppercase opacity-50 mb-4">
        {title}
      </h4>
      <ul className="space-y-2.5">
        {links.map(([label, href]) => (
          <li key={label}>
            <Link
              to={href}
              className="text-[14px] opacity-80 hover:opacity-100 transition-all"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
