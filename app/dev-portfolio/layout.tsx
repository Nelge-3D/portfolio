import type { Metadata } from 'next';
import PageTransition from '@/components/PageTransition';

export const metadata: Metadata = {
  title: 'Portfolio Développeur',
  description: 'Projets web de Nelge : Next.js, React, TypeScript, Tailwind CSS, Vercel.',
};

export default function DevPortfolioLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageTransition duration={2500} theme="purple" label="Chargement du portfolio dev" />
      {children}
    </>
  );
}
