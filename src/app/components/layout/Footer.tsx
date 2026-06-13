import { Link } from 'react-router';
import { Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { Logo } from '../brand/Logo';

// ─── Business contact constants ──────────────────────────────────────────────
const PRIMARY_EMAIL = 'Dairyscoop@gmail.com';
const SECONDARY_EMAIL = 'dairyscoop.India@gmail.com';
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
  { Icon: Mail, label: 'Email', href: 'mailto:Dairyscoop@gmail.com' },
];

export function Footer() {
  return (
    <footer
      className="relative mt-20 lg:mt-32"
      style={{ background: 'var(--mishri-surface-deep)', color: 'var(--mishri-text-inverse)' }}
    >
      {/* Gold top line */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, var(--mishri-gold), transparent)' }}
        aria-hidden="true"
      />

      <div className="max-w-[1480px] mx-auto px-5 lg:px-10 pt-14 lg:pt-20 pb-8 lg:pb-10">
        <div className="grid grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] gap-8 lg:gap-16">
          {/* Brand column */}
          <div className="col-span-2 lg:col-span-1">
            <Logo variant="inverse" size={30} />
            <p
              className="mt-5 max-w-sm font-display italic text-[20px] sm:text-[22px] leading-snug"
              style={{ color: 'var(--mishri-gold)' }}
            >
              "जहाँ दूध शुद्ध होता है, वहाँ स्वास्थ्य भी शुद्ध होता है।"
            </p>
            <p className="mt-3 text-[13px] leading-relaxed opacity-60 max-w-sm">
              Pure dairy, the way nature intended — that's the Aaharvedik promise.
            </p>

            {/* Contact quick-info */}
            <div className="mt-5 space-y-2">
              <a href={`mailto:${PRIMARY_EMAIL}`}
                className="flex items-center gap-2 text-[12px] opacity-70 hover:opacity-100 hover:text-[var(--mishri-gold)] transition-all"
              >
                <Mail className="size-3.5 shrink-0" />{PRIMARY_EMAIL}
              </a>
              <a href={`mailto:${SECONDARY_EMAIL}`}
                className="flex items-center gap-2 text-[12px] opacity-70 hover:opacity-100 hover:text-[var(--mishri-gold)] transition-all"
              >
                <Mail className="size-3.5 shrink-0" />{SECONDARY_EMAIL}
              </a>
              <a href="tel:+919625980156"
                className="flex items-center gap-2 text-[12px] opacity-70 hover:opacity-100 hover:text-[var(--mishri-gold)] transition-all"
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
                  className="size-10 rounded-full border border-white/15 grid place-items-center hover:border-[var(--mishri-gold)] hover:text-[var(--mishri-gold)] transition-colors"
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
            <a href="mailto:Dairyscoop@gmail.com" className="hover:opacity-100 transition-opacity">
              Dairyscoop@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>
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
              className="text-[14px] opacity-80 hover:opacity-100 hover:text-[var(--mishri-gold)] transition-all"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
