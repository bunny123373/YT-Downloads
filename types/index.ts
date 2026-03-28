export interface FormatItem {
  format_id: string;
  ext: string;
  resolution: string;
  filesize: number | null;
  format_note: string;
  vcodec?: string;
  acodec?: string;
}

export interface AudioFormat {
  format_id: string;
  ext: string;
  bitrate: number;
  format_note: string;
}

export interface VideoInfo {
  id: string;
  title: string;
  thumbnail: string;
  duration: number;
  formats: FormatItem[];
  audioFormats: AudioFormat[];
  description?: string;
  uploader?: string;
  upload_date?: string;
  view_count?: number;
  like_count?: number;
}

export interface DownloadRequest {
  url: string;
  formatId?: string;
  bitrate?: number;
  outputType: 'video' | 'mp3';
  title?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface HealthCheck {
  status: 'ok' | 'error';
  timestamp: number;
  uptime: number;
  version: string;
}

export interface RecentLink {
  id: string;
  url: string;
  title: string;
  thumbnail: string;
  timestamp: number;
}

export type DownloadStatus = 'idle' | 'analyzing' | 'ready' | 'downloading' | 'converting' | 'complete' | 'error';

export interface DownloadState {
  status: DownloadStatus;
  progress?: number;
  message?: string;
  fileName?: string;
}
