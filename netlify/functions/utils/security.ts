import crypto from 'crypto';

/**
 * Secure comparison of two strings to prevent timing attacks.
 * Using hashing ensures both inputs are of equal length before comparison.
 *
 * @param a The user-provided string to compare
 * @param b The expected secret or token
 * @returns boolean True if strings match, false otherwise
 */
export function secureCompare(a: string, b: string): boolean {
    if (typeof a !== 'string' || typeof b !== 'string') {
        return false;
    }

    // We hash the strings first to ensure they are the same length.
    // crypto.timingSafeEqual requires buffers of identical length.
    const aHash = crypto.createHash('sha256').update(a).digest();
    const bHash = crypto.createHash('sha256').update(b).digest();

    // timingSafeEqual handles constant-time comparison of the hashes.
    // While hashes are the same length, we still use timingSafeEqual
    // to prevent any side-channel leaks during the comparison itself.
    // Note: This doesn't hide the length of the original strings perfectly
    // if hashing time varies significantly (unlikely for SHA-256),
    // but it is much safer than standard string comparison.
    try {
        return crypto.timingSafeEqual(aHash, bHash);
    } catch (e) {
        return false;
    }
}
