"use client";

import { motion } from "framer-motion";
import { staggerParent, fadeInUp, scaleIn } from "../utils/animation";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Features() {
  const { t } = useLanguage();
  
  const features = [
    {
      title: t('features.performance.title'),
      desc: t('features.performance.desc'),
    },
    {
      title: t('features.ai.title'),
      desc: t('features.ai.desc'),
    },
    {
      title: t('features.design.title'),
      desc: t('features.design.desc'),
    },
    {
      title: t('features.scalable.title'),
      desc: t('features.scalable.desc'),
    },
  ];
  return (
    <section className="relative w-full overflow-hidden bg-[var(--section-bg)] px-6 py-24 text-[var(--text-primary)]">
      <div className="pointer-events-none absolute inset-0 opacity-20" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,var(--text-primary)_0.12_1px,transparent_1px)] bg-size-[14px_14px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.h2
          className="mb-10 text-center text-3xl font-semibold tracking-tight sm:text-4xl"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {t('features.title')}
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
          variants={staggerParent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={scaleIn}
              className="relative rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-5"
            >
              <div className="mb-2 text-base font-medium text-[var(--text-primary)]">{f.title}</div>
              <p className="text-sm text-[var(--text-secondary)]">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}


