'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const BLUR =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

const steps = [
  {
    number: '01',
    title: 'Wireframe',
    body:
      "Modélisation de la structure de base en fil de fer dans Blender, permettant d'avoir une vision claire de la topologie. Cette étape sert à poser les fondations du modèle 3D avec une géométrie propre et optimisée.",
    image: '/renders/wireframe.png',
    alt: 'Wireframe',
    reverse: false,
  },
  {
    number: '02',
    title: 'Mode Solide & UV Mapping',
    body:
      "Une fois les formes solides appliquées, j'effectue le UV Unwrapping — une étape essentielle pour déplier le modèle 3D en 2D, afin d'y appliquer correctement des textures. Cela garantit un rendu fidèle et réaliste lors du texturage.",
    image: '/renders/solid.png',
    alt: 'Solid Mode',
    reverse: true,
  },
];

export default function CreationProcess() {
  return (
    <section className="relative bg-[#0c0800] text-white py-24 px-4 md:px-12 overflow-hidden">
      {/* Ambient gold blob */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-amber-500/5 blur-[80px] rounded-full" />

      <div className="relative max-w-6xl mx-auto">
        {/* Section header */}
        <div data-aos="fade-up" className="text-center mb-20">
          <p className="font-body text-[10px] tracking-[0.35em] uppercase text-amber-500/70 mb-4">
            Blender · Workflow
          </p>
          <h3
            className="font-display text-4xl md:text-5xl font-light italic text-amber-100"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Processus de Création
          </h3>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-400/50" />
            <div className="w-1 h-1 rounded-full bg-violet-400/60" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-400/50" />
          </div>

          <p className="font-body text-amber-200/50 max-w-2xl mx-auto mt-8 text-sm md:text-base leading-relaxed">
            Pour la réalisation de ces projets, j&apos;utilise exclusivement{' '}
            <strong className="text-amber-300 font-medium">Blender</strong> — logiciel open-source de modélisation, rendu et animation.
            De la structure initiale jusqu&apos;au rendu final, tout est conçu avec une attention aux détails et à l&apos;optimisation.
          </p>
        </div>

        {/* Steps */}
        {steps.map((step) => (
          <div
            key={step.number}
            data-aos="fade-up"
            className={`flex flex-col ${step.reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-10 mb-20`}
          >
            {/* Text */}
            <div className="w-full md:w-1/2">
              <p className="font-display text-6xl font-light italic text-amber-500/15 mb-2 leading-none" style={{ fontFamily: 'var(--font-display)' }}>
                {step.number}
              </p>
              <h4
                className="font-display text-2xl font-medium italic text-amber-200 mb-3"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {step.title}
              </h4>
              <p className="font-body text-sm text-amber-200/50 leading-relaxed">{step.body}</p>
            </div>

            {/* Image */}
            <div className="w-full md:w-1/2 group">
              <div className="relative overflow-hidden rounded-2xl border border-amber-400/10 hover:border-amber-400/25 transition-all duration-500 hover:shadow-xl hover:shadow-amber-500/10">
                <Image
                  src={step.image}
                  alt={step.alt}
                  width={640}
                  height={400}
                  placeholder="blur"
                  blurDataURL={BLUR}
                  className="w-full h-auto group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        ))}

        {/* Step 03 — Final render */}
        <div data-aos="fade-up" className="text-center max-w-3xl mx-auto mb-20">
          <div className="relative overflow-hidden rounded-2xl border border-amber-400/10 hover:border-amber-400/25 transition-all duration-500 hover:shadow-xl hover:shadow-amber-500/10 mb-8">
            <Image
              src="/renders/final.png"
              alt="Rendu Final"
              width={900}
              height={560}
              placeholder="blur"
              blurDataURL={BLUR}
              className="w-full h-auto hover:scale-105 transition-transform duration-700"
            />
          </div>
          <p className="font-display text-6xl font-light italic text-amber-500/15 mb-1 leading-none" style={{ fontFamily: 'var(--font-display)' }}>
            03
          </p>
          <h4
            className="font-display text-2xl font-medium italic text-amber-200 mb-3"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Rendu Final
          </h4>
          <p className="font-body text-sm text-amber-200/50 leading-relaxed">
            Ajout des matériaux, textures, éclairage HDRI et post-traitement dans Blender. Le rendu final met en valeur
            le modèle avec une ambiance visuelle forte et professionnelle.
          </p>
        </div>

        {/* Logo mention */}
        <div data-aos="fade-up" className="text-center max-w-xl mx-auto mb-16">
          <h4
            className="font-display text-xl font-medium italic text-amber-300/70 mb-2"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Identité visuelle
          </h4>
          <p className="font-body text-sm text-amber-200/40">
            Le logo a été conçu via <strong className="text-amber-300/70 font-medium">Canva</strong> et complète l&apos;univers 3D développé dans ce portfolio.
          </p>
        </div>

        {/* CTA canette */}
        <div data-aos="zoom-in-up" className="text-center">
          <Link
            href="/canette-3d"
            className="font-body inline-flex items-center gap-3 px-8 py-4 rounded-full border border-amber-400/30 bg-amber-500/10 text-amber-300 hover:border-amber-400/70 hover:bg-amber-500/20 hover:text-white hover:shadow-xl hover:shadow-amber-500/20 transition-all duration-400 text-sm font-medium tracking-wide"
          >
            <span className="text-lg">🍺</span>
            Voir la canette Régab en 3D interactive
          </Link>
        </div>
      </div>
    </section>
  );
}
