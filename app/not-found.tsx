'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#07000f] text-white flex flex-col items-center justify-center px-6 text-center overflow-hidden relative">

      {/* Ambient blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-violet-700/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-amber-500/6 rounded-full blur-[80px] animate-pulse delay-1000" />
      </div>

      {/* Code symbols — subtle */}
      <div className="pointer-events-none absolute inset-0 select-none overflow-hidden" aria-hidden="true">
        {[
          { t: '404',  top: '8%',  left: '5%',  s: '5rem',  r: -10 },
          { t: '</>',  top: '12%', left: '78%', s: '3.5rem', r: 8   },
          { t: '{}',   top: '72%', left: '8%',  s: '4rem',   r: -8  },
          { t: '?.',   top: '75%', left: '80%', s: '4.5rem', r: 12  },
          { t: '[]',   top: '40%', left: '88%', s: '3rem',   r: -14 },
          { t: '=>',   top: '55%', left: '3%',  s: '3rem',   r: 6   },
        ].map((s, i) => (
          <span
            key={i}
            className="absolute font-mono text-violet-400/[0.07] font-light"
            style={{ top: s.top, left: s.left, fontSize: s.s, transform: `rotate(${s.r}deg)` }}
          >
            {s.t}
          </span>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-8 max-w-lg">

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative"
        >
          <div className="absolute inset-0 -z-10 scale-150 blur-2xl opacity-30 bg-gradient-to-br from-violet-500 to-amber-400 rounded-full" />
          <Image
            src="/logo-white.png"
            alt="Nelge 3D"
            width={130}
            height={52}
            priority
            className="object-contain drop-shadow-2xl"
          />
        </motion.div>

        {/* 404 number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <p
            className="font-display font-light italic bg-gradient-to-br from-violet-300 via-fuchsia-300 to-amber-300 bg-clip-text text-transparent"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(6rem, 20vw, 11rem)', lineHeight: 1 }}
          >
            404
          </p>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex items-center gap-4 w-full justify-center"
        >
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-violet-400/40" />
          <div className="w-1 h-1 rounded-full bg-amber-400/60" />
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-violet-400/40" />
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-3"
        >
          <h1
            className="font-display font-light italic text-3xl md:text-4xl text-white"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Page introuvable
          </h1>
          <p className="font-body text-sm text-violet-300/50 leading-relaxed max-w-sm mx-auto">
            La page que tu cherches n&apos;existe pas ou a été déplacée. Retourne à l&apos;accueil pour continuer.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
        >
          <Link
            href="/"
            className="font-body group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-violet-600 to-violet-500 text-white text-sm font-medium shadow-xl shadow-violet-600/25 hover:shadow-violet-500/40 hover:-translate-y-0.5 hover:scale-105 transition-all duration-300 overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
            <ArrowLeft className="relative w-4 h-4" />
            <span className="relative">Retour à l&apos;accueil</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
