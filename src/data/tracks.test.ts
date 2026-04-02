import { test, describe } from 'node:test';
import assert from 'node:assert';
import {
  getTrackBySlug,
  getTrackById,
  getTracksByAlbum,
  getAllTracks,
  getRelatedTracks,
  tracks
} from './tracks.ts';

describe('tracks data functions', () => {
  test('getAllTracks returns all tracks', () => {
    const result = getAllTracks();
    assert.strictEqual(result.length, tracks.length);
    assert.deepStrictEqual(result, tracks);
  });

  test('getTrackBySlug returns the correct track', () => {
    const firstTrack = tracks[0];
    const result = getTrackBySlug(firstTrack.slug);
    assert.deepStrictEqual(result, firstTrack);
  });

  test('getTrackBySlug returns undefined for non-existent slug', () => {
    const result = getTrackBySlug('non-existent-slug-12345');
    assert.strictEqual(result, undefined);
  });

  test('getTrackById returns the correct track', () => {
    const firstTrack = tracks[0];
    const result = getTrackById(firstTrack.id);
    assert.deepStrictEqual(result, firstTrack);
  });

  test('getTrackById returns undefined for non-existent id', () => {
    const result = getTrackById(999999);
    assert.strictEqual(result, undefined);
  });

  test('getTracksByAlbum returns tracks for a valid album', () => {
    const firstTrack = tracks[0];
    const albumName = firstTrack.album;
    const result = getTracksByAlbum(albumName);
    assert(result.length > 0);
    result.forEach(track => {
      assert.strictEqual(track.album, albumName);
    });
  });

  test('getTracksByAlbum returns empty array for non-existent album', () => {
    const result = getTracksByAlbum('Non-existent Album Name');
    assert.strictEqual(Array.isArray(result), true);
    assert.strictEqual(result.length, 0);
  });

  test('getRelatedTracks returns tracks for a valid track id', () => {
    const trackWithRelated = tracks.find(t => t.relatedTracks && t.relatedTracks.length > 0);
    if (trackWithRelated) {
      const result = getRelatedTracks(trackWithRelated.id);
      assert.strictEqual(result.length, trackWithRelated.relatedTracks.length);
    }
  });

  test('getRelatedTracks returns empty array for non-existent track id', () => {
    const result = getRelatedTracks(999999);
    assert.strictEqual(Array.isArray(result), true);
    assert.strictEqual(result.length, 0);
  });
});
