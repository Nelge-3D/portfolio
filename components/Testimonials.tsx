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
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Détection des appareils tactiles
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

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

  // Gestion du clavier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Gestion des gestes tactiles
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      handleNext();
    } else if (touchEndX.current - touchStartX.current > 50) {
      handlePrev();
    }
  };

  const currentTestimonial = testimonials[current];

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 2xl:py-32 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-14 text-white bg-gradient-to-bl from-black via-[#1a002b] to-[#2e0066] overflow-hidden"
      aria-label="Témoignages clients"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background effects - adaptés pour mobile */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-green-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 bg-purple-400/15 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-0 sm:px-0 lg:px-2">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/5 rounded-full border border-white/10 mb-3 sm:mb-4 md:mb-6 backdrop-blur-sm">
            <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
            <span className="text-xs sm:text-sm font-medium">Témoignages clients</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 sm:mb-3 md:mb-4 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
            Ce que disent mes clients
          </h2>
          <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed px-2 sm:px-4">
            Mon travail parle à travers les yeux de ceux qui l'ont expérimenté
          </p>
        </div>

        {/* Main testimonial card */}
        <div className="relative max-w-4xl mx-auto mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          <div 
            className={`
              bg-white/5 backdrop-blur-xl 
              p-5 sm:p-6 md:p-8 lg:p-10 xl:p-12
              rounded-xl sm:rounded-2xl md:rounded-3xl
              shadow-lg sm:shadow-xl md:shadow-2xl 
              border border-white/10 
              transition-all duration-500 ease-out 
              ${direction === 1 ? 'animate-slide-in-right' : 
                direction === -1 ? 'animate-slide-in-left' : ''}
            `}
            key={current}
          >
            {/* Quote icon */}
            <div className="absolute -top-3 sm:-top-4 left-4 sm:left-6 md:left-8 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-gradient-to-br from-green-400 to-purple-500 rounded-full flex items-center justify-center">
              <Quote className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-white" />
            </div>

            {/* Quote */}
            <blockquote className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl italic leading-relaxed mb-4 sm:mb-6 md:mb-8 text-center font-light px-1 sm:px-2">
              "{currentTestimonial.quote}"
            </blockquote>

            {/* Rating */}
            <div className="flex justify-center mb-3 sm:mb-4 md:mb-6 gap-0.5 sm:gap-1">
              {[...Array(currentTestimonial.rating)].map((_, i) => (
                <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-yellow-400 fill-current" />
              ))}
            </div>

            {/* Author info */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 md:gap-4">
              <div className="relative">
                <img
                  src={currentTestimonial.avatar}
                  alt={`Photo de ${currentTestimonial.name}`}
                  className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full object-cover border-2 border-white/20 shadow-md sm:shadow-lg"
                  onError={(e) => {
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${currentTestimonial.name}&background=6366f1&color=fff&size=64`;
                  }}
                />
                <div className="absolute -bottom-0.5 sm:-bottom-1 -right-0.5 sm:-right-1 w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 bg-green-400 rounded-full border border-white flex items-center justify-center">
                  <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white rounded-full" />
                </div>
              </div>
              <div className="text-center sm:text-left">
                <p className="font-semibold text-sm sm:text-base md:text-lg">
                  {currentTestimonial.name}
                </p>
                <p className="text-gray-300 text-xs sm:text-sm">
                  {currentTestimonial.title}
                </p>
                <p className="text-gray-400 text-[11px] sm:text-xs mt-0 sm:mt-0.5">
                  {currentTestimonial.company}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          {/* Navigation buttons */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            <button
              onClick={handlePrev}
              className="group p-1.5 sm:p-2 md:p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 backdrop-blur-sm border border-white/10 hover:border-white/30"
              aria-label="Témoignage précédent"
            >
              <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform duration-200" />
            </button>
            
            <button
              onClick={handleNext}
              className="group p-1.5 sm:p-2 md:p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 backdrop-blur-sm border border-white/10 hover:border-white/30"
              aria-label="Témoignage suivant"
            >
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform duration-200" />
            </button>
          </div>

          {/* Dots indicator */}
          <div className="flex gap-1 sm:gap-1.5 md:gap-2" role="tablist" aria-label="Navigation des témoignages">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`rounded-full transition-all duration-300 w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 ${
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

          {/* Auto-play indicator - hidden on mobile */}
          {!isTouchDevice && (
            <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-gray-400">
              <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${isAutoPlay ? 'bg-green-400 animate-pulse' : 'bg-gray-500'}`} />
              <span className="hidden sm:inline text-[10px] sm:text-xs">Auto</span>
            </div>
          )}
        </div>

        {/* Progress bar */}
        <div className="mt-4 sm:mt-6 md:mt-8 max-w-[200px] sm:max-w-[250px] md:max-w-xs mx-auto">
          <div className="w-full bg-white/10 rounded-full h-0.5 sm:h-1 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-400 to-purple-500 rounded-full transition-all duration-300 ease-linear"
              style={{ 
                width: `${((current + 1) / testimonials.length) * 100}%` 
              }}
            />
          </div>
          <div className="flex justify-between text-[10px] sm:text-xs text-gray-400 mt-1 sm:mt-2">
            <span>{current + 1}</span>
            <span>{testimonials.length}</span>
          </div>
        </div>
      </div>

      {/* Animations CSS */}
      <style jsx>{`
        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.5s ease-out forwards;
        }
        
        .animate-slide-in-left {
          animation: slide-in-left 0.5s ease-out forwards;
        }
        
        @media (max-width: 640px) {
          .animate-slide-in-right,
          .animate-slide-in-left {
            animation-duration: 0.3s;
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