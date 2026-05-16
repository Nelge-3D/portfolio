'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Menu, X, Volume2, VolumeX, ChevronRight, Code, Box } from 'lucide-react';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import Welcome from './Welcome';

export default function Nav() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false); // Changé: false par défaut
  const [activeSection, setActiveSection] = useState('hero');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const welcomeClosingRef = useRef(false);
  const navRef = useRef<HTMLElement>(null);

  // Vérifier si le Welcome a déjà été affiché dans cette session
  useEffect(() => {
    // Vérifier dans sessionStorage si Welcome a déjà été affiché
    const hasSeenWelcome = sessionStorage.getItem('hasSeenWelcome');
    
    if (!hasSeenWelcome) {
      // Si jamais affiché, on l'affiche
      setShowWelcome(true);
      // Marquer comme affiché dans sessionStorage
      sessionStorage.setItem('hasSeenWelcome', 'true');
    }
    // Si déjà affiché, showWelcome reste false
  }, []); // Le tableau vide garantit que ça ne s'exécute qu'une fois au montage

  // Navigation items
  const navItems = [
    { id: 'hero', label: 'Accueil', href: '#hero' },
    { id: 'about', label: 'À propos', href: '#about' },
    { id: 'services', label: 'Services', href: '#services' },
    { id: 'testimonials', label: 'Témoignages', href: '#testimonials' },
    { id: 'stats', label: 'Satisfaction', href: '#stats' },
  ];

  // Liens externes / portfolios
  const portfolioLinks = [
    { id: 'dev-portfolio', label: 'Dev Portfolio', href: '/dev-portfolio', icon: Code, external: false },
    { id: '3d-portfolio', label: '3D Portfolio', href: '/3d-portfolio', icon: Box, external: false },
  ];

  // Scroll handler with active section detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      
      // Détection de la section active
      const sections = navItems.map(item => document.querySelector(item.href));
      const scrollPosition = window.scrollY + 100;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section) {
          const offsetTop = section.getBoundingClientRect().top + window.scrollY;
          const offsetBottom = offsetTop + section.clientHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(navItems[i].id);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [menuOpen]);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((error) => console.error('Erreur audio :', error));
    }
  };

  const handleWelcomeClose = () => {
    if (welcomeClosingRef.current) return;
    welcomeClosingRef.current = true;
    setShowWelcome(false);
    setTimeout(() => {
      welcomeClosingRef.current = false;
    }, 500);
  };

  const handleNavClick = (href: string, id: string) => {
    setMenuOpen(false);
    setActiveSection(id);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push(`/${href}`);
    }
  };

  const handlePortfolioClick = (href: string) => {
    setMenuOpen(false);
    router.push(href);
  };

  return (
    <>
      {showWelcome && <Welcome onClose={handleWelcomeClose} />}

      {/* Navbar principale */}
      <nav
        ref={navRef}
        className={clsx(
          'fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out',
          isScrolled
            ? 'bg-gradient-to-b from-[#07000f]/95 via-[#07000f]/90 to-transparent backdrop-blur-xl border-b border-violet-400/10'
            : 'bg-gradient-to-b from-[#07000f]/60 via-transparent to-transparent',
          'shadow-2xl'
        )}
      >
        <div className={clsx(
          'max-w-7xl mx-auto flex justify-between items-center transition-all duration-300',
          isScrolled ? 'px-6 py-3' : 'px-6 py-5',
          'lg:px-8'
        )}>
          {/* Logo avec animations améliorées */}
          <Link 
            href="/" 
            className="relative z-50 group cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            {/* Effet de glow animé */}
            <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
              <div
                className={clsx(
                  "rounded-full blur-2xl absolute transition-all duration-1000",
                  "w-28 h-28 md:w-36 md:h-36",
                  isPlaying 
                    ? "bg-amber-400 opacity-60 scale-150 animate-pulse" 
                    : "bg-amber-500/30 opacity-40 scale-100",
                )}
              />
              <div
                className={clsx(
                  "rounded-full blur-2xl absolute transition-all duration-1000",
                  "w-24 h-24 md:w-32 md:h-32",
                  isPlaying 
                    ? "bg-violet-500 opacity-50 scale-125 animate-pulse" 
                    : "bg-violet-500/20 opacity-30 scale-90",
                )}
              />
            </div>

            {/* Logo image */}
            <div className={clsx(
              'relative transition-all duration-500',
              'w-28 h-12 md:w-32 md:h-14',
              'group-hover:scale-110 group-hover:rotate-2',
              isPlaying && 'animate-pulse'
            )}>
              <Image
                src="/logo-white.png"
                alt="Logo Nelge 3D"
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </Link>

          {/* Navigation desktop */}
          <div className="hidden md:flex items-center gap-8 lg:gap-12">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.href, item.id)}
                className="relative group text-white transition-all duration-300"
              >
                <span className={clsx(
                  'text-sm lg:text-base font-medium tracking-wide transition-all duration-300',
                  activeSection === item.id 
                    ? 'text-amber-300'
                    : 'text-violet-200/70 group-hover:text-white'
                )}>
                  {item.label}
                </span>
                
                {/* Indicateur actif */}
                <span className={clsx(
                  'absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-violet-400 to-amber-400 transition-all duration-300',
                  activeSection === item.id ? 'w-full' : 'w-0 group-hover:w-full'
                )} />
              </button>
            ))}

            {/* Séparateur visuel */}
            <div className="h-6 w-px bg-white/20 mx-2" />

            {/* Liens vers les portfolios */}
            {portfolioLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handlePortfolioClick(link.href)}
                className="relative group text-white transition-all duration-300"
              >
                <div className="flex items-center gap-2">
                  <link.icon size={18} className="text-white/60 group-hover:text-amber-400 transition-colors" />
                  <span className="text-sm lg:text-base font-medium tracking-wide text-white/70 group-hover:text-white transition-all duration-300">
                    {link.label}
                  </span>
                </div>
                
                {/* Indicateur de survol */}
                <span className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-violet-400 to-amber-400 w-0 group-hover:w-full transition-all duration-300" />
              </button>
            ))}

            {/* Bouton musique desktop */}
            <button
              onClick={toggleMusic}
              className={clsx(
                'relative flex items-center justify-center transition-all duration-300',
                'w-9 h-9 rounded-full border-2',
                isPlaying
                  ? 'border-amber-400/60 bg-amber-400/10 text-amber-400 hover:bg-amber-400/20'
                  : 'border-violet-400/20 bg-violet-950/30 text-violet-300/70 hover:border-violet-400/50 hover:text-white',
                'group'
              )}
              aria-label={isPlaying ? 'Mettre en pause' : 'Activer la musique'}
            >
              {isPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
              
              {/* Tooltip */}
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-black/90 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {isPlaying ? 'Musique activée' : 'Musique désactivée'}
              </span>
            </button>
          </div>

          {/* Boutons mobile */}
          <div className="flex md:hidden items-center gap-4">
            <button
              onClick={toggleMusic}
              className={clsx(
                'transition-all duration-300 p-2 rounded-full',
                isPlaying 
                  ? 'text-amber-400 bg-amber-400/10' 
                  : 'text-white/70 bg-white/5'
              )}
              aria-label={isPlaying ? 'Mettre en pause' : 'Activer la musique'}
            >
              {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </button>
            
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={clsx(
                'relative z-50 p-2 rounded-full transition-all duration-300',
                'bg-white/5 backdrop-blur-sm border border-white/20',
                menuOpen && 'bg-amber-400/20 border-amber-400/50'
              )}
              aria-label="Menu"
            >
              {menuOpen ? (
                <X size={24} className="text-amber-400" />
              ) : (
                <Menu size={24} className="text-white" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Menu burger overlay amélioré */}
      <div
        className={clsx(
          'fixed inset-0 z-40 transition-all duration-500 ease-out',
          menuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        )}
      >
        {/* Overlay sombre */}
        <div
          className={clsx(
            'absolute inset-0 bg-gradient-to-br from-[#07000f]/97 via-[#100020]/95 to-[#07000f]/97 backdrop-blur-md transition-opacity duration-500',
            menuOpen ? 'opacity-100' : 'opacity-0'
          )}
          onClick={() => setMenuOpen(false)}
        />
        
        {/* Menu content */}
        <div
          className={clsx(
            'absolute right-0 top-0 h-full w-full max-w-md transform transition-transform duration-500 ease-out',
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          <div className="relative h-full flex flex-col">
            {/* Header du menu */}
            <div className="flex justify-end p-6">
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X size={24} className="text-white" />
              </button>
            </div>

            {/* Navigation items */}
            <div className="flex-1 flex flex-col justify-center px-8 space-y-4">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.href, item.id)}
                  className="group relative w-full text-left transition-all duration-300 transform hover:translate-x-2 animate-in fade-in slide-in-from-right-10"
                  style={{
                    animationDuration: '400ms',
                    animationFillMode: 'backwards',
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <div className="flex items-center justify-between py-4 border-b border-white/10 group-hover:border-amber-400/50 transition-colors">
                    <span className={clsx(
                      'text-2xl font-bold tracking-wide transition-all duration-300',
                      activeSection === item.id 
                        ? 'text-amber-400' 
                        : 'text-white group-hover:text-white'
                    )}>
                      {item.label}
                    </span>
                    <ChevronRight 
                      size={24} 
                      className={clsx(
                        'transition-all duration-300',
                        activeSection === item.id 
                          ? 'text-amber-400 translate-x-1' 
                          : 'text-white/50 group-hover:text-white group-hover:translate-x-1'
                      )} 
                    />
                  </div>
                </button>
              ))}

              {/* Séparateur pour les portfolios */}
              <div className="pt-4 mt-2">
                <p className="text-white/40 text-xs uppercase tracking-wider mb-3 px-1">
                  Mes portfolios
                </p>
                {portfolioLinks.map((link, index) => (
                  <button
                    key={link.id}
                    onClick={() => handlePortfolioClick(link.href)}
                    className="group relative w-full text-left transition-all duration-300 transform hover:translate-x-2 animate-in fade-in slide-in-from-right-10"
                    style={{
                      animationDuration: '400ms',
                      animationFillMode: 'backwards',
                      animationDelay: `${(navItems.length + index) * 100}ms`,
                    }}
                  >
                    <div className="flex items-center justify-between py-3 border-b border-white/10 group-hover:border-amber-400/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <link.icon 
                          size={22} 
                          className="text-white/60 group-hover:text-amber-400 transition-colors" 
                        />
                        <span className="text-xl font-medium tracking-wide text-white/80 group-hover:text-white transition-all duration-300">
                          {link.label}
                        </span>
                      </div>
                      <ChevronRight 
                        size={20} 
                        className="text-white/40 group-hover:text-amber-400 group-hover:translate-x-1 transition-all duration-300" 
                      />
                    </div>
                  </button>
                ))}
              </div>

              {/* Information supplémentaire */}
              <div className="pt-8 mt-8 border-t border-white/20">
                <p className="text-white/60 text-sm text-center">
                  {isPlaying ? '🎵 Musique d\'ambiance activée' : '🔇 Musique désactivée'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Audio element */}
      <audio ref={audioRef} loop preload="auto" src="/slowlife.mp3" />

    </>
  );
}