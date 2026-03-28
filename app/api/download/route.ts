import { NextRequest, NextResponse } from 'next/server';
import { spawn } from 'child_process';
import { Readable } from 'stream';
import { ApiResponse, DownloadRequest } from '@/types';
import { extractVideoId, sanitizeFilename } from '@/lib/utils';

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: DownloadRequest = await request.json();
    const { url, formatId, bitrate, outputType, title } = body;

    if (!url) {
      return NextResponse.json(
        { success: false, error: 'URL is required' },
        { status: 400 }
      );
    }

    const videoId = extractVideoId(url) || url;
    const fullUrl = url.startsWith('http') ? url : `https://www.youtube.com/watch?v=${videoId}`;
    const safeTitle = sanitizeFilename(title || `video-${videoId}`);

    let outputStream: Readable;

    if (outputType === 'mp3') {
      outputStream = await downloadAsMp3(fullUrl, bitrate || 320);
    } else {
      outputStream = await downloadVideo(fullUrl, formatId || 'best');
    }

    const contentType = outputType === 'mp3' ? 'audio/mpeg' : 'video/mp4';
    const filename = outputType === 'mp3' ? `${safeTitle}.mp3` : `${safeTitle}.mp4`;

    const response = new NextResponse(outputStream as unknown as BodyInit, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Expose-Headers': 'Content-Disposition',
      },
    });

    return response;
  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Download failed' },
      { status: 500 }
    );
  }
}

async function downloadVideo(url: string, formatId: string): Promise<Readable> {
  return new Promise((resolve, reject) => {
    const args = [
      url,
      '-f', formatId,
      '-o', '-',
      '--no-playlist',
      '--quiet',
      '--no-warnings',
    ];

    const ytDlp = spawn('yt-dlp', args);
    let errorData = '';

    ytDlp.stderr.on('data', (chunk) => {
      errorData += chunk.toString();
    });

    ytDlp.on('close', (code) => {
      if (code !== 0 && errorData) {
        console.error('yt-dlp error:', errorData);
        reject(new Error(errorData || 'Download failed'));
      }
    });

    ytDlp.on('error', (err) => {
      reject(new Error(`yt-dlp not found: ${err.message}`));
    });

    resolve(ytDlp.stdout as unknown as Readable);
  });
}

async function downloadAsMp3(url: string, bitrate: number): Promise<Readable> {
  return new Promise((resolve, reject) => {
    const args = [
      url,
      '-x',
      '--audio-format', 'mp3',
      '--audio-quality', `${bitrate}k`,
      '-o', '-',
      '--no-playlist',
      '--quiet',
      '--no-warnings',
    ];

    const ytDlp = spawn('yt-dlp', args);
    let errorData = '';

    ytDlp.stderr.on('data', (chunk) => {
      errorData += chunk.toString();
    });

    ytDlp.on('close', (code) => {
      if (code !== 0 && errorData) {
        console.error('yt-dlp error:', errorData);
        reject(new Error(errorData || 'MP3 conversion failed'));
      }
    });

    ytDlp.on('error', (err) => {
      reject(new Error(`yt-dlp not found: ${err.message}`));
    });

    resolve(ytDlp.stdout as unknown as Readable);
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
