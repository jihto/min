"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerParent } from "../utils/animation";
import HeroImage from "@/assets/images/hero-1.png";
export default function FeaturesShowcase() {
  
  const serviceCards = useMemo(() => {
    const cards = [
      {
        title: "Product Strategy",
        description: "Align product vision, roadmap, and measurable outcomes before we build.",
        rotation: -4.5,
        icon: "📊",
      },
      {
        title: "UX & UI Design",
        description: "Design intuitive, elegant interfaces that make complex flows effortless.",
        rotation: 2.75,
        icon: "🎨",
      },
      {
        title: "Full-Stack Web",
        description: "Ship performant, maintainable web apps with modern frameworks and tooling.",
        rotation: -2.25,
        icon: "⚡",
      },
      {
        title: "AI Integration",
        description: "Embed AI copilots, workflows, and automations tailored to your operations.",
        rotation: 3.5,
        icon: "🤖",
      },
      {
        title: "Data & Analytics",
        description: "Instrument data pipelines and dashboards to keep teams aligned and informed.",
        rotation: -1.75,
        icon: "📈",
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
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-transparent px-4 py-12 sm:px-6 sm:py-16 md:py-24 text-[var(--text-primary)]">
      {/* Decorations: subtle radial glows */}
      <div className="pointer-events-none absolute -bottom-20 -right-16 h-56 w-56 sm:-bottom-40 sm:-right-32 sm:size-112 rounded-full bg-[var(--glow-color)] blur-3xl" />

      {/* Mobile-specific background decoration */}
      <div className="pointer-events-none absolute inset-0 sm:hidden">
        <div className="absolute top-10 -left-8 h-48 w-48 rounded-full bg-[var(--glow-color)] blur-3xl opacity-30" />
        <div className="absolute bottom-20 -right-8 h-56 w-56 rounded-full bg-[var(--glow-color)] blur-3xl opacity-25" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-[var(--glow-color)] blur-3xl opacity-15" />
      </div>

      {/* Centered layout */}
      <div className="relative z-10 flex w-full flex-col items-center gap-6 sm:gap-8 md:gap-12">
        <motion.div
          className="flex flex-col items-center gap-4 sm:gap-6 md:gap-8 text-center"
          variants={staggerParent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        > 
          <motion.h1 
            variants={fadeInUp} 
            className="text-balance text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight capitalize md:px-2 leading-tight sm:leading-normal"
          >
            Solutions for web & AI businesses
          </motion.h1>  
          
          {/* Mobile: Compact grid with glassmorphism cards */}
          <motion.div
            variants={fadeInUp}
            className="sm:hidden mt-6 w-full max-w-md"
          >
            <motion.div 
              className="grid grid-cols-2 gap-3 px-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {serviceCards.map((card, idx) => (
                <motion.div
                  key={card.title}
                  className={`relative rounded-xl border border-[var(--card-border)] backdrop-blur-md bg-gradient-to-br from-[var(--card-bg)]/80 to-[var(--card-bg)]/40 overflow-hidden ${
                    idx === 4 ? 'col-span-2' : ''
                  }`}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ 
                    delay: idx * 0.08,
                    type: "spring",
                    stiffness: 200,
                    damping: 20
                  }}
                  whileTap={{ scale: 0.96 }}
                >
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  
                  {/* Content */}
                  <div className={`relative p-4 flex flex-col ${idx === 4 ? 'flex-row items-center gap-4' : 'gap-3'}`}>
                    {/* Icon */}
                    <div className={`flex items-center justify-center rounded-lg bg-[var(--glow-color)]/20 ${
                      idx === 4 ? 'w-12 h-12 flex-shrink-0' : 'w-10 h-10'
                    }`}>
                      <span className="text-2xl">{card.icon}</span>
                    </div>
                    
                    {/* Text */}
                    <div className={idx === 4 ? 'flex-1' : ''}>
                      <h3 className={`font-semibold text-[var(--text-primary)] mb-1 ${
                        idx === 4 ? 'text-base' : 'text-sm'
                      }`}>
                        {card.title}
                      </h3>
                      <p className={`text-[var(--text-secondary)] leading-snug line-clamp-2 ${
                        idx === 4 ? 'text-xs' : 'text-xs'
                      }`}>
                        {card.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[var(--glow-color)] to-transparent opacity-50" />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Desktop: Original cards layout */}
          <motion.ul
            variants={fadeInUp}
            className="hidden sm:flex mt-6 sm:mt-6 md:mt-8 w-full max-w-6xl gap-4 sm:gap-4 md:gap-6 flex-col sm:flex-row sm:flex-wrap"
          >
            {serviceCards.map((card, idx) => {
              const desktopEntrance = card.entrance;
              
              return (
                <motion.li
                  key={card.title}
                  className="w-full sm:flex-1 sm:min-w-[calc(50%-0.75rem)] md:min-w-0 group relative rounded-2xl sm:rounded-2xl border border-[var(--card-border)] overflow-hidden backdrop-blur transition-all duration-500 ease-out hover:-translate-y-1 hover:rotate-0 hover:text-[var(--text-primary)] bg-cover bg-center sm:h-56 md:size-64"
                  style={{ backgroundImage: `url(${HeroImage.src})` }}
                  initial={{ 
                    opacity: 0, 
                    x: desktopEntrance.x, 
                    y: desktopEntrance.y, 
                    rotate: card.rotation - 8, 
                    scale: 0.92 
                  }}
                  whileInView={{ 
                    opacity: 1, 
                    x: 0, 
                    y: 0, 
                    rotate: card.rotation, 
                    scale: 1 
                  }}
                  viewport={{ once: true, amount: 0.45 }}
                  transition={{ 
                    delay: idx * 0.08, 
                    type: "spring", 
                    stiffness: 180, 
                    damping: 22 
                  }}
                  whileHover={{ 
                    y: -10, 
                    rotate: 0, 
                    scale: 1.03, 
                    transition: { type: "spring", stiffness: 260, damping: 18 } 
                  }}
                  whileTap={{ 
                    y: -2, 
                    scale: 0.98, 
                    transition: { type: "spring", stiffness: 280, damping: 20 } 
                  }}
                >
                  <div className="h-full w-full px-6 py-10 md:px-6 md:py-12 text-left text-[var(--text-secondary)]">
                    <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>
                </motion.li>
              );
            })}
          </motion.ul>
          
          <motion.p
            variants={fadeInUp}
            className="max-w-2xl text-pretty text-base sm:text-lg leading-7 text-[var(--text-secondary)] px-2"
          >
            We design and build fast web experiences and integrate AI to automate, personalize, and scale your business.
          </motion.p>
          <motion.div 
            variants={fadeInUp} 
            className="mt-4 sm:mt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-3"
          >
            <motion.a
              href="#contact"
              className="rounded-full bg-[var(--text-primary)] px-6 py-3 sm:px-5 sm:py-2 text-sm font-medium text-[var(--background)] transition-all duration-300 hover:opacity-90 active:scale-95 shadow-lg sm:shadow-none"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get in touch
            </motion.a>
            <motion.a
              href="#work"
              className="rounded-full border border-[var(--border-color)] px-6 py-3 sm:px-5 sm:py-2 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--card-bg)] transition-all duration-300 active:scale-95"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Our work
            </motion.a>
          </motion.div>
        </motion.div>
      </div> 
    </section>
  );
}