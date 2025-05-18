'use client';
import React from 'react';
import { Instagram, Youtube, Mail, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Branding */}
        <div>
          <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-amber-400 to-yellow-200 bg-clip-text text-transparent">
            ⌘ Nelge 3D
          </h3>
          <p className="text-gray-400 text-sm">Donner vie à l'imaginaire, un pixel à la fois.</p>
        </div>

        {/* Liens rapides */}
        <div className="space-y-2">
          <h4 className="text-lg font-semibold mb-2 text-amber-300">Navigation</h4>
          {[
            ['#hero', 'Accueil'],
            ['#about', 'À propos'],
            ['#services', 'Services'],
            ['#testimonials', 'Témoignages'],
            ['#stats', 'Statistiques'],
            ['#portfolio', 'Portfolio']
          ].map(([href, label]) => (
            <a
              key={label}
              href={href}
              className="block text-sm hover:text-amber-400 transition-colors duration-200"
            >
              {label}
            </a>
          ))}
        </div>

        {/* Réseaux sociaux */}
        <div>
          <h4 className="text-lg font-semibold mb-2 text-amber-300">Suivez-moi</h4>
          <div className="flex gap-4">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400">
              <Instagram size={20} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400">
              <Youtube size={20} />
            </a>
            <a href="mailto:tonmail@example.com" className="hover:text-amber-400">
              <Mail size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center mt-10 text-sm text-gray-500 border-t border-neutral-700 pt-6">
        © {new Date().getFullYear()} Nelge 3D. Tous droits réservés.
      </div>
    </footer>
  );
}
