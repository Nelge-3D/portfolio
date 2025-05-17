'use client';
import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const testimonials = [
  {
    quote: `La pub 3D qu’il a réalisée pour notre parfum a clairement boosté notre visibilité. L’esthétique, les animations, tout était d’un niveau professionnel.`,
    name: 'Clara M.',
    title: 'Brand Manager',
    avatar: '/avatar-clara.jpg',
  },
  {
    quote: `Chaque projet livré était au-delà de nos attentes. Créatif, ponctuel, et toujours à l’écoute. Une valeur sûre !`,
    name: 'Yann D.',
    title: 'Directeur Artistique',
    avatar: '/avatar-yann.jpg',
  },
  {
    quote: `Son sens du détail et de l’ambiance est incroyable. Nos produits ont pris une nouvelle dimension grâce à ses rendus.`,
    name: 'Sophie L.',
    title: 'Responsable Communication',
    avatar: '/avatar-sophie.jpg',
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
    timeoutRef.current = setTimeout(next, 6000);
    return () => clearTimeout(timeoutRef.current!);
  }, [current]);

  const handlePrev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  const handleNext = () => setCurrent((prev) => (prev + 1) % testimonials.length);

  return (
    <section
      id="testimonials"
      className="relative py-24 px-6 md:px-16 text-white bg-gradient-to-br from-[#0e1a0e] via-[#1e2b1e] to-[#0e1a0e] overflow-hidden"
    >
      {/* Background animation */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-400 via-transparent to-transparent animate-pulse z-0" />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ce que disent mes clients</h2>
        <p className="text-gray-300 mb-12">
          Mon travail parle à travers les yeux de ceux qui l'ont expérimenté.
        </p>

        <div className="bg-[#ffffff0d] backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/10 transition-all duration-500 animate-fadeIn">
          <p className="text-xl md:text-2xl italic leading-relaxed mb-6">"{testimonials[current].quote}"</p>
          <div className="flex items-center justify-center gap-4">
            <img
              src={testimonials[current].avatar}
              alt={testimonials[current].name}
              className="w-12 h-12 rounded-full object-cover border-2 border-white"
            />
            <div>
              <p className="font-semibold">{testimonials[current].name}</p>
              <p className="text-sm text-gray-400">{testimonials[current].title}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center mt-10 gap-6 text-white">
          <ArrowLeft className="cursor-pointer hover:scale-110 transition" onClick={handlePrev} />
          <div className="flex gap-2">
            {testimonials.map((_, idx) => (
              <span
                key={idx}
                className={`w-3 h-3 rounded-full ${
                  idx === current ? 'bg-white' : 'bg-white/30'
                } transition-all duration-300`}
              />
            ))}
          </div>
          <ArrowRight className="cursor-pointer hover:scale-110 transition" onClick={handleNext} />
        </div>
      </div>
    </section>
  );
}
