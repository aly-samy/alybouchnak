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

const STATIC_ROUTES = [
    { slug: 'privacy-policy', title: 'Privacy Policy', description: 'Our commitment to kid-first data privacy.', image: `${DOMAIN}/images/Aly-bouchnak-profile.webp`, type: 'page' },
    { slug: 'terms-of-service', title: 'Terms of Service', description: 'Guidelines for our community.', image: `${DOMAIN}/images/Aly-bouchnak-profile.webp`, type: 'page' },
    { slug: 'safety-policy', title: 'Safety & Values', description: 'Our Guilt-Free entertainment commitment.', image: `${DOMAIN}/images/Blooms-Safety-Seal.webp`, type: 'page' }
];

// ─── REGEX HELPERS ───
function getVal(block, regex) {
    const m = regex.exec(block);
    return m ? (m[2] || m[1] || '') : '';
}

function getArrayItems(block, key) {
    // Extract simple array of objects: "key": [ { "title": "X", "description": "Y" }, ... ]
    const regex = new RegExp(`["']?${key}["']?:\\s*\\[`, 'i');
    const match = regex.exec(block);
    if (!match) return [];

    const startIdx = match.index + match[0].length;
    let depth = 1;
    let idx = startIdx;
    while (idx < block.length && depth > 0) {
        if (block[idx] === '[') depth++;
        if (block[idx] === ']') depth--;
        idx++;
    }
    const arrayStr = block.substring(startIdx, idx - 1);

    // Extract objects from the array
    const items = [];
    const objRegex = /\{[^{}]*\}/g;
    let objMatch;
    while ((objMatch = objRegex.exec(arrayStr)) !== null) {
        const objStr = objMatch[0];
        const title = getVal(objStr, /["']?title["']?:\s*["']([^"']+)["']/);
        const desc = getVal(objStr, /["']?description["']?:\s*["']([^"']+)["']/);
        if (title || desc) items.push({ title, description: desc });
    }
    return items;
}

function getStringArray(block, key) {
    const regex = new RegExp(`["']?${key}["']?:\\s*\\[`, 'i');
    const match = regex.exec(block);
    if (!match) return [];

    const startIdx = match.index + match[0].length;
    let depth = 1;
    let idx = startIdx;
    while (idx < block.length && depth > 0) {
        if (block[idx] === '[') depth++;
        if (block[idx] === ']') depth--;
        idx++;
    }
    const arrayStr = block.substring(startIdx, idx - 1);
    const items = [];
    const strRegex = /["']([^"']+)["']/g;
    let strMatch;
    while ((strMatch = strRegex.exec(arrayStr)) !== null) {
        items.push(strMatch[1]);
    }
    return items;
}

// ─── FULL DATA EXTRACTION ───
function extractFullData(filePath, type) {
    if (!fs.existsSync(filePath)) return [];

    const content = fs.readFileSync(filePath, 'utf8');
    const items = [];

    const slugRegex = /["']?slug["']?:\s*["']([^"']+)["']/g;
    let match;

    while ((match = slugRegex.exec(content)) !== null) {
        const slug = match[1];

        // Grab a large block around the slug (each track is ~1500 chars)
        const blockStart = Math.max(0, match.index - 300);
        const blockEnd = Math.min(content.length, match.index + 3000);
        const block = content.substring(blockStart, blockEnd);

        const title = getVal(block, /["']?title["']?:\s*(["'])(.*?)\1/) || slug;
        const subtitle = getVal(block, /["']?subtitle["']?:\s*(["'])(.*?)\1/);
        let desc = getVal(block, /["']?description["']?:\s*(["'])(.*?)\1/);
        if (!desc) desc = getVal(block, /["']?description["']?:\s*`([^`]+)`/);

        let cover = getVal(block, /["']?(?:coverImage|image)["']?[\s\w{:]*?["']?url["']?:\s*(["'])(.*?)\1/);
        if (!cover) cover = getVal(block, /["']?(?:coverImage|image)["']?:\s*(["'])(.*?)\1/);
        const image = cover ? (cover.startsWith('http') ? cover : `${DOMAIN}${cover.startsWith('/') ? '' : '/'}${cover}`) : `${DOMAIN}/images/placeholder.webp`;

        const artist = getVal(block, /["']?artist["']?:\s*(["'])(.*?)\1/) || 'Aly Bouchnak';
        const duration = getVal(block, /["']?duration["']?:\s*(["'])(.*?)\1/);
        const bpm = getVal(block, /["']?bpm["']?:\s*(\d+)/);
        const genre = getVal(block, /["']?genre["']?:\s*(["'])(.*?)\1/);
        const ageRange = getVal(block, /["']?ageRange["']?:\s*(["'])(.*?)\1/);
        const mood = getVal(block, /["']?mood["']?:\s*(["'])(.*?)\1/);
        const routine = getVal(block, /["']?routine["']?:\s*(["'])(.*?)\1/);
        const releaseDate = getVal(block, /["']?releaseDate["']?:\s*(["'])(.*?)\1/);
        const isrc = getVal(block, /["']?isrc["']?:\s*(["'])(.*?)\1/);

        const spotifyUrl = getVal(block, /["']?spotifyUrl["']?:\s*(["'])(.*?)\1/);
        const appleMusicUrl = getVal(block, /["']?appleMusicUrl["']?:\s*(["'])(.*?)\1/);
        const youtubeUrl = getVal(block, /["']?youtubeUrl["']?:\s*(["'])(.*?)\1/);
        const amazonUrl = getVal(block, /["']?amazonUrl["']?:\s*(["'])(.*?)\1/);

        const album = getVal(block, /["']?album["']?:\s*(["'])(.*?)\1/);
        const albumUrl = getVal(block, /["']?albumUrl["']?:\s*(["'])(.*?)\1/);

        const lyricsPreview = getStringArray(block, 'lyricsPreview');
        const lyricsFull = getVal(block, /["']?lyricsFull["']?:\s*(["'])((?:\\.|.)*?)\1/);
        const educationalBenefits = getArrayItems(block, 'educationalBenefits');

        const category = getVal(block, /["']?category["']?:\s*(["'])(.*?)\1/);
        const datePublished = getVal(block, /["']?datePublished["']?:\s*(["'])(.*?)\1/);
        const trackCount = getVal(block, /["']?trackCount["']?:\s*(\d+)/);

        items.push({
            slug, title, subtitle, description: desc || `Explore ${title} by Aly Bouchnak.`,
            image, artist, duration, bpm, genre, ageRange, mood, routine, releaseDate,
            isrc, spotifyUrl, appleMusicUrl, youtubeUrl, amazonUrl,
            album, albumUrl, lyricsPreview, lyricsFull, educationalBenefits,
            category, datePublished, trackCount, type
        });
    }

    console.log(`  Extracted ${items.length} ${type}s from ${path.basename(filePath)}`);
    return items;
}

