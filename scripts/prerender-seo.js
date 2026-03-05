import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Define ES Module paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const DIST_DIR = path.resolve(__dirname, '../dist');
const INDEX_HTML_PATH = path.join(DIST_DIR, 'index.html');
const ALBUMS_FILE = path.resolve(__dirname, '../src/data/albums.ts');
const TRACKS_FILE = path.resolve(__dirname, '../src/data/tracks.ts');

const DOMAIN = 'https://alybouchnak.com';

// Same extraction technique as generate-sitemap.js to avoid ts-node
function extractDataFromTs(filePath, type) {
    const content = fs.readFileSync(filePath, 'utf8');
    let items = [];

    // A simplistic parse that captures blocks of objects
    const blocks = content.split('id:');
    blocks.shift(); // Remove the first chunk before the first 'id:'

    blocks.forEach(block => {
        try {
            // Basic extraction of strings via regex relative to each object block
            // Group 1 is the quote type, Group 2 is the actual string
            const getVal = (regex) => {
                const match = regex.exec(block);
                return match ? (match[2] || match[1]) : ''; // Handle both `(["'])(.*?)\1` and `backtick`
            };

            const slug = getVal(/slug:\s*(["'])(.*?)\1/);
            const title = getVal(/title:\s*(["'])(.*?)\1/);
            let desc = getVal(/description:\s*(["'])(.*?)\1/);
            if (!desc) desc = getVal(/description:\s*`([^`]+)`/); // Catch template literals
            const cover = getVal(/coverImage:\s*(["'])(.*?)\1/) || getVal(/cover:\s*(["'])(.*?)\1/);

            if (slug && title) {
                items.push({
                    slug,
                    title,
                    description: desc || `Listen to ${title} by Aly Bouchnak.`,
                    image: cover.startsWith('/') ? `${DOMAIN}${cover}` : `${DOMAIN}/${cover}`,
                    type
                });
            }
        } catch (e) { /* Ignore parse errors on complex objects and move to next */ }
    });

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

    // Add static pages that need custom SEO injection
    const staticPages = [
        {
            slug: 'privacy-policy',
            title: "Privacy Policy | Aly Bouchnak - The Bloom's House",
            description: "Learn about how we protect your family's privacy at The Bloom's House. Our Kids-First data commitment and COPPA/GDPR compliance.",
            image: `${DOMAIN}/images/Aly-bouchnak-profile.webp`,
            type: 'page'
        },
        {
            slug: 'terms-of-service',
            title: "Terms of Service | Aly Bouchnak - The Bloom's House",
            description: "Review the terms of service for The Bloom's House. Guidelines for parents, intellectual property, and community standards.",
            image: `${DOMAIN}/images/Aly-bouchnak-profile.webp`,
            type: 'page'
        }
    ];

    const allMedia = [...albums, ...tracks, ...staticPages];

    console.log(`Starting SSG Process for ${allMedia.length} routes...`);

    allMedia.forEach(media => {
        // Determine output directory e.g., dist/album/the-blooms-house-volume-1
        const routePath = media.type === 'page' ? media.slug : path.join(media.type, media.slug);
        const routeDir = path.join(DIST_DIR, routePath);

        // Create folders
        fs.mkdirSync(routeDir, { recursive: true });

        const fullUrl = `${DOMAIN}/${routePath}`;

        // Schema.org generation matching SEO.tsx structure
        const schemaObj = {
            "@context": "https://schema.org",
            "@type": media.type === 'album' ? 'MusicAlbum' : 'MusicRecording',
            "name": media.title,
            "byArtist": {
                "@type": "MusicGroup",
                "name": "Aly Bouchnak"
            },
            "image": media.image,
            "description": media.description,
            "url": fullUrl
        };

        // Inject Meta Tags using replace string manipulation
        let injectedHtml = baseHtml;

        // 1. Replace Title
        injectedHtml = injectedHtml.replace(
            /<title>(.*?)<\/title>/g,
            `<title>${media.title} | Aly Bouchnak</title>`
        );

        // 2. Replace basic Description
        injectedHtml = injectedHtml.replace(
            /<meta name="description" content="(.*?)"([^>]*)>/g,
            `<meta name="description" content="${media.description}"$2>`
        );

        // 3. Replace OG Tags
        injectedHtml = injectedHtml.replace(
            /<meta property="og:title" content="(.*?)"([^>]*)>/g,
            `<meta property="og:title" content="${media.title} | Aly Bouchnak"$2>`
        );
        injectedHtml = injectedHtml.replace(
            /<meta property="og:description" content="(.*?)"([^>]*)>/g,
            `<meta property="og:description" content="${media.description}"$2>`
        );
        injectedHtml = injectedHtml.replace(
            /<meta property="og:image" content="(.*?)"([^>]*)>/g,
            `<meta property="og:image" content="${media.image}"$2>`
        );
        injectedHtml = injectedHtml.replace(
            /<meta property="og:url" content="(.*?)"([^>]*)>/g,
            `<meta property="og:url" content="${fullUrl}"$2>`
        );
        injectedHtml = injectedHtml.replace(
            /<meta property="og:type" content="(.*?)"([^>]*)>/g,
            `<meta property="og:type" content="${media.type === 'album' ? 'music.album' : media.type === 'track' ? 'music.song' : 'website'}"$2>`
        );

        // 4. Replace Twitter Tags
        injectedHtml = injectedHtml.replace(
            /<meta name="twitter:title" content="(.*?)"([^>]*)>/g,
            `<meta name="twitter:title" content="${media.title}"$2>`
        );
        injectedHtml = injectedHtml.replace(
            /<meta name="twitter:description" content="(.*?)"([^>]*)>/g,
            `<meta name="twitter:description" content="${media.description}"$2>`
        );
        injectedHtml = injectedHtml.replace(
            /<meta name="twitter:image" content="(.*?)"([^>]*)>/g,
            `<meta name="twitter:image" content="${media.image}"$2>`
        );
        injectedHtml = injectedHtml.replace(
            /<meta name="twitter:url" content="(.*?)"([^>]*)>/g,
            `<meta name="twitter:url" content="${fullUrl}"$2>`
        );

        // 5. Inject Json-LD Schema into Head
        const schemaScript = `\n    <script type="application/ld+json" data-seo="schema">\n      ${JSON.stringify(schemaObj, null, 2)}\n    </script>\n  </head>`;
        injectedHtml = injectedHtml.replace('</head>', schemaScript);

        // Write final static file
        const outPath = path.join(routeDir, 'index.html');
        fs.writeFileSync(outPath, injectedHtml);
    });

    console.log(`✅ Successfully generated ${allMedia.length} static SEO pages!`);
}

processSSG();
