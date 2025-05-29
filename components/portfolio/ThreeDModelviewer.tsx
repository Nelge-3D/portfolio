'use client';

import Link from "next/link";
import { Canvas } from '@react-three/fiber';
import {
  OrbitControls,
  ContactShadows,
  useGLTF,
  Center,
  Bounds,
  Html,
} from '@react-three/drei';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineRotateLeft } from 'react-icons/ai';

function Model() {
  const { scene } = useGLTF('/renders/Regab seul.glb');
  return (
    <Center>
      <primitive object={scene} scale={15} />
    </Center>
  );
}

export default function ThreeDModelViewer() {
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowHint(false), 5000); // 5 sec
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full bg-gradient-to-br from-black via-gray-900 to-black py-16 px-4 md:px-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Canvas 3D */}
        <div className="relative w-full md:w-1/2 h-[400px] md:h-[600px] bg-black rounded-2xl shadow-2xl p-2 border-4 border-red-600">
          <Canvas shadows camera={{ position: [0, 0.1, 2.5], fov: 38 }}>
            <ambientLight intensity={1.2} />
            <directionalLight
              position={[2, 5, 2]}
              intensity={2.2}
              color={'#00bfff'}
              castShadow
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
            />
            <directionalLight
              position={[-2, 5, -2]}
              intensity={2.2}
              color={'#ff4d4d'}
            />
            <spotLight
              position={[0, 3, 2]}
              angle={0.4}
              intensity={3}
              penumbra={0.5}
              castShadow
            />
            <pointLight position={[0, 1, 1]} intensity={1.5} color="#ffffff" />

            <ContactShadows
              position={[0, -0.8, 0]}
              opacity={0.35}
              scale={10}
              blur={1.5}
              far={4.5}
            />

            {/* Rotation automatique + navigation */}
            <OrbitControls
              enableZoom
              maxDistance={4}
              minDistance={1.5}
              autoRotate
              autoRotateSpeed={1}
            />

            <Bounds fit clip observe margin={1.2}>
              <Model />
            </Bounds>
          </Canvas>

          {/* Indication visuelle 360° */}
          <AnimatePresence>
            {showHint && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm flex items-center gap-2 bg-black/60 px-4 py-2 rounded-full shadow-lg"
              >
                <AiOutlineRotateLeft className="text-lg animate-spin-slow" />
                <span>Tournez la canette à 360°</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Texte descriptif */}
        <div className="w-full md:w-1/2 space-y-6 text-white">
          <h2 className="text-4xl font-extrabold leading-tight">
            Découvrez la <span className="text-red-500">fraîcheur Regab</span>
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            Une canette de qualité premium, magnifiée par des effets lumineux puissants qui
            révèlent sa texture glacée et son design emblématique. Idéale pour mettre en valeur
            chaque détail dans un environnement moderne.
          </p>
          <Link href="/portfolio">
            <button className="mt-4 px-6 py-3 bg-red-600 text-white rounded-xl shadow-md hover:bg-red-700 transition duration-300">
              3D portfolio
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
