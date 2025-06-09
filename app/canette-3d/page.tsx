'use client';

import Link from "next/link";
import { Canvas, useFrame } from '@react-three/fiber';
import {
  OrbitControls,
  ContactShadows,
  useGLTF,
  Center,
  Bounds,
  Environment
} from '@react-three/drei';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineRotateLeft } from 'react-icons/ai';
import { 
  MdOutlineGrid3X3, 
  MdOutlineFullscreen, 
  MdOutlineFullscreenExit, 
  MdRefresh, 
  Md360,
  MdKeyboard 
} from 'react-icons/md';
import * as THREE from 'three';

function Model({ wireframe }: { wireframe: boolean }) {
  const { scene } = useGLTF('/renders/regab-seul.glb');
  const groupRef = useRef<THREE.Group>(null);
  
  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((mat) => {
            if ('wireframe' in mat) {
              (mat as any).wireframe = wireframe;
            }
          });
        } else {
          if ('wireframe' in mesh.material) {
            (mesh.material as any).wireframe = wireframe;
          }
        }
      }
    });
  }, [scene, wireframe]);

  // Animation avec useFrame pour animer le groupe Three.js
  useFrame((state) => {
    if (groupRef.current) {
      // Animation basée sur le mode wireframe
      const targetScale = wireframe ? 1.05 : 1;
      const targetRotation = wireframe ? Math.PI * 0.1 : 0;
      
      // Interpolation douce
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotation, 0.1);
    }
  });

  return (
    <group ref={groupRef}>
      <Center>
        <primitive object={scene} scale={15} />
      </Center>
    </group>
  );
}

