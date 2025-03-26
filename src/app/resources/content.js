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
    role:      'Software Developer, Digital Strategist & Project Manager',
    avatar:    '/images/avatar.jpeg',
    location:  'America/Toronto',        // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
    languages: ['English (Full Professional)', 'Urdu (Native)', 'Punjabi (Native)', 'French (Limited)', 'Arabic (Limited)']  // optional: Leave the array empty if you don't want to display languages
}

const newsletter = {
    display: true,
    title: <><SparkleFx
    speed="medium"
    count={50}
    trigger="instant"
  >Subscribe to My Newsletter</SparkleFx></>,
    description: <>Exploring the intersection of technology, business, and digital transformation. I share insights on software development, digital strategy, and project management.</>
}

const social = [
    // Links are automatically displayed.
    // Import new icons in /once-ui/icons.ts
    {
        name: 'GitHub',
        icon: 'github',
        link: 'https://github.com/mujtaba-r',
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
    {
        name: 'Phone',
        icon: 'phone',
        link: 'tel:+16472263527',
    }
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
    >Software Developer, Digital Strategist & Project Manager</LetterFx></span>,
    subline: <>Welcome! I'm Mujtaba Rizvi, a <InlineCode>Software Developer, Digital Strategist & Project Manager</InlineCode> with over 4 years of experience bridging the gap between technology and business. I specialize in transforming complex business challenges into scalable, user-centric solutions by leveraging a versatile tech stack and modern digital tools. Join me on this journey as we push the boundaries of what's possible and shape the future together.</>
}

const about = {
    label: 'About',
    title: 'About me',
    description: `Meet ${person.name}, ${person.role} from ${person.location}`,
    tableOfContent: {
        display: true,
        subItems: true
    },
    avatar: {
        display: true
    },
    calendar: {
        display: true,
        link: 'https://calendly.com/mujtabahassanrizvi/schedule-a-call'
    },
    intro: {
        display: true,
        title: 'Introduction',
        description: 
        <>
        <p>I'm a results-driven Digital Strategist, Software Developer, Project Manager, and Business Analyst with over 4 years of experience bridging the gap between technology and business. I specialize in transforming complex business challenges into scalable, user-centric solutions by leveraging a versatile tech stack—including Python, Java, C#, HTML, CSS, JavaScript, and PHP—and modern digital tools.</p>
        <p>Working across Canada and the USA, I've honed my ability to manage projects end-to-end using agile methodologies, ensuring that every solution aligns with strategic business objectives while meeting rigorous technical standards. I excel at collaborating with cross-functional teams to gather requirements, define technical specifications, and deliver high-impact projects on time and within budget.</p>
        </>
    },
    work: {
        display: true,
        title: 'Work Experience',
        experiences: [
            {
                company: 'Value Hunt',
                timeframe: 'February 2025 - Present',
                role: 'Retail Sales Manager & Technical Lead',
                location: 'Mississauga, Ontario, Canada',
                achievements: [
                    <>Managing sales, digital marketing, web development, and Inventory Management System development efforts for a liquidation center in the GTA.</>
                ],
                images: [
                    {
                        src: '/images/projects/value-hunt/cover.png',
                        alt: 'Value Hunt Project',
                        width: 16,
                        height: 9
                    }
                ]
            },
            {
                company: 'Self-employed',
                timeframe: 'October 2023 - Present',
                role: 'Freelance Digital Strategist & Web Developer',
                location: 'Canada',
                achievements: [
                    <>Developed websites, onboarding systems, and LMS solutions, increasing student engagement by 25% and course completion by 30%.</>,
                    <>Led SEO, AI chatbot integration, and social media strategies, boosting traffic, user support, and engagement.</>,
                    <>Enhanced site functionality with custom WordPress plugins, reducing bounce rates by 15% and increasing session duration by 30%.</>,
                    <>Managed full lifecycle software development, utilizing agile methodologies, CI/CD pipelines, and business analysis.</>
                ],
                images: [
                    {
                        src: '/images/projects/freelance/cover.png',
                        alt: 'Freelance Projects',
                        width: 16,
                        height: 9
                    }
                ]
            },
            {
                company: 'Inqilaab',
                timeframe: 'June 2022 - Present',
                role: 'Founder & Chief Executive',
                location: 'Lahore, Punjab, Pakistan',
                achievements: [
                    <>Worked on a Music Metaverse concept, collaborated with artists & tech firms of Pakistan to bring MVP to life.</>
                ],
                images: [
                    {
                        src: '/images/projects/music-metaverse/cover.jpg',
                        alt: 'Music Metaverse Project',
                        width: 16,
                        height: 9
                    }
                ]
            },
            {
                company: 'Render\'s Inc.',
                timeframe: 'June 2023 - October 2023',
                role: 'Business Development Executive',
                location: 'United States',
                achievements: [
                    <>Managed 100+ global clients, aligning technical solutions with business needs, driving a 20% revenue increase.</>,
                    <>Developed strategic sales initiatives, leveraging LinkedIn Sales Navigator and CRM tools to boost lead generation by 30%.</>,
                    <>Created customized sales plans, increasing deal size by 25% and shortening the sales cycle by two weeks.</>
                ],
                images: []
            }
        ]
    },
    studies: {
        display: true, // set to false to hide this section
        title: 'Education',
        institutions: [
            {
                name: 'Knox College',
                description: <>Bachelor of Arts - BA, Business Administration and Management, General (September 2018 - June 2023)</>,
            },
            {
                name: 'Knox College',
                description: <>Bachelor of Science - BS, Computer Science (September 2018 - August 2022)</>,
            },
            {
                name: 'Aitchison College',
                description: <>Advanced Level CIE (2016 - 2018)</>,
            }
        ]
    },
    technical: {
        display: true, // set to false to hide this section
        title: 'Skills & Certifications',
        skills: [
            {
                title: 'Technical Skills',
                description: <>Python, Java, C#, HTML, CSS, JavaScript, PHP, WordPress, Agile Methodologies, CI/CD, Business Analysis</>,
                images: []
            },
            {
                title: 'Certifications',
                description: <>AI Agents Fundamentals, ISC2 Candidate</>,
                images: []
            },
            {
                title: 'Honors & Awards',
                description: <>Dean's List, Andreas Prize (Est. 2016), Porter Prize (Est. 1978)</>,
                images: []
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