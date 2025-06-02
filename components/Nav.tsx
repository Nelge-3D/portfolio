'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Volume2, VolumeX } from 'lucide-react';
import clsx from 'clsx';
import Image from 'next/image';
import Welcome from './Welcome';
import Link from 'next/link';

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [audioLevel, setAudioLevel] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const welcomeClosingRef = useRef(false);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'auto';
  }, [menuOpen]);

  // Web Audio API for music visualization
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

  // Lueur dynamique
  const glowOpacityYellow = isPlaying ? Math.min(audioLevel / 150, 1) : 0.3;
  const glowScaleYellow = isPlaying ? 0.9 + audioLevel / 300 : 0.95;
  const glowOpacityPurple = isPlaying ? Math.min(audioLevel / 160, 1) : 0.25;
  const glowScalePurple = isPlaying ? 0.9 + audioLevel / 280 : 0.9;

  return (
    <>
      {showWelcome && <Welcome onClose={handleWelcomeClose} />}

      <nav
        className={clsx(
          'fixed top-0 left-0 w-full flex justify-between items-center px-6 py-4 z-50 backdrop-blur-md shadow-neutral-900',
          {
            'py-2 shadow-md': isScrolled,
          }
        )}
      >
        {/* Logo + lueurs dynamiques */}
        <Link href="/" className="z-50 group cursor-pointer select-none relative">
          <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
            {/* Glow doré */}
            <div
              className="w-44 h-44 rounded-full bg-yellow-400 blur-2xl absolute animate-spin-slow transition-all duration-100 ease-in-out"
              style={{
                animationDuration: '12s',
                opacity: glowOpacityYellow,
                transform: `scale(${glowScaleYellow})`,
              }}
            />
            {/* Glow violet */}
            <div
              className="w-40 h-40 rounded-full bg-violet-600 blur-2xl absolute animate-spin-reverse-slow transition-all duration-100 ease-in-out"
              style={{
                animationDuration: '10s',
                opacity: glowOpacityPurple,
                transform: `scale(${glowScalePurple})`,
              }}
            />
          </div>

          {/* Logo image */}
          <div className="relative w-36 h-20 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-1">
            <Image
              src="/logo.png"
              alt="Logo Nelge 3D"
              layout="fill"
              objectFit="contain"
              priority
              className="drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]"
            />
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-10 items-center font-semibold tracking-wide">
          {[
            ['#hero', 'Home'],
            ['#about', 'À propos'],
            ['#services', 'Mes services'],
            ['#testimonials', 'Témoignages'],
            ['#stats', 'Satisfaction'],
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

        {/* Menu mobile */}
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

      {/* Audio tag */}
      <audio ref={audioRef} loop preload="auto" src="/slowlife.mp3" />
    </>
  );
}
