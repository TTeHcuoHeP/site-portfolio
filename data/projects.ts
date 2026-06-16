export type Project = {
  title: string;
  slug: string;
  category: string;
  year: string;
  description: string;
  cover: string;
  tags: string[];
  role: string;
  challenge: string;
  solution: string;
  gallery: string[];
};

export const projects: Project[] = [
  {
    title: "Product Landing",
    slug: "product-landing",
    category: "Digital Product",
    year: "2024",
    description: "A promotional product launch shaped through narrative, interaction, and a distinct visual concept.",
    cover: "/projects/product-landing/cover.webp",
    tags: ["Art Direction", "Web Design", "Creative Concept"],
    challenge: "Create a promotional website for the launch of the new Fasco Bio product line under the Fasco brand. The project required a strong visual narrative and a distinctive creative concept to present the new SKU in a modern and engaging way.",
    role: "Worked as the Art Director throughout the project development process. Created the concept for the main character, contributed to the website structure and visual storytelling, and developed the narrative approach for user interaction and engagement.",
    solution: "A focused product story combining character-led art direction, structured content, and interactive visual storytelling.",
    gallery: ["Frame 01", "Frame 02", "Frame 03"],
  },
  {
    title: "Qatar Airways",
    slug: "qatar-airways",
    category: "Campaign",
    year: "2025",
    description: "A corporate calendar celebrating the individuality and culture of the Qatar Airways team.",
    cover: "/projects/qatar-airways/cover.webp",
    tags: ["Art Direction", "Photography", "Editorial Design"],
    challenge: "Create a creative corporate calendar concept featuring company employees and their personal hobbies, highlighting the diversity, individuality, and culture of the team.",
    role: "Organized and directed the photoshoot process, developed visual concepts and storytelling for each scene, wrote supporting copy, and designed the final calendar layout and presentation.",
    solution: "An editorial campaign built around real people, personal stories, and carefully directed photography.",
    gallery: ["Frame 01", "Frame 02", "Frame 03"],
  },
  {
    title: "VacationFlow",
    slug: "vacationflow",
    category: "Digital Experience",
    year: "2026",
    description: "An interactive personal platform combining portfolio storytelling, services, and professional experience.",
    cover: "/projects/vacationflow/cover-v2.webp",
    tags: ["UX/UI", "Front-End", "AI Workflow"],
    challenge: "Build a personal web platform from scratch to showcase professional experience, creative projects, and services through an interactive and engaging digital experience rather than a traditional portfolio website.",
    role: "Led the entire project independently, including concept development, UX/UI design, content strategy, visual direction, front-end implementation, animations, and AI-assisted development workflow. Integrated custom interactions, responsive layouts, and creative storytelling to reflect personal brand identity.",
    solution: "A modular portfolio experience combining editorial composition, motion, and custom interaction.",
    gallery: ["Frame 01", "Frame 02", "Frame 03"],
  },
  {
    title: "Trade Lock",
    slug: "trade-lock",
    category: "Digital Product",
    year: "2024",
    description: "A modern landing page communicating innovation, technology, and a confident product experience.",
    cover: "/projects/trade-lock/cover.webp",
    tags: ["Landing Page", "UX/UI", "Figma"],
    challenge: "Design a modern product landing page for a new digital product. The website needed to communicate a strong sense of innovation, technology, and a contemporary user experience.",
    role: "Created the landing page concept in Figma, including the full visual direction, interface structure, and motion design concepts.",
    solution: "A precise landing experience with a clear interface hierarchy and motion-ready visual system.",
    gallery: ["Frame 01", "Frame 02", "Frame 03"],
  },
  {
    title: "MBank",
    slug: "mbank",
    category: "Advertising",
    year: "2023",
    description: "Creative advertising and office branding developed across digital and print formats.",
    cover: "/projects/mbank/cover.webp",
    tags: ["Advertising", "Branding", "Print Design"],
    challenge: "Develop creative advertising materials for bank office branding, as well as promotional campaigns for both digital platforms and print media.",
    role: "Managed the design and advertising department, overseeing creative direction and campaign development.",
    solution: "A cohesive campaign system designed to remain clear and recognizable across physical and digital touchpoints.",
    gallery: ["Frame 01", "Frame 02", "Frame 03"],
  },
  {
    title: "B2B Website",
    slug: "b2b-website",
    category: "Web Platform",
    year: "2023",
    description: "A corporate B2B website combined with a structured wholesale e-commerce platform.",
    cover: "/projects/b2b-website/cover-v4.webp",
    tags: ["Web Design", "UX/UI", "Ecommerce"],
    challenge: "Develop a B2B website that combines a wholesale e-commerce platform with a corporate company website. The platform needed to support product presentation, client interaction, and a structured purchasing workflow for business customers.",
    role: "Designed the complete website structure and user experience, including portal pages, product catalogs, product cards, and detailed content layouts. Developed the platform logic, client account structure, and interaction flows to support the B2B purchasing process and overall usability.",
    solution: "A structured platform joining corporate communication, product discovery, and business purchasing workflows.",
    gallery: ["Frame 01", "Frame 02", "Frame 03"],
  },
];

export const getProject = (slug: string) => projects.find((project) => project.slug === slug);
