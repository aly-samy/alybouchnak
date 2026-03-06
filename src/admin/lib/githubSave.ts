import { Octokit } from '@octokit/rest';

const owner = import.meta.env.VITE_GITHUB_OWNER as string;
const repo = import.meta.env.VITE_GITHUB_REPO as string;
const token = import.meta.env.VITE_GITHUB_TOKEN as string;

function getOctokit() {
    return new Octokit({ auth: token });
}

async function saveFile(path: string, content: string, message: string) {
    const octokit = getOctokit();

    // 1. Get current SHA of the file
    const { data } = await octokit.repos.getContent({ owner, repo, path });
    if (Array.isArray(data)) throw new Error('Path is a directory, not a file');
    const sha = data.sha;

    // 2. Push the updated content (Base64 encoded)
    await octokit.repos.createOrUpdateFileContents({
        owner,
        repo,
        path,
        message,
        content: btoa(unescape(encodeURIComponent(content))), // UTF-8 safe Base64
        sha,
    });
}

export async function saveTracksToGitHub(content: string): Promise<void> {
    await saveFile(
        'src/data/tracks.ts',
        content,
        'Admin: Updated tracks.ts via Admin Dashboard'
    );
}

export async function saveAlbumsToGitHub(content: string): Promise<void> {
    await saveFile(
        'src/data/albums.ts',
        content,
        'Admin: Updated albums.ts via Admin Dashboard'
    );
}

export async function savePlaylistsToGitHub(content: string): Promise<void> {
    await saveFile(
        'src/data/playlists.ts',
        content,
        'Admin: Updated playlists.ts via Admin Dashboard'
    );
}

export async function saveThemeCollectionsToGitHub(content: string): Promise<void> {
    await saveFile(
        'src/data/themeCollections.ts',
        content,
        'Admin: Updated themeCollections.ts via Admin Dashboard'
    );
}

export async function saveArticlesToGitHub(content: string): Promise<void> {
    await saveFile(
        'src/data/articles.ts',
        content,
        'Admin: Updated articles.ts via Admin Dashboard'
    );
}
