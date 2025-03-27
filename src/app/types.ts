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
    role: string;
    description: string;
    startDate: string;
    endDate?: string;
    images?: Image[];
}

export interface Institution {
    name: string;
    description: string;
}

export interface Skill {
    title: string;
    description: string;
    images?: Image[];
} 