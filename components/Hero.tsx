"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerParent, createDrift, generateStars } from "../utils/animation";
import HeroImage from "@/assets/images/hero-1.png";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const stars = useMemo(() => generateStars(160, 42), []);
  const serviceCards = useMemo(() => {
    const cards = [
      {
        title: "Product Strategy",
        description: "Align product vision, roadmap, and measurable outcomes before we build.",
        rotation: -4.5,
      },
      {
        title: "UX & UI Design",
        description: "Design intuitive, elegant interfaces that make complex flows effortless.",
        rotation: 2.75,
      },
      {
        title: "Full-Stack Web",
        description: "Ship performant, maintainable web apps with modern frameworks and tooling.",
        rotation: -2.25,
      },
      {
        title: "AI Integration",
        description: "Embed AI copilots, workflows, and automations tailored to your operations.",
        rotation: 3.5,
      },
      {
        title: "Data & Analytics",
        description: "Instrument data pipelines and dashboards to keep teams aligned and informed.",
        rotation: -1.75,
      },
    ];

    const entrances = [
      { x: -64, y: 36 },
      { x: 48, y: 28 },
      { x: -32, y: 64 },
      { x: 56, y: -24 },
      { x: -48, y: -32 },
    ];

    return cards.map((card, idx) => ({
      ...card,
      entrance: entrances[idx] ?? { x: 0, y: 48 },
    }));
  }, []);

  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[var(--section-bg)] px-6 py-24 text-[var(--text-primary)]">
      {/* Decorations: subtle radial glows */}
      <div className="pointer-events-none absolute -top-32 -left-40 h-96 w-96 rounded-full bg-[var(--glow-color)] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-32 size-112 rounded-full bg-[var(--glow-color)] blur-3xl" />

      {/* Starfield */}
      {mounted && (
        <motion.div
          aria-hidden
          className="absolute inset-0 will-change-transform"
          {...createDrift(60, 30, 45)}
        >
          <div className="absolute inset-0">
            {stars.map((star, idx) => {
              // Random per-star motion params
              const dx = (Math.random() * 6 - 3).toFixed(2) + "px"; // -3px..3px
              const dy = (Math.random() * 6 - 3).toFixed(2) + "px"; // -3px..3px
              const twinkle = (6 + Math.random() * 6).toFixed(2) + "s"; // 6-12s
              const jitter = (8 + Math.random() * 8).toFixed(2) + "s"; // 8-16s
              const delay = (Math.random() * 6).toFixed(2) + "s";
              return (
                <span
                  key={idx}
                  className="star absolute rounded-full bg-white"
                  style={{
                    left: `${star.leftPct}%`,
                    top: `${star.topPct}%`,
                    width: star.sizePx,
                    height: star.sizePx,
                    // base opacity controlled via CSS var for twinkle keyframes
                    opacity: star.opacity,
                    // animation controls
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore - CSS custom properties
                    ['--dx' as any]: dx,
                    ['--dy' as any]: dy,
                    ['--twinkle' as any]: twinkle,
                    ['--jitter' as any]: jitter,
                    ['--base-op' as any]: star.opacity,
                    animationDelay: `${delay}, ${delay}`,
                    willChange: 'transform, opacity',
                  }}
                />
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Centered layout */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center gap-12">
        <motion.div
          className="flex flex-col items-center gap-8 text-center"
          variants={staggerParent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        > 
          <motion.h1 variants={fadeInUp} className="text-balance text-5xl font-semibold tracking-tight sm:text-6xl capitalize">
            {t('hero.title').includes('&') ? (
              <>
                {t('hero.title').split(' & ')[0]} <br /> & {t('hero.title').split(' & ')[1]}
              </>
            ) : (
              t('hero.title').split(' ').map((word, i, arr) => (
                <React.Fragment key={i}>
                  {word}
                  {i < arr.length - 1 && ' '}
                  {(word.toLowerCase() === 'cho' || word.toLowerCase() === 'doanh') && <br />}
                </React.Fragment>
              ))
            )}
          </motion.h1>  
          <motion.ul
            variants={fadeInUp}
            className="mt-8 flex w-full max-w-6xl gap-6 flex-wrap"
          >
            {serviceCards.map((card, idx) => (
              <motion.li
                key={card.title}
                className="flex-1 group relative rounded-2xl border border-[var(--card-border)] px-6 py-12 size-64 text-left text-[var(--text-secondary)] backdrop-blur transition-transform duration-500 ease-out hover:-translate-y-1 hover:rotate-0 hover:text-[var(--text-primary)] bg-cover bg-center"
                style={{ backgroundImage: `url(${HeroImage.src})` }}
                initial={{ opacity: 0, x: card.entrance.x, y: card.entrance.y, rotate: card.rotation - 8, scale: 0.92 }}
                whileInView={{ opacity: 1, x: 0, y: 0, rotate: card.rotation, scale: 1 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ delay: idx * 0.08, type: "spring", stiffness: 180, damping: 22 }}
                whileHover={{ y: -10, rotate: 0, scale: 1.03, transition: { type: "spring", stiffness: 260, damping: 18 } }}
                whileTap={{ y: -2, scale: 0.97, transition: { type: "spring", stiffness: 280, damping: 20 } }}
              >
                <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </motion.li>
            ))}
          </motion.ul>
          <motion.p
            variants={fadeInUp}
            className="max-w-2xl text-pretty text-lg leading-7 text-[var(--text-secondary)]"
          >
            {t('hero.subtitle')}
          </motion.p>
          <motion.div variants={fadeInUp} className="mt-2 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#contact"
              className="rounded-full bg-[var(--text-primary)] px-5 py-2 text-sm font-medium text-[var(--background)] transition-colors hover:opacity-90"
            >
              {t('hero.cta.primary')}
            </a>
            <a
              href="#work"
              className="rounded-full border border-[var(--border-color)] px-5 py-2 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--card-bg)]"
            >
              {t('hero.cta.secondary')}
            </a>
          </motion.div>
        </motion.div>
      </div> 
    </section>
  );
} 