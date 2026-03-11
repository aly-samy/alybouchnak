import type { Handler, HandlerEvent } from '@netlify/functions';
import { db } from '../../src/db/index.js';
import * as schema from '../../src/db/schema.js';
import { eq } from 'drizzle-orm';

export const handler: Handler = async (event: HandlerEvent) => {
    // Only allow POST, PUT, DELETE, GET requests
    if (!['POST', 'PUT', 'DELETE', 'GET'].includes(event.httpMethod)) {
        return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
    }

    const adminToken = process.env.VITE_GITHUB_TOKEN || process.env.GITHUB_TOKEN;

    // Protect mutations (POST, PUT, DELETE)
    if (event.httpMethod !== 'GET') {
        const authHeader = event.headers.authorization;
        if (!authHeader || authHeader !== `Bearer ${adminToken}`) {
            return { statusCode: 401, body: JSON.stringify({ error: 'Unauthorized' }) };
        }
    }

    try {
        const { httpMethod, path } = event;
        // The path will look like /.netlify/functions/neon-crud/articles or /.netlify/functions/neon-crud/tracks/123
        const pathParts = path.split('/').filter(Boolean);
        const resourceIndex = pathParts.findIndex(p => p === 'neon-crud') + 1;
        const resource = pathParts[resourceIndex]; // e.g. 'articles', 'tracks', 'faqs'
        const idParam = pathParts[resourceIndex + 1];

        // Ensure resource maps to a valid schema table
        const table = (schema as any)[resource];
        if (!table) {
            return { statusCode: 404, body: JSON.stringify({ error: `Resource '${resource}' not found.` }) };
        }

        // --- GET ALL OR ONE ---
        if (httpMethod === 'GET') {
            if (idParam) {
                // Return single record
                const id = parseInt(idParam, 10);
                if (isNaN(id)) return { statusCode: 400, body: JSON.stringify({ error: 'Invalid ID' }) };
                const result = await db.select().from(table).where(eq(table.id, id));
                return { statusCode: 200, body: JSON.stringify(result[0] || null) };
            } else {
                // Return all records
                const results = await db.select().from(table);
                return { statusCode: 200, body: JSON.stringify(results) };
            }
        }

        // Everything below needs a JSON body
        let payload: any = {};
        if (event.body) {
            payload = JSON.parse(event.body);
        }

        // --- POST (CREATE) ---
        if (httpMethod === 'POST') {
            const insertPayload = { ...payload };
            delete insertPayload.id; // Let Postgres serial handle ID generation

            // Convert empty strings to null to prevent Postgres type errors for dates/numbers
            Object.keys(insertPayload).forEach(key => {
                if (insertPayload[key] === '') {
                    insertPayload[key] = null;
                }
            });

            const result = await db.insert(table).values(insertPayload).returning();
            return { statusCode: 201, body: JSON.stringify((result as any[])[0]) };
        }

        // --- PUT (UPDATE) ---
        if (httpMethod === 'PUT') {
            const id = parseInt(idParam, 10) || payload.id;
            if (!id) return { statusCode: 400, body: JSON.stringify({ error: 'ID is required for UPDATE' }) };

            const updatePayload = { ...payload };
            // Convert empty strings to null to prevent Postgres type errors
            Object.keys(updatePayload).forEach(key => {
                if (updatePayload[key] === '') {
                    updatePayload[key] = null;
                }
            });

            const result = await db.update(table).set(updatePayload).where(eq(table.id, id)).returning();
            return { statusCode: 200, body: JSON.stringify((result as any[])[0]) };
        }

        // --- DELETE (REMOVE) ---
        if (httpMethod === 'DELETE') {
            const id = parseInt(idParam, 10);
            if (!id) return { statusCode: 400, body: JSON.stringify({ error: 'ID is required for DELETE' }) };

            await db.delete(table).where(eq(table.id, id));
            return { statusCode: 200, body: JSON.stringify({ success: true, deletedId: id }) };
        }

        return { statusCode: 400, body: JSON.stringify({ error: 'Bad Request' }) };

    } catch (error: any) {
        console.error('Neon API Server Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message || 'Internal Server Error' }),
        };
    }
};
