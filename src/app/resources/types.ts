export interface Person {
    firstName: string;
    lastName: string;
    readonly name: string;
    role: string;
    bio: string;
    avatar: string;
    location: string;
    languages: string[];
    skills: string[];
    twitter?: string;
    social?: {
        twitter?: string;
        github?: string;
        linkedin?: string;
    };
} 