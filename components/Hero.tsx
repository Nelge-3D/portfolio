'use client';
import React from 'react';
import Nav from './Nav';

export default function Header() {
  return (
    <header id="hero" className="relative h-screen w-full overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover filter brightness-75"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/Hero_v1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay Gradient (sans blur) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/60" />

      {/* Navigation */}
      <Nav />

      {/* Text Content */}
      <div className="relative z-10 flex items-center justify-center h-full px-6">
        <div className="text-center max-w-2xl text-white">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg animate-fadeIn">
            Nelge <span className="text-amber-300">3D</span>
          </h1>
          <p className="text-lg md:text-xl mb-4 text-amber-300 font-semibold drop-shadow-md animate-fadeIn delay-150">
            « Le design en 3D, c’est donner vie à l’imaginaire, un pixel à la fois. »
          </p>
          <p className="text-sm md:text-base text-gray-300 drop-shadow-sm animate-fadeIn delay-300">
            Nous servons la région de Los Angeles avec un conseil juridique expert depuis 1976.
          </p>
        </div>
      </div>

      {/* Animation Keyframes */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease forwards;
        }
        .delay-150 {
          animation-delay: 0.15s;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
      `}</style>
    </header>
  );
}
