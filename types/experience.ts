export interface Experience {
  id: number;
  company: string;
  role: string;
  period: string;
  url?: string;
  logo?: string;
  logos?: Array<{
    src: string;
    alt: string;
  }>;
}
