'use client';
import React from 'react';
import { PlayCircle } from 'lucide-react';

type Item = {
  type: 'image' | 'video';
  src: string;
  title: string;
};

type Props = {
  item: Item;
  onClick: (item: Item) => void;
};

export default function CardItem({ item, onClick }: Props) {
  return (
    <div
      data-aos="fade-up"
      role="button"
      aria-label={`Ouvrir ${item.title}`}
      className="group relative overflow-hidden rounded-3xl bg-neutral-900 border border-neutral-700 shadow-lg hover:shadow-2xl hover:ring-2 hover:ring-amber-400 transition-all duration-300 cursor-pointer"
      onClick={() => onClick(item)}
    >
      {item.type === 'image' ? (
        <img
          src={item.src}
          alt={item.title}
          loading="lazy"
          className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500 rounded-t-3xl"
        />
      ) : (
        <div className="relative h-72">
          <video
            src={item.src}
            className="w-full h-full object-cover rounded-t-3xl"
            muted
            loop
            autoPlay
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition">
            <PlayCircle className="text-white w-12 h-12" />
          </div>
        </div>
      )}

      <div className="absolute bottom-0 left-0 w-full bg-black/60 backdrop-blur-sm text-white text-sm py-2 px-3 opacity-0 group-hover:opacity-100 transition rounded-b-3xl">
        {item.title}
      </div>
    </div>
  );
}
