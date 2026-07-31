'use client';
import React from 'react';
import { Github, Mail, Linkedin } from 'lucide-react';
import Link from 'next/link';

const navLinks = [
  ['#hero',        'Accueil'],
  ['#about',       'À propos'],
  ['#services',    'Services'],
  ['#testimonials','Témoignages'],
  ['#stats',       'Compétences'],
];

const portfolioLinks = [
  ['/dev-portfolio', 'Portfolio Dev'],
  ['/3d-portfolio',  'Portfolio 3D'],
];

const socialLinks = [
  { href: 'https://github.com/Nelge-3D',                     Icon: Github,   label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/louis-geriel-ngabi/', Icon: Linkedin, label: 'LinkedIn' },
  { href: 'mailto:louisgeriel.ngabi@gmail.com',             Icon: Mail,     label: 'Email' },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#07000f] text-white border-t border-violet-400/8 overflow-hidden">
      {/* Ambient */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute bottom-0 left-1/4 w-64 h-48 bg-violet-700/5 rounded-full blur-[60px]" />
        <div className="absolute bottom-0 right-1/4 w-48 h-40 bg-amber-500/4 rounded-full blur-[50px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-14">

          {/* Branding */}
          <div className="space-y-4">
            <p
              className="font-display text-2xl font-light italic"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Nelge{' '}
              <span className="text-amber-400">3D</span>
            </p>
            <p className="font-body text-sm text-zinc-400 leading-relaxed max-w-xs">
              Création 3D & développement web — du concept au rendu final.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-5">
            <p className="font-body text-[9px] font-semibold uppercase tracking-[0.3em] text-zinc-500">
              Navigation
            </p>
            <ul className="space-y-2">
              {navLinks.map(([href, label]) => (
                <li key={label}>
                  <a href={href} className="font-body text-sm text-zinc-400 hover:text-amber-300 transition-colors duration-200">
                    {label}
                  </a>
                </li>
              ))}
              <li className="pt-1 border-t border-white/5 mt-3">
                <p className="font-body text-[9px] uppercase tracking-widest text-zinc-600 mb-2">Portfolios</p>
                {portfolioLinks.map(([href, label]) => (
                  <Link key={label} href={href} className="block font-body text-sm text-zinc-400 hover:text-amber-300 transition-colors duration-200 mb-1">
                    {label}
                  </Link>
                ))}
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-5">
            <p className="font-body text-[9px] font-semibold uppercase tracking-[0.3em] text-violet-500/50">
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
                  className="p-2 rounded-full border border-white/8 bg-white/3 text-zinc-400 hover:text-amber-300 hover:border-amber-400/30 hover:bg-amber-950/20 transition-all duration-300"
                >
                  <Icon size={15} strokeWidth={1.5} />
                </a>
              ))}
            </div>
            <p className="font-body text-xs text-zinc-500">
              louisgeriel.ngabi@gmail.com
            </p>
          </div>
        </div>

        {/* Divider ornament */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-violet-400/15 to-transparent" />
          <div className="w-1 h-1 rounded-full bg-amber-400/40" />
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-violet-400/15 to-transparent" />
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
          <span className="font-body text-xs text-zinc-500">
            © {new Date().getFullYear()} Nelge 3D. Tous droits réservés.
          </span>
          <span className="font-body text-xs text-zinc-500">
            Conçu & développé par Louis Gériel Ngabi
          </span>
        </div>
      </div>
    </footer>
  );
}
