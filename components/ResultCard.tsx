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
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 p-4 lg:p-6">
          <div className="relative flex-shrink-0 w-full lg:w-auto">
            <div className="relative w-full lg:w-72 aspect-video rounded-xl overflow-hidden mx-auto lg:mx-0">
              <Image
                src={video.thumbnail}
                alt={video.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 288px"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                  <FaPlay className="text-white text-lg lg:text-xl ml-0.5 lg:ml-1" />
                </div>
              </div>
              <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 rounded text-xs text-white font-medium">
                {formatDuration(video.duration)}
              </div>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-lg lg:text-xl font-semibold text-white mb-3 line-clamp-2">
              {video.title}
            </h3>

            <div className="flex flex-wrap gap-3 lg:gap-4 text-sm text-gray-400">
              {video.uploader && (
                <div className="flex items-center gap-2 min-w-0">
                  <FaUser className="text-gray-500 flex-shrink-0" />
                  <span className="truncate">{video.uploader}</span>
                </div>
              )}
              <div className="flex items-center gap-2 flex-shrink-0">
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
