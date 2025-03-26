import { getPosts } from '@/app/lib/server';
import { Flex } from '@/once-ui/components';
import { ProjectCard } from '@/app/components';

interface ProjectsProps {
    range?: [number, number?];
}

export async function Projects({ range }: ProjectsProps) {
    let allProjects = await getPosts(['src', 'app', 'work', 'projects']);

    const sortedProjects = allProjects.sort((a, b) => {
        return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
    });

    const displayedProjects = range
        ? sortedProjects.slice(range[0] - 1, range[1] ?? sortedProjects.length)
        : sortedProjects;

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
}