// ─── STATIC HTML GENERATORS ───
function escapeHtml(str) {
    return (str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function generateTrackHtml(item) {
    const benefits = item.educationalBenefits.map(b =>
        `<li><strong>${escapeHtml(b.title)}</strong>: ${escapeHtml(b.description)}</li>`
    ).join('\n            ');

    const lyrics = item.lyricsFull
        ? item.lyricsFull.replace(/\\n/g, '\n').split('\n').map(l => `<p>${escapeHtml(l) || '&nbsp;'}</p>`).join('\n            ')
        : item.lyricsPreview.map(l => `<p>${escapeHtml(l)}</p>`).join('\n            ');

    const streamingLinks = [
        item.spotifyUrl && !item.spotifyUrl.includes('Placeholder') ? `<a href="${item.spotifyUrl}">Listen on Spotify</a>` : '',
        item.appleMusicUrl && !item.appleMusicUrl.includes('Placeholder') ? `<a href="${item.appleMusicUrl}">Listen on Apple Music</a>` : '',
        item.youtubeUrl && !item.youtubeUrl.includes('Placeholder') ? `<a href="${item.youtubeUrl}">Watch on YouTube</a>` : '',
        item.amazonUrl && !item.amazonUrl.includes('Placeholder') ? `<a href="${item.amazonUrl}">Listen on Amazon Music</a>` : '',
    ].filter(Boolean).join(' · ');

    return `
    <article itemscope itemtype="https://schema.org/MusicRecording">
        <nav aria-label="Breadcrumb"><a href="/">Aly Bouchnak</a> › <a href="/discography">Discography</a> › ${escapeHtml(item.title)}</nav>
        <h1 itemprop="name">${escapeHtml(item.title)}</h1>
        ${item.subtitle ? `<h2>${escapeHtml(item.subtitle)}</h2>` : ''}
        <p itemprop="description">${escapeHtml(item.description)}</p>
        <img src="${item.image}" alt="${escapeHtml(item.title)} cover art" itemprop="image" width="400" height="400" />
        <dl>
            <dt>Artist</dt><dd itemprop="byArtist">${escapeHtml(item.artist)}</dd>
            ${item.album ? `<dt>Album</dt><dd><a href="${item.albumUrl}">${escapeHtml(item.album)}</a></dd>` : ''}
            ${item.duration ? `<dt>Duration</dt><dd itemprop="duration">${item.duration}</dd>` : ''}
            ${item.bpm ? `<dt>BPM</dt><dd>${item.bpm}</dd>` : ''}
            ${item.genre ? `<dt>Genre</dt><dd itemprop="genre">${escapeHtml(item.genre)}</dd>` : ''}
            ${item.ageRange ? `<dt>Age Range</dt><dd>${escapeHtml(item.ageRange)}</dd>` : ''}
            ${item.mood ? `<dt>Mood</dt><dd>${escapeHtml(item.mood)}</dd>` : ''}
            ${item.routine ? `<dt>Best For</dt><dd>${escapeHtml(item.routine)}</dd>` : ''}
            ${item.releaseDate ? `<dt>Release Date</dt><dd itemprop="datePublished">${item.releaseDate.split('T')[0]}</dd>` : ''}
        </dl>
        ${lyrics ? `<section aria-label="Lyrics"><h2>Lyrics</h2>${lyrics}</section>` : ''}
        ${benefits ? `<section aria-label="Educational Benefits"><h2>Educational Benefits</h2><ul>${benefits}</ul></section>` : ''}
        ${streamingLinks ? `<section aria-label="Listen"><h2>Listen Now</h2><p>${streamingLinks}</p></section>` : ''}
    </article>`;
}

function generateAlbumHtml(item) {
    const benefits = item.educationalBenefits.map(b =>
        `<li><strong>${escapeHtml(b.title)}</strong>: ${escapeHtml(b.description)}</li>`
    ).join('\n            ');

    return `
    <article itemscope itemtype="https://schema.org/MusicAlbum">
        <nav aria-label="Breadcrumb"><a href="/">Aly Bouchnak</a> › <a href="/discography">Discography</a> › ${escapeHtml(item.title)}</nav>
        <h1 itemprop="name">${escapeHtml(item.title)}</h1>
        ${item.subtitle ? `<h2>${escapeHtml(item.subtitle)}</h2>` : ''}
        <p itemprop="description">${escapeHtml(item.description)}</p>
        <img src="${item.image}" alt="${escapeHtml(item.title)} album cover" itemprop="image" width="400" height="400" />
        <dl>
            <dt>Artist</dt><dd itemprop="byArtist">${escapeHtml(item.artist)}</dd>
            ${item.trackCount ? `<dt>Tracks</dt><dd itemprop="numTracks">${item.trackCount}</dd>` : ''}
            ${item.duration ? `<dt>Duration</dt><dd>${item.duration}</dd>` : ''}
            ${item.genre ? `<dt>Genre</dt><dd itemprop="genre">${escapeHtml(item.genre)}</dd>` : ''}
            ${item.ageRange ? `<dt>Age Range</dt><dd>${escapeHtml(item.ageRange)}</dd>` : ''}
            ${item.releaseDate ? `<dt>Release Date</dt><dd itemprop="datePublished">${item.releaseDate.split('T')[0]}</dd>` : ''}
        </dl>
        ${benefits ? `<section aria-label="Educational Benefits"><h2>Educational Benefits</h2><ul>${benefits}</ul></section>` : ''}
    </article>`;
}

function generateArticleHtml(item) {
    return `
    <article itemscope itemtype="https://schema.org/Article">
        <nav aria-label="Breadcrumb"><a href="/">Aly Bouchnak</a> › <a href="/articles">Articles</a> › ${escapeHtml(item.title)}</nav>
        <h1 itemprop="headline">${escapeHtml(item.title)}</h1>
        ${item.category ? `<span>${escapeHtml(item.category)}</span>` : ''}
        <p itemprop="description">${escapeHtml(item.description)}</p>
        <img src="${item.image}" alt="${escapeHtml(item.title)}" itemprop="image" width="800" height="600" />
        ${item.datePublished ? `<time itemprop="datePublished" datetime="${item.datePublished}">${item.datePublished.split('T')[0]}</time>` : ''}
        <span itemprop="author">${escapeHtml(item.artist)}</span>
    </article>`;
}

function generateGenericHtml(item) {
    return `
    <article>
        <nav aria-label="Breadcrumb"><a href="/">Aly Bouchnak</a> › ${escapeHtml(item.title)}</nav>
        <h1>${escapeHtml(item.title)}</h1>
        <p>${escapeHtml(item.description)}</p>
        <img src="${item.image}" alt="${escapeHtml(item.title)}" width="400" height="400" />
    </article>`;
}

// ─── RICH SCHEMA GENERATORS ───
function generateTrackSchema(item) {
    const routineToTeaches = {
        'Mealtime': ['Positive mealtime associations', 'Healthy eating habits', 'Cooperation during family routines'],
        'Playtime': ['Gross motor development', 'Imaginative play', 'Physical coordination'],
        'Bedtime': ['Self-soothing techniques', 'Relaxation', 'Healthy sleep routines'],
        'Cleanup': ['Responsibility', 'Following instructions', 'Organization skills'],
        'Transition': ['Emotional regulation', 'Adapting to change', 'Social confidence'],
        'Learning': ['Cognitive development', 'Memory retention', 'Language skills'],
        'Celebration': ['Social bonding', 'Joyful expression', 'Cultural participation'],
        'Movement': ['Physical coordination', 'Body awareness', 'Rhythmic skills'],
    };

    const teaches = item.educationalBenefits.map(b => b.title);
    if (item.routine && routineToTeaches[item.routine]) {
        routineToTeaches[item.routine].forEach(t => {
            if (!teaches.includes(t)) teaches.push(t);
        });
    }

    const offers = [];
    if (item.spotifyUrl && !item.spotifyUrl.includes('Placeholder')) {
        offers.push({ "@type": "Offer", "url": item.spotifyUrl, "seller": { "@type": "Organization", "name": "Spotify" } });
    }
    if (item.appleMusicUrl && !item.appleMusicUrl.includes('Placeholder')) {
        offers.push({ "@type": "Offer", "url": item.appleMusicUrl, "seller": { "@type": "Organization", "name": "Apple Music" } });
    }
    if (item.amazonUrl && !item.amazonUrl.includes('Placeholder')) {
        offers.push({ "@type": "Offer", "url": item.amazonUrl, "seller": { "@type": "Organization", "name": "Amazon Music" } });
    }

    const durationISO = item.duration ? `PT${item.duration.replace(':', 'M')}S` : '';
    const url = `${DOMAIN}/track/${item.slug}`;

    const graph = [
        // 1. Enhanced MusicRecording
        {
            "@type": ["MusicRecording", "LearningResource"],
            "@id": `${url}#recording`,
            "name": item.title,
            "url": url,
            "description": item.description,
            "image": item.image,
            ...(durationISO && { "duration": durationISO }),
            "genre": item.genre ? item.genre.split(',').map(g => g.trim()) : ["Children's Music"],
            "byArtist": { "@type": "MusicGroup", "name": item.artist, "url": DOMAIN },
            ...(item.album && { "inAlbum": { "@type": "MusicAlbum", "name": item.album, "@id": `${DOMAIN}${item.albumUrl}` } }),
            ...(item.releaseDate && { "datePublished": item.releaseDate.split('T')[0] }),
            ...(item.isrc && item.isrc !== 'TBD' && { "isrcCode": item.isrc }),
            ...(item.ageRange && { "educationalLevel": `Ages ${item.ageRange}` }),
            ...(teaches.length > 0 && { "teaches": teaches }),
            ...(item.routine && { "educationalUse": `Supporting ${item.routine.toLowerCase()} routines through music` }),
            "audience": { "@type": "Audience", "audienceType": "Parents of toddlers and preschoolers" },
            ...(item.spotifyUrl && !item.spotifyUrl.includes('Placeholder') && {
                "audio": { "@type": "AudioObject", "contentUrl": item.spotifyUrl, "encodingFormat": "audio/mpeg", ...(durationISO && { "duration": durationISO }) }
            }),
            ...(offers.length > 0 && { "offers": offers }),
            "isPartOf": { "@type": "CreativeWorkSeries", "name": "The Bloom's House", "description": "Balanced Stimulation music for modern families" }
        },
        // 2. BreadcrumbList
        {
            "@type": "BreadcrumbList",
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Aly Bouchnak", "item": DOMAIN + '/' },
                { "@type": "ListItem", "position": 2, "name": "Discography", "item": DOMAIN + '/discography' },
                { "@type": "ListItem", "position": 3, "name": item.title, "item": url }
            ]
        },
        // 3. SpeakableSpecification
        {
            "@type": "WebPage",
            "url": url,
            "speakable": {
                "@type": "SpeakableSpecification",
                "cssSelector": ["article h1", "article h2", "article [aria-label='Lyrics']", "article [aria-label='Educational Benefits']"]
            }
        }
    ];

    // 4. FAQ schema (contextual)
    if (item.routine || item.educationalBenefits.length > 0) {
        const faqEntries = [];
        if (item.routine === 'Mealtime') {
            faqEntries.push({ q: `What is a good song for ${item.routine.toLowerCase()}?`, a: `${item.title} by ${item.artist} is designed to make ${item.routine.toLowerCase()} fun and cooperative for children ages ${item.ageRange || '2-6'}.` });
        } else if (item.routine === 'Bedtime') {
            faqEntries.push({ q: `What is the best bedtime song for toddlers?`, a: `${item.title} by ${item.artist} uses gentle melodies to help toddlers ages ${item.ageRange || '2-6'} wind down and develop healthy sleep routines.` });
        } else {
            faqEntries.push({ q: `What is ${item.title} about?`, a: `${item.title} by ${item.artist} is a children's song that ${item.description.substring(0, 200)}` });
        }
        if (item.educationalBenefits.length > 0) {
            const benefitsList = item.educationalBenefits.map(b => b.title).join(', ');
            faqEntries.push({ q: `What does ${item.title} teach children?`, a: `${item.title} supports child development through: ${benefitsList}. ${item.educationalBenefits[0].description}` });
        }
        graph.push({
            "@type": "FAQPage",
            "mainEntity": faqEntries.map(({ q, a }) => ({
                "@type": "Question",
                "name": q,
                "acceptedAnswer": { "@type": "Answer", "text": a }
            }))
        });
    }

    return { "@context": "https://schema.org", "@graph": graph };
}

function generateAlbumSchema(item) {
    const url = `${DOMAIN}/album/${item.slug}`;
    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "MusicAlbum",
                "@id": url,
                "name": item.title,
                "url": url,
                "description": item.description,
                "image": item.image,
                "byArtist": { "@type": "MusicGroup", "name": item.artist, "url": DOMAIN },
                ...(item.trackCount && { "numTracks": parseInt(item.trackCount) }),
                ...(item.genre && { "genre": item.genre.split(',').map(g => g.trim()) }),
                ...(item.releaseDate && { "datePublished": item.releaseDate.split('T')[0] }),
                ...(item.ageRange && { "educationalLevel": `Ages ${item.ageRange}` }),
                "audience": { "@type": "Audience", "audienceType": "Parents of toddlers and preschoolers" }
            },
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Aly Bouchnak", "item": DOMAIN + '/' },
                    { "@type": "ListItem", "position": 2, "name": "Discography", "item": DOMAIN + '/discography' },
                    { "@type": "ListItem", "position": 3, "name": item.title, "item": url }
                ]
            }
        ]
    };
}

