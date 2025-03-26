import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { ProjectMetadata, Project } from '../types';

const projectsDirectory = path.join(process.cwd(), 'src/app/work/projects');

export async function readMDXFile(slug: string): Promise<Project> {
    const fullPath = path.join(projectsDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Ensure required fields are present
    const metadata: ProjectMetadata = {
        title: data.title || 'Untitled Project',
        summary: data.description || data.summary || '',
        publishedAt: data.publishedAt || data.date || new Date().toISOString(),
        image: data.image || '',
        images: data.images || [],
        team: data.team || [],
        tags: data.tags || [],
    };

    return {
        metadata,
        content,
        slug,
    };
}

export async function getAllProjects(): Promise<Project[]> {
    const fileNames = fs.readdirSync(projectsDirectory);
    const projects = await Promise.all(
        fileNames
            .filter((fileName) => fileName.endsWith('.mdx'))
            .map(async (fileName) => {
                const slug = fileName.replace(/\.mdx$/, '');
                return readMDXFile(slug);
            })
    );

    // Sort projects by date
    return projects.sort((a, b) => {
        return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
    });
} 