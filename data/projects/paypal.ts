import type { Project, ProjectDetail } from '@/types';

export const card: Project = {
  id: 2,
  slug: "paypal",
  title: "Buy Now Pay Later • Pay in 4",
  description: "Latitude x PayPal • Confidential 2018",
  image: "/images/work/paypal.jpg",
  tags: ["Design", "Product Strategy", "UX Research"],
  link: "",
  tooltipText: "Coming soon",
  published: false,
};

export const detail: ProjectDetail = {
  slug: "paypal",
  role: "Product Designer",
  company: "Latitude x PayPal",
  year: "2018",
  overview: "Placeholder — add your overview here.",
  content: [
    {
      type: "text",
      heading: "The problem",
      body: "Placeholder — describe the problem you were solving.",
    },
    {
      type: "text",
      heading: "The approach",
      body: "Placeholder — describe your design process and approach.",
    },
    {
      type: "text",
      heading: "The outcome",
      body: "Placeholder — describe the results and impact.",
    },
  ],
};
