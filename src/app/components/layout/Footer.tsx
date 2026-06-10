import { Link } from 'react-router';
import { Instagram, Youtube, Mail, Phone } from 'lucide-react';
import { Logo } from '../brand/Logo';

export function Footer() {
  return (
    <footer className="relative mt-32" style={{ background: 'var(--mishri-surface-deep)', color: 'var(--mishri-text-inverse)' }}>
      <div className="absolute inset-x-0 -top-px h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--mishri-gold), transparent)' }} />
      <div className="max-w-[1480px] mx-auto px-5 lg:px-10 pt-20 pb-10">
        <div className="grid grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10 lg:gap-16">
          <div className="col-span-2 lg:col-span-1">
            <div style={{ color: 'var(--mishri-text-inverse)' }}><Logo /></div>
            <p className="mt-5 max-w-sm font-display italic text-[22px] leading-snug" style={{ color: 'var(--mishri-gold)' }}>
              “जहाँ दूध शुद्ध होता है, वहाँ स्वास्थ्य भी शुद्ध होता है।”
            </p>
            <p className="mt-3 text-[13px] opacity-60 max-w-sm">Ancient Indian dairy wisdom — the reason we started Mishri in Hajipur in 2026.</p>
            <div className="mt-6 flex gap-3">
              {[Instagram, Youtube, Mail].map((I, i) => (
                <a key={i} className="size-10 rounded-full border border-white/15 grid place-items-center hover:border-[var(--mishri-gold)] hover:text-[var(--mishri-gold)] transition-colors"><I className="size-4"/></a>
              ))}
            </div>
          </div>

          <FooterCol title="Shop" links={[['All Products','/products'],['Ghee','/products?cat=ghee'],['Dahi','/products?cat=dahi'],['Kulfi','/products?cat=icecream'],['Gift Hampers','/products']]}/>
          <FooterCol title="Mishri" links={[['Our Story','/story'],['The Bilona Process','/story'],['Our Farmers','/story'],['Press','/story'],['Careers','/contact']]}/>
          <FooterCol title="Help" links={[['Find a Store','/contact'],['Track Order','/profile'],['Returns','/settings'],['Contact','/contact'],['FAQ','/settings']]}/>
        </div>

        <div className="mt-16 pt-6 border-t border-white/10 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between text-[12px] opacity-60">
          <div>© 2026 Mishri Dairy Pvt Ltd · Hajipur, Bihar · FSSAI Lic: 10026998000124 · GST 10ABCDE1234F1Z5</div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5"><Phone className="size-3"/> +91 98765 43210</span>
            <span>Hajipur · Patna · Muzaffarpur</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h4 className="font-body text-[11px] tracking-[0.2em] uppercase opacity-50 mb-4">{title}</h4>
      <ul className="space-y-2.5">
        {links.map(([l, h]) => (
          <li key={l}><Link to={h} className="text-[14px] hover:text-[var(--mishri-gold)] transition-colors">{l}</Link></li>
        ))}
      </ul>
    </div>
  );
}
