'use client';

import * as React from 'react';
import { motion, MotionConfig, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ArrowUpRight } from 'lucide-react';

/* ────────────────────────────────────────────
   Types
──────────────────────────────────────────── */
export type Project = {
  title: string;
  subtitle: string;
  url: string;
  image: string;
  description: string;
  category: string;
  tags: string[];
};

interface ContextValue {
  activeSlide: number;
  changeSlide: (i: number) => void;
}

/* ────────────────────────────────────────────
   Context
──────────────────────────────────────────── */
const Ctx = React.createContext<ContextValue | undefined>(undefined);
function useCtx() {
  const ctx = React.useContext(Ctx);
  if (!ctx) throw new Error('useCtx must be inside ProjectSlideshow');
  return ctx;
}

/* ────────────────────────────────────────────
   Text stagger on hover
──────────────────────────────────────────── */
function splitChars(text: string) {
  return text.split('').map((c, i) => ({ char: c, key: `${c}-${i}` }));
}

function StaggerText({
  text,
  index,
  className,
}: {
  text: string;
  index: number;
  className?: string;
}) {
  const { activeSlide, changeSlide } = useCtx();
  const chars = splitChars(text);
  const isActive = activeSlide === index;

  return (
    <span
      className={cn('relative inline-block cursor-pointer overflow-hidden', className)}
      onMouseEnter={() => changeSlide(index)}
    >
      {chars.map(({ char, key }, i) => (
        <span key={key} className="relative inline-block overflow-hidden">
          <MotionConfig
            transition={{
              delay: i * 0.018,
              duration: 0.28,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <motion.span
              className="inline-block"
              initial={{ y: '0%' }}
              animate={isActive ? { y: '-115%' } : { y: '0%' }}
            >
              {char === ' ' ? ' ' : char}
            </motion.span>
            <motion.span
              className="absolute left-0 top-0 inline-block"
              initial={{ y: '115%' }}
              animate={isActive ? { y: '0%' } : { y: '115%' }}
            >
              {char === ' ' ? ' ' : char}
            </motion.span>
          </MotionConfig>
        </span>
      ))}
    </span>
  );
}

/* ────────────────────────────────────────────
   Clip-path variants for image reveal
──────────────────────────────────────────── */
const clipVariants = {
  visible: { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' },
  hidden:  { clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)' },
};

/* ────────────────────────────────────────────
   Category badge colours
──────────────────────────────────────────── */
const CAT_COLOR: Record<string, string> = {
  IA:          'bg-violet-500/25 border-violet-400/40 text-violet-300',
  ONG:         'bg-sky-500/20   border-sky-400/40   text-sky-300',
  SAAS:        'bg-emerald-500/20 border-emerald-400/40 text-emerald-300',
  'E-commerce':'bg-rose-500/20  border-rose-400/40  text-rose-300',
  Livraison:   'bg-amber-500/20 border-amber-400/40 text-amber-300',
};

/* ────────────────────────────────────────────
   Main component
──────────────────────────────────────────── */
export default function ProjectSlideshow({ projects }: { projects: Project[] }) {
  const [activeSlide, setActiveSlide] = React.useState(0);

  // Reset when project list changes (filter)
  React.useEffect(() => { setActiveSlide(0); }, [projects]);

  const changeSlide = React.useCallback((i: number) => setActiveSlide(i), []);
  const active = projects[activeSlide];

  if (projects.length === 0) {
    return (
      <p className="text-center py-16 font-body text-sm text-zinc-500">
        Aucun projet dans cette catégorie.
      </p>
    );
  }

  return (
    <Ctx.Provider value={{ activeSlide, changeSlide }}>
      {/* ── Desktop layout ── */}
      <div className="hidden md:flex items-stretch gap-12 min-h-[520px]">

        {/* Left — project list */}
        <div className="flex flex-col justify-center gap-1 w-[42%] shrink-0">
          <p className="font-body text-[9px] tracking-[0.35em] uppercase text-zinc-500 mb-6">
            Projets réalisés
          </p>

          {projects.map((project, i) => (
            <div
              key={project.url}
              className={`group flex items-baseline gap-4 py-3 border-b transition-all duration-300 cursor-pointer ${
                activeSlide === i
                  ? 'border-violet-400/30'
                  : 'border-white/5 hover:border-violet-400/15'
              }`}
              onMouseEnter={() => changeSlide(i)}
            >
              {/* Number */}
              <span
                className={`font-display font-light italic text-sm transition-colors duration-300 shrink-0 ${
                  activeSlide === i ? 'text-amber-400' : 'text-zinc-600'
                }`}
                style={{ fontFamily: 'var(--font-display)' }}
              >
                0{i + 1}
              </span>

              {/* Stagger title */}
              <StaggerText
                text={project.title}
                index={i}
                className={`font-display font-light italic transition-colors duration-300 ${
                  activeSlide === i
                    ? 'text-white text-3xl lg:text-4xl'
                    : 'text-zinc-500 text-2xl lg:text-3xl hover:text-zinc-300'
                }`}
              />

              {/* Category badge */}
              <span
                className={`ml-auto font-body text-[9px] tracking-widest uppercase px-2.5 py-1 rounded-full border transition-all duration-300 shrink-0 ${
                  activeSlide === i
                    ? (CAT_COLOR[project.category] ?? 'bg-violet-950/40 border-violet-400/20 text-violet-300')
                    : 'opacity-0 translate-x-2'
                }`}
              >
                {project.category}
              </span>
            </div>
          ))}

        </div>

        {/* Right — image stack */}
        <div className="relative flex-1 rounded-2xl overflow-hidden border border-violet-400/10">
          {/* Images stacked via clip-path */}
          {projects.map((project, i) => (
            <motion.div
              key={project.url}
              className="absolute inset-0"
              variants={clipVariants}
              animate={activeSlide === i ? 'visible' : 'hidden'}
              transition={{ ease: [0.33, 1, 0.68, 1], duration: 0.75 }}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover object-top"
                loading="eager"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#07000f]/30" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07000f]/60 via-transparent to-transparent" />
            </motion.div>
          ))}

          {/* ── Legend caption ── */}
          <AnimatePresence mode="wait">
            {active && (
              <motion.div
                key={active.url}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute bottom-0 left-0 right-0"
              >
                {/* Gradient fade into the legend */}
                <div className="h-16 bg-gradient-to-t from-black/90 to-transparent" />

                {/* Legend frame */}
                <div className="bg-black/75 backdrop-blur-xl border-t border-violet-400/15 px-6 py-5">
                  <div className="flex items-start justify-between gap-6">
                    {/* Left: description + tags */}
                    <div className="min-w-0 flex-1 space-y-3">
                      <p className="font-body text-sm text-white/80 leading-relaxed">
                        {active.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {active.tags.map((tag) => (
                          <span
                            key={tag}
                            className="font-body text-[10px] px-2.5 py-1 rounded-full bg-violet-950/70 border border-violet-400/20 text-violet-300/80"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right: visit button */}
                    <a
                      href={active.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full bg-violet-600/30 border border-violet-400/30 text-violet-200 font-body text-xs font-medium hover:bg-violet-600/50 hover:border-violet-400/60 hover:text-white transition-all duration-300 group/link"
                    >
                      Voir le projet
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Mobile: vertical list + tap ── */}
      <div className="md:hidden space-y-4">
        {projects.map((project) => (
          <a
            key={project.url}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 p-4 rounded-2xl border border-violet-400/10 bg-violet-950/20 hover:border-violet-400/25 transition-all duration-300"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-20 h-14 object-cover object-top rounded-lg shrink-0"
            />
            <div className="min-w-0">
              <p
                className="font-display font-light italic text-lg text-white truncate"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {project.title}
              </p>
              <p className="font-body text-xs text-zinc-400 truncate mt-0.5">
                {project.description}
              </p>
            </div>
            <ArrowUpRight className="w-4 h-4 text-violet-400/40 group-hover:text-amber-300 shrink-0 ml-auto transition-colors" />
          </a>
        ))}
      </div>
    </Ctx.Provider>
  );
}
