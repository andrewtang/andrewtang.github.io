export interface Lab {
  id: number;
  title: string;
  description: string;
  status: 'in-progress' | 'completed' | 'archived';
  started: string;
  completed?: string;
  image?: string;
  tags: string[];
  link?: string;
  demo?: string;
  github?: string;
}
