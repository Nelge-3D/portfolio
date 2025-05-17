'use client';
import React from 'react';
import Nav from './Nav';

export default function Header() {
  return (
    <header className="relative h-screen w-full overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/Hero_v1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-40" />

      {/* Navigation */}
      <Nav />

      {/* Text Content */}
      <div className="relative z-10 flex items-center justify-center h-full px-6">
        <div className="text-white text-center max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Jones & Brown Legal</h1>
          <p className="text-lg md:text-xl mb-4">Deep expertise, decisive courtroom presence</p>
          <p className="text-sm md:text-base">We've been serving the Los Angeles area with expert legal counsel since 1976.</p>
        </div>
      </div>
    </header>
  );
}
