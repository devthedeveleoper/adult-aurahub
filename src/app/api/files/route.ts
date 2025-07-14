import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const login = process.env.STREAMTAPE_LOGIN;
  const key = process.env.STREAMTAPE_KEY;

  const { searchParams } = new URL(req.url);
  const folder = searchParams.get('folder') || 'Ti1XN9WKft0'; // optional

  if (!login || !key) {
    return NextResponse.json({ error: 'Missing credentials' }, { status: 500 });
  }

  const apiUrl = `https://api.streamtape.com/file/listfolder?login=${login}&key=${key}&folder=${folder}`;

  try {
  const res = await fetch(apiUrl);
  const data = await res.json();
  return NextResponse.json(data);
} catch {
  return NextResponse.json({ error: 'Failed to fetch files' }, { status: 500 });
}

}
