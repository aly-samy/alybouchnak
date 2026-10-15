import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { readData } from './read-data.js';
import { discographySections, getDiscographyReleases, discographySchema } from '../src/lib/discography.ts';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const domain = 'https://alybouchnak.com';
const read = name => readData(path.join(root, `src/data/${name}.ts`), name);
const tracks = read('tracks');
const albums = read('albums');
const articles = read('articles');
const playlists = read('playlists');
const themes = read('themeCollections');
const sourceCatalog = JSON.parse(fs.readFileSync(path.join(root, 'src/data/musicbrainz-catalog.json'), 'utf8'));
const baseHtml = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
  .replace(/<script\b(?=[^>]*data-seo="schema")[^>]*>[\s\S]*?<\/script>\s*/g, '')
  .replace(/<div id="root"><main[\s\S]*?<\/main><\/div>/, '<div id="root"></div>');
const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const absolute = value => new URL(value || '/images/Aly-bouchnak-profile.webp', domain).href;
const plain = value => String(value || '').replace(/<\/p>|<br\s*\/?>|<\/li>/gi, '\n').replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"');
const artist = { ...readData(path.join(root, 'src/data/artist.ts'), 'artistSchema'), '@context': undefined };
const artistReference = { '@type': 'Person', '@id': artist['@id'], name: artist.name };
const list = (items, type) => `<ul>${items.map(item => `<li><a href="/${type}/${escape(item.slug)}">${escape(item.title)}</a></li>`).join('')}</ul>`;
const releaseList = () => list(albums, 'album') + list(tracks.filter(t => t.isStandaloneRelease), 'track');
const press = JSON.parse(fs.readFileSync(path.join(root, 'src/data/press-kit.json'), 'utf8'));
const faqLinks = JSON.parse(fs.readFileSync(path.join(root, 'src/data/faq-links.json'), 'utf8'));
const referenceCatalog = JSON.parse(fs.readFileSync(path.join(root, 'src/data/catalog-reference.json'), 'utf8'));
const faqs = read('faqs');
const collectionNav = `<nav aria-label="Discography collections"><a href="/discography">Overview</a> · ${discographySections.map(s=>`<a href="/discography/${s.slug}">${s.label}</a>`).join(' · ')}</nav>`;
const faqEntity = {'@type':'FAQPage','@id':`${domain}/faq#webpage`,url:`${domain}/faq`,name:'Aly Bouchnak Music FAQ',dateModified:press.updatedOn,mainEntity:faqs.map(f=>({'@type':'Question','@id':`${domain}/faq#question-${f.id}`,name:f.question,acceptedAnswer:{'@type':'Answer',text:f.answer,url:`${domain}/faq#question-${f.id}`}}))};
const epkEntity = {'@type':'ProfilePage','@id':`${domain}/epk#webpage`,url:`${domain}/epk`,name:press.title,dateModified:press.updatedOn,mainEntity:{...artist,description:press.shortBio}};
const faqBody = `<p>Find Aly Bouchnak’s albums, songs, lyrics, and listening links, with a direct route to the relevant music page.</p><p>Editorial update: <time datetime="${press.updatedOn}">15 October 2026</time></p>` + [...new Set(faqs.map(f=>f.category))].map((category,index)=>`<section aria-labelledby="topic-${index+1}"><h2 id="topic-${index+1}">${escape(category)}</h2>${faqs.filter(f=>f.category===category).map(f=>`<article id="question-${f.id}"><h3>${escape(f.question)}</h3><p>${escape(f.answer)}</p><ul>${(faqLinks[f.id]||[]).map(link=>`<li><a href="${escape(link.href)}">${escape(link.label)}</a></li>`).join('')}</ul></article>`).join('')}</section>`).join('');
const epkBody = `<p>Editorial update: <time datetime="${press.updatedOn}">15 October 2026</time></p><section id="biography"><h2>Artist biography</h2><h3>Short biography</h3><p>${escape(press.shortBio)}</p><h3>Extended biography</h3>${press.longBio.map(p=>`<p>${escape(p)}</p>`).join('')}</section><h2>Artist facts</h2><p>Artist credit: Aly Bouchnak. Music world and release series: The Bloom’s House. ISNI: 0000000529569919. IPI: 01337888402.</p><p>${referenceCatalog.releases.length} releases: ${['Album','EP','Single'].map(type=>`${referenceCatalog.releases.filter(r=>r.type===type).length} ${type==='Album'?'albums':type==='EP'?'EPs':'singles'}`).join(', ')}. Includes announced releases. ${referenceCatalog.recordings.length} recording pages.</p><section id="catalog"><h2>Music catalog</h2>${collectionNav}<ul>${referenceCatalog.releases.map(r=>`<li><a href="${r.href}">${escape(r.title)}</a> — ${r.type}, ${r.date}${r.upc?`, UPC ${escape(r.upc)}`:''}</li>`).join('')}</ul></section><section id="identifiers"><h2>Recording identifiers</h2><p>Bock Bock Chicken has separate 2025 and 2026 recordings; the lyrics supplied for this website belong to the 2026 version.</p><table><caption>Official recording pages, release dates and ISRC identifiers</caption><thead><tr><th scope="col">Recording</th><th scope="col">Release date</th><th scope="col">ISRC</th></tr></thead><tbody>${referenceCatalog.recordings.map(r=>`<tr><th scope="row"><a href="${r.href}">${escape(r.title)}</a></th><td>${r.date}</td><td>${escape(r.isrc||'Not listed')}</td></tr>`).join('')}</tbody></table></section><section id="contact"><h2>Press, permissions &amp; sources</h2><p>For press, interviews, collaborations, press materials, and music permission enquiries, email <a href="mailto:${press.contact}">${press.contact}</a>. Include your project, the song or release, and your deadline.</p><p>${escape(press.sourceNote)}</p><ul>${press.platforms.map(p=>`<li><a href="${p.url}">${p.label}</a></li>`).join('')}</ul><p><a href="/music-catalog.json">Structured music catalog</a> · <a href="/llms.txt">Official page directory</a> · <a href="/faq">FAQ</a></p></section>`;
const staticPages = [
  ['', "Aly Bouchnak — Children's Music & The Bloom's House", "Original children's songs, modern nursery rhymes and family music by Aly Bouchnak.", `<p>Aly Bouchnak is an independent children's music artist, songwriter and producer, and creator of The Bloom's House. Discover music for playtime, everyday routines and bedtime.</p><h2>Albums, EPs and singles</h2>${releaseList()}`],
  ['discography', 'Aly Bouchnak Discography', 'Choose full-length albums, daytime releases, or bedtime recordings by Aly Bouchnak.', `${collectionNav}${discographySections.map(s=>`<section><h2><a href="/discography/${s.slug}">${s.label}</a></h2><p>${s.description}</p></section>`).join('')}<p>Albums, EPs and singles are official releases. A recording can appear on more than one release. Explore <a href="/playlists">playlists</a> for listening mixes or the <a href="/faq">FAQ</a> for details.</p>`, discographySchema(undefined, [])],
  ...discographySections.map(s=>{
    const items=getDiscographyReleases(albums,tracks,s.slug);
    return [`discography/${s.slug}`,`${s.label} | Aly Bouchnak Discography`,s.description,`${collectionNav}<p>${s.description}</p><p>${items.length} results</p><ul>${items.map(r=>`<li><h2><a href="${r.href}">${escape(r.title)}</a></h2><p>${r.type} — Release date: ${r.releaseDate.slice(0,10)}</p><p>${escape(r.description)}</p></li>`).join('')}</ul>`,discographySchema(s.slug,items)];
  }),
  ['about', 'About Aly Bouchnak', "Meet the children's music artist and creator of The Bloom's House.", `<p>${escape(artist.description)}</p><p>His Utility Music approach connects songs with everyday childhood routines, play and family life.</p>`],
  ['playlists', 'Playlists', 'Discover themed music playlists by Aly Bouchnak.', list(playlists, 'playlist')],
  ['theme-collections', 'Theme Collections', "Explore themed collections from The Bloom's House.", list(themes, 'theme-collection')],
  ['articles', 'Articles', 'News and articles from Aly Bouchnak.', list(articles, 'article')],
  ['press', 'Press', 'Press coverage and news about Aly Bouchnak.', list(articles.filter(a => a.category === 'Press'), 'article')],
  ['resources', 'Resources', 'Music and activity resources for families.', list(articles.filter(a => a.category !== 'Press'), 'article')],
  ['meet-the-blooms', 'Meet the Blooms', "Meet the characters in The Bloom's House.", "<p>Explore the family and characters behind The Bloom's House music.</p>"],
  ['faq', 'Aly Bouchnak FAQ | Songs, Albums, Lyrics & Listening', 'Official answers about Aly Bouchnak, The Bloom’s House, song versions, lyrics, streaming, everyday listening, and press or music permission enquiries.', faqBody, faqEntity],
  ['epk', press.title, press.description, epkBody, epkEntity],
  ['contact', 'Contact Aly Bouchnak', 'Contact Aly Bouchnak about music, press and collaborations.', '<p>Use the contact form to get in touch about music, press or collaborations.</p>'],
  ['privacy-policy', 'Privacy Policy', 'Privacy information for alybouchnak.com.', '<p>Read how this website handles personal information.</p>'],
  ['terms-of-service', 'Terms of Service', 'Terms for using alybouchnak.com.', '<p>Read the terms for using this website.</p>'],
  ['safety-policy', 'Safety & Values', 'Safety and values at The Bloom’s House.', '<p>Learn about the values behind the music.</p>'],
];

