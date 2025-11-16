// Reusable animation presets for framer-motion
// These are plain objects (no import from framer-motion needed) so they can be
// consumed as variants/props in motion components.
type Star = {
  leftPct: number;
  topPct: number;
  sizePx: number;
  opacity: number;
}; 
export const defaultEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const defaultTransition = {
  duration: 0.6,
  ease: defaultEase,
};

export const fastTransition = {
  duration: 0.35,
  ease: defaultEase,
};

// Parent variants that stagger children on show
export const staggerParent = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      when: "beforeChildren",
    },
  },
};

// Child fade + slight up movement
export const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: defaultTransition,
  },
};

// Pure fade in
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: defaultTransition },
};

// Gentle float loop (use as animate/transition on an element)
export function createFloat(rangePx: number = 6, durationSec: number = 6) {
  return {
    animate: { y: [0, -rangePx, 0] },
    transition: { duration: durationSec, repeat: Infinity, ease: [0, 0, 1, 1] as const, repeatType: "mirror" as const },
  };
}

// Slow drift loop for backgrounds (e.g., starfields)
export function createDrift(
  xRangePx: number = 20,
  yRangePx: number = 10,
  durationSec: number = 60
) {
  return {
    animate: { x: [0, xRangePx, 0], y: [0, yRangePx, 0] },
    transition: { duration: durationSec, repeat: Infinity, ease: [0, 0, 1, 1] as const, repeatType: "mirror" as const },
  };
}

// Slight scale in (useful for buttons/cards)
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: defaultTransition,
  },
};

// Hover/tap micro-interactions for motion elements
export const hoverTap = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
};


export function generateStars(count: number, seed: number): Star[] {
  // Simple LCG for deterministic distribution
  let value = seed;
  const rand = () => {
    value = (value * 1664525 + 1013904223) % 4294967296;
    return value / 4294967296;
  };

  const stars: Star[] = [];
  for (let i = 0; i < count; i++) {
    const leftPct = Math.round(rand() * 10000) / 100; // 0 - 100
    const topPct = Math.round(rand() * 10000) / 100; // 0 - 100
    const sizePx = Math.max(1, Math.round(rand() * 2)); // 1 - 2 px
    const opacity = 0.5 + rand() * 0.5; // 0.5 - 1
    stars.push({ leftPct, topPct, sizePx, opacity });
  }
  return stars;
}