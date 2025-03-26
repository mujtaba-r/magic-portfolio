import { getPosts } from '@/app/lib/server';
import { Flex } from '@/once-ui/components';
import { ProjectCard } from '@/app/components';

interface ProjectsProps {
    range?: [number, number?];
}

export async function Projects({ range }: ProjectsProps) {
    try {
        console.log('Projects component: Fetching projects...');
        let allProjects = await getPosts('work');
        console.log(`Projects component: Found ${allProjects.length} projects`);

        if (allProjects.length === 0) {
            console.warn('Projects component: No projects found');
            return null;
        }

        const sortedProjects = allProjects.sort((a, b) => {
            try {
                const dateA = new Date(a.metadata.publishedAt);
                const dateB = new Date(b.metadata.publishedAt);
                if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
                    console.warn('Projects component: Invalid date found', { a: a.metadata.publishedAt, b: b.metadata.publishedAt });
                    return 0;
                }
                return dateB.getTime() - dateA.getTime();
            } catch (error) {
                console.warn('Projects component: Error sorting dates:', error);
                return 0;
            }
        });

        const displayedProjects = range
            ? sortedProjects.slice(range[0] - 1, range[1] ?? sortedProjects.length)
            : sortedProjects;

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