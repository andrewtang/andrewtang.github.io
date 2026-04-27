export interface ProjectContentBlock {
  type: 'text' | 'image' | 'images' | 'divider' | 'list';
  heading?: string;
  body?: string;
  src?: string;
  srcs?: { src: string; alt?: string }[];
  alt?: string;
  caption?: string;
  layout?: 'full' | 'contained';
  items?: string[];
  columns?: 1 | 2;
  frame?: boolean;
}

export interface ProjectDetail {
  slug: string;
  role: string;
  company: string;
  year: string;
  overview: string;
  content: ProjectContentBlock[];
}
