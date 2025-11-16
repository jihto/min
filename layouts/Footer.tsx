'use client'

import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="relative w-full bg-[var(--section-bg)] px-6 py-16 text-[var(--text-primary)]">
      {/* Top divider line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[var(--border-color)] to-transparent" />

      {/* Subtle grid background */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,var(--text-primary)_0.04_1px,transparent_1px),linear-gradient(var(--text-primary)_0.04_1px,transparent_1px)] bg-size-[40px_40px]" />

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div className="flex flex-col gap-3">
          <div className="inline-flex items-center gap-2">
            <div className="size-7 rounded-md bg-[var(--card-bg)]" />
            <span className="text-sm font-semibold tracking-wide text-[var(--text-primary)]">Jihto</span>
          </div>
          <p className="text-sm leading-6 text-[var(--text-tertiary)]">
            {t('footer.brand.desc')}
          </p>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 gap-8 sm:col-span-1 lg:col-span-2">
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-medium uppercase tracking-wider text-[var(--text-secondary)]">{t('footer.company.title')}</h4>
            <a href="#work" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">{t('footer.company.work')}</a>
            <a href="#services" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">{t('footer.company.services')}</a>
            <a href="#process" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">{t('footer.company.process')}</a>
            <a href="#pricing" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">{t('footer.company.pricing')}</a>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-medium uppercase tracking-wider text-[var(--text-secondary)]">{t('footer.resources.title')}</h4>
            <a href="#faq" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">{t('footer.resources.faq')}</a>
            <a href="#testimonials" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">{t('footer.resources.testimonials')}</a>
            <a href="#contact" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">{t('footer.resources.contact')}</a>
            <a href="mailto:hello@jihto.com" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">hello@jihto.com</a>
          </div>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col gap-3">
          <h4 className="text-xs font-medium uppercase tracking-wider text-[var(--text-secondary)]">{t('footer.newsletter.title')}</h4>
          <p className="text-sm text-[var(--text-tertiary)]">{t('footer.newsletter.desc')}</p>
          <form
            className="relative mt-1 flex items-center gap-2"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <input
              type="email"
              required
              placeholder={t('footer.newsletter.placeholder')}
              className="w-full rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-tertiary)] outline-none ring-0 transition-colors hover:border-[var(--border-color)] focus:border-[var(--border-color)]"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-[var(--text-primary)] px-4 py-2 text-sm font-medium text-[var(--background)] hover:opacity-90 transition-opacity"
            >
              {t('footer.newsletter.button')}
            </button>
          </form>
          <span className="text-[11px] text-[var(--text-tertiary)]">{t('footer.newsletter.note')}</span>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative mx-auto mt-12 flex w-full max-w-6xl flex-col items-center justify-between gap-4 border-t border-[var(--border-color)] pt-6 text-center text-sm text-[var(--text-tertiary)] sm:flex-row sm:text-left">
        <div>© {new Date().getFullYear()} Jihto. {t('footer.copyright')}</div>
        <div className="flex items-center gap-4">
          {/* Socials */}
          <a aria-label="Twitter" href="https://x.com" className="text-[var(--text-tertiary)] transition hover:text-[var(--text-primary)]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.244 2.25h3.128l-6.834 7.81 8.012 11.69H16.21l-5.09-6.65-5.822 6.65H2.17l7.32-8.36L1 2.25h7.047l4.6 6.087 5.597-6.087Zm-1.1 18.5h1.732L7.016 3.63H5.152l11.992 17.12Z" fill="currentColor"/>
            </svg>
          </a>
          <a aria-label="GitHub" href="https://github.com" className="text-[var(--text-tertiary)] transition hover:text-[var(--text-primary)]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.42c.58.11.8-.25.8-.57v-2.2c-3.26.71-3.95-1.58-3.95-1.58-.53-1.35-1.3-1.71-1.3-1.71-1.06-.72.08-.7.08-.7 1.17.08 1.8 1.2 1.8 1.2 1.04 1.79 2.72 1.27 3.39.97.1-.76.41-1.27.75-1.56-2.6-.3-5.33-1.31-5.33-5.82 0-1.29.46-2.34 1.2-3.17-.12-.3-.52-1.52.12-3.17 0 0 .98-.31 3.2 1.21a11.1 11.1 0 0 1 5.83 0c2.22-1.52 3.2-1.21 3.2-1.21.64 1.65.24 2.87.12 3.17.75.83 1.2 1.88 1.2 3.17 0 4.52-2.73 5.52-5.34 5.81.42.37.8 1.1.8 2.22v3.29c0 .32.21.69.81.57A11.5 11.5 0 0 0 12 .5Z" fill="currentColor"/>
            </svg>
          </a>
          <a aria-label="LinkedIn" href="https://linkedin.com" className="text-[var(--text-tertiary)] transition hover:text-[var(--text-primary)]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.22 8.5h4.56V24H.22V8.5Zm7.64 0h4.37v2.12h.06c.61-1.16 2.12-2.39 4.36-2.39C21.82 8.23 24 10 24 14.01V24h-4.56v-8.85c0-2.11-.76-3.55-2.67-3.55-1.46 0-2.33.98-2.71 1.93-.14.34-.18.82-.18 1.3V24H7.86V8.5Z" fill="currentColor"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}