function writePage(route, title, description, image, content, entity) {
  const url = absolute(route);
  const graph = [artist, { '@type': 'WebSite', '@id': `${domain}/#website`, name: 'Aly Bouchnak', url: domain + '/' },
    { '@type': 'WebPage', '@id': `${url}#webpage`, url, name: title, description, inLanguage: 'en', isPartOf: { '@id': `${domain}/#website` }, about: artistReference, ...(entity?.['@id'] === `${url}#webpage` ? entity : {}) },
    ...(entity && entity['@id'] !== `${url}#webpage` ? [entity] : [])];
  let html = baseHtml.replace(/<title>[\s\S]*?<\/title>/, `<title>${escape(title)}</title>`);
  const setMeta = (name, value, property = false) => {
    const attr = property ? 'property' : 'name';
    const tag = `<meta ${attr}="${name}" content="${escape(value)}" />`;
    const pattern = new RegExp(`<meta ${attr}="${name}"[\\s\\S]*?>`, 'g');
    html = pattern.test(html) ? html.replace(pattern, () => tag) : html.replace('</head>', `${tag}\n</head>`);
  };
  setMeta('description', description);
  setMeta('robots', 'index, follow, max-image-preview:large');
  for (const [key, value] of Object.entries({ title, description, url, image: absolute(image), type: entity?.['@type'] === 'MusicRecording' ? 'music.song' : entity?.['@type'] === 'MusicAlbum' ? 'music.album' : /Article|Posting/.test(entity?.['@type'] || '') ? 'article' : 'website' })) setMeta(`og:${key}`, value, true);
  for (const [key, value] of Object.entries({ title, description, url, image: absolute(image), card: 'summary_large_image' })) setMeta(`twitter:${key}`, value);
  html = html.replace(/<link rel="canonical"[^>]*>/g, `<link rel="canonical" href="${escape(url)}" />`);
  const json = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');
  html = html.replace('</head>', `<script type="application/ld+json" data-seo="schema">${json}</script>\n</head>`);
  const nav = '<nav aria-label="Main navigation"><a href="/">Home</a> · <a href="/discography">Discography</a> · <a href="/about">About</a> · <a href="/contact">Contact</a></nav>';
  html = html.replace('<div id="root"></div>', `<div id="root"><main class="mx-auto max-w-6xl px-6 py-20">${nav}<h1>${escape(title)}</h1>${content}</main></div>`);
  const directory = path.join(dist, route.replace(/^\//, ''));
  fs.mkdirSync(directory, { recursive: true });
  fs.writeFileSync(path.join(directory, 'index.html'), html);
}

for (const [slug, title, description, content, entity] of staticPages) writePage(slug ? `/${slug}` : '/', title, description, '', content, entity);
writePage('/404', 'Page Not Found | Aly Bouchnak', 'This page could not be found.', '', '<p><a href="/discography">Browse the discography</a> or return to the homepage.</p>');
const notFoundHtml = fs.readFileSync(path.join(dist, '404/index.html'), 'utf8').replace('content="index, follow, max-image-preview:large"', 'content="noindex, nofollow"');
fs.writeFileSync(path.join(dist, '404.html'), notFoundHtml);
for (const track of tracks) {
  const links = [['Spotify', track.spotifyUrl], ['Apple Music', track.appleMusicUrl], ['YouTube', track.youtubeUrl], ['MusicBrainz', track.musicbrainzUrl]].filter(([, url]) => url && !/placeholder/i.test(url));
  const body = `<p>${escape(track.description)}</p><img src="${escape(track.coverImage)}" alt="${escape(track.title)} cover" width="400" height="400"><dl><dt>Artist</dt><dd>Aly Bouchnak</dd><dt>Release date</dt><dd>${escape(track.releaseDate.slice(0, 10))}</dd><dt>Duration</dt><dd>${escape(track.duration)}</dd>${track.isrc ? `<dt>ISRC</dt><dd>${escape(track.isrc)}</dd>` : ''}</dl><p>${links.map(([label, url]) => `<a href="${escape(url)}">${label}</a>`).join(' · ')}</p>${track.albumUrl ? `<p>Appears on <a href="${escape(track.albumUrl)}">${escape(track.album)}</a></p>` : ''}${track.lyricsFull ? `<section><h2>Lyrics</h2><p style="white-space:pre-line">${escape(plain(track.lyricsFull))}</p></section>` : ''}`;
  writePage(`/track/${track.slug}`, `${track.title} | Aly Bouchnak`, track.description, track.coverImage, body, { ...track.trackSchema, '@context': undefined, byArtist: artistReference });
}
for (const album of albums) {
  const orderedTracks = (album.trackIds || []).map(id => tracks.find(t => t.id === id)).filter(Boolean);
  const body = `<p>${escape(album.description)}</p><img src="${escape(album.coverImage)}" alt="${escape(album.title)} cover" width="400" height="400"><p>${escape(album.type)} · ${escape(album.releaseDate.slice(0, 10))} · ${album.trackCount} tracks · ${escape(album.duration)}</p><h2>Track list</h2><ol>${orderedTracks.map(t => `<li><a href="/track/${escape(t.slug)}">${escape(t.title)}</a> — ${escape(t.duration)}</li>`).join('')}</ol><p>${[['Spotify', album.spotifyUrl], ['Apple Music', album.appleMusicUrl], ['MusicBrainz', album.musicbrainzUrl]].filter(([, url]) => url).map(([label, url]) => `<a href="${escape(url)}">${label}</a>`).join(' · ')}</p>`;
  writePage(`/album/${album.slug}`, `${album.title} | Aly Bouchnak`, album.description, album.coverImage, body, {
    '@type': 'MusicAlbum', '@id': absolute(`/album/${album.slug}`), url: absolute(`/album/${album.slug}`), name: album.title,
    byArtist: artistReference, datePublished: album.releaseDate.slice(0, 10), numTracks: album.trackCount, image: absolute(album.coverImage),
    albumReleaseType: `https://schema.org/${album.type === 'EP' ? 'EPRelease' : 'AlbumRelease'}`, sameAs: [album.musicbrainzUrl].filter(Boolean),
    track: { '@type': 'ItemList', numberOfItems: orderedTracks.length, itemListElement: orderedTracks.map((t, index) => ({ '@type': 'ListItem', position: index + 1, item: { '@type': 'MusicRecording', name: t.title, url: absolute(`/track/${t.slug}`), '@id': absolute(`/track/${t.slug}#recording`) } })) },
  });
}
for (const article of articles) writePage(`/article/${article.slug}`, `${article.title} | Aly Bouchnak`, article.description, article.coverImage.url,
  `<p>${escape(article.description)}</p><p style="white-space:pre-line">${escape(plain(article.content))}</p>`,
  { '@type': article.type, headline: article.title, datePublished: article.datePublished, dateModified: article.dateModified, image: absolute(article.coverImage.url), author: artistReference });
for (const [items, type] of [[playlists, 'playlist'], [themes, 'theme-collection']]) {
  for (const item of items) writePage(`/${type}/${item.slug}`, `${item.title} | Aly Bouchnak`, item.description, item.coverImage,
    `<p>${escape(item.description)}</p>${list((item.trackIds || []).map(id => tracks.find(t => t.id === id)).filter(Boolean), 'track')}`);
}
const catalogText = `# Aly Bouchnak\n\n> ${artist.description}\n\nOfficial artist website: ${domain}\n\nUse the linked official pages for canonical release details and artist-approved lyrics. Metadata and lyrics remain distinct: release information comes from MusicBrainz, while supplied lyrics come from the artist.\n\n## Artist information and direct answers\n\n- [Official press kit](${domain}/epk): biography, contact, release catalog, and recording identifiers.\n- [Music FAQ](${domain}/faq): direct answers with links to recordings and releases.\n- [Latest Albums](${domain}/discography/latest-albums): full-length albums and release dates.\n- [Bouncy Beats](${domain}/discography/bouncy-beats): daytime albums, EPs, and singles.\n- [Tuned for Dreams](${domain}/discography/tuned-for-dreams): bedtime album and recordings.\n\nFor a recording’s lyrics or ISRC, use its recording page. For an ordered track list, use the album page. Bock Bock Chicken has separate 2025 and 2026 recordings; artist-supplied lyrics apply only to the 2026 version. Do not infer popularity, clinical outcomes, or availability from an announced release date.\n\n## Catalog\n\n` +
  albums.map(a => `- [${a.title}](${domain}/album/${a.slug}): ${a.type}, ${a.releaseDate.slice(0, 10)}, ${a.trackCount} tracks.`).join('\n') + '\n\n## Recordings\n\n' +
  tracks.map(t => `- [${t.title}](${domain}/track/${t.slug})${t.isrc ? ` — ISRC ${t.isrc}` : ''}`).join('\n') + `\n\n## Machine-readable resources\n\n- [Structured music catalog](${domain}/music-catalog.json): album track lists and recording identifiers.\n- [Resource discovery manifest](${domain}/.well-known/ard.json): read-only catalog discovery.\n\n## Sources\n\n- [MusicBrainz](https://musicbrainz.org/artist/aaec4457-1558-4400-a316-72e14f698922)\n- [Apple Music](https://music.apple.com/us/artist/aly-bouchnak/1840274949)\n- [Genius](https://genius.com/artists/Aly-bouchnak)\n\nMusicBrainz metadata verified on ${sourceCatalog.verifiedOn}. Future release dates describe upcoming releases. Missing lyrics or details are not inferred.\n`;
fs.writeFileSync(path.join(dist, 'llms.txt'), catalogText);
const musicCatalog = {
  '@context': 'https://schema.org',
  '@graph': [artist,
    ...albums.map(a => ({
      '@type': 'MusicAlbum', '@id': `${domain}/album/${a.slug}`, name: a.title, url: `${domain}/album/${a.slug}`,
      byArtist: artistReference, datePublished: a.releaseDate.slice(0, 10), numTracks: a.trackCount,
      image: absolute(a.coverImage), albumReleaseType: `https://schema.org/${a.type === 'EP' ? 'EPRelease' : 'AlbumRelease'}`,
      sameAs: [a.musicbrainzUrl].filter(Boolean),
      track: { '@type': 'ItemList', itemListElement: (a.trackIds || []).map((id, index) => ({ '@type': 'ListItem', position: index + 1, item: { '@id': tracks.find(t => t.id === id)?.trackSchema['@id'] } })) },
    })),
    ...tracks.map(t => ({ ...t.trackSchema, '@context': undefined, byArtist: artistReference })),
  ],
};
fs.writeFileSync(path.join(dist, 'music-catalog.json'), JSON.stringify(musicCatalog, null, 2) + '\n');
const manifest = {
  specVersion: '1.0',
  host: { displayName: 'Aly Bouchnak', documentationUrl: `${domain}/llms.txt`, logoUrl: `${domain}/images/Aly-bouchnak-profile.webp` },
  entries: [{
    identifier: 'urn:air:alybouchnak.com:catalog:music', displayName: 'Aly Bouchnak Music Catalog',
    type: 'application/ai-catalog+json', url: `${domain}/music-discovery.json`,
    description: 'Read-only directory of official artist, album and recording resources, including release dates, ordered track lists and ISRC identifiers.',
    tags: ['music', 'discography', 'childrens-music', 'Aly Bouchnak'],
    representativeQueries: ['Which albums, EPs and singles has Aly Bouchnak released?', 'Which songs appear on The Bloom’s House: Volume 2?', 'Find the ISRC and release date of an Aly Bouchnak recording.'],
  }],
};
const resourceDirectory = {
  specVersion: manifest.specVersion, host: manifest.host,
  entries: musicCatalog['@graph'].map(resource => ({
    identifier: `urn:air:alybouchnak.com:music:${resource['@type'].toLowerCase()}:${resource['@id'].split('/').pop().split('#')[0] || 'artist'}`,
    displayName: resource.name, type: 'application/ld+json',
    data: { ...resource, '@context': 'https://schema.org' },
    description: resource.description || `Official ${resource['@type']} metadata for ${resource.name}.`,
    representativeQueries: [`Find official information about ${resource.name}.`, `Show the music catalog metadata for ${resource.name}.`],
  })),
};
fs.writeFileSync(path.join(dist, 'music-discovery.json'), JSON.stringify(resourceDirectory, null, 2) + '\n');
fs.mkdirSync(path.join(dist, '.well-known'), { recursive: true });
for (const destination of ['ai-catalog.json', '.well-known/ai-catalog.json', '.well-known/ard.json']) {
  fs.writeFileSync(path.join(dist, destination), JSON.stringify(manifest, null, 2) + '\n');
}
console.log(`Prerendered ${staticPages.length + tracks.length + albums.length + articles.length + playlists.length + themes.length} pages with visible HTML, canonical URLs and JSON-LD.`);
