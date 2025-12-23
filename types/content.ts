export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  links: {
    github: string;
    linkedin: string;
    dribbble: string;
    email: string;
    twitter: string;
  };
}

export interface AboutContent {
  tagline: string;
  start: string;
  intro: string;
  personal: string;
  availability: string;
}
