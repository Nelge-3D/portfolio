'use client';

import React, { useRef, useState } from 'react';
import { Play, Image as ImageIcon } from 'lucide-react';
import { PortfolioItem } from '@/data/portfolioItems';

type Props = {
  items: PortfolioItem[];
  onSelect: (item: PortfolioItem) => void;
};

function AccordionItem({
  item,
  isActive,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: {
  item: PortfolioItem;
  isActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleEnter = () => {
    onMouseEnter();
    if (item.type === 'video' && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleLeave = () => {
    onMouseLeave();
    if (item.type === 'video' && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      role="button"
      aria-label={`Ouvrir ${item.title}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-2xl cursor-pointer
        transition-all duration-500 ease-in-out
        border border-amber-400/10 hover:border-amber-400/35
        ${isActive ? 'flex-[5]' : 'flex-1'}
      `}
    >
      {/* Media */}
      {item.type === 'image' ? (
        <img
          src={item.src}
          alt={item.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 scale-105 hover:scale-110"
        />
      ) : (
        <video
          ref={videoRef}
          src={item.src}
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Base dark overlay — always visible */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Hover overlay — gold shimmer */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-amber-950/60 via-transparent to-transparent transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* Top-left type badge */}
      <div
        className={`absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full backdrop-blur-md border text-[10px] font-body font-semibold uppercase tracking-widest transition-all duration-400 ${
          isActive ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
        } ${
          item.type === 'video'
            ? 'bg-violet-950/70 border-violet-400/30 text-violet-300'
            : 'bg-amber-950/70 border-amber-400/30 text-amber-300'
        }`}
      >
        {item.type === 'video' ? (
          <Play className="w-2.5 h-2.5 fill-current" />
        ) : (
          <ImageIcon className="w-2.5 h-2.5" />
        )}
        {item.type === 'video' ? 'Vidéo' : 'Image'}
      </div>

      {/* Video play icon when collapsed */}
      {item.type === 'video' && !isActive && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-black/50 border border-white/20 flex items-center justify-center backdrop-blur-sm">
            <Play className="w-4 h-4 text-white/80 fill-current translate-x-0.5" />
          </div>
        </div>
      )}

      {/* Bottom title */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p
          className={`font-display font-light italic text-white transition-all duration-400 ${
            isActive ? 'opacity-100 translate-y-0 text-lg' : 'opacity-60 translate-y-1 text-sm'
          }`}
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {item.title}
        </p>
        {isActive && (
          <p className="font-body text-[10px] text-zinc-500 tracking-widest uppercase mt-1 animate-fadeIn">
            Cliquer pour agrandir
          </p>
        )}
      </div>

      {/* Gold border glow on active */}
      {isActive && (
        <div className="absolute inset-0 rounded-2xl ring-1 ring-amber-400/30 pointer-events-none" />
      )}
    </div>
  );
}

export default function GalleryAccordion({ items, onSelect }: Props) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  if (items.length === 0) {
    return (
      <div className="text-center py-20 text-zinc-500 font-body text-sm">
        Aucun élément dans cette catégorie.
      </div>
    );
  }

  return (
    <>
      {/* ── Desktop accordion ── */}
      <div className="hidden md:flex items-stretch gap-2 h-[480px] w-full">
        {items.map((item, idx) => (
          <AccordionItem
            key={item.src}
            item={item}
            isActive={activeIdx === idx}
            onMouseEnter={() => setActiveIdx(idx)}
            onMouseLeave={() => setActiveIdx(null)}
            onClick={() => onSelect(item)}
          />
        ))}
      </div>

      {/* ── Mobile grid ── */}
      <div className="grid grid-cols-2 gap-3 md:hidden">
        {items.map((item) => (
          <div
            key={item.src}
            role="button"
            aria-label={`Ouvrir ${item.title}`}
            onClick={() => onSelect(item)}
            className="relative overflow-hidden rounded-xl aspect-[4/3] cursor-pointer border border-amber-400/10 hover:border-amber-400/30 transition-all duration-300 group"
          >
            {item.type === 'image' ? (
              <img
                src={item.src}
                alt={item.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <video
                src={item.src}
                muted
                loop
                playsInline
                autoPlay
                preload="none"
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <p
              className="absolute bottom-2 left-3 right-3 font-display font-light italic text-white text-sm truncate"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {item.title}
            </p>
            {item.type === 'video' && (
              <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 flex items-center justify-center">
                <Play className="w-3 h-3 text-white fill-current translate-x-px" />
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
