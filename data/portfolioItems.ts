export type PortfolioItem = {
  type: 'image' | 'video';
  src: string;
  title: string;
};

export const portfolioItems: PortfolioItem[] = [
  { type: 'image', src: '/renders/modele1.png', title: 'Modèle 3D 1' },
  { type: 'video', src: '/renders/video4.mp4', title: 'Animation 3D 4' },
  { type: 'video', src: '/renders/video1.mp4', title: 'Animation 3D 1' },
  { type: 'image', src: '/renders/modele3.png', title: 'Modèle 3D 3' },
  { type: 'image', src: '/renders/modele2.png', title: 'Modèle 3D 2' },
  { type: 'video', src: '/renders/video2.mp4', title: 'Animation 3D 2' },
  { type: 'video', src: '/renders/video3.mp4', title: 'Animation 3D 3' },
  { type: 'image', src: '/renders/modele5.png', title: 'Modèle 3D 5' },
  { type: 'image', src: '/renders/modele_4.png', title: 'Modèle 3D 4' },
];
