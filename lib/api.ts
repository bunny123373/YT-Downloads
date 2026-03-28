import axios from 'axios';
import { VideoInfo, DownloadRequest, ApiResponse, HealthCheck } from '@/types';

const API_BASE = '/api';

export async function getVideoInfo(url: string): Promise<VideoInfo> {
  const response = await axios.post<ApiResponse<VideoInfo>>(`${API_BASE}/info`, { url });
  if (!response.data.success) {
    throw new Error(response.data.error || 'Failed to get video info');
  }
  return response.data.data!;
}

export async function downloadMedia(request: DownloadRequest): Promise<Blob> {
  const response = await axios.post<Blob>(`${API_BASE}/download`, request, {
    responseType: 'blob',
    timeout: 600000,
  });
  return response.data;
}

export async function checkHealth(): Promise<HealthCheck> {
  const response = await axios.get<ApiResponse<HealthCheck>>(`${API_BASE}/health`);
  return response.data.data!;
}

export function triggerDownload(blob: Blob, filename: string): void {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}
