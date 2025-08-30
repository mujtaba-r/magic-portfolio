import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'Magic Portfolio';

  const svg = `<?xml version="1.0" encoding="utf-8"?>
  <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
    <defs>
      <linearGradient id="g" x1="0" x2="1">
        <stop offset="0%" stop-color="#7C3AED" />
        <stop offset="100%" stop-color="#06B6D4" />
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="#0f172a" />
    <rect x="40" y="40" width="1120" height="550" rx="24" fill="url(#g)" opacity="0.08" />
    <g transform="translate(80,160)">
      <text x="0" y="0" font-size="48" fill="#fff" font-family="Inter, system-ui, sans-serif" font-weight="700">${escapeXml(title)}</text>
    </g>
    <g transform="translate(80,520)">
      <text x="0" y="0" font-size="20" fill="#9CA3AF" font-family="Inter, system-ui, sans-serif">Once UI • magic-portfolio</text>
    </g>
  </svg>`;

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}

function escapeXml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
