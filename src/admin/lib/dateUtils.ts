/**
 * Converts an ISO datetime string (e.g. "2026-02-27T00:00:00.000Z")
 * to a yyyy-MM-dd string suitable for <input type="date"> fields.
 * Returns the value unchanged if it's already in yyyy-MM-dd format or empty.
 */
export function toDateInputValue(value: string | null | undefined): string {
    if (!value) return '';
    // Already in yyyy-MM-dd format
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
    // Full ISO datetime — take only the date part
    if (/^\d{4}-\d{2}-\d{2}T/.test(value)) return value.substring(0, 10);
    return value;
}

/**
 * Takes an existing record from Neon and normalizes date fields
 * to yyyy-MM-dd so React form date inputs work correctly.
 */
export function normalizeFormDates(record: Record<string, any>, dateFields: string[]): Record<string, any> {
    const out = { ...record };
    for (const field of dateFields) {
        if (out[field]) {
            out[field] = toDateInputValue(out[field]);
        }
    }
    return out;
}
