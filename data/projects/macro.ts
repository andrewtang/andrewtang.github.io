import type { Project, ProjectDetail } from '@/types';

export const card: Project = {
  id: 6,
  slug: "macro",
  title: "Track investment themes and market trends",
  description: "Macro iOS APP • Upcoming 2026",
  image: "/images/work/macro.jpg",
  tags: ["UI Design", "Product Strategy"],
  link: "",
  tooltipText: "Coming soon",
  published: false,
};

export const detail: ProjectDetail = {
  slug: "macro",
  role: "Product Designer",
  company: "Macro",
  year: "2025–2026",
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
