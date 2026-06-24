export type Project = {
  title: string;
  slug: string;
  subtitle: string;
  category: string;
  year: string;
  client: string;
  location: string;
  projectUrl: string;
  description: string;
  cover: string;
  heroImage: string;
  tags: string[];
  tools: string[];
  role: string;
  roleDescription: string;
  challenge: string;
  solution: string;
  gallery: string[];
  galleryImages: string[];
  overview: string[];
  credits: string[];
};

export const projects: Project[] = [
  {
    title: "Product Landing",
    slug: "product-landing",
    subtitle: "Character-led product launch experience for a new Fasco Bio line.",
    category: "Digital Product",
    year: "2024",
    client: "Fasco Bio",
    location: "Moscow, Russia",
    projectUrl: "https://www.figma.com/proto/JoFk2bgbdOVFsdS7tQbxT7/%D0%91%D0%98%D0%9E?node-id=14-65&page-id=0%3A1&t=vITdhyaocQA7iStK-1",
    description: "A promotional product launch shaped through narrative, interaction, and a distinct visual concept.",
    cover: "/projects/product-landing/cover-bio2.webp",
    heroImage: "/projects/product-landing/cover-bio2.webp",
    tags: ["Art Direction", "Web Design", "Creative Concept"],
    tools: ["Photoshop", "Figma", "Illustrator"],
    challenge: "Create a promotional website for the launch of the new Fasco Bio product line under the Fasco brand. The project required a strong visual narrative and a distinctive creative concept to present the new SKU in a modern and engaging way.",
    role: "Worked as the Art Director throughout the project development process. Created the concept for the main character, contributed to the website structure and visual storytelling, and developed the narrative approach for user interaction and engagement.",
    roleDescription: "Led the art direction, page structure, visual storytelling, character concept, and interaction logic from the first creative route through final presentation.",
    solution: "A focused product story combining character-led art direction, structured content, and interactive visual storytelling.",
    gallery: ["Frame 01", "Frame 02", "Frame 03"],
    galleryImages: ["/projects/product-landing/cover-bio.webp", "/projects/product-landing/cover-bio2.webp", "/projects/product-landing/card_gradient.webp"],
    overview: [
      "The project turns a product launch into a small narrative world, using character, rhythm, and visual hierarchy to make the SKU feel more memorable.",
      "The result is a focused digital landing concept with a clear product story, strong campaign tone, and a flexible visual system for future extensions.",
    ],
    credits: ["Creative Direction: Alsim Mamedov", "Art Direction: Alsim Mamedov", "Design System: Alsim Mamedov"],
  },
  {
    title: "Qatar Airways",
    slug: "qatar-airways",
    subtitle: "Premium campaign visuals created within a tight production timeline.",
    category: "Campaign",
    year: "2025",
    client: "Qatar Airways",
    location: "Doha, Qatar",
    projectUrl: "",
    description: "A corporate campaign system developed with a premium airline look and feel.",
    cover: "/projects/qatar-airways/cover-qa.webp",
    heroImage: "/projects/qatar-airways/cover-qa.webp",
    tags: ["Art Direction", "Photography", "Editorial Design"],
    tools: ["Photoshop", "Illustrator", "InDesign", "DaVinci"],
    challenge: "Develop a series of promotional visuals for the Burgundy Friday campaign within a tight production timeline, while maintaining the premium look and feel of the Qatar Airways brand.",
    role: "Created advertising banner concepts for multiple campaign placements, developed the visual direction, and produced a motivational social media video to support the promotion and increase audience engagement.",
    roleDescription: "Created campaign banner concepts, shaped the visual direction, and produced supporting social media motion content for promotional communication.",
    solution: "A refined campaign visual system balancing airline-brand premium codes with fast promotional clarity.",
    gallery: ["Frame 01", "Frame 02", "Frame 03"],
    galleryImages: ["/projects/qatar-airways/cover-qa.webp", "/projects/qatar-airways/card_gradient.webp", "/projects/qatar-airways/cover.webp"],
    overview: [
      "The campaign required speed without losing polish, so the visual direction focused on simple hierarchy, premium contrast, and direct promotional readability.",
      "The result supports multiple placements while keeping the brand tone consistent across static and motion assets.",
    ],
    credits: ["Creative Direction: Alsim Mamedov", "Campaign Design: Alsim Mamedov", "Motion Support: Alsim Mamedov"],
  },
  {
    title: "VacationFlow",
    slug: "vacationflow",
    subtitle: "A micro SaaS web app for tracking and monitoring employee vacations and sick leave. Ideal for micro and small businesses.",
    category: "Digital Experience",
    year: "2026",
    client: "Personal Project",
    location: "Dubai, UAE",
    projectUrl: "https://ohleaveyeah.ru",
    description: "VacationFlow is my personal product, a micro SaaS web app for tracking and monitoring employee vacations and sick leave. Ideal for micro and small businesses.",
    cover: "/projects/vacationflow/cover-v5.webp",
    heroImage: "/projects/vacationflow/cover-v5.webp",
    tags: ["UX/UI", "Front-End", "AI Workflow", "Supabase"],
    tools: ["Figma", "AI", "React", "GSAP", "Photoshop"],
    challenge: "VacationFlow is my personal product, a micro SaaS web app for tracking and monitoring employee vacations and sick leave. Ideal for micro and small businesses.",
    role: "From concept to implementation, I independently developed all the app's functionality, collaborated with AI on the frontend, and configured the backend for creating companies and employees within the system. I also set up the registration and payment systems, etc.",
    roleDescription: "From concept to implementation, I independently developed all the app's functionality, collaborated with AI on the frontend, and configured the backend for creating companies and employees within the system. I also set up the registration and payment systems, etc.",
    solution: "A modular portfolio experience combining editorial composition, motion, and custom interaction.",
    gallery: ["Frame 01", "Frame 02", "Frame 03"],
    galleryImages: ["/projects/vacationflow/cover-v2.webp", "/projects/vacationflow/cover-v5.webp", "/projects/vacationflow/card_gradient.webp"],
    overview: [
      "From concept to implementation, I independently developed all the app's functionality, collaborated with AI on the frontend, and configured the backend for creating companies and employees within the system. I also set up the registration and payment systems, etc.",
    ],
    credits: ["Creative Direction: Alsim Mamedov", "UX/UI: Alsim Mamedov", "Front-End: Alsim Mamedov"],
  },
  {
    title: "Trade Lock",
    slug: "trade-lock",
    subtitle: "Modern landing page concept for a confident digital product.",
    category: "Digital Product",
    year: "2024",
    client: "TradeLock",
    location: "Moscow, Russia",
    projectUrl: "https://www.figma.com/proto/DGTnp3LcCsDXTmOPxl4eOK/ROTATOR-3--Copy---Copy-?node-id=2278-569&page-id=0%3A1&t=CzlrQlm6m7WFYFEx-1",
    description: "A modern landing page communicating innovation, technology, and a confident product experience.",
    cover: "/projects/trade-lock/cover-tradelock.webp",
    heroImage: "/projects/trade-lock/cover-tradelock.webp",
    tags: ["Landing Page", "UX/UI", "Figma"],
    tools: ["Figma", "Photoshop", "Illustrator"],
    challenge: "Design a modern product landing page for a new digital product. The website needed to communicate a strong sense of innovation, technology, and a contemporary user experience.",
    role: "Created the landing page concept in Figma, including the full visual direction, interface structure, and motion design concepts.",
    roleDescription: "Defined the landing page structure, interface hierarchy, visual tone, and motion-ready presentation concept for the product launch.",
    solution: "A precise landing experience with a clear interface hierarchy and motion-ready visual system.",
    gallery: ["Frame 01", "Frame 02", "Frame 03"],
    galleryImages: ["/projects/trade-lock/cover-tradelock.webp", "/projects/trade-lock/card_gradient.webp", "/projects/trade-lock/cover.webp"],
    overview: [
      "The landing concept balances a clean interface with a sharper product mood, making the digital offer feel modern and credible.",
      "The structure focuses on clarity: fast positioning, direct feature communication, and a visual system ready for motion.",
    ],
    credits: ["Creative Direction: Alsim Mamedov", "UX/UI Concept: Alsim Mamedov", "Visual Design: Alsim Mamedov"],
  },
  {
    title: "MBank",
    slug: "mbank",
    subtitle: "Advertising and office branding system across digital and print.",
    category: "Advertising",
    year: "2023",
    client: "MosStroyEkonomBank",
    location: "Moscow, Russia",
    projectUrl: "",
    description: "Creative advertising and office branding developed across digital and print formats.",
    cover: "/projects/mbank/cover-mbank.webp",
    heroImage: "/projects/mbank/cover-mbank.webp",
    tags: ["Advertising", "Branding", "Print Design", "Art Direction"],
    tools: ["Photoshop", "Illustrator", "InDesign", "CorelDRAW", "AI"],
    challenge: "Develop creative advertising materials for bank office branding, as well as promotional campaigns for both digital platforms and print media.",
    role: "Managed the design and advertising department, overseeing creative direction and campaign development.",
    roleDescription: "Managed creative direction, advertising production, branch branding, supplier coordination, and campaign rollout across print and digital channels.",
    solution: "A cohesive campaign system designed to remain clear and recognizable across physical and digital touchpoints.",
    gallery: ["Frame 01", "Frame 02", "Frame 03"],
    galleryImages: ["/projects/mbank/cover-mbank.webp", "/projects/mbank/card_gradient.webp", "/projects/mbank/cover.webp"],
    overview: [
      "The work centered on clarity and trust, translating banking communication into a consistent system for offices, campaigns, and customer-facing touchpoints.",
      "The visual language had to be operationally reliable while still carrying enough character for advertising and promotional formats.",
    ],
    credits: ["Creative Direction: Alsim Mamedov", "Advertising Management: Alsim Mamedov", "Brand Production: Alsim Mamedov"],
  },
  {
    title: "B2B Website",
    slug: "b2b-website",
    subtitle: "Wholesale e-commerce and corporate website joined into one B2B platform.",
    category: "Web Platform",
    year: "2023",
    client: "Garden Retail Service",
    location: "Moscow, Russia",
    projectUrl: "https://garden-rs.ru",
    description: "A corporate B2B website combined with a structured wholesale e-commerce platform.",
    cover: "/projects/b2b-website/cover-grs.webp",
    heroImage: "/projects/b2b-website/cover-grs.webp",
    tags: ["Web Design", "UX/UI", "Ecommerce"],
    tools: ["Figma", "Photoshop", "Illustrator"],
    challenge: "Develop a B2B website that combines a wholesale e-commerce platform with a corporate company website. The platform needed to support product presentation, client interaction, and a structured purchasing workflow for business customers.",
    role: "Designed the complete website structure and user experience, including portal pages, product catalogs, product cards, and detailed content layouts. Developed the platform logic, client account structure, and interaction flows to support the B2B purchasing process and overall usability.",
    roleDescription: "Created the platform logic, catalog structure, B2B account flow, product presentation system, interface hierarchy, and visual direction.",
    solution: "A structured platform joining corporate communication, product discovery, and business purchasing workflows.",
    gallery: ["Frame 01", "Frame 02", "Frame 03"],
    galleryImages: ["/projects/b2b-website/cover-grs.webp", "/projects/b2b-website/cover-v3.webp", "/projects/b2b-website/cover-v4.webp"],
    overview: [
      "The platform brings corporate storytelling and wholesale purchasing into one system, making product discovery and B2B interaction more structured.",
      "The design focuses on practical clarity, catalog usability, and a more confident digital presence for business clients.",
    ],
    credits: ["Creative Direction: Alsim Mamedov", "UX/UI Structure: Alsim Mamedov", "Web Design: Alsim Mamedov"],
  },
];

export const getProject = (slug: string) => projects.find((project) => project.slug === slug);
