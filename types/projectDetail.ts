export interface ProjectContentBlock {
  type: 'text' | 'image' | 'images' | 'divider';
  heading?: string;
  body?: string;
  src?: string;
  srcs?: { src: string; alt?: string }[];
  alt?: string;
  caption?: string;
  layout?: 'full' | 'contained';
}

export interface ProjectDetail {
  slug: string;
  role: string;
  company: string;
  year: string;
  overview: string;
  content: ProjectContentBlock[];
}
