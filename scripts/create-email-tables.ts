import { neon } from '@neondatabase/serverless';
import 'dotenv/config';

const sql = neon(process.env.DATABASE_URL!);

async function createEmailTables() {
    console.log('Creating email tables...');

    // --- EMAIL THREADS ---
    await sql`
        CREATE TABLE IF NOT EXISTS email_threads (
            id SERIAL PRIMARY KEY,
            subject VARCHAR(500) NOT NULL,
            participant_email VARCHAR(255) NOT NULL,
            participant_name VARCHAR(255),
            status VARCHAR(50) DEFAULT 'open',
            is_read BOOLEAN DEFAULT false,
            last_message_at TIMESTAMPTZ DEFAULT NOW(),
            created_at TIMESTAMPTZ DEFAULT NOW()
        )
    `;
    console.log('✅ email_threads table created');

    // --- EMAIL MESSAGES ---
    await sql`
        CREATE TABLE IF NOT EXISTS email_messages (
            id SERIAL PRIMARY KEY,
            thread_id INTEGER NOT NULL REFERENCES email_threads(id) ON DELETE CASCADE,
            mailgun_id VARCHAR(500),
            direction VARCHAR(10) NOT NULL,
            from_email VARCHAR(255) NOT NULL,
            from_name VARCHAR(255),
            to_email VARCHAR(500) NOT NULL,
            cc VARCHAR(500),
            bcc VARCHAR(500),
            subject VARCHAR(500),
            body_html TEXT,
            body_text TEXT,
            has_attachments BOOLEAN DEFAULT false,
            created_at TIMESTAMPTZ DEFAULT NOW()
        )
    `;
    console.log('✅ email_messages table created');

    // --- EMAIL ATTACHMENTS ---
    await sql`
        CREATE TABLE IF NOT EXISTS email_attachments (
            id SERIAL PRIMARY KEY,
            message_id INTEGER NOT NULL REFERENCES email_messages(id) ON DELETE CASCADE,
            filename VARCHAR(500) NOT NULL,
            content_type VARCHAR(255),
            size INTEGER,
            data TEXT,
            created_at TIMESTAMPTZ DEFAULT NOW()
        )
    `;
    console.log('✅ email_attachments table created');

    // --- INDEXES ---
    await sql`CREATE INDEX IF NOT EXISTS idx_email_threads_last_message ON email_threads(last_message_at DESC)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_email_threads_status ON email_threads(status)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_email_messages_thread ON email_messages(thread_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_email_messages_mailgun_id ON email_messages(mailgun_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_email_attachments_message ON email_attachments(message_id)`;
    console.log('✅ Indexes created');

    console.log('\n🎉 All email tables created successfully!');
}

createEmailTables().catch(console.error);
