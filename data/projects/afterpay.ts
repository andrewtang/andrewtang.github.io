import type { Project, ProjectDetail } from '@/types';

export const card: Project = {
  id: 4,
  slug: "afterpay",
  title: "A refreshed servicing experience",
  description: "Afterpay • Shipped 2021",
  image: "/images/work/afterpay.jpg",
  tags: ["Design", "Product Strategy", "UX Research"],
  link: "",
  tooltipText: "Coming soon",
  published: false,
};

export const detail: ProjectDetail = {
  slug: "afterpay",
  role: "Senior Product Designer",
  company: "Afterpay",
  year: "2019–2022",
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
