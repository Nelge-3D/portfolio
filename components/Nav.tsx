'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Volume2, VolumeX } from 'lucide-react';
import clsx from 'clsx';

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {
        // certains navigateurs bloquent autoplay : on ne fait rien
      });
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <nav
      className={clsx(
        'fixed top-0 left-0 w-full flex justify-between items-center px-6 py-4 z-50 backdrop-blur-md bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900/80 text-neutral-100 shadow-lg transition-all duration-300',
        {
          'py-2 shadow-md bg-neutral-900/90': isScrolled,
        }
      )}
    >
      {/* Logo */}
      <div className="text-2xl font-bold z-50 transition-transform duration-300 hover:scale-105">
        <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-white text-transparent bg-clip-text px-2 py-1 rounded shadow-sm hover:shadow-amber-300/40 hover:brightness-125 transition-all duration-300">
          ⌘ Nelge 3D
        </span>
      </div>

      {/* Desktop Nav */}
      <div className="hidden md:flex space-x-8 items-center text-sm font-medium">
        {[
          ['/', 'Home'],
          ['#about', 'À propos'],
          ['#services', 'Mes services'],
          ['#testimonials', 'Témoignages'],
          ['#stats', 'Satisfaction'],
        ].map(([href, label]) => (
          <a
            key={label}
            href={href}
            className="transition-all duration-200 hover:text-amber-300 hover:underline underline-offset-4"
          >
            {label}
          </a>
        ))}

        {/* Bouton musique */}
        <button
          onClick={toggleMusic}
          className="ml-4 hover:text-amber-300 transition-all duration-200"
          aria-label="Activer/Désactiver musique"
        >
          {isPlaying ? <Volume2 size={22} /> : <VolumeX size={22} />}
        </button>
      </div>

      {/* Mobile Burger */}
      <div className="md:hidden z-50 flex items-center gap-4">
        {/* Mobile bouton musique */}
        <button
          onClick={toggleMusic}
          className="hover:text-amber-300 transition-all"
          aria-label="Activer/Désactiver musique"
        >
          {isPlaying ? <Volume2 size={22} /> : <VolumeX size={22} />}
        </button>

        <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Side Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-64 backdrop-blur-xl bg-neutral-900/95 text-neutral-100 transform ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out z-40 flex flex-col items-start p-6 space-y-6 md:hidden`}
      >
        <button
          onClick={() => setMenuOpen(false)}
          className="ml-auto mb-6 text-neutral-400 hover:text-white"
          aria-label="Close menu"
        >
          <X size={28} />
        </button>
        {[
          ['/', 'Home'],
          ['#about', 'À propos'],
          ['#services', 'Services'],
          ['#testimonials', 'Témoignages'],
          ['#stats', 'Satisfaction'],
        ].map(([href, label]) => (
          <a
            key={label}
            href={href}
            onClick={() => setMenuOpen(false)}
            className="text-lg font-medium hover:text-amber-300 transition-colors"
          >
            {label}
          </a>
        ))}
      </div>

      {/* Audio player caché */}
      <audio ref={audioRef} loop src="/slowlife.mp3" preload="auto" />
    </nav>
  );
}
