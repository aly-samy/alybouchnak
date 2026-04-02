import type { Handler, HandlerEvent } from '@netlify/functions';
import { db } from '../../src/db/index.js';
import { emailThreads, emailMessages, emailAttachments } from '../../src/db/schema.js';
import { eq } from 'drizzle-orm';
import crypto from 'crypto';
import { secureCompare } from './utils/security.js';

/**
 * Inbound Email Webhook Handler
 * Accepts emails from TWO sources:
 *   1. Cloudflare Email Worker (JSON with source: 'cloudflare')
 *   2. Mailgun (URL-encoded form data)
 * Parses the email, threads it, and saves to the database.
 */
export const handler: Handler = async (event: HandlerEvent) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
    }

    try {
        const contentType = event.headers['content-type'] || '';
        let sender = '', senderName = '', senderEmail = '', recipient = '';
        let subject = '(No Subject)', bodyHtml = '', bodyText = '';
        let messageId = '', inReplyTo = '', references = '', cc = '';
        let attachmentsList: { filename: string; contentType: string; size: number; data: string }[] = [];

        // ─── DETECT SOURCE: Cloudflare JSON vs Mailgun form-data ───
        if (contentType.includes('application/json')) {
            // --- Cloudflare Email Worker (JSON) ---
            const payload = JSON.parse(event.body || '{}');

            // Verify shared secret
            const expectedSecret = process.env.CLOUDFLARE_WEBHOOK_SECRET || 'bloom-email-webhook-2026';
            if (!secureCompare(payload.secret, expectedSecret)) {
                console.error('Cloudflare webhook secret mismatch');
                return { statusCode: 403, body: JSON.stringify({ error: 'Invalid secret' }) };
            }

            senderEmail = payload.from || '';
            senderName = payload.fromName || '';
            recipient = payload.to || '';
            subject = payload.subject || '(No Subject)';
            bodyHtml = payload.bodyHtml || '';
            bodyText = payload.bodyText || '';
            messageId = payload.messageId || '';
            inReplyTo = payload.inReplyTo || '';
            references = payload.references || '';
            cc = payload.cc || '';
            attachmentsList = payload.attachments || [];

            console.log(`[Cloudflare] Inbound email from: ${senderEmail}, subject: ${subject}`);

        } else {
            // --- Mailgun (URL-encoded form data) ---
            const params = new URLSearchParams(event.body || '');

            // Verify Mailgun signature
            const signingKey = process.env.MAILGUN_WEBHOOK_SIGNING_KEY;
            const timestamp = params.get('timestamp') || '';
            const token = params.get('token') || '';
            const signature = params.get('signature') || '';

            if (signingKey && timestamp && token && signature) {
                const expectedSignature = crypto
                    .createHmac('sha256', signingKey)
                    .update(timestamp + token)
                    .digest('hex');

                if (!secureCompare(signature, expectedSignature)) {
                    console.error('Mailgun webhook signature verification failed');
                    return { statusCode: 403, body: JSON.stringify({ error: 'Invalid signature' }) };
                }
            }

            sender = params.get('sender') || params.get('from') || '';
            senderName = extractName(sender);
            senderEmail = extractEmail(sender);
            recipient = params.get('recipient') || '';
            subject = params.get('subject') || '(No Subject)';
            bodyHtml = params.get('body-html') || params.get('stripped-html') || '';
            bodyText = params.get('body-plain') || params.get('stripped-text') || '';
            messageId = params.get('Message-Id') || params.get('message-id') || '';
            inReplyTo = params.get('In-Reply-To') || params.get('in-reply-to') || '';
            references = params.get('References') || params.get('references') || '';
            cc = params.get('Cc') || params.get('cc') || '';

            // Mailgun attachments
            const attachmentCount = parseInt(params.get('attachment-count') || '0', 10);
            for (let i = 1; i <= attachmentCount; i++) {
                const attData = params.get(`attachment-${i}`);
                if (attData) {
                    attachmentsList.push({
                        filename: params.get(`attachment-${i}-name`) || `attachment-${i}`,
                        contentType: params.get(`attachment-${i}-type`) || 'application/octet-stream',
                        size: parseInt(params.get(`attachment-${i}-size`) || '0', 10),
                        data: attData,
                    });
                }
            }

            console.log(`[Mailgun] Inbound email from: ${senderEmail}, subject: ${subject}`);
        }

        // ─── THREADING LOGIC (shared for both sources) ───
        let threadId: number | null = null;

        // 1. Check In-Reply-To / References headers
        if (inReplyTo || references) {
            const refIds = [inReplyTo, ...references.split(/\s+/)].filter(Boolean);
            for (const refId of refIds) {
                const existing = await db
                    .select({ threadId: emailMessages.threadId })
                    .from(emailMessages)
                    .where(eq(emailMessages.mailgunId, refId.trim()));
                if (existing.length > 0) {
                    threadId = existing[0].threadId;
                    break;
                }
            }
        }

        // 2. Check by subject + sender
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
                const hasMatch = threadMessages.some(m => {
                    const mClean = (m.subject || '').replace(/^(Re:\s*|Fwd:\s*)+/i, '').trim();
                    return mClean === cleanSubject;
                });
                if (hasMatch) {
                    threadId = thread.id;
                    break;
                }
            }
        }

        // 3. Create new thread
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
            await db.update(emailThreads).set({
                isRead: false,
                status: 'open',
                lastMessageAt: new Date(),
            }).where(eq(emailThreads.id, threadId));
        }

        // ─── SAVE MESSAGE ───
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
            hasAttachments: attachmentsList.length > 0,
        }).returning();

        const messageDbId = (newMessage as any[])[0].id;

        // ─── SAVE ATTACHMENTS ───
        for (const att of attachmentsList) {
            await db.insert(emailAttachments).values({
                messageId: messageDbId,
                filename: att.filename,
                contentType: att.contentType,
                size: att.size || 0,
                data: att.data,
            });
        }

        console.log(`Email saved: thread ${threadId}, message ${messageDbId}`);
        return { statusCode: 200, body: JSON.stringify({ success: true, threadId, messageId: messageDbId }) };

    } catch (error: any) {
        console.error('Webhook error:', error);
        return { statusCode: 500, body: JSON.stringify({ error: error.message || 'Internal Server Error' }) };
    }
};

function extractEmail(fromField: string): string {
    const match = fromField.match(/<([^>]+)>/);
    return match ? match[1] : fromField.trim();
}

function extractName(fromField: string): string {
    const match = fromField.match(/^([^<]+)</);
    return match ? match[1].trim().replace(/^["']|["']$/g, '') : '';
}
