import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const file = req.nextUrl.searchParams.get('file');

  if (!file) {
    return NextResponse.json({ error: 'File ID is required' }, { status: 400 });
  }

  try {
    const login = process.env.STREAMTAPE_LOGIN;
    const key = process.env.STREAMTAPE_KEY;

    const apiUrl = `https://api.streamtape.com/file/getsplash?login=${login}&key=${key}&file=${file}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    const url = data?.result;

    return NextResponse.json({ result: url });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch thumbnail' }, { status: 500 });
  }
}
