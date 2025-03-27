import { NextResponse } from 'next/server';

const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
const MAILCHIMP_SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX;
const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID;

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json(
                { error: 'Email is required' },
                { status: 400 }
            );
        }

        if (!MAILCHIMP_API_KEY || !MAILCHIMP_SERVER_PREFIX || !MAILCHIMP_LIST_ID) {
            console.error('Missing Mailchimp configuration:', {
                hasApiKey: !!MAILCHIMP_API_KEY,
                hasServerPrefix: !!MAILCHIMP_SERVER_PREFIX,
                hasListId: !!MAILCHIMP_LIST_ID
            });
            return NextResponse.json(
                { error: 'Mailchimp configuration is missing' },
                { status: 500 }
            );
        }

        const response = await fetch(
            `https://${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `apikey ${MAILCHIMP_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email_address: email,
                    status: 'subscribed',
                }),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            console.error('Mailchimp API error:', data);
            return NextResponse.json(
                { error: data.detail || 'Failed to subscribe' },
                { status: response.status }
            );
        }

        return NextResponse.json(
            { message: 'Successfully subscribed!' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Subscription error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
} 