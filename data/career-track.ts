export type CareerTrackItem = {
  id: string;
  years: string;
  startYear: number;
  company: string;
  role: string;
  location: string;
  image?: string;
  imageAlt?: string;
  achievements: string[];
  responsibilities: string[];
};

// Keep image paths with the career data so they are easy to replace later.
export const careerTrack: CareerTrackItem[] = [
  {
    id: "01", years: "2007 - 2013", startYear: 2007, company: "Advertising Agencies", role: "Designer", location: "Moscow, Russia", image: "/career/path_agencies.webp", imageAlt: "Advertising agencies creative work",
    achievements: ["Built a broad foundation in branding, advertising and production design.", "Developed visual systems, campaign materials and print-ready assets under tight deadlines.", "Strengthened typography, layout and art-direction skills across varied client work."],
    responsibilities: ["Created concepts, layouts and production files for agency projects.", "Worked with creative teams to translate briefs into clear visual communication."],
  },
  {
    id: "02", years: "Aug 2013 - Nov 2015", startYear: 2013, company: "Rusklimat", role: "Creative Designer", location: "Moscow, Russia", image: "/career/path_rusklimat.webp", imageAlt: "Rusklimat creative work",
    achievements: ["Created packaging, catalogues, POS materials and retail assets for Electrolux and Boneco.", "Strengthened product visibility through consistent brand and campaign systems.", "Earned internal recognition while delivering complex creative work at pace."],
    responsibilities: ["Partnered with brand managers on cross-channel visual consistency.", "Developed concepts and production assets for HVAC brand communication."],
  },
  {
    id: "03", years: "2013 - 2015", startYear: 2013.5, company: "MosStroyEkonomBank", role: "Head of Advertising and Public Relations", location: "Moscow, Russia", image: "/career/path_mosbank.webp", imageAlt: "MosStroyEkonomBank project",
    achievements: ["Led advertising and PR for a major retail bank across print, digital and branch communication.", "Launched five service branches while coordinating campaigns, suppliers and production.", "Improved delivery processes through budget and vendor management."],
    responsibilities: ["Managed the advertising and public relations team.", "Planned campaign budgets and monitored effectiveness across channels.", "Directed branch branding and customer-facing communication systems."],
  },
  {
    id: "04", years: "2015 - 2020", startYear: 2015, company: "Garden Retail Service", role: "Head of Design and Marketing", location: "Moscow, Russia", image: "/career/path_fasco.webp", imageAlt: "Garden Retail Service project",
    achievements: ["Built an in-house design department and a consistent visual strategy across retail and wholesale.", "Directed the rebrand of more than 700 product SKUs.", "Launched an integrated B2B e-commerce platform and flagship branding projects."],
    responsibilities: ["Led designers, marketers and external creative partners.", "Developed brand systems, product communication and e-commerce design.", "Aligned creative work with operational and commercial goals."],
  },
  {
    id: "05", years: "Jan 2021 - May 2021", startYear: 2021, company: "TradeLock", role: "Head of Design and Internet Communications", location: "Moscow, Russia", image: "/career/path_tradelock.webp", imageAlt: "TradeLock digital project",
    achievements: ["Led the FUARO product-line rebrand and visual standards for more than 200 SKUs.", "Created the UX/UI concept for a new B2B platform.", "Directed premium web and campaign design for PUNTO, Armadillo and SmartLock."],
    responsibilities: ["Directed brand, packaging and digital design across the portfolio.", "Established visual systems for product communication and web experiences."],
  },
  {
    id: "06", years: "May 2021 - Apr 2024", startYear: 2021.4, company: "uScovery DMCC", role: "Creative Director / Marketing Executive", location: "Dubai, UAE", image: "/career/path_uscovery.webp", imageAlt: "uScovery DMCC project",
    achievements: ["Defined global creative strategy across exhibitions, digital platforms and product branding.", "Led campaigns for GITEX, Dubai Airshow and Eurasia Rail.", "Launched corporate and product websites for international growth."],
    responsibilities: ["Managed in-house creative operations and cross-functional teams.", "Aligned brand positioning, production efficiency and international marketing work."],
  },
  {
    id: "07", years: "Apr 2024 - Apr 2026", startYear: 2024, company: "Unitsky Nusantara Technologies", role: "Chief Executive Officer / Regional Director", location: "Jakarta, Indonesia", image: "/career/path_ceo.webp", imageAlt: "Regional executive leadership",
    achievements: ["Established the Indonesian operation from legal registration to team building and internal processes.", "Developed partnerships with government and private-sector organisations.", "Represented the business at industry events and strategic meetings."],
    responsibilities: ["Led local operations, marketing activities and financial accountability.", "Built partnerships and regional business-development processes."],
  },
];
