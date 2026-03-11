import { db } from '../src/db/index.js';
import { faqs, tracks, albums, playlists, themeCollections, articles } from '../src/db/schema.js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Load static data
import { faqs as staticFaqs } from '../src/data/faqs.js';
import { tracks as staticTracks } from '../src/data/tracks.js';
import { albums as staticAlbums } from '../src/data/albums.js';
import { playlists as staticPlaylists } from '../src/data/playlists.js';
import { themeCollections as staticThemes } from '../src/data/themeCollections.js';
import { articles as staticArticles } from '../src/data/articles.js';

dotenv.config({ path: resolve(process.cwd(), '.env') });

async function seed() {
    console.log('🌱 Starting Neon database seed...');

    try {
        // FAQS
        if (staticFaqs.length > 0) {
            console.log(`Inserting ${staticFaqs.length} FAQs...`);
            await db.insert(faqs).values(staticFaqs.map(f => ({
                id: f.id,
                category: f.category,
                question: f.question,
                answer: f.answer
            }))).onConflictDoNothing();
        }

        // ARTICLES
        if (staticArticles.length > 0) {
            console.log(`Inserting ${staticArticles.length} Articles...`);
            await db.insert(articles).values(staticArticles.map(a => ({
                id: a.id,
                slug: a.slug,
                type: a.type,
                title: a.title,
                description: a.description,
                content: a.content,
                category: a.category,
                coverImage: a.coverImage,
                datePublished: a.datePublished ? new Date(a.datePublished) : null,
                dateModified: a.dateModified ? new Date(a.dateModified) : null,
                author: a.author,
                seo: a.seo,
                connections: a.connections,
                articleSchema: a.articleSchema
            }))).onConflictDoNothing();
        }

        // TRACKS
        if (staticTracks.length > 0) {
            console.log(`Inserting ${staticTracks.length} Tracks...`);
            await db.insert(tracks).values(staticTracks.map(t => ({
                id: t.id,
                slug: t.slug,
                title: t.title,
                subtitle: t.subtitle,
                description: t.description,
                coverImage: t.coverImage,
                artist: t.artist,
                releaseDate: t.releaseDate ? new Date(t.releaseDate) : null,
                duration: t.duration,
                bpm: t.bpm,
                genre: t.genre,
                ageRange: t.ageRange,
                mood: t.mood,
                routine: t.routine,
                isrc: t.isrc,
                upc: t.upc,
                album: t.album,
                albumUrl: t.albumUrl,
                spotifyUrl: t.spotifyUrl,
                appleMusicUrl: t.appleMusicUrl,
                youtubeUrl: t.youtubeUrl,
                amazonUrl: t.amazonUrl,
                otherUrl: t.otherUrl,
                lyricsPreview: t.lyricsPreview,
                lyricsFull: t.lyricsFull,
                educationalBenefits: t.educationalBenefits,
                artistNote: t.artistNote,
                relatedTracks: t.relatedTracks,
                seo: t.seo,
                trackSchema: t.trackSchema
            }))).onConflictDoNothing();
        }

        // ALBUMS
        if (staticAlbums.length > 0) {
            console.log(`Inserting ${staticAlbums.length} Albums...`);
            await db.insert(albums).values(staticAlbums.map(a => ({
                id: a.id,
                slug: a.slug,
                title: a.title,
                subtitle: a.subtitle,
                description: a.description,
                coverImage: a.coverImage,
                artist: a.artist,
                releaseDate: a.releaseDate ? new Date(a.releaseDate) : null,
                genre: a.genre,
                ageRange: a.ageRange,
                mood: a.mood,
                spotifyUrl: a.spotifyUrl,
                appleMusicUrl: a.appleMusicUrl,
                youtubeUrl: a.youtubeUrl,
                amazonUrl: a.amazonUrl,
                otherUrl: a.otherUrl,
                trackCount: a.trackCount,
                duration: a.duration,
                upc: a.upc,
                educationalBenefits: a.educationalBenefits,
                artistNote: a.artistNote,
                curatorNote: a.curatorNote,
                scienceFramework: a.scienceFramework,
                trackIds: a.trackIds,
                relatedAlbums: a.relatedAlbums,
                type: a.type,
                date: a.date,
                image: a.image,
                link: a.link,
                status: a.status,
                lyrics: a.lyrics,
                albumSchema: a.albumSchema
            }))).onConflictDoNothing();
        }

        // PLAYLISTS
        if (staticPlaylists.length > 0) {
            console.log(`Inserting ${staticPlaylists.length} Playlists...`);
            await db.insert(playlists).values(staticPlaylists.map(p => ({
                id: p.id,
                slug: p.slug,
                title: p.title,
                subtitle: p.subtitle,
                description: p.description,
                coverImage: p.coverImage,
                artist: p.artist,
                releaseDate: p.releaseDate ? new Date(p.releaseDate) : null,
                genre: p.genre,
                ageRange: p.ageRange,
                mood: p.mood,
                spotifyUrl: p.spotifyUrl,
                appleMusicUrl: p.appleMusicUrl,
                youtubeUrl: p.youtubeUrl,
                amazonUrl: p.amazonUrl,
                otherUrl: p.otherUrl,
                trackCount: p.trackCount,
                duration: p.duration,
                upc: p.upc,
                educationalBenefits: p.educationalBenefits,
                curatorNote: p.curatorNote,
                artistNote: p.artistNote,
                scienceFramework: p.scienceFramework,
                tracks: p.tracks,
                relatedAlbums: p.relatedAlbums,
                type: p.type,
                date: p.date,
                image: p.image,
                link: p.link,
                status: p.status,
                lyrics: p.lyrics
            }))).onConflictDoNothing();
        }

        // THEME COLLECTIONS
        if (staticThemes.length > 0) {
            console.log(`Inserting ${staticThemes.length} Theme Collections...`);
            await db.insert(themeCollections).values(staticThemes.map(t => ({
                id: t.id,
                slug: t.slug,
                title: t.title,
                subtitle: t.subtitle,
                description: t.description,
                coverImage: t.coverImage,
                artist: t.artist,
                releaseDate: t.releaseDate ? new Date(t.releaseDate) : null,
                genre: t.genre,
                ageRange: t.ageRange,
                mood: t.mood,
                spotifyUrl: t.spotifyUrl,
                appleMusicUrl: t.appleMusicUrl,
                youtubeUrl: t.youtubeUrl,
                amazonUrl: t.amazonUrl,
                otherUrl: t.otherUrl,
                trackCount: t.trackCount,
                duration: t.duration,
                upc: t.upc,
                educationalBenefits: t.educationalBenefits,
                curatorNote: t.curatorNote,
                artistNote: t.artistNote,
                scienceFramework: t.scienceFramework,
                category: t.category,
                trackIds: t.trackIds,
                relatedAlbums: t.relatedAlbums,
                type: t.type,
                date: t.date,
                image: t.image,
                link: t.link,
                status: t.status,
                lyrics: t.lyrics
            }))).onConflictDoNothing();
        }

        console.log('✅ Seed completed successfully!');
    } catch (error) {
        console.error('❌ Error during seed:', error);
    } finally {
        process.exit(0);
    }
}

seed();
