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

        const files = fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx');
        console.log(`Found ${files.length} MDX files in ${dir}`);
        return files;
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

        console.log(`Successfully read file ${filePath} with title: ${metadata.title}`);
        return { metadata, content };
    } catch (error) {
        console.error(`Error reading file ${filePath}:`, error);
        return null;
    }
}

function getMDXData(dir: string) {
    console.log(`Getting MDX data from directory: ${dir}`);
    const mdxFiles = getMDXFiles(dir);
    
    const data = mdxFiles
        .map((file) => {
            const filePath = path.join(dir, file);
            console.log(`Processing file: ${filePath}`);
            const fileData = readMDXFile(filePath);
            if (!fileData) return null;
            
            const slug = path.basename(file, path.extname(file));
            return {
                metadata: fileData.metadata,
                slug,
                content: fileData.content,
            };
        })
        .filter((data): data is NonNullable<typeof data> => data !== null);

    console.log(`Processed ${data.length} files successfully`);
    return data;
}

export async function getPosts(customPath: string[]) {
    try {
        console.log('getPosts called with path:', customPath);
        
        // Filter out empty strings and normalize path
        const filteredPath = customPath.filter(Boolean);
        const postsDir = path.join(process.cwd(), ...filteredPath);
        
        console.log('Resolved directory path:', postsDir);
        console.log('Directory exists:', fs.existsSync(postsDir));
        
        const data = getMDXData(postsDir);
        console.log(`Found ${data.length} posts in ${postsDir}`);
        
        return data;
    } catch (error) {
        console.error(`Error in getPosts:`, error);
        console.error(`Failed path: ${customPath.join('/')}`);
        return [];
    }
} 