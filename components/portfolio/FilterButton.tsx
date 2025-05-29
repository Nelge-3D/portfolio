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
      className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${
        isActive
          ? 'bg-amber-400 text-white border-amber-400 shadow-md'
          : ' text-white hover:bg-amber-400 border-gray-300'
      }`}
    >
      {label}
    </button>
  );
}
