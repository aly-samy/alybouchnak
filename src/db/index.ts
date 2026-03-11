import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

// This handles connections cleanly in a serverless environment like Netlify Functions
const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql, { schema });