function generateArticleSchema(item) {
    const url = `${DOMAIN}/article/${item.slug}`;
    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Article",
                "@id": url,
                "headline": item.title,
                "url": url,
                "description": item.description,
                "image": item.image,
                ...(item.datePublished && { "datePublished": item.datePublished }),
                "author": { "@type": "Person", "name": item.artist, "url": DOMAIN },
                ...(item.category && { "articleSection": item.category })
            },
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Aly Bouchnak", "item": DOMAIN + '/' },
                    { "@type": "ListItem", "position": 2, "name": "Articles", "item": DOMAIN + '/articles' },
                    { "@type": "ListItem", "position": 3, "name": item.title, "item": url }
                ]
            }
        ]
    };
}

function generateBasicSchema(item, url) {
    return {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": item.title,
        "description": item.description,
        "image": item.image,
        "url": url
    };
}

// ─── MAIN PROCESSOR ───
function processSSG() {
    if (!fs.existsSync(INDEX_HTML_PATH)) {
        console.error(`ERROR: Could not find ${INDEX_HTML_PATH}. Run vite build first.`);
        return;
    }

    console.log('🔍 Extracting data from source files...');
    const baseHtml = fs.readFileSync(INDEX_HTML_PATH, 'utf8');

    const tracks = extractFullData(TRACKS_FILE, 'track');
    const albums = extractFullData(ALBUMS_FILE, 'album');
    const playlists = extractFullData(PLAYLISTS_FILE, 'playlist');
    const themes = extractFullData(THEMES_FILE, 'theme-collection');
    const articles = extractFullData(ARTICLES_FILE, 'article');

    const allMedia = [...tracks, ...albums, ...playlists, ...themes, ...articles, ...STATIC_ROUTES];

    console.log(`\n📄 Pre-rendering ${allMedia.length} pages...`);

    allMedia.forEach(item => {
        const routePath = item.type === 'page' ? item.slug : path.join(item.type, item.slug);
        const routeDir = path.join(DIST_DIR, routePath);
        fs.mkdirSync(routeDir, { recursive: true });

        const fullUrl = `${DOMAIN}/${routePath.replace(/\\/g, '/')}`;
        let injectedHtml = baseHtml;

        // ── 1. META TAGS ──
        const cleanTitle = `${item.title} | Aly Bouchnak`;
        const cleanDesc = (item.description || '').substring(0, 160);

        injectedHtml = injectedHtml.replace(/<title>(.*?)<\/title>/g, `<title>${cleanTitle}</title>`);
        injectedHtml = injectedHtml.replace(/<meta name="description" content="(.*?)"([^>]*)>/g, `<meta name="description" content="${cleanDesc}"$2>`);
        injectedHtml = injectedHtml.replace(/<meta property="og:title" content="(.*?)"([^>]*)>/g, `<meta property="og:title" content="${cleanTitle}"$2>`);
        injectedHtml = injectedHtml.replace(/<meta property="og:description" content="(.*?)"([^>]*)>/g, `<meta property="og:description" content="${cleanDesc}"$2>`);
        injectedHtml = injectedHtml.replace(/<meta property="og:image" content="(.*?)"([^>]*)>/g, `<meta property="og:image" content="${item.image}"$2>`);
        injectedHtml = injectedHtml.replace(/<meta property="og:url" content="(.*?)"([^>]*)>/g, `<meta property="og:url" content="${fullUrl}"$2>`);

        let ogType = 'website';
        if (item.type === 'album') ogType = 'music.album';
        if (item.type === 'track') ogType = 'music.song';
        if (item.type === 'article') ogType = 'article';
        injectedHtml = injectedHtml.replace(/<meta property="og:type" content="(.*?)"([^>]*)>/g, `<meta property="og:type" content="${ogType}"$2>`);

        // ── 2. RICH JSON-LD SCHEMA ──
        let schema;
        if (item.type === 'track') schema = generateTrackSchema(item);
        else if (item.type === 'album') schema = generateAlbumSchema(item);
        else if (item.type === 'article') schema = generateArticleSchema(item);
        else schema = generateBasicSchema(item, fullUrl);

        const schemaScript = `\n    <script type="application/ld+json" data-seo="schema">\n      ${JSON.stringify(schema)}\n    </script>\n  </head>`;
        injectedHtml = injectedHtml.replace('</head>', schemaScript);

        // ── 3. STATIC HTML CONTENT FOR CRAWLERS ──
        let staticHtml = '';
        if (item.type === 'track') staticHtml = generateTrackHtml(item);
        else if (item.type === 'album') staticHtml = generateAlbumHtml(item);
        else if (item.type === 'article') staticHtml = generateArticleHtml(item);
        else staticHtml = generateGenericHtml(item);

        // Inject noscript fallback right after <div id="root">
        const noscriptBlock = `<noscript>${staticHtml}</noscript>`;
        injectedHtml = injectedHtml.replace(
            '<div id="root"></div>',
            `<div id="root"></div>\n    ${noscriptBlock}`
        );

        fs.writeFileSync(path.join(routeDir, 'index.html'), injectedHtml);
    });

    console.log(`\n✅ SSG Complete! Pre-rendered ${allMedia.length} pages with rich schema + static HTML.`);
}

processSSG();
