import mdx from '@next/mdx';

const withMDX = mdx({
    extension: /\.mdx?$/,
    options: { },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
    images: {
        formats: ['image/avif', 'image/webp'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },
    // Include _content directory in the build
    webpack: (config, { isServer }) => {
        config.watchOptions = {
            ...config.watchOptions,
            ignored: ['node_modules/**', '!**/_content/**'],
        };
        return config;
    },
};

export default withMDX(nextConfig);