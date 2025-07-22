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
      className="bg-gradient-to-br from-[#2e0066] via-[#1a002b] to-black text-[#f5f3ed] py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className={`text-base sm:text-lg md:text-xl font-medium mb-6 sm:mb-8 md:mb-10 transition-opacity duration-500 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}>
          Mes services
        </h2>
        
        <div className="grid gap-3 sm:gap-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium leading-snug sm:leading-tight">
          {services.map((service, index) => (
            <div
              key={index}
              className={`transition-all duration-500 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <p className={`${
                service.startsWith('+') ? 'text-gray-400' : 'text-[#f5f3ed]'
              } hover:text-amber-300 transition-colors duration-300`}>
                {service}
              </p>
              {index < services.length - 1 && (
                <div className={`h-px bg-gradient-to-r from-transparent via-white/10 to-transparent w-full mt-3 sm:mt-4 ${
                  isVisible ? 'opacity-100' : 'opacity-0'
                }`} style={{ transitionDelay: `${index * 100 + 50}ms` }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}