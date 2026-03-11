import type { Handler, HandlerEvent } from '@netlify/functions';
import { db } from '../../src/db/index.js';
import { subscribers } from '../../src/db/schema.js';
import { eq } from 'drizzle-orm';

export const handler: Handler = async (event: HandlerEvent) => {
    // Allows POST (subscribe) and DELETE (unsubscribe/admin remove) and PUT (update)
    if (!['POST', 'PUT', 'DELETE'].includes(event.httpMethod)) {
        return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
    }

    try {
        let payload: any = {};
        if (event.body) {
            payload = JSON.parse(event.body);
        }

        const { email, firstName, parentType, childName, childBirthMonth, status } = payload;
        const emailAddress = email || payload.email_address; // Kit usually uses email_address

        if (!emailAddress) {
            return { statusCode: 400, body: JSON.stringify({ error: 'Email is required' }) };
        }

        // Handle Unsubscribe / Delete
        if (event.httpMethod === 'DELETE') {
            const id = parseInt(event.queryStringParameters?.id || '', 10) || payload.id;

            // Delete locally
            if (id) {
                await db.delete(subscribers).where(eq(subscribers.id, id));
            } else {
                await db.delete(subscribers).where(eq(subscribers.email, emailAddress));
            }

            // Sync with Kit Unsubscribe (V4 doesn't easily delete, it unsubscribes)
            // https://developers.kit.com/v4/#put_subscribers-id-unsubscribe
            // Note: We'd need subscriber ID from Kit to unsubscribe, which we don't store yet.
            // Alternatively, Kit doesn't mind if we just leave them if they delete locally, 
            // but for best practice, we can fetch their ID via email first in Kit and then unsubscribe.
            // However, the simplest lean setup right now relies on Kit's own unsubscribe links.

            return { statusCode: 200, body: JSON.stringify({ success: true, action: 'deleted' }) };
        }

        // Prepare local DB payload
        const subscriberData = {
            email: emailAddress,
            firstName,
            parentType,
            childName,
            childBirthMonth,
            status: status || 'active',
            updatedAt: new Date()
        };

        // UPSERT local database
        const existing = await db.select().from(subscribers).where(eq(subscribers.email, emailAddress));
        let localRecord;
        if (existing.length > 0) {
            const updated = await db.update(subscribers).set(subscriberData).where(eq(subscribers.id, existing[0].id)).returning();
            localRecord = updated[0];
        } else {
            const inserted = await db.insert(subscribers).values({ ...subscriberData, createdAt: new Date() }).returning();
            localRecord = inserted[0];
        }

        // Sync with Kit (ConvertKit) API
        if (process.env.KIT_API_KEY) {
            try {
                // Collect Tags based on Parent Type
                const tags: number[] = [];
                // example map: if (parentType === "Toddler Parent") tags.push(12345);
                // Currently sending empty tags array or specific ones if needed

                const kitResponse = await fetch("https://api.kit.com/v4/subscribers", {
                    method: "POST",
                    headers: {
                        "X-Kit-Api-Key": process.env.KIT_API_KEY,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email_address: emailAddress,
                        first_name: firstName,
                        tags: tags,
                        // Adding custom fields for child data. 
                        // IMPORTANT: You must create these Custom Fields in your Kit dashboard first.
                        fields: {
                            child_name: childName,
                            child_birth_month: childBirthMonth,
                            parent_type: parentType
                        }
                    }),
                });

                if (!kitResponse.ok) {
                    console.error('Kit API Error:', await kitResponse.text());
                }
            } catch (kitErr) {
                console.error('Failed to sync with Kit API:', kitErr);
            }
        }

        return { statusCode: 200, body: JSON.stringify({ success: true, subscriber: localRecord }) };

    } catch (error: any) {
        console.error('Subscribe Server Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message || 'Internal Server Error' }),
        };
    }
};
