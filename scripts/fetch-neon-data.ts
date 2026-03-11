import 'dotenv/config';
import fs from 'fs';
import path, { resolve } from 'path';

import { db } from '../src/db/index.js';
import * as schema from '../src/db/schema.js';

import { generateTracksFile } from '../src/admin/lib/generateTracks.js';
import { generateAlbumsFile } from '../src/admin/lib/generateAlbums.js';
import { generateThemeCollectionsFile } from '../src/admin/lib/generateThemeCollections.js';
import { generatePlaylistsFile } from '../src/admin/lib/generatePlaylists.js';
import { generateFaqsFile } from '../src/admin/lib/generateFaqs.js';
import { generateArticlesFile } from '../src/admin/lib/generateArticles.js';

async function fetchData() {
    console.log('🌐 Fetching data from Neon DB...');

    try {
        const tracks = await db.select().from(schema.tracks);
        fs.writeFileSync(resolve(process.cwd(), 'src/data/tracks.ts'), generateTracksFile(tracks as any));
        console.log(`✅ Saved ${tracks.length} tracks.`);

        const albums = await db.select().from(schema.albums);
        fs.writeFileSync(resolve(process.cwd(), 'src/data/albums.ts'), generateAlbumsFile(albums as any));
        console.log(`✅ Saved ${albums.length} albums.`);

        const themeCollections = await db.select().from(schema.themeCollections);
        fs.writeFileSync(resolve(process.cwd(), 'src/data/themeCollections.ts'), generateThemeCollectionsFile(themeCollections as any));
        console.log(`✅ Saved ${themeCollections.length} theme collections.`);

        const playlists = await db.select().from(schema.playlists);
        fs.writeFileSync(resolve(process.cwd(), 'src/data/playlists.ts'), generatePlaylistsFile(playlists as any));
        console.log(`✅ Saved ${playlists.length} playlists.`);

        const faqs = await db.select().from(schema.faqs);
        fs.writeFileSync(resolve(process.cwd(), 'src/data/faqs.ts'), generateFaqsFile(faqs as any));
        console.log(`✅ Saved ${faqs.length} FAQs.`);

        const articles = await db.select().from(schema.articles);
        fs.writeFileSync(resolve(process.cwd(), 'src/data/articles.ts'), generateArticlesFile(articles as any));
        console.log(`✅ Saved ${articles.length} articles.`);

        console.log('🎉 Fetch complete!');
        process.exit(0);
    } catch (err) {
        console.error('❌ Data fetch failed:', err);
        process.exit(1);
    }
}

fetchData();
