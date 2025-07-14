import { NextRequest, NextResponse } from 'next/server';
import { callStreamtape } from '@/lib/streamtape';

export async function GET(req: NextRequest) {
  const file = req.nextUrl.searchParams.get('file');
  if (!file) {
    return NextResponse.json({ error: 'Missing file ID' }, { status: 400 });
  }

  try {
    const data = await callStreamtape('/file/getsplash', { file });

    const response = NextResponse.json(data);
    response.headers.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=60');
    return response;
  } catch (error: unknown) {
  if (error instanceof Error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
}
}
