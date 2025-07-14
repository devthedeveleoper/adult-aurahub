const BASE_URL = 'https://api.streamtape.com';

const LOGIN = process.env.STREAMTAPE_LOGIN!;
const KEY = process.env.STREAMTAPE_KEY!;

if (!LOGIN || !KEY) {
  throw new Error('Streamtape API credentials are missing in .env.local');
}

export async function callStreamtape<T = any>(endpoint: string, params: Record<string, string>) {
  const query = new URLSearchParams({ login: LOGIN, key: KEY, ...params });
  const res = await fetch(`${BASE_URL}${endpoint}?${query.toString()}`);
  if (!res.ok) throw new Error(`Streamtape API error: ${res.status}`);
  return res.json() as Promise<T>;
}
