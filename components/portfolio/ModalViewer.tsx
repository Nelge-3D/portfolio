'use client';
import { X } from 'lucide-react';
import { useState } from 'react';

type Props = {
  modal: { type: 'image' | 'video'; src: string; title: string };
  onClose: () => void;
};

export default function ModalViewer({ modal, onClose }: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <button
        className="absolute top-6 right-6 text-white z-50"
        onClick={onClose}
        aria-label="Fermer"
      >
        <X size={32} />
      </button>
      <div className="max-w-5xl w-full relative bg-neutral-900 rounded-xl border border-neutral-700 ring-1 ring-neutral-600 shadow-2xl overflow-hidden">
        {!loaded && (
          <div className="flex items-center justify-center h-64">
            <div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        {modal.type === 'image' ? (
          <img
            src={modal.src}
            alt={modal.title}
            onLoad={() => setLoaded(true)}
            className={`w-full h-auto rounded-xl transition-opacity duration-500 ${loaded ? 'block opacity-100' : 'hidden'}`}
          />
        ) : (
          <video
            src={modal.src}
            controls
            onCanPlay={() => setLoaded(true)}
            className={`w-full h-auto rounded-xl transition-opacity duration-500 ${loaded ? 'block opacity-100' : 'hidden'}`}
          />
        )}
      </div>
    </div>
  );
}
