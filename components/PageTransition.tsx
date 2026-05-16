'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface Props {
  duration?: number;
  theme?: 'purple' | 'gold';
  label?: string;
}

export default function PageTransition({
  duration = 2500,
  theme = 'purple',
  label = 'Chargement',
}: Props) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(t);
  }, [duration]);

  const isPurple = theme === 'purple';

  const bg        = isPurple ? '#07000f' : '#0c0800';
  const blob1     = isPurple ? 'bg-violet-700/15' : 'bg-amber-600/12';
  const blob2     = isPurple ? 'bg-amber-500/8'   : 'bg-yellow-500/8';
  const barFrom   = isPurple ? 'from-violet-500 via-fuchsia-400 to-amber-400'
                             : 'from-amber-500 via-yellow-400 to-violet-400';
  const trackClr  = isPurple ? 'bg-violet-400/10' : 'bg-amber-400/10';
  const labelClr  = isPurple ? 'text-violet-400/60' : 'text-amber-400/60';
  const dotClr    = isPurple ? 'bg-amber-400' : 'bg-violet-400';

  /* Progress bar duration in seconds for CSS */
  const barDuration = `${(duration / 1000) * 0.88}s`;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          style={{ backgroundColor: bg }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.55, ease: 'easeInOut' }}
        >
          {/* Blobs */}
          <div className="pointer-events-none absolute inset-0">
            <div className={`absolute top-1/3 left-1/3 w-96 h-96 ${blob1} rounded-full blur-[110px] animate-pulse`} />
            <div className={`absolute bottom-1/3 right-1/3 w-72 h-72 ${blob2} rounded-full blur-[80px] animate-pulse delay-700`} />
          </div>

          <div className="relative z-10 flex flex-col items-center gap-10">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: 14, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative"
            >
              <div
                className="absolute inset-0 -z-10 scale-[1.6] blur-3xl opacity-35 rounded-full"
                style={{
                  background: isPurple
                    ? 'radial-gradient(circle, #7c3aed 0%, #d97706 100%)'
                    : 'radial-gradient(circle, #d97706 0%, #7c3aed 100%)',
                }}
              />
              <Image
                src="/logo-white.png"
                alt="Nelge 3D"
                width={150}
                height={60}
                priority
                className="object-contain drop-shadow-2xl"
              />
            </motion.div>

            {/* Label + bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="flex flex-col items-center gap-4 w-52"
            >
              {/* Ornament */}
              <div className="flex items-center gap-3 w-full justify-center mb-1">
                <div className={`h-px flex-1 ${isPurple ? 'bg-violet-400/15' : 'bg-amber-400/15'}`} />
                <div className={`w-1 h-1 rounded-full ${dotClr} opacity-60`} />
                <div className={`h-px flex-1 ${isPurple ? 'bg-violet-400/15' : 'bg-amber-400/15'}`} />
              </div>

              {/* Progress track */}
              <div className={`w-full h-px ${trackClr} rounded-full overflow-hidden relative`}>
                <motion.div
                  className={`absolute inset-y-0 left-0 bg-gradient-to-r ${barFrom} rounded-full`}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{
                    duration: (duration / 1000) * 0.88,
                    ease: 'easeInOut',
                    delay: 0.3,
                  }}
                />
              </div>

              {/* Label */}
              <p className={`font-body text-[9px] tracking-[0.4em] uppercase ${labelClr}`}>
                {label}
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
