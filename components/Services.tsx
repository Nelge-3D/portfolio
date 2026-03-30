'use client';
import React, { useEffect, useRef, useState } from 'react';

export default function Services() {
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
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const services = [
    'Publicités 3D pour produits',
    'Modélisation de scènes réalistes',
    'Animations de présentation (à venir)',
    'Texturing & lighting avancés (à venir)',
    'Visualisations architecturales (à venir)',
    'Direction artistique 3D (à venir)',
    'Design de concepts visuels (à venir)',
    '+ Et plus sur demande',
  ];

  return (
    <section
      id="services"
      ref={sectionRef}
      className="
        bg-gradient-to-br from-[#2e0066] via-[#1a002b] to-black text-[#f5f3ed]
        /* Mobile (par défaut - jusqu'à 640px) */
        py-12 px-4
        /* Tablette (640px - 768px) */
        sm:py-16 sm:px-6
        /* Petit écran ordinateur (768px - 1024px) */
        md:py-20 md:px-8
        /* Écran standard (1024px - 1280px) */
        lg:py-24 lg:px-10
        /* Grand écran (1280px et +) */
        xl:py-28 xl:px-12
        /* Très grand écran (1536px et +) */
        2xl:py-32 2xl:px-14
      "
    >
      <div className="
        max-w-6xl mx-auto
        /* Mobile */
        px-0
        /* Tablette */
        sm:px-0
        /* Petit écran ordinateur */
        md:px-2
        /* Écran standard */
        lg:px-4
      ">
        <h2 className={`
          /* Mobile */
          text-sm sm:text-base md:text-lg lg:text-xl 
          font-medium 
          /* Mobile */
          mb-4 sm:mb-6 md:mb-8 lg:mb-10
          transition-opacity duration-500 
          ${isVisible ? 'opacity-100' : 'opacity-0'}
        `}>
          Mes services
        </h2>
        
        <div className="
          grid gap-2 sm:gap-3 md:gap-4 
          text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 
          font-medium leading-tight sm:leading-snug md:leading-relaxed
        ">
          {services.map((service, index) => (
            <div
              key={index}
              className={`
                transition-all duration-500 ease-out
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
              `}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <p className={`
                ${service.startsWith('+') ? 'text-gray-400' : 'text-[#f5f3ed]'}
                hover:text-amber-300 transition-colors duration-300
                /* Mobile */
                py-1 sm:py-1.5 md:py-2
              `}>
                {service}
              </p>
              {index < services.length - 1 && (
                <div className={`
                  h-px bg-gradient-to-r from-transparent via-white/10 to-transparent w-full
                  /* Mobile */
                  mt-2 sm:mt-3 md:mt-4 lg:mt-5
                  transition-opacity duration-500
                  ${isVisible ? 'opacity-100' : 'opacity-0'}
                `} 
                style={{ transitionDelay: `${index * 100 + 50}ms` }} 
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}