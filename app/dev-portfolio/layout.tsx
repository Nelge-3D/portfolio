import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio Développeur',
  description: 'Projets web de Nelge : Next.js, React, TypeScript, Tailwind CSS, Vercel.',
};

export default function DevPortfolioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
