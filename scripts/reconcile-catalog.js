import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { readData } from './read-data.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const catalog = JSON.parse(fs.readFileSync(path.join(root, 'src/data/musicbrainz-catalog.json'), 'utf8'));
const tracksFile = path.join(root, 'src/data/tracks.ts');
const albumsFile = path.join(root, 'src/data/albums.ts');
const tracks = readData(tracksFile, 'tracks');
const albums = readData(albumsFile, 'albums');
const artistUpdates = readData(path.join(root, 'src/data/artist-catalog.ts'), 'artistUpdates');
const normalize = title => title.toLowerCase().replace(/[’']/g, '').replace(/[^a-z0-9]/g, '');
const duration = ms => `${Math.floor(ms / 60000)}:${String(Math.round(ms / 1000) % 60).padStart(2, '0')}`;
const slugify = title => title.toLowerCase().replace(/[’']/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const validLink = link => link && !/placeholder|TBD/i.test(link) ? link : '';
let nextTrackId = Math.max(...tracks.map(t => t.id), 0) + 1;
let nextAlbumId = Math.max(...albums.map(a => a.id || 0), 0) + 1;
const recordingMap = new Map();
const missing = [];

for (const recording of catalog.recordings) {
  let track = tracks.find(t => t.musicbrainzRecordingId === recording.id || (t.isrc && recording.isrcs.includes(t.isrc)));
  if (!track && catalog.recordings.filter(r => normalize(r.title) === normalize(recording.title)).length === 1) {
    track = tracks.find(t => !t.musicbrainzRecordingId && !t.isrc && normalize(t.title) === normalize(recording.title));
  }
  if (!track) {
    const releases = catalog.releases.filter(r => r.tracks.some(t => t.recordingId === recording.id)).sort((a, b) => a.date.localeCompare(b.date));
    const first = releases[0];
    if (!first) continue;
    const slug = slugify(recording.title) + (tracks.some(t => normalize(t.title) === normalize(recording.title)) ? `-${first.date.slice(0, 4)}` : '');
    track = {
      id: nextTrackId++, slug, title: recording.title, subtitle: 'Music by Aly Bouchnak',
      description: `${recording.title} by Aly Bouchnak. Explore the recording and its releases in The Bloom's House catalog.`,
      coverImage: first.coverImage, artist: 'Aly Bouchnak', releaseDate: recording.date || first.date,
      duration: duration(recording.length), bpm: 0, genre: "Children's Music", ageRange: '', mood: '',
      isrc: recording.isrcs[0] || '', upc: first.barcode || '', album: first.title, albumUrl: '',
      spotifyUrl: '', appleMusicUrl: '', youtubeUrl: '', lyricsPreview: [], lyricsFull: '', educationalBenefits: [], artistNote: '', relatedTracks: [],
      seo: { title: `${recording.title} | Aly Bouchnak`, description: `${recording.title} by Aly Bouchnak. Recording details and release information.`, keywords: 'Aly Bouchnak, The Blooms House, childrens music', canonical: `https://alybouchnak.com/track/${slug}`, ogImage: `https://alybouchnak.com${first.coverImage}` },
      trackSchema: {},
    };
    tracks.push(track);
    missing.push({ title: recording.title, needs: ['approved lyrics', 'description', 'BPM', ...(recording.isrcs.length ? [] : ['ISRC'])] });
  }
  track.musicbrainzRecordingId = recording.id;
  track.isrc ||= recording.isrcs[0] || '';
  track.upc ||= '';
  track.musicbrainzUrl = `https://musicbrainz.org/recording/${recording.id}`;
  track.releaseDate = recording.date || track.releaseDate;
  if (recording.length) track.duration = duration(recording.length);
  if (!track.coverImage || (track.coverImage.startsWith('/') && !fs.existsSync(path.join(root, 'public', track.coverImage)))) {
    track.coverImage = catalog.releases.find(r => r.tracks.some(t => t.recordingId === recording.id))?.coverImage || '';
  }
  track.subtitle ||= 'Music by Aly Bouchnak';
  track.seo ||= { title: `${track.title} | Aly Bouchnak`, description: track.description || '', keywords: 'Aly Bouchnak, childrens music', canonical: `https://alybouchnak.com/track/${track.slug}`, ogImage: '' };
  track.lyricsPreview ||= [];
  track.lyricsFull ||= '';
  track.educationalBenefits ||= [];
  track.relatedTracks ||= [];
  track.bpm ||= 0;
  track.ageRange ||= '';
  track.mood ||= '';
  track.artist ||= 'Aly Bouchnak';
  track.artistNote ||= '';
  track.description ||= `${recording.title} by Aly Bouchnak.`;
  recordingMap.set(recording.id, track);
  if (track.description === `${recording.title} by Aly Bouchnak. Explore the recording and its releases in The Bloom's House catalog.`) {
    track.mood = '';
    delete track.routine;
  }
}

for (const release of catalog.releases) {
  const releaseTracks = release.tracks.map(t => recordingMap.get(t.recordingId)).filter(Boolean);
  if (release.type === 'Single') {
    const track = releaseTracks[0];
    if (!track) continue;
    track.releaseGroupId = release.groupId;
    track.isStandaloneRelease = true;
    track.releaseType = 'Single';
    track.upc = release.barcode || track.upc;
    track.coverImage = release.coverImage;
    for (const key of ['spotifyUrl', 'appleMusicUrl', 'youtubeUrl', 'amazonUrl']) {
      track[key] = validLink(track[key]) || release[key] || '';
    }
    continue;
  }
  let album = albums.find(a => a.musicbrainzReleaseGroupId === release.groupId || normalize(a.title) === normalize(release.title));
  if (!album) {
    album = {
      id: nextAlbumId++, slug: slugify(release.title), title: release.title, subtitle: `${release.type} by Aly Bouchnak`,
      description: `${release.title} is a ${release.tracks.length}-track ${release.type.toLowerCase()} by Aly Bouchnak. Explore the track list and release details.`,
      coverImage: release.coverImage, artist: 'Aly Bouchnak', releaseDate: release.date, genre: "Children's Music", ageRange: '', mood: '',
      spotifyUrl: '', appleMusicUrl: '', youtubeUrl: '', trackCount: release.tracks.length, duration: '', upc: release.barcode || '', educationalBenefits: [],
    };
    albums.push(album);
  }
  Object.assign(album, {
    title: release.title, releaseDate: release.date, date: release.date, type: release.type,
    coverImage: release.coverImage, image: release.coverImage, trackIds: releaseTracks.map(t => t.id),
    trackCount: release.tracks.length, duration: duration(release.tracks.reduce((sum, t) => sum + (t.length || 0), 0)),
    upc: release.barcode || album.upc, musicbrainzReleaseGroupId: release.groupId,
    musicbrainzUrl: `https://musicbrainz.org/release/${release.id}`, link: `/album/${album.slug}`,
    status: release.date <= new Date().toISOString().slice(0, 10) ? 'available' : 'coming-soon',
  });
  for (const key of ['spotifyUrl', 'appleMusicUrl', 'youtubeUrl', 'amazonUrl']) album[key] = release[key] || validLink(album[key]) || '';
  for (const track of releaseTracks) {
    // Prefer the full album for a recording's primary album, while retaining all EP memberships in trackIds.
    if (release.type === 'Album' || !track.albumUrl) {
      track.album = album.title;
      track.albumUrl = `/album/${album.slug}`;
    }
    if (!track.isStandaloneRelease) track.isStandaloneRelease = catalog.releases.some(r => r.type === 'Single' && r.tracks.some(t => t.recordingId === track.musicbrainzRecordingId));
    if (release.tracks[0]?.recordingId === track.musicbrainzRecordingId) {
      for (const key of ['spotifyUrl', 'appleMusicUrl', 'youtubeUrl', 'amazonUrl']) track[key] = validLink(track[key]) || release[key] || '';
    }
  }
}

for (const update of artistUpdates) {
  const track = recordingMap.get(update.recordingId);
  if (!track) throw new Error(`Artist update references an unknown recording: ${update.recordingId}`);
  Object.assign(track, {
    lyricsFull: update.lyrics, lyricsPreview: update.lyrics.split('\n').filter(Boolean).slice(0, 6),
    description: update.description, mood: update.mood, routine: update.routine,
    ...(update.isrc ? { isrc: update.isrc } : {}),
  });
  track.seo.description = update.description;
  for (const album of albums.filter(a => a.type === 'EP' && a.trackIds?.[0] === track.id)) {
    album.description = `${update.description} This ${album.trackCount}-track EP includes more songs from The Bloom's House.`;
    album.mood = update.mood;
  }
}

for (const track of tracks) {
  for (const key of ['spotifyUrl', 'appleMusicUrl', 'youtubeUrl', 'amazonUrl', 'otherUrl']) track[key] = validLink(track[key]) || '';
  const url = `https://alybouchnak.com/track/${track.slug}`;
  const [minutes, seconds] = track.duration.split(':');
  track.seo.ogImage = `https://alybouchnak.com${track.coverImage}`;
  track.trackSchema = {
    '@context': 'https://schema.org', '@type': 'MusicRecording', '@id': `${url}#recording`, name: track.title, url,
    duration: `PT${minutes}M${seconds}S`, genre: track.genre || "Children's Music",
    byArtist: { '@type': 'Person', '@id': 'https://alybouchnak.com/#artist', name: 'Aly Bouchnak' },
    inAlbum: { '@type': 'MusicAlbum', name: track.album, '@id': `https://alybouchnak.com${track.albumUrl}` },
    datePublished: track.releaseDate.slice(0, 10), ...(track.isrc ? { isrcCode: track.isrc } : {}), description: track.description,
    image: `https://alybouchnak.com${track.coverImage}`, sameAs: [track.musicbrainzUrl].filter(Boolean),
  };
}

function writeArray(file, name, data) {
  const source = fs.readFileSync(file, 'utf8');
  const start = source.indexOf(`export const ${name}:`);
  const end = source.indexOf('\nexport function', start);
  if (start < 0 || end < 0) throw new Error(`Cannot locate ${name} data`);
  fs.writeFileSync(file, source.slice(0, start) + `export const ${name}: ${name === 'tracks' ? 'Track' : 'Album'}[] = ${JSON.stringify(data, null, 2)};\n` + source.slice(end));
}
writeArray(tracksFile, 'tracks', tracks);
writeArray(albumsFile, 'albums', albums);
console.log(`Catalog reconciled: ${catalog.releases.length} releases, ${tracks.length} track pages, ${albums.length} album/EP pages.`);
