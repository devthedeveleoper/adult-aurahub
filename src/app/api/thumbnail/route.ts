import { NextRequest, NextResponse } from 'next/server';

const cache: Record<string, string> = {}; // In-memory thumbnail cache

export async function GET(req: NextRequest) {
  const file = req.nextUrl.searchParams.get('file');

  if (!file) {
    return NextResponse.json({ error: 'File ID is required' }, { status: 400 });
  }

  // Serve from cache if available
  if (cache[file]) {
    return NextResponse.json({ result: cache[file] });
  }

  try {
    const login = process.env.STREAMTAPE_LOGIN;
    const key = process.env.STREAMTAPE_KEY;

    const apiUrl = `https://api.streamtape.com/file/getsplash?login=${login}&key=${key}&file=${file}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    const url = data?.result;

    if (url) {
      cache[file] = url; // Cache the result
    }

    return NextResponse.json({ result: url });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch thumbnail' }, { status: 500 });
  }
}
