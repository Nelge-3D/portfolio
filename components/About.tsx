'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 px-6 md:px-16 min-h-[90vh] bg-gradient-to-b from-black via-gray-900 to-black text-white"
    >
      {/* Titre */}
      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className={`text-4xl md:text-5xl font-extrabold mb-16 tracking-wide text-center`}>
          À propos de moi
        </h2>

        {/* Grille asymétrique */}
        <div className="grid md:grid-cols-2 gap-10">
          {[
            "Je suis un passionné de 3D spécialisé dans la création de publicités visuelles et de scènes immersives. J’accorde une grande importance à l’esthétique, aux détails et à la narration visuelle.",
            "Mon objectif est de donner vie à des idées grâce à Blender, Unity, ou Unreal Engine, en associant technologie et émotion. Chaque projet est conçu pour marquer les esprits et valoriser l’univers du client.",
          ].map((text, i) => (
            <div
              key={i}
              className={`backdrop-blur-md bg-white/10 p-6 md:p-8 rounded-2xl border border-white/20 shadow-xl transform transition-all duration-700 ease-out hover:scale-105 hover:shadow-amber-400/30 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: `${200 + i * 150}ms` }}
            >
              <p className="text-white/90 text-lg leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

        {/* Blocs d'infos techniques */}
        <div className="mt-20 grid md:grid-cols-2 gap-10">
          {[
            {
              title: "🧠 Philosophie de création",
              content: "Créer avec intention, équilibrer technique et émotion, capturer l’essence d’un concept pour le rendre mémorable."
            },
            {
              title: "🛠️ Compétences techniques",
              content: "Blender, Unity, Unreal Engine, After Effects, Figma, Substance Painter, Photoshop."
            },
            {
              title: "💻 Setup",
              content: "PC RTX 4070, 32Go RAM, écran 2K 144Hz, tablette Wacom Intuos Pro."
            },
            {
              title: "🕰️ Mon parcours",
              content: (
                <ul className="list-disc pl-6 space-y-1">
                  <li>2021 – Débuts sur Blender</li>
                  <li>2022 – Freelance en motion design</li>
                  <li>2023 – Intégration de la 3D dans des projets web interactifs</li>
                  <li>2024 – Lancement de mon portfolio & projets personnels</li>
                </ul>
              )
            }
          ].map(({ title, content }, i) => (
            <div
              key={i}
              className={`backdrop-blur-md bg-white/5 p-6 rounded-xl border border-white/20 shadow-lg transition-all transform duration-700 hover:scale-105 hover:shadow-amber-400/30 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${500 + i * 150}ms` }}
            >
              <h3 className="font-semibold text-xl text-amber-400 mb-3">{title}</h3>
              <div className="text-white/80 text-base">{content}</div>
            </div>
          ))}
        </div>

        {/* Bouton CV */}
        <div className="mt-20 text-center">
          <a
            href="/CV_MonNom.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 rounded-full  text-white font-semibold shadow-xl hover:shadow-amber-500/50 transition duration-300 hover:-translate-y-1 hover:ring-2 hover:ring-amber-300 ring-offset-2"
          >
            📄 Télécharger mon CV
          </a>
        </div>
      </div>
    </section>
  );
}
