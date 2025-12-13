"use client";

import { motion } from "framer-motion";
import { staggerParent, fadeInUp } from "../utils/animation";
export default function Process() {
  const steps = [
    {
      number: '01',
      title: 'Discovery',
      description: 'We start by understanding your vision, goals, and challenges. Through collaborative discussions, we define the scope and align on outcomes.',
    },
    {
      number: '02',
      title: 'Design & Build',
      description: 'We craft elegant solutions and bring them to life. Every detail is considered—from user experience to technical architecture.',
    },
    {
      number: '03',
      title: 'Launch & Iterate',
      description: 'We deploy with confidence and monitor performance. Continuous refinement ensures your product evolves with your needs.',
    },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-[var(--section-bg)] px-6 py-24 text-[var(--text-primary)]">
      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.h2
          className="mb-16 text-center text-3xl font-semibold tracking-tight sm:text-4xl"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          How we work
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 gap-12 md:grid-cols-3"
          variants={staggerParent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              variants={fadeInUp}
              className="relative"
            >
              <div className="mb-6 text-5xl font-light tracking-tight text-[var(--text-primary)]/20">
                {step.number}
              </div>
              <h3 className="mb-4 text-xl font-medium tracking-tight text-[var(--text-primary)]">
                {step.title}
              </h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                {step.description}
              </p>
              {index < steps.length - 1 && (
                <div className="absolute -right-6 top-0 hidden h-full w-px bg-[var(--border-color)] md:block" />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
