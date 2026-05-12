'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineRotateLeft } from 'react-icons/ai';
import ControlPanel from '@/components/canette/ControlPanel';
import KeyboardShortcutsPanel from '@/components/canette/KeyboardShortcutsPanel';

const CanetteScene = dynamic(() => import('@/components/canette/CanetteScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-black/40 rounded-xl flex items-center justify-center">
      <span className="text-white/40 text-sm">Chargement 3D…</span>
    </div>
  ),
});

const environments = [
  { name: 'Studio',    preset: 'studio',    description: 'Éclairage studio neutre' },
  { name: 'Sunset',    preset: 'sunset',    description: 'Coucher de soleil chaud' },
  { name: 'Dawn',      preset: 'dawn',      description: 'Aube douce et dorée' },
  { name: 'Night',     preset: 'night',     description: 'Nuit étoilée sombre' },
  { name: 'Warehouse', preset: 'warehouse', description: 'Entrepôt industriel' },
  { name: 'Forest',    preset: 'forest',    description: 'Forêt verdoyante' },
  { name: 'Apartment', preset: 'apartment', description: 'Intérieur moderne' },
  { name: 'City',      preset: 'city',      description: 'Skyline urbain' },
  { name: 'Park',      preset: 'park',      description: 'Parc naturel' },
  { name: 'Lobby',     preset: 'lobby',     description: 'Hall luxueux' },
];

export default function Canette3DPage() {
  const [showHint, setShowHint]                     = useState(true);
  const [wireframe, setWireframe]                   = useState(false);
  const [isFullscreen, setIsFullscreen]             = useState(false);
  const [currentEnvironment, setCurrentEnvironment] = useState(0);
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);

  const orbitControlsRef = useRef<any>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowHint(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);

  const toggleFullscreen = () => {
    const wrapper = document.getElementById('canvas-wrapper');
    if (!document.fullscreenElement) wrapper?.requestFullscreen();
    else document.exitFullscreen();
  };

  const resetRotation     = () => orbitControlsRef.current?.reset();
  const changeEnvironment = () => setCurrentEnvironment((prev) => (prev + 1) % environments.length);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      switch (e.key.toLowerCase()) {
        case 'w': setWireframe((prev) => !prev); break;
        case 'f': {
          const wrapper = document.getElementById('canvas-wrapper');
          if (!document.fullscreenElement) wrapper?.requestFullscreen();
          else document.exitFullscreen();
          break;
        }
        case 'r': orbitControlsRef.current?.reset(); break;
        case 'e': setCurrentEnvironment((prev) => (prev + 1) % environments.length); break;
        case '?':
        case 'h': setShowKeyboardShortcuts((prev) => !prev); break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full bg-gradient-to-br from-black via-gray-900 to-black pt-28 pb-8 md:pt-32 md:pb-16 px-4 md:px-20 min-h-screen">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12">

        {/* Texte descriptif */}
        <div className="w-full md:w-1/2 space-y-4 md:space-y-6 text-white">
          <h2 className="text-2xl md:text-4xl font-extrabold leading-tight">
            Découvrez la <span className="text-red-500">fraîcheur Regab</span>
          </h2>
          <p className="text-base md:text-lg text-gray-300 leading-relaxed">
            Une canette de qualité premium, magnifiée par des effets lumineux puissants qui
            révèlent sa texture glacée et son design emblématique.
          </p>
          <Link
            href="/portfolio"
            className="inline-block mt-4 px-4 md:px-6 py-2 md:py-3 bg-red-600 text-white text-sm md:text-base rounded-xl shadow-md hover:bg-red-700 transition duration-300"
          >
            3D Portfolio
          </Link>
        </div>

        {/* Canvas 3D */}
        <div
          id="canvas-wrapper"
          className="relative w-full md:w-1/2 h-[300px] md:h-[600px] bg-black rounded-xl md:rounded-2xl shadow-2xl p-1 md:p-2 border-2 md:border-4 border-red-600"
        >
          <ControlPanel
            wireframe={wireframe}
            isFullscreen={isFullscreen}
            currentEnvironmentName={environments[currentEnvironment].name}
            showKeyboardShortcuts={showKeyboardShortcuts}
            onToggleWireframe={() => setWireframe((p) => !p)}
            onToggleFullscreen={toggleFullscreen}
            onReset={resetRotation}
            onChangeEnvironment={changeEnvironment}
            onToggleShortcuts={() => setShowKeyboardShortcuts((p) => !p)}
          />

          <CanetteScene
            wireframe={wireframe}
            currentEnvironment={currentEnvironment}
            environments={environments}
            orbitControlsRef={orbitControlsRef}
          />

          <AnimatePresence>
            {showHint && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 text-white text-xs md:text-sm flex items-center gap-2 bg-black/60 px-3 md:px-4 py-2 rounded-full shadow-lg backdrop-blur-sm"
              >
                <AiOutlineRotateLeft className="text-sm md:text-lg animate-spin-slow" />
                <span className="hidden sm:inline">Tournez la canette à 360°</span>
                <span className="sm:hidden">Tournez à 360°</span>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showKeyboardShortcuts && <KeyboardShortcutsPanel />}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
