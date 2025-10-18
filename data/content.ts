import type { SiteConfig, AboutContent, Project, Experience } from '@/types';

export const siteConfig: SiteConfig = {
  name: "Andrew Tang",
  title: "Andrew Tang — Product Designer",
  description: "Product Designer based in Melbourne, Australia",
  url: "https://andrewtang.net",
  links: {
    github: "https://github.com/andrewtang",
    linkedin: "https://linkedin.com/in/tang-andrew",
    email: "mailto:hello@andrewtang.net",
    twitter: "https://twitter.com/tangandrew",
    dribbble: "https://dribbble.com/andrewtang",
  },
};

export const projects: Project[] = [
  {
    id: 3,
    title: "0 → 1 Direct Web Investing Experience",
    description: "Betashares • Shipped 2024",
    image: "/images/betashares.png",
    tags: ["UI Design", "Prototyping", "User Testing"],
    link: "",
  },
  {
    id: 2,
    title: "Enhancing the servicing experience",
    description: "Afterpay • Shipped 2021",
    image: "/images/afterpay.png",
    tags: ["Design", "Product Strategy", "UX Research"],
    link: "",
  },
  {
    id: 1,
    title: "A new way to pay",
    description: "Latitude Financial x PayPal • Confidential 2018",
    image: "/images/paypal.jpg",
    tags: ["Design", "Product Strategy", "UX Research"],
    link: "",
  },
];

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
    period: "2012 — 2018",
    logo: "/logos/various.svg",
  },
];

export const about: AboutContent = {
  tagline: "I'm a designer, builder, & rock climber",
  intro: "I think deeply about people, products, and how technology shapes the future. I'm currently spending much of my free time exploring how AI can expand what's possible in design.",
  personal: "Outside of work, I'm happiest when I'm outdoors, especially when I'm climbing. There's something about scaling a new route that brings out the best in me — I'm completely focused on the present and feel most alive. ",
  availability: "I'm always keen on connecting with like-minded individuals.",
};
