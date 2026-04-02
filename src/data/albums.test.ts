import { test, describe } from 'node:test';
import assert from 'node:assert';
import { getAlbumBySlug, getAllAlbums, albums } from './albums.ts';

describe('albums data functions', () => {
  describe('getAllAlbums()', () => {
    test('returns all albums', () => {
      const result = getAllAlbums();
      assert.strictEqual(Array.isArray(result), true);
      assert.strictEqual(result.length, albums.length);
      assert.deepStrictEqual(result, albums);
    });
  });

  describe('getAlbumBySlug()', () => {
    test('returns the correct album for a valid slug', () => {
      // Assuming there's at least one album in the data
      const firstAlbum = albums[0];
      const result = getAlbumBySlug(firstAlbum.slug);
      assert.deepStrictEqual(result, firstAlbum);
    });

    test('returns undefined for a non-existent slug', () => {
      const result = getAlbumBySlug('non-existent-album-slug-123');
      assert.strictEqual(result, undefined);
    });

    test('returns undefined for an empty string', () => {
      const result = getAlbumBySlug('');
      assert.strictEqual(result, undefined);
    });

    test('returns undefined for a string with only spaces', () => {
      const result = getAlbumBySlug('   ');
      assert.strictEqual(result, undefined);
    });

    test('is case-sensitive and returns undefined for mismatched case', () => {
      const firstAlbum = albums[0];
      // Try to get with uppercase if the original is lowercase, or vice-versa
      const alteredSlug = firstAlbum.slug.toUpperCase() === firstAlbum.slug
        ? firstAlbum.slug.toLowerCase()
        : firstAlbum.slug.toUpperCase();

      const result = getAlbumBySlug(alteredSlug);
      assert.strictEqual(result, undefined);
    });

    test('returns undefined for partial slug match', () => {
      const firstAlbum = albums[0];
      // e.g. 'the-blooms-house' instead of 'the-blooms-house-volume-1'
      const partialSlug = firstAlbum.slug.substring(0, firstAlbum.slug.length - 1);
      const result = getAlbumBySlug(partialSlug);
      assert.strictEqual(result, undefined);
    });
  });
});
