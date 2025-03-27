export interface Image {
    src: string;
    alt: string;
    width: number;
    height: number;
}

export interface Team {
    name: string;
    role: string;
    avatar: string;
    linkedIn: string;
}

export interface ProjectMetadata {
    title: string;
    publishedAt: string;
    summary: string;
    image?: string;
    images: string[];
    team: Team[];
    tags: string[];
    description: string;
}

export interface Project {
    metadata: ProjectMetadata;
    slug: string;
    content: string;
}

export interface Experience {
    company: string;
    timeframe: string;
    role: string;
    location: string;
    achievements: React.ReactNode[];
    images: Image[];
}

export interface Institution {
    name: string;
    description: React.ReactNode;
}

export interface Skill {
    title: string;
    description: React.ReactNode;
    images: Image[];
}

export interface SocialLink {
    name: string;
    icon: string;
    link: string;
}

export interface Person {
    firstName: string;
    lastName: string;
    readonly name: string;
    role: string;
    bio?: string;
    avatar: string;
    location: string;
    languages: string[];
    skills?: string[];
    twitter?: string;
    social?: {
        twitter?: string;
        github?: string;
        linkedin?: string;
    };
}

export interface About {
    title: string;
    description: string;
    intro: {
        title: string;
        description: React.ReactNode;
        display: boolean;
    };
    work: {
        title: string;
        display: boolean;
        experiences: Experience[];
    };
    studies: {
        title: string;
        display: boolean;
        institutions: Institution[];
    };
    technical: {
        title: string;
        display: boolean;
        skills: Skill[];
    };
    tableOfContent: {
        display: boolean;
    };
    avatar: {
        display: boolean;
    };
    calendar: {
        display: boolean;
        link: string;
    };
} 