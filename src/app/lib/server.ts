'use server';

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

type Team = {
    name: string;
    role: string;
    avatar: string;
    linkedIn: string;
};

type Metadata = {
    title: string;
    publishedAt: string;
    summary: string;
    image?: string;
    images: string[];
    team: Team[];
    tags: string[];
};

function getMDXFiles(dir: string) {
    try {
        if (!fs.existsSync(dir)) {
            console.warn(`Directory not found: ${dir}`);
            return [];
        }

        return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx');
    } catch (error) {
        console.error(`Error reading directory ${dir}:`, error);
        return [];
    }
}

function readMDXFile(filePath: string) {
    try {
        if (!fs.existsSync(filePath)) {
            console.warn(`File not found: ${filePath}`);
            return null;
        }

        const rawContent = fs.readFileSync(filePath, 'utf-8');
        const { data, content } = matter(rawContent);

        // Handle both date and publishedAt fields
        const publishedAt = data.publishedAt || data.date;
        if (!publishedAt) {
            console.warn(`Warning: No date found in ${filePath}`);
        }

        const metadata: Metadata = {
            title: data.title || '',
            publishedAt: publishedAt || new Date().toISOString(),
            summary: data.summary || data.description || '',
            image: data.image,
            images: data.images || (data.image ? [data.image] : []),
            team: data.team || [],
            tags: data.tags || [],
        };

        return { metadata, content };
    } catch (error) {
        console.error(`Error reading file ${filePath}:`, error);
        return null;
    }
}

function getMDXData(dir: string) {
    const mdxFiles = getMDXFiles(dir);
    return mdxFiles
        .map((file) => {
            const fileData = readMDXFile(path.join(dir, file));
            if (!fileData) return null;
            
            const slug = path.basename(file, path.extname(file));
            return {
                metadata: fileData.metadata,
                slug,
                content: fileData.content,
            };
        })
        .filter((data): data is NonNullable<typeof data> => data !== null);
}

export async function getPosts(customPath = ['', '', '', '']) {
    const postsDir = path.join(process.cwd(), ...customPath);
    try {
        return getMDXData(postsDir);
    } catch (error) {
        console.error(`Error reading posts from ${postsDir}:`, error);
        return [];
    }
} 