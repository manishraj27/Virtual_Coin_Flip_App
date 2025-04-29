import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface SoundToggleProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}

const SoundToggle: React.FC<SoundToggleProps> = ({ enabled, onChange }) => {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
      aria-label={enabled ? "Mute sound" : "Enable sound"}
    >
      {enabled ? (
        <>
          <Volume2 className="h-5 w-5" />
          <span className="text-sm">Sound On</span>
        </>
      ) : (
        <>
          <VolumeX className="h-5 w-5" />
          <span className="text-sm">Sound Off</span>
        </>
      )}
    </button>
  );
};

export default SoundToggle;