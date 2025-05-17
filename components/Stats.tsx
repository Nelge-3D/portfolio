'use client';
import React from 'react';
import { motion } from 'framer-motion';

export default function StatsSection() {
  const stats = [
    { value: '100+', label: 'rendus de produits finalisés' },
    { value: '95%', label: 'de clients satisfaits' },
    { value: '50+', label: 'marques accompagnées' },
  ];

  return (
    <section id="stats">
      {/* Hero avec overlay dégradé et animation */}
      <div className="relative bg-cover bg-center text-white py-32 px-6 md:px-16" style={{ backgroundImage: "url('/Hero.png')" }}>
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-transparent z-0" />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-3xl"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Donnez vie à vos idées avec la 3D
          </h2>
          <p className="text-lg md:text-xl text-gray-200">
            Je conçois des visuels 3D immersifs pour sublimer vos produits et marquer les esprits.
          </p>
        </motion.div>
      </div>

      {/* Statistiques */}
      <div className="bg-[#f8f4ef] py-20 px-6 md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.3 }}
              viewport={{ once: true }}
            >
              <p className="text-5xl font-bold text-[#2d0e0e]">{stat.value}</p>
              <p className="mt-2 text-[#2d0e0e] text-lg">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
