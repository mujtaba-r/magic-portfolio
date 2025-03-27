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
            <div className={styles.projectCard}>
                {metadata.images?.length > 0 && (
                    <div className={styles.imageContainer} onClick={handleImageClick}>
                        <OptimizedImage
                            src={metadata.images[activeIndex]}
                            alt={metadata.title}
                            width={1200}
                            height={675}
                            className={`${styles.image} ${isTransitioning ? styles.transitioning : ''}`}
                            objectFit="cover"
                        />
                        <div className={styles.imageOverlay} />
                    </div>
                )}
                <div className={styles.content}>
                    <h3 className={styles.title}>{metadata.title}</h3>
                    <p className={styles.description}>{metadata.summary}</p>
                    <div className={styles.tags}>
                        {metadata.tags?.map((tag, index) => (
                            <span key={index} className={styles.tag}>{tag}</span>
                        ))}
                    </div>
                </div>
            </div>
        </Link>
    );
}