import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { readData } from '../scripts/read-data.js';
const tracks = readData('src/data/tracks.ts', 'tracks');
const albums = readData('src/data/albums.ts', 'albums');
const routes = ['/', '/discography', '/about', ...tracks.map(t => `/track/${t.slug}`), ...albums.map(a => `/album/${a.slug}`)];

test('prerendered pages contain visible content, unique canonicals, social tags and valid JSON-LD', () => {
  for (const route of routes) {
    const html = fs.readFileSync(path.join('dist', route.replace(/^\//, ''), 'index.html'), 'utf8');
    assert.equal((html.match(/rel="canonical"/g) || []).length, 1, route);
    assert.ok(html.includes(`href="https://alybouchnak.com${route}"`), route);
    assert.ok(/<div id="root"><main/.test(html), route);
    assert.ok(/<meta name="twitter:title"/.test(html), route);
    const schema = /<script type="application\/ld\+json" data-seo="schema">([\s\S]*?)<\/script>/.exec(html);
    assert.ok(schema, route);
    assert.ok(JSON.parse(schema[1])['@graph'].length >= 3, route);
    assert.ok(!/placeholder|cdn-cgi\/image/i.test(html), route);
  }
});
test('apostrophes and full album track listings survive prerendering', () => {
  const album = albums.find(a => a.slug === 'the-blooms-house-volume-1');
  const html = fs.readFileSync(`dist/album/${album.slug}/index.html`, 'utf8');
  const graph = JSON.parse(/data-seo="schema">([\s\S]*?)<\/script>/.exec(html)[1])['@graph'];
  const entity = graph.find(item => item['@type'] === 'MusicAlbum');
  assert.equal(entity.name, album.title);
  assert.equal(entity.track.itemListElement.length, album.trackCount);
  for (const id of album.trackIds) assert.ok(html.includes(`/track/${tracks.find(t => t.id === id).slug}`));
});
test('every sitemap URL has a built page and no future lastmod values', () => {
  const xml = fs.readFileSync('dist/sitemap.xml', 'utf8');
  for (const [, url] of xml.matchAll(/<loc>(.*?)<\/loc>/g)) {
    const route = new URL(url).pathname.replace(/^\//, '');
    assert.ok(fs.existsSync(path.join('dist', route, 'index.html')), url);
  }
  for (const [, date] of xml.matchAll(/<lastmod>(.*?)<\/lastmod>/g)) assert.ok(Date.parse(date) <= Date.now());
  assert.ok(fs.existsSync('dist/sitemap-index.xml'));
  assert.ok(fs.readFileSync('dist/llms.txt', 'utf8').includes("Layla's Coming"));
});
test('AI discovery resources are Markdown and valid manifests rather than HTML fallbacks', () => {
  const markdown = fs.readFileSync('dist/llms.txt', 'utf8');
  assert.match(markdown, /^# Aly Bouchnak\n/);
  assert.match(markdown, /\[[^\]]+\]\(https:\/\//);
  for (const file of ['ai-catalog.json', '.well-known/ai-catalog.json', '.well-known/ard.json']) {
    const manifest = JSON.parse(fs.readFileSync(`dist/${file}`, 'utf8'));
    assert.equal(manifest.specVersion, '1.0');
    assert.equal(manifest.entries.length, 1);
    const entry = manifest.entries[0];
    assert.match(entry.identifier, /^urn:air:alybouchnak\.com:/);
    assert.equal(entry.type, 'application/ai-catalog+json');
    assert.ok(entry.url && !entry.data);
    assert.equal(entry.representativeQueries.length, 3);
  }
  assert.ok(JSON.parse(fs.readFileSync('dist/music-catalog.json', 'utf8'))['@graph'].length > 50);
  const directory = JSON.parse(fs.readFileSync('dist/music-discovery.json', 'utf8'));
  assert.equal(directory.entries.length, JSON.parse(fs.readFileSync('dist/music-catalog.json', 'utf8'))['@graph'].length);
  for (const entry of directory.entries) {
    assert.equal(entry.type, 'application/ld+json');
    assert.ok(entry.data && !entry.url);
    assert.equal(entry.data['@context'], 'https://schema.org');
  }
});
test('rerunning prerendering retains page-specific content and a single schema', () => {
  execFileSync(process.execPath, ['scripts/prerender-seo.js'], { stdio: 'pipe' });
  const album = albums.find(a => a.slug === 'the-blooms-house-volume-1');
  const html = fs.readFileSync(`dist/album/${album.slug}/index.html`, 'utf8');
  assert.equal((html.match(/data-seo="schema"/g) || []).length, 1);
  const graph = JSON.parse(/data-seo="schema">([\s\S]*?)<\/script>/.exec(html)[1])['@graph'];
  assert.equal(graph.find(item => item['@type'] === 'MusicAlbum').name, album.title);
  assert.ok(html.includes('/track/' + tracks.find(t => t.id === album.trackIds[0]).slug));
});
