import type { Project, ProjectDetail } from '@/types';

export const card: Project = {
  id: 1,
  slug: "design-systems",
  title: "Design Systems",
  description: "Various",
  image: "/images/work/design-systems.jpg",
  tags: ["Design Systems"],
  link: "",
  tooltipText: "Upon request",
  published: false,
};

export const detail: ProjectDetail = {
  slug: "design-systems",
  role: "Product Designer",
  company: "Various",
  year: "2013–Present",
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
