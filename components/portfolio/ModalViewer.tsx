'use client';
import { X } from 'lucide-react';

type Props = {
  modal: { type: 'image' | 'video'; src: string };
  onClose: () => void;
};

export default function ModalViewer({ modal, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 animate-fadeIn" role="dialog" aria-modal="true">
      <button
        className="absolute top-6 right-6 text-white z-50"
        onClick={onClose}
        aria-label="Fermer"
      >
        <X size={32} />
      </button>
      <div className="max-w-5xl w-full relative bg-neutral-900 rounded-xl border border-neutral-700 ring-1 ring-neutral-600 shadow-2xl">
        {modal.type === 'image' ? (
          <img src={modal.src} className="w-full h-auto rounded-xl" />
        ) : (
          <video src={modal.src} controls className="w-full h-auto rounded-xl" />
        )}
      </div>

    </div>
  );
}
