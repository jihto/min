"use client";

import { motion } from "framer-motion";
import { staggerParent, fadeInUp, scaleIn, createFloat } from "../utils/animation";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Testimonials() {
  const { t } = useLanguage();
  
  const testimonials = [
    {
      quote: t('testimonials.1.quote'),
      author: t('testimonials.1.author'),
      role: t('testimonials.1.role'),
    },
    {
      quote: t('testimonials.2.quote'),
      author: t('testimonials.2.author'),
      role: t('testimonials.2.role'),
    },
    {
      quote: t('testimonials.3.quote'),
      author: t('testimonials.3.author'),
      role: t('testimonials.3.role'),
    },
  ];
  return (
    <section className="relative w-full overflow-hidden bg-[var(--section-bg)] px-6 py-24 text-[var(--text-primary)]">
      <div className="pointer-events-none absolute -right-20 top-1/2 size-80 -translate-y-1/2 rounded-full bg-[var(--glow-color)] blur-3xl" />
      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.h2
          className="mb-10 text-center text-3xl font-semibold tracking-tight sm:text-4xl"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {t('testimonials.title')}
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
          variants={staggerParent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {testimonials.map((t, i) => (
            <motion.blockquote key={i} variants={scaleIn} className="relative rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6">
              <p className="text-[var(--text-primary)]">"{t.quote}"</p>
              <footer className="mt-4 text-sm text-[var(--text-tertiary)]">{t.author} · {t.role}</footer>
              <motion.span className="pointer-events-none absolute -right-3 -top-3 size-2 rounded-full bg-[var(--text-secondary)]" {...createFloat(6, 6)} />
            </motion.blockquote>
          ))}
        </motion.div>
      </div>
    </section>
  );
}


