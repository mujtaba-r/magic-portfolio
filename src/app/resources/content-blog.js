import { InlineCode } from "@/once-ui/components";
import Link from 'next/link'
import { SparkleFx } from "@/once-ui/components";
import { LetterFx } from "@/once-ui/components";

const person = {
    firstName: 'Mujtaba',
    lastName:  'Rizvi',
    get name() {
        return `${this.firstName} ${this.lastName}`;
    },
    role:      'Multidisciplinary Technologist',
    avatar:    '/images/avatar.jpeg',
    location:  'America/Toronto',        // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
    languages: ['English', 'Urdu', 'Hindi']  // optional: Leave the array empty if you don't want to display languages
}

const newsletter = {
    title: <><SparkleFx
    speed="medium"
    count={50}
    trigger="instant"
  >Subscribe to My Newsletter</SparkleFx></>,
    description: <>Exploring the intersection of technology, creativity, and human possibility, I share reflections on innovation, entrepreneurship, and the transformative power of challenging the impossible.</>
}

const social = [
    // Links are automatically displayed.
    // Import new icons in /once-ui/icons.ts
    {
        name: 'GitHub',
        icon: 'github',
        link: 'https://github.com/mujtaba-r/',
    },
    {
        name: 'LinkedIn',
        icon: 'linkedin',
        link: 'https://www.linkedin.com/in/mujtabahassanrizvi/',
    },
    {
        name: 'X',
        icon: 'x',
        link: 'https://x.com/mujtabarizvii',
    },
    {
        name: 'Email',
        icon: 'email',
        link: 'mailto:mujtabahassanrizvi@outlook.com',
    },
]

const home = {
    label: 'Home',
    title: `${person.name}'s Portfolio`,
    description: `Portfolio website showcasing my work as a ${person.role}`,
    headline: <span
    style={{
      fontFamily: 'var(--font-secondary)'
    }}
  >
    <LetterFx
      speed="medium"
      trigger="hover"
      charset={[
        'X',
        '@',
        '$',
        'a',
        'H',
        'z',
        'o',
        '0',
        'y',
        '#',
        '?',
        '*',
        '0',
        '1',
        '+'
      ]}
    >Multidisciplinary Technologist</LetterFx></span>,
    subline: <>Welcome! I'm Mujtaba Rizvi, a <InlineCode>Multidisciplinary Technologist</InlineCode> exploring the dynamic intersections of technology, creativity, and human potential. With a passion for continuous learning, I delve into design, development, and innovation to create solutions that inspire and empower. Join me on this journey as we push the boundaries of what's possible and shape the future together.</>
}

