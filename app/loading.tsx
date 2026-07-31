'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function Loading() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#07000f] overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* Ambient blobs */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-violet-700/15 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute bottom-1/3 right-1/3 w-72 h-72 bg-amber-500/8 rounded-full blur-[80px] animate-pulse delay-700" />
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center gap-10">

            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative"
            >
              {/* Glow behind logo */}
              <div className="absolute inset-0 -z-10 scale-150 blur-2xl opacity-40 bg-gradient-to-br from-violet-500 to-amber-400 rounded-full" />
              <Image
                src="/logo-white.png"
                alt="Nelge 3D"
                width={160}
                height={64}
                priority
                className="object-contain drop-shadow-2xl"
              />
            </motion.div>

            {/* Animated loader bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="flex flex-col items-center gap-4"
            >
              {/* Track */}
              <div className="w-48 h-px bg-violet-400/15 rounded-full overflow-hidden relative">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-violet-500 via-fuchsia-400 to-amber-400 rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1.4, ease: 'easeInOut', delay: 0.3 }}
                />
              </div>

              {/* Label */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0.6, 1] }}
                transition={{ duration: 1.6, delay: 0.3 }}
                className="font-body text-[10px] tracking-[0.35em] uppercase text-zinc-500"
              >
                Chargement
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
