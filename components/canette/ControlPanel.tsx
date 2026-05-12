'use client';

import {
  MdOutlineGrid3X3,
  MdOutlineFullscreen,
  MdOutlineFullscreenExit,
  MdRefresh,
  Md360,
  MdKeyboard,
} from 'react-icons/md';

type Props = {
  wireframe: boolean;
  isFullscreen: boolean;
  currentEnvironmentName: string;
  showKeyboardShortcuts: boolean;
  onToggleWireframe: () => void;
  onToggleFullscreen: () => void;
  onReset: () => void;
  onChangeEnvironment: () => void;
  onToggleShortcuts: () => void;
};

export default function ControlPanel({
  wireframe,
  isFullscreen,
  currentEnvironmentName,
  showKeyboardShortcuts,
  onToggleWireframe,
  onToggleFullscreen,
  onReset,
  onChangeEnvironment,
  onToggleShortcuts,
}: Props) {
  return (
    <div className="absolute top-2 md:top-4 right-2 md:right-4 flex flex-col gap-1 md:gap-2 z-10">
      <div className="flex justify-end">
        <button
          onClick={onToggleShortcuts}
          className="flex items-center gap-1 px-2 py-1 bg-purple-500/20 text-white text-xs rounded-lg border border-purple-400 hover:bg-purple-500/30 transition backdrop-blur-sm"
          title="Afficher/masquer les raccourcis clavier"
          aria-pressed={showKeyboardShortcuts}
        >
          <MdKeyboard className="text-xs md:text-sm" />
        </button>
      </div>

      <div className="flex gap-1 md:gap-2">
        <div title="Basculer le mode wireframe (Touche W)">
          <button
            onClick={onToggleWireframe}
            className={`flex items-center gap-1 px-2 md:px-3 py-1 text-white text-xs rounded-lg border transition backdrop-blur-sm ${
              wireframe
                ? 'bg-yellow-500/30 border-yellow-400 text-yellow-100'
                : 'bg-white/10 border-white hover:bg-white/20'
            }`}
          >
            <MdOutlineGrid3X3 className={`text-xs md:text-sm ${wireframe ? 'text-yellow-300' : ''}`} />
            <span className="hidden sm:inline">{wireframe ? 'Wireframe ON' : 'Wireframe OFF'}</span>
          </button>
        </div>

        <div title={isFullscreen ? 'Quitter le plein écran (Touche F)' : 'Mode plein écran (Touche F)'}>
          <button
            onClick={onToggleFullscreen}
            className="flex items-center gap-1 px-2 md:px-3 py-1 bg-white/10 text-white text-xs rounded-lg border border-white hover:bg-white/20 transition backdrop-blur-sm"
          >
            {isFullscreen ? (
              <MdOutlineFullscreenExit className="text-xs md:text-sm" />
            ) : (
              <MdOutlineFullscreen className="text-xs md:text-sm" />
            )}
            <span className="hidden sm:inline">{isFullscreen ? 'Quitter' : 'Plein écran'}</span>
          </button>
        </div>
      </div>

      <div className="flex gap-1 md:gap-2">
        <div title="Réinitialiser la rotation (Touche R)">
          <button
            onClick={onReset}
            className="flex items-center gap-1 px-2 md:px-3 py-1 bg-blue-500/20 text-white text-xs rounded-lg border border-blue-400 hover:bg-blue-500/30 transition backdrop-blur-sm"
          >
            <MdRefresh className="text-xs md:text-sm" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>

        <div title={`Environnement : ${currentEnvironmentName} (Touche E)`}>
          <button
            onClick={onChangeEnvironment}
            className="flex items-center gap-1 px-2 md:px-3 py-1 bg-green-500/20 text-white text-xs rounded-lg border border-green-400 hover:bg-green-500/30 transition backdrop-blur-sm"
          >
            <Md360 className="text-xs md:text-sm" />
            <span className="hidden sm:inline">{currentEnvironmentName}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
