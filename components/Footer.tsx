'use client';
import React from 'react';
import { Instagram, Youtube, Mail, Linkedin } from 'lucide-react';
import clsx from 'clsx';

export default function Footer() {
  return (
    <footer className="relative bg-neutral-950 text-white pt-16 pb-10 px-6 overflow-hidden">
      {/* Lueurs dynamiques */}
      <div className="absolute -top-24 -left-20 w-80 h-80 bg-yellow-400 rounded-full blur-3xl opacity-30 animate-spin-slow pointer-events-none z-0" />
      <div className="absolute -bottom-24 -right-20 w-72 h-72 bg-violet-600 rounded-full blur-3xl opacity-25 animate-spin-reverse-slow pointer-events-none z-0" />

      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Branding */}
        <div>
          <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-amber-400 to-yellow-200 bg-clip-text text-transparent drop-shadow">
             Nelge <span className="text-violet-600">3d</span>
          </h3>
          <p className="text-gray-400 text-sm">
            Donner vie à l'imaginaire, un pixel à la fois.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-amber-300">Navigation</h4>
          <ul className="space-y-2 text-sm">
            {[
              ['#hero', 'Accueil'],
              ['#about', 'À propos'],
              ['#services', 'Services'],
              ['#testimonials', 'Témoignages'],
              ['#stats', 'Statistiques'],
              ['#portfolio', 'Portfolio']
            ].map(([href, label]) => (
              <li key={label}>
                <a
                  href={href}
                  className="hover:text-amber-400 transition-colors duration-200"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Réseaux sociaux */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-amber-300">Suivez-moi</h4>
          <div className="flex gap-4">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition">
              <Instagram size={22} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition">
              <Youtube size={22} />
            </a>
            <a href="mailto:tonmail@example.com" className="hover:text-amber-400 transition">
              <Mail size={22} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition">
              <Linkedin size={22} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="relative z-10 mt-10 text-center text-sm text-gray-500 border-t border-neutral-800 pt-6">
        © {new Date().getFullYear()} Nelge 3D. Tous droits réservés.
      </div>
    </footer>
  );
}
