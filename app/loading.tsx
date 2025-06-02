// components/Loading.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Loading = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000); // 3 secondes
    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-full h-screen bg-gradient-to-br from-yellow-400 to-purple-800 flex items-center justify-center z-[9999]"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-white border-dashed rounded-full animate-spin mx-auto" />
        <p className="mt-4 text-white text-lg font-semibold">Chargement en cours...</p>
      </div>
    </motion.div>
  );
};

export default Loading;