const about = {
    label: 'About',
    title: 'About me',
    description: `Meet ${person.name}, ${person.role} from ${person.location}`,
    tableOfContent: {
        display: false,
        subItems: false
    },
    avatar: {
        display: false
    },
    calendar: {
        display: false,
        link: 'https://calendly.com/mujtabahassanrizvi/schedule-a-call'
    },
    intro: {
        display: true,
        title: 'Introduction',
        description: 
        <>
           <p>Fueled by insatiable curiosity and a commitment to lifelong learning, I thrive at the crossroads of technology and creativity. From software and web development to project management and business analytics, I immerse myself in diverse fields to craft <Link href = '/work'>innovative solutions.</Link> By blending engineering principles with creative insight, I aim to make a meaningful impact and inspire others to explore, learn, and innovate alongside me.</p>
        </>
    },
    work: {
        display: false, // set to false to hide this section
        title: 'Work Experience',
        experiences: [
            {
                company: 'FLY',
                timeframe: '2022 - Present',
                role: 'Senior Design Engineer',
                achievements: [
                    <>Redesigned the UI/UX for the FLY platform, resulting in a 20% increase in user engagement and 30% faster load times.</>,
                    <>Spearheaded the integration of AI tools into design workflows, enabling designers to iterate 50% faster.</>
                ],
                images: [ // optional: leave the array empty if you don't want to display images
                    {
                        src: '/images/projects/project-01/cover-01.jpg',
                        alt: 'Once UI Project',
                        width: 16,
                        height: 9
                    }
                ]
            },
            {
                company: 'Creativ3',
                timeframe: '2018 - 2022',
                role: 'Lead Designer',
                achievements: [
                    <>Developed a design system that unified the brand across multiple platforms, improving design consistency by 40%.</>,
                    <>Led a cross-functional team to launch a new product line, contributing to a 15% increase in overall company revenue.</>
                ],
                images: [ ]
            }
        ]
    },
    studies: {
        display: false, // set to false to hide this section
        title: 'Studies',
        institutions: [
            {
                name: 'Knox College',
                description: <>Bachelor's of Science in Computer Science.</>,
            },
            {
                name: 'Knox College',
                description: <>Bachelor's of Arts in Business & Management.</>,
            }
        ]
    },
    technical: {
        display: false, // set to false to hide this section
        title: 'Technical skills',
        skills: [
            {
                title: 'Figma',
                description: <>Able to prototype in Figma with Once UI with unnatural speed.</>,
                images: [
                    {
                        src: '/images/projects/project-01/cover-02.jpg',
                        alt: 'Project image',
                        width: 16,
                        height: 9
                    },
                    {
                        src: '/images/projects/project-01/cover-03.jpg',
                        alt: 'Project image',
                        width: 16,
                        height: 9
                    },
                ]
            },
            {
                title: 'Next.js',
                description: <>Building next gen apps with Next.js + Once UI + Supabase.</>,
                images: [
                    {
                        src: '/images/projects/project-01/cover-04.jpg',
                        alt: 'Project image',
                        width: 16,
                        height: 9
                    },
                ]
            }
        ]
    }
}

const blog = {
    label: 'Blog',
    title: 'My Thoughts on Life, Tech, and Entrepreneurship',
    description: `Read what ${person.name} has been up to recently`
    // Create new blog posts by adding a new .mdx file to app/blog/posts
    // All posts will be listed on the /blog route
}

const work = {
    label: 'Work',
    title: 'My projects',
    description: `Design and dev projects by ${person.name}`
    // Create new project pages by adding a new .mdx file to app/blog/posts
    // All projects will be listed on the /home and /work routes
}

const gallery = {
    label: 'Gallery',
    title: 'My photo gallery',
    description: `A photo collection by ${person.name}`,
    // Images from https://pexels.com
    images: [
        { 
            src: '/images/gallery/img-01.jpg', 
            alt: 'image',
            orientation: 'vertical'
        },
        { 
            src: '/images/gallery/img-02.jpg', 
            alt: 'image',
            orientation: 'horizontal'
        },
        { 
            src: '/images/gallery/img-03.jpg', 
            alt: 'image',
            orientation: 'vertical'
        },
        { 
            src: '/images/gallery/img-04.jpg', 
            alt: 'image',
            orientation: 'horizontal'
        },
        { 
            src: '/images/gallery/img-05.jpg', 
            alt: 'image',
            orientation: 'horizontal'
        },
        { 
            src: '/images/gallery/img-06.jpg', 
            alt: 'image',
            orientation: 'vertical'
        },
        { 
            src: '/images/gallery/img-07.jpg', 
            alt: 'image',
            orientation: 'horizontal'
        },
        { 
            src: '/images/gallery/img-08.jpg', 
            alt: 'image',
            orientation: 'vertical'
        },
        { 
            src: '/images/gallery/img-09.jpg', 
            alt: 'image',
            orientation: 'horizontal'
        },
        { 
            src: '/images/gallery/img-10.jpg', 
            alt: 'image',
            orientation: 'horizontal'
        },
        { 
            src: '/images/gallery/img-11.jpg', 
            alt: 'image',
            orientation: 'vertical'
        },
        { 
            src: '/images/gallery/img-12.jpg', 
            alt: 'image',
            orientation: 'horizontal'
        },
        { 
            src: '/images/gallery/img-13.jpg', 
            alt: 'image',
            orientation: 'horizontal'
        },
        { 
            src: '/images/gallery/img-14.jpg', 
            alt: 'image',
            orientation: 'horizontal'
        },
    ]
}

export { person, social, newsletter, home, about, blog, work, gallery };