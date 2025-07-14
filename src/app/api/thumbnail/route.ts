import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const login = process.env.STREAMTAPE_LOGIN;
  const key = process.env.STREAMTAPE_KEY;

  const { searchParams } = new URL(req.url);
  const file = searchParams.get('file');

  if (!login || !key || !file) {
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
  }

  const apiUrl = `https://api.streamtape.com/file/getsplash?login=${login}&key=${key}&file=${file}`;

  try {
  const res = await fetch(apiUrl);
  const data = await res.json();
  return NextResponse.json(data);
} catch {
  return NextResponse.json({ error: 'Failed to fetch thumbnail' }, { status: 500 });
}

}