export default function Canette3DPage() {
  const [showHint, setShowHint] = useState(true);
  const [wireframe, setWireframe] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentEnvironment, setCurrentEnvironment] = useState(0);
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);

  // Liste des environnements HDRI disponibles avec descriptions
  const environments = [
    { name: 'Studio', preset: 'studio', description: 'Éclairage studio neutre' },
    { name: 'Sunset', preset: 'sunset', description: 'Coucher de soleil chaud' },
    { name: 'Dawn', preset: 'dawn', description: 'Aube douce et dorée' },
    { name: 'Night', preset: 'night', description: 'Nuit étoilée sombre' },
    { name: 'Warehouse', preset: 'warehouse', description: 'Entrepôt industriel' },
    { name: 'Forest', preset: 'forest', description: 'Forêt verdoyante' },
    { name: 'Apartment', preset: 'apartment', description: 'Intérieur moderne' },
    { name: 'City', preset: 'city', description: 'Skyline urbain' },
    { name: 'Park', preset: 'park', description: 'Parc naturel' },
    { name: 'Lobby', preset: 'lobby', description: 'Hall luxueux' }
  ];

  // Référence pour les contrôles OrbitControls
  const orbitControlsRef = useRef<any>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowHint(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  // Écouter les changements de plein écran
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    const canvasWrapper = document.getElementById("canvas-wrapper");
    if (!document.fullscreenElement) {
      canvasWrapper?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  // Fonction pour réinitialiser la rotation
  const resetRotation = () => {
    if (orbitControlsRef.current) {
      // Réinitialiser la position de la caméra
      orbitControlsRef.current.reset();
    }
  };

  // Fonction pour changer l'environnement
  const changeEnvironment = () => {
    setCurrentEnvironment((prev) => (prev + 1) % environments.length);
  };

  // Gestion des raccourcis clavier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignorer si on tape dans un input ou textarea
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      
      switch (e.key.toLowerCase()) {
        case 'w':
          setWireframe(prev => !prev);
          break;
        case 'f':
          toggleFullscreen();
          break;
        case 'r':
          resetRotation();
          break;
        case 'e':
          changeEnvironment();
          break;
        case '?':
        case 'h':
          setShowKeyboardShortcuts(prev => !prev);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="w-full bg-gradient-to-br from-black via-gray-900 to-black py-8 md:py-16 px-4 md:px-20 min-h-screen">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12">
        {/* Texte descriptif - Affiché en premier sur mobile */}
        <div className="w-full md:w-1/2 space-y-4 md:space-y-6 text-white">
          <h2 className="text-2xl md:text-4xl font-extrabold leading-tight">
            Découvrez la <span className="text-red-500">fraîcheur Regab</span>
          </h2>
          <p className="text-base md:text-lg text-gray-300 leading-relaxed">
            Une canette de qualité premium, magnifiée par des effets lumineux puissants qui
            révèlent sa texture glacée et son design emblématique. Idéale pour mettre en valeur
            chaque détail dans un environnement moderne.
          </p>
          <div className="space-y-3 md:space-y-4">
            <div className="grid grid-cols-2 gap-2 text-xs md:text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <MdOutlineGrid3X3 className="text-blue-400" />
                <span>Wireframe 3D</span>
                <kbd className="ml-auto bg-white/10 px-1 rounded text-xs">W</kbd>
              </div>
              <div className="flex items-center gap-2">
                <MdOutlineFullscreen className="text-green-400" />
                <span>Plein écran</span>
                <kbd className="ml-auto bg-white/10 px-1 rounded text-xs">F</kbd>
              </div>
              <div className="flex items-center gap-2">
                <MdRefresh className="text-yellow-400" />
                <span>Reset vue</span>
                <kbd className="ml-auto bg-white/10 px-1 rounded text-xs">R</kbd>
              </div>
              <div className="flex items-center gap-2">
                <Md360 className="text-purple-400" />
                <span>Environnements</span>
                <kbd className="ml-auto bg-white/10 px-1 rounded text-xs">E</kbd>
              </div>
            </div>
            <Link
              href="/portfolio"
              className="inline-block mt-4 px-4 md:px-6 py-2 md:py-3 bg-red-600 text-white text-sm md:text-base rounded-xl shadow-md hover:bg-red-700 transition duration-300"
            >
              3D Portfolio
            </Link>
          </div>
        </div>

        {/* Canvas 3D */}
        <div 
          id="canvas-wrapper"
          className="relative w-full md:w-1/2 h-[300px] md:h-[600px] bg-black rounded-xl md:rounded-2xl shadow-2xl p-1 md:p-2 border-2 md:border-4 border-red-600"
        >
          {/* Boutons de contrôle */}
          <div className="absolute top-2 md:top-4 right-2 md:right-4 flex flex-col gap-1 md:gap-2 z-10">
            {/* Bouton raccourcis clavier */}
            <div className="flex justify-end">
              <button
                onClick={() => setShowKeyboardShortcuts(!showKeyboardShortcuts)}
                className="flex items-center gap-1 px-2 py-1 bg-purple-500/20 text-white text-xs rounded-lg border border-purple-400 hover:bg-purple-500/30 transition backdrop-blur-sm"
                title="Afficher/masquer les raccourcis clavier"
              >
                <MdKeyboard className="text-xs md:text-sm" />
              </button>
            </div>
            
            <div className="flex gap-1 md:gap-2">
              {/* Toggle Wireframe */}
              <div title="Basculer le mode wireframe (Touche W)">
                <button
                  onClick={() => setWireframe(!wireframe)}
                  className={`flex items-center gap-1 px-2 md:px-3 py-1 text-white text-xs rounded-lg border transition backdrop-blur-sm ${
                    wireframe 
                      ? 'bg-yellow-500/30 border-yellow-400 text-yellow-100' 
                      : 'bg-white/10 border-white hover:bg-white/20'
                  }`}
                >
                  <MdOutlineGrid3X3 className={`text-xs md:text-sm ${wireframe ? 'text-yellow-300' : ''}`} />
                  <span className="hidden sm:inline">
                    {wireframe ? 'Wireframe ON' : 'Wireframe OFF'}
                  </span>
                </button>
              </div>
              
              {/* Toggle Fullscreen */}
              <div title={isFullscreen ? 'Quitter le plein écran (Touche F)' : 'Mode plein écran (Touche F)'}>
                <button
                  onClick={toggleFullscreen}
                  className="flex items-center gap-1 px-2 md:px-3 py-1 bg-white/10 text-white text-xs rounded-lg border border-white hover:bg-white/20 transition backdrop-blur-sm"
                >
                  {isFullscreen ? (
                    <MdOutlineFullscreenExit className="text-xs md:text-sm" />
                  ) : (
                    <MdOutlineFullscreen className="text-xs md:text-sm" />
                  )}
                  <span className="hidden sm:inline">
                    {isFullscreen ? 'Quitter' : 'Plein écran'}
                  </span>
                </button>
              </div>
            </div>
            
            <div className="flex gap-1 md:gap-2">
              {/* Reset Rotation */}
              <div title="Réinitialiser la rotation (Touche R)">
                <button
                  onClick={resetRotation}
                  className="flex items-center gap-1 px-2 md:px-3 py-1 bg-blue-500/20 text-white text-xs rounded-lg border border-blue-400 hover:bg-blue-500/30 transition backdrop-blur-sm"
                >
                  <MdRefresh className="text-xs md:text-sm" />
                  <span className="hidden sm:inline">Reset</span>
                </button>
              </div>
              
              {/* Change Environment */}
              <div title={`${environments[currentEnvironment].name}: ${environments[currentEnvironment].description} (Touche E)`}>
                <button
                  onClick={changeEnvironment}
                  className="flex items-center gap-1 px-2 md:px-3 py-1 bg-green-500/20 text-white text-xs rounded-lg border border-green-400 hover:bg-green-500/30 transition backdrop-blur-sm"
                >
                  <Md360 className="text-xs md:text-sm" />
                  <span className="hidden sm:inline">
                    {environments[currentEnvironment].name}
                  </span>
                </button>
              </div>
            </div>
          </div>

          <Canvas shadows camera={{ position: [0, 0.1, 2.5], fov: 38 }}>
            {/* Environnement HDRI avec arrière-plan visible */}
            <Environment 
              preset={environments[currentEnvironment].preset as any} 
              background={true}
              backgroundIntensity={1.0}
            />
            
            <ambientLight intensity={0.5} />
            <directionalLight
              position={[2, 5, 2]}
              intensity={1.5}
              color={'#00bfff'}
              castShadow
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
            />
            <directionalLight
              position={[-2, 5, -2]}
              intensity={1.5}
              color={'#ff4d4d'}
            />
            <spotLight
              position={[0, 3, 2]}
              angle={0.4}
              intensity={2}
              penumbra={0.5}
              castShadow
            />

            <ContactShadows
              position={[0, -0.8, 0]}
              opacity={0.35}
              scale={10}
              blur={1.5}
              far={4.5}
            />

            <OrbitControls
              ref={orbitControlsRef}
              enableZoom
              maxDistance={4}
              minDistance={1.5}
              autoRotate
              autoRotateSpeed={1}
            />

            <Bounds fit clip observe margin={1.2}>
              <Model wireframe={wireframe} />
            </Bounds>
          </Canvas>

          {/* Hint rotation 360° */}
          <AnimatePresence>
            {showHint && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute bottom-2 md:bottom-4 left-1/2 transform -translate-x-1/2 text-white text-xs md:text-sm flex items-center gap-2 bg-black/60 px-3 md:px-4 py-2 rounded-full shadow-lg backdrop-blur-sm"
              >
                <AiOutlineRotateLeft className="text-sm md:text-lg animate-spin-slow" />
                <span className="hidden sm:inline">Tournez la canette à 360°</span>
                <span className="sm:hidden">Tournez à 360°</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Panel des raccourcis clavier */}
          <AnimatePresence>
            {showKeyboardShortcuts && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -10 }}
                className="absolute top-12 md:top-16 right-2 md:right-4 bg-black/80 text-white p-3 md:p-4 rounded-lg shadow-xl backdrop-blur-sm border border-white/20 text-xs md:text-sm z-20"
              >
                <h4 className="font-semibold mb-2 text-purple-300">Raccourcis clavier :</h4>
                <div className="space-y-1">
                  <div className="flex justify-between gap-4">
                    <span className="text-gray-300">Wireframe</span>
                    <kbd className="bg-white/20 px-2 py-1 rounded text-xs">W</kbd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-gray-300">Plein écran</span>
                    <kbd className="bg-white/20 px-2 py-1 rounded text-xs">F</kbd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-gray-300">Reset</span>
                    <kbd className="bg-white/20 px-2 py-1 rounded text-xs">R</kbd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-gray-300">Environnement</span>
                    <kbd className="bg-white/20 px-2 py-1 rounded text-xs">E</kbd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-gray-300">Aide</span>
                    <kbd className="bg-white/20 px-2 py-1 rounded text-xs">H</kbd>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}