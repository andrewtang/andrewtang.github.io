import type { Project, ProjectDetail } from '@/types';

export const card: Project = {
  id: 5,
  slug: "betashares",
  title: "A new kind of investing platform",
  description: "Betashares • Shipped 2024",
  image: "/images/work/betashares.jpg",
  tags: ["Product Design", "Prototyping", "User Testing", "Product Strategy"],
  link: "",
  tooltipText: "Upon request",
  published: false,
};

export const detail: ProjectDetail = {
  slug: "betashares",
  role: "Principal Product Designer",
  company: "Betashares",
  year: "2023–2026",
  overview: "Betashares Direct is a zero-brokerage investing platform for ASX-listed ETFs and shares. I led product design from concept through public launch across web and mobile.",
  content: [
    {
      type: "text",
      heading: "Problem",
      body: "Most Australian investing platforms were built for active traders. Per-trade fees, single-account flows, dashboards that rewarded frequent activity.\n\nThe research pointed the other way. Long-term, regular investing beats market timing. The tools didn't support it.\n\nPeople told us the same thing in interviews. They knew they should invest regularly. Fees, manual top-ups, and tax-season friction stopped them.",
    },
    {
      type: "text",
      heading: "Design Principles",
      body: "Make the right behaviour the easy behaviour. Remove the cost of being consistent.",
    },
    {
      type: "text",
      heading: "Approach",
      body: "Two moves underpinned the product. Zero brokerage on all ASX ETFs and 400+ shares as a permanent stance, not a promo. An automation layer that turned recurring investing into a one-time setup.\n\nWe prototyped heavily and tested with both first-time investors and SMSF trustees. The same product had to work for both ends of the spectrum.",
    },
    {
      type: "image",
      src: "/images/work/betashares/auto-invest.png",
      alt: "AutoPilot recurring investing setup screen",
      frame: true,
      caption: "AutoPilot turns recurring investing into a one-time setup.",
    },
    {
      type: "list",
      heading: "What shipped",
      columns: 2,
      items: [
        "AutoPilot recurring investing into up to five ETFs.",
        "Fractional ownership and expert-managed model portfolios.",
        "Six account types: individual, joint, kids, SMSF, trust, corporate.",
        "Consolidated tax reporting across every account.",
        "Portfolio transfers without triggering capital gains.",
      ],
    },
    {
      type: "images",
      frame: true,
      srcs: [
        { src: "/images/work/betashares/managed-portfolios.png", alt: "Expert-managed model portfolios" },
        { src: "/images/work/betashares/allocation.png", alt: "Custom portfolio allocation" },
      ],
      caption: "Managed portfolios and custom allocation.",
    },
    {
      type: "images",
      frame: true,
      srcs: [
        { src: "/images/work/betashares/account-types.png", alt: "Six account types: individual, joint, kids, SMSF, trust, corporate" },
        { src: "/images/work/betashares/simplified-tax.png", alt: "Consolidated tax reporting across every account" },
      ],
      caption: "Account types and simplified tax reporting.",
    },
    {
      type: "image",
      src: "/images/work/betashares/transfer-portfolio.png",
      alt: "Portfolio transfer flow",
      frame: true,
      caption: "Portfolio transfers without triggering capital gains.",
    },
    {
      type: "text",
      heading: "Outcome",
      body: "Setup happens once. Investing happens automatically. The interface gets out of the way.\n\nIt's the foundation Betashares is building its next decade of retail products on.",
    },
  ],
};
