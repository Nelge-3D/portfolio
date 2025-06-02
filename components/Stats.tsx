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
        className="relative bg-cover bg-center text-white min-h-[80vh] flex items-center justify-center px-6 md:px-16"
        style={{ backgroundImage: "url('/Hero.png')" }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/60 to-transparent z-0" />

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center text-center md:text-left md:items-start gap-8"

        >
          {/* Texte gauche */}
          <div className="md:w-2/3">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Donnez vie à vos idées avec la <span className="text-amber-300">3D</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-200 max-w-xl">
              Des visuels immersifs et impactants pour sublimer vos produits et captiver votre audience.
            </p>
          </div>

          {/* Bouton à droite */}

          

          <div className="flex flex-col items-center gap-4 mt-6">
            <Link
              href="/portfolio"
              className="inline-block px-6 py-3 rounded-full border-2 border-amber-300 text-white font-semibold shadow-xl hover:shadow-amber-500/50 transition duration-300 hover:-translate-y-1 hover:ring-2 hover:ring-amber-300 ring-offset-2 backdrop-blur-md bg-white/10"
            >
              Voir le portfolio
            </Link>

            {/* Flèche animée sous le bouton */}
            <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="text-amber-300"
              >
                <ChevronDown className="w-8 h-8 animate-pulse" />
              </motion.div>
            </div>
        </motion.div>
      </div>

      {/* Statistiques */}
      <div className="bg-gradient-to-br from-[#f8f4ef] via-[#f9f6f2] to-[#f8f4ef] py-20 px-6 md:px-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#e4dcd4] text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.3 }}
              viewport={{ once: true }}
              className="py-10 px-4"
            >
              <p className="text-5xl font-extrabold text-[#2d0e0e] drop-shadow-md">{stat.value}</p>
              <p className="mt-3 text-[#3a2c27] text-lg font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
