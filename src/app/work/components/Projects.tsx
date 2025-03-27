import { getWorkPosts } from '@/app/lib/server';
import { ProjectCard } from '@/app/components';
import styles from './Projects.module.scss';

interface ProjectsProps {
    range?: [number, number?];
}

export async function Projects({ range }: ProjectsProps) {
    try {
        let allProjects = await getWorkPosts();

        if (allProjects.length === 0) {
            return null;
        }

        // Apply range filter if provided
        const displayedProjects = range
            ? allProjects.slice(range[0] - 1, range[1] ?? allProjects.length)
            : allProjects;

        if (displayedProjects.length === 0) {
            return null;
        }

        return (
            <div className={styles.projectsGrid}>
                {displayedProjects.map((post) => (
                    <ProjectCard
                        key={post.slug}
                        metadata={post.metadata}
                        slug={post.slug}
                    />
                ))}
            </div>
        );
    } catch (error) {
        console.error('Error in Projects component:', error);
        return null;
    }
}