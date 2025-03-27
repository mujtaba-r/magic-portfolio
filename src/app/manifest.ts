import { MetadataRoute } from 'next';
import { person } from '@/app/resources';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: `${person.name}'s Portfolio`,
        short_name: person.name,
        description: person.bio,
        start_url: '/',
        display: 'standalone',
        background_color: '#000000',
        theme_color: '#000000',
        icons: [
            {
                src: '/icon-192x192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/icon-512x512.png',
                sizes: '512x512',
                type: 'image/png',
            },
            {
                src: '/icon-512x512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'maskable',
            },
        ],
    };
} 