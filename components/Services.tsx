"use client";

import { motion } from "framer-motion";
import { staggerParent, fadeInUp, createFloat } from "../utils/animation";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Services() {
  const { t } = useLanguage();
  
  const services = [
    {
      title: t('services.web.title'),
      desc: t('services.web.desc'),
      items: [t('services.web.items.1'), t('services.web.items.2'), t('services.web.items.3')],
    },
    {
      title: t('services.ai.title'),
      desc: t('services.ai.desc'),
      items: [t('services.ai.items.1'), t('services.ai.items.2'), t('services.ai.items.3')],
    },
  ];
  return (
    <section className="relative w-full overflow-hidden bg-[var(--section-bg)] px-6 py-24 text-[var(--text-primary)]">
      {/* subtle glows */}
      <div className="pointer-events-none absolute -top-24 left-1/2 size-96 -translate-x-1/2 rounded-full bg-[var(--glow-color)] blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.h2
          className="mb-10 text-center text-3xl font-semibold tracking-tight sm:text-4xl"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {t('services.title')}
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
          variants={staggerParent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {services.map((s, idx) => (
            <motion.div key={s.title} className="relative rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6">
              <motion.div className="mb-2 text-lg font-medium text-[var(--text-primary)]" variants={fadeInUp}>
                {s.title}
              </motion.div>
              <motion.p className="mb-4 text-[var(--text-secondary)]" variants={fadeInUp}>
                {s.desc}
              </motion.p>
              <motion.ul className="flex list-none flex-col gap-2 text-sm text-[var(--text-secondary)]" variants={staggerParent}>
                {s.items.map((it) => (
                  <motion.li key={it} variants={fadeInUp} className="flex items-center gap-2">
                    <span className="inline-block size-1.5 rounded-full bg-[var(--text-secondary)]" />
                    {it}
                  </motion.li>
                ))}
              </motion.ul>

              {/* floating decorative dots */}
              {[{ left: "12%", top: "14%" }, { left: "80%", top: "22%" }, { left: "30%", top: "78%" }].map((p, i) => (
                <motion.span key={i} className="pointer-events-none absolute size-2 rounded-full bg-[var(--text-secondary)]" style={{ left: p.left, top: p.top }} {...createFloat(6 + i * 2, 5 + i)} />
              ))}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}


