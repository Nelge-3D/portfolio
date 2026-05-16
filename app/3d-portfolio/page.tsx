'use client';

import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import GalleryAccordion from '@/components/portfolio/GalleryAccordion';
import ModalViewer from '@/components/portfolio/ModalViewer';
import FilterButton from '@/components/portfolio/FilterButton';
import CreationProcess from '@/components/portfolio/CreationProcess';
import { portfolioItems, type PortfolioItem } from '@/data/portfolioItems';
import { SiGithub, SiLinkedin } from 'react-icons/si';
import { motion } from 'framer-motion';

export default function Portfolio() {
  const [filter, setFilter] = useState<'all' | 'image' | 'video'>('all');
  const [modal, setModal] = useState<PortfolioItem | null>(null);

  useEffect(() => {
    AOS.init({ duration: 900, once: true, easing: 'ease-out-cubic' });
  }, []);

  const filteredItems = portfolioItems.filter(
    (item) => filter === 'all' || item.type === filter
  );

  return (
    <div className="relative min-h-screen bg-[#0c0800] text-white overflow-hidden">
      {/* ── Ambient blobs ── */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 right-1/4 w-[600px] h-[600px] rounded-full bg-amber-600/8 blur-[130px] animate-pulse" />
        <div className="absolute top-1/2 -left-24 w-[500px] h-[500px] rounded-full bg-yellow-500/6 blur-[100px] animate-pulse delay-500" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-violet-600/5 blur-[80px] animate-pulse delay-1000" />
      </div>

      {/* ══════════════ HERO ══════════════ */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center pt-44 pb-24 px-6">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-body text-xs tracking-[0.35em] uppercase text-amber-500/80 mb-6"
        >
          Créations 3D · Blender · Gabon
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.15 }}
          className="font-display text-6xl md:text-8xl font-semibold italic leading-[0.92] tracking-[-0.02em] mb-8"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          <span className="bg-gradient-to-br from-amber-100 via-amber-300 to-amber-500 bg-clip-text text-transparent">
            Portfolio
          </span>
          <br />
          <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-200 bg-clip-text text-transparent">
            3D Design
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="font-body text-amber-200/50 text-base md:text-lg max-w-xl leading-relaxed mb-10"
        >
          Modélisation, rendu et animation — de la structure jusqu&apos;au visuel final.
        </motion.p>

        {/* Ornament divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="flex items-center gap-4"
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-400/60" />
          <div className="w-1.5 h-1.5 rounded-full bg-violet-400" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-400/60" />
        </motion.div>
      </section>

      {/* ══════════════ GALLERY ══════════════ */}
      <section className="relative z-10 pb-10 px-4 md:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Filter */}
          <div data-aos="zoom-in" className="flex justify-center flex-wrap gap-3 mb-14">
            <FilterButton label="Tous"   value="all"   isActive={filter === 'all'}   onClick={() => setFilter('all')} />
            <FilterButton label="Images" value="image" isActive={filter === 'image'} onClick={() => setFilter('image')} />
            <FilterButton label="Vidéos" value="video" isActive={filter === 'video'} onClick={() => setFilter('video')} />
          </div>

          <div data-aos="fade-up">
            <GalleryAccordion items={filteredItems} onSelect={(item) => setModal(item)} />
          </div>
        </div>
      </section>

      {modal && <ModalViewer modal={modal} onClose={() => setModal(null)} />}

      <CreationProcess />

      {/* ══════════════ CONTACT ══════════════ */}
      <section className="relative z-10 py-32 px-6 text-center">
        {/* Ornament */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-400/50" />
          <div className="w-1 h-1 rounded-full bg-violet-400/60" />
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-400/50" />
        </div>

        <h3
          className="font-display text-4xl md:text-5xl font-light italic text-white mb-3"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Travaillons ensemble
        </h3>
        <p className="font-body text-sm text-amber-300/50 mb-10">
          Disponible pour des missions freelance
        </p>

        <div className="flex justify-center gap-4">
          <a
            href="https://github.com/Nelge-3D"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body flex items-center gap-2.5 px-6 py-3 rounded-full border border-amber-400/20 bg-amber-950/30 text-amber-300 hover:border-amber-400/60 hover:text-white hover:bg-amber-900/40 hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-300 text-sm"
          >
            <SiGithub className="text-base" />
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/louis-geriel-ngabi/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body flex items-center gap-2.5 px-6 py-3 rounded-full border border-violet-400/20 bg-violet-950/20 text-violet-300 hover:border-violet-400/60 hover:text-white hover:bg-violet-900/30 hover:shadow-lg hover:shadow-violet-600/20 transition-all duration-300 text-sm"
          >
            <SiLinkedin className="text-base" />
            LinkedIn
          </a>
        </div>
      </section>
    </div>
  );
}
