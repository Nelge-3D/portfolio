'use client';
import React, { useState, useEffect } from 'react';
import { PlayCircle, X, User } from 'lucide-react'; // Ajout de User
// @ts-ignore
import AOS from 'aos';
import 'aos/dist/aos.css';
import Link from 'next/link';

const items = [
  { type: 'image', src: '/renders/modele1.png', title: 'Modèle 3D 1' },
  { type: 'video', src: '/renders/video1.mp4', title: 'Animation 3D 1' },
  { type: 'image', src: '/renders/modele2.png', title: 'Modèle 3D 2' },
  { type: 'video', src: '/renders/video2.mp4', title: 'Animation 3D 2' },
];

export default function Portfolio() {
  const [filter, setFilter] = useState<'all' | 'image' | 'video'>('all');
  const [modal, setModal] = useState<{ type: string; src: string } | null>(null);

  useEffect(() => {
    AOS.init({ once: true, duration: 800 });
  }, []);

  const filteredItems = items.filter((item) => filter === 'all' || item.type === filter);

  return (
    <>
      {/* HEADER avec icône user */}
      <header className="flex justify-end p-4 bg-white shadow-md">
        <Link href="/admin" aria-label="Connexion Admin" className="text-gray-700 hover:text-amber-500 transition-colors">
          <User size={28} />
        </Link>
      </header>

      <section id="portfolio" className="bg-neutral-50 py-24 px-4 md:px-12">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl font-extrabold text-neutral-900 mb-3 tracking-tight">
            Mon Portfolio
          </h2>
          <p className="text-gray-600 mb-12 text-base md:text-lg">
            Créations 3D : modélisation, rendu et animation.
          </p>

          {/* Filtres */}
          <div className="flex justify-center flex-wrap gap-4 mb-14">
            {['all', 'image', 'video'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as any)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${
                  filter === f
                    ? 'bg-amber-500 text-white border-amber-500 shadow-md'
                    : 'bg-white text-gray-800 hover:bg-amber-100 border-gray-300'
                }`}
              >
                {f === 'all' ? 'Tous' : f === 'image' ? 'Images' : 'Vidéos'}
              </button>
            ))}
          </div>

          {/* Grille */}
          <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item, i) => (
              <div
                key={i}
                data-aos="fade-up"
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white cursor-pointer"
                onClick={() => setModal({ type: item.type, src: item.src })}
              >
                {item.type === 'image' ? (
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="relative h-72">
                    <video
                      src={item.src}
                      className="w-full h-full object-cover"
                      muted
                      loop
                      autoPlay
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition">
                      <PlayCircle className="text-white w-12 h-12" />
                    </div>
                  </div>
                )}
                <div className="absolute bottom-0 left-0 w-full bg-black/60 text-white text-sm py-2 px-3 opacity-0 group-hover:opacity-100 transition">
                  {item.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODAL Lightbox */}
      {modal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <button
            className="absolute top-6 right-6 text-white z-50"
            onClick={() => setModal(null)}
          >
            <X size={32} />
          </button>
          <div className="max-w-5xl w-full relative">
            {modal.type === 'image' ? (
              <img src={modal.src} className="w-full h-auto rounded-xl shadow-lg" />
            ) : (
              <video src={modal.src} controls className="w-full h-auto rounded-xl shadow-lg" />
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-neutral-900 text-white py-12 mt-20">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-2">À propos</h3>
            <p className="text-sm text-neutral-400">
              Créateur de contenus 3D passionné par l’innovation visuelle et la narration immersive.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Navigation</h3>
            <ul className="text-sm text-neutral-400 space-y-1">
              <li><a href="#home" className="hover:text-white">Accueil</a></li>
              <li><a href="#portfolio" className="hover:text-white">Portfolio</a></li>
              <li><a href="#contact" className="hover:text-white">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Contact</h3>
            <p className="text-sm text-neutral-400">Mail : contact@monportfolio.com</p>
            <p className="text-sm text-neutral-400">Instagram : @monprofil3d</p>
          </div>
        </div>

        <div className="text-center text-xs text-neutral-500 mt-10">
          © {new Date().getFullYear()} Mon Nom. Tous droits réservés.
        </div>
      </footer>
    </>
  );
}
