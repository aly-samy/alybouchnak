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



// Separate function for binary files like images
async function saveBinaryFile(path: string, base64Content: string, message: string) {
    await apiCall({ action: 'saveBinaryFile', path, base64Content, message });
}


export async function saveImageToGitHub(path: string, base64Content: string): Promise<void> {
    await saveBinaryFile(
        path,
        base64Content,
        `Admin: Uploaded image ${path} via Admin Dashboard`
    );
}
