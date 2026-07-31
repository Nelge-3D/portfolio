'use client';

type Props = {
  label: string;
  value: 'all' | 'image' | 'video';
  isActive: boolean;
  onClick: () => void;
};

export default function FilterButton({ label, isActive, onClick }: Props) {
  return (
    <button
      aria-label={`Filtrer par ${label}`}
      onClick={onClick}
      className={`font-body text-xs px-6 py-2.5 rounded-full border transition-all duration-300 tracking-wide ${
        isActive
          ? 'bg-amber-500 border-amber-400 text-black font-semibold shadow-lg shadow-amber-500/30'
          : 'bg-amber-950/20 border-amber-400/15 text-zinc-400 hover:border-amber-400/40 hover:text-white'
      }`}
    >
      {label}
    </button>
  );
}
