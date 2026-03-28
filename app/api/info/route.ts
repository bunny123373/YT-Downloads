import { NextRequest, NextResponse } from 'next/server';
import { spawn } from 'child_process';
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
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to fetch video information' },
      { status: 500 }
    );
  }
}

async function getVideoMetadata(url: string): Promise<VideoInfo> {
  return new Promise((resolve, reject) => {
    const args = [
      url,
      '--dump-json',
      '--no-download',
      '--no-playlist',
      '--quiet',
    ];

    const ytDlp = spawn('yt-dlp', args);
    let data = '';
    let errorData = '';

    ytDlp.stdout.on('data', (chunk) => {
      data += chunk.toString();
    });

    ytDlp.stderr.on('data', (chunk) => {
      errorData += chunk.toString();
    });

    ytDlp.on('close', (code) => {
      if (code !== 0 && !data) {
        reject(new Error(errorData || 'Failed to fetch video metadata'));
        return;
      }

      try {
        const json = JSON.parse(data);
        
        const formats: FormatItem[] = [];
        const audioFormats: AudioFormat[] = [];

        if (json.formats) {
          json.formats.forEach((format: Record<string, unknown>) => {
            if (format.vcodec && format.vcodec !== 'none') {
              formats.push({
                format_id: format.format_id as string,
                ext: format.ext as string,
                resolution: format.resolution as string || 'Unknown',
                filesize: format.filesize as number | null,
                format_note: format.format_note as string || '',
                vcodec: format.vcodec as string,
                acodec: format.acodec as string | undefined,
              });
            }

            if (format.acodec && format.acodec !== 'none' && format.abr) {
              audioFormats.push({
                format_id: format.format_id as string,
                ext: format.ext as string,
                bitrate: format.abr as number,
                format_note: format.format_note as string || '',
              });
            }
          });
        }

        const filteredFormats = formats
          .filter(f => f.resolution.includes('x'))
          .sort((a, b) => {
            const resA = parseInt(a.resolution.split('x')[0]) || 0;
            const resB = parseInt(b.resolution.split('x')[0]) || 0;
            return resB - resA;
          })
          .slice(0, 10);

        const sortedAudio = [...new Map(audioFormats.map(a => [a.bitrate, a])).values()]
          .sort((a, b) => b.bitrate - a.bitrate);

        const videoInfo: VideoInfo = {
          id: json.id,
          title: json.title,
          thumbnail: json.thumbnail || `https://img.youtube.com/vi/${json.id}/maxresdefault.jpg`,
          duration: json.duration || 0,
          formats: filteredFormats,
          audioFormats: sortedAudio,
          description: json.description,
          uploader: json.uploader || json.channel,
          upload_date: json.upload_date,
          view_count: json.view_count,
          like_count: json.like_count,
        };

        resolve(videoInfo);
      } catch (err) {
        reject(new Error('Failed to parse video metadata'));
      }
    });

    ytDlp.on('error', (err) => {
      reject(new Error(`yt-dlp not found: ${err.message}`));
    });
  });
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
