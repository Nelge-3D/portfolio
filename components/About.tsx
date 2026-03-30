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

  const handleDownloadCV = () => {
    const cvPath = '/CV NGABI EBAMANGOYE Louis-Gériel.pdf';
    const link = document.createElement('a');
    link.href = cvPath;
    link.download = 'CV NGABI EBAMANGOYE Louis-Gériel.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const introBlocks = [
    "🎯 Développeur Web & Mobile spécialisé en Next.js, TypeScript, Tailwind CSS, avec un usage de l'intelligence artificielle comme copilote de développement (ChatGPT, GitHub Copilot, Continue...).",
    "Grâce à l'IA, j'accélère l'écriture de code, automatise les tâches répétitives, améliore mes tests et me concentre sur la logique métier."
  ];

  const infoBlocks = [
    {
      icon: (
        <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Compétences techniques",
      content: "Next.js • TypeScript • Tailwind CSS • React • Node.js • PostgreSQL • Prisma • IA générative"
    },
    {
      icon: (
        <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: "Freelance 3D",
      content: "👨‍💻 Designer 3D avec Blender, spécialisé en publicité produit et rendus immersifs (packshots, scènes animées)"
    },
    {
      icon: (
        <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: "Écriture SFFF",
      content: "✍️ Auteur amateur d'une saga SFFF (Science-Fiction, Fantastique, Fantasy) explorant l'introspection et l'aventure"
    },
    {
      icon: (
        <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Mon parcours",
      content: (
        <div className="space-y-2">
          
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-amber-400/50 rounded-full flex-shrink-0"></div>
            <span>2024 – 3D design self learning</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-amber-400/30 rounded-full flex-shrink-0"></div>
            <span>2025 – Développement web D-CLIC</span>
          </div>
        </div>
      )
    }
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative 
        /* Mobile (par défaut) - jusqu'à 640px */
        py-12 px-4
        /* Tablette (sm: 640px - 768px) */
        sm:py-16 sm:px-6
        /* Petit écran ordinateur (md: 768px - 1024px) */
        md:py-20 md:px-8
        /* Grand écran (lg: 1024px - 1280px) */
        lg:py-24 lg:px-10
        /* Très grand écran (xl: 1280px et +) */
        xl:py-28 xl:px-12
        min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden"
    >
      {/* Background effects - ajustés pour mobile */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 
          /* Mobile */
          w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 
          bg-amber-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 
          /* Mobile */
          w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 
          bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main title */}
        <div className="text-center 
          /* Mobile */
          mb-8
          /* Tablette */
          sm:mb-12
          /* Ordinateur */
          md:mb-16 lg:mb-20">
          <h2 className={`
            /* Mobile */
            text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl
            font-black mb-3 sm:mb-4 tracking-tight 
            bg-gradient-to-r from-white via-amber-200 to-amber-400 bg-clip-text text-transparent 
            transition-all duration-1000 
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}>
            À propos de moi
          </h2>
          <div className={`
            /* Mobile */
            w-16 sm:w-20 md:w-24 
            h-0.5 sm:h-1 
            bg-gradient-to-r from-amber-400 to-transparent mx-auto 
            transition-all duration-700 delay-300 
            ${isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}
          `}></div>
        </div>

        {/* Intro blocks */}
        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 
          /* Mobile */
          mb-12
          /* Tablette */
          sm:mb-16
          /* Ordinateur */
          md:mb-20 lg:mb-24">
          {introBlocks.map((text, i) => (
            <div
              key={i}
              className={`
                group relative backdrop-blur-xl bg-gradient-to-br from-white/15 to-white/5 
                /* Mobile */
                p-5 sm:p-6 md:p-7 lg:p-8 xl:p-10 
                rounded-2xl sm:rounded-3xl 
                border border-white/20 shadow-2xl 
                transition-all duration-700 ease-out 
                hover:scale-[1.02] hover:shadow-amber-400/20 hover:border-amber-400/30
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
              `}
              style={{ transitionDelay: `${300 + i * 200}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400/0 via-amber-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
              
              <p className="relative text-white/90 
                /* Mobile */
                text-sm sm:text-base md:text-lg lg:text-xl 
                leading-relaxed font-light">
                {text}
              </p>
            </div>
          ))}
        </div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 
          gap-4 sm:gap-5 md:gap-6 lg:gap-7 xl:gap-8 
          /* Mobile */
          mb-12
          /* Tablette */
          sm:mb-16
          /* Ordinateur */
          md:mb-20">
          {infoBlocks.map(({ icon, title, content }, i) => (
            <div
              key={i}
              className={`
                group relative backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 
                /* Mobile */
                p-5 sm:p-6 md:p-7 lg:p-8 
                rounded-xl sm:rounded-2xl 
                border border-white/20 shadow-lg 
                transition-all duration-700 
                hover:scale-105 hover:shadow-amber-400/25 hover:border-amber-400/40
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
              `}
              style={{ transitionDelay: `${700 + i * 150}ms` }}
            >
              <div className="mb-3 sm:mb-4 transform group-hover:scale-110 transition-all duration-300">
                <div className="text-amber-400 group-hover:text-amber-300 filter drop-shadow-lg group-hover:drop-shadow-xl group-hover:drop-shadow-amber-400/25 transition-all duration-300">
                  {icon}
                </div>
              </div>
              
              <h3 className="font-bold 
                /* Mobile */
                text-base sm:text-lg md:text-xl 
                text-amber-400 mb-2 sm:mb-3 md:mb-4 
                group-hover:text-amber-300 transition-colors duration-300">
                {title}
              </h3>
              
              <div className="text-white/80 
                /* Mobile */
                text-xs sm:text-sm md:text-base 
                leading-relaxed">
                {content}
              </div>
            </div>
          ))}
        </div>

        {/* CV Download button */}
        <div className="text-center">
          <button
            onClick={handleDownloadCV}
            className={`
              group relative inline-flex items-center justify-center 
              /* Mobile */
              px-6 sm:px-8 md:px-10 
              py-3 sm:py-4 md:py-5 
              rounded-full 
              bg-gradient-to-r from-amber-500 to-amber-600 
              text-black font-bold 
              /* Mobile */
              text-sm sm:text-base md:text-lg 
              shadow-2xl hover:shadow-amber-500/50 
              transition-all duration-500 
              hover:-translate-y-2 hover:scale-105 
              overflow-hidden
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
            `}
            style={{ transitionDelay: '1200ms' }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
            
            <span className="relative flex items-center space-x-2 sm:space-x-3">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-black/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Télécharger mon CV</span>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}