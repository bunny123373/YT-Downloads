import { NextResponse } from 'next/server';
import { HealthCheck, ApiResponse } from '@/types';

const startTime = Date.now();

export async function GET(): Promise<NextResponse<ApiResponse<HealthCheck>>> {
  const health: HealthCheck = {
    status: 'ok',
    timestamp: Date.now(),
    uptime: Math.floor((Date.now() - startTime) / 1000),
    version: '1.0.0',
  };

  return NextResponse.json({
    success: true,
    data: health,
  });
}

export async function OPTIONS(): Promise<NextResponse> {
  return NextResponse.json({}, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
