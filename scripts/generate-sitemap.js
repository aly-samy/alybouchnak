import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Define ___dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import data dynamically using dynamic import since these are TypeScript files 
// and we're building before we run Vite. The easiest way is to use a regex or register ts-node.
// Since we don't have ts-node or want to add heaviness, we can read the raw TS files 
// and regex out the slugs/dates.

const ALBUMS_FILE = path.resolve(__dirname, '../src/data/albums.ts');
const TRACKS_FILE = path.resolve(__dirname, '../src/data/tracks.ts');

const STATIC_ROUTES = [
    { url: '/', priority: 1.0, changefreq: 'weekly' },
    { url: '/discography', priority: 0.9, changefreq: 'weekly' },
    { url: '/meet-the-blooms', priority: 0.8, changefreq: 'monthly' },
    { url: '/faq', priority: 0.7, changefreq: 'monthly' },
    { url: '/contact', priority: 0.6, changefreq: 'monthly' },
    { url: '/privacy-policy', priority: 0.3, changefreq: 'yearly' },
    { url: '/terms-of-service', priority: 0.3, changefreq: 'yearly' }
];

const DOMAIN = 'https://alybouchnak.com';

function extractSlugsFromTs(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const items = [];

    // Regex to extract slug and releaseDate from the object structures
    const slugRegex = /slug:\s*['"]([^'"]+)['"]/g;
    const dateRegex = /releaseDate:\s*['"]([^'"]+)['"]/g;

    let slugMatch, dateMatch;
    while ((slugMatch = slugRegex.exec(content)) !== null) {
        // Attempting to match date in the same proximate block 
        // This is simple so we just grab the next date match
        dateMatch = dateRegex.exec(content);

        items.push({
            slug: slugMatch[1],
            date: dateMatch ? dateMatch[1] : new Date().toISOString().split('T')[0]
        });
    }

    return items;
}

function buildSitemap() {
    const albums = extractSlugsFromTs(ALBUMS_FILE);
    const tracks = extractSlugsFromTs(TRACKS_FILE);

    const today = new Date().toISOString().split('T')[0];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n`;

    // Add static routes
    STATIC_ROUTES.forEach(route => {
        xml += `  <url>\n`;
        xml += `    <loc>${DOMAIN}${route.url}</loc>\n`;
        xml += `    <lastmod>${today}</lastmod>\n`;
        xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
        xml += `    <priority>${route.priority.toFixed(1)}</priority>\n`;
        xml += `  </url>\n`;
    });

    // Add Album routes
    albums.forEach(album => {
        xml += `  <url>\n`;
        xml += `    <loc>${DOMAIN}/album/${album.slug}</loc>\n`;
        xml += `    <lastmod>${album.date}</lastmod>\n`;
        xml += `    <changefreq>monthly</changefreq>\n`;
        xml += `    <priority>0.8</priority>\n`;
        xml += `  </url>\n`;
    });

    // Add Track routes
    tracks.forEach(track => {
        xml += `  <url>\n`;
        xml += `    <loc>${DOMAIN}/track/${track.slug}</loc>\n`;
        xml += `    <lastmod>${track.date}</lastmod>\n`;
        xml += `    <changefreq>monthly</changefreq>\n`;
        xml += `    <priority>0.7</priority>\n`;
        xml += `  </url>\n`;
    });

    xml += `</urlset>`;

    const outputPath = path.resolve(__dirname, '../public/sitemap.xml');
    fs.writeFileSync(outputPath, xml);
    console.log(`Successfully generated sitemap.xml with ${STATIC_ROUTES.length + albums.length + tracks.length} URLs at ${outputPath}`);
}

buildSitemap();
