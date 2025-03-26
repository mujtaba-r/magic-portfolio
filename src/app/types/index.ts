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