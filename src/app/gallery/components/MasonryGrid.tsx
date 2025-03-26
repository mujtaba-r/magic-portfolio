"use client";

import Masonry from 'react-masonry-css';
import { OptimizedImage } from "@/app/components/OptimizedImage";
import { gallery } from "@/app/resources";
import styles from "@/app/gallery/Gallery.module.scss";

export default function MasonryGrid() {
    const breakpointColumnsObj = {
        default: 4,
        1440: 3,
        1024: 2,
        560: 1
    };

    return (
        <Masonry
            breakpointCols={breakpointColumnsObj}
            className={styles.masonryGrid}
            columnClassName={styles.masonryGridColumn}>
            {gallery.images.map((image, index) => (
                <OptimizedImage
                    key={index}
                    src={image.src}
                    alt={image.alt}
                    width={image.orientation === "horizontal" ? 1200 : 675}
                    height={image.orientation === "horizontal" ? 675 : 1200}
                    className={styles.gridItem}
                    objectFit="cover"
                />
            ))}
        </Masonry>
    );
}