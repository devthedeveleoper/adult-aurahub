import { NextRequest, NextResponse } from 'next/server';
import { callStreamtape } from '@/lib/streamtape';

export async function GET(req: NextRequest) {
  const folder = req.nextUrl.searchParams.get('folder') || process.env.STREAMTAPE_ROOT_FOLDER!;

  try {
    const data = await callStreamtape('/file/listfolder', { folder });

    const response = NextResponse.json(data);
    response.headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=30');
    return response;
  } catch (error: unknown) {
  if (error instanceof Error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
}
}
