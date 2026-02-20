import type { Experience } from '@/types';

export const experience: Experience[] = [
  {
    id: 1,
    company: "Betashares",
    role: "Principal Product Designer",
    period: "2023 — Present",
    url: "https://www.betashares.com.au",
    logo: "/logos/betashares.svg",
  },
  {
    id: 2,
    company: "Block",
    role: "Senior Product Designer",
    period: "2022 — 2023",
    url: "https://www.block.xyz",
    logo: "/logos/block.svg",
  },
  {
    id: 3,
    company: "Afterpay",
    role: "Senior Product Designer",
    period: "2019 — 2022",
    url: "https://www.afterpay.com",
    logo: "/logos/afterpay.svg",
  },
  {
    id: 4,
    company: "Various",
    role: "Product Designer",
    period: "2013 — 2018",
    logo: "/logos/various.svg",
    logos: [
      { src: "/logos/various.svg", alt: "Various" },
      { src: "/logos/auspost.svg", alt: "Australia Post" },
      { src: "/logos/telstra.svg", alt: "Telstra" },
      { src: "/logos/aussuper.svg", alt: "AusSuper" },
      { src: "/logos/ibm.svg", alt: "IBM IX" },
      { src: "/logos/latitude.svg", alt: "Latitude" },
    ],
  },
];
