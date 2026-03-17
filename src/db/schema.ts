import { pgTable, serial, integer, text, varchar, timestamp, jsonb, boolean } from 'drizzle-orm/pg-core';

// --- TRACKS ---
export const tracks = pgTable('tracks', {
    id: serial('id').primaryKey(),
    slug: varchar('slug', { length: 255 }).notNull().unique(),
    title: varchar('title', { length: 255 }).notNull(),
    subtitle: varchar('subtitle', { length: 255 }),
    description: text('description'),
    coverImage: varchar('cover_image', { length: 255 }),
    artist: varchar('artist', { length: 255 }),
    releaseDate: timestamp('release_date', { withTimezone: true }),
    duration: varchar('duration', { length: 15 }),
    bpm: integer('bpm'),
    genre: varchar('genre', { length: 100 }),
    ageRange: varchar('age_range', { length: 50 }),
    mood: varchar('mood', { length: 50 }),
    routine: varchar('routine', { length: 50 }),
    isrc: varchar('isrc', { length: 50 }),
    upc: varchar('upc', { length: 50 }),
    album: varchar('album', { length: 255 }),
    albumUrl: varchar('album_url', { length: 255 }),
    spotifyUrl: varchar('spotify_url', { length: 255 }),
    appleMusicUrl: varchar('apple_music_url', { length: 255 }),
    youtubeUrl: varchar('youtube_url', { length: 255 }),
    amazonUrl: varchar('amazon_url', { length: 255 }),
    otherUrl: varchar('other_url', { length: 255 }),
    lyricsPreview: jsonb('lyrics_preview').$type<string[]>(),
    lyricsFull: text('lyrics_full'),
    educationalBenefits: jsonb('educational_benefits').$type<{ title: string; description: string }[]>(),
    artistNote: text('artist_note'),
    relatedTracks: jsonb('related_tracks').$type<number[]>(),
    seo: jsonb('seo').$type<{ title: string; description: string; keywords: string; canonical: string; ogImage: string }>(),
    trackSchema: jsonb('track_schema')
});

// --- ALBUMS ---
export const albums = pgTable('albums', {
    id: serial('id').primaryKey(),
    slug: varchar('slug', { length: 255 }).notNull().unique(),
    title: varchar('title', { length: 255 }).notNull(),
    subtitle: varchar('subtitle', { length: 255 }),
    description: text('description'),
    coverImage: varchar('cover_image', { length: 255 }),
    artist: varchar('artist', { length: 255 }),
    releaseDate: timestamp('release_date', { withTimezone: true }),
    genre: varchar('genre', { length: 100 }),
    ageRange: varchar('age_range', { length: 50 }),
    mood: varchar('mood', { length: 50 }),
    spotifyUrl: varchar('spotify_url', { length: 255 }),
    appleMusicUrl: varchar('apple_music_url', { length: 255 }),
    youtubeUrl: varchar('youtube_url', { length: 255 }),
    amazonUrl: varchar('amazon_url', { length: 255 }),
    otherUrl: varchar('other_url', { length: 255 }),
    trackCount: integer('track_count'),
    duration: varchar('duration', { length: 15 }),
    upc: varchar('upc', { length: 50 }),
    educationalBenefits: jsonb('educational_benefits').$type<{ title: string; description: string }[]>(),
    artistNote: text('artist_note'),
    curatorNote: text('curator_note'),
    scienceFramework: text('science_framework'),
    trackIds: jsonb('track_ids').$type<number[]>(),
    relatedAlbums: jsonb('related_albums').$type<{ id: number; title: string; cover: string; description: string; link: string }[]>(),
    type: varchar('type', { length: 50 }),
    date: varchar('date', { length: 50 }),
    image: varchar('image', { length: 255 }),
    link: varchar('link', { length: 255 }),
    status: varchar('status', { length: 50 }),
    lyrics: text('lyrics'),
    albumSchema: jsonb('album_schema')
});

// --- PLAYLISTS ---
export const playlists = pgTable('playlists', {
    id: serial('id').primaryKey(),
    slug: varchar('slug', { length: 255 }).notNull().unique(),
    title: varchar('title', { length: 255 }).notNull(),
    subtitle: varchar('subtitle', { length: 255 }),
    description: text('description'),
    coverImage: varchar('cover_image', { length: 255 }),
    artist: varchar('artist', { length: 255 }),
    releaseDate: timestamp('release_date', { withTimezone: true }),
    genre: varchar('genre', { length: 100 }),
    ageRange: varchar('age_range', { length: 50 }),
    mood: varchar('mood', { length: 50 }),
    spotifyUrl: varchar('spotify_url', { length: 255 }),
    appleMusicUrl: varchar('apple_music_url', { length: 255 }),
    youtubeUrl: varchar('youtube_url', { length: 255 }),
    amazonUrl: varchar('amazon_url', { length: 255 }),
    otherUrl: varchar('other_url', { length: 255 }),
    trackCount: integer('track_count'),
    duration: varchar('duration', { length: 15 }),
    upc: varchar('upc', { length: 50 }),
    educationalBenefits: jsonb('educational_benefits').$type<{ title: string; description: string }[]>(),
    curatorNote: text('curator_note'),
    artistNote: text('artist_note'),
    scienceFramework: text('science_framework'),
    tracks: jsonb('tracks').$type<{ trackId?: number; title?: string; duration?: string; description?: string; link?: string }[]>(),
    relatedAlbums: jsonb('related_albums').$type<{ id: number; title: string; cover: string; description: string; link: string }[]>(),
    type: varchar('type', { length: 50 }),
    date: varchar('date', { length: 50 }),
    image: varchar('image', { length: 255 }),
    link: varchar('link', { length: 255 }),
    status: varchar('status', { length: 50 }),
    lyrics: text('lyrics')
});

