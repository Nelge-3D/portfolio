'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  SiNextdotjs, SiTailwindcss, SiTypescript,
  SiVercel, SiPrisma, SiFirebase, SiReact,
  SiGithub, SiLinkedin,
} from 'react-icons/si';
import { motion } from 'framer-motion';
import ProjectSlideshow, { type Project } from '@/components/dev/ProjectSlideshow';

/* ────────────────────────────────────────────
   Data
──────────────────────────────────────────── */
const projects: Project[] = [
  {
    title: 'Yura',
    subtitle: 'yura-rust.vercel.app',
    url: 'https://yura-rust.vercel.app/',
    image: '/projects/yura.png',
    description:
      "L'IA d'écoute émotionnelle gabonaise — un pont doux entre toi et les professionnels de santé mentale, ancré dans la culture gabonaise.",
    category: 'IA',
    tags: ['Intelligence Artificielle', 'Santé mentale', 'Culture gabonaise'],
  },
  {
    title: 'Redesign Ministère',
    subtitle: 'economy-five.vercel.app',
    url: 'https://economy-five.vercel.app/',
    image: '/projects/economy.png',
    description: "Une proposition de redesign pour le ministère de l'économie.",
    category: 'ONG',
    tags: ['UX/UI', 'Travail collaboratif'],
  },
  {
    title: 'Artika',
    subtitle: 'artika.vercel.app',
    url: 'https://artika.vercel.app/',
    image: '/projects/artika.png',
    description: "Plateforme type Behance avec authentification sécurisée NextAuth.js.",
    category: 'SAAS',
    tags: ['Auth', 'NextAuth.js'],
  },
  {
    title: 'Bellashop',
    subtitle: 'bellashop-flax.vercel.app',
    url: 'https://bellashop-flax.vercel.app',
    image: '/projects/bellashop.png',
    description: 'Boutique en ligne collaborative pour la vente de produits éthiques.',
    category: 'E-commerce',
    tags: ['E-commerce', 'Collaboratif'],
  },
  {
    title: 'FastExpress',
    subtitle: 'fastexpress.ga',
    url: 'https://www.fastexpress.ga/',
    image: '/projects/fastexpress.png',
    description:
      "Site officiel de l'agence de livraison FastExpress au Gabon — commande en ligne, suivi de colis.",
    category: 'Livraison',
    tags: ['Gabon', 'Livraison'],
  },
];

const stack = [
  { icon: <SiNextdotjs />, label: 'Next.js' },
  { icon: <SiTailwindcss />, label: 'Tailwind' },
  { icon: <SiTypescript />, label: 'TypeScript' },
  { icon: <SiVercel />, label: 'Vercel' },
  { icon: <SiPrisma />, label: 'Prisma' },
  { icon: <SiFirebase />, label: 'Firebase' },
  { icon: <SiReact />, label: 'React' },
];

const categories = ['Tous', 'IA', 'ONG', 'SAAS', 'E-commerce', 'Livraison'];

/* ────────────────────────────────────────────
   Code symbols background
──────────────────────────────────────────── */
type CodeSymbol = { text: string; top: string; left: string; size: string; rotate: number };

const CODE_SYMBOLS: CodeSymbol[] = [
  { text: '</>',       top: '4%',  left: '6%',  size: '3.5rem', rotate: -12 },
  { text: '{}',        top: '8%',  left: '80%', size: '5rem',   rotate: 8   },
  { text: 'const',     top: '14%', left: '18%', size: '2.2rem', rotate: -6  },
  { text: '=>',        top: '18%', left: '70%', size: '3.8rem', rotate: 10  },
  { text: 'import',    top: '24%', left: '42%', size: '2rem',   rotate: -4  },
  { text: '()',        top: '29%', left: '87%', size: '4.5rem', rotate: 14  },
  { text: 'function',  top: '33%', left: '3%',  size: '2rem',   rotate: 5   },
  { text: '[]',        top: '38%', left: '54%', size: '4rem',   rotate: -18 },
  { text: 'return',    top: '43%', left: '26%', size: '2.2rem', rotate: 8   },
  { text: '<div>',     top: '47%', left: '76%', size: '2.4rem', rotate: -10 },
  { text: 'async',     top: '52%', left: '11%', size: '2.2rem', rotate: 6   },
  { text: '?.',        top: '56%', left: '62%', size: '5.5rem', rotate: -5  },
  { text: 'type',      top: '61%', left: '34%', size: '2.2rem', rotate: -14 },
  { text: '??',        top: '65%', left: '89%', size: '4rem',   rotate: 12  },
  { text: 'interface', top: '69%', left: '4%',  size: '1.9rem', rotate: 4   },
  { text: '</>',       top: '73%', left: '47%', size: '3.5rem', rotate: -8  },
  { text: 'export',    top: '78%', left: '71%', size: '2.2rem', rotate: 9   },
  { text: '&&',        top: '82%', left: '20%', size: '4rem',   rotate: -12 },
  { text: '{}',        top: '87%', left: '84%', size: '3rem',   rotate: 7   },
  { text: '=>',        top: '91%', left: '38%', size: '3.2rem', rotate: -16 },
  { text: 'const',     top: '95%', left: '57%', size: '2.2rem', rotate: 5   },
  { text: '()',        top: '11%', left: '50%', size: '3.8rem', rotate: 20  },
];

/* ────────────────────────────────────────────
   IntersectionObserver hook
──────────────────────────────────────────── */
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ────────────────────────────────────────────
   Page
