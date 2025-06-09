'use client';
import React from 'react';
import { Orbitron } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from "react";

const orbitron = Orbitron({ subsets: ['latin'], weight: ['600'] });

export default function CreationProcess() {

  return (
    <section className="bg-[#0a192f] text-white py-20 px-4 md:px-12">
      <div className="max-w-7xl mx-auto">
        <h3 className={`${orbitron.className} text-4xl font-bold text-center mb-16`}>
          Processus de Création 3D
        </h3>

        <p className="text-center text-neutral-300 max-w-3xl mx-auto mb-10 text-sm md:text-base">
          Pour la réalisation de ces projets 3D, j'utilise exclusivement <strong>Blender</strong>, un logiciel open-source puissant
          de modélisation, rendu et animation. De la structure initiale jusqu’au rendu final, tout est conçu dans Blender
          avec une attention particulière aux détails et à l’optimisation.
        </p>

        {/* Étape 1 */}
        <div data-aos="fade-up" className="flex flex-col md:flex-row items-center gap-8 mb-16">
          <div className="w-full md:w-1/2 text-left order-2 md:order-1">
            <h4 className="text-2xl font-semibold mb-2">Étape 1 : Wireframe</h4>
            <p className="text-sm text-neutral-300">
              Modélisation de la structure de base en fil de fer dans Blender, permettant d’avoir une vision claire de la
              topologie. Cette étape sert à poser les fondations du modèle 3D avec une géométrie propre et optimisée.
            </p>
          </div>
          <div className="w-full md:w-1/2 order-1 md:order-2">
            <Image
              src="/renders/wireframe.png"
              alt="Wireframe"
              width={600}
              height={400}
              className="rounded-lg shadow-md w-full h-auto"
            />
          </div>
        </div>

        {/* Étape 2 */}
        <div data-aos="fade-up" data-aos-delay="100" className="flex flex-col md:flex-row-reverse items-center gap-8 mb-16">
          <div className="w-full md:w-1/2 text-left">
            <h4 className="text-2xl font-semibold mb-2">Étape 2 : Mode Solide & UV Mapping</h4>
            <p className="text-sm text-neutral-300">
              Une fois les formes solides appliquées, j’effectue le <strong>UV Unwrapping</strong> — une étape essentielle
              pour déplier le modèle 3D en 2D, afin d’y appliquer correctement des textures. Cela garantit un rendu fidèle et
              réaliste lors du texturage.
            </p>
          </div>
          <div className="w-full md:w-1/2">
            <Image
              src="/renders/solid.png"
              alt="Solid Mode"
              width={600}
              height={400}
              className="rounded-lg shadow-md w-full h-auto"
            />
          </div>
        </div>

        {/* Étape 3 */}
        <div data-aos="fade-up" data-aos-delay="200" className="text-center max-w-3xl mx-auto mb-16">
          <Image
            src="/renders/final.png"
            alt="Rendu Final"
            width={800}
            height={500}
            className="rounded-lg shadow-md mb-6 w-full h-auto"
          />
          <h4 className="text-2xl font-semibold mb-2">Étape 3 : Rendu Final</h4>
          <p className="text-sm text-neutral-300">
            Ajout des matériaux, textures, éclairage HDRI et post-traitement dans Blender. Le rendu final met en valeur le
            modèle avec une ambiance visuelle forte et professionnelle.
          </p>
        </div>

        {/* Logo */}
        <div data-aos="fade-up" data-aos-delay="300" className="text-center max-w-2xl mx-auto">
          <h4 className="text-xl font-semibold mb-2">Création du Logo</h4>
          <p className="text-sm text-neutral-300">
            Le logo utilisé dans ce projet a été conçu via <strong>Canva</strong>, une plateforme intuitive de design graphique.
            Il symbolise mon identité visuelle et complète parfaitement l’univers 3D que je développe.
          </p>
          {/* 3D Regab interactive */}
        <div className="mt-24 text-center" data-aos="zoom-in-up">
          
            <Link
              href="/canette-3d" // Remplace ceci par le bon lien ou une URL externe si nécessaire
              className="inline-block px-8 py-4 text-white font-bold text-lg bg-yellow-500 rounded-full shadow-lg hover:scale-105 transition-transform duration-300 animate-pulse ring-2 ring-yellow-300"
            >
              🍺 Voir la canette de Régab en 3D
            </Link> 
        </div>
        </div>
      </div>
    </section>
  );
}
