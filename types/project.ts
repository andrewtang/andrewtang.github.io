export interface Project {
  id: number;
  slug: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  tooltipText?: string;
  published?: boolean;
}
