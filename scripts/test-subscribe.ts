import 'dotenv/config';
import { handler } from '../netlify/functions/subscribe';
import type { HandlerEvent } from '@netlify/functions';

async function testSubscribe() {
    const mockEvent = {
        httpMethod: 'POST',
        body: JSON.stringify({
            email: 'test' + Date.now() + '@example.com',
            firstName: 'Testy',
            parentType: 'Toddler Parent',
            childName: 'Billy',
            childBirthMonth: 'March'
        })
    } as unknown as HandlerEvent;

    console.log('Invoking subscribe handler with:', mockEvent.body);

    const result = await handler(mockEvent, {} as any);

    console.log('Result:', result);

    if (result && typeof result === 'object' && 'body' in result && result.body) {
        console.log('Body:', JSON.parse(result.body as string));
    }
}

testSubscribe().catch(console.error);
