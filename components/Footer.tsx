'use client';
import React from 'react';
import { Instagram, Youtube, Mail, Linkedin } from 'lucide-react';

const navLinks = [
  ['#hero', 'Accueil'],
  ['#about', 'À propos'],
  ['#services', 'Services'],
  ['#testimonials', 'Témoignages'],
  ['#stats', 'Compétences'],
  ['#portfolio', 'Portfolio'],
];

const socialLinks = [
  { href: 'https://instagram.com', Icon: Instagram, label: 'Instagram' },
  { href: 'https://youtube.com', Icon: Youtube, label: 'YouTube' },
  { href: 'mailto:louisgeriel.ngabi@gmail.com', Icon: Mail, label: 'Email' },
  { href: 'https://linkedin.com', Icon: Linkedin, label: 'LinkedIn' },
];

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-white border-t border-neutral-800/60">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">

          {/* Branding */}
          <div className="space-y-3">
            <p className="text-base font-semibold tracking-wide">
              Nelge <span className="text-amber-400">3D</span>
            </p>
            <p className="text-sm text-neutral-500 leading-relaxed max-w-xs">
              Création 3D & développement web —<br />du concept au rendu final.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-600">
              Navigation
            </p>
            <ul className="space-y-2">
              {navLinks.map(([href, label]) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-sm text-neutral-500 hover:text-white transition-colors duration-200"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-600">
              Contact
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-neutral-500 hover:text-white transition-colors duration-200"
                >
                  <Icon size={18} strokeWidth={1.5} />
                </a>
              ))}
            </div>
            <p className="text-sm text-neutral-500">
              louisgeriel.ngabi@gmail.com
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-neutral-800/60 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-neutral-600">
          <span>© {new Date().getFullYear()} Nelge 3D. Tous droits réservés.</span>
          <span>Conçu & développé par Louis Geriel Ngabi</span>
        </div>
      </div>
    </footer>
  );
}
