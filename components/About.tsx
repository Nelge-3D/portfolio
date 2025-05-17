import React from 'react'

// components/AboutSection.tsx
export default function About() {
  return (
    <section className="bg-[#f9f6ef] py-20 px-6 md:px-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold mb-10">
          Welcome to Jones & Brown Legal
        </h2>
        <div className="grid md:grid-cols-2 gap-10 text-lg text-gray-900">
          <p>
            Jones & Brown Legal has been a pillar of the Los Angeles legal
            community, providing expert legal counsel across a wide spectrum of
            practice areas. We are more than just attorneys, we are trusted
            advisors, dedicated advocates, and strategic partners committed to
            achieving the best possible outcomes for our clients.
          </p>
          <p>
            We combine decades of experience with a deep understanding of the
            complexities of California law. Our team of seasoned trial attorneys
            boasts a proven track record of success in courtrooms throughout Los
            Angeles and beyond. We pride ourselves on our comprehensive
            expertise, covering nearly every field of law, ensuring that
            whatever your legal challenge, we have the knowledge and experience
            to guide you.
          </p>
        </div>
        <div className="mt-10">
          <a
            href="#consult"
            className="inline-block bg-[#391a14] text-white px-6 py-3 rounded-full text-base font-medium hover:bg-[#2e120e] transition"
          >
            Schedule a Consult
          </a>
        </div>
      </div>
    </section>
  );
}

