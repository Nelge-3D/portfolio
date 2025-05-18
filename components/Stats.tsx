'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function StatsSection() {
  const stats = [
    { value: '100+', label: 'rendus de produits finalisés' },
    { value: '95%', label: 'de clients satisfaits' },
    { value: '50+', label: 'marques accompagnées' },
  ];

  return (
    <section id="stats">
      {/* Hero */}
      <div
        className="relative bg-cover bg-center text-white min-h-[80vh] flex items-center px-6 md:px-16"
        style={{ backgroundImage: "url('/Hero.png')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/50 to-transparent z-0" />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative z-10 w-full max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6"
        >
          {/* Texte */}
          <div className="md:w-2/3">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Donnez vie à vos idées avec la 3D
            </h2>
            <p className="text-lg md:text-xl text-gray-200">
              Je conçois des visuels 3D immersifs pour sublimer vos produits et marquer les esprits.
            </p>
          </div>

          {/* Bouton */}
          <div className="md:w-1/3 flex justify-start md:justify-end">
            <Link
              href="/portfolio"
              className="inline-block px-6 py-3 rounded-full bg-[#391a14] text-white font-semibold shadow-xl hover:shadow-amber-500/50 transition duration-300 hover:-translate-y-1 hover:ring-2 hover:ring-amber-300 ring-offset-2"
            >
              Voir le portfolio
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Statistiques */}
      <div className="bg-[#f9f6f2] py-20 px-6 md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#e4dcd4] text-center max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.3 }}
              viewport={{ once: true }}
              className="py-6 px-4"
            >
              <p className="text-5xl font-extrabold text-[#2d0e0e]">{stat.value}</p>
              <p className="mt-2 text-[#3a2c27] text-lg font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
