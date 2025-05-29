'use client';

import React, { useEffect, useState, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Link from 'next/link';
import CardItem from '@/components/portfolio/CardItem';
import ModalViewer from '@/components/portfolio/ModalViewer';
import FilterButton from '@/components/portfolio/FilterButton';
import { User, Menu, X, Volume2, VolumeX } from 'lucide-react';
import { Orbitron } from 'next/font/google';
import CreationProcess from '@/components/portfolio/CreationProcess';
import clsx from 'clsx';

// Définition du type pour les éléments du portfolio
type Item = {
  type: 'image' | 'video';
  src: string;
  title: string;
};

const items: Item[] = [
  { type: 'image', src: '/renders/modele1.png', title: 'Modèle 3D 1' },
  { type: 'video', src: '/renders/video4.mp4', title: 'Animation 3D 4' },
  { type: 'video', src: '/renders/video1.mp4', title: 'Animation 3D 1' },
  { type: 'image', src: '/renders/modele3.png', title: 'Modèle 3D 3' },
  { type: 'image', src: '/renders/modele2.png', title: 'Modèle 3D 2' },
  { type: 'video', src: '/renders/video2.mp4', title: 'Animation 3D 2' },
  { type: 'video', src: '/renders/video3.mp4', title: 'Animation 3D 3' },
  { type: 'image', src: '/renders/modele5.png', title: 'Modèle 3D 5' },
  { type: 'image', src: '/renders/modele_4.png', title: 'Modèle 3D 4' },
];

const orbitron = Orbitron({ subsets: ['latin'], weight: ['600'] });

export default function Portfolio() {
  const [filter, setFilter] = useState<'all' | 'image' | 'video'>('all');
  const [modal, setModal] = useState<Item | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      AOS.init({ once: true, duration: 800 });

      const handleScroll = () => {
        setIsScrolled(window.scrollY > 10);
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(console.error);
    }
  };

  const filteredItems = items.filter((item) => filter === 'all' || item.type === filter);

  return (
    <>
      <nav
        className={clsx(
          'fixed top-0 left-0 w-full flex justify-between items-center px-6 py-4 z-50 backdrop-blur-md bg-gray-900',
          {
            'py-2 shadow-md bg-gray-900': isScrolled,
          }
        )}
      >
        <a href="/" className="z-50 group cursor-pointer select-none transition-transform duration-300 hover:scale-105">
          <div className="text-2xl font-bold text-white tracking-tight relative">
            <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-white text-transparent bg-clip-text">
              ⌘ Nelge 3D
            </span>
            <span className="absolute inset-0 blur-md rounded opacity-0 group-hover:opacity-10 bg-amber-300 transition duration-300 pointer-events-none" />
          </div>
        </a>

        <div className="hidden md:flex space-x-10 items-center text-white font-semibold tracking-wide">
          {[['/', 'Home'], ['/dev-portfolio', 'Dev Portfolio'], ].map(([href, label]) => (
            <a key={label} href={href} className="transition-colors duration-250 hover:text-amber-400 hover:underline underline-offset-4">
              {label}
            </a>
          ))}
          <button onClick={toggleMusic} className="ml-6 hover:text-amber-400 transition-colors duration-250" aria-label="Activer/Désactiver musique">
            {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
          </button>
        </div>

        <div className="md:hidden z-50 flex items-center gap-4">
          <button onClick={toggleMusic} className="hover:text-amber-400 text-white transition-colors duration-300" aria-label="Activer/Désactiver musique">
            {isPlaying ? <Volume2 size={22} /> : <VolumeX size={22} />}
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" className="text-white hover:text-amber-400 transition-colors duration-300">
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        <div
          className={`fixed top-0 right-0 h-full w-64 bg-black/10 text-white shadow-lg transform ${menuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out z-40 flex flex-col p-9 space-y-4 md:hidden`}
        >
          <button onClick={() => setMenuOpen(false)} className="ml-auto mb-11 text-neutral-400 hover:text-white transition-colors" aria-label="Fermer le menu" />
          {[['/', 'Home'], ['/dev-portfolio', 'Dev Portfolio']].map(([href, label]) => (
            <a key={label} href={href} onClick={() => setMenuOpen(false)} className="w-full block text-lg font-medium px-4 py-3 rounded-lg bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 hover:text-amber-400 transition-colors duration-200">
              {label}
            </a>
          ))}
        </div>
      </nav>

      <audio ref={audioRef} loop preload="auto" src="/slowlife.mp3" />

      <section className="bg-gradient-to-b from-gray-900 to-black text-white py-24 px-4 md:px-12 pt-40">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className={`${orbitron.className} text-5xl font-extrabold`}>Mon Portfolio</h2>
          <p className="text-gray-600 mb-12 text-base md:text-lg">
            Créations 3D : modélisation, rendu et animation.
          </p>

          <div data-aos="zoom-in" className="flex justify-center flex-wrap gap-4 mb-14">
            <FilterButton label="Tous" value="all" isActive={filter === 'all'} onClick={() => setFilter('all')} />
            <FilterButton label="Images" value="image" isActive={filter === 'image'} onClick={() => setFilter('image')} />
            <FilterButton label="Vidéos" value="video" isActive={filter === 'video'} onClick={() => setFilter('video')} />
          </div>

          <div data-aos="fade-up-right" className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item, i) => (
              <CardItem key={i} item={item} onClick={() => setModal(item)} />
            ))}
          </div>
        </div>
      </section>

      {modal && <ModalViewer modal={modal} onClose={() => setModal(null)} />}
      <CreationProcess />

      <section className="bg-gradient-to-b from-gray-900 to-black text-white text-center">
        <h3 className="text-3xl font-bold text-white mb-4">📩 Me contacter</h3>
        <div className="flex justify-center h-20 gap-6">
          <a href="https://github.com/tonprofil" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-amber-400">GitHub</a>
          <a href="https://linkedin.com/in/tonprofil" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-amber-400">LinkedIn</a>
        </div>
      </section>
    </>
  );
}
