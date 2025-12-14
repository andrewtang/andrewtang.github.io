import type { Metadata } from "next";
import { siteConfig } from "@/data/content";
import Lab04Demo from "@/components/labs/Lab04Demo";

export const metadata: Metadata = {
  title: "Motion.dev Animations",
  description: "Exploring animations with motion.dev",
  openGraph: {
    title: `Motion.dev Animations | ${siteConfig.name}`,
    description: "Exploring animations with motion.dev",
    url: `${siteConfig.url}/labs/04`,
  },
};

export default function Lab04Page() {
  return (
    <main id="main-content" className="fixed inset-0 w-full h-screen">
      <Lab04Demo />
    </main>
  );
}
