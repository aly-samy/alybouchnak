async function apiCall(payload: any) {
    const response = await fetch('/.netlify/functions/github-crud', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to save via API webhook');
    }

    return response.json();
}

async function saveFile(path: string, content: string, message: string) {
    await apiCall({ action: 'saveFile', path, content, message });
}

// Separate function for binary files like images
async function saveBinaryFile(path: string, base64Content: string, message: string) {
    await apiCall({ action: 'saveBinaryFile', path, base64Content, message });
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

export async function saveGenresToGitHub(content: string): Promise<void> {
    await saveFile(
        'src/data/genres.ts',
        content,
        'Admin: Updated genres.ts via Admin Dashboard'
    );
}

export async function saveMoodsToGitHub(content: string): Promise<void> {
    await saveFile(
        'src/data/moods.ts',
        content,
        'Admin: Updated moods.ts via Admin Dashboard'
    );
}

export async function saveRoutinesToGitHub(content: string): Promise<void> {
    await saveFile(
        'src/data/routines.ts',
        content,
        'Admin: Updated routines.ts via Admin Dashboard'
    );
}

export async function saveFaqsToGitHub(content: string): Promise<void> {
    await saveFile(
        'src/data/faqs.ts',
        content,
        'Admin: Updated faqs.ts via Admin Dashboard'
    );
}

export async function saveImageToGitHub(path: string, base64Content: string): Promise<void> {
    await saveBinaryFile(
        path,
        base64Content,
        `Admin: Uploaded image ${path} via Admin Dashboard`
    );
}
