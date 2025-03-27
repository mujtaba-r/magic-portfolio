import { getWorkPosts } from '@/app/lib/server';
import { Flex } from '@/once-ui/components';
import { ProjectCard } from '@/app/components';

interface ProjectsProps {
    range?: [number, number?];
}

export async function Projects({ range }: ProjectsProps) {
    try {
        console.log('Projects component: Fetching projects...');
        let allProjects = await getWorkPosts();
        console.log(`Projects component: Found ${allProjects.length} projects`);

        if (allProjects.length === 0) {
            console.warn('Projects component: No projects found');
            return null;
        }

        // Apply range filter if provided
        const displayedProjects = range
            ? allProjects.slice(range[0] - 1, range[1] ?? allProjects.length)
            : allProjects;

        console.log(`Projects component: Displaying ${displayedProjects.length} projects`);

        if (displayedProjects.length === 0) {
            console.warn('Projects component: No projects to display after filtering');
            return null;
        }

        return (
            <Flex
                fillWidth gap="l" marginBottom="40" paddingX="l"
                direction="column">
                {displayedProjects.map((post) => (
                    <ProjectCard
                        key={post.slug}
                        metadata={post.metadata}
                        slug={post.slug}
                    />
                ))}
            </Flex>
        );
    } catch (error) {
        console.error('Error in Projects component:', error);
        return null;
    }
}