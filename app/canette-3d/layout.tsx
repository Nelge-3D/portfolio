import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Canette Regab 3D',
  description: "Visualisez la canette Regab en 3D interactive — tournez, zoomez, changez l'environnement HDRI.",
};

export default function Canette3DLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
