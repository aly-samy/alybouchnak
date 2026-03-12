import type { Handler, HandlerEvent } from '@netlify/functions';

export const handler: Handler = async (event: HandlerEvent) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
    }

    // Verify admin token
    const adminToken = process.env.VITE_ADMIN_PASSWORD;
    const authHeader = event.headers.authorization;
    if (!adminToken || !authHeader || authHeader !== `Bearer ${adminToken}`) {
        return { statusCode: 401, body: JSON.stringify({ error: 'Unauthorized' }) };
    }

    const buildHookUrl = process.env.NETLIFY_BUILD_HOOK_URL;
    if (!buildHookUrl) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'NETLIFY_BUILD_HOOK_URL is not configured in environment variables.' }),
        };
    }

    try {
        const response = await fetch(buildHookUrl, { method: 'POST' });
        if (!response.ok) {
            throw new Error(`Netlify responded with ${response.status}`);
        }
        return {
            statusCode: 200,
            body: JSON.stringify({ success: true, message: 'Site rebuild triggered! It will be live in ~60 seconds.' }),
        };
    } catch (err: any) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: err.message || 'Failed to trigger rebuild' }),
        };
    }
};
