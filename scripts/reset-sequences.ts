import 'dotenv/config';
import { sql } from 'drizzle-orm';
import { db } from '../src/db/index.js';

const tables = [
    'tracks',
    'albums',
    'playlists',
    'theme_collections',
    'articles',
    'faqs',
    'subscribers',
];

async function resetSequences() {
    console.log('🔧 Resetting Postgres SERIAL sequences...\n');

    for (const table of tables) {
        try {
            // Reset the sequence to the current max id so next INSERT gets the correct next value
            await db.execute(
                sql.raw(`SELECT setval(pg_get_serial_sequence('"${table}"', 'id'), COALESCE((SELECT MAX(id) FROM "${table}"), 0) + 1, false)`)
            );
            const result = await db.execute(sql.raw(`SELECT MAX(id) FROM "${table}"`));
            const maxId = (result.rows[0] as any)?.max ?? 0;
            console.log(`  ✅ ${table}: sequence reset (current max id = ${maxId})`);
        } catch (err: any) {
            console.error(`  ❌ ${table}: ${err.message}`);
        }
    }

    console.log('\n🎉 All sequences reset!');
    process.exit(0);
}

resetSequences();
