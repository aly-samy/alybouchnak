import type { Handler, HandlerEvent } from '@netlify/functions';
import { Octokit } from '@octokit/rest';

export const handler: Handler = async (event: HandlerEvent) => {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
    }

    try {
        const payload = JSON.parse(event.body || '{}');
        const { action, path, message, content, base64Content } = payload;

        // Securely retrieve the Token from server-side Environment Variables (Not exposed to the public)
        const owner = process.env.VITE_GITHUB_OWNER || process.env.GITHUB_OWNER;
        const repo = process.env.VITE_GITHUB_REPO || process.env.GITHUB_REPO;
        const token = process.env.VITE_GITHUB_TOKEN || process.env.GITHUB_TOKEN;

        if (!owner || !repo || !token) {
            console.error('Missing GitHub configuration variables.');
            return { statusCode: 500, body: JSON.stringify({ error: 'GitHub configuration missing in environment.' }) };
        }

        const octokit = new Octokit({ auth: token });

        if (action === 'saveFile') {
            let sha: string | undefined;
            try {
                const { data } = await octokit.repos.getContent({ owner, repo, path });
                if (Array.isArray(data)) throw new Error('Path is a directory, not a file');
                sha = data.sha;
            } catch (e: any) {
                // File might not exist yet if this is a new file
                if (e.status !== 404) throw e;
            }

            // Push the updated content safely encoded to Base64 (UTF-8 safe)
            await octokit.repos.createOrUpdateFileContents({
                owner,
                repo,
                path,
                message,
                content: Buffer.from(content, 'utf-8').toString('base64'),
                sha,
            });

            return { statusCode: 200, body: JSON.stringify({ success: true }) };
        }

        if (action === 'saveBinaryFile') {
            let sha: string | undefined;
            try {
                const { data } = await octokit.repos.getContent({ owner, repo, path });
                if (Array.isArray(data)) throw new Error('Path is a directory, not a file');
                sha = data.sha;
            } catch (e: any) {
                if (e.status !== 404) throw e;
            }

            await octokit.repos.createOrUpdateFileContents({
                owner,
                repo,
                path,
                message,
                content: base64Content, // This is already sent as valid base64
                sha,
            });

            return { statusCode: 200, body: JSON.stringify({ success: true }) };
        }

        return { statusCode: 400, body: JSON.stringify({ error: 'Invalid or missing action parameter' }) };

    } catch (error: any) {
        console.error('GitHub API Server Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message || 'Internal Server Error' }),
        };
    }
};
