'use client';

import Image from 'next/image';
import { FaClock, FaUser, FaPlay } from 'react-icons/fa';
import { VideoInfo } from '@/types';
import { formatDuration } from '@/lib/utils';

interface ResultCardProps {
  video: VideoInfo;
}

export default function ResultCard({ video }: ResultCardProps) {
  return (
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity" />
      <div className="relative bg-dark-900/80 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
        <div className="flex flex-col md:flex-row gap-6 p-6">
          <div className="relative flex-shrink-0">
            <div className="relative w-full md:w-80 aspect-video rounded-xl overflow-hidden">
              <Image
                src={video.thumbnail}
                alt={video.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 320px"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                  <FaPlay className="text-white text-xl ml-1" />
                </div>
              </div>
              <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 rounded text-xs text-white font-medium">
                {formatDuration(video.duration)}
              </div>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-semibold text-white mb-3 line-clamp-2">
              {video.title}
            </h3>

            <div className="flex flex-wrap gap-4 text-sm text-gray-400">
              {video.uploader && (
                <div className="flex items-center gap-2">
                  <FaUser className="text-gray-500" />
                  <span className="truncate">{video.uploader}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <FaClock className="text-gray-500" />
                <span>{formatDuration(video.duration)}</span>
              </div>
            </div>

            {video.description && (
              <p className="mt-3 text-sm text-gray-500 line-clamp-2">
                {video.description}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
