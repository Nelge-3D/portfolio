'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiPrisma,
  SiFirebase,
  SiReact,
} from 'react-icons/si';
import { motion } from 'framer-motion';
import ThreeDModelViewer from '@/components/portfolio/ThreeDModelviewer';
import NavDevPortfolio from '@/components/portfolio/NavDevPortfolio';





const projects = [
  {
    title: 'Redesign ',
    url: 'https://economy-five.vercel.app/',
    image: '/projects/economy.png',
    description: "Une proposition pour le ministère de l'économie.",
    category: 'ONG',
    tags: ['UX/UI', 'Travail collaboratif'],
  },
  {
    title: 'Site Auth NextAuth',
    url: 'https://auth-theta-fawn.vercel.app',
    image: '/projects/auth.png',
    description: "Projet démonstratif d'authentification sécurisée avec NextAuth.js.",
    category: 'Auth',
  },
  {
    title: 'Bellashop E-commerce',
    url: 'https://bellashop-flax.vercel.app',
    image: '/projects/bellashop.png',
    description: "Boutique en ligne collaborative pour la vente de produits éthiques.",
    category: 'E-commerce',
  },
  {
    title: 'Villa Rouge Réservation',
    url: 'https://villa-rouge.vercel.app',
    image: '/projects/villarouge2.png',
    description: "Plateforme de réservation d’hôtel avec une interface intuitive.",
    category: 'Hôtellerie',
  },
];

const stack = [
  { icon: <SiNextdotjs />, label: 'Next.js' },
  { icon: <SiTailwindcss />, label: 'Tailwind CSS' },
  { icon: <SiTypescript />, label: 'TypeScript' },
  { icon: <SiVercel />, label: 'Vercel' },
  { icon: <SiPrisma />, label: 'Prisma' },
  { icon: <SiFirebase />, label: 'Firebase' },
  { icon: <SiReact />, label: 'React' },
];

const categories = ['Tous', 'ONG', 'Auth', 'E-commerce', 'Hôtellerie'];

export default function DevPortfolio() {
  const [activeCategory, setActiveCategory] = useState('Tous');

  const filteredProjects =
    activeCategory === 'Tous'
      ? projects
      : projects.filter((project) => project.category === activeCategory);

      return (
        <section className="bg-gray-900 text-white min-h-screen py-50 px-4 md:px-12">
          <NavDevPortfolio/>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-10">
          🚀 Portfolio Développeur
        </h2>
      

        {/* Stack */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-6 justify-items-center mb-20">
          {stack.map((tech, i) => (
            <motion.div
              whileHover={{ scale: 1.2, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
              key={i}
              className="flex flex-col items-center text-center text-white"
            >
              <div className="text-4xl mb-2">{tech.icon}</div>
              <p className="text-sm font-medium">{tech.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Filtrage */}
        <div className="flex flex-wrap gap-4 justify-center mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-full text-sm transition ${
                activeCategory === cat
                  ? 'bg-cyan-500 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects */}
        <div className="grid gap-10 md:grid-cols-2">
          {filteredProjects.map((project, i) => (
            
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
            >
              <a href={project.url} target="_blank" rel="noopener noreferrer">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={600}
                  height={300}
                  className="w-full h-48 object-cover"
                />
              </a>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-sm text-gray-300">{project.description}</p>
                 {/* ✅ Affichage des tags */}
                {project.tags && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-purple-700/30 border border-purple-400 text-purple-200 text-xs px-2 py-1 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-cyan-400 hover:underline"
                >
                  Voir le site
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 3D Regab */}
        <div className="mt-24">
          <ThreeDModelViewer />
        </div>
      </div>
      <section className="mt-32 text-center">
        <h3 className="text-3xl font-bold text-white mb-4 ">📩 Me contacter</h3>
        <div className="flex justify-center gap-10">
          <a href="https://github.com/tonprofil" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-amber-400 ">GitHub</a>
          <a href="https://linkedin.com/in/tonprofil" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-amber-400 ">LinkedIn</a>
        </div>
      </section>

    </section>
    
  );
}
