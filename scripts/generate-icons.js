const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateIcons() {
    // Ensure the public directory exists
    const publicDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir);
    }

    // Create a simple square icon with your initial or logo
    const size = 512;
    const background = '#000000';
    const foreground = '#FFFFFF';

    // Create an SVG with your initial or a simple shape
    const svg = `
        <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="${background}"/>
            <text x="50%" y="50%" font-family="Arial" font-size="${size/2}px" 
                fill="${foreground}" text-anchor="middle" dominant-baseline="middle">
                M
            </text>
        </svg>
    `;

    // Generate 512x512 icon
    await sharp(Buffer.from(svg))
        .resize(512, 512)
        .toFile(path.join(publicDir, 'icon-512x512.png'));

    // Generate 192x192 icon
    await sharp(Buffer.from(svg))
        .resize(192, 192)
        .toFile(path.join(publicDir, 'icon-192x192.png'));

    console.log('Icons generated successfully!');
}

generateIcons().catch(console.error); 