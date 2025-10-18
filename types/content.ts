export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  links: {
    github: string;
    linkedin: string;
    email: string;
    twitter: string;
    dribbble: string;
  };
}

export interface AboutContent {
  tagline: string;
  intro: string;
  personal: string;
  availability: string;
}
