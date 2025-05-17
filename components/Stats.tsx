import React from 'react';

export default function StatsSection() {
  return (
    <section id="stats">
      {/* Image de fond avec texte superposé */}
      <div
        className="bg-cover bg-center text-white py-24 px-6 md:px-16"
        style={{
          backgroundImage: "url('/Hero.png')", // ✅ remplace par ton image 3D si besoin
        }}
      >
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Donnez vie à vos idées avec la 3D
          </h2>
          <p className="text-lg md:text-xl">
            Je conçois des visuels 3D immersifs pour sublimer vos produits et marquer les esprits.
          </p>
        </div>
      </div>

      {/* Section statistiques */}
      <div className="bg-[#f8f4ef] py-16 px-6 md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div>
            <p className="text-5xl font-semibold text-[#2d0e0e]">100+</p>
            <p className="mt-2 text-[#2d0e0e] text-lg">rendus de produits finalisés</p>
          </div>
          <div>
            <p className="text-5xl font-semibold text-[#2d0e0e]">95%</p>
            <p className="mt-2 text-[#2d0e0e] text-lg">de clients satisfaits</p>
          </div>
          <div>
            <p className="text-5xl font-semibold text-[#2d0e0e]">50+</p>
            <p className="mt-2 text-[#2d0e0e] text-lg">marques accompagnées</p>
          </div>
        </div>
      </div>
    </section>
  );
}
