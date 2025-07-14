const LOGIN = process.env.STREAMTAPE_LOGIN!;
const KEY = process.env.STREAMTAPE_KEY!;

if (!LOGIN || !KEY) {
  throw new Error('Streamtape API credentials are missing in .env.local');
}

export async function callStreamtape<T = unknown>(
  endpoint: string,
  params: Record<string, string>
): Promise<T> {
  const url = new URL(`https://api.streamtape.com${endpoint}`);
  url.searchParams.set('login', process.env.STREAMTAPE_LOGIN!);
  url.searchParams.set('key', process.env.STREAMTAPE_KEY!);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error('Failed to fetch from Streamtape');

  return res.json() as Promise<T>;
}
