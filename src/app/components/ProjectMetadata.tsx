import type { ProjectMetadata } from '../types';
import { Flex, Heading, Text, Tag } from '@/once-ui/components';

interface ProjectMetadataProps {
    metadata: ProjectMetadata;
}

export function ProjectMetadata({ metadata }: ProjectMetadataProps) {
    return (
        <Flex direction="column" gap="16">
            <Heading as="h1">{metadata.title}</Heading>
            <Text>{metadata.summary}</Text>
            <Flex gap="8" wrap>
                {metadata.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                ))}
            </Flex>
            {metadata.team && metadata.team.length > 0 && (
                <Flex direction="column" gap="8">
                    <Heading as="h3">Team</Heading>
                    <Flex gap="16" wrap>
                        {metadata.team.map((member) => (
                            <Flex key={member.name} gap="8" align="center">
                                <img
                                    src={member.avatar}
                                    alt={member.name}
                                    width={40}
                                    height={40}
                                    style={{ borderRadius: '50%' }}
                                />
                                <Flex direction="column">
                                    <Text weight="strong">{member.name}</Text>
                                    <Text size="xs">{member.role}</Text>
                                </Flex>
                            </Flex>
                        ))}
                    </Flex>
                </Flex>
            )}
        </Flex>
    );
} 