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
      className="relative py-20 px-6 md:px-16 min-h-[90vh] flex flex-col justify-center
                 bg-gradient-to-b from-white via-gray-50 to-gray-100 text-gray-900"
    >
      <div className="relative z-10 max-w-6xl mx-auto">
        <h2
          className={`text-4xl md:text-5xl font-extrabold mb-14 tracking-wide transition-transform duration-800 ${
            isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
          }`}
        >
          À propos de moi
        </h2>

        <div className="grid md:grid-cols-2 gap-14 text-lg leading-relaxed">
          {[ 
            "Je suis un passionné de 3D spécialisé dans la création de publicités visuelles et de scènes immersives. J’accorde une grande importance à l’esthétique, aux détails et à la narration visuelle.",
            "Mon objectif est de donner vie à des idées grâce à Blender, Unity, ou Unreal Engine, en associant technologie et émotion. Chaque projet est conçu pour marquer les esprits et valoriser l’univers du client."
          ].map((text, i) => (
            <p
              key={i}
              className={`rounded-xl p-6 shadow-lg border border-gray-200 bg-white transition-transform duration-700 ease-out hover:scale-[1.03] hover:shadow-xl ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: `${150 + i * 150}ms` }}
            >
              {text}
            </p>
          ))}
        </div>

        <div className="mt-16 space-y-12 text-base max-w-3xl mx-auto">
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
              className={`rounded-lg p-5 shadow-lg border border-gray-200 bg-white transition-transform duration-700 ease-out hover:scale-[1.05] hover:shadow-2xl ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${450 + i * 150}ms` }}
            >
              <h3 className="font-semibold text-xl mb-2">{title}</h3>
              <p>{content}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a
            href="/CV_MonNom.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gray-900 text-white px-10 py-4 rounded-full font-semibold tracking-wide shadow-lg
                       transform transition-transform duration-300 hover:scale-105 active:scale-95"
          >
            📄 Télécharger mon CV PDF
          </a>
        </div>
      </div>
    </section>
  );
}
