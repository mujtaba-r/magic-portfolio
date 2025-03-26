import type { ProjectMetadata } from '../types';
import { Flex, SmartImage } from '@/once-ui/components';

interface ProjectImagesProps {
    metadata: ProjectMetadata;
}

export function ProjectImages({ metadata }: ProjectImagesProps) {
    if (!metadata.images.length) return null;

    return (
        <Flex direction="column" gap="16">
            {metadata.images.map((image, index) => (
                <SmartImage
                    key={index}
                    src={image}
                    alt={`${metadata.title} - Image ${index + 1}`}
                    width={1200}
                    height={675}
                    style={{ width: '100%', height: 'auto' }}
                />
            ))}
        </Flex>
    );
} 