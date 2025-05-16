import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function Testimonials() {
  return (
    <section className="bg-white py-20 px-6 md:px-16 text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">Hear From Our Clients</h2>
        <p className="text-gray-600 mb-12">
          We believe that our clients' experiences speak volumes about the quality of our legal services.
          Here's what some of them have to say:
        </p>
        <div className="bg-gray-100 p-8 rounded-lg">
          <p className="text-xl md:text-2xl font-medium leading-relaxed mb-6">
            "Jones & Brown Legal handled my estate planning with such care and professionalism.
            They listened to my concerns and made the process clear and straightforward.
            I now have complete peace of mind knowing my family's future is secure."
          </p>
          <p className="font-semibold">— David L., Business Owner</p>
        </div>
        <div className="flex items-center justify-center mt-8 space-x-6 text-gray-700">
          <ArrowLeft className="cursor-pointer hover:text-black transition" />
          <div className="flex space-x-2">
            <span className="w-3 h-3 rounded-full bg-gray-800" />
            <span className="w-3 h-3 rounded-full bg-gray-300" />
            <span className="w-3 h-3 rounded-full bg-gray-300" />
            <span className="w-3 h-3 rounded-full bg-gray-300" />
          </div>
          <ArrowRight className="cursor-pointer hover:text-black transition" />
        </div>
      </div>
    </section>
  );
}
