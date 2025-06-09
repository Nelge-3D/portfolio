'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

export default function StatsSection() {
  const stats = [
    { value: '100+', label: 'rendus de produits finalisés' },
    { value: '95%', label: 'de clients satisfaits' },
    { value: '50+', label: 'marques accompagnées' },
  ];

  return (
    <section id="stats" className="relative">
      {/* Hero */}
      <div
        className="relative bg-cover bg-center min-h-[90vh] flex items-center justify-center px-6 md:px-16 text-white"
        style={{ backgroundImage: "url('/Hero.png')" }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/90 via-black/70 to-transparent z-0 backdrop-blur-[1px]" />

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center text-center md:text-left md:items-start gap-8"
        >
          {/* Texte gauche */}
          <div className="md:w-2/3">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-4 text-white drop-shadow-xl">
              Donnez vie à vos idées avec la <span className="text-amber-300">3D</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-200 max-w-xl leading-relaxed">
              Des visuels immersifs et impactants pour sublimer vos produits et captiver votre audience.
            </p>
          </div>

          {/* Bouton et flèche */}
          <div className="flex flex-col items-center gap-4 mt-6">
            <Link
              href="/portfolio"
              className="inline-block px-7 py-3 rounded-full font-semibold bg-gradient-to-r from-amber-300/80 to-amber-400/80 text-black hover:from-amber-400 hover:to-amber-300 hover:ring-2 hover:ring-white/50 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Voir le portfolio
            </Link>

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-amber-300"
            >
              <ChevronDown className="w-8 h-8" />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Statistiques */}
      <div className="bg-gradient-to-br from-[#fbf9f6] via-[#f6f3ef] to-[#fbf9f6] py-24 px-6 md:px-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#d6cbbd] text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.3 }}
              viewport={{ once: true }}
              className="py-12 px-4"
            >
              <p className="text-5xl font-extrabold text-[#2c1a0f] drop-shadow-sm">{stat.value}</p>
              <p className="mt-3 text-[#4a3b31] text-lg font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
