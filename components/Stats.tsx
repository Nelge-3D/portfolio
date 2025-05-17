import React from 'react';

export default function StatsSection() {
  return (
    <section>
      {/* Background image with overlay text */}
      <div
        className="bg-cover bg-center text-white py-24 px-6 md:px-16"
        style={{
          backgroundImage: "url('/Hero.png')", // 🔁 à remplacer par le vrai chemin
        }}
      >
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">Your Legal Success Starts Here</h2>
          <p className="text-lg md:text-xl">
            At Jones & Brown Legal, we are committed to exceptional service and successful outcomes with:
          </p>
        </div>
      </div>

      {/* Stats section */}
      <div className="bg-[#f8f4ef] py-16 px-6 md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div>
            <p className="text-5xl font-semibold text-[#2d0e0e]">30+</p>
            <p className="mt-2 text-[#2d0e0e] text-lg">years of experience</p>
          </div>
          <div>
            <p className="text-5xl font-semibold text-[#2d0e0e]">98%</p>
            <p className="mt-2 text-[#2d0e0e] text-lg">success rate in court</p>
          </div>
          <div>
            <p className="text-5xl font-semibold text-[#2d0e0e]">120+</p>
            <p className="mt-2 text-[#2d0e0e] text-lg">attorneys at hand</p>
          </div>
        </div>
      </div>
    </section>
  );
}
