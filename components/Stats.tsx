'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Code, ArrowRight, Code2, FolderOpen, Smartphone, Box, Layers, Sparkles } from 'lucide-react';
import clsx from 'clsx';

const stats = {
  dev: [
    { value: '7', label: 'technologies maîtrisées', Icon: Code2 },
    { value: '4+', label: 'projets web livrés', Icon: FolderOpen },
    { value: '100%', label: 'responsive & mobile-first', Icon: Smartphone },
  ],
  '3d': [
    { value: '10+', label: 'modèles 3D finalisés', Icon: Box },
    { value: '3', label: 'domaines — produit, archi, pub', Icon: Layers },
    { value: 'Full', label: 'pipeline modélisation → rendu', Icon: Sparkles },
  ],
};

const content = {
  dev: {
    title: 'Développez des expériences web sur mesure',
    highlight: 'performantes',
    description: 'Des applications web modernes, rapides et responsives qui transforment vos idées en réalité numérique.',
    cta: 'Voir mes projets web',
    bgGradient: 'from-blue-900/90 via-blue-800/70 to-transparent',
  },
  '3d': {
    title: 'Donnez vie à vos idées avec la',
    highlight: '3D',
    description: 'Des visuels immersifs et impactants pour sublimer vos produits et captiver votre audience.',
    cta: 'Voir le portfolio 3D',
    bgGradient: 'from-amber-900/90 via-amber-800/70 to-transparent',
  },
};

export default function StatsSection() {
  const [portfolioType, setPortfolioType] = useState<'dev' | '3d'>('3d');

  const currentContent = content[portfolioType];
  const currentStats = stats[portfolioType];

  return (
    <section id="stats" className="relative overflow-hidden">
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center py-20 md:py-28 flex items-center justify-center"
        style={{ backgroundImage: "url('/Hero.png')" }}
      >
        <div className={clsx(
          'absolute inset-0 z-0 transition-all duration-700',
          `bg-gradient-to-tr ${currentContent.bgGradient} via-black/70 to-transparent`,
          'backdrop-blur-[1px]'
        )} />

        <div className="relative z-10 w-full">
          <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-12 max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center md:items-start md:text-left gap-5"
            >
              {/* Sélecteur */}
              <div className="flex gap-1.5 p-1 bg-black/30 backdrop-blur-md rounded-full border border-white/20">
                <button
                  onClick={() => setPortfolioType('3d')}
                  className={clsx(
                    'rounded-full transition-all duration-300 flex items-center gap-1.5 font-medium',
                    'px-3.5 py-1.5 text-xs sm:text-sm',
                    portfolioType === '3d'
                      ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-black shadow-md'
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                  )}
                >
                  <Box size={13} />
                  <span>3D & Design</span>
                </button>
                <button
                  onClick={() => setPortfolioType('dev')}
                  className={clsx(
                    'rounded-full transition-all duration-300 flex items-center gap-1.5 font-medium',
                    'px-3.5 py-1.5 text-xs sm:text-sm',
                    portfolioType === 'dev'
                      ? 'bg-gradient-to-r from-blue-400 to-blue-500 text-black shadow-md'
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                  )}
                >
                  <Code size={13} />
                  <span>Développement Web</span>
                </button>
              </div>

              {/* Texte principal */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={portfolioType}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.4 }}
                >
                  <h2 className="font-bold tracking-tight leading-tight text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-3 md:mb-4">
                    {currentContent.title}{' '}
                    <span className={clsx(
                      'bg-gradient-to-r bg-clip-text text-transparent',
                      portfolioType === 'dev' ? 'from-blue-300 to-blue-500' : 'from-amber-300 to-amber-500'
                    )}>
                      {currentContent.highlight}
                    </span>
                  </h2>
                  <p className="text-white/60 text-sm sm:text-base md:text-lg max-w-xl">
                    {currentContent.description}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* CTA */}
              <Link
                href={`/${portfolioType === 'dev' ? 'dev' : '3d'}-portfolio`}
                className={clsx(
                  'group inline-flex items-center gap-2 rounded-full font-medium',
                  'transition-all duration-300 hover:scale-105 active:scale-95',
                  'px-5 py-2 text-sm',
                  portfolioType === 'dev'
                    ? 'bg-gradient-to-r from-blue-400 to-blue-500 text-black'
                    : 'bg-gradient-to-r from-amber-400 to-amber-500 text-black'
                )}
              >
                <span>{currentContent.cta}</span>
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Section Statistiques */}
      <div
        id="stats-numbers"
        className={clsx(
          'relative py-10 px-4 sm:px-6 md:px-8 lg:px-12',
          portfolioType === 'dev'
            ? 'bg-slate-900'
            : 'bg-neutral-900'
        )}
      >
        <div className="mx-auto max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={portfolioType}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col sm:flex-row items-stretch divide-y sm:divide-y-0 sm:divide-x divide-white/10"
            >
              {currentStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  viewport={{ once: true }}
                  className="flex-1 flex items-center gap-3 px-6 py-5"
                >
                  <stat.Icon
                    size={18}
                    strokeWidth={1.5}
                    className={portfolioType === 'dev' ? 'text-blue-400 shrink-0' : 'text-amber-400 shrink-0'}
                  />
                  <div>
                    <p className={clsx(
                      'text-lg font-semibold leading-none mb-0.5',
                      portfolioType === 'dev' ? 'text-blue-300' : 'text-amber-300'
                    )}>
                      {stat.value}
                    </p>
                    <p className="text-xs text-neutral-500">{stat.label}</p>
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
