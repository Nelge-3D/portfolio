'use client';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ArrowLeft, ArrowRight, Quote, Star } from 'lucide-react';

const testimonials = [
  {
    quote: `La pub 3D qu'il a réalisée pour notre parfum a clairement boosté notre visibilité. L'esthétique, les animations, tout était d'un niveau professionnel.`,
    name: 'Clara M.',
    title: 'Brand Manager',
    avatar: '/avatar-clara.jpg',
    rating: 5,
    company: 'Luxe Parfums'
  },
  {
    quote: `Chaque projet livré était au-delà de nos attentes. Créatif, ponctuel, et toujours à l'écoute. Une valeur sûre !`,
    name: 'Yann D.',
    title: 'Directeur Artistique',
    avatar: '/avatar-yann.jpg',
    rating: 5,
    company: 'Studio Création'
  },
  {
    quote: `Son sens du détail et de l'ambiance est incroyable. Nos produits ont pris une nouvelle dimension grâce à ses rendus.`,
    name: 'Sophie L.',
    title: 'Responsable Communication',
    avatar: '/avatar-sophie.jpg',
    rating: 5,
    company: 'Tech Innovation'
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [direction, setDirection] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const resetAutoPlay = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (isAutoPlay) {
      timeoutRef.current = setTimeout(() => {
        setDirection(1);
        setCurrent((prev) => (prev + 1) % testimonials.length);
      }, 6000);
    }
  }, [isAutoPlay]);

  useEffect(() => {
    resetAutoPlay();
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [current, resetAutoPlay]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 3000);
  }, []);

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 3000);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 3000);
  }, [current]);

  // Gestion du clavier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  const currentTestimonial = testimonials[current];

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 text-white bg-gradient-to-bl from-black via-[#1a002b] to-[#2e0066] overflow-hidden"
      aria-label="Témoignages clients"
    >
      {/* Background effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-400/15 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Floating elements */}
      <div className="absolute top-10 left-10 w-2 h-2 bg-white/30 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
      <div className="absolute top-20 right-20 w-1 h-1 bg-green-400/50 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-20 left-20 w-1.5 h-1.5 bg-purple-400/40 rounded-full animate-bounce" style={{ animationDelay: '2s' }} />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 mb-6 backdrop-blur-sm">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium">Témoignages clients</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
            Ce que disent mes clients
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Mon travail parle à travers les yeux de ceux qui l'ont expérimenté
          </p>
        </div>

        {/* Main testimonial card */}
        <div className="relative max-w-4xl mx-auto mb-12">
          <div 
            className={`bg-white/5 backdrop-blur-xl p-6 sm:p-8 lg:p-12 rounded-3xl shadow-2xl border border-white/10 transition-all duration-700 ease-out transform ${
              direction === 1 ? 'animate-in slide-in-from-right-10' : direction === -1 ? 'animate-in slide-in-from-left-10' : ''
            }`}
            key={current}
          >
            {/* Quote icon */}
            <div className="absolute -top-4 left-8 w-8 h-8 bg-gradient-to-br from-green-400 to-purple-500 rounded-full flex items-center justify-center">
              <Quote className="w-4 h-4 text-white" />
            </div>

            {/* Quote */}
            <blockquote className="text-lg sm:text-xl lg:text-2xl italic leading-relaxed mb-8 text-center font-light">
              "{currentTestimonial.quote}"
            </blockquote>

            {/* Rating */}
            <div className="flex justify-center mb-6">
              {[...Array(currentTestimonial.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>

            {/* Author info */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="relative">
                <img
                  src={currentTestimonial.avatar}
                  alt={`Photo de ${currentTestimonial.name}`}
                  className="w-16 h-16 rounded-full object-cover border-2 border-white/20 shadow-xl"
                  onError={(e) => {
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${currentTestimonial.name}&background=6366f1&color=fff&size=64`;
                  }}
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-white flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              </div>
              <div className="text-center sm:text-left">
                <p className="font-semibold text-lg">{currentTestimonial.name}</p>
                <p className="text-gray-300 text-sm">{currentTestimonial.title}</p>
                <p className="text-gray-400 text-xs mt-1">{currentTestimonial.company}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8">
          {/* Navigation buttons */}
          <div className="flex items-center gap-4">
            <button
              onClick={handlePrev}
              className="group p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 backdrop-blur-sm border border-white/10 hover:border-white/30"
              aria-label="Témoignage précédent"
            >
              <ArrowLeft className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
            </button>
            
            <button
              onClick={handleNext}
              className="group p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 backdrop-blur-sm border border-white/10 hover:border-white/30"
              aria-label="Témoignage suivant"
            >
              <ArrowRight className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
            </button>
          </div>

          {/* Dots indicator */}
          <div className="flex gap-2" role="tablist" aria-label="Navigation des témoignages">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  idx === current 
                    ? 'bg-gradient-to-r from-green-400 to-purple-500 scale-110' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Aller au témoignage ${idx + 1}`}
                role="tab"
                aria-selected={idx === current}
              />
            ))}
          </div>

          {/* Auto-play indicator */}
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <div className={`w-2 h-2 rounded-full ${isAutoPlay ? 'bg-green-400 animate-pulse' : 'bg-gray-500'}`} />
            <span className="hidden sm:inline">Auto</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-8 max-w-xs mx-auto">
          <div className="w-full bg-white/10 rounded-full h-1 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-400 to-purple-500 rounded-full transition-all duration-300 ease-linear"
              style={{ 
                width: `${((current + 1) / testimonials.length) * 100}%` 
              }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>{current + 1}</span>
            <span>{testimonials.length}</span>
          </div>
        </div>
      </div>

      {/* Responsive adjustments for touch devices */}
      <style jsx>{`
        @media (max-width: 640px) {
          .animate-in {
            animation-duration: 0.4s;
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}