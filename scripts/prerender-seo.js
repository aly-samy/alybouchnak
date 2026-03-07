import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.resolve(__dirname, '../dist');
const INDEX_HTML_PATH = path.join(DIST_DIR, 'index.html');
const DOMAIN = 'https://alybouchnak.com';

const ALBUMS_FILE = path.resolve(__dirname, '../src/data/albums.ts');
const TRACKS_FILE = path.resolve(__dirname, '../src/data/tracks.ts');
const PLAYLISTS_FILE = path.resolve(__dirname, '../src/data/playlists.ts');
const THEMES_FILE = path.resolve(__dirname, '../src/data/themeCollections.ts');
const ARTICLES_FILE = path.resolve(__dirname, '../src/data/articles.ts');

function extractDataFromTs(filePath, type) {
    if (!fs.existsSync(filePath)) return [];

    // We'll use dynamic regex to extract blocks that have a `slug` so we know it's a valid object
    const content = fs.readFileSync(filePath, 'utf8');
    const items = [];

    // Find all occurrences of slug: "something", 'slug': 'something', etc.
    const slugRegex = /['"]?slug['"]?:\s*['"]([^'"]+)['"]/g;
    let match;
    let fileMatchCount = 0;

    while ((match = slugRegex.exec(content)) !== null) {
        const slug = match[1];

        // Find the block of text around this slug
        const blockStart = Math.max(0, match.index - 200);
        const blockEnd = Math.min(content.length, match.index + 800);
        const block = content.substring(blockStart, blockEnd);

        // Extract basic data using regex
        const getVal = (regex) => {
            const m = regex.exec(block);
            return m ? (m[2] || m[1]) : '';
        };

        const title = getVal(/['"]?(?:title|headline)['"]?:\s*(["'])(.*?)\1/);
        let desc = getVal(/['"]?description['"]?:\s*(["'])(.*?)\1/);
        if (!desc) desc = getVal(/['"]?description['"]?:\s*`([^`]+)`/);

        // Image URL could be coverImage: "url" or within an object coverImage: { url: "..." }
        let cover = getVal(/['"]?(?:coverImage|image)['"]?[\s\w{:]*?['"]?url['"]?:\s*(["'])(.*?)\1/);
        if (!cover) cover = getVal(/['"]?(?:coverImage|image)['"]?:\s*(["'])(.*?)\1/);

        if (slug && title) {
            fileMatchCount++;
            items.push({
                slug,
                title,
                description: desc || `Explore ${title} - Guilt-free entertainment for modern families.`,
                image: cover ? (cover.startsWith('http') ? cover : (cover.startsWith('/') ? `${DOMAIN}${cover}` : `${DOMAIN}/${cover}`)) : `${DOMAIN}/images/placeholder.webp`,
                type
            });
        }
    }

    console.log(`Extracted ${fileMatchCount} items from ${path.basename(filePath)}`);

    return items;
}

function processSSG() {
    if (!fs.existsSync(INDEX_HTML_PATH)) {
        console.error(`ERROR: Could not find ${INDEX_HTML_PATH}. Run vite build first.`);
        return;
    }

    const baseHtml = fs.readFileSync(INDEX_HTML_PATH, 'utf8');

    const albums = extractDataFromTs(ALBUMS_FILE, 'album');
    const tracks = extractDataFromTs(TRACKS_FILE, 'track');
    const playlists = extractDataFromTs(PLAYLISTS_FILE, 'playlist');
    const themes = extractDataFromTs(THEMES_FILE, 'theme-collection');
    const articles = extractDataFromTs(ARTICLES_FILE, 'article');

    const staticPages = [
        { slug: 'privacy-policy', title: "Privacy Policy | Aly Bouchnak", description: "Our commitment to kid-first data privacy.", image: `${DOMAIN}/images/Aly-bouchnak-profile.webp`, type: 'page' },
        { slug: 'terms-of-service', title: "Terms of Service | Aly Bouchnak", description: "Guidelines for our community.", image: `${DOMAIN}/images/Aly-bouchnak-profile.webp`, type: 'page' },
        { slug: 'safety-policy', title: "Safety & Values | Aly Bouchnak", description: "Our Guilt-Free entertainment commitment.", image: `${DOMAIN}/images/Blooms-Safety-Seal.webp`, type: 'page' }
    ];

    const allMedia = [...albums, ...tracks, ...playlists, ...themes, ...articles, ...staticPages];

    console.log(`Prerendering ${allMedia.length} routes...`);

    allMedia.forEach(media => {
        const routePath = media.type === 'page' ? media.slug : path.join(media.type, media.slug);
        const routeDir = path.join(DIST_DIR, routePath);
        fs.mkdirSync(routeDir, { recursive: true });

        const fullUrl = `${DOMAIN}/${routePath}`;
        let injectedHtml = baseHtml;

        // Inject Meta
        injectedHtml = injectedHtml.replace(/<title>(.*?)<\/title>/g, `<title>${media.title} | Aly Bouchnak</title>`);
        injectedHtml = injectedHtml.replace(/<meta name="description" content="(.*?)"([^>]*)>/g, `<meta name="description" content="${media.description.substring(0, 160)}"$2>`);
        injectedHtml = injectedHtml.replace(/<meta property="og:title" content="(.*?)"([^>]*)>/g, `<meta property="og:title" content="${media.title} | Aly Bouchnak"$2>`);
        injectedHtml = injectedHtml.replace(/<meta property="og:description" content="(.*?)"([^>]*)>/g, `<meta property="og:description" content="${media.description.substring(0, 160)}"$2>`);
        injectedHtml = injectedHtml.replace(/<meta property="og:image" content="(.*?)"([^>]*)>/g, `<meta property="og:image" content="${media.image}"$2>`);
        injectedHtml = injectedHtml.replace(/<meta property="og:url" content="(.*?)"([^>]*)>/g, `<meta property="og:url" content="${fullUrl}"$2>`);

        let ogType = 'website';
        if (media.type === 'album') ogType = 'music.album';
        if (media.type === 'track') ogType = 'music.song';
        if (media.type === 'article') ogType = 'article';

        injectedHtml = injectedHtml.replace(/<meta property="og:type" content="(.*?)"([^>]*)>/g, `<meta property="og:type" content="${ogType}"$2>`);

        // Inject simplified schema for all
        const schema = {
            "@context": "https://schema.org",
            "@type": media.type === 'album' ? 'MusicAlbum' : (media.type === 'track' ? 'MusicRecording' : (media.type === 'article' ? 'NewsArticle' : 'WebPage')),
            "name": media.title,
            "description": media.description,
            "image": media.image,
            "url": fullUrl
        };

        const schemaScript = `\n    <script type="application/ld+json">\n      ${JSON.stringify(schema)}\n    </script>\n  </head>`;
        injectedHtml = injectedHtml.replace('</head>', schemaScript);

        fs.writeFileSync(path.join(routeDir, 'index.html'), injectedHtml);
    });

    console.log(`✅ SSG Complete!`);
}

processSSG();
