'use client';

import React, { useEffect, useState, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Link from 'next/link';
import Image from 'next/image';
import CardItem from '@/components/portfolio/CardItem';
import ModalViewer from '@/components/portfolio/ModalViewer';
import FilterButton from '@/components/portfolio/FilterButton';
import { Menu, X, Volume2, VolumeX } from 'lucide-react';
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [filter, setFilter] = useState<'all' | 'image' | 'video'>('all');
  const [modal, setModal] = useState<Item | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);

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

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'auto';
  }, [menuOpen]);

  // Audio visualization
  useEffect(() => {
  if (!audioRef.current || analyserRef.current) return;

  const audio = audioRef.current;
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

  // Stocker le contexte dans une ref si tu veux le réutiliser plus tard
  const source = audioContext.createMediaElementSource(audio);
  const analyser = audioContext.createAnalyser();
  analyser.fftSize = 256;

  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  source.connect(analyser);
  analyser.connect(audioContext.destination);

  analyserRef.current = analyser;
  dataArrayRef.current = dataArray;

  const update = () => {
    if (analyserRef.current && dataArrayRef.current) {
      analyserRef.current.getByteFrequencyData(dataArrayRef.current);
      const average = dataArrayRef.current.reduce((sum, val) => sum + val, 0) / bufferLength;
      setAudioLevel(average);
    }
    requestAnimationFrame(update);
  };

  update();

  return () => {
    audioContext.close();
  };
}, []);


  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
    }
  };

  const glowOpacity = isPlaying ? Math.min(audioLevel / 150, 1) : 0.3;
  const glowScale = isPlaying ? 0.9 + audioLevel / 300 : 0.95;

  const filteredItems = items.filter(item => filter === 'all' || item.type === filter);

  return (
    <>
      <audio ref={audioRef} loop preload="auto" src="/slowlife.mp3" />

      <nav
        className={clsx(
          'fixed top-0 left-0 w-full flex justify-between items-center px-6 py-4 z-50 backdrop-blur-md bg-gray-900',
          { 'py-2 shadow-md': isScrolled }
        )}
      >
        {/* Logo avec lueurs */}
        <Link href="/" className="z-50 group cursor-pointer select-none relative">
          <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
            <div
              className="w-44 h-44 rounded-full bg-yellow-400 blur-2xl absolute animate-spin-slow"
              style={{
                animationDuration: '12s',
                opacity: glowOpacity,
                transform: `scale(${glowScale})`,
              }}
            />
            <div
              className="w-40 h-40 rounded-full bg-violet-600 blur-2xl absolute animate-spin-reverse-slow"
              style={{
                animationDuration: '10s',
                opacity: glowOpacity * 0.8,
                transform: `scale(${glowScale * 0.95})`,
              }}
            />
          </div>
          <div className="relative w-32 h-14 transition-transform duration-300 group-hover:scale-110">
            <Image src="/logo.png" alt="Logo" fill className="object-contain" />
          </div>
        </Link>

        {/* Navigation desktop */}
        <div className="hidden md:flex space-x-10 items-center text-white font-semibold tracking-wide">
          {[
            ['/', 'Home'],
            ['/dev-portfolio', 'Dev Portfolio'],
          ].map(([href, label]) => (
            <a
              key={label}
              href={href}
              className="transition-colors duration-250 hover:text-amber-400 hover:underline underline-offset-4"
            >
              {label}
            </a>
          ))}
          <button onClick={toggleMusic} className="hover:text-amber-400 transition-colors" aria-label="Toggle musique">
            {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
          </button>
        </div>

        {/* Mobile */}
                <div className="md:hidden z-50 flex items-center gap-4">
                  <button
                    onClick={toggleMusic}
                    className="hover:text-amber-400 text-white transition-colors duration-300"
                    aria-label="Activer/Désactiver musique"
                  >
                    {isPlaying ? <Volume2 size={22} /> : <VolumeX size={22} />}
                  </button>
                  <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                    className="text-white hover:text-amber-400 transition-colors duration-300"
                  >
                    {menuOpen ? <X size={28} /> : <Menu size={28} />}
                  </button>
                </div>

        {/* Menu latéral mobile */}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-black/10 text-white shadow-lg transform ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          } transition-transform duration-300 ease-in-out z-40 flex flex-col p-9 space-y-4 md:hidden backdrop-blur-lg`}
        >
          <button
            onClick={() => setMenuOpen(false)}
            className="ml-auto mb-11 text-neutral-400 hover:text-white transition-colors"
            aria-label="Fermer le menu"
          />

          {[
            ['#hero', 'Home'],
            ['#about', 'À propos'],
            ['#services', 'Services'],
            ['#testimonials', 'Témoignages'],
            ['#stats', 'Satisfaction'],
          ].map(([href, label]) => (
            <a
              key={label}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="w-full block text-lg font-medium px-4 py-3 rounded-xl bg-black/70 shadow-md hover:text-amber-400 transition duration-200"
            >
              {label}
            </a>
          ))}
        </div>
      </nav>

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

      {/* Audio tag */}
      <audio ref={audioRef} loop preload="auto" src="/slowlife.mp3" />
    </>
  );
}
