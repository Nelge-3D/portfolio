'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Volume2, VolumeX } from 'lucide-react';
import clsx from 'clsx';
import Welcome from './Welcome'; // Import de la modale

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true); // Affiche la modale au départ
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const welcomeClosingRef = useRef(false); // Flag pour suivre si la modale est en cours de fermeture

  // Appliquer un effet quand on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fonction pour toggle musique manuellement
  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((error) => {
          console.error("Erreur lors de la lecture audio:", error);
        });
    }
  };

  // Fermer simplement la modale Welcome
  const handleWelcomeClose = () => {
    if (welcomeClosingRef.current) return;
    welcomeClosingRef.current = true;
    setShowWelcome(false);
    setTimeout(() => {
      welcomeClosingRef.current = false;
    }, 500);
  };

  return (
    <>
      {showWelcome && <Welcome onClose={handleWelcomeClose} />}

      <nav
        className={clsx(
          'fixed top-0 left-0 w-full flex justify-between items-center px-6 py-4 z-50 backdrop-blur-md bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900/90 text-neutral-100 shadow-lg transition-all duration-300',
          {
            'py-2 shadow-md bg-neutral-900/95': isScrolled,
          }
        )}
      >
        {/* Logo amélioré */}
        <a href="/" className="z-50 group cursor-pointer select-none transition-transform duration-300 hover:scale-105">
          <div className="text-2xl font-bold text-white tracking-tight relative">
            <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-white text-transparent bg-clip-text">
              ⌘ Nelge 3D
            </span>

            {/* Halo subtil au hover */}
            <span className="absolute inset-0 blur-md rounded opacity-0 group-hover:opacity-10 bg-amber-300 transition duration-300 pointer-events-none" />
          </div>
        </a>



        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-10 items-center text-base font-semibold tracking-wide">
          {[
            ['/log', 'Home'],
            ['#about', 'À propos'],
            ['#services', 'Mes services'],
            ['#testimonials', 'Témoignages'],
            ['#stats', 'Satisfaction'],
          ].map(([href, label]) => (
            <a
              key={label}
              href={href}
              className="transition-colors duration-250 hover:text-amber-400 hover:underline underline-offset-4"
            >
              {label}
            </a>
          ))}

          <button
            onClick={toggleMusic}
            className="ml-6 hover:text-amber-400 transition-colors duration-250"
            aria-label="Activer/Désactiver musique"
          >
            {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
          </button>
        </div>

        {/* Mobile Burger */}
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

        {/* Drawer mobile */}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-black/10 text-white shadow-lg transform ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          } transition-transform duration-300 ease-in-out z-40 flex flex-col p-9 space-y-4 md:hidden`}
        >
          <button
            onClick={() => setMenuOpen(false)}
            className="ml-auto mb-11 text-neutral-400 hover:text-white transition-colors"
            aria-label="Fermer le menu"
          >
            
          </button>

          {[
            ['/log', 'Home'],
            ['#about', 'À propos'],
            ['#services', 'Services'],
            ['#testimonials', 'Témoignages'],
            ['#stats', 'Satisfaction'],
          ].map(([href, label]) => (
            <a
              key={label}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="w-full block text-lg font-medium px-4 py-3 rounded-lg bg-neutral-800 hover:bg-neutral-700 hover:text-amber-400 transition-colors duration-200"
            >
              {label}
            </a>
          ))}
        </div>

      </nav>

      {/* Audio - sans autoPlay */}
      <audio ref={audioRef} loop preload="auto" src="/slowlife.mp3" />
    </>
  );
}
