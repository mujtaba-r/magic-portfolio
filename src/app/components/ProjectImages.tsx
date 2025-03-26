import type { ProjectMetadata } from '../types';
import { Flex } from '@/once-ui/components';
import { OptimizedImage } from './OptimizedImage';

interface ProjectImagesProps {
    metadata: ProjectMetadata;
}

export function ProjectImages({ metadata }: ProjectImagesProps) {
    if (!metadata.images.length) return null;

    return (
        <Flex direction="column" gap="16">
            {metadata.images.map((image, index) => (
                <OptimizedImage
                    key={index}
                    src={image}
                    alt={`${metadata.title} - Image ${index + 1}`}
                    width={1200}
                    height={675}
                    className="project-image"
                    objectFit="cover"
                />
            ))}
        </Flex>
    );
} 