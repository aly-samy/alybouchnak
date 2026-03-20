import PostalMime from 'postal-mime';

export default {
    async email(message, env, ctx) {
        const { from, to, headers } = message;

        console.log(`📧 Received email from: ${from} to: ${to}`);

        // 1. Forward to Gmail (keep existing behavior)
        try {
            await message.forward(env.FORWARD_TO || 'alypd2018@gmail.com');
            console.log(`✅ Forwarded to Gmail`);
        } catch (err) {
            console.error(`❌ Gmail forward failed:`, err);
        }

        // 2. Parse the email content
        try {
            const rawEmail = await new Response(message.raw).arrayBuffer();
            const parser = new PostalMime();
            const parsed = await parser.parse(rawEmail);

            const subject = parsed.subject || headers.get('subject') || '(No Subject)';
            const messageId = headers.get('message-id') || '';
            const inReplyTo = headers.get('in-reply-to') || '';
            const references = headers.get('references') || '';
            const cc = headers.get('cc') || '';

            // Extract sender name from "Name <email>" format
            const fromName = from.includes('<')
                ? from.split('<')[0].trim().replace(/^["']|["']$/g, '')
                : '';
            const fromEmail = from.includes('<')
                ? from.match(/<([^>]+)>/)?.[1] || from
                : from;

            // Get body content
            const bodyHtml = parsed.html || '';
            const bodyText = parsed.text || '';

            // Collect attachments (base64, up to 5MB each)
            const attachments = [];
            if (parsed.attachments && parsed.attachments.length > 0) {
                for (const att of parsed.attachments) {
                    if (att.content && att.content.byteLength <= 5 * 1024 * 1024) {
                        const base64 = btoa(String.fromCharCode(...new Uint8Array(att.content)));
                        attachments.push({
                            filename: att.filename || 'attachment',
                            contentType: att.mimeType || 'application/octet-stream',
                            size: att.content.byteLength,
                            data: base64,
                        });
                    }
                }
            }

            // 3. POST to our webhook
            const payload = {
                source: 'cloudflare',
                secret: env.WEBHOOK_SECRET,
                from: fromEmail,
                fromName: fromName,
                to: to,
                subject: subject,
                bodyHtml: bodyHtml,
                bodyText: bodyText,
                messageId: messageId,
                inReplyTo: inReplyTo,
                references: references,
                cc: cc,
                attachments: attachments,
            };

            const webhookUrl = env.WEBHOOK_URL || 'https://alybouchnak.com/.netlify/functions/mailgun-webhook';
            const resp = await fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (resp.ok) {
                console.log(`✅ Webhook notified successfully`);
            } else {
                const errText = await resp.text();
                console.error(`❌ Webhook returned ${resp.status}: ${errText}`);
            }

        } catch (err) {
            console.error(`❌ Email processing failed:`, err);
        }
    },
};
