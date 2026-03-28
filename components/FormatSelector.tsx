'use client';

import { FaVideo, FaDownload, FaFilm } from 'react-icons/fa';
import { VideoInfo, FormatItem } from '@/types';
import { formatFileSize } from '@/lib/utils';

interface FormatSelectorProps {
  video: VideoInfo;
  onSelectFormat: (formatId: string) => void;
  isLoading: boolean;
}

export default function FormatSelector({ video, onSelectFormat, isLoading }: FormatSelectorProps) {
  const videoFormats = video.formats || [];
  
  const getResolutionPriority = (resolution: string) => {
    const height = parseInt(resolution.split('x')[0]) || 0;
    if (height >= 1080) return 4;
    if (height >= 720) return 3;
    if (height >= 480) return 2;
    if (height >= 360) return 1;
    return 0;
  };

  const filteredFormats = videoFormats
    .filter(f => f.resolution && f.vcodec !== 'none')
    .sort((a, b) => getResolutionPriority(b.resolution) - getResolutionPriority(a.resolution))
    .slice(0, 6);

  const getResolutionLabel = (resolution: string) => {
    const height = parseInt(resolution.split('x')[0]) || 0;
    if (height >= 1080) return 'Full HD';
    if (height >= 720) return 'HD';
    if (height >= 480) return 'SD';
    if (height >= 360) return 'Low';
    return 'Low';
  };

  return (
    <div className="mt-8">
      <div className="flex items-center gap-3 mb-4">
        <FaFilm className="text-purple-400" />
        <h3 className="text-lg font-semibold text-white">Video Formats</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredFormats.map((format, index) => (
          <button
            key={format.format_id}
            onClick={() => onSelectFormat(format.format_id)}
            disabled={isLoading}
            className="group relative p-4 bg-dark-800/50 hover:bg-dark-700/50 border border-white/5 hover:border-purple-500/30 rounded-xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                  <FaVideo className="text-purple-400" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-white">
                    {getResolutionLabel(format.resolution)}
                  </p>
                  <p className="text-xs text-gray-500">{format.resolution}</p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-xs text-gray-400">
                  {formatFileSize(format.filesize)}
                </p>
                <p className="text-xs text-gray-500">{format.ext}</p>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-center gap-2 text-sm text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">
              <FaDownload />
              <span>Download</span>
            </div>
          </button>
        ))}

        {filteredFormats.length === 0 && (
          <p className="col-span-full text-center text-gray-500 py-8">
            No video formats available
          </p>
        )}
      </div>
    </div>
  );
}
