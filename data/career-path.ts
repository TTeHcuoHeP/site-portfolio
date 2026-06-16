export type CareerPathItem = {
  id: string;
  company: string;
  position: string;
  location: string;
  dates: string;
  fullDescription: string[];
  shortVersion: {
    company: string;
    position: string;
    meta: string;
  };
};

export const careerPath: CareerPathItem[] = [
  {
    id: "01",
    company: "Advertising agencies",
    position: "Designer",
    location: "Moscow, Russia",
    dates: "10.2007 - 08.2013",
    fullDescription: [
      "Gained versatile experience across multiple creative agencies in branding, advertising, and production design.",
      "Learned to work under tight deadlines, applying typography, color theory, and layout skills effectively.",
    ],
    shortVersion: { company: "Advertising agencies", position: "Designer", meta: "Moscow, Russia | 10.2007 - 08.2013" },
  },
  {
    id: "02",
    company: "Rusklimat",
    position: "Creative Designer",
    location: "Moscow, Russia",
    dates: "08.2013 - 11.2015",
    fullDescription: [
      "Worked on visual materials for major HVAC brands, including Electrolux and Boneco, creating packaging, catalogs, POS assets, and branding materials that strengthened retail presence and product visibility.",
      "Collaborated with brand managers to ensure consistency across all touchpoints while handling complex, fast-paced creative tasks that earned internal recognition.",
    ],
    shortVersion: { company: "Rusklimat", position: "Creative Designer", meta: "Moscow, Russia | 08.2013 - 11.2015" },
  },
  {
    id: "03",
    company: "MosStroyEkonomBank",
    position: "Head of Advertising & PR",
    location: "Moscow, Russia",
    dates: "10.2007 - 08.2013",
    fullDescription: [
      "Managed the full cycle of advertising, PR, and communication design for a major retail bank in Moscow, overseeing campaigns, media materials, branch branding, and customer-facing communications across print, digital, outdoor, and in-office environments.",
      "Led the launch of five new service branches, coordinating design production, contractors, vendors, and advertising budgets while optimizing processes and delivery timelines through supplier negotiations and operational management.",
    ],
    shortVersion: { company: "MosStroyEkonomBank", position: "Head of Advertising & PR", meta: "Moscow, Russia | 10.2007 - 08.2013" },
  },
  {
    id: "04",
    company: "Fasco",
    position: "Head of Design & Marketing",
    location: "Moscow, Russia",
    dates: "12.2015 - 12.2020",
    fullDescription: [
      "Built and led an in-house design department that unified retail, wholesale, and network marketing under a consistent visual strategy.",
      "Directed the rebranding of more than 700 product SKUs, launched an integrated B2B e-commerce platform, and supervised flagship branding projects, improving both operational efficiency and customer retention.",
    ],
    shortVersion: { company: "Fasco", position: "Head of Design & Marketing", meta: "Moscow, Russia | 12.2015 - 12.2020" },
  },
  {
    id: "05",
    company: "TradeLock",
    position: "Head of Design & Internet Communications",
    location: "Moscow, Russia",
    dates: "01.2021 - 05.2021",
    fullDescription: [
      "Led the rebranding of the FUARO product line, developing packaging systems and visual standards for more than 200 SKUs.",
      "Created the UX/UI concept for a new B2B platform and directed creative campaigns and premium web design projects for brands including PUNTO, Armadillo, and Armadillo SmartLock, strengthening brand identity and user experience.",
    ],
    shortVersion: { company: "TradeLock", position: "Head of Design & Internet Communications", meta: "Moscow, Russia | 01.2021 - 05.2021" },
  },
  {
    id: "06",
    company: "uScovery DMCC",
    position: "Creative Director / Marketing Executive",
    location: "Dubai, UAE",
    dates: "May 2021 - Apr 2024",
    fullDescription: [
      "Defined and executed the global creative strategy across exhibitions, digital platforms, and product branding initiatives, leading campaigns for major industry events such as GITEX, Dubai Airshow, and Eurasia Rail.",
      "Managed in-house creative operations, launched multiple corporate and product websites, and coordinated cross-functional teams to align brand positioning, improve production efficiency, and support international business growth.",
    ],
    shortVersion: { company: "uScovery DMCC", position: "Creative Director / Marketing Executive", meta: "Dubai, UAE | May 2021 - Apr 2024" },
  },
  {
    id: "07",
    company: "Unitsky Nusantara Technologies",
    position: "Chief Executive Officer | Regional Director",
    location: "Jakarta, Indonesia",
    dates: "April 2024 - April 2026",
    fullDescription: [
      "Established and launched the company's operations in Indonesia, managing legal registration, operational setup, team building, and internal processes.",
      "Represented the company at industry events and business meetings, developed partnerships with government and private sector organizations, oversaw local marketing activities, and managed financial reporting and operational accountability for the regional office.",
    ],
    shortVersion: { company: "Unitsky Nusantara Technologies", position: "Chief Executive Officer | Regional Director", meta: "Jakarta, Indonesia | April 2024 - April 2026" },
  },
];
