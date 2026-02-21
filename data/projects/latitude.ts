import type { Project, ProjectDetail } from '@/types';

export const card: Project = {
  id: 3,
  slug: "latitude",
  title: "Finance. Evolved. The new Latitude Service Centre",
  description: "Latitude • Shipped 2019",
  image: "/images/work/latitude.jpg",
  tags: ["Design", "Product Strategy", "UX Research"],
  link: "",
  tooltipText: "Upon request",
  published: false,
};

export const detail: ProjectDetail = {
  slug: "latitude",
  role: "Product Designer",
  company: "Latitude",
  year: "2019",
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
