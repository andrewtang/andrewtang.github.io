import type { Metadata } from "next";
import AboutContent from "@/components/sections/AboutContent";
import Footer from "@/components/sections/Footer";
import { siteConfig } from "@/data/content";

export const metadata: Metadata = {
  title: "About",
  description: "Designer, tinkerer, and climber passionate about creating delightful user experiences",
  openGraph: {
    title: `About — ${siteConfig.name}`,
    description: "Designer, tinkerer, and climber passionate about creating delightful user experiences",
    url: `${siteConfig.url}/about`,
  },
};

export default function AboutPage() {
  return (
    <>
      <main id="main-content" className="flex-1">
        <AboutContent />
      </main>
      <Footer />
    </>
  );
}
