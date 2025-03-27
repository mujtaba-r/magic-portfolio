import { ImageResponse } from 'next/og';
import { person } from '@/app/resources';

export const runtime = 'edge';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const title = searchParams.get('title');

        return new ImageResponse(
            (
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#000',
                        color: '#fff',
                        padding: '40px',
                    }}>
                    <div
                        style={{
                            fontSize: 60,
                            fontWeight: 700,
                            textAlign: 'center',
                            marginBottom: 20,
                        }}>
                        {title || person.name}
                    </div>
                    {!title && (
                        <div
                            style={{
                                fontSize: 30,
                                textAlign: 'center',
                            }}>
                            {person.role}
                        </div>
                    )}
                </div>
            ),
            {
                width: 1200,
                height: 630,
            },
        );
    } catch (e) {
        console.error(e);
        return new Response('Failed to generate OG image', { status: 500 });
    }
} 