// --- THEME COLLECTIONS ---
export const themeCollections = pgTable('theme_collections', {
    id: serial('id').primaryKey(),
    slug: varchar('slug', { length: 255 }).notNull().unique(),
    title: varchar('title', { length: 255 }).notNull(),
    subtitle: varchar('subtitle', { length: 255 }),
    description: text('description'),
    coverImage: varchar('cover_image', { length: 255 }),
    artist: varchar('artist', { length: 255 }),
    releaseDate: timestamp('release_date', { withTimezone: true }),
    genre: varchar('genre', { length: 100 }),
    ageRange: varchar('age_range', { length: 50 }),
    mood: varchar('mood', { length: 50 }),
    spotifyUrl: varchar('spotify_url', { length: 255 }),
    appleMusicUrl: varchar('apple_music_url', { length: 255 }),
    youtubeUrl: varchar('youtube_url', { length: 255 }),
    amazonUrl: varchar('amazon_url', { length: 255 }),
    otherUrl: varchar('other_url', { length: 255 }),
    trackCount: integer('track_count'),
    duration: varchar('duration', { length: 15 }),
    upc: varchar('upc', { length: 50 }),
    educationalBenefits: jsonb('educational_benefits').$type<{ title: string; description: string }[]>(),
    curatorNote: text('curator_note'),
    artistNote: text('artist_note'),
    scienceFramework: text('science_framework'),
    category: varchar('category', { length: 100 }),
    trackIds: jsonb('track_ids').$type<number[]>(),
    relatedAlbums: jsonb('related_albums').$type<{ id: number; title: string; cover: string; description: string; link: string }[]>(),
    type: varchar('type', { length: 50 }),
    date: varchar('date', { length: 50 }),
    image: varchar('image', { length: 255 }),
    link: varchar('link', { length: 255 }),
    status: varchar('status', { length: 50 }),
    lyrics: text('lyrics')
});

// --- ARTICLES ---
export const articles = pgTable('articles', {
    id: serial('id').primaryKey(),
    slug: varchar('slug', { length: 255 }).notNull().unique(),
    type: varchar('type', { length: 50 }), // NewsArticle | BlogPosting
    title: varchar('title', { length: 255 }).notNull(),
    description: text('description'),
    content: text('content'),
    category: varchar('category', { length: 100 }),
    coverImage: jsonb('cover_image').$type<{ url: string; width: number; height: number; caption: string }>(),
    datePublished: timestamp('date_published', { withTimezone: true }),
    dateModified: timestamp('date_modified', { withTimezone: true }),
    author: jsonb('author').$type<{ name: string; url: string; role: string }>(),
    seo: jsonb('seo').$type<{ title: string; description: string; keywords: string[]; ogType: string; readingTime: string }>(),
    connections: jsonb('connections').$type<{ relatedTracks: number[]; relatedAlbums: string[]; youtubeVideoId?: string }>(),
    articleSchema: jsonb('article_schema')
});

// --- FAQS ---
export const faqs = pgTable('faqs', {
    id: serial('id').primaryKey(),
    category: varchar('category', { length: 100 }),
    question: text('question').notNull(),
    answer: text('answer').notNull()
});

// --- SUBSCRIBERS ---
export const subscribers = pgTable('subscribers', {
    id: serial('id').primaryKey(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    firstName: varchar('first_name', { length: 255 }),
    parentType: varchar('parent_type', { length: 255 }),
    childName: varchar('child_name', { length: 255 }),
    childBirthMonth: varchar('child_birth_month', { length: 50 }),
    status: varchar('status', { length: 50 }).default('active'), // active, unsubscribed
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow()
});

// --- EMAIL THREADS ---
export const emailThreads = pgTable('email_threads', {
    id: serial('id').primaryKey(),
    subject: varchar('subject', { length: 500 }).notNull(),
    participantEmail: varchar('participant_email', { length: 255 }).notNull(),
    participantName: varchar('participant_name', { length: 255 }),
    status: varchar('status', { length: 50 }).default('open'), // open, replied, closed
    isRead: boolean('is_read').default(false),
    lastMessageAt: timestamp('last_message_at', { withTimezone: true }).defaultNow(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow()
});

// --- EMAIL MESSAGES ---
export const emailMessages = pgTable('email_messages', {
    id: serial('id').primaryKey(),
    threadId: integer('thread_id').notNull(),
    mailgunId: varchar('mailgun_id', { length: 500 }),
    direction: varchar('direction', { length: 10 }).notNull(), // inbound, outbound
    fromEmail: varchar('from_email', { length: 255 }).notNull(),
    fromName: varchar('from_name', { length: 255 }),
    toEmail: varchar('to_email', { length: 500 }).notNull(),
    cc: varchar('cc', { length: 500 }),
    bcc: varchar('bcc', { length: 500 }),
    subject: varchar('subject', { length: 500 }),
    bodyHtml: text('body_html'),
    bodyText: text('body_text'),
    hasAttachments: boolean('has_attachments').default(false),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow()
});

// --- EMAIL ATTACHMENTS ---
export const emailAttachments = pgTable('email_attachments', {
    id: serial('id').primaryKey(),
    messageId: integer('message_id').notNull(),
    filename: varchar('filename', { length: 500 }).notNull(),
    contentType: varchar('content_type', { length: 255 }),
    size: integer('size'),
    data: text('data'), // base64-encoded file content
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow()
});
