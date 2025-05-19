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

  // Parallax mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      const shapes = document.querySelectorAll('.parallax-shape');
      shapes.forEach(shape => {
        (shape as HTMLElement).style.transform = `translate(${x}px, ${y}px)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative bg-[#f8f6f1] py-16 px-6 md:px-12 overflow-hidden"
    >
      {/* Background SVG artistic shapes */}
      <svg
        className="parallax-shape absolute left-[-80px] top-[-60px] w-[500px] h-[500px] opacity-[0.06] text-[#9c8f83] animate-fadeInSlow"
        viewBox="0 0 600 600"
        fill="none"
      >
        <circle cx="300" cy="300" r="300" fill="currentColor" />
      </svg>

      <svg
        className="parallax-shape absolute right-[-60px] bottom-[-40px] w-[400px] h-[400px] opacity-[0.04] text-[#cabfb6] animate-fadeInSlow delay-300"
        viewBox="0 0 400 400"
        fill="none"
      >
        <rect width="400" height="400" rx="100" fill="currentColor" />
      </svg>

      <div className="relative z-10 max-w-5xl mx-auto text-gray-800">
        <h2
          className={`text-3xl md:text-4xl font-bold mb-10 
          ${isVisible ? 'animate-fadeIn delay-150' : 'opacity-0'}`}
        >
          À propos de moi
        </h2>

        <div className="grid md:grid-cols-2 gap-10 text-lg leading-relaxed">
          <p className={`${isVisible ? 'animate-fadeIn delay-300' : 'opacity-0'}`}>
            Je suis un passionné de 3D spécialisé dans la création de publicités visuelles et de scènes immersives.
            J’accorde une grande importance à l’esthétique, aux détails et à la narration visuelle.
          </p>
          <p className={`${isVisible ? 'animate-fadeIn delay-500' : 'opacity-0'}`}>
            Mon objectif est de donner vie à des idées grâce à Blender, Unity, ou Unreal Engine, en associant technologie et émotion.
            Chaque projet est conçu pour marquer les esprits et valoriser l’univers du client.
          </p>
        </div>

        <div className="mt-12 space-y-8 text-base">
          <div className={`${isVisible ? 'animate-fadeIn delay-700' : 'opacity-0'}`}>
            <h3 className="font-semibold text-lg">🧠 Philosophie de création</h3>
            <p>Créer avec intention, équilibrer technique et émotion, capturer l’essence d’un concept pour le rendre mémorable.</p>
          </div>

          <div className={`${isVisible ? 'animate-fadeIn delay-900' : 'opacity-0'}`}>
            <h3 className="font-semibold text-lg">🛠️ Compétences techniques</h3>
            <p>Blender, Unity, Unreal Engine, After Effects, Figma, Substance Painter, Photoshop.</p>
          </div>

          <div className={`${isVisible ? 'animate-fadeIn delay-[1100ms]' : 'opacity-0'}`}>
            <h3 className="font-semibold text-lg">💻 Setup</h3>
            <p>PC RTX 4070, 32Go RAM, écran 2K 144Hz, tablette Wacom Intuos Pro.</p>
          </div>

          <div className={`${isVisible ? 'animate-fadeIn delay-[1300ms]' : 'opacity-0'}`}>
            <h3 className="font-semibold text-lg">🕰️ Mon parcours</h3>
            <ul className="list-disc pl-6">
              <li>2021 – Débuts sur Blender</li>
              <li>2022 – Freelance en motion design</li>
              <li>2023 – Intégration de la 3D dans des projets web interactifs</li>
              <li>2024 – Lancement de mon portfolio & projets personnels</li>
            </ul>
          </div>

          <div className="pt-6">
            <a
              href="/CV_MonNom.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#391a14] text-white px-6 py-3 rounded-full font-medium hover:bg-[#2e120e] transition duration-300 shadow-lg"
            >
              📄 Télécharger mon CV PDF
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInSlow {
          from {
            opacity: 0;
            transform: scale(1.1);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease forwards;
        }

        .animate-fadeInSlow {
          animation: fadeInSlow 2.5s ease forwards;
        }

        .delay-150 { animation-delay: 0.15s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-700 { animation-delay: 0.7s; }
        .delay-900 { animation-delay: 0.9s; }
        .delay-[1100ms] { animation-delay: 1.1s; }
        .delay-[1300ms] { animation-delay: 1.3s; }

        .opacity-0 { opacity: 0; }
      `}</style>
    </section>
  );
}
