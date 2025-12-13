"use client";

import { motion } from "framer-motion";
import { fadeInUp, scaleIn, hoverTap, createFloat } from "../utils/animation";
export default function CTA() {
  return (
    <section className="relative w-full overflow-hidden bg-[var(--section-bg)] px-6 py-24 text-[var(--text-primary)]">
      <div className="pointer-events-none absolute -left-20 top-1/2 size-80 -translate-y-1/2 rounded-full bg-[var(--glow-color)] blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-1/2 size-80 -translate-y-1/2 rounded-full bg-[var(--glow-color)] blur-3xl" />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <motion.h3
          className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          Ready to build something exceptional?
        </motion.h3>
        <motion.p
          className="mx-auto mt-3 max-w-xl text-[var(--text-secondary)]"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          Tell us about your goals. We'll propose a minimal, impactful plan.
        </motion.p>
        <motion.div
          className="mt-6 flex items-center justify-center gap-3"
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.a href="#contact" className="rounded-full bg-[var(--text-primary)] px-5 py-2 text-sm font-medium text-[var(--background)] hover:opacity-90" whileHover={hoverTap.whileHover} whileTap={hoverTap.whileTap}>
            Start a project
          </motion.a>
          <motion.a href="#pricing" className="rounded-full border border-[var(--border-color)] px-5 py-2 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--card-bg)]" whileHover={hoverTap.whileHover} whileTap={hoverTap.whileTap}>
            See pricing
          </motion.a>
        </motion.div>

        <motion.span className="pointer-events-none absolute left-1/2 top-6 size-2 -translate-x-1/2 rounded-full bg-[var(--text-secondary)]" {...createFloat(8, 7)} />
      </div>
    </section>
  );
}


