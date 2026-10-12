import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const file = path.join(root, 'src/data/musicbrainz-catalog.json');
const previous = JSON.parse(fs.readFileSync(file, 'utf8'));
const artistId = previous.artistId;
let lastRequest = 0;
async function request(url) {
  await new Promise(resolve => setTimeout(resolve, Math.max(0, lastRequest + 1100 - Date.now())));
  lastRequest = Date.now();
  const response = await fetch(url, { headers: { 'User-Agent': 'AlyBouchnakWebsiteCatalog/1.0 (https://alybouchnak.com)' }, signal: AbortSignal.timeout(30000) });
  if (!response.ok) throw new Error(`${response.status} while fetching ${url}`);
  return response;
}
async function browse(entity, include) {
  const result = [];
  let offset = 0;
  while (true) {
    const data = await (await request(`https://musicbrainz.org/ws/2/${entity}?artist=${artistId}&limit=100&offset=${offset}&inc=${include}&fmt=json`)).json();
    result.push(...data[`${entity}s`]);
    offset += data[`${entity}s`].length;
    if (offset >= data[`${entity}-count`]) return result;
    if (!data[`${entity}s`].length) throw new Error('Incomplete MusicBrainz pagination');
  }
}
const releases = await browse('release', 'recordings+release-groups+url-rels');
const recordings = await browse('recording', 'isrcs');
const missingArtwork = [];
const updated = [];
for (const release of releases.filter(r => r.status === 'Official')) {
  const old = previous.releases.find(r => r.groupId === release['release-group'].id);
  const cover = `/images/release-${release.id}.jpg`;
  let coverImage = old?.coverImage;
  if (!coverImage) {
    try {
      const response = await request(`https://coverartarchive.org/release/${release.id}/front-500`);
      if (!response.headers.get('content-type')?.startsWith('image/')) throw new Error('Artwork response is not an image');
      fs.writeFileSync(path.join(root, 'public', cover), Buffer.from(await response.arrayBuffer()));
      coverImage = cover;
    } catch {
      missingArtwork.push(release.title);
      coverImage = '/images/Aly-bouchnak-profile.webp';
    }
  }
  const urls = release.relations.map(rel => rel.url?.resource).filter(Boolean);
  updated.push({
    id: release.id, groupId: release['release-group'].id, title: release['release-group'].title,
    type: release['release-group']['primary-type'], date: release.date, barcode: release.barcode,
    coverImage, artworkMissing: coverImage === '/images/Aly-bouchnak-profile.webp',
    spotifyUrl: urls.find(u => u.startsWith('https://open.spotify.com/')) || old?.spotifyUrl || '',
    appleMusicUrl: urls.find(u => u.startsWith('https://music.apple.com/')) || old?.appleMusicUrl || '',
    youtubeUrl: urls.find(u => /https:\/\/(www\.)?(youtube.com|youtu.be)\//.test(u)) || old?.youtubeUrl || '',
    amazonUrl: urls.find(u => /https:\/\/(music\.|www\.)?amazon\./.test(u)) || old?.amazonUrl || '',
    tracks: release.media.flatMap(m => m.tracks.map(t => ({ title: t.title, recordingId: t.recording.id, length: t.length || t.recording.length }))),
  });
}
fs.writeFileSync(file, JSON.stringify({ ...previous, verifiedOn: new Date().toISOString().slice(0, 10), releases: updated,
  recordings: recordings.map(r => ({ id: r.id, title: r.title, date: r['first-release-date'], length: r.length, isrcs: r.isrcs || [] })) }, null, 2) + '\n');
console.log(`Saved ${updated.length} official releases and ${recordings.length} recording references. Run npm run build to reconcile the catalog.`);
if (missingArtwork.length) console.log('Artwork needed:', missingArtwork.join(', '));
