import { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, MessageCircle, Mail, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import { SectionLabel } from '../components/ui-bits/SectionLabel';

// ─── Business contact info ───────────────────────────────────────────────────
const PRIMARY_EMAIL = 'Dairyscoop@gmail.com';
const SECONDARY_EMAIL = 'dairyscoop.India@gmail.com';
const PHONE = '+91 96259 80156';
const WHATSAPP = '919625980156';
const ADDRESS = 'A-7 (P-IIb), MIP Bihta, Patna, Bihar';

type ContactInfo = {
  icon: React.ElementType;
  label: string;
  value: string;
  href?: string;
};

const contactDetails: ContactInfo[] = [
  { icon: Mail, label: 'Primary Email', value: PRIMARY_EMAIL, href: `mailto:${PRIMARY_EMAIL}` },
  { icon: Mail, label: 'Alt. Email', value: SECONDARY_EMAIL, href: `mailto:${SECONDARY_EMAIL}` },
  { icon: Phone, label: 'Phone', value: PHONE, href: `tel:+919625980156` },
  { icon: MessageCircle, label: 'WhatsApp', value: PHONE, href: `https://wa.me/${WHATSAPP}` },
  { icon: MapPin, label: 'Address', value: ADDRESS },
];

export function Contact() {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      toast.success('Message received!', {
        description: "We'll reply within 24 hours.",
      });
      (e.target as HTMLFormElement).reset();
      setSubmitting(false);
    }, 900);
  };

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="pt-24 lg:pt-40 pb-10 lg:pb-16">
        <div className="max-w-[1480px] mx-auto px-5 lg:px-10">
          <div className="max-w-2xl">
            <SectionLabel>Get in Touch</SectionLabel>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75 }}
              className="font-display mt-4 text-balance"
              style={{ fontSize: 'clamp(34px, 5vw, 72px)', lineHeight: 0.98 }}
            >
              We'd love to{' '}
              <span className="italic" style={{ color: 'var(--mishri-gold)' }}>
                hear from you.
              </span>
            </motion.h1>
            <p
              className="mt-5 text-[15px] sm:text-[16px] leading-relaxed max-w-md"
              style={{ color: 'var(--mishri-text-muted)' }}
            >
              Have questions about our products, want to place a bulk order, or
              just want to say hello? Reach out — we read every message.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Body ─── */}
      <section className="max-w-[1100px] mx-auto px-5 lg:px-10 pb-16 lg:pb-32">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-start">

          {/* ─── Contact Details ─── */}
          <div>
            <SectionLabel>Contact Details</SectionLabel>
            <h2
              className="font-display mt-4 text-balance"
              style={{ fontSize: 'clamp(22px, 3vw, 36px)' }}
            >
              We read{' '}
              <span className="italic" style={{ color: 'var(--mishri-gold)' }}>
                every
              </span>{' '}
              message.
            </h2>
            <p
              className="mt-4 text-[14.5px] leading-relaxed"
              style={{ color: 'var(--mishri-text-muted)' }}
            >
              Drop us a message and we'll get back to you as soon as possible.
              We value every piece of feedback.
            </p>

            <div className="mt-8 space-y-4">
              {contactDetails.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4">
                  <div
                    className="size-11 rounded-full grid place-items-center shrink-0 mt-0.5"
                    style={{
                      background: 'var(--mishri-surface-offset)',
                      color: 'var(--mishri-gold)',
                    }}
                    aria-hidden="true"
                  >
                    <Icon className="size-4" />
                  </div>
                  <div>
                    <div className="text-[11px] tracking-[0.18em] uppercase opacity-60 mb-0.5">
                      {label}
                    </div>
                    {href ? (
                      <a
                        href={href}
                        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        target={href.startsWith('http') ? '_blank' : undefined}
                        className="text-[14px] sm:text-[15px] hover:text-[var(--mishri-gold)] transition-colors break-all"
                      >
                        {value}
                      </a>
                    ) : (
                      <div className="text-[14px] sm:text-[15px] leading-snug">{value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick CTA pills */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3 flex-wrap">
              <a
                href={`mailto:${PRIMARY_EMAIL}`}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:-translate-y-0.5 transition-transform"
                style={{ background: 'var(--mishri-surface)', boxShadow: 'var(--shadow-sm)' }}
              >
                <div
                  className="size-9 rounded-full grid place-items-center shrink-0"
                  style={{ background: 'var(--mishri-gold)', color: 'var(--mishri-text-inverse)' }}
                  aria-hidden="true"
                >
                  <Mail className="size-4" />
                </div>
                <div>
                  <div className="text-[10px] tracking-[0.18em] uppercase opacity-60">Email</div>
                  <div className="text-[12px] font-medium">{PRIMARY_EMAIL}</div>
                </div>
              </a>

              <a
                href={`https://wa.me/${WHATSAPP}`}
                rel="noopener noreferrer"
                target="_blank"
                className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:-translate-y-0.5 transition-transform"
                style={{ background: 'var(--mishri-surface)', boxShadow: 'var(--shadow-sm)' }}
              >
                <div
                  className="size-9 rounded-full grid place-items-center shrink-0"
                  style={{ background: 'var(--mishri-gold)', color: 'var(--mishri-text-inverse)' }}
                  aria-hidden="true"
                >
                  <MessageCircle className="size-4" />
                </div>
                <div>
                  <div className="text-[10px] tracking-[0.18em] uppercase opacity-60">WhatsApp</div>
                  <div className="text-[12px] font-medium">{PHONE}</div>
                </div>
              </a>
            </div>
          </div>

          {/* ─── Contact Form ─── */}
          <form
            onSubmit={handleSubmit}
            className="p-6 sm:p-8 rounded-[24px] space-y-4"
            style={{ background: 'var(--mishri-surface)', boxShadow: 'var(--shadow-md)' }}
            aria-label="Contact form"
            noValidate
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <FormField label="Name" name="name" required autoComplete="name" />
              <FormField label="Email" name="email" type="email" required autoComplete="email" />
            </div>
            <FormField label="Subject" name="subject" />

            <label className="block">
              <span
                className="text-[11px] tracking-[0.2em] uppercase block mb-2"
                style={{ color: 'var(--mishri-text-muted)' }}
              >
                Message <span className="text-red-400" aria-hidden="true">*</span>
              </span>
              <textarea
                name="message"
                required
                rows={5}
                className="w-full px-4 py-3 rounded-xl border bg-transparent text-[15px] outline-none focus:border-[var(--mishri-gold)] focus:ring-2 focus:ring-[var(--mishri-gold)]/20 resize-none transition-all"
                style={{ borderColor: 'var(--mishri-border)' }}
                aria-required="true"
              />
            </label>

            <button
              type="submit"
              disabled={submitting}
              className="w-full h-12 rounded-full text-[12px] tracking-[0.2em] uppercase font-semibold transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
              style={{ background: 'var(--mishri-gold)', color: 'var(--mishri-text-inverse)' }}
            >
              {submitting ? 'Sending…' : 'Send Message'}
            </button>

            <p className="text-center text-[11px] opacity-50">
              We typically reply within 24 hours.
            </p>
          </form>
        </div>
      </section>
    </>
  );
}

function FormField({
  label,
  name,
  type = 'text',
  required,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span
        className="text-[11px] tracking-[0.2em] uppercase block mb-2"
        style={{ color: 'var(--mishri-text-muted)' }}
      >
        {label}{' '}
        {required && (
          <span className="text-red-400" aria-hidden="true">*</span>
        )}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        autoComplete={autoComplete}
        aria-required={required}
        className="w-full h-11 px-4 rounded-xl border bg-transparent text-[15px] outline-none focus:border-[var(--mishri-gold)] focus:ring-2 focus:ring-[var(--mishri-gold)]/20 transition-all"
        style={{ borderColor: 'var(--mishri-border)' }}
      />
    </label>
  );
}