──────────────────────────────────────────── */
export default function DevPortfolio() {
  const [activeCategory, setActiveCategory] = useState('Tous');
  const hero   = useInView(0.05);
  const stackS = useInView(0.1);
  const projS  = useInView(0.05);
  const ctaS   = useInView(0.2);

  const filtered =
    activeCategory === 'Tous'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="relative min-h-screen bg-[#07000f] text-white overflow-hidden">

      {/* ── Ambient blobs ── */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/4 w-[600px] h-[600px] rounded-full bg-violet-700/10 blur-[120px] animate-pulse" />
        <div className="absolute top-1/2 -right-32 w-[500px] h-[500px] rounded-full bg-purple-600/8 blur-[100px] animate-pulse delay-700" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-amber-500/5 blur-[80px] animate-pulse delay-1000" />
      </div>

      {/* ── Code symbols background ── */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden select-none" aria-hidden="true">
        {CODE_SYMBOLS.map((s, i) => (
          <span
            key={i}
            className="absolute font-mono text-violet-400/[0.06] font-light"
            style={{ top: s.top, left: s.left, fontSize: s.size, transform: `rotate(${s.rotate}deg)` }}
          >
            {s.text}
          </span>
        ))}
      </div>

      {/* ══════════════ HERO ══════════════ */}
      <section
        ref={hero.ref as React.RefObject<HTMLElement>}
        className="relative z-10 flex flex-col items-center justify-center text-center pt-44 pb-28 px-6"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={hero.visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="font-body text-xs tracking-[0.35em] uppercase text-violet-400 mb-6"
        >
          Développeur Web & IA · Gabon
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={hero.visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-display text-6xl md:text-8xl font-semibold italic leading-[0.92] tracking-[-0.02em] mb-8"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          <span className="bg-gradient-to-br from-white via-violet-200 to-violet-500 bg-clip-text text-transparent">
            Portfolio
          </span>
          <br />
          <span className="bg-gradient-to-r from-violet-400 via-fuchsia-300 to-amber-300 bg-clip-text text-transparent">
            Développeur
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={hero.visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="font-body text-violet-300/70 text-base md:text-lg max-w-xl leading-relaxed mb-10"
        >
          Interfaces modernes, produits qui ont du sens — construits avec Next.js,
          TypeScript et l&apos;IA comme copilote de création.
        </motion.p>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={hero.visible ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="flex items-center gap-4"
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-violet-400" />
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-violet-400" />
        </motion.div>
      </section>

      {/* ══════════════ STACK ══════════════ */}
      <section
        ref={stackS.ref as React.RefObject<HTMLElement>}
        className="relative z-10 pb-24 px-6"
      >
        <div className="max-w-3xl mx-auto">
          <p className={`font-body text-[10px] tracking-[0.3em] uppercase text-violet-500 text-center mb-10 transition-all duration-700 ${stackS.visible ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
            Stack technique
          </p>
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-8 justify-items-center">
            {stack.map((tech, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.25, rotate: 6 }}
                transition={{ type: 'spring', stiffness: 350 }}
                className={`flex flex-col items-center gap-2 transition-all duration-500 ${stackS.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <div className="text-3xl text-violet-400 hover:text-amber-300 transition-colors duration-300">
                  {tech.icon}
                </div>
                <p className="font-body text-[10px] text-violet-500/80">{tech.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ PROJECTS SLIDESHOW ══════════════ */}
      <section
        ref={projS.ref as React.RefObject<HTMLElement>}
        className="relative z-10 pb-32 px-6 md:px-12"
      >
        <div className="max-w-6xl mx-auto">

          {/* Header + filter */}
          <div className={`mb-12 transition-all duration-700 ${projS.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <p className="font-body text-[10px] tracking-[0.35em] uppercase text-violet-500/50 mb-3">
              Projets
            </p>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-0">
              <h2
                className="font-display text-3xl md:text-4xl font-light italic text-violet-200/70"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Ce que j&apos;ai construit
              </h2>

              {/* Category filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`font-body text-[11px] px-4 py-1.5 rounded-full border transition-all duration-300 ${
                      activeCategory === cat
                        ? 'bg-violet-600 border-violet-500 text-white shadow-md shadow-violet-600/25'
                        : 'bg-white/3 border-white/8 text-violet-400/60 hover:border-violet-400/35 hover:text-violet-300'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="mt-6 h-px bg-gradient-to-r from-violet-400/20 via-violet-400/8 to-transparent" />
          </div>

          {/* Slideshow */}
          <ProjectSlideshow projects={filtered} />
        </div>
      </section>

      {/* ══════════════ CONTACT CTA ══════════════ */}
      <section
        ref={ctaS.ref as React.RefObject<HTMLElement>}
        className="relative z-10 pb-40 px-6"
      >
        <div className={`max-w-lg mx-auto text-center transition-all duration-700 ${ctaS.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-violet-400/50" />
            <div className="w-1 h-1 rounded-full bg-amber-400/60" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-violet-400/50" />
          </div>

          <h3
            className="font-display text-4xl md:text-5xl font-light italic text-white mb-3"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Travaillons ensemble
          </h3>
          <p className="font-body text-sm text-violet-300/60 mb-10">
            Disponible pour des missions freelance
          </p>

          <div className="flex justify-center gap-4">
            <a
              href="https://github.com/Nelge-3D"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body flex items-center gap-2.5 px-6 py-3 rounded-full border border-violet-400/20 bg-violet-950/40 text-violet-300 hover:border-violet-400/60 hover:text-white hover:bg-violet-900/50 hover:shadow-lg hover:shadow-violet-600/20 transition-all duration-300 text-sm"
            >
              <SiGithub className="text-base" />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/louis-geriel-ngabi/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body flex items-center gap-2.5 px-6 py-3 rounded-full border border-amber-400/20 bg-amber-950/20 text-amber-300 hover:border-amber-400/60 hover:text-white hover:bg-amber-900/30 hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-300 text-sm"
            >
              <SiLinkedin className="text-base" />
              LinkedIn
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
