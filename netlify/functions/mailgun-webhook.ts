import type { Handler, HandlerEvent } from '@netlify/functions';
import { db } from '../../src/db/index.js';
import { emailThreads, emailMessages, emailAttachments } from '../../src/db/schema.js';
import { eq } from 'drizzle-orm';
import crypto from 'crypto';

/**
 * Mailgun Inbound Webhook Handler
 * Receives POSTed email data from Mailgun when someone sends an email to hello@alybouchnak.com
 * Verifies the signature, parses the email, and saves it to the database with threading support.
 */
export const handler: Handler = async (event: HandlerEvent) => {
    // Only accept POST
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
    }

    try {
        // Parse the form data from Mailgun (they send multipart/form-data or application/x-www-form-urlencoded)
        const params = new URLSearchParams(event.body || '');

        // --- Verify Mailgun signature ---
        const signingKey = process.env.MAILGUN_WEBHOOK_SIGNING_KEY;
        const timestamp = params.get('timestamp') || '';
        const token = params.get('token') || '';
        const signature = params.get('signature') || '';

        if (signingKey) {
            const expectedSignature = crypto
                .createHmac('sha256', signingKey)
                .update(timestamp + token)
                .digest('hex');

            if (signature !== expectedSignature) {
                console.error('Mailgun webhook signature verification failed');
                return { statusCode: 403, body: JSON.stringify({ error: 'Invalid signature' }) };
            }
        }

        // --- Parse email fields ---
        const sender = params.get('sender') || params.get('from') || '';
        const senderName = extractName(sender);
        const senderEmail = extractEmail(sender);
        const recipient = params.get('recipient') || '';
        const subject = params.get('subject') || '(No Subject)';
        const bodyHtml = params.get('body-html') || params.get('stripped-html') || '';
        const bodyText = params.get('body-plain') || params.get('stripped-text') || '';
        const messageId = params.get('Message-Id') || params.get('message-id') || '';
        const inReplyTo = params.get('In-Reply-To') || params.get('in-reply-to') || '';
        const references = params.get('References') || params.get('references') || '';
        const cc = params.get('Cc') || params.get('cc') || '';

        console.log(`Inbound email from: ${senderEmail}, subject: ${subject}, In-Reply-To: ${inReplyTo}`);

        // --- Threading logic ---
        let threadId: number | null = null;

        // 1. Check if this is a reply to an existing thread (via In-Reply-To or References)
        if (inReplyTo || references) {
            const refIds = [inReplyTo, ...references.split(/\s+/)].filter(Boolean);
            for (const refId of refIds) {
                const existingMessages = await db
                    .select({ threadId: emailMessages.threadId })
                    .from(emailMessages)
                    .where(eq(emailMessages.mailgunId, refId.trim()));
                if (existingMessages.length > 0) {
                    threadId = existingMessages[0].threadId;
                    break;
                }
            }
        }

        // 2. If no thread found, check by subject + sender (strip "Re:" prefix)
        if (!threadId) {
            const cleanSubject = subject.replace(/^(Re:\s*|Fwd:\s*)+/i, '').trim();
            const existingThreads = await db
                .select({ id: emailThreads.id })
                .from(emailThreads)
                .where(eq(emailThreads.participantEmail, senderEmail));

            for (const thread of existingThreads) {
                const threadMessages = await db
                    .select({ subject: emailMessages.subject })
                    .from(emailMessages)
                    .where(eq(emailMessages.threadId, thread.id));
                const hasMatchingSubject = threadMessages.some(m => {
                    const mClean = (m.subject || '').replace(/^(Re:\s*|Fwd:\s*)+/i, '').trim();
                    return mClean === cleanSubject;
                });
                if (hasMatchingSubject) {
                    threadId = thread.id;
                    break;
                }
            }
        }

        // 3. Create new thread if none found
        if (!threadId) {
            const newThread = await db.insert(emailThreads).values({
                subject: subject.replace(/^(Re:\s*|Fwd:\s*)+/i, '').trim(),
                participantEmail: senderEmail,
                participantName: senderName || senderEmail,
                status: 'open',
                isRead: false,
                lastMessageAt: new Date(),
            }).returning();
            threadId = (newThread as any[])[0].id;
        } else {
            // Update existing thread
            await db.update(emailThreads).set({
                isRead: false,
                status: 'open',
                lastMessageAt: new Date(),
            }).where(eq(emailThreads.id, threadId));
        }

        // --- Save the message ---
        const hasAttachmentData = (params.get('attachment-count') || '0') !== '0';
        const newMessage = await db.insert(emailMessages).values({
            threadId: threadId!,
            mailgunId: messageId,
            direction: 'inbound',
            fromEmail: senderEmail,
            fromName: senderName,
            toEmail: recipient,
            cc: cc || null,
            subject,
            bodyHtml,
            bodyText,
            hasAttachments: hasAttachmentData,
        }).returning();

        const messageDbId = (newMessage as any[])[0].id;

        // --- Save attachments ---
        const attachmentCount = parseInt(params.get('attachment-count') || '0', 10);
        if (attachmentCount > 0) {
            for (let i = 1; i <= attachmentCount; i++) {
                const attachmentData = params.get(`attachment-${i}`);
                const attachmentName = params.get(`attachment-${i}-name`) || `attachment-${i}`;
                const attachmentType = params.get(`attachment-${i}-type`) || 'application/octet-stream';
                const attachmentSize = parseInt(params.get(`attachment-${i}-size`) || '0', 10);

                if (attachmentData) {
                    await db.insert(emailAttachments).values({
                        messageId: messageDbId,
                        filename: attachmentName,
                        contentType: attachmentType,
                        size: attachmentSize,
                        data: attachmentData, // base64 from Mailgun
                    });
                }
            }
        }

        console.log(`Email saved: thread ${threadId}, message ${messageDbId}`);
        return { statusCode: 200, body: JSON.stringify({ success: true, threadId, messageId: messageDbId }) };

    } catch (error: any) {
        console.error('Mailgun webhook error:', error);
        return { statusCode: 500, body: JSON.stringify({ error: error.message || 'Internal Server Error' }) };
    }
};

// --- Helpers ---
function extractEmail(fromField: string): string {
    const match = fromField.match(/<([^>]+)>/);
    return match ? match[1] : fromField.trim();
}

function extractName(fromField: string): string {
    const match = fromField.match(/^([^<]+)</);
    return match ? match[1].trim().replace(/^["']|["']$/g, '') : '';
}
