'use client';
import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import Link from 'next/link';

export default function Header() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <header id="hero" className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Video with Enhanced Effects */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover transition-all duration-700 ease-out"
        style={{
          filter: `brightness(0.4) contrast(1.2) saturate(1.1)`,
          transform: `scale(1.05) translate(${mousePosition.x * 0.02 - 1}px, ${mousePosition.y * 0.02 - 1}px)`,
        }}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/Hero.png"
      >
        <source src="/Hero_v1.webm" type="video/webm" />
        <source src="/Hero_v1.mp4" type="video/mp4" />
      </video>

      {/* Dynamic Gradient Overlay */}
      <div 
        className="absolute inset-0 transition-all duration-1000 ease-out"
        style={{
          background: `
            radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
              rgba(245, 158, 11, 0.15) 0%, 
              rgba(0, 0, 0, 0.4) 25%, 
              rgba(0, 0, 0, 0.8) 100%
            ),
            linear-gradient(135deg, 
              rgba(0, 0, 0, 0.6) 0%, 
              rgba(0, 0, 0, 0.3) 50%, 
              rgba(0, 0, 0, 0.7) 100%
            )
          `
        }}
      />

      {/* Glassmorphism Effect */}
      <div className="absolute inset-0 backdrop-blur-[0.5px]" />

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-amber-400/30 rounded-full animate-pulse"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <Nav />

      {/* Main Content with Enhanced Typography and Responsive Spacing */}
      <div className="relative z-10 flex items-center justify-center h-full">
        {/* Container avec padding responsive */}
        <div className="w-full mx-auto">
          {/* Padding horizontal et vertical optimisés par breakpoint */}
          <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24">
            <div className="text-center max-w-4xl mx-auto">
              {/* Main Logo/Title */}
              <div 
                className={`transform transition-all duration-1200 ease-out ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
              >
                {/* Margin bottom optimisé */}
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black mb-3 sm:mb-4 md:mb-6 text-white relative">
                  <span className="relative inline-block">
                    Nelge
                    <div className="absolute inset-0 bg-gradient-to-r from-white via-amber-200 to-white bg-clip-text text-transparent animate-pulse" />
                  </span>
                  <span className="relative ml-2 sm:ml-3 md:ml-4 inline-block">
                    <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-300 bg-clip-text text-transparent font-extrabold">
                      3D
                    </span>
                    <div className="absolute -inset-1 bg-gradient-to-r from-amber-400/20 to-yellow-400/20 blur-lg rounded-lg" />
                  </span>
                </h1>
              </div>

              {/* Tagline with Modern Typography */}
              <div 
                className={`transform transition-all duration-1200 ease-out delay-300 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
              >
                {/* Margin bottom optimisé */}
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-4 sm:mb-5 md:mb-6 font-light text-amber-100 leading-relaxed">
                  <span className="font-semibold text-amber-300">Donner vie à l'imaginaire</span>
                  <br />
                  <span className="text-base sm:text-lg md:text-xl text-gray-300">"un pixel à la fois"</span>
                </p>
              </div>

              {/* Description */}
              <div 
                className={`transform transition-all duration-1200 ease-out delay-500 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
              >
                {/* Margin bottom optimisé avec espacement responsive */}
                <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-6 sm:mb-8 md:mb-10 lg:mb-12 max-w-2xl mx-auto leading-relaxed font-light px-2 sm:px-0">
                  Création de designs 3D innovants et immersifs pour transformer vos idées en expériences visuelles extraordinaires
                </p>
              </div>

              {/* Call to Action Buttons */}
              <div 
                className={`transform transition-all duration-1200 ease-out delay-700 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
              >
                {/* Gap responsive pour les boutons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center items-center">
                  <Link 
                    href="#stats" 
                    className="group relative px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-semibold rounded overflow-hidden transition-all duration-300 hover:from-amber-400 hover:to-yellow-400 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/25 text-sm sm:text-base md:text-lg w-auto min-w-[200px] sm:min-w-[220px] md:min-w-[240px]"
                  >
                    <span className="relative z-10">Découvrir mes créations</span>
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                  </Link>
                  
                  {/* Bouton secondaire optionnel */}
                  <Link 
                    href="#contact"
                    className="group relative px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 bg-transparent border-2 border-amber-500 text-amber-400 font-semibold rounded overflow-hidden transition-all duration-300 hover:bg-amber-500/10 hover:scale-105 hover:border-amber-400 text-sm sm:text-base md:text-lg w-auto min-w-[200px] sm:min-w-[220px] md:min-w-[240px]"
                  >
                    <span className="relative z-10">Me contacter</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                </div>
              </div>

              {/* Scroll Indicator */}
              <div 
                className={`absolute bottom-6 sm:bottom-8 md:bottom-10 lg:bottom-12 left-1/2 transform -translate-x-1/2 transition-all duration-1200 ease-out delay-1000 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
              >
                <div className="flex flex-col items-center text-amber-300">
                  <span className="text-xs sm:text-sm font-light mb-2">Défiler</span>
                  <div className="w-5 sm:w-6 h-8 sm:h-10 border-2 border-amber-400/50 rounded-full flex justify-center">
                    <div className="w-1 h-2 sm:h-3 bg-amber-400 rounded-full mt-1.5 sm:mt-2 animate-bounce" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </header>
  );
}