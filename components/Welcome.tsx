'use client';

import React from 'react';

interface WelcomeProps {
  onClose: () => void;
}

export default function Welcome({ onClose }: WelcomeProps) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-[1000]"
      aria-modal="true"
      role="dialog"
    >
      <div className="bg-neutral-900 rounded-lg p-8 max-w-md mx-4 text-center text-neutral-100 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Bienvenue !</h2>
        <p className="mb-6">
          Pour profiter pleinement de l'expérience, activez la musique en cliquant sur l'icône 
          <span className="inline-block mx-1 text-amber-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 5L6 9H2v6h4l5 4zM19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            </svg>
          </span>
          dans la barre de navigation.
        </p>
        <button
          onClick={onClose}
          className="bg-amber-400 hover:bg-amber-300 text-neutral-900 font-semibold px-6 py-2 rounded-md transition"
        >
          Continuer
        </button>
      </div>
    </div>
  );
}