'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ChevronDown, Code, ArrowRight } from 'lucide-react';
import clsx from 'clsx';

export default function StatsSection() {
  const [portfolioType, setPortfolioType] = useState<'dev' | '3d'>('3d');
  
  const stats = {
    dev: [
      { value: '50+', label: 'projets web réalisés', icon: '⚡' },
      { value: '98%', label: 'de clients satisfaits', icon: '💯' },
      { value: '24/7', label: 'support technique', icon: '🛡️' },
    ],
    '3d': [
      { value: '100+', label: 'rendus de produits finalisés', icon: '🎨' },
      { value: '95%', label: 'de clients satisfaits', icon: '⭐' },
      { value: '50+', label: 'marques accompagnées', icon: '🏢' },
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

  const currentContent = content[portfolioType];
  const currentStats = stats[portfolioType];

  return (
    <section id="stats" className="relative overflow-hidden">
      {/* Hero Section avec sélecteur de portfolio */}
      <div
        className="relative bg-cover bg-center min-h-screen flex items-center justify-center"
        style={{ backgroundImage: "url('/Hero.png')" }}
      >
        {/* Overlay dynamique avec gradient */}
        <div className={clsx(
          'absolute inset-0 z-0 transition-all duration-700',
          `bg-gradient-to-tr ${currentContent.bgGradient} via-black/70 to-transparent`,
          'backdrop-blur-[1px]'
        )} />

        {/* Contenu principal avec marges responsives */}
        <div className="relative z-10 w-full">
          {/* Container avec marges adaptatives */}
          <div className={clsx(
            'mx-auto',
            // Marges horizontales responsives
            'px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20',
            // Largeur maximale
            'max-w-7xl xl:max-w-[90rem] 2xl:max-w-[120rem]'
          )}>
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className={clsx(
                'flex flex-col items-center text-center',
                // Alignement sur tablette et desktop
                'md:items-start md:text-left',
                // Espacements verticaux
                'gap-6 sm:gap-8 md:gap-10 lg:gap-12',
                // Marges verticales pour centrage
                'py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28'
              )}
            >
              {/* Sélecteur de portfolio - Responsive */}
              <div className={clsx(
                'flex gap-2 sm:gap-3 p-1',
                'bg-black/30 backdrop-blur-md rounded-full',
                'border border-white/20',
                // Ajustement pour mobile
                'flex-wrap justify-center'
              )}>
                <button
                  onClick={() => setPortfolioType('3d')}
                  className={clsx(
                    'relative rounded-full transition-all duration-300',
                    'flex items-center gap-2 font-medium',
                    // Padding responsif
                    'px-3 sm:px-4 md:px-5 lg:px-6',
                    'py-1.5 sm:py-2 md:py-2.5',
                    // Taille texte
                    'text-xs sm:text-sm md:text-base',
                    portfolioType === '3d'
                      ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-black shadow-lg'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  )}
                >
                  <span className="text-sm sm:text-base md:text-lg">🎨</span>
                  <span>3D & Design</span>
                </button>
                <button
                  onClick={() => setPortfolioType('dev')}
                  className={clsx(
                    'relative rounded-full transition-all duration-300',
                    'flex items-center gap-2 font-medium',
                    // Padding responsif
                    'px-3 sm:px-4 md:px-5 lg:px-6',
                    'py-1.5 sm:py-2 md:py-2.5',
                    // Taille texte
                    'text-xs sm:text-sm md:text-base',
                    portfolioType === 'dev'
                      ? 'bg-gradient-to-r from-blue-400 to-blue-500 text-black shadow-lg'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  )}
                >
                  <Code size={16} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />
                  <span>Développement Web</span>
                </button>
              </div>

              {/* Texte principal avec animation */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={portfolioType}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.5 }}
                  className={clsx(
                    'w-full',
                    // Largeur sur tablette et desktop
                    'md:w-4/5 lg:w-3/4 xl:w-2/3'
                  )}
                >
                  <h2 className={clsx(
                    'font-extrabold tracking-tight leading-tight text-white drop-shadow-xl',
                    // Taille texte responsive
                    'text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl',
                    'mb-2 sm:mb-3 md:mb-4'
                  )}>
                    {currentContent.title}{' '}
                    <span className={clsx(
                      'bg-gradient-to-r bg-clip-text text-transparent',
                      portfolioType === 'dev' 
                        ? 'from-blue-300 to-blue-500' 
                        : 'from-amber-300 to-amber-500'
                    )}>
                      {currentContent.highlight}
                    </span>
                  </h2>
                  <p className={clsx(
                    'text-gray-200 leading-relaxed',
                    // Taille texte responsive
                    'text-sm sm:text-base md:text-lg lg:text-xl',
                    // Largeur maximale
                    'max-w-xl lg:max-w-2xl xl:max-w-3xl'
                  )}>
                    {currentContent.description}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Bouton CTA et flèche animée */}
              <div className="flex flex-col items-center gap-4 sm:gap-5 md:gap-6">
                <Link
                  href={`/${portfolioType === 'dev' ? 'dev' : '3d'}-portfolio`}
                  className={clsx(
                    'group inline-flex items-center gap-2 rounded-full font-semibold',
                    'transition-all duration-300 shadow-lg hover:shadow-xl',
                    'hover:scale-105 active:scale-95',
                    // Padding responsif
                    'px-5 sm:px-6 md:px-7 lg:px-8',
                    'py-2 sm:py-2.5 md:py-3 lg:py-3.5',
                    // Taille texte
                    'text-sm sm:text-base md:text-lg',
                    portfolioType === 'dev'
                      ? 'bg-gradient-to-r from-blue-400 to-blue-500 text-black hover:from-blue-500 hover:to-blue-600'
                      : 'bg-gradient-to-r from-amber-400 to-amber-500 text-black hover:from-amber-500 hover:to-amber-600'
                  )}
                >
                  <span>{currentContent.cta}</span>
                  <ArrowRight className={clsx(
                    'group-hover:translate-x-1 transition-transform',
                    'w-4 h-4 sm:w-5 sm:h-5'
                  )} />
                </Link>

                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  className={clsx(
                    'cursor-pointer',
                    portfolioType === 'dev' ? 'text-blue-300' : 'text-amber-300'
                  )}
                  onClick={() => {
                    const statsSection = document.getElementById('stats-numbers');
                    statsSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <ChevronDown className={clsx(
                    'w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8'
                  )} />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Section Statistiques améliorée */}
      <div id="stats-numbers" className={clsx(
        'relative overflow-hidden',
        // Padding vertical responsif
        'py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 2xl:py-32',
        // Padding horizontal responsif
        'px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20',
        portfolioType === 'dev'
          ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'
          : 'bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900'
      )}>
        {/* Effet de grain subtil */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" 
             style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noise"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%" height="100%" filter="url(%23noise)" opacity="0.1"/%3E%3C/svg%3E")' }} />

        <div className={clsx(
          'mx-auto',
          'max-w-7xl xl:max-w-[90rem] 2xl:max-w-[120rem]'
        )}>
          <AnimatePresence mode="wait">
            <motion.div
              key={portfolioType}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className={clsx(
                'grid',
                // Grille responsive
                'grid-cols-1',
                'sm:grid-cols-2',
                'lg:grid-cols-3',
                // Gaps responsifs
                'gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12'
              )}
            >
              {currentStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={clsx(
                    'group relative text-center rounded-2xl',
                    'backdrop-blur-sm bg-white/5',
                    'border border-white/10 hover:border-white/20',
                    'transition-all duration-500 hover:transform hover:-translate-y-2',
                    'shadow-xl hover:shadow-2xl',
                    // Padding interne responsif
                    'p-5 sm:p-6 md:p-7 lg:p-8 xl:p-10'
                  )}
                >
                  {/* Effet de glow au hover */}
                  <div className={clsx(
                    'absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500',
                    portfolioType === 'dev'
                      ? 'bg-gradient-to-r from-blue-500/10 via-transparent to-blue-500/10'
                      : 'bg-gradient-to-r from-amber-500/10 via-transparent to-amber-500/10'
                  )} />
                  
                  {/* Icône animée */}
                  <div className={clsx(
                    'transform group-hover:scale-110 transition-transform duration-300',
                    'mb-2 sm:mb-3 md:mb-4',
                    'text-3xl sm:text-4xl md:text-5xl lg:text-6xl'
                  )}>
                    {stat.icon}
                  </div>
                  
                  {/* Valeur statistique */}
                  <p className={clsx(
                    'font-extrabold mb-1 sm:mb-2 md:mb-3',
                    'bg-gradient-to-r bg-clip-text text-transparent',
                    'drop-shadow-sm',
                    // Taille texte responsive
                    'text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl',
                    portfolioType === 'dev'
                      ? 'from-blue-400 to-blue-300'
                      : 'from-amber-400 to-amber-300'
                  )}>
                    {stat.value}
                  </p>
                  
                  {/* Label */}
                  <p className={clsx(
                    'font-medium text-gray-300 group-hover:text-gray-200 transition-colors',
                    'text-xs sm:text-sm md:text-base lg:text-lg'
                  )}>
                    {stat.label}
                  </p>

                  {/* Ligne décorative */}
                  <div className={clsx(
                    'absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 rounded-full',
                    'transition-all duration-300 group-hover:w-20',
                    'w-10 sm:w-12',
                    portfolioType === 'dev'
                      ? 'bg-gradient-to-r from-blue-400 to-blue-500'
                      : 'bg-gradient-to-r from-amber-400 to-amber-500'
                  )} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Message contextuel supplémentaire */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className={clsx(
              'text-center',
              'mt-8 sm:mt-12 md:mt-16 lg:mt-20 xl:mt-24'
            )}
          >
            <p className={clsx(
              'text-gray-400',
              'text-xs sm:text-sm md:text-base'
            )}>
              {portfolioType === 'dev' 
                ? '✨ Des solutions web sur mesure pour votre entreprise'
                : '🎨 Des créations 3D uniques qui captivent votre audience'}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}