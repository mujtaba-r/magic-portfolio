export interface ProjectMetadata {
    title: string;
    summary: string;
    images: string[];
    tags: string[];
    publishedAt: string;
    updatedAt?: string;
}

export interface Image {
    src: string;
    alt: string;
    width: number;
    height: number;
}

export interface Experience {
    company: string;
    timeframe: string;
    role: string;
    location: string;
    achievements: JSX.Element[];
    images: Image[];
}

export interface Institution {
    name: string;
    description: JSX.Element;
}

export interface Skill {
    title: string;
    description: JSX.Element;
    images?: Image[];
} 