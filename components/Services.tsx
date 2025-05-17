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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const services = [
    'Publicités 3D pour produits',
    'Modélisation de scènes réalistes',
    'Animations de présentation',
    'Texturing & lighting avancés',
    'Visualisations architecturales',
    'Direction artistique 3D',
    'Design de concepts visuels',
    '+ Et plus sur demande',
  ];

  return (
    <section
      id="services"
      ref={sectionRef}
      className="bg-[#0e1a0e] text-[#f5f3ed] py-20 px-6 md:px-16"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className={`text-lg font-medium mb-10 ${isVisible ? 'animate-fadeIn delay-150' : 'opacity-0'}`}>
          Mes services
        </h2>
        <div className="space-y-4 text-4xl md:text-5xl font-medium leading-tight">
          {services.map((service, index) => (
            <p
              key={index}
              className={`${
                isVisible ? 'animate-fadeIn' : 'opacity-0'
              } delay-${index * 150} ${
                service.startsWith('+') ? 'text-[#6b6b6b]' : ''
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {service}
            </p>
          ))}
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

        .opacity-0 {
          opacity: 0;
        }
      `}</style>
    </section>
  );
}
