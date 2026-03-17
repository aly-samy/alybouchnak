/**
 * Format a date string like "2026-05-29" or "2026-05-29T00:00:00.000Z"
 * into a human-friendly format like "May 29, 2026".
 */
export function formatDate(dateStr: string | undefined | null): string {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC',
    });
}
