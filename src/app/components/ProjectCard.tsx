"use client";

import { AvatarGroup, Flex, Heading, SmartImage, SmartLink, Text, Tag } from "@/once-ui/components";
import { useState } from "react";
import { ProjectMetadata } from '@/app/types';
import Link from 'next/link';
import styles from './ProjectCard.module.scss';
import { OptimizedImage } from './OptimizedImage';

interface ProjectCardProps {
    metadata: ProjectMetadata;
    slug: string;
}

export function ProjectCard({ metadata, slug }: ProjectCardProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const handleImageClick = () => {
        setIsTransitioning(true);
        const nextIndex = (activeIndex + 1) % metadata.images.length;
        setTimeout(() => {
            setActiveIndex(nextIndex);
            setIsTransitioning(false);
        }, 200);
    };

    const handleControlClick = (index: number) => {
        if (index !== activeIndex) {
            setIsTransitioning(true);
            setTimeout(() => {
                setActiveIndex(index);
                setIsTransitioning(false);
            }, 200);
        }
    };

    return (
        <Link href={`/work/${slug}`}>
            <Flex
                as="article"
                fillWidth
                direction="column"
                gap="m"
                className={styles.card}>
                {metadata.images?.length > 0 && (
                    <OptimizedImage
                        src={metadata.images[activeIndex]}
                        alt={metadata.title}
                        width={1200}
                        height={675}
                        className={`${styles.image} ${isTransitioning ? styles.transitioning : ''}`}
                        objectFit="cover"
                    />
                )}
                <Flex
                    direction="column"
                    gap="8">
                    <Heading
                        variant="heading-strong-l">
                        {metadata.title}
                    </Heading>
                    <Text
                        variant="body-default-m"
                        onBackground="neutral-weak">
                        {metadata.summary}
                    </Text>
                    <Flex
                        wrap
                        gap="8">
                        {metadata.tags?.map((tag, index) => (
                            <Tag
                                key={index}
                                size="s">
                                {tag}
                            </Tag>
                        ))}
                    </Flex>
                </Flex>
            </Flex>
        </Link>
    );
}