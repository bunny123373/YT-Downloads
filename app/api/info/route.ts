import { NextRequest, NextResponse } from 'next/server';
import ytdl from 'ytdl-core';
import { ApiResponse, VideoInfo, FormatItem, AudioFormat } from '@/types';
import { extractVideoId } from '@/lib/utils';

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse<VideoInfo>>> {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json(
        { success: false, error: 'URL is required' },
        { status: 400 }
      );
    }

    const videoId = extractVideoId(url);
    if (!videoId) {
      return NextResponse.json(
        { success: false, error: 'Invalid YouTube URL' },
        { status: 400 }
      );
    }

    const fullUrl = url.startsWith('http') ? url : `https://www.youtube.com/watch?v=${videoId}`;
    const metadata = await getVideoMetadata(fullUrl);

    return NextResponse.json({
      success: true,
      data: metadata,
    });
  } catch (error) {
    console.error('Error fetching video info:', error);
    let errorMessage = 'Failed to fetch video information';
    
    if (error instanceof Error) {
      if (error.message.includes('Video unavailable')) {
        errorMessage = 'This video is unavailable or has been removed';
      } else if (error.message.includes('429')) {
        errorMessage = 'Too many requests. Please try again later';
      } else if (error.message.includes('403')) {
        errorMessage = 'Access denied. This video may be private or age-restricted';
      } else {
        errorMessage = error.message;
      }
    }
    
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

async function getVideoMetadata(url: string): Promise<VideoInfo> {
  const info = await ytdl.getInfo(url, {
    requestOptions: {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    },
  });
  
  const formats: FormatItem[] = [];
  const audioFormats: AudioFormat[] = [];

  const videoFormats = info.formats.filter(f => f.hasVideo && f.hasAudio === false);
  videoFormats.forEach((format) => {
    if (format.qualityLabel) {
      const resolution = format.qualityLabel.replace('p', '').trim();
      formats.push({
        format_id: format.itag?.toString() || '',
        ext: format.container,
        resolution: `${resolution}x${format.qualityLabel.split('p')[0]}`,
        filesize: format.contentLength ? parseInt(format.contentLength) : null,
        format_note: format.qualityLabel || format.quality || '',
        vcodec: format.codecs?.split(',')[0] || 'unknown',
        acodec: undefined,
      });
    }
  });

  const audioOnlyFormats = info.formats.filter(f => f.hasAudio && !f.hasVideo);
  audioOnlyFormats.forEach((format) => {
    if (format.audioBitrate) {
      audioFormats.push({
        format_id: format.itag?.toString() || '',
        ext: format.container,
        bitrate: format.audioBitrate,
        format_note: format.audioQuality || '',
      });
    }
  });

  const filteredFormats = formats
    .filter(f => f.resolution.includes('x'))
    .sort((a, b) => {
      const resA = parseInt(a.resolution.split('x')[0]) || 0;
      const resB = parseInt(b.resolution.split('x')[0]) || 0;
      return resB - resA;
    })
    .slice(0, 10);

  const sortedAudio = Array.from(new Map(audioFormats.map(a => [a.bitrate, a])).values())
    .sort((a, b) => b.bitrate - a.bitrate);

  const videoInfo: VideoInfo = {
    id: info.videoDetails.videoId,
    title: info.videoDetails.title,
    thumbnail: info.videoDetails.thumbnails?.[0]?.url ?? `https://img.youtube.com/vi/${info.videoDetails.videoId}/maxresdefault.jpg`,
    duration: parseInt(info.videoDetails.lengthSeconds || '0'),
    formats: filteredFormats,
    audioFormats: sortedAudio,
    description: info.videoDetails.description ?? undefined,
    uploader: info.videoDetails.ownerChannelName,
    view_count: parseInt(info.videoDetails.viewCount || '0'),
  };

  return videoInfo;
}

export async function OPTIONS(): Promise<NextResponse> {
  return NextResponse.json({}, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
