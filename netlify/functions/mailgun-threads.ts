import type { Handler, HandlerEvent } from '@netlify/functions';
import { db } from '../../src/db/index.js';
import { emailThreads, emailMessages, emailAttachments } from '../../src/db/schema.js';
import { eq, desc, sql } from 'drizzle-orm';
import { secureCompare } from './utils/security.js';

/**
 * Email Threads API — powers the admin inbox UI
 * GET /                → List all threads (with unread count badge)
 * GET /:id             → Get thread with all messages + attachments
 * PUT /:id/read        → Mark thread as read
 * PUT /:id/status      → Update thread status (open/replied/closed)
 * DELETE /:id          → Delete thread and all messages
 * GET /unread-count     → Get total unread count for notification badge
 */
export const handler: Handler = async (event: HandlerEvent) => {
    // Auth check for all methods
    const adminToken = process.env.VITE_ADMIN_PASSWORD;
    const authHeader = event.headers.authorization;
    if (!adminToken || !authHeader || !secureCompare(authHeader, `Bearer ${adminToken}`)) {
        return { statusCode: 401, body: JSON.stringify({ error: 'Unauthorized' }) };
    }

    try {
        const { httpMethod, path } = event;
        const pathParts = path.split('/').filter(Boolean);
        const resourceIndex = pathParts.findIndex(p => p === 'mailgun-threads') + 1;
        const param1 = pathParts[resourceIndex]; // thread ID or 'unread-count'
        const param2 = pathParts[resourceIndex + 1]; // 'read' or 'status'

        // --- GET /unread-count ---
        if (httpMethod === 'GET' && param1 === 'unread-count') {
            const result = await db
                .select({ count: sql<number>`count(*)::int` })
                .from(emailThreads)
                .where(eq(emailThreads.isRead, false));
            return {
                statusCode: 200,
                body: JSON.stringify({ unreadCount: result[0]?.count || 0 }),
            };
        }

        // --- GET all threads ---
        if (httpMethod === 'GET' && !param1) {
            const threads = await db
                .select()
                .from(emailThreads)
                .orderBy(desc(emailThreads.lastMessageAt));

            // Get message counts and latest preview for each thread
            const threadsWithMeta = await Promise.all(
                threads.map(async (thread) => {
                    const messages = await db
                        .select({
                            id: emailMessages.id,
                            direction: emailMessages.direction,
                            bodyText: emailMessages.bodyText,
                            createdAt: emailMessages.createdAt,
                        })
                        .from(emailMessages)
                        .where(eq(emailMessages.threadId, thread.id))
                        .orderBy(desc(emailMessages.createdAt));

                    const latestMessage = messages[0];
                    const preview = latestMessage?.bodyText
                        ? latestMessage.bodyText.substring(0, 120) + (latestMessage.bodyText.length > 120 ? '...' : '')
                        : '';

                    return {
                        ...thread,
                        messageCount: messages.length,
                        preview,
                        lastDirection: latestMessage?.direction || 'inbound',
                    };
                })
            );

            return { statusCode: 200, body: JSON.stringify(threadsWithMeta) };
        }

        // --- GET single thread with messages ---
        if (httpMethod === 'GET' && param1 && !param2) {
            const threadId = parseInt(param1, 10);
            if (isNaN(threadId)) return { statusCode: 400, body: JSON.stringify({ error: 'Invalid thread ID' }) };

            const thread = await db.select().from(emailThreads).where(eq(emailThreads.id, threadId));
            if (!thread.length) return { statusCode: 404, body: JSON.stringify({ error: 'Thread not found' }) };

            const messages = await db
                .select()
                .from(emailMessages)
                .where(eq(emailMessages.threadId, threadId))
                .orderBy(emailMessages.createdAt);

            // Get attachments for each message
            const messagesWithAttachments = await Promise.all(
                messages.map(async (msg) => {
                    const attachments = await db
                        .select({
                            id: emailAttachments.id,
                            filename: emailAttachments.filename,
                            contentType: emailAttachments.contentType,
                            size: emailAttachments.size,
                        })
                        .from(emailAttachments)
                        .where(eq(emailAttachments.messageId, msg.id));

                    return { ...msg, attachments };
                })
            );

            // Mark as read
            await db.update(emailThreads).set({ isRead: true }).where(eq(emailThreads.id, threadId));

            return {
                statusCode: 200,
                body: JSON.stringify({
                    ...thread[0],
                    isRead: true,
                    messages: messagesWithAttachments,
                }),
            };
        }

        // --- PUT /:id/read ---
        if (httpMethod === 'PUT' && param2 === 'read') {
            const threadId = parseInt(param1, 10);
            await db.update(emailThreads).set({ isRead: true }).where(eq(emailThreads.id, threadId));
            return { statusCode: 200, body: JSON.stringify({ success: true }) };
        }

        // --- PUT /:id/status ---
        if (httpMethod === 'PUT' && param2 === 'status') {
            const threadId = parseInt(param1, 10);
            const payload = JSON.parse(event.body || '{}');
            await db.update(emailThreads).set({ status: payload.status }).where(eq(emailThreads.id, threadId));
            return { statusCode: 200, body: JSON.stringify({ success: true }) };
        }

        // --- DELETE /:id ---
        if (httpMethod === 'DELETE' && param1) {
            const threadId = parseInt(param1, 10);
            // Cascade will handle messages and attachments via FK
            await db.delete(emailThreads).where(eq(emailThreads.id, threadId));
            return { statusCode: 200, body: JSON.stringify({ success: true, deletedId: threadId }) };
        }

        return { statusCode: 400, body: JSON.stringify({ error: 'Bad Request' }) };

    } catch (error: any) {
        console.error('Mailgun threads API error:', error);
        return { statusCode: 500, body: JSON.stringify({ error: error.message || 'Internal Server Error' }) };
    }
};
