'use client';

import React, { useEffect, useState, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import CardItem from '@/components/portfolio/CardItem';
import ModalViewer from '@/components/portfolio/ModalViewer';
import FilterButton from '@/components/portfolio/FilterButton';
import { Orbitron } from 'next/font/google';
import CreationProcess from '@/components/portfolio/CreationProcess';
import NavPortfolio from '@/components/portfolio/NavPortfolio';

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
  
  const [isScrolled, setIsScrolled] = useState(false);
 
  const [filter, setFilter] = useState<'all' | 'image' | 'video'>('all');
  const [modal, setModal] = useState<Item | null>(null);


  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  





  
  const filteredItems = items.filter(item => filter === 'all' || item.type === filter);

  return (
    <>
      <NavPortfolio/>

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
