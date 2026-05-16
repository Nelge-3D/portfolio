'use client';
import styles from './Testimonials.module.css';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ArrowLeft, ArrowRight, Quote, Star } from 'lucide-react';

const testimonials = [
  {
    quote: `La pub 3D qu'il a réalisée pour notre parfum a clairement boosté notre visibilité. L'esthétique, les animations, tout était d'un niveau professionnel.`,
    name: 'Clara M.',
    title: 'Brand Manager',
    avatar: '/avatar-clara.jpg',
    rating: 5,
    company: 'Luxe Parfums',
  },
  {
    quote: `Chaque projet livré était au-delà de nos attentes. Créatif, ponctuel, et toujours à l'écoute. Une valeur sûre !`,
    name: 'Yann D.',
    title: 'Directeur Artistique',
    avatar: '/avatar-yann.jpg',
    rating: 5,
    company: 'Studio Création',
  },
  {
    quote: `Son sens du détail et de l'ambiance est incroyable. Nos produits ont pris une nouvelle dimension grâce à ses rendus.`,
    name: 'Sophie L.',
    title: 'Responsable Communication',
    avatar: '/avatar-sophie.jpg',
    rating: 5,
    company: 'Tech Innovation',
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [direction, setDirection] = useState(0);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const resetAutoPlay = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (isAutoPlay) {
      timeoutRef.current = setTimeout(() => {
        setDirection(1);
        setCurrent((prev) => (prev + 1) % testimonials.length);
      }, 6000);
    }
  }, [isAutoPlay]);

  useEffect(() => {
    resetAutoPlay();
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [current, resetAutoPlay]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlay(false);
    resetAutoPlay();
  }, [resetAutoPlay]);

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlay(false);
    resetAutoPlay();
  }, [resetAutoPlay]);

  const goToSlide = useCallback((index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
    setIsAutoPlay(false);
    resetAutoPlay();
  }, [current, resetAutoPlay]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchMove  = (e: React.TouchEvent) => { touchEndX.current = e.touches[0].clientX; };
  const handleTouchEnd   = () => {
    if (touchStartX.current - touchEndX.current > 50) handleNext();
    else if (touchEndX.current - touchStartX.current > 50) handlePrev();
  };

  const t = testimonials[current];

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative py-24 md:py-32 px-6 md:px-10 text-white bg-gradient-to-br from-[#07000f] via-[#120025] to-[#0a0800] overflow-hidden"
      aria-label="Témoignages clients"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-violet-700/8 rounded-full blur-[90px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-amber-500/6 rounded-full blur-[70px] animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-950/30 rounded-full border border-amber-400/15 mb-6">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-current" />
            <span className="font-body text-xs tracking-widest uppercase text-amber-400/80">Témoignages</span>
          </div>
          <h2
            className="font-display text-4xl md:text-6xl font-light italic bg-gradient-to-br from-white via-violet-200 to-violet-500 bg-clip-text text-transparent mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Ce que disent mes clients
          </h2>
          <p className="font-body text-violet-300/50 text-sm max-w-xl mx-auto">
            Mon travail parle à travers les yeux de ceux qui l&apos;ont expérimenté
          </p>
        </div>

        {/* Card */}
        <div className="relative max-w-3xl mx-auto mb-10">
          <div
            key={current}
            className={`relative bg-gradient-to-br from-violet-950/50 to-purple-950/30 backdrop-blur-xl p-8 md:p-12 rounded-3xl border border-violet-400/12 shadow-2xl shadow-violet-900/20 ${
              direction === 1 ? styles.animateSlideInRight : direction === -1 ? styles.animateSlideInLeft : ''
            }`}
          >
            {/* Quote icon */}
            <div className="absolute -top-4 left-8 w-8 h-8 bg-gradient-to-br from-violet-500 to-amber-400 rounded-full flex items-center justify-center shadow-lg">
              <Quote className="w-4 h-4 text-white" />
            </div>

            {/* Stars */}
            <div className="flex justify-center gap-1 mb-7">
              {[...Array(t.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
              ))}
            </div>

            {/* Quote */}
            <blockquote
              className="font-display text-xl md:text-2xl font-light italic text-violet-100/80 text-center leading-relaxed mb-8"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              &ldquo;{t.quote}&rdquo;
            </blockquote>

            {/* Author */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <div className="relative">
                <img
                  src={t.avatar}
                  alt={`Photo de ${t.name}`}
                  className="w-12 h-12 rounded-full object-cover border-2 border-violet-400/30"
                  onError={(e) => {
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${t.name}&background=6d28d9&color=fff&size=64`;
                  }}
                />
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-amber-400 rounded-full border-2 border-[#0f000f]" />
              </div>
              <div className="text-center sm:text-left">
                <p className="font-body font-semibold text-sm text-white">{t.name}</p>
                <p className="font-body text-xs text-violet-300/60">{t.title}</p>
                <p className="font-body text-[10px] text-violet-400/40 mt-0.5">{t.company}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <div className="flex items-center gap-3">
            <button onClick={handlePrev} className="p-2.5 rounded-full bg-violet-950/50 border border-violet-400/15 text-violet-400 hover:border-violet-400/40 hover:text-white transition-all duration-300">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button onClick={handleNext} className="p-2.5 rounded-full bg-violet-950/50 border border-violet-400/15 text-violet-400 hover:border-violet-400/40 hover:text-white transition-all duration-300">
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`rounded-full transition-all duration-300 ${
                  idx === current
                    ? 'w-6 h-2 bg-gradient-to-r from-violet-400 to-amber-400'
                    : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>

          {!isTouchDevice && (
            <div className="flex items-center gap-1.5 text-[10px] text-violet-500/60 font-body">
              <div className={`w-1.5 h-1.5 rounded-full ${isAutoPlay ? 'bg-amber-400 animate-pulse' : 'bg-gray-600'}`} />
              Auto
            </div>
          )}
        </div>

        {/* Progress */}
        <div className="mt-8 max-w-[180px] mx-auto">
          <div className="w-full bg-white/5 rounded-full h-0.5 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-violet-500 to-amber-400 rounded-full transition-all duration-300"
              style={{ width: `${((current + 1) / testimonials.length) * 100}%` }}
            />
          </div>
          <div className="flex justify-between font-body text-[10px] text-violet-500/40 mt-1.5">
            <span>{current + 1}</span>
            <span>{testimonials.length}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
