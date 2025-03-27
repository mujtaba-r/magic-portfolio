'use server';

import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { cache } from 'react';

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
    description: string;
    image?: string;
    images: string[];
    team: Team[];
    tags: string[];
    author?: string;
    updatedAt?: string;
};

type ContentType = 'blog' | 'work';

function getContentDirectory(type: ContentType) {
    const baseDir = path.join(process.cwd(), 'src', 'app', '_content', type);
    // For blog posts, look in the posts subdirectory
    if (type === 'blog') {
        return path.join(baseDir, 'posts');
    }
    // For work projects, look in the projects subdirectory
    if (type === 'work') {
        return path.join(baseDir, 'projects');
    }
    return baseDir;
}

async function getMDXFiles(dir: string) {
    try {
        await fs.access(dir);
        const files = await fs.readdir(dir);
        const mdxFiles = files.filter((file) => path.extname(file) === '.mdx');
        console.log(`Found ${mdxFiles.length} MDX files in ${dir}`);
        return mdxFiles;
    } catch (error: any) {
        if (error.code === 'ENOENT') {
            console.warn(`Directory not found: ${dir}`);
        } else {
            console.error(`Error reading directory ${dir}:`, error);
        }
        return [];
    }
}

async function readMDXFile(filePath: string) {
    try {
        const rawContent = await fs.readFile(filePath, 'utf-8');
        const { data, content } = matter(rawContent);

        // Handle both date and publishedAt fields
        const publishedAt = data.publishedAt || data.date;
        if (!publishedAt) {
            console.warn(`Warning: No date found in ${filePath}`);
        }

        const metadata: Metadata = {
            title: data.title || '',
            publishedAt: publishedAt || new Date().toISOString(),
            summary: data.summary || '',
            description: data.description || data.summary || '',
            image: data.image,
            images: data.images || (data.image ? [data.image] : []),
            team: data.team || [],
            tags: data.tags || [],
            author: data.author,
            updatedAt: data.updatedAt || data.publishedAt || data.date,
        };

        console.log(`Successfully read file ${filePath} with title: ${metadata.title}`);
        return { metadata, content };
    } catch (error: any) {
        if (error.code === 'ENOENT') {
            console.warn(`File not found: ${filePath}`);
        } else {
            console.error(`Error reading file ${filePath}:`, error);
        }
        return null;
    }
}

async function getMDXData(dir: string) {
    console.log(`Getting MDX data from directory: ${dir}`);
    const mdxFiles = await getMDXFiles(dir);
    
    const dataPromises = mdxFiles.map(async (file) => {
        const filePath = path.join(dir, file);
        console.log(`Processing file: ${filePath}`);
        const fileData = await readMDXFile(filePath);
        if (!fileData) return null;
        
        const slug = path.basename(file, path.extname(file));
        return {
            metadata: fileData.metadata,
            slug,
            content: fileData.content,
        };
    });

    const results = await Promise.all(dataPromises);
    const data = results.filter((item): item is NonNullable<typeof item> => item !== null);
    console.log(`Processed ${data.length} files successfully`);
    return data;
}

export const getPosts = cache(async () => {
    try {
        const contentDir = getContentDirectory('blog');
        console.log('Content directory:', contentDir);
        
        const data = await getMDXData(contentDir);
        console.log(`Found ${data.length} posts`);
        
        return data.sort((a, b) => 
            new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime()
        );
    } catch (error) {
        console.error(`Error in getPosts:`, error);
        return [];
    }
});

export const getWorkPosts = cache(async () => {
    try {
        const contentDir = getContentDirectory('work');
        console.log('Content directory:', contentDir);
        
        const data = await getMDXData(contentDir);
        console.log(`Found ${data.length} work posts`);
        
        return data.sort((a, b) => 
            new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime()
        );
    } catch (error) {
        console.error(`Error in getWorkPosts:`, error);
        return [];
    }
});

export const getPost = cache(async (slug: string) => {
    try {
        const contentDir = getContentDirectory('blog');
        const filePath = path.join(contentDir, `${slug}.mdx`);
        
        const fileData = await readMDXFile(filePath);
        if (!fileData) return null;
        
        return {
            metadata: fileData.metadata,
            slug,
            content: fileData.content,
        };
    } catch (error) {
        console.error(`Error in getPost:`, error);
        return null;
    }
});

export const getWorkPost = cache(async (slug: string) => {
    try {
        const contentDir = getContentDirectory('work');
        const filePath = path.join(contentDir, `${slug}.mdx`);
        
        const fileData = await readMDXFile(filePath);
        if (!fileData) return null;
        
        return {
            metadata: fileData.metadata,
            slug,
            content: fileData.content,
        };
    } catch (error) {
        console.error(`Error in getWorkPost:`, error);
        return null;
    }
}); 