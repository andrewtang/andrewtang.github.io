import { siteConfig } from "@/data/content";

export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Andrew Tang",
    url: siteConfig.url,
    jobTitle: "Product Designer",
    worksFor: {
      "@type": "Organization",
      name: "Betashares",
    },
    sameAs: [
      siteConfig.links.linkedin,
      siteConfig.links.twitter,
      siteConfig.links.github,
      siteConfig.links.dribbble,
    ].filter(Boolean),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Melbourne",
      addressRegion: "VIC",
      addressCountry: "AU",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
