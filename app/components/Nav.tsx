'use client';
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between items-center p-6 text-white z-50 bg-transparent">
      {/* Logo */}
      <div className="text-3xl font-bold z-50">
        <span className="bg-white text-black px-2 py-1 rounded">⌘</span>
      </div>

      {/* Desktop Nav */}
      <div className="hidden md:flex space-x-8 text-sm font-medium">
        <a href="#about" className="hover:underline">
          About
        </a>
        <a href="#services" className="hover:underline">
          Services
        </a>
        <a href="#consult" className="hover:underline">
          Schedule a Consult
        </a>
      </div>

      {/* Mobile Burger */}
      <div className="md:hidden z-50">
        <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Side Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-black bg-opacity-95 text-white transform ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out z-40 flex flex-col items-start p-6 space-y-6 md:hidden`}
      >
        <button
          onClick={() => setMenuOpen(false)}
          className="ml-auto mb-6"
          aria-label="Close menu"
        >
          <X size={28} />
        </button>
        <a href="#about" onClick={() => setMenuOpen(false)} className="text-lg font-medium">
          About
        </a>
        <a href="#services" onClick={() => setMenuOpen(false)} className="text-lg font-medium">
          Services
        </a>
        <a href="#consult" onClick={() => setMenuOpen(false)} className="text-lg font-medium">
          Schedule a Consult
        </a>
      </div>
    </nav>
  );
}
