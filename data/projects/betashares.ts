import type { Project, ProjectDetail } from '@/types';

export const card: Project = {
  id: 5,
  slug: "betashares",
  title: "A new kind of investing platform",
  description: "Betashares • Shipped 2024",
  image: "/images/work/betashares.jpg",
  tags: ["UI Design", "Prototyping", "User Testing"],
  link: "",
  tooltipText: "Upon request",
  published: false,
};

export const detail: ProjectDetail = {
  slug: "betashares",
  role: "Principal Product Designer",
  company: "Betashares",
  year: "2023–2024",
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
