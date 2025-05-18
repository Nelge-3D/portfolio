// app/not-found.tsx
'use client';

import Link from 'next/link';
import { Ghost } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col justify-center items-center px-6 text-center">
      <Ghost size={64} className="text-amber-400 mb-4 animate-pulse" />
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        Oups, cette page est introuvable.
      </h1>
      <p className="text-neutral-400 max-w-xl mb-8">
        La page que tu cherches n'existe pas ou a été déplacée.
      </p>
      <Link
        href="/"
        className="bg-gradient-to-r from-amber-400 via-yellow-300 to-white text-black px-6 py-3 rounded-full font-semibold hover:brightness-110 shadow-lg transition-all"
      >
        Retour à l'accueil
      </Link>
    </div>
  );
}
