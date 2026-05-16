'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Code, ArrowRight, Code2, FolderOpen, Smartphone, Box, Layers, Sparkles } from 'lucide-react';
import clsx from 'clsx';

const stats = {
  dev: [
    { value: '7',    label: 'technologies maîtrisées', Icon: Code2 },
    { value: '4+',   label: 'projets web livrés',      Icon: FolderOpen },
    { value: '100%', label: 'responsive & mobile-first', Icon: Smartphone },
  ],
  '3d': [
    { value: '10+',  label: 'modèles 3D finalisés',            Icon: Box },
    { value: '3',    label: 'domaines — produit, archi, pub', Icon: Layers },
    { value: 'Full', label: 'pipeline modélisation → rendu',  Icon: Sparkles },
  ],
};

const content = {
  dev: {
    title: 'Développez des expériences web',
    highlight: 'sur mesure',
    description: 'Des applications web modernes, rapides et responsives qui transforment vos idées en réalité numérique.',
    cta: 'Voir mes projets web',
    bg: 'from-violet-900/80 via-purple-900/50 to-transparent',
    highlight_grad: 'from-violet-300 to-violet-500',
    cta_grad: 'from-violet-500 to-violet-600',
    stat_color: 'text-violet-300',
    icon_color: 'text-violet-400',
    section_bg: 'bg-[#07000f]',
  },
  '3d': {
    title: 'Donnez vie à vos idées avec la',
    highlight: '3D',
    description: 'Des visuels immersifs et impactants pour sublimer vos produits et captiver votre audience.',
    cta: 'Voir le portfolio 3D',
    bg: 'from-amber-900/80 via-orange-900/50 to-transparent',
    highlight_grad: 'from-amber-300 to-amber-500',
    cta_grad: 'from-amber-500 to-amber-400',
    stat_color: 'text-amber-300',
    icon_color: 'text-amber-400',
    section_bg: 'bg-[#0c0800]',
  },
};

export default function StatsSection() {
  const [portfolioType, setPortfolioType] = useState<'dev' | '3d'>('3d');
  const c = content[portfolioType];
  const currentStats = stats[portfolioType];

  return (
    <section id="stats" className="relative overflow-hidden">
      {/* Hero image section */}
      <div
        className="relative bg-cover bg-center py-24 md:py-32 flex items-center justify-center"
        style={{ backgroundImage: "url('/Hero.png')" }}
      >
        <div className={clsx(
          'absolute inset-0 z-0 transition-all duration-700',
          `bg-gradient-to-tr ${c.bg} via-black/70 to-transparent backdrop-blur-[1px]`
        )} />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center md:items-start md:text-left gap-6"
          >
            {/* Switcher */}
            <div className="flex gap-1 p-1 bg-black/40 backdrop-blur-md rounded-full border border-white/10">
              <button
                onClick={() => setPortfolioType('3d')}
                className={clsx(
                  'rounded-full px-4 py-2 text-xs flex items-center gap-2 font-body font-medium transition-all duration-300',
                  portfolioType === '3d'
                    ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-black shadow-md'
                    : 'text-white/50 hover:text-white hover:bg-white/8'
                )}
              >
                <Box size={12} />
                3D & Design
              </button>
              <button
                onClick={() => setPortfolioType('dev')}
                className={clsx(
                  'rounded-full px-4 py-2 text-xs flex items-center gap-2 font-body font-medium transition-all duration-300',
                  portfolioType === 'dev'
                    ? 'bg-gradient-to-r from-violet-500 to-violet-600 text-white shadow-md'
                    : 'text-white/50 hover:text-white hover:bg-white/8'
                )}
              >
                <Code size={12} />
                Développement
              </button>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={portfolioType}
                initial={{ opacity: 0, x: -18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 18 }}
                transition={{ duration: 0.4 }}
              >
                <h2
                  className="font-display text-3xl md:text-5xl lg:text-6xl font-light italic text-white leading-tight mb-4"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {c.title}{' '}
                  <span className={clsx('bg-gradient-to-r bg-clip-text text-transparent', c.highlight_grad)}>
                    {c.highlight}
                  </span>
                </h2>
                <p className="font-body text-white/50 text-sm md:text-base max-w-lg">{c.description}</p>
              </motion.div>
            </AnimatePresence>

            <Link
              href={`/${portfolioType === 'dev' ? 'dev' : '3d'}-portfolio`}
              className={clsx(
                'group font-body inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 hover:scale-105',
                `bg-gradient-to-r ${c.cta_grad}`,
                portfolioType === 'dev' ? 'text-white' : 'text-black'
              )}
            >
              {c.cta}
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Stats bar */}
      <div className={clsx('relative py-8 px-4 md:px-12', c.section_bg)}>
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={portfolioType}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col sm:flex-row items-stretch divide-y sm:divide-y-0 sm:divide-x divide-white/5"
            >
              {currentStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.07 }}
                  viewport={{ once: true }}
                  className="flex-1 flex items-center gap-3 px-7 py-5"
                >
                  <stat.Icon size={16} strokeWidth={1.5} className={clsx('shrink-0', c.icon_color)} />
                  <div>
                    <p className={clsx('font-display text-xl font-medium leading-none mb-1', c.stat_color)} style={{ fontFamily: 'var(--font-display)' }}>
                      {stat.value}
                    </p>
                    <p className="font-body text-[10px] text-white/30">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
