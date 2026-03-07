import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ALBUMS_FILE = path.resolve(__dirname, '../src/data/albums.ts');
const TRACKS_FILE = path.resolve(__dirname, '../src/data/tracks.ts');
const PLAYLISTS_FILE = path.resolve(__dirname, '../src/data/playlists.ts');
const THEMES_FILE = path.resolve(__dirname, '../src/data/themeCollections.ts');
const ARTICLES_FILE = path.resolve(__dirname, '../src/data/articles.ts');

const STATIC_ROUTES = [
    { url: '/', priority: 1.0, changefreq: 'weekly' },
    { url: '/discography', priority: 0.9, changefreq: 'weekly' },
    { url: '/meet-the-blooms', priority: 0.8, changefreq: 'monthly' },
    { url: '/faq', priority: 0.7, changefreq: 'monthly' },
    { url: '/contact', priority: 0.6, changefreq: 'monthly' },
    { url: '/privacy-policy', priority: 0.3, changefreq: 'yearly' },
    { url: '/terms-of-service', priority: 0.3, changefreq: 'yearly' },
    { url: '/safety-policy', priority: 0.8, changefreq: 'monthly' }
];

const DOMAIN = 'https://alybouchnak.com';

function extractSlugsFromTs(filePath) {
    if (!fs.existsSync(filePath)) return [];
    const content = fs.readFileSync(filePath, 'utf8');
    const items = [];

    const slugRegex = /(?:"slug"|slug):\s*['"]([^'"]+)['"]/g;
    const dateRegex = /(?:"releaseDate"|releaseDate):\s*['"]([^'"]+)['"]/g;
    const pubDateRegex = /(?:"datePublished"|datePublished):\s*['"]([^'"]+)['"]/g;

    let slugMatch;
    while ((slugMatch = slugRegex.exec(content)) !== null) {
        // Special case for articles which use datePublished
        let dateMatch;
        if (filePath.includes('articles.ts')) {
            const subContent = content.substring(slugMatch.index, slugMatch.index + 500);
            const dMatch = pubDateRegex.exec(subContent);
            dateMatch = dMatch ? dMatch[1].split('T')[0] : null;
        } else {
            const subContent = content.substring(slugMatch.index, slugMatch.index + 500);
            const dMatch = dateRegex.exec(subContent);
            dateMatch = dMatch ? dMatch[1] : null;
        }

        items.push({
            slug: slugMatch[1],
            date: dateMatch || new Date().toISOString().split('T')[0]
        });
    }

    return items;
}

function buildSitemap() {
    const albums = extractSlugsFromTs(ALBUMS_FILE);
    const tracks = extractSlugsFromTs(TRACKS_FILE);
    const playlists = extractSlugsFromTs(PLAYLISTS_FILE);
    const themes = extractSlugsFromTs(THEMES_FILE);
    const articles = extractSlugsFromTs(ARTICLES_FILE);

    const today = new Date().toISOString().split('T')[0];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n`;

    STATIC_ROUTES.forEach(route => {
        xml += `  <url>\n    <loc>${DOMAIN}${route.url}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${route.changefreq}</changefreq>\n    <priority>${route.priority.toFixed(1)}</priority>\n  </url>\n`;
    });

    albums.forEach(a => {
        xml += `  <url>\n    <loc>${DOMAIN}/album/${a.slug}</loc>\n    <lastmod>${a.date}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
    });

    tracks.forEach(t => {
        xml += `  <url>\n    <loc>${DOMAIN}/track/${t.slug}</loc>\n    <lastmod>${t.date}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
    });

    playlists.forEach(p => {
        xml += `  <url>\n    <loc>${DOMAIN}/playlist/${p.slug}</loc>\n    <lastmod>${p.date}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
    });

    themes.forEach(t => {
        xml += `  <url>\n    <loc>${DOMAIN}/theme-collection/${t.slug}</loc>\n    <lastmod>${t.date}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
    });

    articles.forEach(a => {
        xml += `  <url>\n    <loc>${DOMAIN}/article/${a.slug}</loc>\n    <lastmod>${a.date}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.9</priority>\n  </url>\n`;
    });

    xml += `</urlset>\n`;

    const outputPath = path.resolve(__dirname, '../public/sitemap.xml');
    fs.writeFileSync(outputPath, xml);
    console.log(`Successfully generated sitemap.xml with ${STATIC_ROUTES.length + albums.length + tracks.length + playlists.length + themes.length + articles.length} URLs`);
}

buildSitemap();
