import type { Metadata } from "next";
import { siteConfig } from "@/data/content";
import Lab05Demo from "@/components/labs/Lab05Demo";

export const metadata: Metadata = {
  title: "Page Transition",
  description: "Staggered page transition with exit fade and spring-driven child entrances",
  openGraph: {
    title: `Page Transition | ${siteConfig.name}`,
    description: "Staggered page transition with exit fade and spring-driven child entrances",
    url: `${siteConfig.url}/labs/05`,
  },
};

export default function Lab05Page() {
  return (
    <main id="main-content" className="fixed inset-0 w-full h-screen">
      <Lab05Demo />
    </main>
  );
}
