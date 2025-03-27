"use client";

import { Flex, SmartLink, Text, Tag } from '@/once-ui/components';
import styles from './ProjectCard.module.scss';
import Image from 'next/image';

interface ProjectCardProps {
    metadata: {
        title: string;
        description: string;
        image?: string;
        tags?: string[];
    };
    slug: string;
}

export function ProjectCard({ metadata, slug }: ProjectCardProps) {
    return (
        <SmartLink
            href={`/work/${slug}`}
            className={styles.projectCard}>
            <Flex
                fillWidth
                direction="column"
                gap="m"
                className={styles.content}>
                {metadata.image && (
                    <div className={styles.imageContainer}>
                        <Image
                            src={metadata.image}
                            alt={metadata.title}
                            width={1200}
                            height={630}
                            className={styles.image}
                        />
                        <div className={styles.imageOverlay} />
                    </div>
                )}
                <Flex
                    direction="column"
                    gap="s"
                    className={styles.details}>
                    <Text
                        variant="heading-strong-l"
                        className={styles.title}>
                        {metadata.title}
                    </Text>
                    <Text
                        variant="body-default-m"
                        onBackground="neutral-weak"
                        className={styles.description}>
                        {metadata.description}
                    </Text>
                    {metadata.tags && metadata.tags.length > 0 && (
                        <Flex gap="s" wrap className={styles.tags}>
                            {metadata.tags.map((tag) => (
                                <Tag
                                    key={tag}
                                    variant="accent"
                                    size="s">
                                    {tag}
                                </Tag>
                            ))}
                        </Flex>
                    )}
                </Flex>
            </Flex>
        </SmartLink>
    );
}