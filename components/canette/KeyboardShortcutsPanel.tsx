'use client';

import { motion } from 'framer-motion';

const shortcuts = [
  ['Wireframe', 'W'],
  ['Plein écran', 'F'],
  ['Reset', 'R'],
  ['Environnement', 'E'],
  ['Aide', 'H'],
] as const;

export default function KeyboardShortcutsPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -10 }}
      className="absolute top-12 md:top-16 right-2 md:right-4 bg-black/80 text-white p-3 md:p-4 rounded-lg shadow-xl backdrop-blur-sm border border-white/20 text-xs md:text-sm z-20"
    >
      <h4 className="font-semibold mb-2 text-zinc-100">Raccourcis clavier :</h4>
      <div className="space-y-1">
        {shortcuts.map(([label, key]) => (
          <div key={key} className="flex justify-between gap-4">
            <span className="text-gray-300">{label}</span>
            <kbd className="bg-white/20 px-2 py-1 rounded text-xs">{key}</kbd>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
