'use client';

import React from 'react';

interface WelcomeProps {
  onClose: () => void;
}

export default function Welcome({ onClose }: WelcomeProps) {
  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-[1000]"
      aria-modal="true"
      role="dialog"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-600/15 rounded-full blur-[80px]" />
      </div>

      <div className="relative z-10 bg-gradient-to-br from-violet-950/80 to-[#07000f]/90 backdrop-blur-xl rounded-3xl p-10 max-w-sm mx-4 text-center border border-violet-400/15 shadow-2xl shadow-violet-900/40">
        {/* Ornament top */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="h-px w-8 bg-gradient-to-r from-transparent to-violet-400/50" />
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <div className="h-px w-8 bg-gradient-to-l from-transparent to-violet-400/50" />
        </div>

        <h2
          className="font-display text-3xl font-light italic bg-gradient-to-br from-white via-violet-200 to-violet-400 bg-clip-text text-transparent mb-4"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Bienvenue
        </h2>

        <p className="font-body text-sm text-violet-200/60 leading-relaxed mb-8">
          Pour profiter pleinement de l&apos;expérience, activez la musique via l&apos;icône{' '}
          <span className="inline-flex items-center justify-center mx-1 w-5 h-5 rounded-full bg-amber-400/20 border border-amber-400/30">
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-300">
              <path d="M11 5L6 9H2v6h4l5 4zM19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
          </span>{' '}
          dans la barre de navigation.
        </p>

        <button
          onClick={onClose}
          className="font-body group relative inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 text-black font-semibold text-sm shadow-lg shadow-amber-500/25 hover:shadow-amber-400/40 hover:-translate-y-0.5 hover:scale-105 transition-all duration-300 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
          <span className="relative">Commencer l&apos;expérience</span>
        </button>
      </div>
    </div>
  );
}
