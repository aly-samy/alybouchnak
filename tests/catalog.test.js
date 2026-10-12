import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { readData } from '../scripts/read-data.js';
const tracks = readData('src/data/tracks.ts', 'tracks');
const albums = readData('src/data/albums.ts', 'albums');
const catalog = JSON.parse(fs.readFileSync('src/data/musicbrainz-catalog.json', 'utf8'));

test('every MusicBrainz release group appears exactly once in the public catalog', () => {
  const publicGroups = [...albums.map(a => a.musicbrainzReleaseGroupId), ...tracks.filter(t => t.isStandaloneRelease).map(t => t.releaseGroupId)];
  assert.equal(publicGroups.length, catalog.releases.length);
  assert.equal(new Set(publicGroups).size, catalog.releases.length);
  assert.deepEqual(publicGroups.sort(), catalog.releases.map(r => r.groupId).sort());
});
test('album and EP tracks preserve MusicBrainz order, counts and recording identities', () => {
  const byId = new Map(tracks.map(t => [t.id, t]));
  const recordings = new Map(catalog.recordings.map(r => [r.id, r]));
  for (const album of albums) {
    const release = catalog.releases.find(r => r.groupId === album.musicbrainzReleaseGroupId);
    assert.equal(album.type, release.type, album.title);
    assert.equal(album.trackCount, release.tracks.length, album.title);
    assert.equal(album.trackIds.length, release.tracks.length, album.title);
    release.tracks.forEach((entry, index) => {
      const track = byId.get(album.trackIds[index]);
      assert.ok(track, `${album.title}: missing track`);
      const source = recordings.get(entry.recordingId);
      assert.ok(track.musicbrainzRecordingId === entry.recordingId || source.isrcs.includes(track.isrc), `${album.title}: wrong track order`);
    });
  }
});
test('slugs, IDs, covers and primary album links are valid', () => {
  for (const items of [albums, tracks]) {
    assert.equal(new Set(items.map(i => i.slug)).size, items.length);
    assert.equal(new Set(items.map(i => i.id)).size, items.length);
    for (const item of items) assert.ok(fs.existsSync(`public${item.coverImage}`), item.title);
  }
  for (const track of tracks) if (track.albumUrl) assert.ok(albums.some(a => `/album/${a.slug}` === track.albumUrl), track.title);
});
test('both Bock Bock Chicken recordings retain separate identifiers and pages', () => {
  const versions = tracks.filter(t => t.title === 'Bock Bock Chicken');
  assert.equal(versions.length, 2);
  assert.deepEqual(versions.map(t => t.isrc).sort(), ['GXF972564744', 'GX5MY2662913'].sort());
  assert.notEqual(versions[0].slug, versions[1].slug);
});
test('streaming placeholders are not published, and schemas match release dates', () => {
  for (const item of [...albums, ...tracks]) {
    for (const key of ['spotifyUrl', 'appleMusicUrl', 'youtubeUrl', 'amazonUrl']) assert.ok(!/placeholder/i.test(item[key] || ''), item.title);
  }
  for (const track of tracks) assert.equal(track.trackSchema.datePublished, track.releaseDate.slice(0, 10));
});
test('card summaries contain no full lyrics, artist notes or JSON-LD', () => {
  const source = fs.readFileSync('src/data/catalog-summaries.ts', 'utf8');
  for (const field of ['lyricsFull', 'trackSchema', 'artistNote', 'scienceFramework']) assert.ok(!source.includes(`"${field}"`));
});
test('artist-supplied lyrics and identifiers survive catalog reconciliation', () => {
  for (const update of readData('src/data/artist-catalog.ts', 'artistUpdates')) {
    const track = tracks.find(t => t.musicbrainzRecordingId === update.recordingId);
    assert.equal(track.lyricsFull, update.lyrics);
    assert.equal(track.description, update.description);
    if (update.isrc) assert.equal(track.isrc, update.isrc);
  }
});
