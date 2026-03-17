import type { Handler, HandlerEvent } from '@netlify/functions';
import { db } from '../../src/db/index.js';
import { emailThreads, emailMessages, emailAttachments } from '../../src/db/schema.js';
import { eq } from 'drizzle-orm';

const MAILGUN_API_URL = 'https://api.mailgun.net/v3';

// Default HTML email signature
const DEFAULT_SIGNATURE = `
<br/><br/>
<table cellpadding="0" cellspacing="0" style="border-top: 2px solid #F26B3A; padding-top: 16px; margin-top: 16px; font-family: 'Nunito', Arial, sans-serif;">
  <tr>
    <td style="padding-right: 16px; vertical-align: top;">
      <img src="https://alybouchnak.com/images/picsvg_modified.svg" alt="Aly Bouchnak" width="60" height="60" style="border-radius: 50%; display: block;" />
    </td>
    <td style="vertical-align: top;">
      <p style="margin: 0; font-size: 16px; font-weight: 700; color: #1a1a1a;">Aly Bouchnak</p>
      <p style="margin: 2px 0 0; font-size: 13px; color: #64748b;">The Bloom's House | Children's Music Producer</p>
      <p style="margin: 6px 0 0; font-size: 13px;">
        <a href="mailto:hello@alybouchnak.com" style="color: #F26B3A; text-decoration: none;">hello@alybouchnak.com</a>
        &nbsp;·&nbsp;
        <a href="https://alybouchnak.com" style="color: #F26B3A; text-decoration: none;">alybouchnak.com</a>
      </p>
    </td>
  </tr>
</table>
`;

/**
 * Mailgun Send Email Handler
 * Sends emails via Mailgun API with threading support, CC/BCC, attachments, and default signature.
 */
export const handler: Handler = async (event: HandlerEvent) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
    }

    // Auth check
    const adminToken = process.env.VITE_ADMIN_PASSWORD;
    const authHeader = event.headers.authorization;
    if (!authHeader || authHeader !== `Bearer ${adminToken}`) {
        return { statusCode: 401, body: JSON.stringify({ error: 'Unauthorized' }) };
    }

    try {
        const payload = JSON.parse(event.body || '{}');
        const { to, cc, bcc, subject, bodyHtml, threadId, inReplyTo, attachments } = payload;

        if (!to || !subject || !bodyHtml) {
            return { statusCode: 400, body: JSON.stringify({ error: 'to, subject, and bodyHtml are required' }) };
        }

        const apiKey = process.env.MAILGUN_API_KEY;
        const domain = process.env.MAILGUN_DOMAIN;
        const fromEmail = process.env.MAILGUN_FROM_EMAIL || 'hello@alybouchnak.com';
        const fromName = process.env.MAILGUN_FROM_NAME || 'Aly Bouchnak';

        if (!apiKey || !domain) {
            return { statusCode: 500, body: JSON.stringify({ error: 'Mailgun not configured' }) };
        }

        // Append default signature
        const fullHtml = bodyHtml + DEFAULT_SIGNATURE;

        // Build the Mailgun API form data
        const formData = new URLSearchParams();
        formData.append('from', `${fromName} <${fromEmail}>`);
        formData.append('to', to);
        formData.append('subject', subject);
        formData.append('html', fullHtml);

        if (cc) formData.append('cc', cc);
        if (bcc) formData.append('bcc', bcc);

        // Threading headers
        if (inReplyTo) {
            formData.append('h:In-Reply-To', inReplyTo);
            formData.append('h:References', inReplyTo);
        }

        // Send via Mailgun API
        const response = await fetch(`${MAILGUN_API_URL}/${domain}/messages`, {
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + Buffer.from(`api:${apiKey}`).toString('base64'),
            },
            body: formData,
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Mailgun send error:', errorText);
            return { statusCode: response.status, body: JSON.stringify({ error: `Mailgun error: ${errorText}` }) };
        }

        const result = await response.json();
        const mailgunMessageId = result.id || '';

        // --- Save to database ---
        let dbThreadId = threadId ? parseInt(threadId, 10) : null;

        // If no threadId, create a new thread
        if (!dbThreadId) {
            const recipientEmail = to.includes(',') ? to.split(',')[0].trim() : to;
            const newThread = await db.insert(emailThreads).values({
                subject: subject.replace(/^(Re:\s*|Fwd:\s*)+/i, '').trim(),
                participantEmail: extractEmail(recipientEmail),
                participantName: extractName(recipientEmail) || extractEmail(recipientEmail),
                status: 'replied',
                isRead: true,
                lastMessageAt: new Date(),
            }).returning();
            dbThreadId = (newThread as any[])[0].id;
        } else {
            // Update existing thread
            await db.update(emailThreads).set({
                status: 'replied',
                lastMessageAt: new Date(),
            }).where(eq(emailThreads.id, dbThreadId));
        }

        // Save the outbound message
        const newMessage = await db.insert(emailMessages).values({
            threadId: dbThreadId!,
            mailgunId: mailgunMessageId,
            direction: 'outbound',
            fromEmail,
            fromName,
            toEmail: to,
            cc: cc || null,
            bcc: bcc || null,
            subject,
            bodyHtml: fullHtml,
            bodyText: bodyHtml.replace(/<[^>]+>/g, ''), // Strip HTML for plain text
            hasAttachments: !!(attachments && attachments.length > 0),
        }).returning();

        const messageDbId = (newMessage as any[])[0].id;

        // Save attachments metadata
        if (attachments && attachments.length > 0) {
            for (const att of attachments) {
                await db.insert(emailAttachments).values({
                    messageId: messageDbId,
                    filename: att.filename,
                    contentType: att.contentType,
                    size: att.size || 0,
                    data: att.data, // base64
                });
            }
        }

        return {
            statusCode: 200,
            body: JSON.stringify({
                success: true,
                threadId: dbThreadId,
                messageId: messageDbId,
                mailgunId: mailgunMessageId,
            }),
        };

    } catch (error: any) {
        console.error('Mailgun send error:', error);
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
