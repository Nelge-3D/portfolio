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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="bg-[#f9f6ef] py-20 px-6 md:px-16"
    >
      <div className="max-w-6xl mx-auto">
        <h2
          className={`text-3xl md:text-4xl font-semibold mb-10 text-gray-800 drop-shadow-sm 
          ${isVisible ? 'animate-fadeIn delay-150' : 'opacity-0'}`}
        >
          À propos de moi
        </h2>
        <div className="grid md:grid-cols-2 gap-10 text-lg text-gray-700 leading-relaxed">
          <p className={`${isVisible ? 'animate-fadeIn delay-300' : 'opacity-0'}`}>
            Je suis un passionné de 3D spécialisé dans la création de publicités visuelles de produits et de scènes de design immersives. 
            J’accorde une grande importance à l’esthétique, aux détails et à la narration visuelle pour sublimer chaque projet.
          </p>
          <p className={`${isVisible ? 'animate-fadeIn delay-500' : 'opacity-0'}`}>
            Mon objectif est de donner vie à des idées grâce à la modélisation, à l’éclairage et à l’animation 3D, que ce soit pour le branding, 
            la présentation produit ou des concepts artistiques. Chaque rendu est conçu avec soin pour marquer les esprits et valoriser l’univers de mes clients.
          </p>
        </div>
        <div className="mt-12">
          <a
            href="#consult"
            className={`inline-block bg-[#391a14] text-white px-8 py-3 rounded-full text-base font-semibold hover:bg-[#2e120e] shadow-lg transition duration-300 ease-in-out 
            ${isVisible ? 'animate-fadeIn delay-700' : 'opacity-0'}`}
          >
            Me contacter
          </a>
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

        .animate-fadeIn {
          animation: fadeIn 0.8s ease forwards;
        }

        .delay-150 {
          animation-delay: 0.15s;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
        .delay-500 {
          animation-delay: 0.5s;
        }
        .delay-700 {
          animation-delay: 0.7s;
        }

        .opacity-0 {
          opacity: 0;
        }
      `}</style>
    </section>
  );
}
