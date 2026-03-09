import type { Handler, HandlerEvent } from '@netlify/functions';

const handler: Handler = async (event: HandlerEvent) => {
    // Only allow POST requests triggered by Netlify's internal form hook
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        // Parse the payload sent securely by Netlify Forms
        const payload = JSON.parse(event.body || '{}');

        // Netlify passes the form data inside payload.payload
        const { name, form_name, data } = payload.payload;
        const email = data?.email;
        const isSubscribing = data?.subscribe === 'true' || data?.subscribe === true;

        console.log(`Received form submission for: ${form_name} from ${email}`);

        // If there is no email, or they explicitly unchecked a subscribe box on the Contact form
        if (!email) {
            console.log('No email found in submission. Skipping Mailchimp sync.');
            return { statusCode: 200, body: 'OK - No email to sync' };
        }

        if (form_name === 'contact' && !isSubscribing) {
            console.log('User opted out of newsletter on Contact form. Skipping Mailchimp sync.');
            return { statusCode: 200, body: 'OK - Opted out' };
        }

        // Required Environment Variables configured in Netlify Dashboard
        const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
        const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID;
        const MAILCHIMP_DATA_CENTER = process.env.MAILCHIMP_API_KEY?.split('-')[1]; // e.g. "us1", "us2"

        if (!MAILCHIMP_API_KEY || !MAILCHIMP_LIST_ID || !MAILCHIMP_DATA_CENTER) {
            console.error('Mailchimp environment variables are missing.');
            return {
                statusCode: 500,
                body: 'Configuration Error: Missing API keys'
            };
        }

        // Prepare the Mailchimp API URL and Payload
        const url = `https://${MAILCHIMP_DATA_CENTER}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`;
        const mailchimpData = {
            email_address: email,
            status: 'subscribed',
            merge_fields: {
                FNAME: data.name ? data.name.split(' ')[0] : '',
                LNAME: data.name && data.name.includes(' ') ? data.name.split(' ').slice(1).join(' ') : '',
                SOURCE: form_name // Track where they signed up from
            }
        };

        // Make the REST request
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `apikey ${MAILCHIMP_API_KEY}`,
            },
            body: JSON.stringify(mailchimpData),
        });

        const responseData = await response.json();

        // The user was already subscribed (Mailchimp throws a 400 with title "Member Exists")
        if (response.status === 400 && responseData.title === 'Member Exists') {
            console.log(`${email} is already on the mailing list.`);
            return { statusCode: 200, body: 'Already subscribed' };
        }

        // Any other Mailchimp error
        if (!response.ok) {
            console.error('Mailchimp API Error:', responseData);
            throw new Error(`Mailchimp error: ${responseData.detail || response.statusText}`);
        }

        console.log(`Successfully added ${email} to Mailchimp list!`);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Successfully subscribed to Mailchimp' }),
        };

    } catch (error) {
        console.error('Webhook processing failed:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
};

export { handler };
