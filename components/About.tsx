'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const introBlocks = [
    "Je suis un passionné de 3D spécialisé dans la création de publicités visuelles et de scènes immersives. J'accorde une grande importance à l'esthétique, aux détails et à la narration visuelle.",
    "Mon objectif est de donner vie à des idées grâce à Blender, Unity, ou Unreal Engine, en associant technologie et émotion. Chaque projet est conçu pour marquer les esprits et valoriser l'univers du client."
  ];

  const infoBlocks = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: "Philosophie de création",
      content: "Créer avec intention, équilibrer technique et émotion, capturer l'essence d'un concept pour le rendre mémorable."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Compétences techniques",
      content: "Blender • Unity • Unreal Engine • After Effects • Figma • Substance Painter • Photoshop"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      ),
      title: "Setup",
      content: "PC RTX 4070 • 32Go RAM • Écran 2K 144Hz • Tablette Wacom Intuos Pro"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Mon parcours",
      content: (
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-amber-400 rounded-full flex-shrink-0"></div>
            <span>2021 – Débuts sur Blender</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-amber-400/70 rounded-full flex-shrink-0"></div>
            <span>2022 – Freelance en motion design</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-amber-400/50 rounded-full flex-shrink-0"></div>
            <span>2023 – Intégration 3D web interactif</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-amber-400/30 rounded-full flex-shrink-0"></div>
            <span>2024 – Portfolio & projets personnels</span>
          </div>
        </div>
      )
    }
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-16 sm:py-20 lg:py-32 px-4 sm:px-6 lg:px-8 min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden"
    >
      {/* Effets de fond animés */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Titre principal */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 tracking-tight bg-gradient-to-r from-white via-amber-200 to-amber-400 bg-clip-text text-transparent transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            À propos de moi
          </h2>
          <div className={`w-20 sm:w-24 h-1 bg-gradient-to-r from-amber-400 to-transparent mx-auto transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
          }`}></div>
        </div>

        {/* Blocs d'introduction */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-16 sm:mb-20 lg:mb-24">
          {introBlocks.map((text, i) => (
            <div
              key={i}
              className={`group relative backdrop-blur-xl bg-gradient-to-br from-white/15 to-white/5 p-6 sm:p-8 lg:p-10 rounded-3xl border border-white/20 shadow-2xl transition-all duration-700 ease-out hover:scale-[1.02] hover:shadow-amber-400/20 hover:border-amber-400/30 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${300 + i * 200}ms` }}
            >
              {/* Effet de brillance au hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400/0 via-amber-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
              
              <p className="relative text-white/90 text-base sm:text-lg lg:text-xl leading-relaxed font-light">
                {text}
              </p>
            </div>
          ))}
        </div>

        {/* Grille des compétences */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16 sm:mb-20">
          {infoBlocks.map(({ icon, title, content }, i) => (
            <div
              key={i}
              className={`group relative backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 p-6 sm:p-8 rounded-2xl border border-white/20 shadow-lg transition-all duration-700 hover:scale-105 hover:shadow-amber-400/25 hover:border-amber-400/40 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${700 + i * 150}ms` }}
            >
              {/* Icône avec effet glow */}
              <div className="mb-4 transform group-hover:scale-110 transition-all duration-300">
                <div className="text-amber-400 group-hover:text-amber-300 filter drop-shadow-lg group-hover:drop-shadow-xl group-hover:drop-shadow-amber-400/25 transition-all duration-300">
                  {icon}
                </div>
              </div>
              
              <h3 className="font-bold text-lg sm:text-xl text-amber-400 mb-3 sm:mb-4 group-hover:text-amber-300 transition-colors duration-300">
                {title}
              </h3>
              
              <div className="text-white/80 text-sm sm:text-base leading-relaxed">
                {content}
              </div>
            </div>
          ))}
        </div>

        {/* Bouton CV modernisé */}
        <div className="text-center">
          <a
            href="/CV_MonNom.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative inline-flex items-center justify-center px-8 sm:px-10 py-4 sm:py-5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold text-base sm:text-lg shadow-2xl hover:shadow-amber-500/50 transition-all duration-500 hover:-translate-y-2 hover:scale-105 overflow-hidden ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '1200ms' }}
          >
            {/* Effet de brillance animé */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
            
            <span className="relative flex items-center space-x-3">
              <svg className="w-6 h-6 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Télécharger mon CV</span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}