import fs from 'node:fs';
import path from 'node:path';

const apiKey = process.env.LASTFM_API_KEY;
if (!apiKey) {
  throw new Error('LASTFM_API_KEY is required. Set it in the environment or in GitHub Actions secrets.');
}

const endpoint = new URL('https://ws.audioscrobbler.com/2.0/');
endpoint.searchParams.set('method', 'user.gettopalbums');
endpoint.searchParams.set('user', 'grejprrik');
endpoint.searchParams.set('api_key', apiKey);
endpoint.searchParams.set('period', '7day');
endpoint.searchParams.set('limit', '4');
endpoint.searchParams.set('format', 'json');

const response = await fetch(endpoint);
if (!response.ok) {
  const text = await response.text();
  throw new Error(`Last.fm API request failed: ${response.status} ${text}`);
}

const data = await response.json();
const outDir = path.join(process.cwd(), 'lastfm');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'albums.json'), `${JSON.stringify(data, null, 2)}\n`);

const albumCount = Array.isArray(data?.topalbums?.album) ? data.topalbums.album.length : 0;
console.log(`Saved ${albumCount} albums to lastfm/albums.json`);
