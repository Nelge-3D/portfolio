'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => { if (entry.isIntersecting) setIsVisible(true); });
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/CV NGABI EBAMANGOYE Louis-Gériel.pdf';
    link.download = 'CV NGABI EBAMANGOYE Louis-Gériel.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const introBlocks = [
    "Développeur Web & Mobile spécialisé en Next.js, TypeScript, Tailwind CSS, avec l'intelligence artificielle comme copilote de développement.",
    "Grâce à l'IA, j'accélère l'écriture de code, automatise les tâches répétitives et me concentre sur la logique métier et l'expérience utilisateur.",
  ];

  const infoBlocks = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      label: 'Stack',
      value: 'Next.js · TypeScript · Tailwind · React · PostgreSQL · IA générative',
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      label: 'Freelance 3D',
      value: 'Designer 3D Blender — publicité produit et rendus immersifs',
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      label: 'Écriture',
      value: 'Auteur d\'une saga SFFF explorant introspection et aventure',
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: 'Parcours',
      value: '2024 — 3D self learning · 2025 — Développement web D-CLIC',
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 md:py-32 px-6 md:px-12 min-h-screen bg-[#07000f] text-white overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-violet-700/8 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-500/6 rounded-full blur-[80px] animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="font-body text-[10px] tracking-[0.35em] uppercase text-violet-400/70 mb-5">
            Qui suis-je
          </p>
          <h2
            className="font-display text-5xl md:text-7xl font-light italic bg-gradient-to-br from-white via-violet-200 to-violet-500 bg-clip-text text-transparent mb-6"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            À propos de moi
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-14 bg-gradient-to-r from-transparent to-violet-400/50" />
            <div className="w-1 h-1 rounded-full bg-amber-400" />
            <div className="h-px w-14 bg-gradient-to-l from-transparent to-violet-400/50" />
          </div>
        </div>

        {/* Intro blocks */}
        <div className="grid lg:grid-cols-2 gap-5 mb-16">
          {introBlocks.map((text, i) => (
            <div
              key={i}
              className={`group relative backdrop-blur-xl bg-gradient-to-br from-violet-950/40 to-purple-950/20 p-7 md:p-9 rounded-2xl border border-violet-400/10 hover:border-violet-400/25 hover:shadow-xl hover:shadow-violet-700/10 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${250 + i * 200}ms` }}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/0 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <p className="font-body relative text-sm md:text-base text-violet-100/75 leading-relaxed">
                {text}
              </p>
            </div>
          ))}
        </div>

        {/* Info grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {infoBlocks.map(({ icon, label, value }, i) => (
            <div
              key={i}
              className={`group relative backdrop-blur-xl bg-gradient-to-br from-violet-950/30 to-black/30 p-6 rounded-2xl border border-violet-400/8 hover:border-violet-400/25 hover:shadow-lg hover:shadow-violet-700/10 hover:scale-[1.02] transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${600 + i * 120}ms` }}
            >
              <div className="text-violet-400 group-hover:text-amber-300 transition-colors duration-300 mb-4">
                {icon}
              </div>
              <p className="font-body text-[10px] tracking-[0.2em] uppercase text-violet-500/70 mb-2">{label}</p>
              <p className="font-body text-xs text-violet-200/60 leading-relaxed">{value}</p>
            </div>
          ))}
        </div>

        {/* CV button */}
        <div className={`text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ transitionDelay: '1100ms' }}>
          <button
            onClick={handleDownloadCV}
            className="group font-body relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 text-black font-semibold text-sm shadow-xl shadow-amber-500/25 hover:shadow-amber-400/40 hover:-translate-y-1 hover:scale-105 transition-all duration-400 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-900 ease-out" />
            <svg className="relative w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="relative">Télécharger mon CV</span>
          </button>
        </div>
      </div>
    </section>
  );
}
