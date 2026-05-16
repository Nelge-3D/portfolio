'use client';
import React, { useEffect, useRef, useState } from 'react';

const services = [
  { text: 'Publicités 3D pour produits',            available: true },
  { text: 'Modélisation de scènes réalistes',       available: true },
  { text: 'Animations de présentation',             available: false },
  { text: 'Texturing & lighting avancés',           available: false },
  { text: 'Visualisations architecturales',         available: false },
  { text: 'Direction artistique 3D',                available: false },
  { text: 'Design de concepts visuels',             available: false },
  { text: '+ Et plus sur demande',                  available: false, muted: true },
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setIsVisible(true); }); },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-24 md:py-32 px-6 md:px-12 bg-gradient-to-b from-[#07000f] via-[#100020] to-[#07000f] text-white overflow-hidden"
    >
      {/* Ambient */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-violet-600/8 rounded-full blur-[90px]" />
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-amber-500/5 rounded-full blur-[70px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Label */}
        <p className={`font-body text-[10px] tracking-[0.35em] uppercase text-amber-400/70 mb-5 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
          Offres
        </p>

        {/* Heading */}
        <h2
          className={`font-display text-4xl md:text-5xl lg:text-6xl font-light italic text-violet-100/80 mb-16 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Mes services
        </h2>

        {/* Service list */}
        <div className="space-y-0">
          {services.map((service, index) => (
            <div
              key={index}
              className={`transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <div className="group flex items-center justify-between py-5 border-b border-white/5 hover:border-violet-400/20 transition-colors duration-300 cursor-default">
                <div className="flex items-center gap-4">
                  {/* Dot indicator */}
                  <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-300 ${
                    service.muted
                      ? 'bg-white/10'
                      : service.available
                        ? 'bg-amber-400 group-hover:bg-amber-300 group-hover:shadow-sm group-hover:shadow-amber-400'
                        : 'bg-violet-500/40 group-hover:bg-violet-400/60'
                  }`} />

                  <p className={`font-body text-lg md:text-xl lg:text-2xl font-light transition-colors duration-300 ${
                    service.muted
                      ? 'text-white/20'
                      : service.available
                        ? 'text-white/85 group-hover:text-amber-200'
                        : 'text-white/50 group-hover:text-violet-200'
                  }`}>
                    {service.text}
                  </p>
                </div>

                {!service.muted && !service.available && (
                  <span className="font-body text-[9px] tracking-[0.2em] uppercase text-violet-500/50 bg-violet-950/40 border border-violet-400/10 px-2.5 py-1 rounded-full flex-shrink-0">
                    Bientôt
                  </span>
                )}
                {service.available && (
                  <span className="font-body text-[9px] tracking-[0.2em] uppercase text-amber-400/70 bg-amber-950/30 border border-amber-400/15 px-2.5 py-1 rounded-full flex-shrink-0">
                    Disponible
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
