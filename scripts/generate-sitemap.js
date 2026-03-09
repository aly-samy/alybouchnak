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
    { url: '/about', priority: 0.8, changefreq: 'monthly' },
    { url: '/epk', priority: 0.7, changefreq: 'monthly' },
    { url: '/articles', priority: 0.8, changefreq: 'weekly' },
    { url: '/privacy-policy', priority: 0.3, changefreq: 'yearly' },
    { url: '/terms-of-service', priority: 0.3, changefreq: 'yearly' },
    { url: '/safety-policy', priority: 0.8, changefreq: 'monthly' }
];

const DOMAIN = 'https://alybouchnak.com';

function extractSlugsFromTs(filePath) {
    if (!fs.existsSync(filePath)) return [];

    // Use dynamic import or a simpler regex match to get slugs.
    // The previous implementation had scoping issues and incorrect date extraction logic.
    const content = fs.readFileSync(filePath, 'utf8');
    const items = [];

    // Find all occurrences of slug: "something" or slug: 'something'
    const slugRegex = /slug:\s*['"]([^'"]+)['"]/g;
    let match;

    while ((match = slugRegex.exec(content)) !== null) {
        const slug = match[1];

        // Find the block of text around this slug to look for a date
        const blockStart = Math.max(0, match.index - 200);
        const blockEnd = Math.min(content.length, match.index + 500);
        const block = content.substring(blockStart, blockEnd);

        // Try to find releaseDate or datePublished near the slug
        const dateMatch = block.match(/(?:releaseDate|datePublished):\s*['"]([^T'"]+)(?:T[^'"]*)?['"]/);
        const date = dateMatch ? dateMatch[1] : new Date().toISOString().split('T')[0];

        items.push({ slug, date });
    }

    return items;
}

function extractArticlesWithDetails(filePath) {
    if (!fs.existsSync(filePath)) return [];

    const content = fs.readFileSync(filePath, 'utf8');
    const items = [];

    const slugRegex = /slug:\s*['"]([^'"]+)['"]/g;
    let match;

    while ((match = slugRegex.exec(content)) !== null) {
        const slug = match[1];

        // Find the block of text around this slug (increased range for long content strings)
        const blockStart = Math.max(0, match.index - 500);
        const blockEnd = Math.min(content.length, match.index + 3000);
        const block = content.substring(blockStart, blockEnd);

        const typeMatch = block.match(/type:\s*['"]([^'"]+)['"]/);
        const type = typeMatch ? typeMatch[1] : '';

        const titleMatch = block.match(/title:\s*['"](.*?)['"],/);
        const title = titleMatch ? titleMatch[1].replace(/\\'/g, "'").replace(/\\"/g, '"') : slug;

        const dateMatch = block.match(/datePublished:\s*['"]([^'"]+)['"]/);
        const rawDate = dateMatch ? dateMatch[1] : new Date().toISOString();

        items.push({ slug, type, title, rawDate });
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
        xml += `  <url>\n    <loc>${DOMAIN}/album/${a.slug}</loc>\n    <lastmod>${a.date}</lastmod>\n    <priority>0.8</priority>\n  </url>\n`;
    });

    tracks.forEach(t => {
        xml += `  <url>\n    <loc>${DOMAIN}/track/${t.slug}</loc>\n    <lastmod>${t.date}</lastmod>\n    <priority>0.7</priority>\n  </url>\n`;
    });

    playlists.forEach(p => {
        xml += `  <url>\n    <loc>${DOMAIN}/playlist/${p.slug}</loc>\n    <lastmod>${p.date}</lastmod>\n    <priority>0.8</priority>\n  </url>\n`;
    });

    themes.forEach(t => {
        xml += `  <url>\n    <loc>${DOMAIN}/theme-collection/${t.slug}</loc>\n    <lastmod>${t.date}</lastmod>\n    <priority>0.8</priority>\n  </url>\n`;
    });

    articles.forEach(a => {
        xml += `  <url>\n    <loc>${DOMAIN}/article/${a.slug}</loc>\n    <lastmod>${a.date}</lastmod>\n    <priority>0.9</priority>\n  </url>\n`;
    });

    xml += `</urlset>`;

    const outputPath = path.resolve(__dirname, '../public/sitemap.xml');
    fs.writeFileSync(outputPath, xml);
    console.log(`Successfully generated sitemap.xml with ${STATIC_ROUTES.length + albums.length + tracks.length + playlists.length + themes.length + articles.length} URLs`);
}

function buildNewsSitemap() {
    const articles = extractArticlesWithDetails(ARTICLES_FILE);
    const now = new Date();
    const fortyEightHoursAgo = new Date(now.getTime() - 48 * 60 * 60 * 1000);

    const newsArticles = articles.filter(a => {
        if (a.type !== 'NewsArticle') return false;
        const pubDate = new Date(a.rawDate);
        return pubDate >= fortyEightHoursAgo && pubDate <= now;
    });

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">\n`;

    newsArticles.forEach(a => {
        xml += `  <url>\n`;
        xml += `    <loc>${DOMAIN}/article/${a.slug}</loc>\n`;
        xml += `    <news:news>\n`;
        xml += `      <news:publication>\n`;
        xml += `        <news:name>Aly Bouchnak</news:name>\n`;
        xml += `        <news:language>en</news:language>\n`;
        xml += `      </news:publication>\n`;
        xml += `      <news:publication_date>${a.rawDate}</news:publication_date>\n`;
        xml += `      <news:title>${a.title}</news:title>\n`;
        xml += `    </news:news>\n`;
        xml += `  </url>\n`;
    });
    xml += `</urlset>`;

    const outputPath = path.resolve(__dirname, '../public/news-sitemap.xml');
    fs.writeFileSync(outputPath, xml);
    console.log(`Successfully generated news-sitemap.xml with ${newsArticles.length} URLs`);
}

buildSitemap();
buildNewsSitemap();

