'use client';

import { useState, useCallback } from 'react';
import { VideoInfo, DownloadState, DownloadRequest } from '@/types';
import { getVideoInfo, downloadMedia, triggerDownload } from '@/lib/api';
import { isValidYouTubeUrl, sanitizeFilename } from '@/lib/utils';

export function useDownload() {
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [downloadState, setDownloadState] = useState<DownloadState>({ status: 'idle' });
  const [error, setError] = useState<string | null>(null);

  const analyzeUrl = useCallback(async (url: string) => {
    setError(null);
    
    if (!isValidYouTubeUrl(url)) {
      setError('Please enter a valid YouTube URL');
      return;
    }

    setDownloadState({ status: 'analyzing', message: 'Fetching video information...' });

    try {
      const info = await getVideoInfo(url);
      setVideoInfo(info);
      setDownloadState({ status: 'ready', message: 'Select a format to download' });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to analyze video';
      setError(message);
      setDownloadState({ status: 'error', message });
    }
  }, []);

  const downloadVideo = useCallback(async (formatId: string) => {
    if (!videoInfo) return;

    setDownloadState({ status: 'downloading', message: 'Downloading video...' });

    try {
      const request: DownloadRequest = {
        url: videoInfo.id,
        formatId,
        outputType: 'video',
        title: videoInfo.title,
      };

      const blob = await downloadMedia(request);
      const filename = `${sanitizeFilename(videoInfo.title)}.mp4`;
      triggerDownload(blob, filename);
      setDownloadState({ status: 'complete', message: 'Download complete!' });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Download failed';
      setError(message);
      setDownloadState({ status: 'error', message });
    }
  }, [videoInfo]);

  const downloadAudio = useCallback(async (bitrate: number) => {
    if (!videoInfo) return;

    setDownloadState({ status: 'converting', message: 'Converting to MP3...' });

    try {
      const request: DownloadRequest = {
        url: videoInfo.id,
        bitrate,
        outputType: 'mp3',
        title: videoInfo.title,
      };

      const blob = await downloadMedia(request);
      const filename = `${sanitizeFilename(videoInfo.title)}.mp3`;
      triggerDownload(blob, filename);
      setDownloadState({ status: 'complete', message: 'Download complete!' });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Conversion failed';
      setError(message);
      setDownloadState({ status: 'error', message });
    }
  }, [videoInfo]);

  const reset = useCallback(() => {
    setVideoInfo(null);
    setDownloadState({ status: 'idle' });
    setError(null);
  }, []);

  return {
    videoInfo,
    downloadState,
    error,
    analyzeUrl,
    downloadVideo,
    downloadAudio,
    reset,
  };
}
