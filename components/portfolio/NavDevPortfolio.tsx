'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Volume2, VolumeX } from 'lucide-react';
import clsx from 'clsx';
import Image from 'next/image';
 // Modale de bienvenue
import Link from 'next/link'; // ← AJOUTE CECI EN HAUT

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const welcomeClosingRef = useRef(false);

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

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((error) => console.error('Erreur audio :', error));
    }
  };

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

      <nav
        className={clsx(
          'fixed top-0 left-0 w-full flex justify-between items-center px-6 py-4 z-50 backdrop-blur-md shadow-neutral-900',
          {
            'py-2 shadow-md': isScrolled,
          }
        )}
      >
        {/* Logo en image avec shadow */}
        <Link href="/" className="z-50 group cursor-pointer select-none relative">
          {/* Glows behind the logo */}
          <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
            {/* Golden glow */}
            <div
              className={clsx(
                "w-44 h-44 rounded-full bg-yellow-400 blur-2xl absolute",
                "animate-spin-slow",
                isPlaying ? "opacity-70 scale-110" : "opacity-30 scale-95",
                "transition-all duration-700 ease-in-out"
              )}
              style={{ animationDuration: '12s' }}
            />
            {/* Purple glow */}
            <div
              className={clsx(
                "w-40 h-40 rounded-full bg-violet-600 blur-2xl absolute",
                "animate-spin-reverse-slow",
                isPlaying ? "opacity-60 scale-105" : "opacity-25 scale-90",
                "transition-all duration-700 ease-in-out"
              )}
              style={{ animationDuration: '10s' }}
            />
          </div>

          {/* Logo image */}
          <div className="relative w-36 h-20 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-1">
            <Image
              src="/logo.png"
              alt="Logo Nelge 3D"
              fill
              style={{ objectFit: 'contain' }}
              priority
              className="drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]"
            />
          </div>
        </Link>




        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-10 items-center font-semibold tracking-wide">
          {[
            ['/', 'Home'],
            ['/portfolio', '3D Portfolio'],
          ].map(([href, label]) => (
            <a
              key={label}
              href={href}
              className="text-white transition duration-250 hover:text-amber-400 hover:underline underline-offset-4 drop-shadow-md"
            >
              {label}
            </a>
          ))}

          <button
            onClick={toggleMusic}
            className="ml-6 text-white/80 hover:text-amber-400 transition duration-300 group relative"
            aria-label="Activer/Désactiver musique"
          >
            {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
            <span className="absolute -top-6 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition text-xs bg-black/70 px-2 py-1 rounded text-white">
              {isPlaying ? 'Pause' : 'Play'}
            </span>
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
          } transition-transform duration-300 ease-in-out z-40 flex flex-col p-9 space-y-4 md:hidden backdrop-blur-lg`}
        >
          <button
            onClick={() => setMenuOpen(false)}
            className="ml-auto mb-11 text-neutral-400 hover:text-white transition-colors"
            aria-label="Fermer le menu"
          />

          {[
            ['/', 'Home'],
            ['/portfolio', '3D Portfolio'],
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

      {/* Audio */}
      <audio ref={audioRef} loop preload="auto" src="/slowlife.mp3" />
    </>
  );
}
