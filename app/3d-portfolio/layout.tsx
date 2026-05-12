import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio 3D',
  description: 'Créations 3D de Nelge : modélisation, rendu et animation réalisés sous Blender.',
};

export default function Portfolio3DLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
