'use client';

import { FaMusic, FaDownload, FaHeadphones } from 'react-icons/fa';
import { VideoInfo } from '@/types';

interface AudioSelectorProps {
  video: VideoInfo;
  onSelectBitrate: (bitrate: number) => void;
  isLoading: boolean;
}

export default function AudioSelector({ video, onSelectBitrate, isLoading }: AudioSelectorProps) {
  const bitrates = [320, 192, 128];

  const getBitrateLabel = (bitrate: number) => {
    switch (bitrate) {
      case 320:
        return 'Ultra';
      case 192:
        return 'High';
      case 128:
        return 'Standard';
      default:
        return 'Standard';
    }
  };

  return (
    <div className="mt-8">
      <div className="flex items-center gap-3 mb-4">
        <FaHeadphones className="text-blue-400" />
        <h3 className="text-lg font-semibold text-white">Audio Formats (MP3)</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {bitrates.map((bitrate) => (
          <button
            key={bitrate}
            onClick={() => onSelectBitrate(bitrate)}
            disabled={isLoading}
            className="group relative p-4 bg-dark-800/50 hover:bg-dark-700/50 border border-white/5 hover:border-blue-500/30 rounded-xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative">
              <div className="flex items-center justify-center mb-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                  <FaMusic className="text-blue-400 text-xl" />
                </div>
              </div>

              <div className="text-center mb-3">
                <p className="text-2xl font-bold text-white">{bitrate}kbps</p>
                <p className="text-sm text-gray-400">{getBitrateLabel(bitrate)} Quality</p>
              </div>

              <div className="flex items-center justify-center gap-2 text-sm text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                <FaDownload />
                <span>Download MP3</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
